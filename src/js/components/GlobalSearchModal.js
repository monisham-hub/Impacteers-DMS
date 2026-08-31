/**
 * Enterprise In-House Legal Management System
 * Global Search Modal (Ctrl+K) with strict RBAC filtering
 */

import { Modal } from './Modal.js';
import { requestService } from '../services/requestService.js';
import { documentService } from '../services/documentService.js';
import { contractService } from '../services/contractService.js';

export function openGlobalSearchModal() {
  const html = `
    <div style="padding: 4px 0;">
      <div style="position: relative; margin-bottom: 16px;">
        <input type="text" id="global-search-input" class="form-input" 
          placeholder="Type to search requests, documents, contracts, counterparties..." 
          style="font-size: 15px; padding: 12px 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);"
          autofocus />
      </div>

      <div id="search-results-container" style="max-height: 380px; overflow-y: auto;">
        <div style="padding: 24px; text-align: center; color: #94A3B8; font-size: 13px;">
          Type a search term to find authorized records...
        </div>
      </div>
    </div>
  `;

  const modal = Modal.open({
    title: '🔍 Global Enterprise Search (RBAC-Filtered)',
    contentHtml: html,
    size: 'lg'
  });

  window.activeModalClose = modal.close;

  const searchInput = document.getElementById('global-search-input');
  const resultsContainer = document.getElementById('search-results-container');

  const executeSearch = () => {
    const query = searchInput.value.trim();
    if (!query) {
      resultsContainer.innerHTML = `<div style="padding: 24px; text-align: center; color: #94A3B8; font-size: 13px;">Type a search term to find authorized records...</div>`;
      return;
    }

    const requests = requestService.getRequests({ search: query }).slice(0, 4);
    const documents = documentService.getDocuments({ search: query }).slice(0, 4);
    const contracts = contractService.getContracts({ search: query }).slice(0, 4);

    if (requests.length === 0 && documents.length === 0 && contracts.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 36px; text-align: center; color: #64748B;">
          <div style="font-size: 24px; margin-bottom: 6px;">🔍</div>
          <div style="font-size: 14px; font-weight: 600;">No matching authorized records found</div>
          <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">Results are strictly filtered according to your role permissions.</div>
        </div>
      `;
      return;
    }

    let out = '';

    if (requests.length > 0) {
      out += `<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748B; padding: 6px 10px; background: #F1F5F9; border-radius: 4px; margin-bottom: 6px;">Legal Requests (${requests.length})</div>`;
      requests.forEach(r => {
        out += `
          <div class="search-result-item" style="
            padding: 10px 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            border-bottom: 1px solid #F1F5F9;
          " onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'"
             onclick="window.location.hash='#/requests/${r.id}'; window.activeModalClose();">
            <div>
              <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: #2563EB;">${r.requestId}</span>
              <span style="font-size: 13px; font-weight: 600; color: #0F172A; margin-left: 8px;">${r.title}</span>
              <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">${r.departmentName} • ${r.requestType} • Due ${r.currentDueDate}</div>
            </div>
            <span class="badge badge-${r.priority === 'CRITICAL' || r.priority === 'URGENT' ? 'rose' : 'blue'}">${r.priority}</span>
          </div>
        `;
      });
    }

    if (documents.length > 0) {
      out += `<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748B; padding: 6px 10px; background: #F1F5F9; border-radius: 4px; margin: 12px 0 6px 0;">Documents (${documents.length})</div>`;
      documents.forEach(d => {
        out += `
          <div class="search-result-item" style="
            padding: 10px 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            border-bottom: 1px solid #F1F5F9;
          " onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'"
             onclick="window.location.hash='#/documents'; window.activeModalClose();">
            <div>
              <span style="font-size: 13px; font-weight: 600; color: #0F172A;">📄 ${d.title}</span>
              <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">${d.departmentName} • Version ${d.currentVersion} • ${d.confidentialityLevel}</div>
            </div>
            <span class="badge badge-slate">${d.status}</span>
          </div>
        `;
      });
    }

    if (contracts.length > 0) {
      out += `<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748B; padding: 6px 10px; background: #F1F5F9; border-radius: 4px; margin: 12px 0 6px 0;">Contracts (${contracts.length})</div>`;
      contracts.forEach(c => {
        out += `
          <div class="search-result-item" style="
            padding: 10px 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            border-bottom: 1px solid #F1F5F9;
          " onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'"
             onclick="window.location.hash='#/contracts'; window.activeModalClose();">
            <div>
              <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: #047857;">${c.contractId}</span>
              <span style="font-size: 13px; font-weight: 600; color: #0F172A; margin-left: 8px;">${c.name}</span>
              <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">${c.counterparty} • $${c.contractValue.toLocaleString()} • Expires ${c.expiryDate}</div>
            </div>
            <span class="badge badge-${c.status === 'EXPIRING_SOON' ? 'amber' : 'green'}">${c.status}</span>
          </div>
        `;
      });
    }

    resultsContainer.innerHTML = out;
  };

  searchInput.addEventListener('input', executeSearch);
  setTimeout(() => searchInput.focus(), 100);
}
