/**
 * Enterprise In-House Legal Management System
 * Legal Remarks & Clause Review Service
 */

import { db } from '../db.js';
import { authService } from './authService.js';
import { auditService } from './auditService.js';
import { notificationService } from './notificationService.js';

class RemarkService {
  /**
   * Add a clause remark (Legal review only)
   */
  addRemark({ requestId, clauseReference, remarkText }) {
    if (!authService.isLegalTeam()) {
      throw new Error('Unauthorized: Only Legal Team members can add official legal review remarks.');
    }
    if (!clauseReference || !remarkText) {
      throw new Error('Clause reference and remark text are required.');
    }

    const user = authService.getCurrentUser();
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    const newRemark = {
      id: `rem-${Date.now()}`,
      requestId,
      clauseReference: clauseReference.trim(),
      remarkText: remarkText.trim(),
      status: 'OPEN',
      createdBy: user.name,
      createdByName: user.name,
      createdAt: new Date().toISOString(),
      replies: []
    };

    db.data.legalRemarks.unshift(newRemark);
    req.updatedAt = new Date().toISOString();
    db.saveToStorage();

    auditService.log({
      action: 'ADD_LEGAL_REMARK',
      objectType: 'LEGAL_REMARK',
      objectId: newRemark.id,
      previousValue: null,
      newValue: {
        requestId: req.requestId,
        clause: clauseReference,
        remark: remarkText
      }
    });

    notificationService.send({
      userId: req.requestorId,
      title: 'New Legal Review Remark Added',
      message: `${user.name} added a remark on "${clauseReference}" for request ${req.requestId}.`,
      category: 'REMARK',
      linkUrl: `#/requests/${req.id}`
    });

    window.dispatchEvent(new CustomEvent('remark:created', { detail: newRemark }));
    return newRemark;
  }

  /**
   * Reply to a remark (Business & Legal)
   */
  addReply(remarkId, { text }) {
    if (!text || !text.trim()) throw new Error('Reply text cannot be empty.');

    const remark = db.data.legalRemarks.find(r => r.id === remarkId);
    if (!remark) throw new Error('Remark not found.');

    const user = authService.getCurrentUser();
    const reply = {
      id: `rep-${Date.now()}`,
      userName: user.name,
      userRole: user.title,
      text: text.trim(),
      createdAt: new Date().toISOString()
    };

    remark.replies.push(reply);
    db.saveToStorage();

    auditService.log({
      action: 'REPLY_LEGAL_REMARK',
      objectType: 'LEGAL_REMARK',
      objectId: remark.id,
      previousValue: null,
      newValue: { replyBy: user.name, text: reply.text }
    });

    // Notify assigned legal counsel or requestor
    const req = db.data.requests.find(r => r.id === remark.requestId);
    if (req && req.assignedLegalId && user.id !== req.assignedLegalId) {
      notificationService.send({
        userId: req.assignedLegalId,
        title: 'Response to Legal Remark',
        message: `${user.name} responded to "${remark.clauseReference}" on ${req.requestId}.`,
        category: 'REMARK',
        linkUrl: `#/requests/${req.id}`
      });
    }

    window.dispatchEvent(new CustomEvent('remark:updated', { detail: remark }));
    return reply;
  }

  /**
   * Update remark resolution status (OPEN -> IN_PROGRESS -> RESOLVED)
   */
  updateStatus(remarkId, newStatus) {
    const remark = db.data.legalRemarks.find(r => r.id === remarkId);
    if (!remark) throw new Error('Remark not found.');

    const user = authService.getCurrentUser();
    const prevStatus = remark.status;
    remark.status = newStatus;
    db.saveToStorage();

    auditService.log({
      action: 'UPDATE_REMARK_STATUS',
      objectType: 'LEGAL_REMARK',
      objectId: remark.id,
      previousValue: { status: prevStatus },
      newValue: { status: newStatus, updatedBy: user.name }
    });

    window.dispatchEvent(new CustomEvent('remark:updated', { detail: remark }));
    return remark;
  }
}

export const remarkService = new RemarkService();
