/**
 * Impacteers DMS — Access Management Page
 * Strict Department-Based Access Request & Approval System
 * Exclusively handles:
 * 1. Request Login / Account Access
 * 2. Request Permission to Access a Database
 * 3. Request Permission to Download a Document
 * All requests routed to Legal Admin for central approval.
 */

import { authService } from '../services/authService.js';
import { accessRequestService, ACCESS_REQUEST_TYPES, ACCESS_STATUSES } from '../services/accessRequestService.js';
import { documentService } from '../services/documentService.js';
import { DEPARTMENTS } from '../constants.js';

export function renderAccessManagementPage(filters = {}) {
  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalManager();

  if (!user) {
    return `
      <div class="content-container" style="max-width: 600px; margin: 40px auto; text-align: center;">
        <div class="enterprise-card" style="padding: 32px 24px;">
          <div style="font-size: 40px; margin-bottom: 12px;">🔐</div>
          <h2 style="font-size: 20px; font-weight: 800; color: #0F172A; margin: 0 0 8px 0;">Access Request Required</h2>
          <p style="font-size: 13.5px; color: #64748B; margin-bottom: 20px;">
            A user must not be allowed to log in to the software until the Legal Admin approves the login request.
          </p>
          <a href="#/login" class="btn btn-primary" style="display: inline-block;">
            Request Login Access / Sign In
          </a>
        </div>
      </div>
    `;
  }

  if (isLegal) {
    return renderLegalAdminAccessView(filters);
  } else {
    return renderUserAccessView(user);
  }
}

/**
 * 1. Ordinary User View
 * Clean UI:
 * ACCESS
 * [ Request Login Access ] [ Request Database Access ] [ Request Document Download ]
 * ────────────────────────
 * MY REQUESTS
 * Request ID | Type | Department | Item | Date | Status
 */
function renderUserAccessView(user) {
  const userDeptId = user.departmentId || 'dept-legal';
  const dept = DEPARTMENTS.find(d => d.id === userDeptId) || { id: userDeptId, name: user.departmentName || 'General' };
  const requests = accessRequestService.getRequests({ myRequestsOnly: true });

  const hasDbAccess = Array.isArray(user.grantedDatabases) && user.grantedDatabases.includes(dept.id);

  return `
    <div class="content-container" style="max-width: 1100px;">
      
      <!-- Clean Page Title & 3 Action Buttons -->
      <div class="page-header" style="margin-bottom: 20px;">
        <div>
          <h1 class="page-title" style="font-size: 24px; font-weight: 800; color: #0F172A; letter-spacing: -0.02em; margin: 0;">
            ACCESS
          </h1>
          <p class="page-subtitle" style="font-size: 13px; color: #64748B; margin-top: 4px;">
            Assigned Department: <strong style="color: #0F172A;">${dept.name}</strong> • Software and department resource requests are reviewed by the Legal Admin.
          </p>
        </div>

        <!-- 3 Request Buttons -->
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button class="btn btn-secondary" id="btn-request-login-access" onclick="window.openRequestLoginAccessModal()" style="font-size: 12.5px; padding: 8px 14px; font-weight: 600; display: flex; align-items: center; gap: 6px;">
            <span>🔑</span>
            <span>Request Login Access</span>
          </button>
          <button class="btn btn-primary" id="btn-request-db-access" onclick="window.openRequestDbAccessModal()" style="font-size: 12.5px; padding: 8px 14px; font-weight: 600; display: flex; align-items: center; gap: 6px;">
            <span>🗄️</span>
            <span>Request Database Access</span>
          </button>
          <button class="btn btn-secondary" id="btn-request-doc-download" onclick="window.openRequestDocDownloadModal()" style="font-size: 12.5px; padding: 8px 14px; font-weight: 600; display: flex; align-items: center; gap: 6px;">
            <span>📥</span>
            <span>Request Document Download</span>
          </button>
        </div>
      </div>

      <!-- Contracts Database Directory Overview -->
      <div class="enterprise-card" style="margin-bottom: 24px; padding: 20px;">
        <div style="margin-bottom: 12px;">
          <h2 style="font-size: 16px; font-weight: 800; color: #0F172A; margin: 0 0 4px 0; display: flex; align-items: center; gap: 8px;">
            <span>🗄️</span> Contracts Database
          </h2>
          <p style="font-size: 12.5px; color: #64748B; margin: 0;">
            Central enterprise database indexing all active contracts, department agreements, and approved legal records.
          </p>
        </div>

        <!-- 11 Departments Grid -->
        <div style="
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(165px, 1fr)); 
          gap: 8px; 
          margin-top: 14px;
        ">
          ${DEPARTMENTS.map(d => {
            const isUserDept = d.id === dept.id;
            return `
              <div style="
                border: 1.5px solid ${isUserDept ? '#2563EB' : '#E2E8F0'};
                background: ${isUserDept ? '#F0F7FF' : '#F8FAFC'};
                border-radius: 8px;
                padding: 10px 12px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              ">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                  <span style="font-size: 12.5px; font-weight: 700; color: #0F172A;">${d.name}</span>
                  ${isUserDept ? `<span style="font-size: 10px; font-weight: 700; color: #2563EB; background: #DBEAFE; padding: 1px 5px; border-radius: 4px;">Your Dept</span>` : ''}
                </div>
                <div style="font-size: 11px; color: ${isUserDept ? (hasDbAccess ? '#16A34A' : '#D97706') : '#94A3B8'}; font-weight: 600;">
                  ${isUserDept ? (hasDbAccess ? '● Access Granted' : '🔒 Access Locked') : '🔒 Restricted'}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 24px 0;" />

      <!-- My Requests Section -->
      <div class="enterprise-card">
        <div class="enterprise-card-header" style="padding: 14px 20px; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 15px; font-weight: 800; color: #0F172A; letter-spacing: -0.01em;">
            MY REQUESTS (${requests.length})
          </div>
          <div style="font-size: 12px; color: #64748B;">
            Restricted to ${dept.name} Department & Personal Requests
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="data-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0; text-align: left;">
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Request ID</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Type</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Department</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Item</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Date</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Status</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${renderUserRequestsTableRows(requests)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render user's own requests rows
 */
function renderUserRequestsTableRows(requests) {
  if (!requests || requests.length === 0) {
    return `
      <tr>
        <td colspan="7" style="text-align: center; padding: 48px 16px; color: #94A3B8;">
          <div style="font-size: 32px; margin-bottom: 8px;">🗂️</div>
          <div style="font-size: 14px; font-weight: 600; color: #475569;">No access requests submitted yet.</div>
          <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">
            Use the buttons above to request login access, database access, or permission to download documents.
          </div>
        </td>
      </tr>
    `;
  }

  return requests.map(r => {
    const formattedDate = new Date(r.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    let typeBadge = '';
    if (r.requestType === ACCESS_REQUEST_TYPES.LOGIN_ACCESS) {
      typeBadge = `<span class="badge badge-blue" style="font-size: 11px;">🔑 Login Access</span>`;
    } else if (r.requestType === ACCESS_REQUEST_TYPES.DATABASE_ACCESS) {
      typeBadge = `<span class="badge badge-purple" style="font-size: 11px;">🗄️ Database Access</span>`;
    } else {
      typeBadge = `<span class="badge badge-slate" style="font-size: 11px;">📥 Document Download</span>`;
    }

    const canDownload = r.requestType === ACCESS_REQUEST_TYPES.DOCUMENT_DOWNLOAD && r.status === ACCESS_STATUSES.APPROVED;

    return `
      <tr style="border-bottom: 1px solid #F1F5F9;">
        <td style="padding: 12px 16px; font-family: var(--font-mono); font-weight: 700; font-size: 12.5px; color: #2563EB;">
          ${r.requestId || r.id}
        </td>
        <td style="padding: 12px 16px;">
          ${typeBadge}
        </td>
        <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #334155;">
          ${r.departmentName}
        </td>
        <td style="padding: 12px 16px;">
          <div style="font-weight: 600; font-size: 13px; color: #0F172A;">${r.itemLabel}</div>
          <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">Reason: "${r.reason}"</div>
        </td>
        <td style="padding: 12px 16px; font-size: 12px; color: #64748B;">
          ${formattedDate}
        </td>
        <td style="padding: 12px 16px;">
          ${renderStatusBadge(r.status, r.denialReason)}
        </td>
        <td style="padding: 12px 16px; text-align: right;">
          ${
            canDownload
              ? `<button class="btn btn-primary btn-sm" onclick="window.userDownloadApprovedDoc('${r.id}')" style="font-size: 11px; padding: 4px 10px;">⬇ Download</button>`
              : `<span style="font-size: 11.5px; color: #94A3B8;">—</span>`
          }
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * 2. Legal Admin Approval Dashboard View
 * ACCESS REQUESTS
 * [ All Departments ▼ ] [ All Request Types ▼ ] [ All Statuses ▼ ]
 * Request ID | User | Department | Type | Item | Date | Status | Action
 */
function renderLegalAdminAccessView(filters = {}) {
  const selectedDept = filters.departmentId || 'ALL';
  const selectedType = filters.requestType || 'ALL';
  const selectedStatus = filters.status || 'ALL';

  const pendingCounts = accessRequestService.getPendingCountsByDepartment();
  const totalPending = Object.values(pendingCounts).reduce((a, b) => a + b, 0);

  const requests = accessRequestService.getRequests({
    departmentId: selectedDept,
    requestType: selectedType,
    status: selectedStatus
  });

  return `
    <div class="content-container" style="max-width: 1200px;">
      
      <!-- Page Header -->
      <div class="page-header" style="margin-bottom: 20px;">
        <div>
          <div class="page-title" style="font-size: 24px; font-weight: 800; color: #0F172A; display: flex; align-items: center; gap: 8px;">
            <span>🛡️</span>
            <span>ACCESS REQUESTS</span>
          </div>
          <div class="page-subtitle" style="font-size: 13.5px; color: #64748B; margin-top: 4px;">
            Legal Admin Approval Authority • Review and approve login access, database access, and document download requests.
          </div>
        </div>
        <div style="background: #EFF6FF; border: 1px solid #BFDBFE; padding: 8px 16px; border-radius: 8px; text-align: right;">
          <div style="font-size: 11px; font-weight: 700; color: #1E40AF; text-transform: uppercase;">Total Pending Requests</div>
          <div style="font-size: 20px; font-weight: 800; color: #1D4ED8;">${totalPending}</div>
        </div>
      </div>

      <!-- 11 Department Breakdown Cards -->
      <div style="margin-bottom: 24px;">
        <div style="font-size: 12.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">
          Department Segregation Console
        </div>
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 10px;
        ">
          <!-- All Departments Card -->
          <div 
            onclick="window.adminFilterAccessRequests('ALL', '${selectedType}', '${selectedStatus}')"
            style="
              background: ${selectedDept === 'ALL' ? '#1E293B' : '#FFFFFF'};
              color: ${selectedDept === 'ALL' ? '#FFFFFF' : '#0F172A'};
              border: 1.5px solid ${selectedDept === 'ALL' ? '#1E293B' : '#E2E8F0'};
              border-radius: 10px;
              padding: 12px 14px;
              cursor: pointer;
              transition: all 0.15s ease;
              box-shadow: 0 1px 3px rgba(0,0,0,0.03);
            "
          >
            <div style="font-size: 12px; font-weight: 700; opacity: 0.85;">All Departments</div>
            <div style="font-size: 16px; font-weight: 800; margin-top: 4px; color: ${selectedDept === 'ALL' ? '#60A5FA' : '#2563EB'};">
              ${totalPending} Pending
            </div>
          </div>

          ${DEPARTMENTS.map(d => {
            const count = pendingCounts[d.id] || 0;
            const isSelected = selectedDept === d.id;
            return `
              <div 
                onclick="window.adminFilterAccessRequests('${d.id}', '${selectedType}', '${selectedStatus}')"
                style="
                  background: ${isSelected ? '#2563EB' : '#FFFFFF'};
                  color: ${isSelected ? '#FFFFFF' : '#0F172A'};
                  border: 1.5px solid ${isSelected ? '#2563EB' : '#E2E8F0'};
                  border-radius: 10px;
                  padding: 12px 14px;
                  cursor: pointer;
                  transition: all 0.15s ease;
                  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
                "
              >
                <div style="font-size: 12px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${d.name}</div>
                <div style="font-size: 15px; font-weight: 800; margin-top: 4px; color: ${isSelected ? '#FFFFFF' : count > 0 ? '#D97706' : '#94A3B8'};">
                  ${count} Pending
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Filters Bar: Department, Type, Status -->
      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        padding: 12px 16px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      ">
        <div style="display: flex; align-items: center; gap: 8px;">
          <label style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">Department:</label>
          <select 
            id="admin-filter-dept" 
            class="form-select" 
            style="font-size: 12.5px; height: 34px; padding: 4px 10px; min-width: 150px;"
            onchange="window.adminApplyFilters()"
          >
            <option value="ALL" ${selectedDept === 'ALL' ? 'selected' : ''}>All Departments</option>
            ${DEPARTMENTS.map(d => `<option value="${d.id}" ${selectedDept === d.id ? 'selected' : ''}>${d.name}</option>`).join('')}
          </select>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <label style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">Type:</label>
          <select 
            id="admin-filter-type" 
            class="form-select" 
            style="font-size: 12.5px; height: 34px; padding: 4px 10px; min-width: 170px;"
            onchange="window.adminApplyFilters()"
          >
            <option value="ALL" ${selectedType === 'ALL' ? 'selected' : ''}>All Request Types</option>
            <option value="${ACCESS_REQUEST_TYPES.LOGIN_ACCESS}" ${selectedType === ACCESS_REQUEST_TYPES.LOGIN_ACCESS ? 'selected' : ''}>Login Access</option>
            <option value="${ACCESS_REQUEST_TYPES.DATABASE_ACCESS}" ${selectedType === ACCESS_REQUEST_TYPES.DATABASE_ACCESS ? 'selected' : ''}>Database Access</option>
            <option value="${ACCESS_REQUEST_TYPES.DOCUMENT_DOWNLOAD}" ${selectedType === ACCESS_REQUEST_TYPES.DOCUMENT_DOWNLOAD ? 'selected' : ''}>Document Download</option>
          </select>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <label style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">Status:</label>
          <select 
            id="admin-filter-status" 
            class="form-select" 
            style="font-size: 12.5px; height: 34px; padding: 4px 10px; min-width: 140px;"
            onchange="window.adminApplyFilters()"
          >
            <option value="ALL" ${selectedStatus === 'ALL' ? 'selected' : ''}>All Statuses</option>
            <option value="${ACCESS_STATUSES.PENDING}" ${selectedStatus === ACCESS_STATUSES.PENDING ? 'selected' : ''}>Pending</option>
            <option value="${ACCESS_STATUSES.APPROVED}" ${selectedStatus === ACCESS_STATUSES.APPROVED ? 'selected' : ''}>Approved</option>
            <option value="${ACCESS_STATUSES.DENIED}" ${selectedStatus === ACCESS_STATUSES.DENIED ? 'selected' : ''}>Denied</option>
          </select>
        </div>

        <div style="margin-left: auto; font-size: 12.5px; color: #64748B;">
          Showing <strong>${requests.length}</strong> request${requests.length === 1 ? '' : 's'}
        </div>
      </div>

      <!-- Legal Admin Requests Table -->
      <div class="enterprise-card">
        <div style="overflow-x: auto;">
          <table class="data-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0; text-align: left;">
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Request ID</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">User</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Department</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Type</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Item</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Date</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569;">Status</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${renderAdminRequestsTableRows(requests)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderAdminRequestsTableRows(requests) {
  if (!requests || requests.length === 0) {
    return `
      <tr>
        <td colspan="8" style="text-align: center; padding: 48px 16px; color: #94A3B8;">
          <div style="font-size: 32px; margin-bottom: 8px;">📂</div>
          <div style="font-size: 14px; font-weight: 600; color: #475569;">No access requests match the selected filters.</div>
          <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">Change the department, type, or status filters above.</div>
        </td>
      </tr>
    `;
  }

  return requests.map(r => {
    const formattedDate = new Date(r.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    let typeBadge = '';
    if (r.requestType === ACCESS_REQUEST_TYPES.LOGIN_ACCESS) {
      typeBadge = `<span class="badge badge-blue" style="font-size: 11px;">🔑 Login Access</span>`;
    } else if (r.requestType === ACCESS_REQUEST_TYPES.DATABASE_ACCESS) {
      typeBadge = `<span class="badge badge-purple" style="font-size: 11px;">🗄️ Database Access</span>`;
    } else {
      typeBadge = `<span class="badge badge-slate" style="font-size: 11px;">📥 Document Download</span>`;
    }

    return `
      <tr style="border-bottom: 1px solid #F1F5F9;">
        <td style="padding: 12px 16px; font-family: var(--font-mono); font-weight: 700; font-size: 12.5px; color: #2563EB;">
          ${r.requestId || r.id}
        </td>
        <td style="padding: 12px 16px;">
          <div style="font-weight: 700; font-size: 13.5px; color: #0F172A;">${r.userName}</div>
          <div style="font-size: 11.5px; color: #64748B;">${r.userEmail}</div>
          ${r.designation ? `<div style="font-size: 10.5px; color: #94A3B8; margin-top: 2px;">Role: ${r.designation}</div>` : ''}
        </td>
        <td style="padding: 12px 16px;">
          <span class="badge badge-slate" style="font-size: 11px; font-weight: 600;">${r.departmentName}</span>
        </td>
        <td style="padding: 12px 16px;">
          ${typeBadge}
        </td>
        <td style="padding: 12px 16px;">
          <div style="font-weight: 600; font-size: 13px; color: #0F172A;">${r.itemLabel}</div>
          <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">
            <strong>Reason:</strong> "${r.reason}"
          </div>
        </td>
        <td style="padding: 12px 16px; font-size: 12px; color: #64748B;">
          ${formattedDate}
        </td>
        <td style="padding: 12px 16px;">
          ${renderStatusBadge(r.status, r.denialReason)}
        </td>
        <td style="padding: 12px 16px; text-align: right;">
          ${renderAdminRowActions(r)}
        </td>
      </tr>
    `;
  }).join('');
}

function renderAdminRowActions(r) {
  if (r.status === ACCESS_STATUSES.PENDING) {
    return `
      <div style="display: inline-flex; gap: 6px;">
        <button 
          class="btn btn-primary btn-sm" 
          onclick="window.adminApproveAccessRequest('${r.id}')"
          style="background: #16A34A; border-color: #16A34A; font-size: 11.5px; padding: 4px 10px; font-weight: 600;"
        >
          ✓ Approve
        </button>
        <button 
          class="btn btn-danger btn-sm" 
          onclick="window.adminOpenDenyModal('${r.id}')"
          style="background: #DC2626; border-color: #DC2626; font-size: 11.5px; padding: 4px 10px; font-weight: 600;"
        >
          ✕ Deny
        </button>
      </div>
    `;
  }
  if (r.status === ACCESS_STATUSES.APPROVED) {
    return `<span style="font-size: 11.5px; color: #16A34A; font-weight: 600;">● Approved</span>`;
  }
  return `<span style="font-size: 11.5px; color: #DC2626; font-weight: 600;">● Denied</span>`;
}

function renderStatusBadge(status, denialReason) {
  if (status === ACCESS_STATUSES.PENDING) {
    return `
      <span class="badge badge-amber" style="font-size: 11.5px; display: inline-flex; align-items: center; gap: 5px;">
        <span style="color: #D97706;">●</span> Pending
      </span>
    `;
  }
  if (status === ACCESS_STATUSES.APPROVED) {
    return `
      <span class="badge badge-green" style="font-size: 11.5px; display: inline-flex; align-items: center; gap: 5px;">
        <span style="color: #16A34A;">●</span> Approved
      </span>
    `;
  }
  if (status === ACCESS_STATUSES.DENIED) {
    return `
      <div>
        <span class="badge badge-rose" style="font-size: 11.5px; display: inline-flex; align-items: center; gap: 5px;">
          <span style="color: #DC2626;">●</span> Denied
        </span>
        ${denialReason ? `<div style="font-size: 10.5px; color: #DC2626; margin-top: 3px;">"${denialReason}"</div>` : ''}
      </div>
    `;
  }
  return `<span class="badge badge-slate">${status}</span>`;
}

/**
 * 1. Request Login Access Modal Form HTML
 * Fields: Full Name, Official Email, Department, Designation / Role, Reason for Request
 */
export function renderRequestLoginAccessModalHtml(user) {
  const userDeptId = user?.departmentId || 'dept-hr';
  const dept = DEPARTMENTS.find(d => d.id === userDeptId) || { id: userDeptId, name: user?.departmentName || 'HR' };

  return `
    <div>
      <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12.5px; color: #1E40AF;">
        ℹ️ A new user must first request permission to log in to the software. Access requires approval from the <strong>Legal Admin</strong>.
      </div>

      <div class="form-group" style="margin-bottom: 12px;">
        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #334155;">
          Full Name <span style="color: #EF4444;">*</span>
        </label>
        <input 
          type="text" 
          id="req-login-name" 
          class="form-input" 
          value="${user?.name || ''}"
          placeholder="e.g. Jordan Smith" 
          required 
          style="font-size: 13px;"
        />
      </div>

      <div class="form-group" style="margin-bottom: 12px;">
        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #334155;">
          Official Email <span style="color: #EF4444;">*</span>
        </label>
        <input 
          type="email" 
          id="req-login-email" 
          class="form-input" 
          value="${user?.email || ''}"
          placeholder="e.g. jordan@impacteers.club" 
          required 
          style="font-size: 13px;"
        />
      </div>

      <div class="form-group" style="margin-bottom: 12px;">
        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #334155;">
          Department <span style="color: #EF4444;">*</span>
        </label>
        <select 
          id="req-login-department" 
          class="form-select" 
          style="font-size: 13px;"
          required
        >
          ${DEPARTMENTS.map(d => `<option value="${d.id}" ${d.id === dept.id ? 'selected' : ''}>${d.name}</option>`).join('')}
        </select>
      </div>

      <div class="form-group" style="margin-bottom: 12px;">
        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #334155;">
          Designation / Role <span style="color: #EF4444;">*</span>
        </label>
        <input 
          type="text" 
          id="req-login-designation" 
          class="form-input" 
          placeholder="e.g. Senior HR Specialist" 
          required 
          style="font-size: 13px;"
        />
      </div>

      <div class="form-group" style="margin-bottom: 18px;">
        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #334155;">
          Reason for Request <span style="color: #EF4444;">*</span>
        </label>
        <textarea 
          id="req-login-reason" 
          class="form-textarea" 
          rows="3" 
          placeholder="Explain why you require software login access..." 
          required 
          style="font-size: 13px; line-height: 1.5;"
        ></textarea>
      </div>

      <div style="text-align: right; display: flex; justify-content: flex-end; gap: 8px;">
        <button type="button" class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="window.submitLoginAccessRequest()">Submit Login Request</button>
      </div>
    </div>
  `;
}

/**
 * 2. Request Database Access Modal Form HTML
 * Department is locked to authenticated user's department
 */
export function renderRequestDbAccessModalHtml(user) {
  const userDeptId = user.departmentId || 'dept-legal';
  const dept = DEPARTMENTS.find(d => d.id === userDeptId) || { id: userDeptId, name: user.departmentName || 'General' };

  return `
    <div>
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
        <div style="font-size: 12px; color: #64748B;">Requesting User:</div>
        <div style="font-size: 13.5px; font-weight: 700; color: #0F172A; margin-top: 2px;">
          ${user.name} (${user.email})
        </div>
      </div>

      <div class="form-group" style="margin-bottom: 14px;">
        <label class="form-label" style="font-size: 12.5px; font-weight: 700; color: #334155;">
          Department
        </label>
        <input 
          type="text" 
          class="form-input" 
          value="${dept.name}" 
          disabled 
          style="background: #F1F5F9; color: #475569; font-weight: 700; cursor: not-allowed;" 
        />
        <div style="font-size: 11.5px; color: #64748B; margin-top: 4px;">
          🔒 Department is automatically assigned and locked.
        </div>
      </div>

      <div class="form-group" style="margin-bottom: 14px;">
        <label class="form-label" style="font-size: 12.5px; font-weight: 700; color: #334155;">
          Database
        </label>
        <input 
          type="text" 
          class="form-input" 
          value="Contracts Database" 
          disabled 
          style="background: #F1F5F9; color: #475569; font-weight: 600; cursor: not-allowed;" 
        />
      </div>

      <div class="form-group" style="margin-bottom: 14px;">
        <label class="form-label" style="font-size: 12.5px; font-weight: 700; color: #334155;">
          Access Requested For
        </label>
        <input 
          type="text" 
          class="form-input" 
          value="${dept.name} Contracts & Legal Records" 
          disabled 
          style="background: #F1F5F9; color: #475569; font-weight: 600; cursor: not-allowed;" 
        />
      </div>

      <div class="form-group" style="margin-bottom: 18px;">
        <label class="form-label" style="font-size: 12.5px; font-weight: 700; color: #334155;">
          Reason for Request <span style="color: #EF4444;">*</span>
        </label>
        <textarea 
          id="req-db-reason" 
          class="form-textarea" 
          rows="3" 
          placeholder="Please explain why you require access to the ${dept.name} Contracts & Legal Records database..." 
          required 
          style="font-size: 13px; line-height: 1.5;"
        ></textarea>
      </div>

      <div style="text-align: right; display: flex; justify-content: flex-end; gap: 8px;">
        <button type="button" class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="window.submitDatabaseAccessRequest()">Submit Access Request</button>
      </div>
    </div>
  `;
}

/**
 * 3. Request Document Download Modal Form HTML
 * Strictly populates documents belonging to the user's assigned department
 */
export function renderRequestDocDownloadModalHtml(user) {
  const userDeptId = user.departmentId || 'dept-legal';
  const dept = DEPARTMENTS.find(d => d.id === userDeptId) || { id: userDeptId, name: user.departmentName || 'General' };
  
  // Strict Department Segregation: ONLY fetch documents from the user's department
  const isLegal = authService.isLegalManager();
  const allDocs = documentService.getDocuments({ departmentId: isLegal ? '' : userDeptId });
  const deptDocs = isLegal ? allDocs : allDocs.filter(d => d.departmentId === userDeptId || d.departmentId === 'ALL');

  return `
    <div>
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
        <div style="font-size: 12px; color: #64748B;">Requesting User:</div>
        <div style="font-size: 13.5px; font-weight: 700; color: #0F172A; margin-top: 2px;">
          ${user.name} (${user.email})
        </div>
      </div>

      <div class="form-group" style="margin-bottom: 14px;">
        <label class="form-label" style="font-size: 12.5px; font-weight: 700; color: #334155;">
          Department
        </label>
        <input 
          type="text" 
          class="form-input" 
          value="${dept.name}" 
          disabled 
          style="background: #F1F5F9; color: #475569; font-weight: 700; cursor: not-allowed;" 
        />
        <div style="font-size: 11.5px; color: #64748B; margin-top: 4px;">
          🔒 Locked to ${dept.name} department documents.
        </div>
      </div>

      <div class="form-group" style="margin-bottom: 14px;">
        <label class="form-label" style="font-size: 12.5px; font-weight: 700; color: #334155;">
          Document <span style="color: #EF4444;">*</span>
        </label>
        ${
          deptDocs.length === 0
            ? `
            <div style="padding: 12px; background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; font-size: 12.5px; color: #92400E;">
              No documents currently indexed under the <strong>${dept.name}</strong> department repository.
            </div>
          `
            : `
            <select id="req-doc-select" class="form-select" style="font-size: 13px;" required>
              <option value="">-- Select a document to request download --</option>
              ${deptDocs.map(d => `<option value="${d.id}">${d.title} (${d.fileType || 'PDF'})</option>`).join('')}
            </select>
          `
        }
      </div>

      <div class="form-group" style="margin-bottom: 18px;">
        <label class="form-label" style="font-size: 12.5px; font-weight: 700; color: #334155;">
          Reason for Download <span style="color: #EF4444;">*</span>
        </label>
        <textarea 
          id="req-doc-reason" 
          class="form-textarea" 
          rows="3" 
          placeholder="Please explain the reason for requesting to download this document..." 
          required 
          style="font-size: 13px; line-height: 1.5;"
        ></textarea>
      </div>

      <div style="text-align: right; display: flex; justify-content: flex-end; gap: 8px;">
        <button type="button" class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
        <button 
          type="button" 
          class="btn btn-primary" 
          onclick="window.submitDocumentDownloadRequest()"
          ${deptDocs.length === 0 ? 'disabled' : ''}
        >
          Request Download Permission
        </button>
      </div>
    </div>
  `;
}

/**
 * Denial Reason Modal HTML
 */
export function renderDenialModalHtml(requestId) {
  return `
    <div>
      <p style="font-size: 13.5px; color: #334155; margin-bottom: 14px;">
        You are denying access request <strong>${requestId}</strong>. You may provide an optional reason below to notify the requesting user.
      </p>

      <div class="form-group" style="margin-bottom: 18px;">
        <label class="form-label" style="font-size: 12.5px; font-weight: 700; color: #334155;">
          Reason for Denial
        </label>
        <textarea 
          id="admin-deny-reason" 
          class="form-textarea" 
          rows="3" 
          placeholder="e.g. Incomplete business justification, unauthorized department role, or duplicate request."
          style="font-size: 13px; line-height: 1.5;"
        ></textarea>
      </div>

      <div style="text-align: right; display: flex; justify-content: flex-end; gap: 8px;">
        <button type="button" class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
        <button type="button" class="btn btn-danger" onclick="window.confirmDenyAccessRequest('${requestId}')">Confirm Denial</button>
      </div>
    </div>
  `;
}
