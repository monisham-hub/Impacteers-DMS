/**
 * Impacteers DMS — Access Management & Department Segregation Service
 * Exclusively manages:
 * 1. Request Permission to Access a Database
 * 2. Request Permission to Download a Document
 * Strict backend-level department isolation and Legal Admin approval workflow.
 */

import { db } from '../db.js';
import { authService } from './authService.js';
import { auditService } from './auditService.js';
import { notificationService } from './notificationService.js';
import { DEPARTMENTS } from '../constants.js';

export const ACCESS_REQUEST_TYPES = {
  DATABASE_ACCESS: 'DATABASE_ACCESS',
  DOCUMENT_DOWNLOAD: 'DOCUMENT_DOWNLOAD'
};

export const ACCESS_STATUSES = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  DENIED: 'DENIED'
};

class AccessRequestService {
  /**
   * Generates formatted request ID: REQ-000124
   */
  generateRequestId() {
    const list = Array.isArray(db.data.access_requests) ? db.data.access_requests : [];
    const num = list.length + 1;
    return `REQ-${String(num).padStart(6, '0')}`;
  }

  /**
   * Request Permission to Access a Database
   * Strictly locks request to the authenticated user's department
   */
  createDatabaseAccessRequest({ reason = '' } = {}) {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Authentication required.');

    if (!reason || !reason.trim()) {
      throw new Error('Please provide a reason for the database access request.');
    }

    // Backend-level Security Check: Extract department directly from session
    const userDeptId = user.departmentId || 'dept-legal';
    const dept = DEPARTMENTS.find(d => d.id === userDeptId) || {
      id: 'dept-legal',
      name: 'Legal'
    };

    const requestId = this.generateRequestId();
    const newRequest = {
      id: requestId,
      requestId: requestId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      departmentId: dept.id,
      departmentName: dept.name,
      requestType: ACCESS_REQUEST_TYPES.DATABASE_ACCESS,
      requestTypeLabel: 'Database Access',
      targetItem: {
        databaseName: 'Contracts Database',
        accessScope: `${dept.name} Contracts & Legal Records`
      },
      itemLabel: `Contracts Database (${dept.name})`,
      reason: reason.trim(),
      status: ACCESS_STATUSES.PENDING,
      createdAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      denialReason: null
    };

    if (!Array.isArray(db.data.access_requests)) {
      db.data.access_requests = [];
    }

    db.data.access_requests.unshift(newRequest);
    db.saveToStorage();
    db.syncToFirestore('access_requests', newRequest.id, newRequest);

    auditService.log({
      action: 'REQUEST_DATABASE_ACCESS',
      objectType: 'ACCESS_REQUEST',
      objectId: newRequest.id,
      newValue: {
        department: dept.name,
        user: user.email,
        item: newRequest.itemLabel
      }
    });

    notificationService.broadcastToLegal({
      title: 'New Database Access Request',
      message: `${user.name} (${dept.name}) requested access to ${newRequest.itemLabel}.`,
      category: 'ACCESS',
      linkUrl: `#/access`
    });

    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('access:updated', { detail: newRequest }));
    }
    return newRequest;
  }

  /**
   * Request Permission to Download a Document
   * Strictly enforces that the requested document belongs to the authenticated user's department
   */
  createDocumentDownloadRequest({ documentId, reason = '' } = {}) {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Authentication required.');

    if (!documentId) {
      throw new Error('Please select a valid document.');
    }
    if (!reason || !reason.trim()) {
      throw new Error('Please provide a reason for the download request.');
    }

    const doc = db.data.documents.find(d => d.id === documentId && !d.isArchived);
    if (!doc) {
      throw new Error('Requested document could not be found.');
    }

    // Backend-level Security Enforcement: Department segregation check
    const userDeptId = user.departmentId || 'dept-legal';
    const isLegal = authService.isLegalManager();

    if (!isLegal && doc.departmentId && doc.departmentId !== userDeptId && doc.departmentId !== 'ALL') {
      throw new Error(`Security Violation: You can only request downloads for documents within your assigned department.`);
    }

    const dept = DEPARTMENTS.find(d => d.id === (doc.departmentId || userDeptId)) || {
      id: userDeptId,
      name: user.departmentName || 'General'
    };

    const requestId = this.generateRequestId();
    const newRequest = {
      id: requestId,
      requestId: requestId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      departmentId: dept.id,
      departmentName: dept.name,
      requestType: ACCESS_REQUEST_TYPES.DOCUMENT_DOWNLOAD,
      requestTypeLabel: 'Document Download',
      targetItem: {
        documentId: doc.id,
        documentName: doc.title,
        fileUrl: doc.dataUrl || doc.fileUrl || null
      },
      itemLabel: doc.title,
      reason: reason.trim(),
      status: ACCESS_STATUSES.PENDING,
      createdAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      denialReason: null
    };

    if (!Array.isArray(db.data.access_requests)) {
      db.data.access_requests = [];
    }

    db.data.access_requests.unshift(newRequest);
    db.saveToStorage();
    db.syncToFirestore('access_requests', newRequest.id, newRequest);

    auditService.log({
      action: 'REQUEST_DOCUMENT_DOWNLOAD',
      objectType: 'ACCESS_REQUEST',
      objectId: newRequest.id,
      newValue: {
        department: dept.name,
        user: user.email,
        document: doc.title
      }
    });

    notificationService.broadcastToLegal({
      title: 'New Document Download Request',
      message: `${user.name} (${dept.name}) requested download permission for "${doc.title}".`,
      category: 'ACCESS',
      linkUrl: `#/access`
    });

    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('access:updated', { detail: newRequest }));
    }
    return newRequest;
  }

  /**
   * Get filtered access requests
   * Ordinary users strictly receive only their own requests.
   * Legal Admin can view all requests across departments.
   */
  getRequests({ departmentId = '', requestType = '', status = '', myRequestsOnly = false } = {}) {
    const user = authService.getCurrentUser();
    if (!user) return [];

    const isLegal = authService.isLegalManager();
    let list = Array.isArray(db.data.access_requests) ? [...db.data.access_requests] : [];

    // Ordinary user isolation: only see their own requests
    if (!isLegal || myRequestsOnly) {
      list = list.filter(r => r.userId === user.id || r.userEmail?.toLowerCase() === user.email?.toLowerCase());
    }

    if (departmentId && departmentId !== 'ALL') {
      list = list.filter(r => r.departmentId === departmentId);
    }

    if (requestType && requestType !== 'ALL') {
      list = list.filter(r => r.requestType === requestType);
    }

    if (status && status !== 'ALL') {
      list = list.filter(r => r.status === status);
    }

    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  /**
   * Pending counts per department for Legal Admin summary cards
   */
  getPendingCountsByDepartment() {
    const counts = {};
    DEPARTMENTS.forEach(d => {
      counts[d.id] = 0;
    });

    const list = Array.isArray(db.data.access_requests) ? db.data.access_requests : [];
    list.forEach(r => {
      if (r.status === ACCESS_STATUSES.PENDING && r.departmentId) {
        counts[r.departmentId] = (counts[r.departmentId] || 0) + 1;
      }
    });

    return counts;
  }

  /**
   * Legal Admin: Approve Access Request
   */
  approveRequest(requestId) {
    if (!authService.isLegalManager()) {
      throw new Error('Unauthorized: Only the Legal Admin can approve access requests.');
    }

    const list = db.data.access_requests || [];
    const request = list.find(r => r.id === requestId || r.requestId === requestId);
    if (!request) throw new Error('Access request not found.');

    const admin = authService.getCurrentUser();
    request.status = ACCESS_STATUSES.APPROVED;
    request.reviewedAt = new Date().toISOString();
    request.reviewedBy = admin ? admin.email : 'monisha@impacteers.club';
    request.denialReason = null;

    // Grant access to user profile
    const targetUser = db.data.users.find(u => u.id === request.userId || u.email?.toLowerCase() === request.userEmail?.toLowerCase());
    if (targetUser) {
      if (!Array.isArray(targetUser.grantedDatabases)) {
        targetUser.grantedDatabases = [];
      }
      if (!Array.isArray(targetUser.approvedDownloads)) {
        targetUser.approvedDownloads = [];
      }

      if (request.requestType === ACCESS_REQUEST_TYPES.DATABASE_ACCESS) {
        if (!targetUser.grantedDatabases.includes(request.departmentId)) {
          targetUser.grantedDatabases.push(request.departmentId);
        }
      } else if (request.requestType === ACCESS_REQUEST_TYPES.DOCUMENT_DOWNLOAD) {
        const docId = request.targetItem?.documentId;
        if (docId && !targetUser.approvedDownloads.includes(docId)) {
          targetUser.approvedDownloads.push(docId);
        }
      }

      db.syncToFirestore('users', targetUser.id, targetUser);
    }

    db.saveToStorage();
    db.syncToFirestore('access_requests', request.id, request);

    auditService.log({
      action: 'APPROVE_ACCESS_REQUEST',
      objectType: 'ACCESS_REQUEST',
      objectId: request.id,
      newValue: {
        status: ACCESS_STATUSES.APPROVED,
        requestType: request.requestType,
        targetItem: request.itemLabel,
        approvedFor: request.userEmail
      }
    });

    notificationService.send({
      userId: request.userId,
      title: 'Access Request Approved ✅',
      message: `Your request for ${request.itemLabel} has been approved by the Legal Admin.`,
      category: 'ACCESS',
      linkUrl: `#/access`
    });

    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('access:updated', { detail: request }));
    }
    return request;
  }

  /**
   * Legal Admin: Deny Access Request
   */
  denyRequest(requestId, denialReason = '') {
    if (!authService.isLegalManager()) {
      throw new Error('Unauthorized: Only the Legal Admin can deny access requests.');
    }

    const list = db.data.access_requests || [];
    const request = list.find(r => r.id === requestId || r.requestId === requestId);
    if (!request) throw new Error('Access request not found.');

    const admin = authService.getCurrentUser();
    request.status = ACCESS_STATUSES.DENIED;
    request.reviewedAt = new Date().toISOString();
    request.reviewedBy = admin ? admin.email : 'monisha@impacteers.club';
    request.denialReason = denialReason ? denialReason.trim() : 'Request denied by Legal Admin.';

    db.saveToStorage();
    db.syncToFirestore('access_requests', request.id, request);

    auditService.log({
      action: 'DENY_ACCESS_REQUEST',
      objectType: 'ACCESS_REQUEST',
      objectId: request.id,
      newValue: {
        status: ACCESS_STATUSES.DENIED,
        denialReason: request.denialReason,
        deniedFor: request.userEmail
      }
    });

    notificationService.send({
      userId: request.userId,
      title: 'Access Request Denied ❌',
      message: `Your request for ${request.itemLabel} was denied: ${request.denialReason}`,
      category: 'ACCESS',
      linkUrl: `#/access`
    });

    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('access:updated', { detail: request }));
    }
    return request;
  }
}

export const accessRequestService = new AccessRequestService();
