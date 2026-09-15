/**
 * Impacteers Legal docs
 * Simplified Jira-Style Request Detail View & Action Center
 */

import { authService } from '../services/authService.js';
import { requestService } from '../services/requestService.js';
import { REQUEST_STATUSES, REQUEST_PRIORITIES } from '../constants.js';
import { Modal } from '../components/Modal.js';
import { Toast } from '../components/Toast.js';

export function renderRequestDetailPage(requestId) {
  let req;
  try {
    req = requestService.getRequestById(requestId);
  } catch (err) {
    return `
      <div class="content-container">
        <div style="padding: 48px; text-align: center; background: #FFF1F2; border-radius: 12px; border: 1px solid #FECDD3;">
          <h2 style="color: #BE123C; font-size: 18px;">Access Denied</h2>
          <p style="color: #9F1239; margin-top: 6px;">${err.message}</p>
          <a href="#/dashboard" class="btn btn-primary btn-sm" style="margin-top: 14px;">Return to Dashboard</a>
        </div>
      </div>
    `;
  }

  if (!req) {
    return `
      <div class="content-container">
        <div style="padding: 48px; text-align: center; background: #FFFFFF; border-radius: 12px; border: 1px solid #E2E8F0;">
          <h2>Request Not Found</h2>
          <a href="#/dashboard" class="btn btn-primary btn-sm" style="margin-top: 14px;">Return to Dashboard</a>
        </div>
      </div>
    `;
  }

  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalManager();
  const isChairman = authService.isChairman();
  const statusObj = REQUEST_STATUSES[req.status] || { label: req.status, badgeClass: 'badge-blue' };
  const priorityObj = REQUEST_PRIORITIES[req.priority] || { label: req.priority || 'Standard Priority', badgeClass: 'badge-blue', icon: '⚡' };

  return `
    <div class="content-container" style="max-width: 1200px;">
      <!-- Breadcrumb & Top Action Toolbar -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #64748B;">
          <a href="#/requests" style="color: #2563EB; text-decoration: none; font-weight: 500;">Requests</a>
          <span>/</span>
          <span style="font-family: var(--font-mono); font-weight: 700; color: #0F172A;">${req.requestId}</span>
        </div>

        <!-- Action Toolbar -->
        ${
          isChairman
            ? `<span class="badge badge-slate">👁️ Executive View-Only Mode</span>`
            : `<div style="display: flex; gap: 8px; flex-wrap: wrap;" id="request-action-toolbar">
                ${renderWorkflowActionButtons(req, isLegal)}
              </div>`
        }
      </div>

      <!-- Ticket Header Card -->
      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 22px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
              <span style="font-family: var(--font-mono); font-size: 14px; font-weight: 700; color: #2563EB; background: #EFF6FF; padding: 2px 8px; border-radius: 6px;">
                ${req.requestId}
              </span>
              <span class="badge ${statusObj.badgeClass}" style="font-size: 12px;">
                ${statusObj.label}
              </span>
              <span class="badge ${priorityObj.badgeClass}" style="font-size: 12px;">
                ${priorityObj.icon || '⚡'} ${priorityObj.label}
              </span>
              <span class="badge badge-slate">${req.departmentName}</span>
            </div>
            <h1 style="font-size: 20px; font-weight: 700; color: #0F172A;">
              ${req.title}
            </h1>
          </div>

          <div style="text-align: right;">
            <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748B;">Required Completion Date</div>
            <div style="font-family: var(--font-mono); font-size: 18px; font-weight: 700; color: #B45309; margin-top: 2px;">
              ${req.currentDueDate}
            </div>
            <div style="font-size: 11px; color: #94A3B8;">Assigned to: ${req.assignedLegalName}</div>
          </div>
        </div>
      </div>

      <!-- Reschedule Proposal Banner (If active) -->
      ${renderRescheduleProposalBanner(req, isLegal, isChairman)}

      <!-- Main Layout: Left Work Area + Right Ticket Info -->
      <div class="grid-2-1-col">
        
        <!-- Left: Description, Documents, Legal Remarks, Conversation -->
        <div>
          
          <!-- Description Card -->
          <div class="enterprise-card">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>📝</span>
                <span>Request Description</span>
              </div>
            </div>
            <div style="padding: 18px; font-size: 13.5px; line-height: 1.6; color: #1E293B;">
              ${req.description.replace(/\n/g, '<br/>')}
            </div>
          </div>

          <!-- Document Review & Version Area -->
          <div class="enterprise-card">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>📁</span>
                <span>Documents & Review Drafts</span>
              </div>
              ${
                isLegal && req.status !== 'COMPLETED'
                  ? `<button class="btn btn-secondary btn-sm" id="btn-upload-reviewed-doc">
                      + Upload Reviewed Version
                    </button>`
                  : ''
              }
            </div>
            <div style="padding: 16px;">
              <div style="display: flex; flex-direction: column; gap: 10px;">
                
                <!-- 1. Original Document -->
                <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; background: #FFFFFF; display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="font-size: 13px; font-weight: 600; color: #0F172A;">
                      📄 Original Document
                    </div>
                    <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">
                      ${req.attachedDocument ? `${req.attachedDocument.name} (${req.attachedDocument.size})` : 'No document uploaded at intake.'}
                    </div>
                  </div>
                  ${
                    req.attachedDocument
                      ? `<button class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 3px 8px;" onclick="window.downloadDocumentFileById('${req.id}', 'attachedDocument')">📥 Download</button>`
                      : ''
                  }
                </div>

                <!-- 2. Legal Reviewed Document -->
                ${
                  req.reviewedDocument
                    ? `
                  <div style="border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px; background: #EFF6FF; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 13px; font-weight: 600; color: #1E40AF;">
                        📝 Legal Reviewed / Revised Version
                      </div>
                      <div style="font-size: 11.5px; color: #3B82F6; margin-top: 2px;">
                        ${req.reviewedDocument.name} (${req.reviewedDocument.size}) • Uploaded by ${req.reviewedDocument.uploadedBy}
                      </div>
                    </div>
                    <button class="btn btn-primary btn-sm" style="font-size: 11px; padding: 3px 8px;" onclick="window.downloadDocumentFileById('${req.id}', 'reviewedDocument')">📥 Download Reviewed</button>
                  </div>
                `
                    : ''
                }

                <!-- 3. Final Signed Document -->
                ${
                  req.finalDocument
                    ? `
                  <div style="border: 1px solid #A7F3D0; border-radius: 8px; padding: 12px; background: #ECFDF5; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 13px; font-weight: 700; color: #065F46;">
                        📜 FINAL EXECUTED AGREEMENT
                      </div>
                      <div style="font-size: 11.5px; color: #047857; margin-top: 2px;">
                        ${req.finalDocument.name} (${req.finalDocument.size}) • Uploaded by ${req.finalDocument.uploadedBy}
                      </div>
                    </div>
                    <button class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 3px 8px;" onclick="window.downloadDocumentFileById('${req.id}', 'finalDocument')">📥 Download Final</button>
                  </div>
                `
                    : ''
                }

              </div>

              <!-- Upload Final Signed Document Button for Business/Legal -->
              ${
                !isChairman && req.status !== 'COMPLETED'
                  ? `
                <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #E2E8F0; text-align: right;">
                  <button class="btn btn-secondary btn-sm" id="btn-upload-final-signed-doc" style="font-weight: 600;">
                    ✍️ Upload Final Signed Document
                  </button>
                </div>
              `
                  : ''
              }
            </div>
          </div>

          <!-- Legal Remarks Section -->
          <div class="enterprise-card" style="border-left: 4px solid #7C3AED;">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>⚖️</span>
                <span>Legal Review Remarks (${req.legalRemarks ? req.legalRemarks.length : 0})</span>
              </div>
              ${
                isLegal && req.status !== 'COMPLETED'
                  ? `<button class="btn btn-secondary btn-sm" id="btn-add-legal-remark">
                      + Add Legal Remark
                    </button>`
                  : ''
              }
            </div>
            <div style="padding: 16px;">
              ${
                !req.legalRemarks || req.legalRemarks.length === 0
                  ? `<div style="text-align: center; color: #94A3B8; font-size: 13px; padding: 16px;">No legal review remarks added yet.</div>`
                  : req.legalRemarks
                      .map(
                        (rem, i) => `
                    <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
                      <div style="font-size: 13px; font-weight: 600; color: #0F172A;">
                        Remark #${i + 1}
                      </div>
                      <div style="font-size: 13px; color: #334155; margin-top: 4px; line-height: 1.5;">
                        ${rem.text}
                      </div>
                    </div>
                  `
                      )
                      .join('')
              }
            </div>
          </div>

          <!-- Jira/Slack-Style Conversation Thread -->
          <div class="enterprise-card">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>💬</span>
                <span>Request Conversation</span>
              </div>
            </div>
            <div style="padding: 16px;">
              <!-- Comments List -->
              <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px;">
                ${req.comments
                  .map(c => {
                    if (c.isInternalLegalOnly) {
                      return `
                        <div class="internal-legal-note">
                          <div style="display: flex; justify-content: space-between; font-size: 11.5px; font-weight: 700; color: #92400E; margin-bottom: 4px;">
                            <span>🔒 INTERNAL LEGAL NOTE • ${c.authorName} (${c.authorRole})</span>
                            <span style="font-size: 10px; color: #B45309;">${new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div style="font-size: 13px; color: #78350F; line-height: 1.4;">${c.text.replace(/\n/g, '<br/>')}</div>
                        </div>
                      `;
                    }
                    return `
                      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                          <div>
                            <strong style="font-size: 13px; color: #0F172A;">${c.authorName}</strong>
                            <span style="font-size: 11px; color: #64748B; margin-left: 6px;">(${c.authorRole})</span>
                          </div>
                          <span style="font-size: 11px; color: #94A3B8;">${new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div style="font-size: 13px; color: #334155; line-height: 1.5;">${c.text.replace(/\n/g, '<br/>')}</div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>

              <!-- New Comment Box -->
              ${
                !isChairman && req.status !== 'COMPLETED'
                  ? `
                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px;">
                  <div class="form-group" style="margin-bottom: 10px;">
                    <textarea id="ticket-comment-text" class="form-textarea" placeholder="Add a comment or reply..." style="min-height: 70px;"></textarea>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    ${
                      isLegal
                        ? `
                      <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #92400E; cursor: pointer;">
                        <input type="checkbox" id="comment-is-internal-checkbox" />
                        <span>🔒 Internal Legal Note (Legal Only)</span>
                      </label>
                    `
                        : `<div></div>`
                    }
                    <button class="btn btn-primary btn-sm" id="btn-submit-ticket-comment">
                      Send Comment
                    </button>
                  </div>
                </div>
              `
                  : ''
              }
            </div>
          </div>

        </div>

        <!-- Right Column: Ticket Metadata -->
        <div>
          <div class="enterprise-card">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>📋</span>
                <span>Ticket Details</span>
              </div>
            </div>
            <div style="padding: 16px; font-size: 12.5px;">
              <div style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Request Type:</span>
                <strong>${req.requestType}</strong>
              </div>
              <div style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Department:</span>
                <span class="badge badge-slate">${req.departmentName}</span>
              </div>
              <div style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Requested By:</span>
                <strong>${req.requestorName} (${req.requestorRole})</strong>
              </div>
              <div style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Assigned Counsel:</span>
                <strong style="color: #2563EB;">${req.assignedLegalName}</strong>
              </div>
              <div style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Submitted On:</span>
                <span>${new Date(req.createdAt).toLocaleDateString()}</span>
              </div>
              <div style="padding: 8px 0; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Target Due Date:</span>
                <strong style="color: #B45309;">${req.currentDueDate}</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

function renderWorkflowActionButtons(req, isLegal) {
  if (req.status === 'COMPLETED') {
    return `<span class="badge badge-green" style="font-size: 13px; padding: 6px 12px;">✓ Request Completed</span>`;
  }
  if (req.status === 'REJECTED') {
    return `<span class="badge badge-rose" style="font-size: 13px; padding: 6px 12px;">✕ Request Rejected</span>`;
  }

  let buttons = '';

  if (isLegal) {
    if (req.status === 'PENDING_ACCEPTANCE') {
      buttons += `
        <button class="btn btn-primary btn-sm" onclick="window.legalAcceptRequest('${req.id}')">✓ Accept</button>
        <button class="btn btn-danger btn-sm" onclick="window.legalRejectRequest('${req.id}')">✕ Reject</button>
        <button class="btn btn-secondary btn-sm" onclick="window.legalRescheduleRequest('${req.id}')">⏱️ Reschedule</button>
      `;
    } else if (req.status === 'UNDER_LEGAL_REVIEW' || req.status === 'ACCEPTED') {
      buttons += `
        <button class="btn btn-primary btn-sm" onclick="window.legalSubmitToBusiness('${req.id}')">🚀 Submit Review to Business</button>
        <button class="btn btn-secondary btn-sm" onclick="window.legalRescheduleRequest('${req.id}')">⏱️ Reschedule</button>
      `;
    } else if (req.status === 'BUSINESS_ACTION_REQUIRED' || req.status === 'FINAL_DOCUMENT_REQUIRED') {
      buttons += `
        <button class="btn btn-primary btn-sm" onclick="window.legalMarkCompleted('${req.id}')">✓ Mark Completed & Store in Vault</button>
      `;
    }
  }

  return buttons;
}

function renderRescheduleProposalBanner(req, isLegal, isChairman) {
  if (req.status !== 'RESCHEDULED' || !req.rescheduleProposal) return '';

  const proposal = req.rescheduleProposal;

  // Case A: Business Stakeholder has Counter-Proposed
  if (proposal.status === 'COUNTER_PROPOSED_BY_BUSINESS') {
    if (isLegal) {
      return `
        <div style="
          background: #FFF7ED;
          border: 1px solid #FFEDD5;
          border-left: 4px solid #EA580C;
          border-radius: 8px;
          padding: 16px 20px;
          margin-bottom: 20px;
        ">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
            <div>
              <strong style="font-size: 14.5px; color: #9A3412;">
                ⚠️ Business Declined Reschedule & Requested ${proposal.counterDate || proposal.originalDate}
              </strong>
              <div style="font-size: 13px; color: #C2410C; margin-top: 6px; line-height: 1.5;">
                Requested Completion Date: <strong style="font-size: 14px;">${proposal.counterDate || proposal.originalDate}</strong><br/>
                Stakeholder Justification: <em>"${proposal.counterReason || 'Priority request, needed ASAP'}"</em>
              </div>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" onclick="window.legalAcceptBusinessCounterDate('${req.id}')">
                ✓ Accept Requested Date (${proposal.counterDate || proposal.originalDate})
              </button>
              <button class="btn btn-secondary btn-sm" onclick="window.legalRescheduleRequest('${req.id}')">
                ⏱️ Propose Revised Date
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div style="
          background: #F0FDF4;
          border: 1px solid #DCFCE7;
          border-left: 4px solid #16A34A;
          border-radius: 8px;
          padding: 16px 20px;
          margin-bottom: 20px;
        ">
          <div style="font-size: 14px; font-weight: 700; color: #15803D;">
            📨 Counter-Proposal Sent to Monisha (Legal Manager)
          </div>
          <div style="font-size: 13px; color: #166534; margin-top: 4px;">
            You requested completion by <strong>${proposal.counterDate || proposal.originalDate}</strong> (Reason: <em>"${proposal.counterReason}"</em>). Awaiting Legal confirmation.
          </div>
        </div>
      `;
    }
  }

  // Case B: Legal Manager has proposed a new date (Waiting for Business Response)
  return `
    <div style="
      background: #FFFBEB;
      border: 1px solid #FDE68A;
      border-left: 4px solid #F59E0B;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 20px;
    ">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
        <div>
          <strong style="font-size: 14.5px; color: #92400E;">
            ⏱️ Legal Has Proposed a New Completion Date
          </strong>
          <div style="font-size: 13px; color: #78350F; margin-top: 6px;">
            Original Date: <strong>${proposal.originalDate}</strong> → Proposed Date: <strong>${proposal.proposedDate}</strong><br/>
            Reason: <em>"${proposal.reason}"</em>
          </div>
        </div>

        ${
          !isLegal && !isChairman
            ? `
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm" onclick="window.businessAcceptReschedule('${req.id}')">
              ✓ Accept Proposed Date (${proposal.proposedDate})
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.businessRejectReschedule('${req.id}')">
              ✕ Decline / Propose Alternative
            </button>
          </div>
        `
            : `<span class="badge badge-amber">Awaiting Business Stakeholder Response</span>`
        }
      </div>
    </div>
  `;
}
