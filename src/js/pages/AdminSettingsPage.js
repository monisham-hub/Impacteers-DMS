/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Admin Settings & System Configuration Page
 */

import { db } from '../db.js';
import { authService } from '../services/authService.js';
import { legalAssistantService } from '../services/legalAssistantService.js';

export function renderAdminSettingsPage() {
  if (!authService.isLegalAdmin()) {
    return `
      <div class="content-container">
        <div style="padding: 48px; text-align: center; background: #FFF1F2; border-radius: 12px; border: 1px solid #FECDD3;">
          <h2 style="color: #BE123C;">Access Denied</h2>
          <p style="color: #9F1239; margin-top: 6px;">Only System Administrators and Legal Administrators have access to this configuration console.</p>
        </div>
      </div>
    `;
  }

  const users = db.data.users;
  const requestTypes = db.data.requestTypes;
  const alertDays = db.data.expiryAlertDays || [90, 60, 30, 15, 7];

  const currentEndpoint = legalAssistantService.endpoint;
  const currentModel = legalAssistantService.model;
  const currentTemp = legalAssistantService.temperature;

  return `
    <div class="content-container">
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>⚙️</span>
            <span>Enterprise System Administration & Settings</span>
          </div>
          <div class="page-subtitle">
            Configure system users, departments, request types, CLM alert thresholds, and local Ollama AI settings.
          </div>
        </div>
        <div>
          <button class="btn btn-secondary btn-sm" id="reset-database-btn" style="color: #DC2626;">
            <span>🔄 Reset to Fresh Seed State</span>
          </button>
        </div>
      </div>

      <div class="grid-2-col">
        
        <!-- Local Ollama AI Settings Card -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>🦙</span>
              <span>Local Ollama AI Configuration</span>
            </div>
            <span class="badge badge-purple">On-Device LLM</span>
          </div>
          <div style="padding: 20px;">
            <div class="form-group">
              <label class="form-label">Ollama Server Endpoint</label>
              <input type="text" id="ai-endpoint-input" class="form-input" value="${currentEndpoint}" placeholder="http://127.0.0.1:11434" />
              <div class="form-hint" style="font-size: 11.5px; color: #64748B; margin-top: 4px;">Default local endpoint with auto-reverse proxy at <code>/api/ollama</code>.</div>
            </div>

            <div class="form-group">
              <label class="form-label">Active Local Model</label>
              <input type="text" id="ai-model-input" class="form-input" value="${currentModel}" placeholder="llama3.2" />
              <div class="form-hint" style="font-size: 11.5px; color: #64748B; margin-top: 4px;">e.g., <code>llama3.2</code>, <code>mistral</code>, <code>deepseek-r1:8b</code>, <code>qwen2.5:7b</code>.</div>
            </div>

            <div class="form-group">
              <label class="form-label">Creativity / Temperature (0.0 to 1.0)</label>
              <input type="number" id="ai-temp-input" class="form-input" value="${currentTemp}" step="0.1" min="0" max="1" />
              <div class="form-hint" style="font-size: 11.5px; color: #64748B; margin-top: 4px;">Lower (0.2-0.3) is recommended for strict legal clause extraction.</div>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" id="save-ai-endpoint-btn">
                💾 Save Ollama Config
              </button>
              <button class="btn btn-secondary btn-sm" id="test-ollama-btn">
                🔄 Test Connection
              </button>
              <button class="btn btn-secondary btn-sm" onclick="window.showOllamaSetupModal()">
                📖 Setup Guide
              </button>
            </div>
          </div>
        </div>

        <!-- Expiry Alert Settings -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>⏰</span>
              <span>Contract Expiry Alert Thresholds</span>
            </div>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 13px; color: #475569; margin-bottom: 14px;">
              The system automatically sends in-app notifications and alerts before contract expiry:
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${alertDays.map(d => `<span class="badge badge-amber" style="font-size: 13px; padding: 6px 12px;">⏳ ${d} Days Before</span>`).join('')}
            </div>
            <div style="margin-top: 20px; font-size: 12px; color: #64748B;">
              Alerts are broadcast to Legal Administrators and the corresponding Business Department Head.
            </div>
          </div>
        </div>

        <!-- Request Types Config -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>📋</span>
              <span>Configured Request Types (${requestTypes.length})</span>
            </div>
            <button class="btn btn-secondary btn-sm" id="add-request-type-btn">
              + Add Type
            </button>
          </div>
          <div style="padding: 16px; max-height: 280px; overflow-y: auto;">
            ${requestTypes
              .map(
                t => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px;">
                <span style="font-weight: 600; color: #0F172A;">${t.name}</span>
                <span class="badge badge-blue">SLA: ${t.slaDays} Days</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Active Users & Roles -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>👥</span>
              <span>System Users & Roles (${users.length})</span>
            </div>
          </div>
          <div style="padding: 12px 16px; max-height: 280px; overflow-y: auto;">
            ${users
              .map(
                u => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-size: 12.5px;">
                <div>
                  <strong style="color: #0F172A;">${u.name}</strong>
                  <div style="font-size: 11px; color: #64748B;">${u.email}</div>
                </div>
                <span class="badge badge-slate">${u.role.replace(/_/g, ' ')}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}
