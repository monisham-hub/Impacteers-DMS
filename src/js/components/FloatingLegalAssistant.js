/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Floating AI Legal Assistant Widget (Impacteers Legal AI Engine)
 */

import { legalAssistantService } from '../services/legalAssistantService.js';
import { authService } from '../services/authService.js';
import { documentService } from '../services/documentService.js';
import { requestService } from '../services/requestService.js';

let isAssistantOpen = false;
let assistantMessages = [];

export function renderFloatingLegalAssistant() {
  const user = authService.getCurrentUser();
  if (!user) return '';

  const docs = documentService.getDocuments();

  let requestContextOption = '';
  const hash = window.location.hash || '';
  if (hash.startsWith('#/requests/')) {
    const reqId = hash.replace('#/requests/', '').trim();
    try {
      const req = requestService.getRequestById(reqId);
      if (req && req.attachedDocument) {
        requestContextOption = `<option value="REQ_${req.id}" selected>📄 Attached: ${req.attachedDocument.name}</option>`;
      }
    } catch (e) {
      // Ignore if access denied or not found
    }
  }

  return `
    <!-- Floating Legal Assistant Trigger (FAB) -->
    <div id="floating-assistant-container">
      <button 
        id="floating-assistant-fab" 
        class="floating-fab" 
        title="Open Impacteers AI Legal Assistant"
        onclick="window.toggleFloatingAssistant()"
      >
        <span class="fab-icon">💬</span>
        <span class="fab-badge" id="fab-ai-badge">AI</span>
      </button>

      <!-- Floating Chat Card -->
      <div id="floating-assistant-window" class="floating-assistant-card ${isAssistantOpen ? 'open' : ''}">
        
        <!-- Header -->
        <div class="floating-assistant-header">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0;">
            <div style="width: 28px; height: 28px; border-radius: 8px; background: #EFF6FF; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0;">
              🤖
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px;">
                <div style="font-size: 13.5px; font-weight: 700; color: #0F172A; white-space: nowrap;">Legal AI Assistant</div>
                <div style="font-size: 10.5px; padding: 1.5px 7px; border-radius: 12px; background: #ECFDF5; color: #047857; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
                  <span>AI Active</span>
                </div>
              </div>
              <div style="font-size: 11px; color: #64748B; margin-top: 1px;">Impacteers In-House Intelligence</div>
            </div>
          </div>
          <button 
            class="floating-close-btn" 
            onclick="window.toggleFloatingAssistant(false)"
            title="Minimize Assistant"
            style="margin-left: 6px;"
          >✕</button>
        </div>

        <!-- Document RAG Context Selector Bar -->
        <div style="padding: 6px 12px; background: #F8FAFC; border-bottom: 1px solid #F1F5F9; display: flex; align-items: center; gap: 6px; font-size: 11.5px;">
          <span style="color: #64748B; font-weight: 600; flex-shrink: 0;">Context:</span>
          <select id="floating-doc-context-select" style="flex: 1; min-width: 0; font-size: 11.5px; padding: 3px 6px; border-radius: 6px; border: 1px solid #E2E8F0; background: #FFFFFF; color: #1E293B;">
            ${requestContextOption}
            <option value="">All Vault Documents & Contracts (Global RAG)</option>
            ${docs.map(d => `<option value="${d.id}" ${requestContextOption ? '' : ''}>📄 ${d.title} (${d.departmentName})</option>`).join('')}
          </select>
        </div>

        <!-- Chat Message Area -->
        <div class="floating-assistant-body" id="floating-chat-messages">
          
          <!-- Welcome Message -->
          <div class="chat-msg ai-msg">
            <div class="chat-msg-header">
              <span>🤖 Legal Assistant</span>
              <span>Just now</span>
            </div>
            <div class="chat-msg-content">
              Hello <strong>${user.name}</strong>! I am your in-house AI Legal Counsel. I can audit contracts, check liability caps, verify AOA notice periods, and draft legal summaries.
            </div>
          </div>

          <!-- Suggested Prompt Chips -->
          <div style="margin: 8px 0 12px 0;">
            <div style="font-size: 11px; font-weight: 600; color: #64748B; margin-bottom: 6px;">Suggested Prompts:</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('What are the standard notice periods for Board Meetings and General Meetings under AOA?')">
                📜 AOA Board & General Meeting notice periods
              </button>
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('Summarize standard aggregate liability cap policy for Staffing contracts.')">
                ⚖️ Liability cap policy for Staffing contracts
              </button>
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('What non-disclosure and confidentiality obligations are standard across our NDAs?')">
                🔒 Confidentiality & NDA requirements
              </button>
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('Show me all contracts expiring in the next 60 days.')">
                ⏰ Contracts expiring in next 60 days
              </button>
            </div>
          </div>

        </div>

        <!-- Input Footer -->
        <div class="floating-assistant-footer">
          <form id="floating-assistant-form" onsubmit="event.preventDefault(); window.submitFloatingAssistantMessage();">
            <div style="display: flex; gap: 8px; align-items: center;">
              <input 
                type="text" 
                id="floating-chat-input" 
                class="form-input" 
                placeholder="Ask legal question (e.g. AOA notice period)..." 
                style="height: 38px; font-size: 12.5px; border-radius: 20px; padding: 0 14px;"
                autocomplete="off"
              />
              <button 
                type="submit" 
                id="floating-chat-send-btn" 
                class="btn btn-primary" 
                style="width: 38px; height: 38px; border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
                title="Send Message"
              >
                ➤
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  `;
}

// Markdown formatting helper
function formatAiMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^#### (.*$)/gim, '<div style="font-size: 13px; font-weight: 700; color: #1E293B; margin: 6px 0 2px 0;">$1</div>')
    .replace(/^### (.*$)/gim, '<div style="font-size: 13.5px; font-weight: 800; color: #0F172A; margin: 8px 0 4px 0;">$1</div>')
    .replace(/^## (.*$)/gim, '<div style="font-size: 14px; font-weight: 800; color: #0F172A; margin: 10px 0 6px 0;">$1</div>')
    .replace(/^# (.*$)/gim, '<div style="font-size: 15px; font-weight: 800; color: #0F172A; margin: 12px 0 6px 0;">$1</div>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background: #F1F5F9; padding: 1px 5px; border-radius: 4px; font-family: monospace; font-size: 11.5px; color: #1E293B;">$1</code>')
    .replace(/^\s*-\s+(.*$)/gim, '<li style="margin-left: 16px; margin-bottom: 3px;">$1</li>')
    .replace(/^\s*\*\s+(.*$)/gim, '<li style="margin-left: 16px; margin-bottom: 3px;">$1</li>')
    .replace(/&gt; (.*$)/gim, '<blockquote style="border-left: 3px solid #3B82F6; background: #EFF6FF; padding: 6px 10px; border-radius: 4px; margin: 6px 0; font-size: 12px; color: #1E40AF;">$1</blockquote>')
    .replace(/\n\n/g, '<div style="height: 8px;"></div>')
    .replace(/\n/g, '<br/>');
}

window.toggleFloatingAssistant = function(forceState = null) {
  const win = document.getElementById('floating-assistant-window');
  if (!win) return;

  if (forceState !== null) {
    isAssistantOpen = forceState;
  } else {
    isAssistantOpen = !isAssistantOpen;
  }

  if (isAssistantOpen) {
    win.classList.add('open');
    const input = document.getElementById('floating-chat-input');
    if (input) setTimeout(() => input.focus(), 150);
  } else {
    win.classList.remove('open');
  }
};

window.sendFloatingPrompt = function(promptText) {
  const input = document.getElementById('floating-chat-input');
  if (input) {
    input.value = promptText;
    window.submitFloatingAssistantMessage();
  }
};

window.submitFloatingAssistantMessage = async function() {
  const input = document.getElementById('floating-chat-input');
  const container = document.getElementById('floating-chat-messages');
  const docSelect = document.getElementById('floating-doc-context-select');
  if (!input || !container) return;

  const query = input.value.trim();
  if (!query) return;

  const selectedDocId = docSelect ? docSelect.value : null;

  // Append user message
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'chat-msg user-msg';
  userMsgEl.innerHTML = `
    <div class="chat-msg-header">
      <span>You</span>
      <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
    <div class="chat-msg-content">${query.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
  `;
  container.appendChild(userMsgEl);
  input.value = '';
  container.scrollTop = container.scrollHeight;

  // Append typing indicator
  const typingEl = document.createElement('div');
  typingEl.className = 'chat-msg ai-msg';
  typingEl.id = 'floating-typing-indicator';
  typingEl.innerHTML = `
    <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748B;">
      <span>Analyzing legal knowledge base</span>
      <span class="typing-dots">...</span>
    </div>
  `;
  container.appendChild(typingEl);
  container.scrollTop = container.scrollHeight;

  try {
    const result = await legalAssistantService.askQuestion({ 
      question: query,
      documentId: selectedDocId,
      conversationHistory: assistantMessages
    });

    typingEl.remove();

    assistantMessages.push({ role: 'user', content: query });
    assistantMessages.push({ role: 'assistant', content: result.text });

    const aiMsgEl = document.createElement('div');
    aiMsgEl.className = 'chat-msg ai-msg';
    
    const formattedHtml = formatAiMarkdown(result.text);

    aiMsgEl.innerHTML = `
      <div class="chat-msg-header">
        <span style="display: flex; align-items: center; gap: 4px;">
          <span>🤖 Legal Assistant</span>
          <span style="font-size: 9.5px; background: #ECFDF5; color: #047857; padding: 1px 5px; border-radius: 4px; font-weight: 700;">
            ${result.model || 'AI'}
          </span>
        </span>
        <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div class="chat-msg-content" style="line-height: 1.5; font-size: 12.8px;">${formattedHtml}</div>
      ${result.citations && result.citations.length > 0 ? `
        <div style="font-size: 11px; color: #64748B; margin-top: 8px; border-top: 1px dashed #CBD5E1; padding-top: 6px;">
          <strong>Sources Grounded:</strong> ${result.citations.join(', ')}
        </div>
      ` : ''}
    `;
    container.appendChild(aiMsgEl);
  } catch (err) {
    typingEl.remove();
    const errorEl = document.createElement('div');
    errorEl.className = 'chat-msg ai-msg';
    errorEl.innerHTML = `
      <div class="chat-msg-header" style="color: #BE123C;">Error</div>
      <div class="chat-msg-content" style="color: #BE123C;">${err.message}</div>
    `;
    container.appendChild(errorEl);
  }

  container.scrollTop = container.scrollHeight;
};
