/**
 * Enterprise In-House Legal Management System
 * Immutable Audit Logging Service
 */

import { db } from '../db.js';
import { authService } from './authService.js';

class AuditService {
  /**
   * Log an immutable event
   */
  log({
    actorId = null,
    actorName = null,
    actorRole = null,
    action,
    objectType,
    objectId,
    previousValue = null,
    newValue = null,
    ipAddress = '10.0.4.82',
    userAgent = 'Enterprise-Legal-OS/2026.8'
  }) {
    const user = authService.getCurrentUser();
    const entry = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      actorId: actorId || user.id,
      actorName: actorName || user.name,
      actorRole: actorRole || user.role,
      action,
      objectType,
      objectId: String(objectId),
      previousValue,
      newValue,
      ipAddress,
      userAgent,
      createdAt: new Date().toISOString()
    };

    // Prepend to maintain reverse chronological order
    db.data.auditLogs.unshift(entry);
    db.saveToStorage();

    window.dispatchEvent(new CustomEvent('audit:new-entry', { detail: entry }));
    return entry;
  }

  /**
   * Get all audit logs with RBAC check (Super Admin / Legal Admin only)
   */
  getLogs({ action = '', objectType = '', search = '', limit = 100 } = {}) {
    if (!authService.isLegalAdmin()) {
      throw new Error('Unauthorized: Audit logs are accessible only to Legal Administrators.');
    }

    let logs = [...db.data.auditLogs];

    if (action) {
      logs = logs.filter(l => l.action.toLowerCase() === action.toLowerCase());
    }
    if (objectType) {
      logs = logs.filter(l => l.objectType.toLowerCase() === objectType.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      logs = logs.filter(
        l =>
          l.actorName.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q) ||
          l.objectId.toLowerCase().includes(q)
      );
    }

    return logs.slice(0, limit);
  }
}

export const auditService = new AuditService();
window.auditService = auditService;
