/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Full 3-Panel Enterprise AI Legal Assistant & Contract Audit Workspace
 */

import { authService } from '../services/authService.js';
import { aiService } from '../services/aiService.js';
import { legalAssistantService } from '../services/legalAssistantService.js';
import { documentService } from '../services/documentService.js';

export function renderLegalAssistantPage() {
  const user = authService.getCurrentUser();
  const sessions = aiService.getSessions();
  const currentSession = aiService.getCurrentSession() || (sessions.length ? sessions[0] : null);
  const activeJurisdiction = currentSession ? currentSession.jurisdiction : aiService.getJurisdiction();
  const activeMode = aiService.getMode();
  const suggestedPrompts = legalAssistantService.getSuggestedPrompts();
  const vaultDocs = legalAssistantService.getAuthorizedContextDocuments();
  const disclaimer = legalAssistantService.getSafetyDisclaimer();

  const attachedDoc = currentSession ? currentSession.attachedDocument : null;
  const messages = currentSession ? currentSession.messages : [];
  const extractedClauses = attachedDoc ? legalAssistantService.extractClauses(attachedDoc.text) : [];

  return `
    <div class="content-container" style="max-width: 1440px; padding: 0 16px 24px 16px;">
      
      <!-- Top Page Breadcrumb & Quick Info -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <h1 style="font-size: 22px; font-weight: 700; color: #0F172A; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>⚖️</span>
            <span>AI Legal Assistant & Contract Workspace</span>
          </h1>
          <span class="badge badge-blue" style="font-size: 11.5px; font-weight: 700; padding: 3px 10px;">Enterprise AI</span>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <div id="ai-backend-status-pill" style="font-size: 12px; padding: 4px 12px; border-radius: 20px; background: #ECFDF5; color: #065F46; font-weight: 700; display: flex; align-items: center; gap: 6px; border: 1px solid #A7F3D0;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
            <span>AI Gateway Connected</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.showAIConfigModal()" style="font-size: 12px;">
            ⚙️ AI & Provider Settings
          </button>
        </div>
      </div>

      <!-- Mandatory Safety & Regulatory Disclaimer Banner -->
      <div style="
        background: #EFF6FF;
        border: 1px solid #BFDBFE;
        border-left: 4px solid #2563EB;
        border-radius: 8px;
        padding: 10px 16px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
      ">
        <span style="font-size: 18px;">🛡️</span>
        <div style="font-size: 12px; color: #1E40AF; line-height: 1.45;">
          <strong>Legal Information Notice:</strong> ${disclaimer}
        </div>
      </div>

      <!-- 3-Panel Main Layout Container -->
      <div style="
        display: grid;
        grid-template-columns: 280px 1fr 300px;
        gap: 16px;
        height: calc(100vh - 230px);
        min-height: 600px;
      " id="ai-three-panel-grid">

        <!-- ================================================================= -->
        <!-- PANEL 1 (LEFT): Chat Sessions & Jurisdiction Controls -->
        <!-- ================================================================= -->
        <div style="
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        ">
          <!-- New Chat Button -->
          <div style="padding: 14px; border-bottom: 1px solid #E2E8F0;">
            <button class="btn btn-primary" style="width: 100%; justify-content: center; font-weight: 600; font-size: 13px;" onclick="window.handleCreateNewChat()">
              ➕ New Legal Chat
            </button>
          </div>

          <!-- Jurisdiction Selector Card -->
          <div style="padding: 12px 14px; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
            <label style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #475569; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">
              📍 Active Jurisdiction
            </label>
            <select id="ai-jurisdiction-select" class="form-select" onchange="window.handleJurisdictionChange(this.value)" style="font-size: 12.5px; padding: 6px 10px; font-weight: 600; color: #0F172A;">
              <option value="India" ${activeJurisdiction === 'India' ? 'selected' : ''}>🇮🇳 India (National Law)</option>
              <option value="Tamil Nadu" ${activeJurisdiction === 'Tamil Nadu' ? 'selected' : ''}>🇮🇳 Tamil Nadu (State Law & Regulations)</option>
              <option value="Delaware / US" ${activeJurisdiction === 'Delaware / US' ? 'selected' : ''}>🇺🇸 Delaware / US (Corporate Law)</option>
              <option value="United Kingdom" ${activeJurisdiction === 'United Kingdom' ? 'selected' : ''}>🇬🇧 United Kingdom (Common Law)</option>
              <option value="Custom" ${activeJurisdiction === 'Custom' ? 'selected' : ''}>🌐 Custom / International</option>
            </select>
          </div>

          <!-- Analysis Mode Switcher -->
          <div style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; background: #FFFFFF;">
            <label style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #475569; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">
              🎯 Analysis Focus
            </label>
            <select id="ai-mode-select" class="form-select" onchange="window.handleModeChange(this.value)" style="font-size: 12px; padding: 5px 8px;">
              <option value="general" ${activeMode === 'general' ? 'selected' : ''}>⚖️ General Legal Q&A</option>
              <option value="review" ${activeMode === 'review' ? 'selected' : ''}>📑 Full Contract Audit</option>
              <option value="explainer" ${activeMode === 'explainer' ? 'selected' : ''}>🔍 Clause Explainer</option>
              <option value="compare" ${activeMode === 'compare' ? 'selected' : ''}>⚖️ Compare Clauses</option>
              <option value="missing_clauses" ${activeMode === 'missing_clauses' ? 'selected' : ''}>⚠️ Missing Clauses Audit</option>
              <option value="checklist" ${activeMode === 'checklist' ? 'selected' : ''}>📋 Compliance Checklist</option>
            </select>
          </div>

          <!-- Sessions List Header -->
          <div style="padding: 10px 14px; font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between; align-items: center;">
            <span>Recent Consultations</span>
            <span style="font-size: 10.5px; background: #E2E8F0; padding: 1px 6px; border-radius: 10px; color: #334155;">${sessions.length}</span>
          </div>

          <!-- Sessions List -->
          <div style="flex: 1; overflow-y: auto; padding: 0 8px;" id="ai-sessions-list-container">
            ${sessions
              .map(s => {
                const isActive = currentSession && currentSession.id === s.id;
                const msgCount = s.messages ? s.messages.length : 0;
                return `
                <div 
                  onclick="window.handleSelectSession('${s.id}')"
                  style="
                    padding: 10px 12px;
                    border-radius: 8px;
                    margin-bottom: 4px;
                    cursor: pointer;
                    background: ${isActive ? '#EFF6FF' : 'transparent'};
                    border: 1px solid ${isActive ? '#BFDBFE' : 'transparent'};
                    transition: all 0.15s ease;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                  "
                  onmouseover="if(!${isActive}) this.style.background='#F8FAFC'"
                  onmouseout="if(!${isActive}) this.style.background='transparent'"
                >
                  <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 12.5px; font-weight: ${isActive ? '700' : '500'}; color: ${isActive ? '#1E40AF' : '#1E293B'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${s.title}
                    </div>
                    <div style="font-size: 11px; color: #64748B; margin-top: 2px;">
                      ${new Date(s.updatedAt).toLocaleDateString()} • ${s.jurisdiction || 'India'}
                    </div>
                  </div>
                  <button 
                    onclick="event.stopPropagation(); window.handleDeleteSession('${s.id}')"
                    style="background: transparent; border: none; font-size: 12px; cursor: pointer; color: #94A3B8; padding: 2px 4px; border-radius: 4px;"
                    title="Delete consultation"
                    onmouseover="this.style.color='#DC2626'"
                    onmouseout="this.style.color='#94A3B8'"
                  >
                    🗑️
                  </button>
                </div>
              `;
              })
              .join('')}
          </div>

          <!-- Left Panel Footer -->
          <div style="padding: 10px 14px; border-top: 1px solid #E2E8F0; background: #FAFAFA;">
            <button class="btn btn-secondary btn-sm" style="width: 100%; font-size: 11.5px; justify-content: center; color: #64748B;" onclick="window.handleClearAllSessions()">
              🧹 Clear All History
            </button>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- PANEL 2 (CENTER): Active Chat Stream & Composer -->
        <!-- ================================================================= -->
        <div style="
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        ">
          <!-- Active Conversation Header Bar -->
          <div style="
            padding: 12px 18px;
            background: #F8FAFC;
            border-bottom: 1px solid #E2E8F0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          ">
            <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;">
              <div style="font-size: 14px; font-weight: 700; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${currentSession ? currentSession.title : 'Legal Consultation'}
              </div>
              <span class="badge badge-slate" style="font-size: 11px;">
                📍 ${activeJurisdiction}
              </span>
            </div>

            <!-- Attached Document Pill / Status -->
            <div style="display: flex; align-items: center; gap: 8px;">
              ${
                attachedDoc
                  ? `
                <div style="font-size: 12px; padding: 4px 10px; border-radius: 6px; background: #EFF6FF; border: 1px solid #BFDBFE; color: #1E40AF; display: flex; align-items: center; gap: 6px;">
                  <span>📄 ${attachedDoc.name}</span>
                  <span style="cursor: pointer; color: #DC2626; font-weight: 700;" onclick="window.handleRemoveAttachedDocument()" title="Remove document">✖</span>
                </div>
              `
                  : `
                <button class="btn btn-secondary btn-sm" onclick="window.openDocumentAttachModal()" style="font-size: 11.5px; padding: 4px 10px;">
                  📎 Attach Agreement / Clause
                </button>
              `
              }
              <button class="btn btn-secondary btn-sm" onclick="window.toggleRightInspector()" style="font-size: 11.5px; padding: 4px 10px;">
                📊 Inspector
              </button>
            </div>
          </div>

          <!-- Chat Messages Container -->
          <div id="ai-chat-messages-scroll" style="
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            background: #FAFAFA;
          ">
            ${messages
              .map(msg => renderLegalMessageBubble(msg))
              .join('')}
          </div>

          <!-- Suggested Prompts Quick Bar -->
          <div style="
            padding: 8px 16px;
            background: #FFFFFF;
            border-top: 1px solid #F1F5F9;
            overflow-x: auto;
            display: flex;
            gap: 8px;
            white-space: nowrap;
          ">
            ${suggestedPrompts
              .map(
                p => `
              <button 
                class="btn btn-sm" 
                style="border-radius: 16px; padding: 4px 12px; font-size: 11.5px; background: #F1F5F9; color: #334155; border: 1px solid #E2E8F0;"
                onclick="window.handlePromptClick('${p.replace(/'/g, "\\'")}')"
              >
                💡 ${p}
              </button>
            `
              )
              .join('')}
          </div>

          <!-- Input Composer Area -->
          <div style="
            padding: 12px 16px;
            background: #FFFFFF;
            border-top: 1px solid #E2E8F0;
          ">
            <div style="display: flex; gap: 10px; align-items: flex-end;">
              <div style="flex: 1; position: relative;">
                <textarea 
                  id="ai-chat-input" 
                  class="form-textarea" 
                  rows="2" 
                  placeholder="Ask a legal question, paste a contract clause, or request drafting recommendations..."
                  style="resize: none; font-size: 13.5px; padding: 10px 12px; line-height: 1.45; border-radius: 8px;"
                  onkeydown="if(event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); window.handleSendLegalQuery(); }"
                ></textarea>
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px;">
                <button 
                  class="btn btn-primary" 
                  id="ai-send-query-btn"
                  onclick="window.handleSendLegalQuery()"
                  style="height: 40px; padding: 0 18px; font-weight: 600;"
                >
                  <span>Send</span>
                  <span>🚀</span>
                </button>
                <button 
                  class="btn btn-secondary btn-sm" 
                  onclick="window.openDocumentAttachModal()"
                  style="padding: 2px 8px; font-size: 11px;"
                  title="Attach or paste agreement"
                >
                  📎 Attach
                </button>
              </div>
            </div>
            
            <div style="font-size: 11px; color: #94A3B8; margin-top: 6px; display: flex; justify-content: space-between;">
              <span>Press <strong>Enter</strong> to send • <strong>Shift+Enter</strong> for newline</span>
              <span>All uploads evaluated in secure server sandbox</span>
            </div>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- PANEL 3 (RIGHT): Document & Clause Risk Inspector (Collapsible) -->
        <!-- ================================================================= -->
        <div id="ai-right-inspector-panel" style="
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        ">
          <div style="padding: 12px 16px; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 13px; font-weight: 700; color: #0F172A; display: flex; align-items: center; gap: 6px;">
              <span>📊</span>
              <span>Document & Risk Audit</span>
            </div>
          </div>

          <div style="flex: 1; overflow-y: auto; padding: 14px;">
            ${
              attachedDoc
                ? `
              <!-- Document Metadata Card -->
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
                <div style="font-size: 13px; font-weight: 700; color: #0F172A;">${attachedDoc.name}</div>
                <div style="font-size: 11.5px; color: #64748B; margin-top: 4px;">
                  Length: <strong>${attachedDoc.charCount || attachedDoc.text.length} chars</strong> • Words: <strong>~${Math.round(attachedDoc.text.split(/\s+/).length)}</strong>
                </div>
              </div>

              <!-- Clause Checklist Breakdown -->
              <div style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; color: #475569; letter-spacing: 0.05em; margin-bottom: 8px;">
                Key Contractual Clauses
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${extractedClauses
                  .map(
                    c => `
                  <div style="
                    padding: 8px 10px;
                    border-radius: 6px;
                    background: ${c.status === 'Present' ? '#F0FDF4' : '#FFFBEB'};
                    border: 1px solid ${c.status === 'Present' ? '#BBF7D0' : '#FDE68A'};
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                  ">
                    <div>
                      <div style="font-size: 12px; font-weight: 600; color: #1E293B;">
                        ${c.icon} ${c.type}
                      </div>
                      <div style="font-size: 10.5px; color: #64748B;">
                        ${c.description}
                      </div>
                    </div>
                    <span class="badge ${c.status === 'Present' ? 'badge-green' : 'badge-amber'}" style="font-size: 10px; padding: 2px 6px;">
                      ${c.status === 'Present' ? 'Detected' : 'Review'}
                    </span>
                  </div>
                `
                  )
                  .join('')}
              </div>

              <div style="margin-top: 16px;">
                <button class="btn btn-secondary btn-sm" style="width: 100%; font-size: 11.5px; justify-content: center;" onclick="window.handlePromptClick('Review this contract for legal risks')">
                  🔍 Perform Full Risk Audit
                </button>
              </div>
            `
                : `
              <!-- Empty State in Inspector -->
              <div style="text-align: center; padding: 40px 12px; color: #94A3B8;">
                <div style="font-size: 32px; margin-bottom: 8px;">📄</div>
                <div style="font-size: 13px; font-weight: 600; color: #475569;">No Document Attached</div>
                <div style="font-size: 11.5px; color: #64748B; margin-top: 4px; line-height: 1.4;">
                  Attach an agreement or paste contract text to extract clauses, audit liability limits, and inspect missing protections.
                </div>
                <button class="btn btn-primary btn-sm" onclick="window.openDocumentAttachModal()" style="margin-top: 14px; font-size: 12px;">
                  ➕ Attach Document
                </button>
              </div>
            `
            }
          </div>
        </div>

      </div>

    </div>
  `;
}

/**
 * Render structured Legal Message bubble with risk badge, Markdown tables, and action tools
 */
export function renderLegalMessageBubble(msg) {
  const isUser = msg.role === 'user';

  if (isUser) {
    return `
      <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
        <div style="
          max-width: 80%;
          background: #2563EB;
          color: #FFFFFF;
          border-radius: 12px 12px 2px 12px;
          padding: 12px 16px;
          font-size: 13.5px;
          line-height: 1.5;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        ">
          ${msg.content.replace(/\n/g, '<br/>')}
          <div style="font-size: 10.5px; color: #BFDBFE; text-align: right; margin-top: 4px;">
            ${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    `;
  }

  // Format Assistant Response
  const formattedHtml = formatLegalMarkdown(msg.content);
  const rawCleanText = msg.content.replace(/"/g, '&quot;');

  return `
    <div style="display: flex; gap: 12px; max-width: 92%; margin-bottom: 12px;">
      <div style="
        width: 34px;
        height: 34px;
        border-radius: 8px;
        background: linear-gradient(135deg, #1E40AF, #2563EB);
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
        margin-top: 2px;
      ">⚖️</div>

      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 2px 12px 12px 12px;
        padding: 16px 18px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        flex: 1;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #F1F5F9; padding-bottom: 6px;">
          <div style="font-size: 12.5px; font-weight: 700; color: #0F172A; display: flex; align-items: center; gap: 6px;">
            <span>Impacteers AI Legal Counsel</span>
            <span style="font-size: 11px; font-weight: 400; color: #64748B;">• ${msg.provider || 'AI Gateway'}</span>
          </div>
          <span class="badge badge-slate" style="font-size: 10.5px;">
            ${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div class="legal-markdown-body" style="font-size: 13.5px; color: #1E293B; line-height: 1.6;">
          ${formattedHtml}
        </div>

        <!-- Action Bar per AI Response -->
        <div style="
          margin-top: 14px;
          padding-top: 10px;
          border-top: 1px solid #F1F5F9;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        ">
          <button 
            class="btn btn-secondary btn-sm" 
            style="font-size: 11px; padding: 3px 8px;"
            onclick="window.copyToClipboard('${msg.id}')"
            title="Copy answer to clipboard"
          >
            📋 Copy Response
          </button>
          <button 
            class="btn btn-secondary btn-sm" 
            style="font-size: 11px; padding: 3px 8px;"
            onclick="window.handleRegenerateResponse('${msg.id}')"
            title="Regenerate this response"
          >
            🔄 Regenerate
          </button>
        </div>
        <textarea id="raw-msg-${msg.id}" style="display:none;">${msg.content}</textarea>
      </div>
    </div>
  `;
}

/**
 * Convert structured legal markdown into clean, styled HTML with tables and risk badges
 */
function formatLegalMarkdown(md) {
  if (!md) return '';

  let html = md;

  // 1. Headers
  html = html.replace(/^### (.*$)/gim, '<h4 style="font-size: 14px; font-weight: 700; color: #0F172A; margin: 12px 0 4px 0; border-bottom: 1px solid #F1F5F9; padding-bottom: 3px;">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 style="font-size: 15px; font-weight: 700; color: #1E3A8A; margin: 14px 0 6px 0;">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 style="font-size: 16px; font-weight: 700; color: #1E3A8A; margin: 16px 0 8px 0;">$1</h2>');

  // 2. Risk Badges
  html = html.replace(/\*\*(Low Risk)\*\*/gi, '<span class="badge badge-green" style="font-size: 12px; padding: 3px 8px;">🟢 Low Risk</span>');
  html = html.replace(/\*\*(Medium Risk)\*\*/gi, '<span class="badge badge-amber" style="font-size: 12px; padding: 3px 8px;">🟡 Medium Risk</span>');
  html = html.replace(/\*\*(High Risk)\*\*/gi, '<span class="badge badge-red" style="font-size: 12px; padding: 3px 8px; background: #FFF1F2; color: #BE123C; border: 1px solid #FECDD3;">🟠 High Risk</span>');
  html = html.replace(/\*\*(Critical Risk)\*\*/gi, '<span class="badge badge-red" style="font-size: 12px; padding: 3px 8px; background: #991B1B; color: #FFFFFF;">🔴 Critical Risk</span>');

  // 3. Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 4. Code / Suggested Wording Blocks
  html = html.replace(/```(?:text|markdown)?([\s\S]*?)```/g, (match, code) => {
    return `
      <div style="position: relative; margin: 10px 0;">
        <div style="background: #1E293B; color: #F8FAFC; border-radius: 8px; padding: 12px 14px; font-family: var(--font-mono); font-size: 12px; line-height: 1.5; overflow-x: auto; white-space: pre-wrap;">${code.trim()}</div>
      </div>
    `;
  });

  // 5. Unordered lists
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li style="margin-bottom: 4px;">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ul style="margin: 6px 0 10px 18px; padding-left: 4px;">$1</ul>');

  // 6. Tables
  const lines = html.split('\n');
  let inTable = false;
  let tableRows = [];
  let outputLines = [];

  for (let line of lines) {
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      inTable = true;
      if (line.includes('---')) continue; // skip markdown divider
      const cells = line.split('|').map(c => c.trim()).filter((c, i, arr) => i > 0 && i < arr.length - 1);
      tableRows.push(cells);
    } else {
      if (inTable) {
        outputLines.push(renderHtmlTable(tableRows));
        tableRows = [];
        inTable = false;
      }
      outputLines.push(line);
    }
  }
  if (inTable && tableRows.length > 0) {
    outputLines.push(renderHtmlTable(tableRows));
  }

  return outputLines.join('\n').replace(/\n\n/g, '<br/>');
}

function renderHtmlTable(rows) {
  if (!rows || rows.length === 0) return '';
  const header = rows[0];
  const body = rows.slice(1);

  return `
    <div style="overflow-x: auto; margin: 12px 0; border: 1px solid #E2E8F0; border-radius: 8px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
        <thead>
          <tr style="background: #F1F5F9; border-bottom: 1px solid #E2E8F0;">
            ${header.map(h => `<th style="padding: 8px 12px; font-weight: 700; color: #334155;">${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${body.map(row => `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              ${row.map(cell => `<td style="padding: 8px 12px; color: #1E293B;">${cell}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
