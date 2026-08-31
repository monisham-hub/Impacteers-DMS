/**
 * Impacteers Legal docs
 * Simplified Legal Request Workflow Service
 */

import { db } from '../db.js';
import { authService } from './authService.js';
import { notificationService } from './notificationService.js';
import { auditService } from './auditService.js';

class RequestService {
  /**
   * Get requests accessible by current user
   */
  getRequests({ departmentId = '', status = '', search = '', myRequestsOnly = false } = {}) {
    const user = authService.getCurrentUser();
    if (!user) return [];

    let requests = [...db.data.requests];

    // RBAC check
    if (authService.isLegalManager() || authService.isChairman()) {
      // Sees all
    } else {
      // Business user sees only their department
      requests = requests.filter(r => r.departmentId === user.departmentId || r.requestorId === user.id);
    }

    if (myRequestsOnly) {
      requests = requests.filter(r => r.requestorId === user.id);
    }

    if (departmentId) {
      requests = requests.filter(r => r.departmentId === departmentId);
    }

    if (status) {
      requests = requests.filter(r => r.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      requests = requests.filter(
        r =>
          r.requestId.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.requestorName.toLowerCase().includes(q) ||
          r.departmentName.toLowerCase().includes(q)
      );
    }

    return requests.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  getRequestById(idOrReqId) {
    const req = db.data.requests.find(r => r.id === idOrReqId || r.requestId === idOrReqId);
    if (!req) return null;

    if (!authService.canAccessRequest(req)) {
      throw new Error(`Access Denied: You cannot access request ${req.requestId}.`);
    }

    // Attach comments
    const comments = db.data.comments
      .filter(c => c.requestId === req.id)
      .filter(c => (c.isInternalLegalOnly ? authService.canViewInternalNotes() : true));

    return {
      ...req,
      comments
    };
  }

  /**
   * Create a new simple legal request
   */
  createRequest({ title, requestType, priority = 'MEDIUM', requiredByDate, description, attachedDocument = null, comment = '' }) {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('User not logged in.');

    if (!title || !requestType || !requiredByDate || !description) {
      throw new Error('Please fill in all mandatory fields.');
    }

    const dept = db.data.departments.find(d => d.id === user.departmentId) || db.data.departments[0];
    const currentYear = new Date().getFullYear();
    const count = db.data.requests.length + 1;
    const formattedNum = String(count).padStart(4, '0');
    const newRequestId = `LEG-${currentYear}-${formattedNum}`;
    const newId = `req-${Date.now()}`;

    const newRequest = {
      id: newId,
      requestId: newRequestId,
      title: title.trim(),
      requestType,
      priority: priority || 'MEDIUM',
      departmentId: dept.id,
      departmentName: dept.name,
      requestorId: user.id,
      requestorName: user.name,
      requestorRole: user.tagline || user.roleLabel,
      assignedLegalId: 'usr-monisha',
      assignedLegalName: 'Monisha',
      status: 'PENDING_ACCEPTANCE',
      requiredByDate,
      currentDueDate: requiredByDate,
      description: description.trim(),
      attachedDocument,
      rescheduleProposal: null,
      rescheduleHistory: [],
      legalRemarks: [],
      reviewedDocument: null,
      finalDocument: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.data.requests.unshift(newRequest);

    // Initial conversation message
    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: newId,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.tagline || user.roleLabel,
      text: comment ? `${description.trim()}\n\nAdditional Note: ${comment.trim()}` : description.trim(),
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    // Notify Monisha
    notificationService.send({
      userId: 'usr-monisha',
      title: 'New Legal Request Received',
      message: `${user.name} (${dept.name}) submitted ${newRequestId}: "${title}".`,
      linkUrl: `#/requests/${newId}`
    });

    auditService.log({
      actorName: user.name,
      actorRole: user.roleLabel,
      action: 'CREATE_REQUEST',
      target: newRequestId
    });

    window.dispatchEvent(new CustomEvent('request:created', { detail: newRequest }));
    return newRequest;
  }

  /**
   * Accept request (Monisha)
   */
  acceptRequest(requestId, comment = '') {
    if (!authService.isLegalManager()) {
      throw new Error('Only the Legal Manager can accept requests.');
    }

    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.status = 'UNDER_LEGAL_REVIEW';
    req.updatedAt = new Date().toISOString();

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: comment ? `Accepted request for review. Target completion date: ${req.currentDueDate}.\n\nNote: ${comment}` : `Accepted request for review. Target completion date: ${req.currentDueDate}.`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: 'Legal Request Accepted',
      message: `Monisha accepted your request ${req.requestId}. Review in progress.`,
      linkUrl: `#/requests/${req.id}`
    });

    auditService.log({
      actorName: 'Monisha',
      actorRole: 'Legal Manager',
      action: 'ACCEPT_REQUEST',
      target: req.requestId
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Reject request (Monisha)
   */
  rejectRequest(requestId, reason) {
    if (!authService.isLegalManager()) {
      throw new Error('Only the Legal Manager can reject requests.');
    }
    if (!reason || !reason.trim()) {
      throw new Error('Please provide a mandatory rejection reason.');
    }

    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.status = 'REJECTED';
    req.updatedAt = new Date().toISOString();

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: `REQUEST REJECTED: ${reason.trim()}`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: 'Legal Request Rejected',
      message: `Your request ${req.requestId} was rejected. Reason: "${reason.trim()}"`,
      linkUrl: `#/requests/${req.id}`
    });

    auditService.log({
      actorName: 'Monisha',
      actorRole: 'Legal Manager',
      action: 'REJECT_REQUEST',
      target: req.requestId
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Reschedule request (Monisha proposes new date)
   */
  rescheduleRequest(requestId, { proposedDate, reason }) {
    if (!authService.isLegalManager()) {
      throw new Error('Only the Legal Manager can reschedule requests.');
    }
    if (!proposedDate || !reason) {
      throw new Error('Proposed date and reason are required.');
    }

    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.status = 'RESCHEDULED';
    req.rescheduleProposal = {
      originalDate: req.currentDueDate,
      proposedDate,
      reason: reason.trim(),
      proposedBy: 'Monisha',
      proposedAt: new Date().toISOString(),
      status: 'PENDING_BUSINESS_RESPONSE'
    };
    req.updatedAt = new Date().toISOString();

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: `RESCHEDULE PROPOSED: New target date of ${proposedDate}.\nReason: ${reason.trim()}`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: '⏱️ Legal Reschedule Proposal',
      message: `Monisha proposed a new completion date (${proposedDate}) for ${req.requestId} ("${req.title}"). Reason: "${reason.trim()}"`,
      category: 'RESCHEDULE',
      linkUrl: `#/requests/${req.id}`
    });

    auditService.log({
      actorName: 'Monisha',
      actorRole: 'Legal Manager',
      action: 'PROPOSE_RESCHEDULE',
      target: req.requestId
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Business response to reschedule (Accept or Decline/Counter-Proposal)
   */
  respondToReschedule(requestId, { action, counterDate = null, comment = '' }) {
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req || !req.rescheduleProposal) throw new Error('No active reschedule proposal.');

    const user = authService.getCurrentUser();

    if (action === 'ACCEPT') {
      req.rescheduleHistory.push({
        ...req.rescheduleProposal,
        status: 'ACCEPTED_BY_BUSINESS',
        resolvedAt: new Date().toISOString()
      });
      req.currentDueDate = req.rescheduleProposal.proposedDate;
      req.status = 'UNDER_LEGAL_REVIEW';
      req.rescheduleProposal = null;

      db.data.comments.push({
        id: `comm-${Date.now()}`,
        requestId: req.id,
        authorId: user.id,
        authorName: user.name,
        authorRole: user.tagline || user.roleLabel,
        text: `Proposed completion date (${req.currentDueDate}) accepted by ${user.name}. Task is assigned to Monisha.${comment ? ` Note: ${comment}` : ''}`,
        isInternalLegalOnly: false,
        createdAt: new Date().toISOString()
      });

      notificationService.send({
        userId: 'usr-monisha',
        title: '✓ Reschedule Accepted & Task Assigned',
        message: `${user.name} accepted the new date (${req.currentDueDate}) for ${req.requestId}. Task is now assigned and in review.`,
        category: 'RESCHEDULE',
        linkUrl: `#/requests/${req.id}`
      });
    } else {
      // Decline & Counter-Propose Alternate Date
      const targetDate = counterDate || req.rescheduleProposal.originalDate;
      req.rescheduleProposal.status = 'COUNTER_PROPOSED_BY_BUSINESS';
      req.rescheduleProposal.counterDate = targetDate;
      req.rescheduleProposal.counterReason = comment.trim();

      db.data.comments.push({
        id: `comm-${Date.now()}`,
        requestId: req.id,
        authorId: user.id,
        authorName: user.name,
        authorRole: user.tagline || user.roleLabel,
        text: `DECLINED RESCHEDULE • Requested Date: ${targetDate}\nJustification: ${comment.trim() || 'Urgent business priority, need to close as soon as possible.'}`,
        isInternalLegalOnly: false,
        createdAt: new Date().toISOString()
      });

      notificationService.send({
        userId: 'usr-monisha',
        title: '⚠️ Reschedule Declined / Counter-Proposal',
        message: `${user.name} (${req.departmentName}) declined the reschedule for ${req.requestId}. Requested Date: ${targetDate}. Reason: "${comment.trim()}"`,
        category: 'RESCHEDULE',
        linkUrl: `#/requests/${req.id}`
      });
    }

    req.updatedAt = new Date().toISOString();
    db.saveToStorage();

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Legal Manager accepts business counter date
   */
  acceptBusinessCounterDate(requestId) {
    if (!authService.isLegalManager()) throw new Error('Only Legal Manager can accept timeline.');
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req || !req.rescheduleProposal) throw new Error('No active reschedule proposal.');

    const targetDate = req.rescheduleProposal.counterDate || req.rescheduleProposal.originalDate;
    req.currentDueDate = targetDate;
    req.status = 'UNDER_LEGAL_REVIEW';
    req.rescheduleHistory.push({
      ...req.rescheduleProposal,
      status: 'COUNTER_ACCEPTED_BY_LEGAL',
      resolvedAt: new Date().toISOString()
    });
    req.rescheduleProposal = null;
    req.updatedAt = new Date().toISOString();

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: `Accepted business requested completion date (${targetDate}). Task is now in active review.`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: '✓ Legal Accepted Requested Date',
      message: `Monisha accepted your requested completion date (${targetDate}) for ${req.requestId}. Review in active progress.`,
      category: 'RESCHEDULE',
      linkUrl: `#/requests/${req.id}`
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Add remark (Monisha)
   */
  addRemark(requestId, text) {
    if (!authService.isLegalManager()) throw new Error('Only Legal Manager can add legal remarks.');
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    const remark = {
      id: `rem-${Date.now()}`,
      text: text.trim(),
      createdAt: new Date().toISOString()
    };
    req.legalRemarks = req.legalRemarks || [];
    req.legalRemarks.push(remark);
    req.updatedAt = new Date().toISOString();

    db.saveToStorage();
    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return remark;
  }

  /**
   * Upload reviewed document with optional legal remarks & comments (Monisha)
   */
  uploadReviewedDocument(requestId, { name, size = '2.0 MB', remarkText = '', commentText = '' }) {
    if (!authService.isLegalManager()) throw new Error('Only Legal Manager can upload reviewed documents.');
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.reviewedDocument = {
      name,
      size,
      uploadedBy: 'Monisha',
      uploadedAt: new Date().toISOString()
    };

    if (remarkText && remarkText.trim()) {
      req.legalRemarks = req.legalRemarks || [];
      req.legalRemarks.push({
        id: `rem-${Date.now()}`,
        text: remarkText.trim(),
        createdAt: new Date().toISOString()
      });
    }

    req.status = 'BUSINESS_ACTION_REQUIRED';
    req.updatedAt = new Date().toISOString();

    const fullComment = commentText && commentText.trim()
      ? `Uploaded reviewed version: ${name}\n\nReview Notes: ${remarkText.trim() ? remarkText.trim() + '\n\n' : ''}${commentText.trim()}`
      : `Uploaded reviewed version: ${name}${remarkText.trim() ? `\n\nReview Remarks: ${remarkText.trim()}` : ''}`;

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: fullComment,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: '📝 Legal Review Completed',
      message: `Monisha uploaded reviewed draft (${name}) for ${req.requestId}. Please review and execute with client.`,
      category: 'DOCUMENT',
      linkUrl: `#/requests/${req.id}`
    });

    auditService.log({
      actorName: 'Monisha',
      actorRole: 'Legal Manager',
      action: 'UPLOAD_REVIEWED_DOCUMENT',
      target: req.requestId
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Submit Legal Work to Business (Monisha)
   */
  submitToBusiness(requestId) {
    if (!authService.isLegalManager()) throw new Error('Only Legal Manager can submit review.');
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.status = 'BUSINESS_ACTION_REQUIRED';
    req.updatedAt = new Date().toISOString();

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: 'Legal review completed and submitted to business stakeholder for client execution and signing.',
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: 'Legal Review Completed',
      message: `Monisha completed legal review for ${req.requestId}. Please download the reviewed draft and proceed with client signing.`,
      category: 'DOCUMENT',
      linkUrl: `#/requests/${req.id}`
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Upload Final Signed Document (Business or Legal) -> Automatically Completes Request and Publishes to Department Documents
   */
  uploadFinalSignedDocument(requestId, { name, size = '3.0 MB', commentText = '' }) {
    const user = authService.getCurrentUser();
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.finalDocument = {
      name,
      size,
      uploadedBy: user.name,
      uploadedAt: new Date().toISOString(),
      isExecuted: true
    };
    
    // Automatically transition status to COMPLETED
    req.status = 'COMPLETED';
    req.updatedAt = new Date().toISOString();

    // Automatically publish to Department Documents Repository
    const finalDocName = name;
    const docId = `doc-${Date.now()}`;
    const exists = db.data.documents.some(d => d.linkedRequestId === req.id && d.fileName === finalDocName);
    
    if (!exists) {
      db.data.documents.unshift({
        id: docId,
        title: req.title,
        documentType: req.requestType.includes('MOU') ? 'MOU' : req.requestType.includes('NDA') ? 'NDA' : 'Agreement',
        departmentId: req.departmentId,
        departmentName: req.departmentName,
        status: 'Executed',
        fileName: finalDocName,
        fileSize: size || '2.5 MB',
        uploadedBy: user.name,
        updatedAt: new Date().toISOString().split('T')[0],
        linkedRequestId: req.id,
        isFinal: true
      });
    }

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.tagline || user.roleLabel,
      text: `🎉 FINAL SIGNED DOCUMENT UPLOADED: ${name}\nRequest is automatically marked as COMPLETED and published to ${req.departmentName} Documents repository.${commentText && commentText.trim() ? `\n\nExecution Notes: ${commentText.trim()}` : ''}`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: 'usr-monisha',
      title: '🎉 Request Completed & Executed Document Stored',
      message: `${user.name} uploaded final signed copy (${name}) for ${req.requestId}. Request marked as COMPLETED and stored in ${req.departmentName} repository.`,
      category: 'DOCUMENT',
      linkUrl: `#/requests/${req.id}`
    });

    if (req.requestorId !== user.id) {
      notificationService.send({
        userId: req.requestorId,
        title: '🎉 Request Completed & Agreement Stored',
        message: `Final signed document (${name}) uploaded for ${req.requestId}. Agreement published in ${req.departmentName} Documents repository.`,
        category: 'DOCUMENT',
        linkUrl: `#/department-docs`
      });
    }

    auditService.log({
      actorName: user.name,
      actorRole: user.roleLabel,
      action: 'COMPLETE_AND_PUBLISH_DOCUMENT',
      target: `${req.requestId} -> ${finalDocName}`
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Mark Request Completed (Monisha) -> Automatically publishes final document into department repository!
   */
  markCompleted(requestId) {
    if (!authService.isLegalManager()) throw new Error('Only Legal Manager can mark requests completed.');
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.status = 'COMPLETED';
    req.updatedAt = new Date().toISOString();

    // Auto-publish final document to department repository
    const finalDocName = req.finalDocument ? req.finalDocument.name : `${req.title}_Final_Executed.pdf`;
    const docId = `doc-${Date.now()}`;

    db.data.documents.unshift({
      id: docId,
      title: req.title,
      documentType: req.requestType.includes('MOU') ? 'MOU' : req.requestType.includes('NDA') ? 'NDA' : 'Agreement',
      departmentId: req.departmentId,
      departmentName: req.departmentName,
      status: 'Executed',
      fileName: finalDocName,
      fileSize: req.finalDocument ? req.finalDocument.size : '2.5 MB',
      uploadedBy: req.finalDocument ? req.finalDocument.uploadedBy : 'Monisha',
      updatedAt: new Date().toISOString().split('T')[0],
      linkedRequestId: req.id,
      isFinal: true
    });

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: `Request completed. Final agreement stored in ${req.departmentName} Documents repository.`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: 'Legal Request Completed',
      message: `Your request ${req.requestId} is completed! Final document is now available in ${req.departmentName} Documents.`,
      linkUrl: `#/department-docs`
    });

    auditService.log({
      actorName: 'Monisha',
      actorRole: 'Legal Manager',
      action: 'COMPLETE_REQUEST',
      target: req.requestId
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Add comment to request
   */
  addComment(requestId, text, isInternalLegalOnly = false) {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Not logged in.');
    if (!text || !text.trim()) throw new Error('Comment cannot be empty.');

    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    const comment = {
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.tagline || user.roleLabel,
      text: text.trim(),
      isInternalLegalOnly: isInternalLegalOnly && authService.isLegalManager(),
      createdAt: new Date().toISOString()
    };

    db.data.comments.push(comment);
    req.updatedAt = new Date().toISOString();
    db.saveToStorage();

    if (!comment.isInternalLegalOnly) {
      if (authService.isLegalManager()) {
        notificationService.send({
          userId: req.requestorId,
          title: 'Legal Comment',
          message: `Monisha commented on ${req.requestId}.`,
          linkUrl: `#/requests/${req.id}`
        });
      } else {
        notificationService.send({
          userId: 'usr-monisha',
          title: 'New Comment',
          message: `${user.name} commented on ${req.requestId}.`,
          linkUrl: `#/requests/${req.id}`
        });
      }
    }

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return comment;
  }
}

export const requestService = new RequestService();
