/**
 * Impacteers Legal docs
 * Main Application Orchestrator & Role-Based Router
 */

import { db } from './db.js';
import { authService } from './services/authService.js';
import { app as firebaseApp, analytics as firebaseAnalytics } from './firebaseConfig.js';
import { requestService } from './services/requestService.js';
import { documentService } from './services/documentService.js';
import { contractService } from './services/contractService.js';
import { notificationService } from './services/notificationService.js';

import { renderSidebar } from './components/Sidebar.js';
import { renderTopbar } from './components/Topbar.js';
import { renderLoginPage } from './components/LoginPage.js';
import { Modal } from './components/Modal.js';
import { Toast } from './components/Toast.js';

import { renderBusinessDashboardPage } from './pages/BusinessDashboardPage.js';
import { renderLegalDashboardPage } from './pages/LegalDashboardPage.js';
import { renderChairmanDashboardPage } from './pages/ChairmanDashboardPage.js';
import { renderCreateRequestPage } from './pages/CreateRequestPage.js';
import { renderDepartmentDocumentsPage, renderDepartmentDocRows } from './pages/DepartmentDocumentsPage.js';
import { renderLegalRequestsPage } from './pages/LegalRequestsPage.js';
import { renderRequestDetailPage } from './pages/RequestDetailPage.js';
import { renderDocumentsPage, renderVaultDocRows } from './pages/DocumentsPage.js';
import { renderDepartmentsPage, renderDatabaseDocRows } from './pages/DepartmentsPage.js';
import { renderCalendarPage } from './pages/CalendarPage.js';
import { renderLegalAssistantPage } from './pages/LegalAssistantPage.js';
import { renderNotificationsPage } from './pages/NotificationsPage.js';
import { renderAuditLogsPage } from './pages/AuditLogsPage.js';
import { renderAdminSettingsPage } from './pages/AdminSettingsPage.js';
import { renderAboutPage } from './pages/AboutPage.js';
import { renderFloatingLegalAssistant } from './components/FloatingLegalAssistant.js';
import { renderLegalAdminPage, renderUserFormModal } from './pages/LegalAdminPage.js';

class App {
  constructor() {
    this.isSidebarCollapsed = false;
    this.currentRoute = 'dashboard';
    this.init();
  }

  init() {
    this.bindWindowGlobals();

    authService.initAuth((user) => {
      this.handleRoute();
    });

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('auth:changed', () => {
      this.handleRoute();
    });
    window.addEventListener('request:created', () => this.handleRoute());
    window.addEventListener('request:updated', () => this.handleRoute());
    window.addEventListener('document:created', () => this.handleRoute());
    window.addEventListener('document:updated', () => this.handleRoute());
    window.addEventListener('document:deleted', () => this.handleRoute());
  }

  bindWindowGlobals() {
    // Quick Demo Logins
    window.quickLogin = async (userIdOrEmail) => {
      try {
        let email = userIdOrEmail;
        const targetUser = db.data.users.find(
          u => u.id === userIdOrEmail || u.email.toLowerCase() === userIdOrEmail.toLowerCase()
        );
        if (targetUser) {
          email = targetUser.email;
        }
        const user = await authService.login(email, 'test@123');
        Toast.success(`Signed in as ${user.name} (${user.tagline || user.roleLabel})`);
        window.location.hash = '#/dashboard';
      } catch (e) {
        Toast.error(e.message);
      }
    };

    // Logout confirmation
    window.confirmLogout = () => {
      Modal.open({
        title: '🚪 Confirm Logout',
        contentHtml: `
          <div style="font-size: 14px; color: #334155; padding: 6px 0;">
            Are you sure you want to log out of <strong>Impacteers DMS</strong> (Document Management System)?
          </div>
        `,
        footerHtml: `
          <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
          <button class="btn btn-danger" id="confirm-logout-btn">Logout</button>
        `,
        size: 'sm'
      });

      document.getElementById('confirm-logout-btn').addEventListener('click', () => {
        authService.logout();
        Modal.close();
        Toast.info('Logged out successfully.');
        window.location.hash = '#/login';
      });
    };

    // Filter Document Database by department
    window.filterDatabaseDept = deptId => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.innerHTML = renderDepartmentsPage(deptId);
      }
    };

    // Profile modal
    window.showProfileModal = () => {
      const user = authService.getCurrentUser();
      if (!user) return;
      Modal.open({
        title: '👤 User Profile',
        contentHtml: `
          <div style="font-size: 13.5px; line-height: 1.6;">
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #E2E8F0;">
              <div style="width: 48px; height: 48px; border-radius: 9999px; background: #2563EB; color: #fff; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center;">
                ${user.avatar}
              </div>
              <div>
                <div style="font-size: 16px; font-weight: 700; color: #0F172A;">${user.name}</div>
                <div style="font-size: 12.5px; color: #64748B;">${user.email}</div>
              </div>
            </div>
            <div><strong>Role:</strong> ${user.roleLabel}</div>
            <div style="margin-top: 4px;"><strong>Department:</strong> ${user.departmentName || 'Global Legal'}</div>
            <div style="margin-top: 4px;"><strong>Access Scope:</strong> ${authService.isLegalManager() ? 'Full Legal Access (All Departments)' : authService.isChairman() ? 'Executive View-Only (All Departments)' : `${user.departmentName} Requests & Documents`}</div>
          </div>
        `,
        footerHtml: '<button class="btn btn-secondary" onclick="window.activeModalClose()">Close</button>',
        size: 'sm'
      });
    };

    // Workflow Actions for Monisha
    window.legalAcceptRequest = reqId => {
      try {
        requestService.acceptRequest(reqId);
        Toast.success('Request accepted and moved to Under Legal Review.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    window.legalRejectRequest = reqId => {
      const reason = prompt('Please enter mandatory rejection reason:');
      if (reason && reason.trim()) {
        try {
          requestService.rejectRequest(reqId, reason.trim());
          Toast.info('Request rejected.');
          this.handleRoute();
        } catch (e) {
          Toast.error(e.message);
        }
      }
    };

    window.legalRescheduleRequest = reqId => {
      const req = requestService.getRequestById(reqId);
      if (!req) return;

      Modal.open({
        title: '⏱️ Propose Rescheduled Completion Date',
        contentHtml: `
          <div>
            <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px; margin-bottom: 14px; font-size: 12.5px; color: #1E40AF;">
              <strong>Current Required Date:</strong> ${req.currentDueDate}
            </div>
            <div class="form-group">
              <label class="form-label">New Proposed Completion Date <span class="required">*</span></label>
              <input type="date" id="resched-new-date" class="form-input" value="${req.currentDueDate}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Reason for Rescheduling <span class="required">*</span></label>
              <textarea id="resched-reason" class="form-textarea" placeholder="e.g. Additional regulatory review is required for non-standard indemnity terms..." required></textarea>
            </div>
          </div>
        `,
        footerHtml: `
          <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
          <button class="btn btn-primary" id="confirm-resched-send-btn">Send Reschedule Proposal</button>
        `,
        size: 'md'
      });

      document.getElementById('confirm-resched-send-btn').addEventListener('click', () => {
        const date = document.getElementById('resched-new-date').value;
        const reason = document.getElementById('resched-reason').value;
        if (!date || !reason.trim()) {
          Toast.error('Please provide both new date and reason.');
          return;
        }
        try {
          requestService.rescheduleRequest(reqId, { proposedDate: date, reason });
          Modal.close();
          Toast.info('Reschedule proposal sent to business stakeholder.');
          this.handleRoute();
        } catch (e) {
          Toast.error(e.message);
        }
      });
    };

    // Business Reschedule Responses
    window.businessAcceptReschedule = reqId => {
      try {
        requestService.respondToReschedule(reqId, { action: 'ACCEPT' });
        Toast.success('Proposed completion date accepted! Task is now assigned to Monisha for active review.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    window.businessRejectReschedule = reqId => {
      const req = requestService.getRequestById(reqId);
      if (!req || !req.rescheduleProposal) return;

      Modal.open({
        title: '⏱️ Decline Reschedule & Request Timeline',
        contentHtml: `
          <div>
            <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 12px; margin-bottom: 14px; font-size: 12.5px; color: #92400E;">
              <strong>Legal Proposed Date:</strong> ${req.rescheduleProposal.proposedDate}<br/>
              <strong>Legal Reason:</strong> "${req.rescheduleProposal.reason}"
            </div>
            <div class="form-group">
              <label class="form-label">Your Requested Completion Date <span class="required">*</span></label>
              <input type="date" id="counter-new-date" class="form-input" value="${req.rescheduleProposal.originalDate || req.currentDueDate}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Urgency Justification / Reason <span class="required">*</span></label>
              <textarea id="counter-reason" class="form-textarea" placeholder="e.g. This is a priority case on urgent basis, need to close as soon as possible..." required>This is a priority case on urgent basis, need to close as soon as possible.</textarea>
            </div>
          </div>
        `,
        footerHtml: `
          <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
          <button class="btn btn-primary" id="confirm-counter-send-btn">Submit to Legal Manager</button>
        `,
        size: 'md'
      });

      document.getElementById('confirm-counter-send-btn').addEventListener('click', () => {
        const counterDate = document.getElementById('counter-new-date').value;
        const comment = document.getElementById('counter-reason').value;
        if (!counterDate || !comment.trim()) {
          Toast.error('Please provide both requested date and justification.');
          return;
        }
        try {
          requestService.respondToReschedule(reqId, {
            action: 'DECLINE',
            counterDate,
            comment: comment.trim()
          });
          Modal.close();
          Toast.info('Counter-proposal and notification sent directly to Monisha.');
          this.handleRoute();
        } catch (e) {
          Toast.error(e.message);
        }
      });
    };

    window.legalAcceptBusinessCounterDate = reqId => {
      try {
        requestService.acceptBusinessCounterDate(reqId);
        Toast.success('Accepted business requested completion date. Task assigned and review in progress.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    window.legalSubmitToBusiness = reqId => {
      try {
        requestService.submitToBusiness(reqId);
        Toast.success('Review submitted to business stakeholder for final signing.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    window.legalMarkCompleted = reqId => {
      try {
        requestService.markCompleted(reqId);
        Toast.success('Request completed! Final document stored in department repository.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    // Delete single vault document
    window.deleteVaultDocument = (docId, docTitle) => {
      if (confirm(`Are you sure you want to permanently delete "${docTitle || 'this document'}" from the repository?`)) {
        try {
          documentService.deleteDocument(docId);
          Toast.success('Document deleted successfully.');
          this.handleRoute();
        } catch (err) {
          Toast.error(err.message);
        }
      }
    };

    // Clear / delete all old vault documents
    window.deleteAllVaultDocuments = () => {
      if (confirm('Are you sure you want to delete and clear all old documents from the vault? This cannot be undone.')) {
        try {
          const count = documentService.deleteAllDocuments();
          Toast.success(`Successfully deleted all ${count} vault documents.`);
          this.handleRoute();
        } catch (err) {
          Toast.error(err.message);
        }
      }
    };

    // Global Document File Download
    window.downloadDocumentFile = (fileName, label = 'Impacteers Legal Agreement') => {
      try {
        const safeName = fileName || 'Legal_Document.pdf';
        const cleanLabel = label || 'Impacteers Document';
        const fileContent = `===============================================================
IMPACTEERS DOCUMENT MANAGEMENT SYSTEM (DMS)
===============================================================
Document File   : ${safeName}
Title / Label   : ${cleanLabel}
Downloaded At   : ${new Date().toLocaleString()}
Classification  : CONFIDENTIAL & VERIFIED LEGAL ASSET
Repository Vault: Impacteers Secure Cloud Vault
===============================================================

[VERIFIED LEGAL DOCUMENT ARTIFACT]
1. Standard Terms & Conditions: Active and verified by Legal Counsel.
2. Compliance Standard        : Validated against Impacteers Corporate Policies.
3. Verification Integrity     : SHA-256 Checksum Verified.

---------------------------------------------------------------
This document is a certified copy retrieved from the Impacteers
In-House Legal & Document Management System (DMS).
===============================================================
`;
        const mimeType = safeName.endsWith('.pdf')
          ? 'application/pdf'
          : safeName.endsWith('.docx')
          ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          : 'text/plain';
        const blob = new Blob([fileContent], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = safeName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
        Toast.success(`Downloaded "${safeName}" successfully.`);
      } catch (err) {
        Toast.error('Could not download document: ' + err.message);
      }
    };

    window.downloadDocumentFileById = (reqId, docField) => {
      try {
        const req = requestService.getRequestById(reqId);
        const doc = req[docField];
        if (doc && doc.dataUrl) {
          const a = document.createElement('a');
          a.href = doc.dataUrl;
          a.download = doc.name || 'document';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
          }, 100);
          Toast.success(`Downloaded "${doc.name}" successfully.`);
        } else if (doc) {
          window.downloadDocumentFile(doc.name, req.title);
        } else {
          Toast.error("Document not found.");
        }
      } catch (err) {
        Toast.error("Could not download: " + err.message);
      }
    };

    // Live Instant Search & Filter for Department Documents
    window.filterDepartmentDocs = (deptId) => {
      const searchInput = document.getElementById('dept-doc-search');
      const typeSelect = document.getElementById('dept-doc-filter-type');
      const tbody = document.getElementById('dept-doc-tbody');
      const countEl = document.getElementById('dept-doc-count');

      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      const type = typeSelect ? typeSelect.value.trim().toLowerCase() : '';

      let docs = db.data.documents.filter(d => d.departmentId === deptId || d.departmentId === 'ALL');

      if (query) {
        docs = docs.filter(d =>
          (d.title && d.title.toLowerCase().includes(query)) ||
          (d.fileName && d.fileName.toLowerCase().includes(query)) ||
          (d.documentType && d.documentType.toLowerCase().includes(query)) ||
          (d.category && d.category.toLowerCase().includes(query)) ||
          (d.counterparty && d.counterparty.toLowerCase().includes(query)) ||
          (d.departmentName && d.departmentName.toLowerCase().includes(query))
        );
      }

      if (type) {
        docs = docs.filter(d =>
          (d.documentType && d.documentType.toLowerCase().includes(type)) ||
          (d.category && d.category.toLowerCase().includes(type))
        );
      }

      if (tbody) {
        tbody.innerHTML = renderDepartmentDocRows(docs);
      }
      if (countEl) {
        countEl.innerText = docs.length;
      }
    };

    // Live Instant Search & Filter for Documents Vault
    window.filterVaultDocs = () => {
      const searchInput = document.getElementById('doc-search-input');
      const deptSelect = document.getElementById('doc-dept-filter');
      const typeSelect = document.getElementById('doc-type-filter');
      const tbody = document.getElementById('docs-tbody');
      const countEl = document.getElementById('doc-count');

      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      const dept = deptSelect ? deptSelect.value : '';
      const type = typeSelect ? typeSelect.value.trim().toLowerCase() : '';

      let docs = documentService.getDocuments();

      if (dept) {
        if (dept === 'ALL') {
          docs = docs.filter(d => d.departmentId === 'ALL');
        } else if (dept === 'LEGAL_ONLY') {
          docs = docs.filter(d => d.departmentId === 'LEGAL_ONLY' || d.isPrivilegedOnly);
        } else {
          docs = docs.filter(d => d.departmentId === dept);
        }
      }

      if (type) {
        docs = docs.filter(d =>
          (d.documentType && d.documentType.toLowerCase().includes(type)) ||
          (d.category && d.category.toLowerCase().includes(type))
        );
      }

      if (query) {
        docs = docs.filter(d =>
          (d.title && d.title.toLowerCase().includes(query)) ||
          (d.fileName && d.fileName.toLowerCase().includes(query)) ||
          (d.documentType && d.documentType.toLowerCase().includes(query)) ||
          (d.category && d.category.toLowerCase().includes(query)) ||
          (d.counterparty && d.counterparty.toLowerCase().includes(query)) ||
          (d.departmentName && d.departmentName.toLowerCase().includes(query))
        );
      }

      if (tbody) {
        tbody.innerHTML = renderVaultDocRows(docs);
      }
      if (countEl) {
        countEl.innerText = docs.length;
      }
    };

    // Live Search for Database Documents
    window.filterDatabaseSearch = (selectedDeptId = 'ALL') => {
      const searchInput = document.getElementById('database-doc-search');
      const tbody = document.getElementById('database-doc-tbody');
      const countEl = document.getElementById('database-doc-count');

      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      let docs = documentService.getDocuments();

      if (selectedDeptId && selectedDeptId !== 'ALL') {
        docs = docs.filter(d => d.departmentId === selectedDeptId || (selectedDeptId === 'LEGAL_ONLY' && (d.departmentId === 'LEGAL_ONLY' || d.isPrivilegedOnly)));
      }

      if (query) {
        docs = docs.filter(d =>
          (d.title && d.title.toLowerCase().includes(query)) ||
          (d.fileName && d.fileName.toLowerCase().includes(query)) ||
          (d.documentType && d.documentType.toLowerCase().includes(query)) ||
          (d.category && d.category.toLowerCase().includes(query)) ||
          (d.counterparty && d.counterparty.toLowerCase().includes(query)) ||
          (d.departmentName && d.departmentName.toLowerCase().includes(query))
        );
      }

      if (tbody) {
        tbody.innerHTML = renderDatabaseDocRows(docs);
      }
      if (countEl) {
        countEl.innerText = docs.length;
      }
    };

    // AI suggestions helper
    window.useSuggestedPrompt = text => {
      const input = document.getElementById('ai-chat-input');
      if (input) {
        input.value = text;
        const btn = document.getElementById('ai-send-btn');
        if (btn) btn.click();
      }
    };

    // ==========================================
    // LEGAL ADMIN ACTIONS
    // ==========================================

    window.adminOpenAddUser = () => {
      Modal.open({
        title: '➕ Add New System User',
        contentHtml: renderUserFormModal(),
        footerHtml: `
          <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
          <button class="btn btn-primary" onclick="window.adminSubmitAddUser()">Create User & Send Invite</button>
        `,
        size: 'md'
      });
    };

    window.adminSubmitAddUser = () => {
      const name = document.getElementById('admin-user-name').value;
      const email = document.getElementById('admin-user-email').value;
      const role = document.getElementById('admin-user-role').value;
      const deptId = document.getElementById('admin-user-dept').value;
      const roleLabel = document.getElementById('admin-user-role').options[document.getElementById('admin-user-role').selectedIndex].text;
      
      const deptName = deptId ? document.getElementById('admin-user-dept').options[document.getElementById('admin-user-dept').selectedIndex].text : '';

      const permissions = Array.from(document.querySelectorAll('.admin-perm-cb:checked')).map(cb => cb.value);

      if (!name || !email) {
        Toast.error('Please enter name and email.');
        return;
      }

      try {
        authService.addUser({ name, email, role, roleLabel, departmentId: deptId, departmentName: deptName, permissions });
        Modal.close();
        Toast.success('User created successfully. Access provisioned.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    window.adminEditUser = (userId) => {
      const users = authService.getAllUsers();
      const user = users.find(u => u.id === userId);
      if (!user) return;

      Modal.open({
        title: '✏️ Edit Access Permissions',
        contentHtml: renderUserFormModal(user),
        footerHtml: `
          <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
          <button class="btn btn-primary" onclick="window.adminSubmitEditUser('${userId}')">Save Access Policy</button>
        `,
        size: 'md'
      });
    };

    window.adminSubmitEditUser = (userId) => {
      const name = document.getElementById('admin-user-name').value.trim();
      const email = document.getElementById('admin-user-email').value.trim().toLowerCase();
      const role = document.getElementById('admin-user-role').value;
      const deptId = document.getElementById('admin-user-dept').value;
      const roleLabel = document.getElementById('admin-user-role').options[document.getElementById('admin-user-role').selectedIndex].text;
      const deptName = deptId ? document.getElementById('admin-user-dept').options[document.getElementById('admin-user-dept').selectedIndex].text : '';

      const permissions = Array.from(document.querySelectorAll('.admin-perm-cb:checked')).map(cb => cb.value);

      if (!name || !email) {
        Toast.error('Please enter name and email address.');
        return;
      }

      try {
        authService.updateUser(userId, { name, email, role, roleLabel, departmentId: deptId, departmentName: deptName, permissions });
        Modal.close();
        Toast.success('User and email updated successfully.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    window.adminToggleUserStatus = (userId) => {
      const users = authService.getAllUsers();
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const newStatus = !(user.isActive !== false);
      const actionName = newStatus ? 'Activate' : 'Deactivate';

      if (confirm(`Are you sure you want to ${actionName} ${user.name}'s account?`)) {
        try {
          authService.updateUser(userId, { isActive: newStatus });
          Toast.success(`Account ${newStatus ? 'activated' : 'deactivated'} successfully.`);
          this.handleRoute();
        } catch (e) {
          Toast.error(e.message);
        }
      }
    };

    window.adminResetCredential = (userId) => {
      const users = authService.getAllUsers();
      const user = users.find(u => u.id === userId);
      if (!user) return;
      
      if (confirm(`Are you sure you want to trigger a password reset for ${user.email}?`)) {
        authService.logAudit('RESET_CREDENTIAL', `Triggered credential reset for ${user.email}`, userId);
        Toast.info(`A secure password reset link has been dispatched to ${user.email}.`);
      }
    };
  }

  handleRoute() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const hash = window.location.hash || '#/dashboard';
    let route = hash.replace('#/', '');
    let subParam = null;

    if (route.includes('/')) {
      const parts = route.split('/');
      route = parts[0];
      subParam = parts[1];
    }

    this.currentRoute = route;

    // 1. Check if user is logged in
    if (!authService.isLoggedIn() || route === 'login') {
      appEl.innerHTML = renderLoginPage();
      this.setupLoginEvents();
      return;
    }

    // 2. Render Authenticated App Shell
    appEl.innerHTML = `
      <div id="sidebar-backdrop"></div>
      ${renderSidebar(this.currentRoute, this.isSidebarCollapsed)}
      <div class="main-wrapper ${this.isSidebarCollapsed ? 'collapsed' : ''}" id="main-wrapper">
        ${renderTopbar()}
        <main id="main-content"></main>
      </div>
      ${renderFloatingLegalAssistant()}
    `;

    this.setupShellEvents();

    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // 3. Dispatch to role-based page renderers
    if (route === 'dashboard') {
      if (authService.isLegalManager()) {
        mainContent.innerHTML = renderLegalDashboardPage();
      } else if (authService.isChairman()) {
        mainContent.innerHTML = renderChairmanDashboardPage();
      } else {
        mainContent.innerHTML = renderBusinessDashboardPage();
      }
    } else if (route === 'create-request') {
      mainContent.innerHTML = renderCreateRequestPage();
      this.setupCreateRequestEvents();
    } else if (route === 'my-requests') {
      mainContent.innerHTML = renderLegalRequestsPage({ myRequestsOnly: true });
    } else if (route === 'requests') {
      if (subParam) {
        mainContent.innerHTML = renderRequestDetailPage(subParam);
        this.setupRequestDetailEvents(subParam);
      } else {
        mainContent.innerHTML = renderLegalRequestsPage({ myRequestsOnly: false });
      }
    } else if (route === 'department-docs') {
      mainContent.innerHTML = renderDepartmentDocumentsPage();
    } else if (route === 'documents') {
      if (authService.isChairman()) {
        mainContent.innerHTML = renderDepartmentsPage();
      } else if (authService.isBusinessUser()) {
        mainContent.innerHTML = renderDepartmentDocumentsPage();
      } else {
        mainContent.innerHTML = renderDocumentsPage();
        this.setupDocumentsEvents();
      }
    } else if (route === 'departments') {
      mainContent.innerHTML = renderDepartmentsPage();
    } else if (route === 'calendar') {
      if (authService.isChairman()) {
        mainContent.innerHTML = renderChairmanDashboardPage();
      } else {
        mainContent.innerHTML = renderCalendarPage();
      }
    } else if (route === 'assistant') {
      mainContent.innerHTML = renderLegalAssistantPage();
      this.setupAssistantEvents();
    } else if (route === 'notifications') {
      mainContent.innerHTML = renderNotificationsPage();
    } else if (route === 'audit-logs') {
      mainContent.innerHTML = renderAuditLogsPage();
    } else if (route === 'settings') {
      mainContent.innerHTML = renderAdminSettingsPage();
      this.setupSettingsEvents();
    } else if (route === 'legal-admin') {
      mainContent.innerHTML = renderLegalAdminPage();
    } else if (route === 'about') {
      mainContent.innerHTML = renderAboutPage();
    } else {
      mainContent.innerHTML = authService.isLegalManager()
        ? renderLegalDashboardPage()
        : renderBusinessDashboardPage();
    }

    window.scrollTo(0, 0);
  }

  setupLoginEvents() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabSignIn = document.getElementById('tab-btn-signin');
    const tabSignUp = document.getElementById('tab-btn-signup');
    const switchToSignUpLink = document.getElementById('switch-to-signup-link');
    const switchToSignInLink = document.getElementById('switch-to-signin-link');

    const showSignIn = () => {
      if (loginForm && signupForm && tabSignIn && tabSignUp) {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        tabSignIn.style.background = '#FFFFFF';
        tabSignIn.style.color = '#1E293B';
        tabSignIn.style.fontWeight = '700';
        tabSignIn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

        tabSignUp.style.background = 'transparent';
        tabSignUp.style.color = '#64748B';
        tabSignUp.style.fontWeight = '600';
        tabSignUp.style.boxShadow = 'none';
      }
    };

    const showSignUp = () => {
      if (loginForm && signupForm && tabSignIn && tabSignUp) {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        tabSignUp.style.background = '#FFFFFF';
        tabSignUp.style.color = '#1E293B';
        tabSignUp.style.fontWeight = '700';
        tabSignUp.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

        tabSignIn.style.background = 'transparent';
        tabSignIn.style.color = '#64748B';
        tabSignIn.style.fontWeight = '600';
        tabSignIn.style.boxShadow = 'none';
      }
    };

    if (tabSignIn) tabSignIn.addEventListener('click', showSignIn);
    if (tabSignUp) tabSignUp.addEventListener('click', showSignUp);
    if (switchToSignUpLink) switchToSignUpLink.addEventListener('click', showSignUp);
    if (switchToSignInLink) switchToSignInLink.addEventListener('click', showSignIn);

    // Sign In Submission
    if (loginForm) {
      loginForm.addEventListener('submit', async e => {
        e.preventDefault();
        const submitBtn = document.getElementById('login-submit-btn');
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = 'Signing In...';
        }

        try {
          const user = await authService.login(email, password);
          Toast.success(`Welcome back, ${user.name}!`);
          window.location.hash = '#/dashboard';
        } catch (err) {
          Toast.error(err.message);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Sign In to Workspace';
          }
        }
      });
    }

    // Sign Up Submission
    if (signupForm) {
      signupForm.addEventListener('submit', async e => {
        e.preventDefault();
        const submitBtn = document.getElementById('signup-submit-btn');
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const departmentId = document.getElementById('signup-department').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (!name || !email || !password) {
          Toast.error('Please fill in all required fields.');
          return;
        }

        if (password !== confirmPassword) {
          Toast.error('Passwords do not match. Please verify.');
          return;
        }

        if (password.length < 6) {
          Toast.error('Password must be at least 6 characters.');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = 'Creating Account...';
        }

        try {
          const user = await authService.signup({ name, email, password, departmentId });
          Toast.success(`Account created! Welcome to Impacteers DMS, ${user.name}!`);
          window.location.hash = '#/dashboard';
        } catch (err) {
          Toast.error(err.message);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Create Workspace Account';
          }
        }
      });
    }
  }

  setupShellEvents() {
    // Sidebar toggle
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        this.handleRoute();
      });
    }

    // Mobile sidebar toggle & backdrop
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const backdrop = document.getElementById('sidebar-backdrop');

    const closeMobileSidebar = () => {
      document.body.classList.remove('mobile-sidebar-open');
    };

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', e => {
        e.stopPropagation();
        document.body.classList.toggle('mobile-sidebar-open');
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMobileSidebar);
    }

    // Close mobile sidebar on route link navigation
    const navLinks = document.querySelectorAll('#app-sidebar a.nav-item');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          closeMobileSidebar();
        }
      });
    });

    // Topbar profile dropdown
    const userBtn = document.getElementById('topbar-user-btn');
    const dropdown = document.getElementById('topbar-user-dropdown');
    if (userBtn && dropdown) {
      userBtn.addEventListener('click', e => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      });
      document.addEventListener('click', () => {
        if (dropdown) dropdown.style.display = 'none';
      });
    }
  }

  setupCreateRequestEvents() {
    const form = document.getElementById('simple-create-request-form');
    if (form) {
      // Dynamic priority selection logic
      const priorityRadios = form.querySelectorAll('input[name="req-priority"]');
      const updatePriorityHighlight = () => {
        priorityRadios.forEach(radio => {
          const label = radio.closest('label');
          if (radio.checked) {
            label.style.border = '2px solid #2563EB';
            label.style.background = '#EFF6FF';
          } else {
            // Restore normal appearances
            if (radio.value === 'IMMEDIATE') {
              label.style.border = '1px solid #FECDD3';
              label.style.background = '#FFF1F2';
            } else if (radio.value === 'HIGH') {
              label.style.border = '1px solid #FED7AA';
              label.style.background = '#FFF7ED';
            } else if (radio.value === 'MEDIUM') {
              label.style.border = '1px solid #BFDBFE';
              label.style.background = '#F0F9FF';
            } else if (radio.value === 'LOW') {
              label.style.border = '1px solid #E2E8F0';
              label.style.background = '#F8FAFC';
            }
          }
        });
      };
      priorityRadios.forEach(radio => radio.addEventListener('change', updatePriorityHighlight));
      updatePriorityHighlight(); // Initialize

      form.addEventListener('submit', e => {
        e.preventDefault();
        const type = document.getElementById('req-type-select').value;
        const title = document.getElementById('req-title-input').value;
        const date = document.getElementById('req-date-input').value;
        const desc = document.getElementById('req-desc-input').value;
        const comment = document.getElementById('req-comment-input').value;
        const fileInput = document.getElementById('req-doc-file');

        let attachedDoc = null;

        const processSubmission = () => {
          const priorityEl = form.querySelector('input[name="req-priority"]:checked');
          const priority = priorityEl ? priorityEl.value : 'MEDIUM';

          try {
            const req = requestService.createRequest({
              title,
              requestType: type,
              priority,
              requiredByDate: date,
              description: desc,
              attachedDocument: attachedDoc,
              comment
            });

            Toast.success(`Request ${req.requestId} submitted successfully to Monisha!`);
            window.location.hash = `#/requests/${req.id}`;
          } catch (err) {
            Toast.error(err.message);
          }
        };

        if (fileInput && fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = (ev) => {
            attachedDoc = {
              name: file.name || 'document',
              size: `${Math.round((file.size || 0) / 1024)} KB`,
              uploadedAt: new Date().toISOString(),
              dataUrl: ev.target.result.length > 900000 ? ev.target.result.substring(0, 900000) : ev.target.result,
              mimeType: file.type || 'application/octet-stream'
            };
            // Ensure no undefined values which cause Firestore errors
            attachedDoc = JSON.parse(JSON.stringify(attachedDoc));
            processSubmission();
          };
          reader.readAsDataURL(file);
        } else {
          processSubmission();
        }
      });
    }
  }

  setupRequestDetailEvents(requestId) {
    // Add Remark Button (Monisha)
    const addRemarkBtn = document.getElementById('btn-add-legal-remark');
    if (addRemarkBtn) {
      addRemarkBtn.addEventListener('click', () => {
        const text = prompt('Enter Legal Review Remark (e.g. Clause 5 — Payment terms should be revised):');
        if (text && text.trim()) {
          try {
            requestService.addRemark(requestId, text.trim());
            Toast.success('Legal remark added.');
            this.handleRoute();
          } catch (e) {
            Toast.error(e.message);
          }
        }
      });
    }

    // File Download Simulator
    window.downloadDocumentFile = (fileName, label = 'Impacteers Legal Agreement') => {
      try {
        const fileContent = `=== IMPACTEERS LEGAL OS ===\nDocument: ${fileName}\nCategory: ${label}\nTimestamp: ${new Date().toISOString()}\n\n[VERIFIED LEGAL DOCUMENT ARTIFACT - IMPACTEERS DOCUMENT MANAGEMENT SYSTEM]\nThis document is verified and stored in the secure legal vault.`;
        const blob = new Blob([fileContent], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'Legal_Document.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        Toast.success(`Downloaded ${fileName}`);
      } catch (err) {
        Toast.error('Could not initiate download: ' + err.message);
      }
    };

    // Upload Reviewed / Revised Doc (Monisha)
    const uploadReviewedBtn = document.getElementById('btn-upload-reviewed-doc');
    if (uploadReviewedBtn) {
      uploadReviewedBtn.addEventListener('click', () => {
        const req = requestService.getRequestById(requestId);
        const defaultName = req.attachedDocument
          ? req.attachedDocument.name.replace(/(\.[^.]+)$/, '_Legal_Reviewed$1')
          : `${req.title.replace(/\s+/g, '_')}_Legal_Reviewed.docx`;

        Modal.open({
          title: '📝 Upload Reviewed / Revised Document',
          contentHtml: `
            <div>
              <!-- File Picker -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  1. Select Reviewed Document from Computer <span class="required">*</span>
                </label>
                <div style="border: 2px dashed #CBD5E1; border-radius: 8px; padding: 18px; text-align: center; background: #F8FAFC; cursor: pointer;" onclick="document.getElementById('modal-rev-file-input').click()">
                  <span style="font-size: 26px;">📄</span>
                  <div style="font-size: 13px; font-weight: 600; color: #1E293B; margin-top: 4px;">Click to browse and choose file</div>
                  <div style="font-size: 11.5px; color: #64748B;">Supported: PDF, DOCX, DOC, XLSX, TXT</div>
                  <input type="file" id="modal-rev-file-input" style="display: none;" onchange="
                    if (this.files[0]) {
                      document.getElementById('modal-rev-file-preview').innerText = 'Selected: ' + this.files[0].name + ' (' + Math.round(this.files[0].size/1024) + ' KB)';
                      document.getElementById('modal-rev-file-preview').style.display = 'block';
                    }
                  " />
                  <div id="modal-rev-file-preview" style="display: none; font-size: 12.5px; color: #2563EB; font-weight: 600; margin-top: 8px;"></div>
                </div>
              </div>

              <!-- Legal Remarks -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  2. Legal Remarks / Revision Notes <span class="required">*</span>
                </label>
                <textarea id="modal-rev-remark-input" class="form-textarea" placeholder="e.g. Clause 5 payment terms updated to Net 30 days. Liability cap limited to 2x contract value..." style="min-height: 80px;" required>Clause 5 payment terms verified and revised. Liability cap limited to standard terms.</textarea>
              </div>

              <!-- Note to Stakeholder -->
              <div class="form-group" style="margin-bottom: 8px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  3. Note to Business Stakeholder <span style="font-size: 11px; color: #64748B; font-weight: 400;">(Optional)</span>
                </label>
                <input type="text" id="modal-rev-comment-input" class="form-input" placeholder="e.g. Reviewed copy attached. Please execute with client..." value="Reviewed copy attached. Please proceed with client execution and upload final signed agreement." />
              </div>
            </div>
          `,
          footerHtml: `
            <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
            <button class="btn btn-primary" id="confirm-upload-rev-btn">Upload & Submit to Business</button>
          `,
          size: 'md'
        });

        document.getElementById('confirm-upload-rev-btn').addEventListener('click', () => {
          const fileInput = document.getElementById('modal-rev-file-input');
          const remarkText = document.getElementById('modal-rev-remark-input').value;
          const commentText = document.getElementById('modal-rev-comment-input').value;

          if (!remarkText.trim()) {
            Toast.error('Please enter legal review remarks.');
            return;
          }

          let fileName = defaultName;
          let fileSize = '2.4 MB';

          const processUpload = (dataUrl = null, mimeType = null) => {
            try {
              requestService.uploadReviewedDocument(requestId, {
                name: fileName,
                size: fileSize,
                remarkText: remarkText.trim(),
                commentText: commentText.trim(),
                dataUrl,
                mimeType
              });
              Modal.close();
              Toast.success('Reviewed document & remarks submitted to stakeholder!');
              this.handleRoute();
            } catch (e) {
              Toast.error(e.message);
            }
          };

          if (fileInput && fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            fileName = file.name;
            fileSize = `${Math.round(file.size / 1024)} KB`;
            const reader = new FileReader();
            reader.onload = (ev) => processUpload(ev.target.result.length > 900000 ? ev.target.result.substring(0, 900000) : ev.target.result, file.type);
            reader.readAsDataURL(file);
          } else {
            processUpload();
          }
        });
      });
    }

    // Upload Final Signed Document (Business or Legal)
    const uploadFinalBtn = document.getElementById('btn-upload-final-signed-doc');
    if (uploadFinalBtn) {
      uploadFinalBtn.addEventListener('click', () => {
        const req = requestService.getRequestById(requestId);
        const defaultName = req.attachedDocument
          ? req.attachedDocument.name.replace(/(\.[^.]+)$/, '_Final_Executed$1')
          : `${req.title.replace(/\s+/g, '_')}_Final_Executed.pdf`;

        Modal.open({
          title: '✍️ Upload Final Executed / Signed Document',
          contentHtml: `
            <div>
              <!-- File Picker -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  1. Select Final Signed PDF from Computer <span class="required">*</span>
                </label>
                <div style="border: 2px dashed #CBD5E1; border-radius: 8px; padding: 18px; text-align: center; background: #F8FAFC; cursor: pointer;" onclick="document.getElementById('modal-final-file-input').click()">
                  <span style="font-size: 26px;">✍️</span>
                  <div style="font-size: 13px; font-weight: 600; color: #1E293B; margin-top: 4px;">Click to browse and choose signed document</div>
                  <div style="font-size: 11.5px; color: #64748B;">Supported: PDF, DOCX, DOC (Executed & Signed)</div>
                  <input type="file" id="modal-final-file-input" style="display: none;" onchange="
                    if (this.files[0]) {
                      document.getElementById('modal-final-file-preview').innerText = 'Selected: ' + this.files[0].name + ' (' + Math.round(this.files[0].size/1024) + ' KB)';
                      document.getElementById('modal-final-file-preview').style.display = 'block';
                    }
                  " />
                  <div id="modal-final-file-preview" style="display: none; font-size: 12.5px; color: #059669; font-weight: 600; margin-top: 8px;"></div>
                </div>
              </div>

              <!-- Execution Comment -->
              <div class="form-group" style="margin-bottom: 8px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  2. Execution / Signature Comments <span style="font-size: 11px; color: #64748B; font-weight: 400;">(Optional)</span>
                </label>
                <textarea id="modal-final-comment-input" class="form-textarea" placeholder="e.g. Executed and signed by both parties on 27 Aug 2026..." style="min-height: 70px;">Executed copy signed by client and company authorized signatory.</textarea>
              </div>
            </div>
          `,
          footerHtml: `
            <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
            <button class="btn btn-primary" id="confirm-upload-final-btn">Upload Final Document</button>
          `,
          size: 'md'
        });

        document.getElementById('confirm-upload-final-btn').addEventListener('click', () => {
          const fileInput = document.getElementById('modal-final-file-input');
          const commentText = document.getElementById('modal-final-comment-input').value;

          let fileName = defaultName;
          let fileSize = '3.2 MB';

          const processUpload = (dataUrl = null, mimeType = null) => {
            try {
              requestService.uploadFinalSignedDocument(requestId, {
                name: fileName,
                size: fileSize,
                commentText: commentText.trim(),
                dataUrl,
                mimeType
              });
              Modal.close();
              Toast.success('Final signed document uploaded! Ready for completion.');
              this.handleRoute();
            } catch (e) {
              Toast.error(e.message);
            }
          };

          if (fileInput && fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            fileName = file.name;
            fileSize = `${Math.round(file.size / 1024)} KB`;
            const reader = new FileReader();
            reader.onload = (ev) => processUpload(ev.target.result.length > 900000 ? ev.target.result.substring(0, 900000) : ev.target.result, file.type);
            reader.readAsDataURL(file);
          } else {
            Toast.error('Please select a final signed document before uploading!');
            return;
          }
        });
      });
    }

    // Send Comment
    const commentBtn = document.getElementById('btn-submit-ticket-comment');
    if (commentBtn) {
      commentBtn.addEventListener('click', () => {
        const textInput = document.getElementById('ticket-comment-text');
        const internalCheck = document.getElementById('comment-is-internal-checkbox');
        if (!textInput || !textInput.value.trim()) return;

        try {
          requestService.addComment(
            requestId,
            textInput.value.trim(),
            internalCheck ? internalCheck.checked : false
          );
          Toast.success('Comment posted.');
          this.handleRoute();
        } catch (e) {
          Toast.error(e.message);
        }
      });
    }
  }

  setupDocumentsEvents() {
    const addDocBtn = document.getElementById('btn-vault-add-doc');
    if (addDocBtn) {
      addDocBtn.addEventListener('click', () => {
        Modal.open({
          title: '📁 Add Document to Central Vault',
          contentHtml: `
            <div>
              <!-- 1. Document Title -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  1. Document Title <span class="required">*</span>
                </label>
                <input type="text" id="vault-doc-title" class="form-input" placeholder="e.g. Staffing Framework Master Services Agreement" required />
              </div>

              <!-- 2. Document Type -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  2. Document Category / Type <span class="required">*</span>
                </label>
                <select id="vault-doc-type" class="form-select" required>
                  <option value="Master Services Agreement">Master Services Agreement (MSA)</option>
                  <option value="Vendor Agreement">Vendor Agreement</option>
                  <option value="MOU">MOU / Memorandum of Understanding</option>
                  <option value="NDA">NDA / Non-Disclosure Agreement</option>
                  <option value="Corporate Policy">Corporate Policy</option>
                  <option value="Software License">Software License</option>
                  <option value="Employment Contract">Employment Contract</option>
                </select>
              </div>

              <!-- 3. Sharing / Access Permission -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  3. Share With Department / Scope <span class="required">*</span>
                </label>
                <select id="vault-doc-scope" class="form-select" onchange="
                  const deptPicker = document.getElementById('vault-dept-picker-container');
                  if (deptPicker) {
                    deptPicker.style.display = this.value === 'SPECIFIC_DEPT' ? 'block' : 'none';
                  }
                " required>
                  <option value="SPECIFIC_DEPT">🏢 Specific Department (e.g. Staffing, Finance, HR...)</option>
                  <option value="ALL_DEPTS">🌐 All Departments (Company-Wide Access)</option>
                  <option value="LEGAL_ONLY">🔒 Only Legal Manager & Chairman (Confidential Legal Vault)</option>
                </select>
              </div>

              <!-- Specific Dept Picker -->
              <div class="form-group" id="vault-dept-picker-container" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  Select Target Department <span class="required">*</span>
                </label>
                <select id="vault-target-dept" class="form-select" multiple size="4">
                  <option value="dept-staffing">Staffing</option>
                  <option value="dept-finance">Finance</option>
                  <option value="dept-hr">HR</option>
                  <option value="dept-it">IT</option>
                  <option value="dept-engineering">Engineering</option>
                  <option value="dept-product">Product</option>
                  <option value="dept-courses">Courses</option>
                  <option value="dept-campus">Campus</option>
                  <option value="dept-institutions">Institutions</option>
                  <option value="dept-marketing">Marketing</option>
                </select>
              </div>

              <!-- 4. File Picker -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  4. Select Document File from Computer <span class="required">*</span>
                </label>
                <div style="border: 2px dashed #CBD5E1; border-radius: 8px; padding: 18px; text-align: center; background: #F8FAFC; cursor: pointer;" onclick="document.getElementById('vault-file-input').click()">
                  <span style="font-size: 26px;">📄</span>
                  <div style="font-size: 13px; font-weight: 600; color: #1E293B; margin-top: 4px;">Click to browse and choose file</div>
                  <div style="font-size: 11.5px; color: #64748B;">Supported: PDF, DOCX, DOC, XLSX, TXT</div>
                  <input type="file" id="vault-file-input" style="display: none;" onchange="
                    if (this.files[0]) {
                      document.getElementById('vault-file-preview').innerText = 'Selected: ' + this.files[0].name + ' (' + Math.round(this.files[0].size/1024) + ' KB)';
                      document.getElementById('vault-file-preview').style.display = 'block';
                    }
                  " />
                  <div id="vault-file-preview" style="display: none; font-size: 12.5px; color: #2563EB; font-weight: 600; margin-top: 8px;"></div>
                </div>
              </div>

              <!-- 5. Effective Date -->
              <div class="form-group" style="margin-bottom: 8px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  5. Effective Date <span style="font-size: 11px; color: #64748B;">(Optional)</span>
                </label>
                <input type="date" id="vault-effective-date" class="form-input" value="${new Date().toISOString().split('T')[0]}" />
              </div>
            </div>
          `,
          footerHtml: `
            <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
            <button class="btn btn-primary" id="confirm-vault-save-btn">Save Document to Vault</button>
          `,
          size: 'md'
        });

        document.getElementById('confirm-vault-save-btn').addEventListener('click', () => {
          const title = document.getElementById('vault-doc-title').value;
          const type = document.getElementById('vault-doc-type').value;
          const scope = document.getElementById('vault-doc-scope').value;
          const targetDeptSelect = document.getElementById('vault-target-dept');
          const targetDept = Array.from(targetDeptSelect.selectedOptions).map(opt => opt.value);
          const effDate = document.getElementById('vault-effective-date').value;
          const fileInput = document.getElementById('vault-file-input');

          if (!title.trim()) {
            Toast.error('Please enter a document title.');
            return;
          }

          let fileName = `${title.trim().replace(/\s+/g, '_')}.pdf`;
          let fileSize = '2.4 MB';

          if (fileInput && fileInput.files && fileInput.files[0]) {
            fileName = fileInput.files[0].name;
            fileSize = `${Math.round(fileInput.files[0].size / 1024)} KB`;
          }

          try {
            documentService.addVaultDocument({
              title: title.trim(),
              documentType: type,
              fileName,
              fileSize,
              sharingTarget: scope,
              targetDepartmentId: targetDept,
              effectiveDate: effDate,
              status: 'Executed'
            });
            Modal.close();
            Toast.success(`"${title}" added to vault and synced to repository!`);
            this.handleRoute();
          } catch (e) {
            Toast.error(e.message);
          }
        });
      });
    }
  }

  setupAssistantEvents() {
    const sendBtn = document.getElementById('ai-send-btn');
    const input = document.getElementById('ai-chat-input');
    const container = document.getElementById('ai-messages-container');
    const docSelect = document.getElementById('ai-document-context-select');
    const clearBtn = document.getElementById('ai-clear-chat-btn');

    let pageConversationHistory = [];

    // Helper for formatting markdown
    const formatMd = text => {
      if (!text) return '';
      return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/^#### (.*$)/gim, '<div style="font-size: 13px; font-weight: 700; color: #1E293B; margin: 6px 0 2px 0;">$1</div>')
        .replace(/^### (.*$)/gim, '<div style="font-size: 14px; font-weight: 800; color: #0F172A; margin: 8px 0 4px 0;">$1</div>')
        .replace(/^## (.*$)/gim, '<div style="font-size: 15px; font-weight: 800; color: #0F172A; margin: 10px 0 6px 0;">$1</div>')
        .replace(/^# (.*$)/gim, '<div style="font-size: 16px; font-weight: 800; color: #0F172A; margin: 12px 0 6px 0;">$1</div>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code style="background: #F1F5F9; padding: 1px 5px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #1E293B;">$1</code>')
        .replace(/^\s*-\s+(.*$)/gim, '<li style="margin-left: 18px; margin-bottom: 4px;">$1</li>')
        .replace(/^\s*\*\s+(.*$)/gim, '<li style="margin-left: 18px; margin-bottom: 4px;">$1</li>')
        .replace(/&gt; (.*$)/gim, '<blockquote style="border-left: 3px solid #3B82F6; background: #EFF6FF; padding: 6px 12px; border-radius: 4px; margin: 6px 0; font-size: 12.5px; color: #1E40AF;">$1</blockquote>')
        .replace(/\n\n/g, '<div style="height: 8px;"></div>')
        .replace(/\n/g, '<br/>');
    };

    // Suggested prompt click handler
    window.usePageSuggestedPrompt = text => {
      if (input) {
        input.value = text;
        handleSend();
      }
    };

    // Clear chat handler
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        pageConversationHistory = [];
        container.innerHTML = `
          <div style="display: flex; gap: 14px; max-width: 85%;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">🤖</div>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px;">
              <div style="font-weight: 600; font-size: 13px; color: #0F172A; margin-bottom: 6px;">Impacteers AI Legal Counsel</div>
              <div style="font-size: 13.5px; color: #334155; line-height: 1.6;">
                Chat history cleared. How can I assist with your document review or corporate legal clauses today?
              </div>
            </div>
          </div>
        `;
        Toast.info('Chat history cleared.');
      });
    }

    const handleSend = async () => {
      const q = input.value.trim();
      if (!q) return;

      input.value = '';
      const selectedDocId = docSelect ? docSelect.value : null;

      // Render user question
      const userMsg = document.createElement('div');
      userMsg.style.cssText = 'display: flex; justify-content: flex-end;';
      userMsg.innerHTML = `
        <div style="background: #2563EB; color: #fff; padding: 12px 18px; border-radius: 14px; font-size: 13.5px; max-width: 80%; line-height: 1.5; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
          ${q.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </div>
      `;
      container.appendChild(userMsg);
      container.scrollTop = container.scrollHeight;

      // Render typing indicator
      const typingMsg = document.createElement('div');
      typingMsg.id = 'page-typing-indicator';
      typingMsg.style.cssText = 'display: flex; gap: 14px; max-width: 85%;';
      typingMsg.innerHTML = `
        <div style="width: 36px; height: 36px; border-radius: 8px; background: #EFF6FF; color: #2563EB; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">⏳</div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; font-size: 13px; color: #64748B; display: flex; align-items: center; gap: 8px;">
          <span>Analyzing legal knowledge base & policies</span>
          <span class="typing-dots">...</span>
        </div>
      `;
      container.appendChild(typingMsg);
      container.scrollTop = container.scrollHeight;

      try {
        const result = await legalAssistantService.askQuestion({
          question: q,
          documentId: selectedDocId,
          conversationHistory: pageConversationHistory
        });

        typingMsg.remove();
        pageConversationHistory.push({ role: 'user', content: q });
        pageConversationHistory.push({ role: 'assistant', content: result.text });

        const aiMsg = document.createElement('div');
        aiMsg.style.cssText = 'display: flex; gap: 14px; max-width: 85%;';
        aiMsg.innerHTML = `
          <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">🤖</div>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; font-size: 13.5px; color: #1E293B; line-height: 1.6; flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-weight: 700; font-size: 13px; color: #0F172A;">Impacteers AI Legal Counsel</span>
              <span style="font-size: 10px; background: #ECFDF5; color: #047857; padding: 1.5px 6px; border-radius: 4px; font-weight: 700;">
                ${result.model}
              </span>
            </div>
            <div>${formatMd(result.text)}</div>
            ${result.citations && result.citations.length > 0 ? `
              <div style="font-size: 11px; color: #64748B; margin-top: 10px; border-top: 1px dashed #CBD5E1; padding-top: 6px;">
                <strong>Grounded Sources:</strong> ${result.citations.join(', ')}
              </div>
            ` : ''}
          </div>
        `;
        container.appendChild(aiMsg);
      } catch (err) {
        typingMsg.remove();
        const errEl = document.createElement('div');
        errEl.style.cssText = 'display: flex; gap: 14px; max-width: 85%;';
        errEl.innerHTML = `
          <div style="width: 36px; height: 36px; border-radius: 8px; background: #FEE2E2; color: #DC2626; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">⚠️</div>
          <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 12px; padding: 14px; font-size: 13px; color: #BE123C; flex: 1;">
            <strong>Error:</strong> ${err.message}
          </div>
        `;
        container.appendChild(errEl);
      }

      container.scrollTop = container.scrollHeight;
    };

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleSend();
      });
    }
  }

  setupSettingsEvents() {
    const resetBtn = document.getElementById('reset-database-btn');

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset the enterprise database to its original state?')) {
          db.reset();
          Toast.success('Database has been reset.');
          this.handleRoute();
        }
      });
    }
  }
}

// Initialize Application immediately with restored session, then hydrate live data
const initApp = async () => {
  window.impacteersApp = new App();
  await db.fetchFromFirestore();
  if (window.impacteersApp) {
    window.impacteersApp.handleRoute();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
