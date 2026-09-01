/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Department Document Repository Page
 * With Instant Search, Category Filter, Download & Delete Support
 */

import { authService } from '../services/authService.js';
import { db } from '../db.js';

export function renderDepartmentDocumentsPage(targetDeptId = null) {
  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalManager();
  const deptId = targetDeptId || (user ? user.departmentId : 'dept-staffing');
  const dept = db.data.departments.find(d => d.id === deptId) || db.data.departments[0];

  // RBAC Access Check
  if (!authService.canAccessDepartment(dept.id)) {
    return `
      <div class="content-container">
        <div style="padding: 48px; text-align: center; background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 12px;">
          <h2 style="color: #BE123C; font-size: 18px;">Access Denied</h2>
          <p style="color: #9F1239; margin-top: 6px;">You only have permission to access documents belonging to your own department (${user.departmentName}).</p>
        </div>
      </div>
    `;
  }

  const docs = db.data.documents.filter(d => d.departmentId === dept.id || d.departmentId === 'ALL');

  return `
    <div class="content-container" style="max-width: 1200px;">
      <!-- Header -->
      <div class="page-header" style="margin-bottom: 20px;">
        <div>
          <h1 style="font-size: 22px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
            📁 ${dept.name} Documents
          </h1>
          <p style="font-size: 13px; color: #64748B; margin-top: 2px;">
            Secure repository for ${dept.name} executed contracts, verified agreements, and legal records.
          </p>
        </div>
      </div>

      <!-- Search & Filter Bar -->
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
        <div style="flex: 1; min-width: 240px;">
          <input 
            type="text" 
            id="dept-doc-search" 
            class="form-input" 
            placeholder="Search ${dept.name} documents by name, keyword, or counterparty..." 
            oninput="window.filterDepartmentDocs('${dept.id}')"
            style="height: 36px; font-size: 13px; padding: 6px 12px;"
          />
        </div>
        <div>
          <select 
            id="dept-doc-filter-type" 
            class="form-select" 
            style="min-width: 150px; height: 36px; font-size: 12.5px; padding: 6px 10px;"
            onchange="window.filterDepartmentDocs('${dept.id}')"
          >
            <option value="">All Document Types</option>
            <option value="Agreement">Agreements</option>
            <option value="MSA">Master Services Agreement (MSA)</option>
            <option value="MOU">MOUs</option>
            <option value="NDA">NDAs</option>
            <option value="Policy">Corporate Policies</option>
            <option value="License">Software Licenses</option>
          </select>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="
          const s = document.getElementById('dept-doc-search');
          const t = document.getElementById('dept-doc-filter-type');
          if (s) s.value = '';
          if (t) t.value = '';
          window.filterDepartmentDocs('${dept.id}');
        " style="height: 36px; padding: 0 12px; font-size: 12px;">
          Reset
        </button>
      </div>

      <!-- Documents Table -->
      <div class="enterprise-card" style="box-shadow: 0 1px 3px rgba(0,0,0,0.04); border-radius: 10px; overflow: hidden;">
        <div class="enterprise-card-header" style="padding: 12px 18px; background: #FAFAFA; border-bottom: 1px solid #E2E8F0;">
          <div class="enterprise-card-title" style="font-size: 13.5px; font-weight: 700; color: #0F172A;">
            <span>📑 ${dept.name} Records: <strong id="dept-doc-count" style="color: #2563EB;">${docs.length}</strong></span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="enterprise-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Document</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Type</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 110px;">Status</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 180px;">File Details</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 120px;">Updated</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 150px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="dept-doc-tbody">
              ${renderDepartmentDocRows(docs)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function renderDepartmentDocRows(docs) {
  const isLegal = authService.isLegalManager();

  if (!docs || docs.length === 0) {
    return `<tr><td colspan="6" style="text-align: center; padding: 40px 16px; color: #94A3B8;">
      <div style="font-size: 26px; margin-bottom: 4px;">📂</div>
      <div style="font-size: 13.5px; font-weight: 600; color: #475569;">No matching documents found.</div>
      <div style="font-size: 12px; color: #94A3B8; margin-top: 2px;">Try adjusting your search terms or filters.</div>
    </td></tr>`;
  }

  return docs
    .map(doc => {
      const fileName = doc.fileName || (doc.versions && doc.versions.length ? doc.versions[doc.versions.length - 1].fileName : `${doc.title.replace(/\s+/g, '_')}.pdf`);
      const fileSize = doc.fileSize || '2.0 MB';

      return `
      <tr style="border-bottom: 1px solid #F1F5F9; transition: background 0.1s ease;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
        <td style="padding: 12px 16px; vertical-align: middle;">
          <div style="font-weight: 600; font-size: 13.5px; color: #0F172A; display: flex; align-items: center; gap: 8px;">
            <span>${doc.isFinal ? '📜' : '📄'}</span>
            <span>${doc.title}</span>
          </div>
          ${doc.counterparty ? `<div style="font-size: 11px; color: #64748B; margin-left: 24px;">Counterparty: ${doc.counterparty}</div>` : ''}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; font-size: 12.5px; color: #334155;">
          ${doc.documentType || doc.category || 'Agreement'}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle;">
          <span class="badge ${doc.status === 'Executed' ? 'badge-green' : 'badge-amber'}">
            ${doc.status || 'Executed'}
          </span>
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; font-family: var(--font-mono); font-size: 11.5px; color: #64748B;">
          ${fileName} (${fileSize})
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; font-size: 12px; color: #64748B;">
          ${doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : 'Active'}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; text-align: right; white-space: nowrap;">
          <div style="display: flex; gap: 6px; justify-content: flex-end; align-items: center;">
            <button class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11px; font-weight: 600;" onclick="window.downloadDocumentFile('${fileName}', '${doc.title.replace(/'/g, "\\'")}')">
              📥 Download
            </button>
            ${
              isLegal
                ? `
              <button class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11px; font-weight: 600; color: #DC2626; border-color: #FECDD3;" onclick="window.deleteVaultDocument('${doc.id}', '${doc.title.replace(/'/g, "\\'")}')" title="Delete document">
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
