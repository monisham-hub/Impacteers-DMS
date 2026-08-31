/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Floating AI Legal Assistant Widget (Local LLM Ollama Integration)
 */

import { legalAssistantService } from '../services/legalAssistantService.js';
import { authService } from '../services/authService.js';
import { documentService } from '../services/documentService.js';
import { Modal } from './Modal.js';

let isAssistantOpen = false;
let assistantMessages = [];

export function renderFloatingLegalAssistant() {
  const user = authService.getCurrentUser();
  if (!user) return '';

  const docs = documentService.getDocuments();

  return `
    <!-- Floating Legal Assistant Trigger (FAB) -->
    <div id="floating-assistant-container">
      <button 
        id="floating-assistant-fab" 
        class="floating-fab" 
        title="Open AI Legal Assistant (Ollama Local LLM)"
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
                <div id="ollama-status-pill" onclick="window.showOllamaSetupModal()" style="font-size: 10.5px; padding: 1.5px 7px; border-radius: 12px; background: #FEF3C7; color: #92400E; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0;" title="Click to view Ollama setup guide">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #F59E0B; display: inline-block;"></span>
                  <span>Checking...</span>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
                <select id="floating-model-select" onchange="window.handleModelChange(this.value)" style="font-size: 11px; padding: 1px 4px; border-radius: 4px; border: 1px solid #CBD5E1; background: #FFFFFF; color: #334155; max-width: 140px; cursor: pointer;">
                  <option value="llama3.2">llama3.2 (Local)</option>
                  <option value="mistral">mistral (Local)</option>
                  <option value="qwen2.5">qwen2.5 (Local)</option>
                  <option value="deepseek-r1">deepseek-r1 (Local)</option>
                </select>
                <button onclick="window.refreshOllamaStatus(true)" style="background: none; border: none; font-size: 11px; color: #64748B; cursor: pointer; padding: 0 2px;" title="Refresh local Ollama connection">🔄</button>
              </div>
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
            <option value="">All Vault Documents & Contracts (Global RAG)</option>
            ${docs.map(d => `<option value="${d.id}">📄 ${d.title} (${d.departmentName})</option>`).join('')}
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
              Hello <strong>${user.name}</strong>! I am your real-time corporate Legal AI powered by local Ollama LLM. I can audit contracts, check liability caps, verify notice periods, and draft legal summaries.
            </div>
          </div>

          <!-- Suggested Prompt Chips -->
          <div style="margin: 8px 0 12px 0;">
            <div style="font-size: 11px; font-weight: 600; color: #64748B; margin-bottom: 6px;">Suggested Prompts:</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('What are the standard termination notice periods in our vendor agreements?')">
                📄 What are standard termination notice periods?
              </button>
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('Summarize standard aggregate liability cap policy for Staffing contracts.')">
                ⚖️ Liability cap policy for Staffing contracts
              </button>
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('What non-disclosure and confidentiality obligations are required?')">
                🔒 Confidentiality and NDA requirements
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
                placeholder="Ask legal question (e.g. liability caps)..." 
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
    window.refreshOllamaStatus(false);
  } else {
    win.classList.remove('open');
  }
};

window.refreshOllamaStatus = async function(showToast = false) {
  const pill = document.getElementById('ollama-status-pill');
  const select = document.getElementById('floating-model-select');
  
  if (pill) {
    pill.innerHTML = `<span style="width: 6px; height: 6px; border-radius: 50%; background: #F59E0B; display: inline-block;"></span><span>Checking...</span>`;
    pill.style.background = '#FEF3C7';
    pill.style.color = '#92400E';
  }

  const res = await legalAssistantService.checkOllamaStatus();

  if (pill) {
    if (res.connected) {
      pill.innerHTML = `<span style="width: 6px; height: 6px; border-radius: 50%; background: #10B981; display: inline-block;"></span><span>Ollama Live</span>`;
      pill.style.background = '#ECFDF5';
      pill.style.color = '#047857';
      pill.title = `Connected to local Ollama (${res.activeModel})`;

      // Update model dropdown with installed models
      if (select && res.models.length > 0) {
        select.innerHTML = res.models.map(m => `<option value="${m}" ${m === res.activeModel ? 'selected' : ''}>${m}</option>`).join('');
      }
    } else {
      pill.innerHTML = `<span style="width: 6px; height: 6px; border-radius: 50%; background: #EF4444; display: inline-block;"></span><span>Ollama Offline</span>`;
      pill.style.background = '#FEE2E2';
      pill.style.color = '#B91C1C';
      pill.title = 'Ollama is not running. Click to view quick setup guide.';
    }
  }

  if (showToast && window.Toast) {
    if (res.connected) {
      window.Toast.success(`Connected to local Ollama! Model: ${res.activeModel}`);
    } else {
      window.Toast.info('Ollama not detected. Click "Ollama Offline" for 1-click setup.');
    }
  }
};

window.handleModelChange = function(modelName) {
  legalAssistantService.setModel(modelName);
  if (window.Toast) {
    window.Toast.info(`Switched active AI model to: ${modelName}`);
  }
};

window.showOllamaSetupModal = function() {
  Modal.open({
    title: '🦙 Local Ollama AI Setup Guide',
    size: 'md',
    contentHtml: `
      <div style="font-size: 13.5px; color: #334155; line-height: 1.6;">
        <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
          <strong style="color: #1E40AF;">Connect 100% Private, Local AI to Impacteers DMS</strong><br/>
          Run state-of-the-art open-source LLMs (Llama 3.2, Mistral, DeepSeek-R1, Qwen 2.5) on your local machine with zero data leaving your computer.
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="border-left: 3px solid #2563EB; padding-left: 12px;">
            <div style="font-weight: 700; color: #0F172A;">Step 1: Install Ollama on Windows</div>
            <div style="font-size: 12.5px; color: #64748B; margin-top: 2px;">Open PowerShell and run:</div>
            <div style="background: #0F172A; color: #38BDF8; font-family: monospace; font-size: 12px; padding: 8px 12px; border-radius: 6px; margin-top: 4px; display: flex; justify-content: space-between; align-items: center;">
              <code>winget install Ollama.Ollama</code>
              <button onclick="navigator.clipboard.writeText('winget install Ollama.Ollama'); if(window.Toast) window.Toast.success('Copied to clipboard!');" style="background: rgba(255,255,255,0.15); border: none; color: #fff; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Copy</button>
            </div>
            <div style="font-size: 11.5px; color: #64748B; margin-top: 4px;">Or download the installer from <a href="https://ollama.com/download/windows" target="_blank" style="color: #2563EB;">ollama.com/download</a>.</div>
          </div>

          <div style="border-left: 3px solid #10B981; padding-left: 12px;">
            <div style="font-weight: 700; color: #0F172A;">Step 2: Pull and Run a Local Model</div>
            <div style="font-size: 12.5px; color: #64748B; margin-top: 2px;">In PowerShell, start your favorite model:</div>
            <div style="background: #0F172A; color: #34D399; font-family: monospace; font-size: 12px; padding: 8px 12px; border-radius: 6px; margin-top: 4px; display: flex; justify-content: space-between; align-items: center;">
              <code>ollama run llama3.2</code>
              <button onclick="navigator.clipboard.writeText('ollama run llama3.2'); if(window.Toast) window.Toast.success('Copied to clipboard!');" style="background: rgba(255,255,255,0.15); border: none; color: #fff; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Copy</button>
            </div>
            <div style="font-size: 11.5px; color: #64748B; margin-top: 4px;">For other models: <code>ollama run mistral</code> or <code>ollama run deepseek-r1:8b</code>.</div>
          </div>

          <div style="border-left: 3px solid #7C3AED; padding-left: 12px;">
            <div style="font-weight: 700; color: #0F172A;">Step 3: Test Connection</div>
            <div style="font-size: 12.5px; color: #64748B; margin-top: 2px;">Click the button below once Ollama is running:</div>
            <button class="btn btn-primary btn-sm" onclick="window.refreshOllamaStatus(true); Modal.close();" style="margin-top: 6px;">
              🔄 Check Connection Now
            </button>
          </div>
        </div>
      </div>
    `,
    footerHtml: `
      <button class="btn btn-secondary" onclick="Modal.close()">Close</button>
    `
  });
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
      <span>Thinking with ${legalAssistantService.isConnected ? 'local ' + legalAssistantService.model : 'Legal RAG engine'}</span>
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
          <span style="font-size: 9.5px; background: ${result.isLiveOllama ? '#ECFDF5' : '#F1F5F9'}; color: ${result.isLiveOllama ? '#047857' : '#475569'}; padding: 1px 5px; border-radius: 4px; font-weight: 700;">
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
