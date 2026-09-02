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

  return `
    <div class="content-container">
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>⚙️</span>
            <span>Enterprise System Administration & Settings</span>
          </div>
          <div class="page-subtitle">
            Configure system users, departments, request types, CLM alert thresholds, and AI legal engine parameters.
          </div>
        </div>
        <div>
          <button class="btn btn-secondary btn-sm" id="reset-database-btn" style="color: #DC2626;">
            <span>🔄 Reset to Fresh Seed State</span>
          </button>
        </div>
      </div>

      <div class="grid-2-col">
        
        <!-- Impacteers AI Legal Knowledge Configuration Card -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>🤖</span>
              <span>Impacteers AI Legal Intelligence Engine</span>
            </div>
            <span class="badge badge-green">Engine Active</span>
          </div>
          <div style="padding: 20px;">
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" style="font-weight: 600; font-size: 13px;">Knowledge Base Scope</label>
              <div style="font-size: 13px; color: #334155; line-height: 1.5; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px;">
                ✅ <strong>Articles of Association (AOA)</strong>: General Meeting (21 clear days) & Board Meeting (7 days) notice rules.<br/>
                ✅ <strong>Contract Standards</strong>: Liability caps (1x-2x), standard Net 30 payment terms, and 30-day termination clauses.<br/>
                ✅ <strong>Department RAG Indexing</strong>: Active contracts and NDAs indexed across all 11 departments.
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" style="font-weight: 600; font-size: 13px;">Active AI Engine Version</label>
              <input type="text" class="form-input" value="${legalAssistantService.model}" readonly style="background: #F1F5F9; color: #475569; font-weight: 600;" />
            </div>

            <div style="display: flex; gap: 10px; margin-top: 16px;">
              <button class="btn btn-primary btn-sm" onclick="window.location.hash='#/assistant'">
                💬 Open Legal AI Assistant
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
              <span>Active System Users (${users.length})</span>
            </div>
          </div>
          <div style="padding: 16px; max-height: 280px; overflow-y: auto;">
            ${users
              .map(
                u => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px;">
                <div>
                  <strong style="color: #0F172A;">${u.name}</strong>
                  <span style="color: #64748B; font-size: 11.5px; margin-left: 4px;">(${u.departmentName || 'Global'})</span>
                </div>
                <span class="badge badge-slate">${u.roleLabel || u.role}</span>
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
