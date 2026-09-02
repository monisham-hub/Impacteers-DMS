/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Admin Settings & AI Gateway Configuration Page
 */

import { authService } from '../services/authService.js';
import { db } from '../db.js';
import { Toast } from '../components/Toast.js';
import { Modal } from '../components/Modal.js';
import { aiService } from '../services/aiService.js';

export function renderAdminSettingsPage() {
  const user = authService.getCurrentUser();
  const alertDays = db.data.contractAlertDays || [60, 30, 15, 7];

  return `
    <div class="content-container">
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>⚙️</span>
            <span>Enterprise System Administration & Settings</span>
          </div>
          <div class="page-subtitle">
            Configure system users, departments, request types, CLM alert thresholds, and AI Legal Assistant Gateway.
          </div>
        </div>
        <div>
          <button class="btn btn-secondary btn-sm" id="reset-database-btn" style="color: #DC2626;">
            <span>🔄 Reset to Fresh Seed State</span>
          </button>
        </div>
      </div>

      <div class="grid-2-col">
        
        <!-- Enterprise AI Legal Assistant Gateway Card -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>🤖</span>
              <span>Enterprise Legal AI Gateway</span>
            </div>
            <span class="badge badge-blue">Secure Server-Side</span>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 13px; color: #475569; margin-bottom: 14px; line-height: 1.5;">
              The AI Legal Assistant connects via the secure backend API (<code>/api/legal-assistant/chat</code>) with zero client-side credential exposure.
            </p>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 14px; margin-bottom: 16px;">
              <div style="font-size: 12.5px; font-weight: 700; color: #0F172A; margin-bottom: 4px;">Supported AI Providers:</div>
              <ul style="margin: 0 0 0 16px; font-size: 12px; color: #475569; line-height: 1.6;">
                <li><strong>Google Gemini</strong>: <code>gemini-1.5-flash</code>, <code>gemini-2.0-flash</code></li>
                <li><strong>OpenAI</strong>: <code>gpt-4o</code>, <code>gpt-4o-mini</code></li>
                <li><strong>Groq</strong>: <code>llama-3.3-70b-versatile</code>, <code>mixtral-8x7b-32768</code></li>
                <li><strong>OpenRouter</strong>: Multi-model router with free & pro endpoints</li>
                <li><strong>Local Ollama</strong>: <code>llama3.2</code>, <code>mistral</code>, <code>qwen2.5</code> (100% private on-device)</li>
              </ul>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" onclick="window.showAIConfigModal()">
                ⚙️ View AI Gateway Configuration
              </button>
              <button class="btn btn-secondary btn-sm" id="test-ai-gateway-btn" onclick="window.testAIGatewayConnection()">
                🔄 Test AI Connection
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

      </div>

      <!-- Department Directory -->
      <div class="enterprise-card" style="margin-top: 20px;">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>🏢</span>
            <span>Registered Business Departments (${db.data.departments.length})</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="enterprise-table">
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Department Code</th>
                <th>Active Head</th>
                <th>Total Contracts</th>
              </tr>
            </thead>
            <tbody>
              ${db.data.departments
                .map(d => {
                  const docCount = db.data.documents.filter(doc => doc.departmentId === d.id).length;
                  return `
                  <tr>
                    <td style="font-weight: 600;">${d.name}</td>
                    <td style="font-family: var(--font-mono); font-size: 12px; color: #64748B;">${d.id}</td>
                    <td>${d.headName || 'Assigned'}</td>
                    <td><span class="badge badge-blue">${docCount} Documents</span></td>
                  </tr>
                `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
