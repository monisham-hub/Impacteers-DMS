/**
 * Enterprise In-House Legal Management System
 * Notification Center Service
 */

import { db } from '../db.js';
import { authService } from './authService.js';

class NotificationService {
  /**
   * Send notification to a specific user
   */
  send({ userId, title, message, category = 'GENERAL', linkUrl = '' }) {
    const notif = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      title,
      message,
      category,
      linkUrl,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    db.data.notifications.unshift(notif);
    db.saveToStorage();

    window.dispatchEvent(new CustomEvent('notification:received', { detail: notif }));
    return notif;
  }

  /**
   * Broadcast to all legal team members
   */
  broadcastToLegal({ title, message, category = 'REQUEST', linkUrl = '' }) {
    const legalUsers = db.data.users.filter(
      u => u.role === 'SUPER_ADMIN' || u.role === 'LEGAL_ADMIN' || u.role === 'LEGAL_MEMBER'
    );
    legalUsers.forEach(u => {
      this.send({ userId: u.id, title, message, category, linkUrl });
    });
  }

  /**
   * Get notifications for the currently active user
   */
  getMyNotifications() {
    const user = authService.getCurrentUser();
    if (!user) return [];
    return db.data.notifications.filter(n => n.userId === user.id);
  }

  getUnreadCount() {
    const notifs = this.getMyNotifications();
    return notifs.filter(n => !n.isRead).length;
  }

  markAsRead(notificationId) {
    const notif = db.data.notifications.find(n => n.id === notificationId);
    if (notif) {
      notif.isRead = true;
      db.saveToStorage();
      window.dispatchEvent(new CustomEvent('notification:updated'));
    }
  }

  markAllAsRead() {
    const user = authService.getCurrentUser();
    db.data.notifications.forEach(n => {
      if (n.userId === user.id) {
        n.isRead = true;
      }
    });
    db.saveToStorage();
    window.dispatchEvent(new CustomEvent('notification:updated'));
  }
}

export const notificationService = new NotificationService();
