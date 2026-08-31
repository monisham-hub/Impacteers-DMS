/**
 * Impacteers Legal docs
 * Document Database & Contracts Repository Page
 * Shows all company legal agreements across departments with filtering
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
        margin-bottom: 20px;
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

      <!-- Database Table Card -->
      <div class="enterprise-card" style="box-shadow: 0 1px 3px rgba(0,0,0,0.04); border-radius: 10px; overflow: hidden;">
        <div class="enterprise-card-header" style="padding: 12px 18px; background: #FAFAFA; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
          <div class="enterprise-card-title" style="font-size: 13.5px; font-weight: 700; color: #0F172A;">
            <span>Document Records (<strong style="color: #2563EB;">${allDocs.length}</strong>)</span>
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
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 100px; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${
                allDocs.length === 0
                  ? `<tr><td colspan="6" style="text-align: center; padding: 40px 16px; color: #94A3B8;">No documents found for this department.</td></tr>`
                  : allDocs
                      .map(doc => {
                        const fileName = doc.fileName || `${doc.title}.pdf`;
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
                        <td style="padding: 12px 16px; vertical-align: middle; text-align: right;">
                          <button 
                            class="btn btn-secondary btn-sm" 
                            style="padding: 3px 8px; font-size: 11px; font-weight: 600;" 
                            onclick="window.downloadDocumentFile('${fileName}', '${doc.title}')"
                          >
                            📥 Download
                          </button>
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
