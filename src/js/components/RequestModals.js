/**
 * Enterprise In-House Legal Management System
 * Legal Request Lifecycle Modals (Create, Accept, Reject, Reschedule, Execute)
 */

import { Modal } from './Modal.js';
import { Toast } from './Toast.js';
import { db } from '../db.js';
import { authService } from '../services/authService.js';
import { requestService } from '../services/requestService.js';
import { contractService } from '../services/contractService.js';
import { documentService } from '../services/documentService.js';
import { DEFAULT_REQUEST_TYPES, REQUEST_PRIORITIES, DEPARTMENTS } from '../constants.js';

export function openCreateRequestModal() {
  const user = authService.getCurrentUser();
  const availableDepts = authService.isLegalTeam()
    ? db.data.departments
    : db.data.departments.filter(d => d.id === user.departmentId || !user.departmentId);

  const defaultDeptId = user.departmentId || db.data.departments[0].id;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 5);
  const defaultDueDate = tomorrow.toISOString().split('T')[0];

  const html = `
    <form id="create-request-form">
      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Request Type <span class="required">*</span></label>
          <select id="req-type" class="form-select" required>
            ${DEFAULT_REQUEST_TYPES.map(t => `<option value="${t}">${t}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Department <span class="required">*</span></label>
          <select id="req-department" class="form-select" required>
            ${availableDepts.map(d => `<option value="${d.id}" ${d.id === defaultDeptId ? 'selected' : ''}>${d.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Request Title <span class="required">*</span></label>
        <input type="text" id="req-title" class="form-input" placeholder="e.g. Master Services Agreement Legal Review - Vendor X" required />
      </div>

      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Priority <span class="required">*</span></label>
          <select id="req-priority" class="form-select" required>
            <option value="LOW">Low</option>
            <option value="MEDIUM" selected>Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Required By Date <span class="required">*</span></label>
          <input type="date" id="req-due-date" class="form-input" value="${defaultDueDate}" required />
          <div class="form-hint">Original requested target date for Legal Team review</div>
        </div>
      </div>

      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Counterparty / Vendor Name</label>
          <input type="text" id="req-counterparty" class="form-input" placeholder="e.g. Acme Corp, TalentBridge Inc." />
        </div>
        <div class="form-group">
          <label class="form-label">Contract Value ($ USD)</label>
          <input type="number" id="req-value" class="form-input" placeholder="0" min="0" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Description & Background Context <span class="required">*</span></label>
        <textarea id="req-desc" class="form-textarea" placeholder="Detail commercial objectives, non-standard clauses, timeline constraints, or specific areas requiring legal attention..." required></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Initial Document Attachment</label>
        <div style="
          border: 2px dashed #CBD5E1;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          background: #F8FAFC;
          cursor: pointer;
        " onclick="document.getElementById('req-file-input').click()">
          <span style="font-size: 24px;">📄</span>
          <div style="font-size: 13px; font-weight: 600; color: #1E293B; margin-top: 4px;">Click to select document or draft file</div>
          <div style="font-size: 11px; color: #64748B;">Supported formats: PDF, DOCX, DOC, XLSX, TXT (Up to 25MB)</div>
          <input type="file" id="req-file-input" style="display: none;" onchange="
            const nameSpan = document.getElementById('selected-file-name');
            if (this.files[0]) {
              nameSpan.innerText = 'Selected: ' + this.files[0].name + ' (' + Math.round(this.files[0].size / 1024) + ' KB)';
              nameSpan.style.display = 'block';
            }
          " />
          <div id="selected-file-name" style="display: none; font-size: 12px; color: #2563EB; font-weight: 600; margin-top: 8px;"></div>
        </div>
      </div>
    </form>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
    <button class="btn btn-primary" id="submit-create-req-btn">Submit Legal Request</button>
  `;

  const modal = Modal.open({
    title: '➕ Submit New Legal Request',
    contentHtml: html,
    footerHtml: footer,
    size: 'lg'
  });

  window.activeModalClose = modal.close;

  document.getElementById('submit-create-req-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.getElementById('create-request-form');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const title = document.getElementById('req-title').value;
    const requestType = document.getElementById('req-type').value;
    const departmentId = document.getElementById('req-department').value;
    const priority = document.getElementById('req-priority').value;
    const requiredByDate = document.getElementById('req-due-date').value;
    const counterparty = document.getElementById('req-counterparty').value;
    const contractValue = document.getElementById('req-value').value;
    const description = document.getElementById('req-desc').value;
    const fileInput = document.getElementById('req-file-input');

    let initialDoc = null;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      initialDoc = {
        name: file.name,
        fileName: file.name,
        fileType: file.type || 'application/pdf',
        fileSize: file.size
      };
    }

    try {
      const created = requestService.createRequest({
        title,
        requestType,
        departmentId,
        priority,
        requiredByDate,
        description,
        counterparty,
        contractValue,
        initialDocument: initialDoc
      });

      modal.close();
      Toast.success(`Request ${created.requestId} submitted successfully!`);
      window.location.hash = `#/requests/${created.id}`;
    } catch (err) {
      Toast.error(err.message);
    }
  });
}

export function openAcceptModal(requestId) {
  const req = requestService.getRequestById(requestId);
  if (!req) return;

  const legalUsers = db.data.users.filter(
    u => u.role === 'SUPER_ADMIN' || u.role === 'LEGAL_ADMIN' || u.role === 'LEGAL_MEMBER'
  );

  const html = `
    <div>
      <div style="font-size: 13.5px; color: #475569; margin-bottom: 16px;">
        Accept request <strong>${req.requestId}</strong> ("${req.title}") into the active Legal review pipeline.
      </div>
      <div class="form-group">
        <label class="form-label">Assign Legal Counsel <span class="required">*</span></label>
        <select id="accept-counsel" class="form-select">
          ${legalUsers.map(u => `<option value="${u.id}" ${u.id === authService.getCurrentUser().id ? 'selected' : ''}>${u.name} (${u.title})</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Expected Completion Date <span class="required">*</span></label>
        <input type="date" id="accept-due-date" class="form-input" value="${req.currentDueDate}" required />
      </div>
      <div class="form-group">
        <label class="form-label">Initial Legal Remark / Acceptance Note</label>
        <textarea id="accept-comment" class="form-textarea" placeholder="Provide initial instructions, turnaround estimate, or scope confirmation..."></textarea>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
    <button class="btn btn-primary" id="confirm-accept-btn">Confirm Acceptance</button>
  `;

  const modal = Modal.open({
    title: '✓ Accept Legal Request',
    contentHtml: html,
    footerHtml: footer,
    size: 'md'
  });

  window.activeModalClose = modal.close;

  document.getElementById('confirm-accept-btn').addEventListener('click', () => {
    const assignedId = document.getElementById('accept-counsel').value;
    const dueDate = document.getElementById('accept-due-date').value;
    const comment = document.getElementById('accept-comment').value;

    try {
      requestService.acceptRequest(requestId, {
        expectedDueDate: dueDate,
        assignedLegalId: assignedId,
        comment
      });
      modal.close();
      Toast.success(`Request ${req.requestId} accepted!`);
      window.dispatchEvent(new CustomEvent('request:reloaded'));
    } catch (err) {
      Toast.error(err.message);
    }
  });
}

export function openRejectModal(requestId) {
  const req = requestService.getRequestById(requestId);
  if (!req) return;

  const html = `
    <div>
      <div style="font-size: 13.5px; color: #DC2626; margin-bottom: 14px; font-weight: 500;">
        ⚠️ Rejecting this request will halt the review process and notify the business requestor (${req.requestorName}).
      </div>
      <div class="form-group">
        <label class="form-label">Mandatory Rejection Reason <span class="required">*</span></label>
        <textarea id="reject-reason" class="form-textarea" placeholder="Explain why this request is being rejected (e.g. Insufficient documentation, wrong department, outside corporate policy scope)..." required></textarea>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
    <button class="btn btn-danger" id="confirm-reject-btn">Reject Request</button>
  `;

  const modal = Modal.open({
    title: '✕ Reject Legal Request',
    contentHtml: html,
    footerHtml: footer,
    size: 'md'
  });

  window.activeModalClose = modal.close;

  document.getElementById('confirm-reject-btn').addEventListener('click', () => {
    const reason = document.getElementById('reject-reason').value;
    if (!reason || !reason.trim()) {
      Toast.error('Please provide a mandatory rejection reason.');
      return;
    }

    try {
      requestService.rejectRequest(requestId, { rejectionReason: reason });
      modal.close();
      Toast.info(`Request ${req.requestId} rejected.`);
      window.dispatchEvent(new CustomEvent('request:reloaded'));
    } catch (err) {
      Toast.error(err.message);
    }
  });
}

export function openRescheduleModal(requestId) {
  const req = requestService.getRequestById(requestId);
  if (!req) return;

  const html = `
    <div>
      <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 12.5px; color: #1E40AF;">
        <strong>Original Requested Date:</strong> ${req.originalRequestedDate}<br/>
        <strong>Current Target Date:</strong> ${req.currentDueDate}
        <div style="font-size: 11px; margin-top: 4px; color: #60A5FA;">Note: The system preserves original requested timelines and all reschedule history logs.</div>
      </div>

      <div class="form-group">
        <label class="form-label">New Expected Completion Date <span class="required">*</span></label>
        <input type="date" id="resched-due-date" class="form-input" value="${req.currentDueDate}" required />
      </div>

      <div class="form-group">
        <label class="form-label">Mandatory Reschedule Reason <span class="required">*</span></label>
        <textarea id="resched-reason" class="form-textarea" placeholder="e.g. Additional regulatory review required for cross-border data transfer addenda..." required></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Additional Instructions / Remarks</label>
        <input type="text" id="resched-comment" class="form-input" placeholder="Optional notes for the business team..." />
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
    <button class="btn btn-primary" id="confirm-resched-btn">Confirm Reschedule</button>
  `;

  const modal = Modal.open({
    title: '⏱️ Reschedule Request Timeline',
    contentHtml: html,
    footerHtml: footer,
    size: 'md'
  });

  window.activeModalClose = modal.close;

  document.getElementById('confirm-resched-btn').addEventListener('click', () => {
    const newDate = document.getElementById('resched-due-date').value;
    const reason = document.getElementById('resched-reason').value;
    const comment = document.getElementById('resched-comment').value;

    if (!newDate || !reason.trim()) {
      Toast.error('Please enter both a new date and a mandatory reason.');
      return;
    }

    try {
      requestService.rescheduleRequest(requestId, {
        newDueDate: newDate,
        reason,
        comment
      });
      modal.close();
      Toast.info(`Timeline rescheduled to ${newDate}.`);
      window.dispatchEvent(new CustomEvent('request:reloaded'));
    } catch (err) {
      Toast.error(err.message);
    }
  });
}

export function openExecuteContractModal(requestId) {
  const req = requestService.getRequestById(requestId);
  if (!req) return;

  const today = new Date().toISOString().split('T')[0];
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const defaultExpiry = nextYear.toISOString().split('T')[0];

  const html = `
    <div>
      <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 12.5px; color: #065F46;">
        ✍️ <strong>Final Executed Contract Upload</strong><br/>
        Uploading the executed agreement will create an Active Contract record in the centralized legal repository and initiate automated expiry alert tracking.
      </div>

      <div class="form-group">
        <label class="form-label">Contract / Agreement Title <span class="required">*</span></label>
        <input type="text" id="exec-name" class="form-input" value="${req.title}" required />
      </div>

      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Counterparty <span class="required">*</span></label>
          <input type="text" id="exec-counterparty" class="form-input" value="${req.counterparty || ''}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Contract Value ($ USD) <span class="required">*</span></label>
          <input type="number" id="exec-value" class="form-input" value="${req.contractValue || 0}" required />
        </div>
      </div>

      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Effective Date <span class="required">*</span></label>
          <input type="date" id="exec-eff-date" class="form-input" value="${today}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Expiry Date <span class="required">*</span></label>
          <input type="date" id="exec-exp-date" class="form-input" value="${defaultExpiry}" required />
        </div>
      </div>

      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Payment Terms</label>
          <input type="text" id="exec-payment" class="form-input" value="Net 30 Days" />
        </div>
        <div class="form-group">
          <label class="form-label">Notice Period (Days)</label>
          <input type="number" id="exec-notice" class="form-input" value="30" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Termination Clause Summary</label>
        <textarea id="exec-termination" class="form-textarea" placeholder="e.g. 30 days prior written notice for convenience; immediate termination upon material breach..."></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Executed / Signed Document File <span class="required">*</span></label>
        <input type="file" id="exec-file-input" class="form-input" required />
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
    <button class="btn btn-primary" id="confirm-execute-btn">Execute & Store Contract</button>
  `;

  const modal = Modal.open({
    title: '📜 Mark Executed & Register Contract',
    contentHtml: html,
    footerHtml: footer,
    size: 'lg'
  });

  window.activeModalClose = modal.close;

  document.getElementById('confirm-execute-btn').addEventListener('click', () => {
    const name = document.getElementById('exec-name').value;
    const counterparty = document.getElementById('exec-counterparty').value;
    const contractValue = document.getElementById('exec-value').value;
    const effectiveDate = document.getElementById('exec-eff-date').value;
    const expiryDate = document.getElementById('exec-exp-date').value;
    const paymentTerms = document.getElementById('exec-payment').value;
    const noticePeriodDays = document.getElementById('exec-notice').value;
    const terminationClause = document.getElementById('exec-termination').value;
    const fileInput = document.getElementById('exec-file-input');

    if (!name || !counterparty || !effectiveDate || !expiryDate) {
      Toast.error('Please fill in all mandatory fields.');
      return;
    }

    try {
      // 1. Create document record
      const doc = documentService.uploadDocument({
        title: `${name} (Executed Final)`,
        documentType: req.requestType,
        category: 'Contracts',
        departmentId: req.departmentId,
        linkedRequestId: req.id,
        confidentialityLevel: 'CONFIDENTIAL',
        counterparty,
        effectiveDate,
        expiryDate,
        fileName: fileInput.files[0] ? fileInput.files[0].name : 'Executed_Agreement_Final.pdf',
        changeDescription: 'Final countersigned executed contract file.'
      });

      doc.isExecuted = true;
      doc.status = 'EXECUTED';

      // 2. Create CLM Contract record
      const contract = contractService.createContract({
        name,
        contractType: req.requestType,
        departmentId: req.departmentId,
        counterparty,
        effectiveDate,
        expiryDate,
        contractValue,
        paymentTerms,
        noticePeriodDays,
        terminationClause,
        linkedRequestId: req.id,
        executedDocumentId: doc.id
      });

      modal.close();
      Toast.success(`Contract ${contract.contractId} created and marked EXECUTED!`);
      window.location.hash = `#/contracts`;
    } catch (err) {
      Toast.error(err.message);
    }
  });
}
