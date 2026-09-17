/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Legal Admin Page - User Access & Credential Management
 */

import { authService } from '../services/authService.js';
import { db } from '../db.js';
import { USER_ROLES, PERMISSIONS, PERMISSION_CATEGORIES, DEPARTMENTS } from '../constants.js';
import { Modal } from '../components/Modal.js';
import { Toast } from '../components/Toast.js';

export function renderLegalAdminPage() {
  if (!authService.isLegalAdmin()) {
    return `
      <div class="content-container">
        <div style="padding: 48px; text-align: center; background: #FFF1F2; border-radius: 12px; border: 1px solid #FECDD3;">
          <h2 style="color: #BE123C;">Access Denied</h2>
          <p style="color: #9F1239; margin-top: 6px;">Only System Administrators and Legal Administrators have access to this configuration console.</p>
        </div>
      </div>
    `;
  }

  const users = authService.getAllUsers();

  return `
    <div class="content-container">
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>🛡️</span>
            <span>Legal Admin – User Access & Credential Management</span>
          </div>
          <div class="page-subtitle">
            Manage system users, assign roles, configure access permissions, and manage credentials securely.
          </div>
        </div>
        <div>
          <button class="btn btn-primary" id="btn-add-new-user" onclick="window.adminOpenAddUser()">
            <span>➕ Add New User</span>
          </button>
        </div>
      </div>

      <div class="enterprise-card" style="margin-top: 24px;">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>👥</span>
            <span>User Overview</span>
          </div>
        </div>
        <div style="overflow-x: auto;">
          <table class="data-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0; text-align: left;">
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #64748B;">User Details</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #64748B;">Role & Dept</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #64748B;">Status</th>
                <th style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #64748B; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="admin-users-tbody">
              ${renderUsersTableRows(users)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function renderUsersTableRows(users) {
  if (!users || users.length === 0) {
    return `<tr><td colspan="4" style="text-align: center; padding: 24px; color: #64748B;">No users found.</td></tr>`;
  }

  return users.map(u => {
    const isActive = u.isActive !== false;
    return `
      <tr style="border-bottom: 1px solid #F1F5F9;">
        <td style="padding: 12px 16px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 9999px; background: ${isActive ? '#2563EB' : '#94A3B8'}; color: #fff; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center;">
              ${u.avatar || u.name.charAt(0)}
            </div>
            <div>
              <div style="font-weight: 600; color: #0F172A; font-size: 13.5px;">${u.name}</div>
              <div style="color: #64748B; font-size: 12px;">${u.email}</div>
            </div>
          </div>
        </td>
        <td style="padding: 12px 16px;">
          <div style="font-size: 13px; color: #334155;">
            <span class="badge ${u.role === USER_ROLES.LEGAL_ADMIN || u.role === USER_ROLES.LEGAL_MANAGER ? 'badge-purple' : u.role === USER_ROLES.CHAIRMAN ? 'badge-amber' : 'badge-blue'}">${u.roleLabel || u.role}</span>
          </div>
          <div style="font-size: 11.5px; color: #64748B; margin-top: 4px;">${u.departmentName || 'Global Access'}</div>
        </td>
        <td style="padding: 12px 16px;">
          <span class="badge ${isActive ? 'badge-green' : 'badge-rose'}">${isActive ? 'Active' : 'Inactive'}</span>
        </td>
        <td style="padding: 12px 16px; text-align: right;">
          <button class="btn btn-secondary btn-sm" onclick="window.adminEditUser('${u.id}')">Edit Access</button>
          <button class="btn ${isActive ? 'btn-danger' : 'btn-primary'} btn-sm" style="margin-left: 4px;" onclick="window.adminToggleUserStatus('${u.id}')">${isActive ? 'Deactivate' : 'Activate'}</button>
          <button class="btn btn-secondary btn-sm" style="margin-left: 4px;" onclick="window.adminResetCredential('${u.id}')">Reset</button>
        </td>
      </tr>
    `;
  }).join('');
}

export function renderUserFormModal(user = null) {
  const isEdit = !!user;
  const permissions = user?.permissions || [];
  
  const categories = Object.values(PERMISSION_CATEGORIES);
  
  return `
    <div style="max-height: 70vh; overflow-y: auto; padding-right: 8px;">
      <div class="form-group">
        <label class="form-label">Full Name <span class="required">*</span></label>
        <input type="text" id="admin-user-name" class="form-input" value="${user?.name || ''}" required />
      </div>
      <div class="form-group">
        <label class="form-label">Email Address <span class="required">*</span></label>
        <input type="email" id="admin-user-email" class="form-input" value="${user?.email || ''}" placeholder="e.g. monisha@impacteers.club" required />
      </div>
      
      <div class="grid-2-col" style="gap: 16px;">
        <div class="form-group">
          <label class="form-label">Role <span class="required">*</span></label>
          <select id="admin-user-role" class="form-select">
            <option value="${USER_ROLES.BUSINESS_USER}" ${user?.role === USER_ROLES.BUSINESS_USER ? 'selected' : ''}>Business User</option>
            <option value="${USER_ROLES.LEGAL_MANAGER}" ${user?.role === USER_ROLES.LEGAL_MANAGER ? 'selected' : ''}>Legal Manager</option>
            <option value="${USER_ROLES.LEGAL_ADMIN}" ${user?.role === USER_ROLES.LEGAL_ADMIN ? 'selected' : ''}>Legal Admin</option>
            <option value="${USER_ROLES.CHAIRMAN}" ${user?.role === USER_ROLES.CHAIRMAN ? 'selected' : ''}>Chairman (View Only)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Department</label>
          <select id="admin-user-dept" class="form-select">
            <option value="">Global Access (No Dept)</option>
            ${DEPARTMENTS.map(d => `<option value="${d.id}" ${user?.departmentId === d.id ? 'selected' : ''}>${d.name}</option>`).join('')}
          </select>
        </div>
      </div>
      
      <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 20px 0;" />
      
      <h4 style="font-size: 14px; font-weight: 600; color: #0F172A; margin-bottom: 12px;">Access Permissions</h4>
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px;">
        ${categories.map(cat => {
          const catPerms = Object.values(PERMISSIONS).filter(p => p.category === cat);
          return `
            <div style="margin-bottom: 16px;">
              <div style="font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 8px;">${cat}</div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                ${catPerms.map(p => `
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #475569; cursor: pointer;">
                    <input type="checkbox" class="admin-perm-cb" value="${p.id}" ${permissions.includes(p.id) ? 'checked' : ''} />
                    ${p.label}
                  </label>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
