/**
 * Impacteers Legal docs
 * Business User Dashboard (e.g. Edwin - HR, Musthafa - IT)
 */

import { authService } from '../services/authService.js';
import { requestService } from '../services/requestService.js';
import { db } from '../db.js';
import { REQUEST_STATUSES } from '../constants.js';

export function renderBusinessDashboardPage() {
  const user = authService.getCurrentUser();
  const deptName = user.departmentName || 'Department';
  const requests = requestService.getRequests({ departmentId: user.departmentId });
  const pendingRequests = requests.filter(r => r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const deptDocs = db.data.documents.filter(d => d.departmentId === user.departmentId);

  return `
    <div class="content-container" style="max-width: 1200px;">
      <!-- Welcome Header -->
      <div style="margin-bottom: 28px;">
        <h1 style="font-size: 26px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
          Hello, ${user.name} 👋
        </h1>
        <p style="font-size: 14px; color: #64748B; margin-top: 2px;">
          ${deptName} Team Portal • Impacteers In-House Document Management System
        </p>
      </div>

      <!-- 3 Primary Large Action Cards -->
      <div class="dashboard-action-cards">
        
        <!-- 1. My Requests Card -->
        <div class="kpi-card" onclick="window.location.hash='#/my-requests'" style="border-top: 4px solid #2563EB;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #EFF6FF; color: #1D4ED8; display: flex; align-items: center; justify-content: center; font-size: 22px;">
              📋
            </div>
            <span class="badge badge-blue">${pendingRequests.length} Active</span>
          </div>
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: #0F172A;">My Requests</h3>
            <p style="font-size: 13px; color: #64748B; margin-top: 4px; line-height: 1.4;">
              View and track legal review and drafting requests submitted by ${deptName}.
            </p>
          </div>
          <div style="margin-top: 16px; font-size: 12.5px; font-weight: 600; color: #2563EB;">
            View Requests →
          </div>
        </div>

        <!-- 2. Department Documents Card -->
        <div class="kpi-card" onclick="window.location.hash='#/department-docs'" style="border-top: 4px solid #059669;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #ECFDF5; color: #047857; display: flex; align-items: center; justify-content: center; font-size: 22px;">
              📁
            </div>
            <span class="badge badge-green">${deptDocs.length} Documents</span>
          </div>
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: #0F172A;">${deptName} Documents</h3>
            <p style="font-size: 13px; color: #64748B; margin-top: 4px; line-height: 1.4;">
              Access completed agreements, MOUs, and approved legal records.
            </p>
          </div>
          <div style="margin-top: 16px; font-size: 12.5px; font-weight: 600; color: #059669;">
            Open Repository →
          </div>
        </div>

        <!-- 3. Create Request Card -->
        <div class="kpi-card" onclick="window.location.hash='#/create-request'" style="border-top: 4px solid #7C3AED; background: linear-gradient(180deg, #FFFFFF, #FAF5FF);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #FAF5FF; color: #7C3AED; display: flex; align-items: center; justify-content: center; font-size: 22px;">
              ➕
            </div>
            <span class="badge badge-purple">Fast Track</span>
          </div>
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: #0F172A;">Create Request</h3>
            <p style="font-size: 13px; color: #64748B; margin-top: 4px; line-height: 1.4;">
              Send a new document for drafting, vetting, or verification directly to Monisha.
            </p>
          </div>
          <div style="margin-top: 16px; font-size: 12.5px; font-weight: 600; color: #7C3AED;">
            Submit New Request →
          </div>
        </div>

      </div>

      <!-- Recent Requests Table -->
      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>📋</span>
            <span>Recent ${deptName} Requests</span>
          </div>
          <a href="#/my-requests" style="font-size: 12.5px; color: #2563EB; font-weight: 600; text-decoration: none;">
            View All →
          </a>
        </div>
        <div class="table-responsive">
          <table class="enterprise-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Required By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${
                requests.length === 0
                  ? `<tr><td colspan="6" style="text-align: center; padding: 36px; color: #94A3B8;">No requests submitted yet. Click "Create Request" above to get started.</td></tr>`
                  : requests.slice(0, 5)
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
                          <td style="font-size: 12.5px; color: #475569;">${r.requestType}</td>
                          <td style="font-family: var(--font-mono); font-size: 12px; font-weight: 600;">${r.currentDueDate}</td>
                          <td>
                            <span class="badge ${statusObj.badgeClass}">${statusObj.label}</span>
                          </td>
                          <td>
                            <a href="#/requests/${r.id}" class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11.5px;">
                              Open Ticket →
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
