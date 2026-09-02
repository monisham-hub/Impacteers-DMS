/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Full Page Legal AI Assistant (Impacteers Legal Intelligence & RAG Grounding Engine)
 */

import { authService } from '../services/authService.js';
import { legalAssistantService } from '../services/legalAssistantService.js';
import { documentService } from '../services/documentService.js';

export function renderLegalAssistantPage() {
  const user = authService.getCurrentUser();
  const suggestedPrompts = legalAssistantService.getSuggestedPrompts();
  const authorizedDocs = legalAssistantService.getAuthorizedContextDocuments();
  const disclaimer = legalAssistantService.getSafetyDisclaimer();

  return `
    <div class="content-container" style="max-width: 1200px;">
      <!-- Header -->
      <div class="page-header" style="margin-bottom: 16px;">
        <div>
          <div class="page-title">
            <span>🤖</span>
            <span>Impacteers AI Legal Assistant</span>
          </div>
          <div class="page-subtitle">
            Enterprise legal intelligence across Articles of Association (AOA), active contracts, NDAs, and corporate policies.
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <div style="font-size: 12px; padding: 4px 12px; border-radius: 20px; background: #ECFDF5; color: #047857; font-weight: 700; display: flex; align-items: center; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
            <span>AI Knowledge Engine Active</span>
          </div>
        </div>
      </div>

      <!-- Regulatory Safety Disclaimer Banner -->
      <div style="
        background: #EFF6FF;
        border: 1px solid #BFDBFE;
        border-left: 4px solid #2563EB;
        border-radius: 8px;
        padding: 12px 16px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
      ">
        <span style="font-size: 20px;">🛡️</span>
        <div style="font-size: 12.5px; color: #1E40AF; line-height: 1.4;">
          <strong>Enterprise Legal Intelligence:</strong> ${disclaimer}
        </div>
      </div>

      <!-- Main Chat Area -->
      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 270px);
        min-height: 540px;
        box-shadow: var(--shadow-sm);
        overflow: hidden;
      ">
        
        <!-- Context Document Selector Bar -->
        <div style="
          padding: 12px 20px;
          background: #F8FAFC;
          border-bottom: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        ">
          <!-- Document Context Selector -->
          <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 260px;">
            <span style="font-size: 13px; font-weight: 600; color: #334155; white-space: nowrap;">📄 Grounding Context:</span>
            <select id="ai-document-context-select" class="form-select" style="font-size: 12.5px; padding: 6px 10px; max-width: 420px;">
              <option value="">All Authorized Vault Documents (${authorizedDocs.length} indexed)</option>
              ${authorizedDocs
                .map(
                  d => `
                <option value="${d.id}">
                  ${d.title} (${d.departmentName} • v${d.currentVersion || 1})
                </option>
              `
                )
                .join('')}
            </select>
          </div>

          <!-- Controls -->
          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="btn btn-secondary btn-sm" id="ai-clear-chat-btn" style="font-size: 12px; padding: 4px 10px;">
              🗑️ Clear Chat
            </button>
          </div>
        </div>

        <!-- Chat Messages Container -->
        <div id="ai-messages-container" style="
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #FFFFFF;
        ">
          <!-- Initial Welcome Message -->
          <div style="display: flex; gap: 14px; max-width: 85%;">
            <div style="
              width: 36px;
              height: 36px;
              border-radius: 8px;
              background: linear-gradient(135deg, #2563EB, #1D4ED8);
              color: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              flex-shrink: 0;
            ">🤖</div>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px;">
              <div style="font-weight: 600; font-size: 13px; color: #0F172A; margin-bottom: 6px;">Impacteers AI Legal Counsel</div>
              <div style="font-size: 13.5px; color: #334155; line-height: 1.6;">
                Hello <strong>${user.name}</strong>. I am your in-house corporate legal assistant with full visibility into your authorized department agreements, Articles of Association (AOA), and corporate policies.
                <br/><br/>
                You can ask me to:
                <ul style="margin: 6px 0 0 18px; font-size: 13px; color: #475569;">
                  <li>Verify notice periods for Board Meetings and General Meetings under AOA</li>
                  <li>Audit liability caps and indemnification obligations</li>
                  <li>Verify termination rights, cure periods, and transition requirements</li>
                  <li>Check payment and invoice dispute terms</li>
                  <li>Flag upcoming contract renewals and expirations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Suggested Questions Carousel -->
        <div style="
          padding: 10px 20px;
          background: #F8FAFC;
          border-top: 1px solid #E2E8F0;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          white-space: nowrap;
        ">
          ${suggestedPrompts
            .map(
              p => `
            <button class="btn btn-secondary btn-sm" style="font-size: 11.5px; padding: 4px 12px; border-radius: 20px; background: #FFFFFF;" onclick="window.usePageSuggestedPrompt(this.innerText)">
              ${p}
            </button>
          `
            )
            .join('')}
        </div>

        <!-- Input Box -->
        <div style="padding: 16px 20px; background: #FFFFFF; border-top: 1px solid #E2E8F0; display: flex; gap: 12px;">
          <input type="text" id="ai-chat-input" class="form-input" placeholder="Ask a legal question (e.g. What are the notice periods under AOA?)..." style="font-size: 14px; padding: 11px 16px; border-radius: 8px;" autocomplete="off" />
          <button class="btn btn-primary" id="ai-send-btn" style="padding: 0 20px; font-weight: 600; white-space: nowrap;">
            <span>Send Question ➔</span>
          </button>
        </div>

      </div>
    </div>
  `;
}
