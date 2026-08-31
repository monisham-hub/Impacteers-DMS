/**
 * Impacteers Legal docs
 * Simple Department Document Repository Page
 */

import { authService } from '../services/authService.js';
import { db } from '../db.js';
import { Toast } from '../components/Toast.js';

export function renderDepartmentDocumentsPage(targetDeptId = null) {
  const user = authService.getCurrentUser();
  const deptId = targetDeptId || (user ? user.departmentId : 'dept-hr');
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

  const docs = db.data.documents.filter(d => d.departmentId === dept.id);

  return `
    <div class="content-container">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 style="font-size: 24px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
            📁 ${dept.name} Documents
          </h1>
          <p style="font-size: 13.5px; color: #64748B; margin-top: 2px;">
            Secure repository for ${dept.name} executed contracts, verified agreements, and legal records.
          </p>
        </div>
      </div>

      <!-- Search & Filter Bar -->
      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        padding: 14px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      ">
        <div style="flex: 1; min-width: 240px;">
          <input type="text" id="dept-doc-search" class="form-input" placeholder="Search ${dept.name} documents by name or keyword..." />
        </div>
        <div>
          <select id="dept-doc-filter-type" class="form-select" style="min-width: 140px;">
            <option value="">All Types</option>
            <option value="Agreement">Agreements</option>
            <option value="MOU">MOUs</option>
            <option value="NDA">NDAs</option>
          </select>
        </div>
      </div>

      <!-- Documents Table -->
      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>📑</span>
            <span>${dept.name} Documents (<span id="dept-doc-count">${docs.length}</span>)</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="enterprise-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Type</th>
                <th>Status</th>
                <th>File Name</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="dept-doc-tbody">
              ${
                docs.length === 0
                  ? `<tr><td colspan="6" style="text-align: center; padding: 36px; color: #94A3B8;">No documents found for ${dept.name}. Completed legal requests will appear here automatically.</td></tr>`
                  : docs
                      .map(doc => `
                    <tr>
                      <td>
                        <div style="font-weight: 600; color: #0F172A; display: flex; align-items: center; gap: 8px;">
                          <span>${doc.isFinal ? '📜' : '📄'}</span>
                          <span>${doc.title}</span>
                        </div>
                      </td>
                      <td style="font-size: 12.5px;">${doc.documentType}</td>
                      <td>
                        <span class="badge ${doc.status === 'Executed' ? 'badge-green' : 'badge-amber'}">
                          ${doc.status}
                        </span>
                      </td>
                      <td style="font-family: var(--font-mono); font-size: 11.5px; color: #64748B;">
                        ${doc.fileName} (${doc.fileSize})
                      </td>
                      <td style="font-size: 12.5px; color: #64748B;">${doc.updatedAt}</td>
                      <td>
                        <button class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11px;" onclick="alert('Downloading verified secure document: ${doc.fileName}');">
                          📥 Download
                        </button>
                      </td>
                    </tr>
                  `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
