/**
 * Impacteers Legal docs
 * Legal Manager Dashboard (Monisha)
 */

import { requestService } from '../services/requestService.js';
import { REQUEST_STATUSES } from '../constants.js';

export function renderLegalDashboardPage() {
  const allRequests = requestService.getRequests();
  const todayStr = '2026-08-27';

  const newRequests = allRequests.filter(r => r.status === 'PENDING_ACCEPTANCE' || r.status === 'RESCHEDULED');
  const inProgress = allRequests.filter(r => r.status === 'ACCEPTED' || r.status === 'UNDER_LEGAL_REVIEW' || r.status === 'BUSINESS_ACTION_REQUIRED' || r.status === 'FINAL_DOCUMENT_REQUIRED');
  const dueToday = allRequests.filter(r => r.currentDueDate === todayStr && r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const overdue = allRequests.filter(r => new Date(r.currentDueDate) < new Date(todayStr) && r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const completed = allRequests.filter(r => r.status === 'COMPLETED');

  return `
    <div class="content-container">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 style="font-size: 24px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
            Good Morning, Monisha ⚖️
          </h1>
          <p style="font-size: 13.5px; color: #64748B; margin-top: 2px;">
            Legal Manager • Enterprise Legal Request & Document Triage
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <a href="#/requests" class="btn btn-secondary btn-sm">
            View All Requests Queue →
          </a>
        </div>
      </div>

      <!-- 5 Key Action Cards -->
      <div class="kpi-grid">
        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #2563EB;">
          <div class="kpi-card-header">
            <span class="kpi-title">New Requests</span>
            <div class="kpi-icon-wrapper" style="background: #EFF6FF; color: #1D4ED8;">📥</div>
          </div>
          <div class="kpi-value" style="color: ${newRequests.length > 0 ? '#1D4ED8' : '#0F172A'};">${newRequests.length}</div>
          <div class="kpi-subtext">Waiting for acceptance</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #7C3AED;">
          <div class="kpi-card-header">
            <span class="kpi-title">In Progress</span>
            <div class="kpi-icon-wrapper" style="background: #FAF5FF; color: #7C3AED;">⚙️</div>
          </div>
          <div class="kpi-value">${inProgress.length}</div>
          <div class="kpi-subtext">Under active review</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #F59E0B;">
          <div class="kpi-card-header">
            <span class="kpi-title">Due Today</span>
            <div class="kpi-icon-wrapper" style="background: #FFFBEB; color: #B45309;">⏳</div>
          </div>
          <div class="kpi-value" style="color: ${dueToday.length > 0 ? '#B45309' : '#0F172A'};">${dueToday.length}</div>
          <div class="kpi-subtext">Target turnaround today</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #DC2626;">
          <div class="kpi-card-header">
            <span class="kpi-title">Overdue</span>
            <div class="kpi-icon-wrapper" style="background: #FFF1F2; color: #BE123C;">🚨</div>
          </div>
          <div class="kpi-value" style="color: ${overdue.length > 0 ? '#BE123C' : '#0F172A'};">${overdue.length}</div>
          <div class="kpi-subtext">Past due date</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #10B981;">
          <div class="kpi-card-header">
            <span class="kpi-title">Completed</span>
            <div class="kpi-icon-wrapper" style="background: #ECFDF5; color: #047857;">✓</div>
          </div>
          <div class="kpi-value">${completed.length}</div>
          <div class="kpi-subtext">Stored in department vaults</div>
        </div>
      </div>

      <!-- Actionable Requests Queue -->
      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>📥</span>
            <span>Requests Requiring Action (${newRequests.length + inProgress.length})</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="enterprise-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Title</th>
                <th>Department</th>
                <th>Requested By</th>
                <th>Required By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${
                allRequests.length === 0
                  ? '<tr><td colspan="7" style="text-align: center; padding: 32px; color: #94A3B8;">No requests in queue.</td></tr>'
                  : allRequests
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
                          <td style="font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: #0F172A;">${r.currentDueDate}</td>
                          <td><span class="badge ${statusObj.badgeClass}">${statusObj.label}</span></td>
                          <td>
                            <a href="#/requests/${r.id}" class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11.5px;">
                              Review Ticket →
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
    </div>
  `;
}
