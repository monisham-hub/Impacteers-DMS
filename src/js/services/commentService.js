/**
 * Enterprise In-House Legal Management System
 * Jira-Style Comments & Internal Legal Notes Service
 */

import { db } from '../db.js';
import { authService } from './authService.js';
import { auditService } from './auditService.js';
import { notificationService } from './notificationService.js';

class CommentService {
  /**
   * Add a Jira-style comment or Internal Legal Note
   */
  addComment({
    requestId,
    commentText,
    commentType = 'GENERAL_COMMENT',
    isInternalLegalOnly = false,
    attachmentName = null
  }) {
    if (!commentText || !commentText.trim()) {
      throw new Error('Comment content cannot be empty.');
    }

    const user = authService.getCurrentUser();
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    // Enforce rule: only Legal can create Internal Legal Notes
    if (isInternalLegalOnly && !authService.isLegalTeam()) {
      throw new Error('Unauthorized: Only Legal Team members can create Internal Legal Notes.');
    }

    const newComment = {
      id: `comm-${Date.now()}`,
      requestId,
      userId: user.id,
      userName: user.name,
      userRole: user.title,
      commentType,
      isInternalLegalOnly: Boolean(isInternalLegalOnly),
      text: commentText.trim(),
      attachmentName,
      createdAt: new Date().toISOString()
    };

    db.data.comments.push(newComment);
    req.updatedAt = new Date().toISOString();
    db.saveToStorage();

    auditService.log({
      action: isInternalLegalOnly ? 'ADD_INTERNAL_LEGAL_NOTE' : 'ADD_REQUEST_COMMENT',
      objectType: 'REQUEST_COMMENT',
      objectId: newComment.id,
      previousValue: null,
      newValue: {
        requestId: req.requestId,
        isInternalLegalOnly,
        commentType
      }
    });

    // Notify other party if not internal legal note
    if (!isInternalLegalOnly) {
      if (authService.isLegalTeam()) {
        // Legal commented -> notify requestor
        notificationService.send({
          userId: req.requestorId,
          title: 'Legal Counsel Commented',
          message: `${user.name} posted a comment on ${req.requestId}.`,
          category: 'COMMENT',
          linkUrl: `#/requests/${req.id}`
        });
      } else {
        // Business commented -> notify assigned legal or broadcast
        if (req.assignedLegalId) {
          notificationService.send({
            userId: req.assignedLegalId,
            title: 'New Comment from Requestor',
            message: `${user.name} commented on ${req.requestId}.`,
            category: 'COMMENT',
            linkUrl: `#/requests/${req.id}`
          });
        }
      }
    }

    window.dispatchEvent(new CustomEvent('comment:created', { detail: newComment }));
    return newComment;
  }

  /**
   * Get comments for a request with strict Internal Note protection
   */
  getCommentsForRequest(requestId) {
    const comments = db.data.comments.filter(c => c.requestId === requestId);
    const canViewInternal = authService.canViewInternalNotes();

    return comments.filter(c => {
      if (c.isInternalLegalOnly) {
        return canViewInternal;
      }
      return true;
    });
  }
}

export const commentService = new CommentService();
