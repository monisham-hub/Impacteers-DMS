/**
 * Impacteers DMS — Enterprise AI Legal Assistant Service
 * Abstraction layer for legal research, contract auditing, clause analysis, and session memory.
 * Communicates exclusively with the secure server-side API (/api/legal-assistant/chat).
 */

class AIService {
  constructor() {
    this.storageKey = 'impacteers_dms_ai_sessions_v2';
    this.currentSessionIdKey = 'impacteers_dms_current_ai_session_id';
    this.activeJurisdictionKey = 'impacteers_dms_ai_jurisdiction';
    this.activeModeKey = 'impacteers_dms_ai_mode';

    this.defaultJurisdiction = localStorage.getItem(this.activeJurisdictionKey) || 'India';
    this.defaultMode = localStorage.getItem(this.activeModeKey) || 'general';

    this.initDefaultSession();
  }

  // ---------------------------------------------------------------------------
  // 1. Backend Status & Metadata
  // ---------------------------------------------------------------------------
  async getStatus() {
    try {
      const res = await fetch('/api/legal-assistant/status');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return {
        status: 'offline',
        provider: 'Fallback Rule Engine',
        model: 'in-house-v1',
        apiKeyConfigured: false,
        jurisdictions: ['India', 'Tamil Nadu', 'Delaware / US', 'United Kingdom', 'Custom'],
        disclaimer: 'AI Legal Assistant provides general legal information and document-analysis support and does not constitute legal advice.'
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Chat Query Execution
  // ---------------------------------------------------------------------------
  async generateLegalResponse({ message, documentText = '', jurisdiction = null, mode = null, history = [], model = null }) {
    const activeJur = jurisdiction || this.getJurisdiction();
    const activeMode = mode || this.getMode();

    const payload = {
      message: message.trim(),
      documentText: documentText ? documentText.trim() : '',
      jurisdiction: activeJur,
      mode: activeMode,
      conversationHistory: history.slice(-8), // Keep recent conversation window
      model: model || null
    };

    try {
      const res = await fetch('/api/legal-assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      return {
        success: true,
        reply: data.reply,
        provider: data.provider || 'Impacteers Legal Assistant',
        jurisdiction: data.jurisdiction || activeJur,
        mode: data.mode || activeMode,
        timestamp: data.timestamp || new Date().toISOString()
      };
    } catch (err) {
      return {
        success: false,
        error: 'Unable to connect to the Legal Assistant right now. Please try again or verify your server configuration.',
        reply: `⚠️ **Unable to connect to the Legal Assistant right now.**\n\nPlease try again in a few moments.\n\n*Error details: ${err.message || 'Connection failed'}*`,
        provider: 'Connection Error'
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 3. Document Analysis & Clause Auditing Specialized Methods
  // ---------------------------------------------------------------------------
  async analyzeDocument({ documentText, fileName, jurisdiction = null }) {
    const prompt = `Please perform a comprehensive contract review of this agreement (${fileName || 'Uploaded Agreement'}). 
Identify:
1. One-sided or unbalanced obligations
2. Liability caps and indemnification scope
3. Termination rights and notice periods
4. Missing critical clauses (Data Protection, Force Majeure, IP assignment, Non-Solicit)
5. Clear recommended action points and a clause risk matrix table.`;

    return this.generateLegalResponse({
      message: prompt,
      documentText,
      jurisdiction,
      mode: 'review'
    });
  }

  async compareClauses({ clauseA, clauseB, jurisdiction = null }) {
    const prompt = `Please perform a side-by-side legal comparison between these two clauses:

CLAUSE A:
"""
${clauseA}
"""

CLAUSE B:
"""
${clauseB}
"""

Evaluate:
1. Which clause provides stronger legal and commercial protection?
2. What are the key risk differences?
3. Provide a recommended balanced version.`;

    return this.generateLegalResponse({
      message: prompt,
      jurisdiction,
      mode: 'compare'
    });
  }

  async checkMissingClauses({ documentText, contractType = 'Commercial Agreement', jurisdiction = null }) {
    const prompt = `Review this ${contractType} specifically to identify any MISSING clauses or omitted protections that should be included under ${jurisdiction || 'applicable law'}. Generate a missing-clause risk checklist with suggested drafting additions.`;

    return this.generateLegalResponse({
      message: prompt,
      documentText,
      jurisdiction,
      mode: 'missing_clauses'
    });
  }

  // ---------------------------------------------------------------------------
  // 4. Session & Chat History Management (Client Storage)
  // ---------------------------------------------------------------------------
  getSessions() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveSessions(sessions) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions to localStorage:', e);
    }
  }

  getCurrentSessionId() {
    return localStorage.getItem(this.currentSessionIdKey);
  }

  setCurrentSessionId(id) {
    localStorage.setItem(this.currentSessionIdKey, id);
  }

  getCurrentSession() {
    const sessions = this.getSessions();
    const currentId = this.getCurrentSessionId();
    let current = sessions.find(s => s.id === currentId);
    if (!current && sessions.length > 0) {
      current = sessions[0];
      this.setCurrentSessionId(current.id);
    }
    return current || null;
  }

  initDefaultSession() {
    const sessions = this.getSessions();
    if (sessions.length === 0) {
      this.createSession('General Legal Consultation', this.defaultJurisdiction);
    }
  }

  createSession(title = 'New Legal Chat', jurisdiction = null) {
    const sessions = this.getSessions();
    const newSession = {
      id: 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
      title: title || 'New Legal Consultation',
      jurisdiction: jurisdiction || this.getJurisdiction(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attachedDocument: null, // { name, text, size }
      messages: [
        {
          id: 'msg-' + Date.now(),
          role: 'assistant',
          content: `Hello! I am your **AI Legal Assistant**. I can assist you with contract review, clause risk analysis, plain-English explanations, drafting safer wording, and checking compliance under **${jurisdiction || this.getJurisdiction()}** law.\n\nHow can I help you today? You can also upload or paste a contract for clause-by-clause analysis.`,
          timestamp: new Date().toISOString(),
          provider: 'Impacteers Legal Assistant'
        }
      ]
    };

    sessions.unshift(newSession);
    this.saveSessions(sessions);
    this.setCurrentSessionId(newSession.id);
    return newSession;
  }

  addMessage(sessionId, message) {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    const newMsg = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      role: message.role, // 'user' | 'assistant'
      content: message.content,
      timestamp: new Date().toISOString(),
      provider: message.provider || 'Impacteers AI',
      jurisdiction: message.jurisdiction || session.jurisdiction,
      mode: message.mode || 'general'
    };

    session.messages.push(newMsg);
    session.updatedAt = new Date().toISOString();

    // Auto-update title based on first user question
    if (session.messages.filter(m => m.role === 'user').length === 1 && message.role === 'user') {
      const cleanTitle = message.content.slice(0, 36).replace(/\n/g, ' ').trim() + (message.content.length > 36 ? '...' : '');
      session.title = cleanTitle || 'Legal Inquiry';
    }

    this.saveSessions(sessions);
    return newMsg;
  }

  attachDocumentToSession(sessionId, docObj) {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    session.attachedDocument = docObj; // { name, text, size, charCount }
    session.updatedAt = new Date().toISOString();
    this.saveSessions(sessions);
  }

  removeAttachedDocument(sessionId) {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    session.attachedDocument = null;
    session.updatedAt = new Date().toISOString();
    this.saveSessions(sessions);
  }

  deleteSession(sessionId) {
    let sessions = this.getSessions();
    sessions = sessions.filter(s => s.id !== sessionId);
    this.saveSessions(sessions);

    if (this.getCurrentSessionId() === sessionId) {
      if (sessions.length > 0) {
        this.setCurrentSessionId(sessions[0].id);
      } else {
        this.createSession('General Legal Consultation', this.getJurisdiction());
      }
    }
  }

  clearAllSessions() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.currentSessionIdKey);
    return this.createSession('General Legal Consultation', this.getJurisdiction());
  }

  // ---------------------------------------------------------------------------
  // 5. Jurisdiction & Preferences
  // ---------------------------------------------------------------------------
  getJurisdiction() {
    return localStorage.getItem(this.activeJurisdictionKey) || 'India';
  }

  setJurisdiction(jurisdiction) {
    localStorage.setItem(this.activeJurisdictionKey, jurisdiction);
    const session = this.getCurrentSession();
    if (session) {
      session.jurisdiction = jurisdiction;
      const sessions = this.getSessions();
      const idx = sessions.findIndex(s => s.id === session.id);
      if (idx !== -1) {
        sessions[idx].jurisdiction = jurisdiction;
        this.saveSessions(sessions);
      }
    }
  }

  getMode() {
    return localStorage.getItem(this.activeModeKey) || 'general';
  }

  setMode(mode) {
    localStorage.setItem(this.activeModeKey, mode);
  }
}

export const aiService = new AIService();
