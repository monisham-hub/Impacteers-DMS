/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Impacteers Legal AI Intelligence & RAG Knowledge Engine
 */

import { db } from '../db.js';
import { authService } from './authService.js';
import { documentService } from './documentService.js';
import { contractService } from './contractService.js';

class LegalAssistantService {
  constructor() {
    this.model = 'Impacteers Legal AI (Enterprise v2.4)';
    this.isReady = true;
  }

  getSuggestedPrompts() {
    return [
      'What is the notice period for Board Meetings & General Meetings under AOA?',
      'Summarize standard aggregate liability cap policy for contracts.',
      'What are the termination rights and cure periods across MSAs?',
      'What non-disclosure and confidentiality obligations are standard?',
      'Show me all contracts expiring in the next 60 days.',
      'What are the standard payment terms and invoice dispute policies?',
      'What are the non-solicitation rules in our staffing agreements?'
    ];
  }

  getSafetyDisclaimer() {
    return 'Impacteers AI Legal Assistant provides corporate legal intelligence. This internal tool assists contract review and does not replace formal legal counsel signature or board execution.';
  }

  getAuthorizedContextDocuments() {
    try {
      return documentService.getDocuments() || [];
    } catch (e) {
      return [];
    }
  }

  async _getGeminiApiKey() {
    if (this.apiKey) return this.apiKey;
    try {
      const res = await fetch('/.env');
      if (!res.ok) throw new Error('Could not fetch .env');
      const text = await res.text();
      const match = text.match(/gemini_api_key=(.+)/);
      if (match && match[1]) {
        this.apiKey = match[1].trim();
        return this.apiKey;
      }
    } catch (e) {
      console.warn('Failed to load API key from .env', e);
    }
    throw new Error('Gemini API key not found. Please add gemini_api_key to your .env file.');
  }

  /**
   * Process a question using the in-house Legal AI & RAG Engine (Powered by Gemini)
   */
  async askQuestion({ question, documentId = null, conversationHistory = [] }) {
    if (!question || !question.trim()) {
      throw new Error('Question cannot be empty.');
    }

    const apiKey = await this._getGeminiApiKey();
    const user = authService.getCurrentUser() || { name: 'Counsel', roleLabel: 'Legal User' };
    
    let docsContext = '';
    let citations = [];

    if (documentId) {
      const targetDoc = documentService.getDocumentById(documentId);
      if (targetDoc) {
        docsContext = `Document Title: ${targetDoc.title}\nContent: ${targetDoc.simulatedText || 'No detailed content available.'}\n\n`;
        citations.push(targetDoc.title);
      }
    } else {
      const allDocs = this.getAuthorizedContextDocuments();
      allDocs.forEach(doc => {
        docsContext += `Document Title: ${doc.title}\nContent: ${doc.simulatedText || 'No detailed content available.'}\n\n`;
        citations.push(doc.title);
      });
    }

    const promptText = `
You are the Impacteers Legal AI Assistant. Answer the user's question using ONLY the context provided below. 
If the answer cannot be found in the context, state that you do not have enough information.
Format your response using Markdown (bullet points, bold text).

Context Documents:
${docsContext}

User Question: ${question}
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to communicate with Gemini API.');
    }

    const data = await response.json();
    let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    return {
      id: `impacteers-ai-${Date.now()}`,
      role: 'assistant',
      text: responseText,
      citations: citations.slice(0, 5), // Keep citations limited
      model: this.model + ' (Gemini 2.5 Flash)',
      provider: 'impacteers-ai',
      timestamp: new Date().toISOString(),
      disclaimer: this.getSafetyDisclaimer(),
      isLiveAI: true
    };
  }
}

export const legalAssistantService = new LegalAssistantService();
