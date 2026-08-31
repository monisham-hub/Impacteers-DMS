/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Full Page Legal AI Assistant (Local Ollama LLM + RAG Grounding Engine)
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
            <span>Local AI Legal Assistant (Ollama Powered)</span>
          </div>
          <div class="page-subtitle">
            100% private, on-device enterprise intelligence across contracts, NDAs, and corporate policies.
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <div id="page-ollama-status-pill" onclick="window.showOllamaSetupModal()" style="font-size: 12px; padding: 4px 12px; border-radius: 20px; background: #FEF3C7; color: #92400E; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;" title="Click for Ollama setup guide">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #F59E0B; display: inline-block;"></span>
            <span>Checking Ollama...</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.showOllamaSetupModal()">
            ⚙️ Ollama Setup Guide
          </button>
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
          <strong>Private AI Legal Intelligence:</strong> ${disclaimer}
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
        
        <!-- Context Document Selector & Model Picker Bar -->
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
            <select id="ai-document-context-select" class="form-select" style="font-size: 12.5px; padding: 6px 10px; max-width: 380px;">
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

          <!-- Model Picker & Controls -->
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 12.5px; font-weight: 600; color: #475569;">Model:</span>
              <select id="ai-page-model-select" class="form-select" onchange="window.handleModelChange(this.value)" style="font-size: 12px; padding: 4px 8px; width: auto; min-width: 130px;">
                <option value="llama3.2">llama3.2</option>
                <option value="mistral">mistral</option>
                <option value="qwen2.5">qwen2.5</option>
                <option value="deepseek-r1">deepseek-r1</option>
              </select>
            </div>

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
                Hello <strong>${user.name}</strong>. I am your corporate legal assistant powered by local Ollama LLM. I have full permission-scoped visibility into your authorized documents.
                <br/><br/>
                You can ask me to:
                <ul style="margin: 6px 0 0 18px; font-size: 13px; color: #475569;">
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
          <input type="text" id="ai-chat-input" class="form-input" placeholder="Ask a legal question (e.g. What is the liability cap in our Staffing agreements?)..." style="font-size: 14px; padding: 11px 16px; border-radius: 8px;" autocomplete="off" />
          <button class="btn btn-primary" id="ai-send-btn" style="padding: 0 20px; font-weight: 600; white-space: nowrap;">
            <span>Send Question ➔</span>
          </button>
        </div>

      </div>
    </div>
  `;
}
