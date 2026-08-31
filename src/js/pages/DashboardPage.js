/**
 * Enterprise In-House Legal Management System
 * Dashboard Page
 */

import { authService } from '../services/authService.js';
import { reportService } from '../services/reportService.js';
import { requestService } from '../services/requestService.js';
import { contractService } from '../services/contractService.js';
import { auditService } from '../services/auditService.js';
import { openCreateRequestModal } from '../components/RequestModals.js';

export function renderDashboardPage() {
  const user = authService.getCurrentUser();
  const metrics = reportService.getMetrics();
  const isLegal = authService.isLegalTeam();
  const recentActivity = authService.isLegalAdmin() ? auditService.getLogs({ limit: 6 }) : [];
  const urgentRequests = requestService.getRequests().filter(r => ['URGENT', 'CRITICAL', 'HIGH'].includes(r.priority) && !['COMPLETED', 'REJECTED'].includes(r.status)).slice(0, 5);
  const expiringContracts = contractService.getContracts({ expiringWithinDays: 30 }).slice(0, 4);

  return `
    <div class="content-container">
      <!-- Header -->
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>⚖️</span>
            <span>${isLegal ? 'Legal Command Dashboard' : `${user.departmentName} Department Dashboard`}</span>
          </div>
          <div class="page-subtitle">
            Welcome back, <strong>${user.name}</strong> • ${user.title} • Operating under ${user.role.replace(/_/g, ' ')} permissions
          </div>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary btn-sm" onclick="window.location.hash='#/reports'">
            <span>📊 View Analytics</span>
          </button>
          <button class="btn btn-primary btn-sm" id="dash-new-req-btn">
            <span>+ Submit Request</span>
          </button>
        </div>
      </div>

      <!-- Top KPI Cards Grid -->
      <div class="kpi-grid">
        <div class="kpi-card" onclick="window.location.hash='#/requests'">
          <div class="kpi-card-header">
            <span class="kpi-title">Open Requests</span>
            <div class="kpi-icon-wrapper" style="background: #EFF6FF; color: #1D4ED8;">📋</div>
          </div>
          <div class="kpi-value">${metrics.totalOpenRequests}</div>
          <div class="kpi-subtext">${metrics.pendingLegalReview} pending initial triage</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'">
          <div class="kpi-card-header">
            <span class="kpi-title">Due This Week</span>
            <div class="kpi-icon-wrapper" style="background: #FFFBEB; color: #B45309;">⏳</div>
          </div>
          <div class="kpi-value" style="color: ${metrics.dueThisWeek > 0 ? '#B45309' : '#0F172A'};">${metrics.dueThisWeek}</div>
          <div class="kpi-subtext">Active SLA targets</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'">
          <div class="kpi-card-header">
            <span class="kpi-title">Overdue</span>
            <div class="kpi-icon-wrapper" style="background: #FFF1F2; color: #BE123C;">🚨</div>
          </div>
          <div class="kpi-value" style="color: ${metrics.overdue > 0 ? '#BE123C' : '#0F172A'};">${metrics.overdue}</div>
          <div class="kpi-subtext">Requires immediate escalation</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/contracts'">
          <div class="kpi-card-header">
            <span class="kpi-title">Active Contracts</span>
            <div class="kpi-icon-wrapper" style="background: #ECFDF5; color: #047857;">📜</div>
          </div>
          <div class="kpi-value">${metrics.activeContracts}</div>
          <div class="kpi-subtext">$${(metrics.totalContractValue / 1000).toFixed(0)}k total portfolio value</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/contracts'">
          <div class="kpi-card-header">
            <span class="kpi-title">Expiring Soon (30d)</span>
            <div class="kpi-icon-wrapper" style="background: #FFF7ED; color: #C2410C;">⚠️</div>
          </div>
          <div class="kpi-value" style="color: ${metrics.contractsExpiringSoon > 0 ? '#C2410C' : '#0F172A'};">${metrics.contractsExpiringSoon}</div>
          <div class="kpi-subtext">Requires renewal or notice</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'">
          <div class="kpi-card-header">
            <span class="kpi-title">Completed</span>
            <div class="kpi-icon-wrapper" style="background: #FAF5FF; color: #6B21A8;">✓</div>
          </div>
          <div class="kpi-value">${metrics.completed}</div>
          <div class="kpi-subtext">Avg TAT: ${metrics.averageTurnaroundDays} days</div>
        </div>
      </div>

      <!-- Main Dashboard Grid -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
        
        <!-- Left Column: Pipeline & Priorities -->
        <div>
          <!-- Request Pipeline Stage Stepper Overview -->
          <div class="enterprise-card">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>🔄</span>
                <span>Request Workflow Pipeline Overview</span>
              </div>
              <a href="#/requests" style="font-size: 12px; color: #2563EB; font-weight: 600; text-decoration: none;">View Request Board →</a>
            </div>
            <div style="padding: 20px;">
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; text-align: center;">
                  <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase;">1. New / Pending</div>
                  <div style="font-size: 22px; font-weight: 700; color: #1E40AF; margin-top: 4px;">${metrics.pendingLegalReview}</div>
                  <div style="font-size: 11px; color: #94A3B8;">Awaiting triage</div>
                </div>
                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; text-align: center;">
                  <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase;">2. Under Review</div>
                  <div style="font-size: 22px; font-weight: 700; color: #7C3AED; margin-top: 4px;">${metrics.accepted}</div>
                  <div style="font-size: 11px; color: #94A3B8;">Redlining & Remarks</div>
                </div>
                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; text-align: center;">
                  <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase;">3. Signing Pending</div>
                  <div style="font-size: 22px; font-weight: 700; color: #047857; margin-top: 4px;">1</div>
                  <div style="font-size: 11px; color: #94A3B8;">Awaiting signatures</div>
                </div>
                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; text-align: center;">
                  <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase;">4. Finalized & CLM</div>
                  <div style="font-size: 22px; font-weight: 700; color: #0F172A; margin-top: 4px;">${metrics.completed}</div>
                  <div style="font-size: 11px; color: #94A3B8;">Stored in Vault</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Priority Action Queue -->
          <div class="enterprise-card">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>🔥</span>
                <span>My High-Priority & Urgent Legal Requests</span>
              </div>
              <span class="badge badge-rose">${urgentRequests.length} High Priority</span>
            </div>
            <div class="table-responsive">
              <table class="enterprise-table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Priority</th>
                    <th>Target Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    urgentRequests.length === 0
                      ? `<tr><td colspan="7" style="text-align: center; padding: 32px; color: #94A3B8;">No urgent requests pending.</td></tr>`
                      : urgentRequests
                          .map(
                            r => `
                        <tr>
                          <td>
                            <a href="#/requests/${r.id}" style="font-family: var(--font-mono); font-weight: 700; color: #2563EB; text-decoration: none;">
                              ${r.requestId}
                            </a>
                          </td>
                          <td style="font-weight: 600; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            ${r.title}
                          </td>
                          <td>
                            <span class="badge badge-slate">${r.departmentName}</span>
                          </td>
                          <td>
                            <span class="badge badge-${r.priority === 'CRITICAL' || r.priority === 'URGENT' ? 'rose' : 'orange'}">
                              ${r.priority}
                            </span>
                          </td>
                          <td style="font-family: var(--font-mono); font-size: 12px; color: #B45309; font-weight: 600;">
                            ${r.currentDueDate}
                          </td>
                          <td>
                            <span class="badge badge-blue">${r.status.replace(/_/g, ' ')}</span>
                          </td>
                          <td>
                            <a href="#/requests/${r.id}" class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11.5px;">
                              Open Ticket →
                            </a>
                          </td>
                        </tr>
                      `
                          )
                          .join('')
                  }
                </tbody>
              </table>
            </div>
          </div>

          <!-- Department Request Distribution (All 11 Departments) -->
          <div class="enterprise-card">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>🏢</span>
                <span>Department Workload & Active Portfolio Overview</span>
              </div>
              <a href="#/departments" style="font-size: 12px; color: #2563EB; font-weight: 600; text-decoration: none;">View All 11 Departments →</a>
            </div>
            <div style="padding: 16px;">
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 10px;">
                ${metrics.departmentDistribution
                  .map(
                    d => `
                  <div style="
                    background: #FFFFFF;
                    border: 1px solid #E2E8F0;
                    border-radius: 8px;
                    padding: 12px;
                    cursor: pointer;
                    transition: all 0.15s ease;
                  " onmouseover="this.style.borderColor='#2563EB'; this.style.transform='translateY(-2px)'"
                     onmouseout="this.style.borderColor='#E2E8F0'; this.style.transform='translateY(0)'"
                     onclick="window.location.hash='#/departments';">
                    <div style="font-size: 12.5px; font-weight: 700; color: #0F172A;">${d.name}</div>
                    <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 11.5px; color: #64748B;">
                      <span>Requests:</span>
                      <strong style="color: #2563EB;">${d.totalRequests}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: #64748B;">
                      <span>Contracts:</span>
                      <strong style="color: #047857;">${d.activeContracts}</strong>
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          </div>

        </div>

        <!-- Right Column: Expiring Contracts & Activity Feed -->
        <div>
          <!-- Contracts Expiring Soon Alert Box -->
          <div class="enterprise-card" style="border-left: 4px solid #F59E0B;">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>⚠️</span>
                <span>Contracts Expiring Soon</span>
              </div>
              <a href="#/contracts" style="font-size: 12px; color: #B45309; font-weight: 600; text-decoration: none;">CLM Module →</a>
            </div>
            <div style="padding: 12px 16px;">
              ${
                expiringContracts.length === 0
                  ? '<div style="padding: 16px; text-align: center; color: #94A3B8; font-size: 12.5px;">No contracts expiring in next 30 days.</div>'
                  : expiringContracts
                      .map(
                        c => `
                    <div style="padding: 10px 0; border-bottom: 1px solid #F1F5F9;">
                      <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                          <div style="font-size: 12.5px; font-weight: 700; color: #0F172A;">${c.name}</div>
                          <div style="font-size: 11px; color: #64748B;">${c.counterparty} • ${c.departmentName}</div>
                        </div>
                        <span class="badge badge-amber">Exp: ${c.expiryDate}</span>
                      </div>
                      <div style="font-size: 11px; color: #047857; font-weight: 600; margin-top: 4px;">
                        Value: $${c.contractValue.toLocaleString()}
                      </div>
                    </div>
                  `
                      )
                      .join('')
              }
            </div>
          </div>

          <!-- AI Legal Assistant Quick Teaser -->
          <div class="enterprise-card" style="background: linear-gradient(135deg, #1E293B, #0F172A); color: #FFFFFF; border: none;">
            <div style="padding: 20px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="font-size: 20px;">✨</span>
                <h4 style="color: #FFFFFF; font-size: 15px; font-weight: 700;">Legal AI Assistant</h4>
              </div>
              <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px; line-height: 1.4;">
                Search clause obligations, summarize draft agreements, or check liability limits across authorized documents.
              </p>
              <button class="btn btn-sm" style="background: #2563EB; color: #FFFFFF; width: 100%; font-weight: 600;" onclick="window.location.hash='#/assistant'">
                Launch Legal Assistant →
              </button>
            </div>
          </div>

          <!-- Recent Activity & Audit Logs -->
          ${
            isLegal
              ? `
            <div class="enterprise-card">
              <div class="enterprise-card-header">
                <div class="enterprise-card-title">
                  <span>🛡️</span>
                  <span>Recent Audit Activity</span>
                </div>
                <a href="#/audit-logs" style="font-size: 12px; color: #2563EB; font-weight: 600; text-decoration: none;">View Full Audit →</a>
              </div>
              <div style="padding: 10px 16px;">
                ${recentActivity
                  .map(
                    a => `
                  <div style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-size: 12px;">
                    <div style="display: flex; justify-content: space-between;">
                      <strong>${a.actorName}</strong>
                      <span style="font-size: 10.5px; color: #94A3B8;">${new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div style="color: #475569; margin-top: 2px;">
                      ${a.action.replace(/_/g, ' ')} on <code style="font-family: var(--font-mono); color: #2563EB;">${a.objectId}</code>
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          `
              : ''
          }

        </div>

      </div>
    </div>
  `;
}
