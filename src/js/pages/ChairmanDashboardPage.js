/**
 * Impacteers Legal docs
 * Chairman Dashboard (Executive View-Only)
 */

import { requestService } from '../services/requestService.js';
import { db } from '../db.js';
import { REQUEST_STATUSES, DEPARTMENTS } from '../constants.js';

export function renderChairmanDashboardPage() {
  const allRequests = requestService.getRequests();
  const todayStr = '2026-08-27';

  const pending = allRequests.filter(r => r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const dueToday = allRequests.filter(r => r.currentDueDate === todayStr && r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const overdue = allRequests.filter(r => new Date(r.currentDueDate) < new Date(todayStr) && r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const completed = allRequests.filter(r => r.status === 'COMPLETED');

  return `
    <div class="content-container">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 style="font-size: 24px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
            Executive Overview 🏛️
          </h1>
          <p style="font-size: 13.5px; color: #64748B; margin-top: 2px;">
            Chairman • Global View-Only Transparency Across All 11 Departments
          </p>
        </div>
        <div>
          <span class="badge badge-slate" style="font-size: 12px; padding: 4px 10px;">
            👁️ Executive View-Only Mode
          </span>
        </div>
      </div>

      <!-- Top KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Total Requests</span>
            <div class="kpi-icon-wrapper" style="background: #F1F5F9; color: #334155;">📊</div>
          </div>
          <div class="kpi-value">${allRequests.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Pending</span>
            <div class="kpi-icon-wrapper" style="background: #EFF6FF; color: #1D4ED8;">⏳</div>
          </div>
          <div class="kpi-value" style="color: #1D4ED8;">${pending.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Due Today</span>
            <div class="kpi-icon-wrapper" style="background: #FFFBEB; color: #B45309;">⏰</div>
          </div>
          <div class="kpi-value" style="color: #B45309;">${dueToday.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Overdue</span>
            <div class="kpi-icon-wrapper" style="background: #FFF1F2; color: #BE123C;">🚨</div>
          </div>
          <div class="kpi-value" style="color: #BE123C;">${overdue.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Completed</span>
            <div class="kpi-icon-wrapper" style="background: #ECFDF5; color: #047857;">✓</div>
          </div>
          <div class="kpi-value" style="color: #047857;">${completed.length}</div>
        </div>
      </div>

      <!-- Main Layout: Pending Requests + Department Overview -->
      <div class="grid-2-1-col">
        
        <!-- Pending Requests Table -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>📋</span>
              <span>Pending Legal Requests (${pending.length})</span>
            </div>
          </div>
          <div class="table-responsive">
            <table class="enterprise-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Owner</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                ${
                  pending.length === 0
                    ? '<tr><td colspan="7" style="text-align: center; padding: 28px; color: #94A3B8;">No pending requests.</td></tr>'
                    : pending
                        .map(r => {
                          const statusObj = REQUEST_STATUSES[r.status] || { label: r.status, badgeClass: 'badge-blue' };
                          return `
                          <tr>
                            <td>
                              <a href="#/requests/${r.id}" style="font-family: var(--font-mono); font-weight: 700; color: #2563EB; text-decoration: none;">
                                ${r.requestId}
                              </a>
                            </td>
                            <td style="font-weight: 600; color: #0F172A;">${r.title}</td>
                            <td><span class="badge badge-slate">${r.departmentName}</span></td>
                            <td style="font-size: 12.5px;">${r.requestorName}</td>
                            <td style="font-family: var(--font-mono); font-size: 12px; font-weight: 600;">${r.currentDueDate}</td>
                            <td><span class="badge ${statusObj.badgeClass}">${statusObj.label}</span></td>
                            <td>
                              <a href="#/requests/${r.id}" class="btn btn-secondary btn-sm" style="padding: 2px 8px; font-size: 11px;">
                                View →
                              </a>
                            </td>
                          </tr>
                        `;
                        })
                        .join('')
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Department Overview -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>🏢</span>
              <span>Department Overview</span>
            </div>
          </div>
          <div style="padding: 12px 16px;">
            ${DEPARTMENTS.map(d => {
              const deptPending = allRequests.filter(r => r.departmentId === d.id && r.status !== 'COMPLETED' && r.status !== 'REJECTED').length;
              return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px;">
                  <span style="font-weight: 600; color: #0F172A;">${d.name}</span>
                  <span class="badge ${deptPending > 0 ? 'badge-blue' : 'badge-slate'}">
                    ${deptPending} Pending
                  </span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}
