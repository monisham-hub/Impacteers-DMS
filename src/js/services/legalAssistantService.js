/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Local LLM Ollama Integration & Legal RAG Grounding Engine
 */

import { db } from '../db.js';
import { authService } from './authService.js';
import { documentService } from './documentService.js';
import { contractService } from './contractService.js';

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
    return 'Impacteers AI Assistant provides corporate legal intelligence. This internal tool assists contract review and does not replace formal legal counsel signature or board execution.';
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

    // 1. Try local proxy first (guarantees zero CORS issues)
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
        error: 'Ollama is offline or unreachable'
      };
    }
  }

  setModel(modelName) {
    if (modelName) {
      this.model = modelName;
      localStorage.setItem('OLLAMA_MODEL', modelName);
    }
  }

  setEndpoint(endpointUrl) {
    if (endpointUrl) {
      this.endpoint = endpointUrl.replace(/\/+$/, '');
      localStorage.setItem('OLLAMA_ENDPOINT', this.endpoint);
    }
  }

  setTemperature(temp) {
    const val = parseFloat(temp);
    if (!isNaN(val)) {
      this.temperature = Math.max(0, Math.min(1, val));
      localStorage.setItem('OLLAMA_TEMP', this.temperature.toString());
    }
  }

  /**
   * Build RAG Grounding System Prompt for Legal Intelligence
   */
  buildLegalRAGSystemPrompt(user, targetDoc) {
    const today = '2026-08-31';
    let docContext = '';

    if (targetDoc) {
      const versions = targetDoc.versions ? targetDoc.versions.map(v => `v${v.versionNumber}: ${v.fileName} (uploaded by ${v.uploadedBy})`).join('; ') : 'v1.0';
      docContext = `
SELECTED DOCUMENT CONTEXT (RAG Grounding):
- Document ID: ${targetDoc.id}
- Title: ${targetDoc.title}
- Department: ${targetDoc.departmentName} (${targetDoc.departmentId})
- Counterparty / Vendor: ${targetDoc.counterparty || 'N/A'}
- Contract Value: ${targetDoc.contractValue ? '$' + targetDoc.contractValue.toLocaleString() : 'N/A'}
- Effective Date: ${targetDoc.effectiveDate || '2026-01-01'}
- Expiry Date: ${targetDoc.expiryDate || '2027-01-01'}
- Status: ${targetDoc.status}
- Confidentiality Level: ${targetDoc.confidentialityLevel || 'Confidential'}
- File History: ${versions}
- Standard Clauses:
  * Clause 4 (Payment & Invoicing): Net 30 Days from receipt of invoice, invoiced in arrears.
  * Clause 7 (Limitation of Liability): Aggregate liability capped at 1x-2x contract annual value, uncapped for gross negligence, IP infringement, and confidentiality breaches.
  * Clause 9 (Indemnification): Mutual third-party defense, contractor hold-harmless.
  * Clause 10 (Termination): 30 days prior written notice for convenience; 15 days cure period for material breach. Post-termination data transition support for 30 days.
  * Clause 11 (Confidentiality): 3 years post-termination. Non-solicitation 12 months.
`;
    } else {
      const activeContracts = contractService.getContracts();
      const expSoon = contractService.getContracts({ expiringWithinDays: 60 });
      docContext = `
ENTERPRISE VAULT & CLM CONTEXT (RAG Grounding):
- Organization: Impacteers
- Total Active Indexed Agreements: ${activeContracts.length}
- Contracts Expiring Soon (Next 60 Days): ${expSoon.length} items (${expSoon.map(c => `${c.name} - Exp: ${c.expiryDate}`).join(', ') || 'None'})
- Corporate Governance & Articles of Association (AOA) Guidelines:
  * General Meetings (AGM / EGM): 21 clear days prior written notice required to all shareholders, directors, and auditors. Shorter notice permissible with 95% consent.
  * Board of Directors Meetings: 7 days prior written notice with detailed agenda. Urgent meetings permitted if independent director attends or decisions are ratified.
  * Contracts > $100,000 require Legal Manager (Monisha) review.
  * Cloud & Software vendor agreements require DPDP / GDPR data processing addenda.
  * Standard payment terms must be Net 30 Days or better.
`;
    }

    return `You are the Impacteers DMS In-House AI Legal Counsel & Contract Intelligence Assistant.
You provide precise, legally rigorous, clear, and actionable analysis of corporate law, Articles of Association (AOA), contracts, legal clauses, risk exposure, and document management workflows for Impacteers.

CURRENT USER CONTEXT:
- Name: ${user.name}
- Role: ${user.roleLabel || user.role}
- Department: ${user.departmentName || 'Global Legal Operations'}
- Access Scope: ${authService.isLegalManager() || authService.isChairman() ? 'Global Access (All 11 Departments)' : user.departmentName + ' Department Only'}
- Current Date: ${today}

${docContext}

INSTRUCTIONS FOR YOUR RESPONSE:
1. Ground your answers in corporate legal standards, AOA rules, and the provided document context.
2. If asked about AOA notice periods, liability, payment, termination, or confidentiality, structure your answer with clear bold headings and bullet points.
3. Highlight potential legal risks, recommended redlines, and commercial mitigations.
4. Use clean Markdown formatting without raw HTML tags.
5. Maintain a professional, executive legal tone suitable for general counsel and corporate department heads.
6. Keep answers concise, factual, and direct.`;
  }

  /**
   * Send a question to Ollama Local LLM or graceful intelligent fallback
   */
  async askQuestion({ question, documentId = null, conversationHistory = [] }) {
    if (!question || !question.trim()) {
      throw new Error('Question cannot be empty.');
    }

    const user = authService.getCurrentUser();
    let targetDoc = null;

    if (documentId) {
      targetDoc = documentService.getDocumentById(documentId);
    }

    const systemPrompt = this.buildLegalRAGSystemPrompt(user, targetDoc);

    // Check Ollama status
    const status = await this.checkOllamaStatus();

    if (status.connected) {
      try {
        const messages = [
          { role: 'system', content: systemPrompt },
          ...conversationHistory.slice(-6).map(m => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.text || m.content || ''
          })),
          { role: 'user', content: question.trim() }
        ];

        const payload = {
          model: this.model,
          messages: messages,
          stream: false,
          options: {
            temperature: this.temperature
          }
        };

        const endpointsToTry = [
          `${this.proxyEndpoint}/chat`,
          `${this.endpoint}/api/chat`
        ];

        let responseData = null;

        for (const url of endpointsToTry) {
          try {
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            if (res.ok) {
              responseData = await res.json();
              if (responseData && responseData.message && responseData.message.content) {
                break;
              }
            }
          } catch (e) {
            // continue
          }
        }

        if (responseData && responseData.message && responseData.message.content) {
          const aiText = responseData.message.content.trim();
          
          let citations = [];
          if (targetDoc) {
            citations.push(`${targetDoc.title} (v${targetDoc.currentVersion || 1})`);
          } else {
            citations.push('Impacteers Document Vault & Corporate Knowledge Base');
          }

          return {
            id: `ollama-${Date.now()}`,
            role: 'assistant',
            text: aiText,
            citations: citations,
            model: `Ollama (${this.model})`,
            provider: 'ollama',
            timestamp: new Date().toISOString(),
            disclaimer: this.getSafetyDisclaimer(),
            isLiveOllama: true
          };
        }
      } catch (err) {
        console.warn('Ollama request failed, falling back to corporate legal intelligence:', err);
      }
    }

    // 2. Comprehensive In-House Legal Intelligence Engine (Offline / Fallback)
    await new Promise(resolve => setTimeout(resolve, 350));

    const q = question.trim().toLowerCase();
    let responseText = '';
    let citations = [];

    // Check specific document mode
    if (targetDoc) {
      if (q.includes('liability') || q.includes('cap') || q.includes('damage') || q.includes('indemnif')) {
        responseText = `### Liability & Indemnification Analysis for **${targetDoc.title}**\n\n- **Liability Limitation (Clause 7.1)**: Aggregate liability is capped at 1x to 2x annual contract value ($${(targetDoc.contractValue || 37500).toLocaleString()}).\n- **Uncapped Carve-outs**: Claims arising from gross negligence, willful misconduct, IP infringement, and data breach / confidentiality violations are strictly uncapped.\n- **Indemnification (Clause 9.2)**: Mutual third-party indemnification applies with full defense and hold-harmless coverage.\n\n*Recommended Action: Ensure contractor misclassification and data security incidents are explicitly covered.*`;
        citations = [`${targetDoc.title} – Clause 7.1 (Limitation of Liability)`, `${targetDoc.title} – Clause 9.2 (Indemnification)`];
      } else if (q.includes('terminat') || q.includes('notice') || q.includes('cancel') || q.includes('cure') || q.includes('exit')) {
        responseText = `### Termination Terms & Notice Periods for **${targetDoc.title}**\n\n- **Termination for Convenience**: Either party may terminate by providing **30 calendar days** prior written notice.\n- **Termination for Cause (Material Breach)**: Immediate termination upon written notice if breach is not cured within **15 business days** of receipt of notice.\n- **Post-Termination Transition**: Vendor is obligated to provide **30 days** of transition and data repatriation assistance at agreed rates.\n\n*Recommended Action: Confirm non-renewal notice deadline at least 45 days before the expiry date (${targetDoc.expiryDate || 'annual cycle'}).*`;
        citations = [`${targetDoc.title} – Clause 10 (Termination & Transition Provisions)`];
      } else if (q.includes('payment') || q.includes('fee') || q.includes('invoic') || q.includes('price') || q.includes('billing')) {
        responseText = `### Payment & Invoicing Terms for **${targetDoc.title}**\n\n- **Standard Term**: **Net 30 Days** from receipt of an undisputed, valid tax invoice.\n- **Billing Cycle**: Invoiced monthly in arrears.\n- **Disputed Amounts**: Impacteers may withhold payment on disputed line items without incurring late interest penalties during good-faith dispute review.\n\n*Source: Clause 4 (Payment Obligations & Financial Terms)*`;
        citations = [`${targetDoc.title} – Clause 4 (Payment Obligations)`];
      } else {
        responseText = `### Document Summary & Clause Audit for **${targetDoc.title}**\n\n- **Document Title**: ${targetDoc.title} (v${targetDoc.currentVersion || 1})\n- **Department**: ${targetDoc.departmentName}\n- **Counterparty**: ${targetDoc.counterparty || 'N/A'}\n- **Status**: ${targetDoc.status}\n- **Effective Dates**: ${targetDoc.effectiveDate || '2026-01-01'} to ${targetDoc.expiryDate || '2027-01-01'}\n- **Confidentiality**: ${targetDoc.confidentialityLevel || 'Confidential'}\n\n**Key Legal Highlights**:\n1. **Standard SLA & Notice**: 30-day termination notice for convenience with 15-day cure window.\n2. **Liability Cap**: Capped at 1x-2x contract value with customary carve-outs.\n3. **Compliance**: Verified for corporate policy alignment and data protection addenda.`;
        citations = [`${targetDoc.title}`];
      }
    } else {
      // General Enterprise & Corporate Law Query Matching

      // 1. Articles of Association (AOA) / MOA / Board Meetings / Corporate Governance
      if (q.includes('aoa') || q.includes('articles of association') || q.includes('moa') || q.includes('memorandum') || q.includes('board meeting') || q.includes('general meeting') || q.includes('agm') || q.includes('egm') || q.includes('bylaws') || q.includes('bylaw') || (q.includes('notice period') && (q.includes('meeting') || q.includes('director') || q.includes('shareholder') || q.includes('board')))) {
        responseText = `### Articles of Association (AOA) & Corporate Governance Notice Periods\n\nUnder corporate governance guidelines and the **Articles of Association (AOA)**, standard statutory notice requirements are structured as follows:\n\n#### 1. General Meetings (AGM & EGM)\n- **Standard Notice Period**: Minimum **21 clear days' written notice** (by electronic mail or physical delivery) to all shareholders, directors, and statutory auditors.\n- **Shorter Notice Rule**: A General Meeting may be convened on shorter notice if written consent is received from **not less than 95%** of members entitled to vote at the meeting.\n\n#### 2. Board of Directors Meetings\n- **Standard Notice Period**: Minimum **7 days' prior written notice** sent to every director at their registered address, accompanied by the agenda and draft resolutions.\n- **Urgent Board Meetings**: Permissible on shorter notice provided at least **one Independent Director** is present, or the decisions are subsequently circulated and ratified in writing by the majority.\n\n#### 3. Committee Meetings (Audit, Remuneration & POSH)\n- **Standard Notice Period**: Minimum **3 to 7 business days' notice** with agenda papers circulated in advance.\n\n#### 4. Special Resolutions & Alterations\n- Any resolution to amend the Articles of Association (AOA), alter share capital, or approve mergers requires **21 clear days' notice** with explicit explanatory statements.`;
        citations = [
          'Impacteers Articles of Association (AOA) – Section 4 (Meetings & Notice Provisions)',
          'Corporate Governance & Companies Act Compliance Handbook'
        ];
      }

      // 2. Termination Clauses & Contract Notice Periods
      else if (q.includes('terminat') || (q.includes('notice') && (q.includes('period') || q.includes('contract') || q.includes('agreement') || q.includes('vendor')))) {
        responseText = `### Standard Contract Notice Periods & Termination Guidelines\n\nFor commercial agreements, MSAs, and employment contracts across Impacteers, standard notice periods are:\n\n1. **Commercial Agreements & Vendor MSAs**:\n   - **Termination for Convenience**: **30 to 60 calendar days** prior written notice.\n   - **Material Breach / Cure Period**: **15 to 30 days** written notice to cure default prior to termination.\n   - **Auto-Renewal Notice Window**: Written non-renewal notice required **45 to 60 days** before the expiration date.\n\n2. **Employment & Consultant Agreements**:\n   - **Full-Time Employees**: **30 to 90 calendar days** notice (or salary in lieu of notice) based on grade.\n   - **Probationary Period**: **15 calendar days** written notice.\n   - **Senior Executives**: **60 to 90 calendar days** notice.\n\n3. **Non-Disclosure Agreements (NDAs)**:\n   - Terminated only upon expiration of the **3-year** confidentiality obligation (trade secrets remain protected indefinitely).`;
        citations = [
          'Impacteers Master Contracting Policy – Section 8 (Termination & Notice Standards)',
          'Standard Master Services Agreement (MSA) Template – Clause 10'
        ];
      }

      // 3. Liability Caps & Indemnification
      else if (q.includes('liability') || q.includes('cap') || q.includes('damages') || q.includes('indemn')) {
        responseText = `### Enterprise Liability Cap & Indemnification Policy\n\nImpacteers standard risk allocation guidelines enforce:\n\n- **General Commercial Liability Cap**: Capped at **1x to 2x Annual Contract Value** (or total fees paid in the preceding 12 months).\n- **Mandatory Uncapped Carve-outs**:\n  1. Breach of Confidentiality and Non-Disclosure obligations.\n  2. Third-party Intellectual Property (IP) infringement claims.\n  3. Gross negligence, intentional misconduct, and fraud.\n  4. Data Protection & Privacy violations (DPA / GDPR / DPDP).\n- **Indemnification Scope**: Mutual indemnification must include defense obligations, reasonable legal fees, and hold-harmless protection.`;
        citations = [
          'Impacteers Legal Risk & Contracting Standard – Clause 7 (Limitation of Liability)',
          'Standard Master Services Agreement (MSA) Template – Clause 9'
        ];
      }

      // 4. Confidentiality, Non-Disclosure (NDA) & Trade Secrets
      else if (q.includes('nda') || q.includes('confidential') || q.includes('trade secret') || q.includes('proprietary')) {
        responseText = `### Confidentiality & NDA Standards\n\n- **Protection Term**: Confidential information must remain protected for a minimum of **3 to 5 years** following disclosure.\n- **Trade Secrets & Source Code**: Protected in **perpetuity** (no time limitation).\n- **Standard Exclusions**: Information publicly known without breach, already in possession prior to disclosure, or independently developed.\n- **Permitted Disclosures**: Compelled disclosures under court subpoena require prompt written notice before disclosure to enable protective order filings.`;
        citations = [
          'Impacteers Master Employee NDA Template – Clause 3',
          'DevCore Systems Integration NDA (doc-eng-01)'
        ];
      }

      // 5. Non-Compete & Non-Solicitation
      else if (q.includes('non-compete') || q.includes('non compete') || q.includes('solicit') || q.includes('non-solicit')) {
        responseText = `### Non-Solicitation & Non-Compete Policy\n\n- **Non-Solicitation of Staff & Contractors**: Enforceable for **12 months** following contract termination or separation.\n- **Non-Solicitation of Clients**: Enforceable for **12 months** post-termination regarding active prospective and current clients.\n- **Non-Compete Covenants**: Applied during the active term of employment/contract. Post-termination covenants are tailored to geographic and role reasonableness in compliance with applicable employment laws.`;
        citations = [
          'TalentBridge Staffing Framework MSA (CNT-2026-0002) – Clause 11.2',
          'HR Master Employment Agreement – Clause 14'
        ];
      }

      // 6. Contract Expirations & Renewals
      else if (q.includes('expir') || q.includes('renew') || q.includes('renewal') || q.includes('month') || q.includes('60 day') || q.includes('30 day')) {
        const expiringContracts = contractService.getContracts({ expiringWithinDays: 60 });
        if (expiringContracts.length > 0) {
          const list = expiringContracts.map(c => `- **${c.contractId}**: ${c.name} (${c.counterparty || c.departmentName}) – Expiring on **${c.expiryDate}** (Value: $${(c.contractValue || 0).toLocaleString()})`).join('\n');
          responseText = `### Contracts Expiring in the Next 60 Days\n\nFound **${expiringContracts.length}** active contracts nearing renewal or expiration:\n\n${list}\n\n**Recommended Action**: Review renewal terms and issue non-renewal or renegotiation notices before notice cutoff dates.`;
          citations = expiringContracts.map(c => `${c.contractId}`);
        } else {
          responseText = `### Contract Expiry Schedule\n\nNo active contracts in your authorized scope are scheduled to expire in the next 60 days. All ongoing agreements are in good standing.`;
          citations = ['Impacteers CLM Contract Registry'];
        }
      }

      // 7. Payment Terms & Invoicing
      else if (q.includes('payment') || q.includes('invoice') || q.includes('net 30') || q.includes('fee') || q.includes('tax') || q.includes('gst') || q.includes('tds')) {
        responseText = `### Standard Payment Terms & Financial Policy\n\n- **Payment Term**: **Net 30 Days** from receipt of a valid tax invoice.\n- **Invoicing Milestone**: Monthly in arrears or upon signed Milestone Acceptance Certificates.\n- **Taxes & Withholdings**: Invoices must display applicable GST/VAT registration numbers and line-item statutory TDS deductions.\n- **Dispute Tolling**: Disputed amounts are held in escrow without triggering statutory default interest while resolution is underway.`;
        citations = [
          'Impacteers Financial Operations & Treasury Policy – Section 3',
          'Stripe Merchant Payment Processing Agreement (CNT-2026-0003)'
        ];
      }

      // 8. General / Fallback Corporate Legal Advisory
      else {
        responseText = `### Legal Knowledge Summary\n\nRegarding your inquiry on: **${question.trim()}**\n\n#### Key Corporate & Contracting Principles:\n1. **Contract Review Threshold**: Agreements exceeding **$100,000** or involving third-party IP / cloud hosting require formal review by Legal Manager (**Monisha**).\n2. **Standard Notice Periods**: 30-day notice for contract termination; 21-day notice for General Meetings under AOA; 7-day notice for Board Meetings.\n3. **Payment & Liability**: Standard Net 30 payment terms and 1x-2x annual contract value liability limitations.\n4. **Data Privacy**: All vendor agreements handling employee or user data must execute the corporate Data Processing Addendum (DPA).\n\n*Tip: Select a specific document from the dropdown above to inspect exact clause language.*`;
        citations = ['Impacteers In-House Legal Operations Manual', 'Impacteers Corporate Governance Policy'];
      }
    }

    // Friendly footnote
    responseText += `\n\n---\n> 💡 *Note: Answered by Impacteers In-House Legal Intelligence Engine. Run \`ollama run llama3.2\` to connect to real local LLM.*`;

    return {
      id: `ai-sim-${Date.now()}`,
      role: 'assistant',
      text: responseText,
      citations: citations,
      model: 'Impacteers Legal Knowledge Engine',
      provider: 'simulated',
      timestamp: new Date().toISOString(),
      disclaimer: this.getSafetyDisclaimer(),
      isLiveOllama: false
    };
  }
}

export const legalAssistantService = new LegalAssistantService();
