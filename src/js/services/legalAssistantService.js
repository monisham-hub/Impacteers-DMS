/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Impacteers Legal AI Intelligence & RAG Knowledge Engine
 */

import { db } from '../db.js';
import { authService } from './authService.js';
import { documentService } from './documentService.js';
import { contractService } from './contractService.js';
import { requestService } from './requestService.js';

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
    
    // 1. Try env-config.json (generated during Netlify build)
    try {
      const res = await fetch('/env-config.json');
      if (res.ok) {
        const data = await res.json();
        if (data && data.gemini_api_key) {
          this.apiKey = data.gemini_api_key.trim();
          return this.apiKey;
        }
      }
    } catch (e) {
      // Fallback
    }

    // 2. Try local .env file
    try {
      const res = await fetch('/.env');
      if (res.ok) {
        const text = await res.text();
        const match = text.match(/gemini_api_key=(.+)/i);
        if (match && match[1]) {
          this.apiKey = match[1].trim();
          return this.apiKey;
        }
      }
    } catch (e) {
      console.warn('Failed to load API key from .env', e);
    }

    throw new Error('Gemini API key not found. Please add gemini_api_key in Netlify environment variables or your .env file.');
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
    let parts = [];

    if (documentId && documentId.startsWith('REQ_')) {
      const reqId = documentId.replace('REQ_', '');
      try {
        const req = requestService.getRequestById(reqId);
        if (req) {
          let targetDoc = null;
          let docType = '';

          if (req.finalDocument && req.finalDocument.dataUrl) {
            targetDoc = req.finalDocument;
            docType = 'Final Signed Document';
          } else if (req.reviewedDocument && req.reviewedDocument.dataUrl) {
            targetDoc = req.reviewedDocument;
            docType = 'Legal Reviewed Document';
          } else if (req.attachedDocument && req.attachedDocument.dataUrl) {
            targetDoc = req.attachedDocument;
            docType = 'Attached Document';
          }

          if (targetDoc) {
            const matches = targetDoc.dataUrl.match(/^data:(.+);base64,(.+)$/);
            if (matches && matches.length === 3) {
              parts.push({
                inlineData: {
                  mimeType: matches[1],
                  data: matches[2]
                }
              });
              citations.push(`${docType}: ${targetDoc.name}`);
            }
          }
        }
      } catch (e) {
        // Access denied or not found
      }
    } else if (documentId) {
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
You are the Impacteers Legal AI Assistant. Answer the user's question using ONLY the context provided below or the attached document. 
If the answer cannot be found in the context or the attached document, state that you do not have enough information.
Format your response using Markdown (bullet points, bold text).

Context Documents:
${docsContext || 'None provided in text context.'}

User Question: ${question}
`;

    // Add text prompt as the first part
    parts.unshift({ text: promptText });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: parts }]
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
      model: this.model + ' (Gemini 3.6 Flash)',
      provider: 'impacteers-ai',
      timestamp: new Date().toISOString(),
      disclaimer: this.getSafetyDisclaimer(),
      isLiveAI: true
    };
  }
}

export const legalAssistantService = new LegalAssistantService();
