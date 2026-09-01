/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Document Database & Contracts Repository Page
 * Shows all company legal agreements across departments with search and filtering
 */

import { authService } from '../services/authService.js';
import { documentService } from '../services/documentService.js';
import { DEPARTMENTS } from '../constants.js';

export function renderDepartmentsPage(selectedDeptId = null) {
  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalManager();
  const isChairman = authService.isChairman();

  let allDocs = documentService.getDocuments();
  
  if (selectedDeptId && selectedDeptId !== 'ALL') {
    allDocs = allDocs.filter(d => d.departmentId === selectedDeptId || (selectedDeptId === 'LEGAL_ONLY' && (d.departmentId === 'LEGAL_ONLY' || d.isPrivilegedOnly)));
  }

  return `
    <div class="content-container" style="max-width: 1200px;">
      
      <!-- Page Header -->
      <div class="page-header" style="margin-bottom: 20px;">
        <div>
          <h1 class="page-title" style="font-size: 22px; font-weight: 700; color: #0F172A;">
            🗄️ Document & Contracts Database
          </h1>
          <p class="page-subtitle" style="font-size: 13px; color: #64748B; margin-top: 2px;">
            Central enterprise database indexing all active contracts, department agreements, and approved legal records.
          </p>
        </div>
      </div>

      <!-- Department Filter Pills -->
      <div style="
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding-bottom: 12px;
        margin-bottom: 16px;
      ">
        <button 
          class="btn btn-sm ${!selectedDeptId || selectedDeptId === 'ALL' ? 'btn-primary' : 'btn-secondary'}" 
          style="border-radius: 20px; padding: 5px 14px; font-size: 12px; font-weight: 600;"
          onclick="window.filterDatabaseDept('ALL')"
        >
          All Departments (${documentService.getDocuments().length})
        </button>

        ${DEPARTMENTS.map(d => {
          const count = documentService.getDocuments().filter(doc => doc.departmentId === d.id).length;
          const isSelected = selectedDeptId === d.id;
          return `
            <button 
              class="btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}" 
              style="border-radius: 20px; padding: 5px 14px; font-size: 12px; font-weight: 600; white-space: nowrap;"
              onclick="window.filterDatabaseDept('${d.id}')"
            >
              ${d.name} (${count})
            </button>
          `;
        }).join('')}

        ${
          isLegal || isChairman
            ? `
          <button 
            class="btn btn-sm ${selectedDeptId === 'LEGAL_ONLY' ? 'btn-primary' : 'btn-secondary'}" 
            style="border-radius: 20px; padding: 5px 14px; font-size: 12px; font-weight: 600; white-space: nowrap;"
            onclick="window.filterDatabaseDept('LEGAL_ONLY')"
          >
            🔒 Legal Vault
          </button>
        `
            : ''
        }
      </div>

      <!-- Search Bar -->
      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        padding: 12px 16px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      ">
        <div style="flex: 1;">
          <input 
            type="text" 
            id="database-doc-search" 
            class="form-input" 
            placeholder="Search across all contracts and department documents..." 
            oninput="window.filterDatabaseSearch('${selectedDeptId || 'ALL'}')"
            style="height: 36px; font-size: 13px; padding: 6px 12px;"
          />
        </div>
        <button class="btn btn-secondary btn-sm" onclick="
          const s = document.getElementById('database-doc-search');
          if (s) s.value = '';
          window.filterDatabaseSearch('${selectedDeptId || 'ALL'}');
        " style="height: 36px; padding: 0 12px; font-size: 12px;">
          Reset
        </button>
      </div>

      <!-- Database Table Card -->
      <div class="enterprise-card" style="box-shadow: 0 1px 3px rgba(0,0,0,0.04); border-radius: 10px; overflow: hidden;">
        <div class="enterprise-card-header" style="padding: 12px 18px; background: #FAFAFA; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
          <div class="enterprise-card-title" style="font-size: 13.5px; font-weight: 700; color: #0F172A;">
            <span>Document Records (<strong id="database-doc-count" style="color: #2563EB;">${allDocs.length}</strong>)</span>
          </div>
        </div>

        <div class="table-responsive">
          <table class="enterprise-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Document Title</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Type</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Department</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 120px;">Effective Date</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 110px;">Status</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 150px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="database-doc-tbody">
              ${renderDatabaseDocRows(allDocs)}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

export function renderDatabaseDocRows(allDocs) {
  const isLegal = authService.isLegalManager();

  if (!allDocs || allDocs.length === 0) {
    return `<tr><td colspan="6" style="text-align: center; padding: 40px 16px; color: #94A3B8;">
      <div style="font-size: 26px; margin-bottom: 4px;">📂</div>
      <div style="font-size: 13.5px; font-weight: 600; color: #475569;">No documents found.</div>
      <div style="font-size: 12px; color: #94A3B8; margin-top: 2px;">Try adjusting your search terms or department filters.</div>
    </td></tr>`;
  }

  return allDocs
    .map(doc => {
      const fileName = doc.fileName || `${doc.title.replace(/\s+/g, '_')}.pdf`;
      const fileSize = doc.fileSize || '2.0 MB';
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
        <span class="badge badge-slate" style="font-size: 11px;">${doc.departmentName}</span>
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
