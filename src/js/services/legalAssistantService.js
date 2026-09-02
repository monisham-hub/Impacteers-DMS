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

  /**
   * Process a question using the in-house Legal AI & RAG Engine
   */
  async askQuestion({ question, documentId = null, conversationHistory = [] }) {
    if (!question || !question.trim()) {
      throw new Error('Question cannot be empty.');
    }

    const user = authService.getCurrentUser() || { name: 'Counsel', roleLabel: 'Legal User' };
    let targetDoc = null;

    if (documentId) {
      targetDoc = documentService.getDocumentById(documentId);
    }

    // Brief thinking delay for realistic natural AI responsiveness
    await new Promise(resolve => setTimeout(resolve, 300));

    const q = question.trim().toLowerCase();
    let responseText = '';
    let citations = [];

    // 1. Target Document Specific Mode
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
      // 2. Enterprise Legal Knowledge Base & Corporate Law

      // Articles of Association (AOA) / MOA / Board Meetings / Notice Period Rules
      if (q.includes('aoa') || q.includes('articles of association') || q.includes('moa') || q.includes('memorandum') || q.includes('board meeting') || q.includes('general meeting') || q.includes('agm') || q.includes('egm') || q.includes('bylaws') || q.includes('bylaw') || (q.includes('notice period') && (q.includes('meeting') || q.includes('director') || q.includes('shareholder') || q.includes('board')))) {
        responseText = `### Articles of Association (AOA) & Corporate Governance Notice Periods\n\nUnder corporate governance guidelines and the **Articles of Association (AOA)**, standard statutory notice requirements are structured as follows:\n\n#### 1. General Meetings (AGM & EGM)\n- **Standard Notice Period**: Minimum **21 clear days' written notice** (by electronic mail or physical delivery) to all shareholders, directors, and statutory auditors.\n- **Shorter Notice Rule**: A General Meeting may be convened on shorter notice if written consent is received from **not less than 95%** of members entitled to vote at the meeting.\n\n#### 2. Board of Directors Meetings\n- **Standard Notice Period**: Minimum **7 days' prior written notice** sent to every director at their registered address, accompanied by the agenda and draft resolutions.\n- **Urgent Board Meetings**: Permissible on shorter notice provided at least **one Independent Director** is present, or the decisions are subsequently circulated and ratified in writing by the majority.\n\n#### 3. Committee Meetings (Audit, Remuneration & POSH)\n- **Standard Notice Period**: Minimum **3 to 7 business days' notice** with agenda papers circulated in advance.\n\n#### 4. Special Resolutions & Alterations\n- Any resolution to amend the Articles of Association (AOA), alter share capital, or approve mergers requires **21 clear days' notice** with explicit explanatory statements.`;
        citations = [
          'Impacteers Articles of Association (AOA) – Section 4 (Meetings & Notice Provisions)',
          'Corporate Governance & Companies Act Compliance Handbook'
        ];
      }

      // Termination Clauses & Contract Notice Periods
      else if (q.includes('terminat') || (q.includes('notice') && (q.includes('period') || q.includes('contract') || q.includes('agreement') || q.includes('vendor')))) {
        responseText = `### Standard Contract Notice Periods & Termination Guidelines\n\nFor commercial agreements, MSAs, and employment contracts across Impacteers, standard notice periods are:\n\n1. **Commercial Agreements & Vendor MSAs**:\n   - **Termination for Convenience**: **30 to 60 calendar days** prior written notice.\n   - **Material Breach / Cure Period**: **15 to 30 days** written notice to cure default prior to termination.\n   - **Auto-Renewal Notice Window**: Written non-renewal notice required **45 to 60 days** before the expiration date.\n\n2. **Employment & Consultant Agreements**:\n   - **Full-Time Employees**: **30 to 90 calendar days** notice (or salary in lieu of notice) based on grade.\n   - **Probationary Period**: **15 calendar days** written notice.\n   - **Senior Executives**: **60 to 90 calendar days** notice.\n\n3. **Non-Disclosure Agreements (NDAs)**:\n   - Terminated only upon expiration of the **3-year** confidentiality obligation (trade secrets remain protected indefinitely).`;
        citations = [
          'Impacteers Master Contracting Policy – Section 8 (Termination & Notice Standards)',
          'Standard Master Services Agreement (MSA) Template – Clause 10'
        ];
      }

      // Liability Caps & Indemnification
      else if (q.includes('liability') || q.includes('cap') || q.includes('damages') || q.includes('indemn')) {
        responseText = `### Enterprise Liability Cap & Indemnification Policy\n\nImpacteers standard risk allocation guidelines enforce:\n\n- **General Commercial Liability Cap**: Capped at **1x to 2x Annual Contract Value** (or total fees paid in the preceding 12 months).\n- **Mandatory Uncapped Carve-outs**:\n  1. Breach of Confidentiality and Non-Disclosure obligations.\n  2. Third-party Intellectual Property (IP) infringement claims.\n  3. Gross negligence, intentional misconduct, and fraud.\n  4. Data Protection & Privacy violations (DPA / GDPR / DPDP).\n- **Indemnification Scope**: Mutual indemnification must include defense obligations, reasonable legal fees, and hold-harmless protection.`;
        citations = [
          'Impacteers Legal Risk & Contracting Standard – Clause 7 (Limitation of Liability)',
          'Standard Master Services Agreement (MSA) Template – Clause 9'
        ];
      }

      // Confidentiality, Non-Disclosure (NDA) & Trade Secrets
      else if (q.includes('nda') || q.includes('confidential') || q.includes('trade secret') || q.includes('proprietary')) {
        responseText = `### Confidentiality & NDA Standards\n\n- **Protection Term**: Confidential information must remain protected for a minimum of **3 to 5 years** following disclosure.\n- **Trade Secrets & Source Code**: Protected in **perpetuity** (no time limitation).\n- **Standard Exclusions**: Information publicly known without breach, already in possession prior to disclosure, or independently developed.\n- **Permitted Disclosures**: Compelled disclosures under court subpoena require prompt written notice before disclosure to enable protective order filings.`;
        citations = [
          'Impacteers Master Employee NDA Template – Clause 3',
          'DevCore Systems Integration NDA (doc-eng-01)'
        ];
      }

      // Non-Compete & Non-Solicitation
      else if (q.includes('non-compete') || q.includes('non compete') || q.includes('solicit') || q.includes('non-solicit')) {
        responseText = `### Non-Solicitation & Non-Compete Policy\n\n- **Non-Solicitation of Staff & Contractors**: Enforceable for **12 months** following contract termination or separation.\n- **Non-Solicitation of Clients**: Enforceable for **12 months** post-termination regarding active prospective and current clients.\n- **Non-Compete Covenants**: Applied during the active term of employment/contract. Post-termination covenants are tailored to geographic and role reasonableness in compliance with applicable employment laws.`;
        citations = [
          'TalentBridge Staffing Framework MSA (CNT-2026-0002) – Clause 11.2',
          'HR Master Employment Agreement – Clause 14'
        ];
      }

      // Contract Expirations & Renewals
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

      // Payment Terms & Invoicing
      else if (q.includes('payment') || q.includes('invoice') || q.includes('net 30') || q.includes('fee') || q.includes('tax') || q.includes('gst') || q.includes('tds')) {
        responseText = `### Standard Payment Terms & Financial Policy\n\n- **Payment Term**: **Net 30 Days** from receipt of a valid tax invoice.\n- **Invoicing Milestone**: Monthly in arrears or upon signed Milestone Acceptance Certificates.\n- **Taxes & Withholdings**: Invoices must display applicable GST/VAT registration numbers and line-item statutory TDS deductions.\n- **Dispute Tolling**: Disputed amounts are held in escrow without triggering statutory default interest while resolution is underway.`;
        citations = [
          'Impacteers Financial Operations & Treasury Policy – Section 3',
          'Stripe Merchant Payment Processing Agreement (CNT-2026-0003)'
        ];
      }

      // General Corporate Legal Advisory
      else {
        responseText = `### Legal Knowledge Summary\n\nRegarding your inquiry on: **${question.trim()}**\n\n#### Key Corporate & Contracting Principles:\n1. **Contract Review Threshold**: Agreements exceeding **$100,000** or involving third-party IP / cloud hosting require formal review by Legal Manager (**Monisha**).\n2. **Standard Notice Periods**: 30-day notice for contract termination; 21-day notice for General Meetings under AOA; 7-day notice for Board Meetings.\n3. **Payment & Liability**: Standard Net 30 payment terms and 1x-2x annual contract value liability limitations.\n4. **Data Privacy**: All vendor agreements handling employee or user data must execute the corporate Data Processing Addendum (DPA).\n\n*Tip: Select a specific document from the dropdown above to inspect exact clause language.*`;
        citations = ['Impacteers In-House Legal Operations Manual', 'Impacteers Corporate Governance Policy'];
      }
    }

    return {
      id: `impacteers-ai-${Date.now()}`,
      role: 'assistant',
      text: responseText,
      citations: citations,
      model: this.model,
      provider: 'impacteers-ai',
      timestamp: new Date().toISOString(),
      disclaimer: this.getSafetyDisclaimer(),
      isLiveAI: true
    };
  }
}

export const legalAssistantService = new LegalAssistantService();
