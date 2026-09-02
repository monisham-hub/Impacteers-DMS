/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Local LLM Ollama Integration & Secure Legal AI Gateway
 */

import { db } from '../db.js';
import { authService } from './authService.js';
import { documentService } from './documentService.js';
import { contractService } from './contractService.js';
import { aiService } from './aiService.js';

class LegalAssistantService {
  constructor() {
    this.endpoint = localStorage.getItem('OLLAMA_ENDPOINT') || 'http://127.0.0.1:11434';
    this.proxyEndpoint = '/api/ollama';
    this.model = localStorage.getItem('OLLAMA_MODEL') || 'llama3.2';
    this.temperature = parseFloat(localStorage.getItem('OLLAMA_TEMP') || '0.3');
    this.isConnected = false;
    this.installedModels = [];
    this.lastCheckTime = null;
    this.isChecking = false;
  }

  getSuggestedPrompts() {
    return [
      'Review this contract for legal risks',
      'Explain this clause in simple language',
      'Identify missing clauses',
      'Summarise this agreement',
      'Compare these two clauses',
      'Draft a stronger termination clause',
      'Identify commercial risks',
      'Check this agreement for inconsistencies'
    ];
  }

  getSafetyDisclaimer() {
    return 'AI Legal Assistant provides general legal information and document-analysis support and does not constitute legal advice or create an attorney-client relationship. AI-generated responses should be independently verified against applicable law and reviewed by a qualified legal professional.';
  }

  getAuthorizedContextDocuments() {
    try {
      return documentService.getDocuments() || [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Check live connection to local Ollama server
   */
  async checkOllamaStatus() {
    if (this.isChecking) return { connected: this.isConnected, models: this.installedModels, activeModel: this.model };
    this.isChecking = true;

    const endpointsToTry = [
      `${this.proxyEndpoint}/tags`,
      `${this.endpoint}/api/tags`
    ];

    let success = false;
    let foundModels = [];

    for (const url of endpointsToTry) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const res = await fetch(url, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.models)) {
            foundModels = data.models.map(m => m.name || m.model);
            success = true;
            break;
          }
        }
      } catch (err) {
        // Try next endpoint
      }
    }

    this.isChecking = false;
    this.lastCheckTime = Date.now();

    if (success && foundModels.length > 0) {
      this.isConnected = true;
      this.installedModels = foundModels;
      
      if (!this.installedModels.includes(this.model) && !this.installedModels.some(m => m.startsWith(this.model))) {
        this.model = this.installedModels[0];
        localStorage.setItem('OLLAMA_MODEL', this.model);
      }

      return {
        connected: true,
        models: this.installedModels,
        activeModel: this.model,
        endpoint: this.endpoint
      };
    } else {
      this.isConnected = false;
      return {
        connected: false,
        models: [],
        activeModel: this.model,
        endpoint: this.endpoint,
        error: 'Ollama is offline or unreachable'
      };
    }
  }

  /**
   * Main Query Entrypoint — calls secure backend /api/legal-assistant/chat via aiService
   */
  async queryLegalAI({ prompt, contextDocId = null, customDocText = '', jurisdiction = 'India', mode = 'general', history = [] }) {
    let docContextText = customDocText || '';

    // If a vault doc ID was selected, retrieve its text & metadata
    if (contextDocId) {
      const docs = this.getAuthorizedContextDocuments();
      const targetDoc = docs.find(d => d.id === contextDocId);
      if (targetDoc) {
        docContextText = `[Vault Document: ${targetDoc.title}]\nCategory: ${targetDoc.documentType || 'Agreement'}\nDepartment: ${targetDoc.departmentName || 'General'}\nStatus: ${targetDoc.status || 'Executed'}\n\n${targetDoc.content || targetDoc.summary || 'Document executed and archived in Impacteers secure legal vault.'}`;
      }
    }

    return await aiService.generateLegalResponse({
      message: prompt,
      documentText: docContextText,
      jurisdiction,
      mode,
      history
    });
  }

  /**
   * Extract contractual clauses by keyword
   */
  extractClauses(text) {
    if (!text) return [];
    const clauses = [];
    const lower = text.toLowerCase();

    const patterns = [
      { type: 'Liability Cap', keyword: 'liability', icon: '⚖️', desc: 'Aggregate liability limit' },
      { type: 'Indemnification', keyword: 'indemn', icon: '🛡️', desc: 'Third-party claim protections' },
      { type: 'Termination', keyword: 'terminat', icon: '⏱️', desc: 'Notice period & cause rights' },
      { type: 'Payment Terms', keyword: 'payment', icon: '💳', desc: 'Invoice cycle & dispute protocol' },
      { type: 'Confidentiality', keyword: 'confidential', icon: '🔒', desc: 'Proprietary info & NDA term' },
      { type: 'Intellectual Property', keyword: 'intellectual property', icon: '💡', desc: 'Ownership & licensing rights' },
      { type: 'Governing Law', keyword: 'governing law', icon: '🏛️', desc: 'Jurisdiction & arbitration venue' },
      { type: 'Non-Solicitation', keyword: 'solicit', icon: '👥', desc: 'Employee & customer non-solicit' },
      { type: 'Force Majeure', keyword: 'force majeure', icon: '⚡', desc: 'Unforeseen disaster excusal' }
    ];

    for (const p of patterns) {
      if (lower.includes(p.keyword)) {
        clauses.push({
          type: p.type,
          icon: p.icon,
          description: p.desc,
          status: 'Present'
        });
      } else {
        clauses.push({
          type: p.type,
          icon: p.icon,
          description: p.desc,
          status: 'Missing / Review Needed'
        });
      }
    }

    return clauses;
  }
}

export const legalAssistantService = new LegalAssistantService();
