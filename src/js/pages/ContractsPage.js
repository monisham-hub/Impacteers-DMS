/**
 * Enterprise In-House Legal Management System
 * Contract Lifecycle Management (CLM) Page
 */

import { authService } from '../services/authService.js';
import { contractService } from '../services/contractService.js';
import { CONTRACT_STATUSES, DEPARTMENTS } from '../constants.js';
import { Modal } from '../components/Modal.js';
import { Toast } from '../components/Toast.js';

export function renderContractsPage() {
  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalTeam();
  const contracts = contractService.getContracts();
  const expiringSoon = contracts.filter(c => c.status === 'EXPIRING_SOON');

  return `
    <div class="content-container">
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>📜</span>
            <span>Contract Lifecycle Management (CLM)</span>
          </div>
          <div class="page-subtitle">
            Central repository of active agreements, automated expiry tracking, renewal notices, and commercial metadata.
          </div>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary btn-sm" onclick="window.exportContractsCsv()">
            <span>📥 Export Contracts CSV</span>
          </button>
          <button class="btn btn-primary btn-sm" id="create-contract-btn">
            <span>+ Create Contract Record</span>
          </button>
        </div>
      </div>

      <!-- Expiry Alert Banner -->
      ${
        expiringSoon.length > 0
          ? `
        <div style="
          background: #FFFBEB;
          border: 1px solid #FDE68A;
          border-left: 4px solid #F59E0B;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">⚠️</span>
            <div>
              <strong style="color: #92400E; font-size: 14px;">
                ${expiringSoon.length} Active Contract${expiringSoon.length > 1 ? 's are' : ' is'} Expiring Soon!
              </strong>
              <div style="font-size: 12px; color: #B45309; margin-top: 2px;">
                Review renewal deadlines and notice period requirements to prevent unexpected lapse or automatic rollover.
              </div>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('contract-status-filter').value='EXPIRING_SOON'; window.filterContracts();">
            View Expiring Contracts
          </button>
        </div>
      `
          : ''
      }

      <!-- Filter Toolbar -->
      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      ">
        <div style="flex: 1; min-width: 240px;">
          <input type="text" id="contract-search-input" class="form-input" placeholder="Search by contract ID, title, vendor, counterparty..." />
        </div>

        <div>
          <select id="contract-status-filter" class="form-select" style="min-width: 160px;">
            <option value="">All Statuses</option>
            ${Object.keys(CONTRACT_STATUSES).map(k => `<option value="${k}">${CONTRACT_STATUSES[k].label}</option>`).join('')}
          </select>
        </div>

        ${
          isLegal
            ? `
          <div>
            <select id="contract-dept-filter" class="form-select" style="min-width: 160px;">
              <option value="">All Departments</option>
              ${DEPARTMENTS.map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
            </select>
          </div>
        `
            : ''
        }
      </div>

      <!-- Contracts Table -->
      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>📑</span>
            <span>Active Contract Portfolio (<span id="contract-count">${contracts.length}</span>)</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="enterprise-table">
            <thead>
              <tr>
                <th>Contract ID</th>
                <th>Contract Name & Type</th>
                <th>Department</th>
                <th>Counterparty</th>
                <th>Effective Date</th>
                <th>Expiry Date</th>
                <th>Contract Value</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="contracts-tbody">
              ${renderContractRows(contracts)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderContractRows(contracts) {
  if (contracts.length === 0) {
    return `
      <tr>
        <td colspan="9" style="text-align: center; padding: 48px; color: #94A3B8;">
          <div style="font-size: 32px; margin-bottom: 8px;">📜</div>
          <div style="font-size: 15px; font-weight: 600; color: #475569;">No contracts found in this view.</div>
        </td>
      </tr>
    `;
  }

  return contracts
    .map(c => {
      const statusStyle =
        c.status === 'ACTIVE'
          ? 'green'
          : c.status === 'EXPIRING_SOON'
          ? 'amber'
          : c.status === 'EXPIRED'
          ? 'rose'
          : 'slate';

      return `
      <tr>
        <td>
          <span style="font-family: var(--font-mono); font-weight: 700; color: #047857; font-size: 12.5px;">
            ${c.contractId}
          </span>
        </td>
        <td style="max-width: 260px;">
          <div style="font-weight: 600; color: #0F172A; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${c.name}
          </div>
          <div style="font-size: 11px; color: #64748B;">
            ${c.contractType}
          </div>
        </td>
        <td><span class="badge badge-slate">${c.departmentName}</span></td>
        <td style="font-size: 12.5px; font-weight: 500;">${c.counterparty}</td>
        <td style="font-family: var(--font-mono); font-size: 12px; color: #475569;">${c.effectiveDate}</td>
        <td style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: ${c.status === 'EXPIRING_SOON' ? '#B45309' : '#0F172A'};">
          ${c.expiryDate}
        </td>
        <td style="font-family: var(--font-mono); font-size: 12.5px; font-weight: 700; color: #047857;">
          $${c.contractValue.toLocaleString()} ${c.currency}
        </td>
        <td>
          <span class="badge badge-${statusStyle}">
            ${c.status.replace(/_/g, ' ')}
          </span>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11px;" onclick="window.viewContractModal('${c.id}')">
            View Details →
          </button>
        </td>
      </tr>
    `;
    })
    .join('');
}
