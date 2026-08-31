/**
 * Impacteers Legal docs
 * My Requests & Legal Queue Page (Clean, Perfectly Aligned Jira-style Table)
 */

import { authService } from '../services/authService.js';
import { requestService } from '../services/requestService.js';
import { DEPARTMENTS, REQUEST_STATUSES } from '../constants.js';

export function renderLegalRequestsPage({ myRequestsOnly = false } = {}) {
  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalManager();
  const deptName = user.departmentName || 'Department';

  let requests = requestService.getRequests({
    departmentId: isLegal ? null : user.departmentId,
    myRequestsOnly: myRequestsOnly
  });

  const pageTitle = isLegal
    ? '⚖️ Legal Requests Queue'
    : `📋 My ${deptName} Requests`;

  const pageSubtitle = isLegal
    ? 'All company legal review, vetting, and contract drafting requests.'
    : `Track and manage legal requests submitted by ${deptName}.`;

  return `
    <div class="content-container" style="max-width: 1200px;">
      
      <!-- Page Header -->
      <div class="page-header" style="margin-bottom: 20px;">
        <div>
          <h1 class="page-title" style="font-size: 22px; font-weight: 700; color: #0F172A;">
            ${pageTitle}
          </h1>
          <p class="page-subtitle" style="font-size: 13px; color: #64748B; margin-top: 2px;">
            ${pageSubtitle}
          </p>
        </div>
        <div>
          <a href="#/create-request" class="btn btn-primary btn-sm" style="font-size: 12.5px; padding: 7px 14px; font-weight: 600;">
            + Create New Request
          </a>
        </div>
      </div>

      <!-- Search & Filters Bar -->
      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        padding: 12px 16px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      ">
        <div style="flex: 1; min-width: 220px;">
          <input 
            type="text" 
            id="filter-search" 
            class="form-input" 
            placeholder="Search by ID, title, or type..." 
            style="height: 36px; font-size: 13px; padding: 6px 12px;"
          />
        </div>

        <div>
          <select id="filter-status" class="form-select" style="min-width: 170px; height: 36px; font-size: 12.5px; padding: 6px 10px;">
            <option value="">All Statuses</option>
            ${Object.keys(REQUEST_STATUSES).map(k => `<option value="${k}">${REQUEST_STATUSES[k].label}</option>`).join('')}
          </select>
        </div>

        ${
          isLegal
            ? `
          <div>
            <select id="filter-dept" class="form-select" style="min-width: 160px; height: 36px; font-size: 12.5px; padding: 6px 10px;">
              <option value="">All Departments</option>
              ${DEPARTMENTS.map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
            </select>
          </div>
        `
            : ''
        }

        <button id="filter-reset-btn" class="btn btn-secondary btn-sm" style="height: 36px; padding: 0 12px; font-size: 12px;">
          Reset
        </button>
      </div>

      <!-- Requests Table Card -->
      <div class="enterprise-card" style="box-shadow: 0 1px 3px rgba(0,0,0,0.04); border-radius: 10px; overflow: hidden;">
        <div class="enterprise-card-header" style="padding: 12px 18px; background: #FAFAFA; border-bottom: 1px solid #E2E8F0;">
          <div class="enterprise-card-title" style="font-size: 13.5px; font-weight: 700; color: #0F172A;">
            <span>Total Requests: <strong id="table-count" style="color: #2563EB;">${requests.length}</strong></span>
          </div>
        </div>
        
        <div class="table-responsive">
          <table class="enterprise-table" id="legal-requests-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Request ID</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Title & Type</th>
                ${isLegal ? `<th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 130px;">Department</th>` : ''}
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 150px;">Required By</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 180px;">Status</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 110px; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody id="requests-tbody">
              ${renderRequestRows(requests, isLegal)}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

export function renderRequestRows(requests, isLegal = false) {
  if (!requests || requests.length === 0) {
    return `
      <tr>
        <td colspan="${isLegal ? '6' : '5'}" style="text-align: center; padding: 40px 16px; color: #94A3B8;">
          <div style="font-size: 28px; margin-bottom: 6px;">📂</div>
          <div style="font-size: 14px; font-weight: 600; color: #475569;">No requests found.</div>
          <div style="font-size: 12px; color: #94A3B8; margin-top: 2px;">Submit a new request or change your search filters.</div>
        </td>
      </tr>
    `;
  }

  return requests
    .map(r => {
      const statusObj = REQUEST_STATUSES[r.status] || { label: r.status, badgeClass: 'badge-blue' };

      return `
      <tr style="border-bottom: 1px solid #F1F5F9; transition: background 0.1s ease;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
        <td style="padding: 12px 16px; vertical-align: middle;">
          <a href="#/requests/${r.id}" style="
            font-family: var(--font-mono);
            font-weight: 700;
            font-size: 12.5px;
            color: #2563EB;
            text-decoration: none;
            background: #EFF6FF;
            padding: 3px 8px;
            border-radius: 6px;
            display: inline-block;
          ">
            ${r.requestId}
          </a>
        </td>
        <td style="padding: 12px 16px; vertical-align: middle;">
          <a href="#/requests/${r.id}" style="font-weight: 600; font-size: 13.5px; color: #0F172A; text-decoration: none;">
            ${r.title}
          </a>
          <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">
            ${r.requestType} • ${r.attachedDocument ? `📄 ${r.attachedDocument.name}` : 'No initial doc'}
          </div>
        </td>
        ${
          isLegal
            ? `
          <td style="padding: 12px 16px; vertical-align: middle;">
            <span class="badge badge-slate" style="font-size: 11px;">${r.departmentName}</span>
          </td>
        `
            : ''
        }
        <td style="padding: 12px 16px; vertical-align: middle; font-family: var(--font-mono); font-size: 12.5px; font-weight: 600; color: #0F172A;">
          ${r.currentDueDate}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle;">
          <span class="badge ${statusObj.badgeClass}" style="font-size: 11.5px; font-weight: 600;">
            ${statusObj.label}
          </span>
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; text-align: right;">
          <a href="#/requests/${r.id}" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 11.5px; font-weight: 600;">
            Open Ticket →
          </a>
        </td>
      </tr>
    `;
    })
    .join('');
}
