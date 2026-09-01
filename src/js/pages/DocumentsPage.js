/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Centralized Legal Document Repository & Vault Page
 * With "+ Add Document" Dialog, Department Sharing Permissions & Delete Actions
 */

import { authService } from '../services/authService.js';
import { documentService } from '../services/documentService.js';
import { DEPARTMENTS } from '../constants.js';
import { Modal } from '../components/Modal.js';
import { Toast } from '../components/Toast.js';

export function renderDocumentsPage() {
  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalManager();
  const isChairman = authService.isChairman();
  const docs = documentService.getDocuments();

  return `
    <div class="content-container" style="max-width: 1200px;">
      
      <!-- Page Header -->
      <div class="page-header" style="margin-bottom: 20px;">
        <div>
          <h1 class="page-title" style="font-size: 22px; font-weight: 700; color: #0F172A;">
            📁 Documents Vault & Repository
          </h1>
          <p class="page-subtitle" style="font-size: 13px; color: #64748B; margin-top: 2px;">
            Central repository of executed agreements, master contracts, and company legal records.
          </p>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          ${
            isLegal
              ? `
            <button class="btn btn-secondary btn-sm" id="btn-purge-all-docs" onclick="window.deleteAllVaultDocuments()" style="font-size: 12px; color: #DC2626; border-color: #FECDD3; background: #FFF1F2;">
              🗑️ Clear All Old Documents
            </button>
            <button class="btn btn-primary btn-sm" id="btn-vault-add-doc" style="font-size: 12.5px; padding: 7px 14px; font-weight: 600;">
              + Add Document
            </button>
          `
              : ''
          }
        </div>
      </div>

      <!-- Filters & Search Bar -->
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
            id="doc-search-input" 
            class="form-input" 
            placeholder="Search documents by title, file name, keyword, or counterparty..." 
            oninput="window.filterVaultDocs()"
            style="height: 36px; font-size: 13px; padding: 6px 12px;"
          />
        </div>

        <div>
          <select id="doc-dept-filter" class="form-select" onchange="window.filterVaultDocs()" style="min-width: 170px; height: 36px; font-size: 12.5px; padding: 6px 10px;">
            <option value="">All Scopes & Departments</option>
            <option value="ALL">Company-Wide (All)</option>
            <option value="LEGAL_ONLY">Confidential Legal Only</option>
            ${DEPARTMENTS.map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
          </select>
        </div>

        <div>
          <select id="doc-type-filter" class="form-select" onchange="window.filterVaultDocs()" style="min-width: 150px; height: 36px; font-size: 12.5px; padding: 6px 10px;">
            <option value="">All Document Types</option>
            <option value="Agreement">Agreement</option>
            <option value="MSA">Master Services Agreement (MSA)</option>
            <option value="MOU">MOU</option>
            <option value="NDA">NDA</option>
            <option value="Policy">Corporate Policy</option>
            <option value="License">Software License</option>
          </select>
        </div>

        <button id="doc-reset-filter-btn" class="btn btn-secondary btn-sm" onclick="
          const s = document.getElementById('doc-search-input');
          const d = document.getElementById('doc-dept-filter');
          const t = document.getElementById('doc-type-filter');
          if (s) s.value = '';
          if (d) d.value = '';
          if (t) t.value = '';
          window.filterVaultDocs();
        " style="height: 36px; padding: 0 12px; font-size: 12px;">
          Reset
        </button>
      </div>

      <!-- Documents Table Card -->
      <div class="enterprise-card" style="box-shadow: 0 1px 3px rgba(0,0,0,0.04); border-radius: 10px; overflow: hidden;">
        <div class="enterprise-card-header" style="padding: 12px 18px; background: #FAFAFA; border-bottom: 1px solid #E2E8F0;">
          <div class="enterprise-card-title" style="font-size: 13.5px; font-weight: 700; color: #0F172A;">
            <span>Total Vault Records: <strong id="doc-count" style="color: #2563EB;">${docs.length}</strong></span>
          </div>
        </div>

        <div class="table-responsive">
          <table class="enterprise-table" id="vault-docs-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Document Title</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Type</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 180px;">Shared Scope</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 120px;">Effective Date</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 110px;">Status</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 160px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="docs-tbody">
              ${renderVaultDocRows(docs)}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

export function renderVaultDocRows(docs) {
  const isLegal = authService.isLegalManager();

  if (!docs || docs.length === 0) {
    return `
      <tr>
        <td colspan="6" style="text-align: center; padding: 40px 16px; color: #94A3B8;">
          <div style="font-size: 28px; margin-bottom: 6px;">📂</div>
          <div style="font-size: 14px; font-weight: 600; color: #475569;">No documents found in vault.</div>
          <div style="font-size: 12px; color: #94A3B8; margin-top: 2px;">Click "+ Add Document" above to upload a new record.</div>
        </td>
      </tr>
    `;
  }

  return docs
    .map(doc => {
      const fileName = doc.fileName || (doc.versions && doc.versions.length ? doc.versions[doc.versions.length - 1].fileName : `${doc.title}.pdf`);
      const fileSize = doc.fileSize || '2.2 MB';

      let scopeBadge = `<span class="badge badge-slate" style="font-size: 11px;">${doc.departmentName}</span>`;
      if (doc.departmentId === 'ALL') {
        scopeBadge = `<span class="badge badge-blue" style="font-size: 11px;">🌐 All Departments</span>`;
      } else if (doc.departmentId === 'LEGAL_ONLY' || doc.isPrivilegedOnly) {
        scopeBadge = `<span class="badge badge-rose" style="font-size: 11px;">🔒 Legal & Chairman</span>`;
      }

      return `
      <tr style="border-bottom: 1px solid #F1F5F9; transition: background 0.1s ease;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
        <td style="padding: 12px 16px; vertical-align: middle;">
          <div style="font-weight: 600; font-size: 13.5px; color: #0F172A; display: flex; align-items: center; gap: 6px;">
            <span>📜</span>
            <span>${doc.title}</span>
          </div>
          <div style="font-size: 11.5px; color: #64748B; margin-top: 2px; margin-left: 22px;">
            ${fileName} (${fileSize})
          </div>
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; font-size: 12.5px; color: #334155;">
          ${doc.documentType || doc.category || 'Agreement'}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle;">
          ${scopeBadge}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; font-family: var(--font-mono); font-size: 12px; color: #475569;">
          ${doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : 'Active'}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle;">
          <span class="badge badge-green" style="font-size: 11px;">${doc.status || 'Executed'}</span>
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; text-align: right; white-space: nowrap;">
          <div style="display: flex; gap: 6px; justify-content: flex-end; align-items: center;">
            <button 
              class="btn btn-secondary btn-sm" 
              style="padding: 3px 8px; font-size: 11px; font-weight: 600;" 
              onclick="window.downloadDocumentFile('${fileName}', '${doc.title.replace(/'/g, "\\'")}')"
            >
              📥 Download
            </button>
            ${
              isLegal
                ? `
              <button 
                class="btn btn-secondary btn-sm" 
                style="padding: 3px 8px; font-size: 11px; font-weight: 600; color: #DC2626; border-color: #FECDD3;" 
                onclick="window.deleteVaultDocument('${doc.id}', '${doc.title.replace(/'/g, "\\'")}')"
                title="Delete this document"
              >
                🗑️ Delete
              </button>
            `
                : ''
            }
          </div>
        </td>
      </tr>
    `;
    })
    .join('');
}
