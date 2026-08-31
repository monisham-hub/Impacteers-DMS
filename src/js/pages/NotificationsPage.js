/**
 * Enterprise In-House Legal Management System
 * Notifications Center Page
 */

import { notificationService } from '../services/notificationService.js';
import { Toast } from '../components/Toast.js';

export function renderNotificationsPage() {
  const notifs = notificationService.getMyNotifications();

  return `
    <div class="content-container">
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>🔔</span>
            <span>Notification Center</span>
          </div>
          <div class="page-subtitle">
            System alerts, request status advancements, remark replies, and contract expiry notifications.
          </div>
        </div>
        <div>
          <button class="btn btn-secondary btn-sm" id="page-mark-all-read-btn">
            <span>✓ Mark All as Read</span>
          </button>
        </div>
      </div>

      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>📬</span>
            <span>All Notifications (${notifs.length})</span>
          </div>
        </div>
        <div style="padding: 10px 16px;">
          ${
            notifs.length === 0
              ? '<div style="padding: 48px; text-align: center; color: #94A3B8;">No notifications in your inbox.</div>'
              : notifs
                  .map(
                    n => `
                <div style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 14px;
                  border-bottom: 1px solid #F1F5F9;
                  background: ${n.isRead ? '#FFFFFF' : '#EFF6FF'};
                  border-radius: 8px;
                  margin-bottom: 6px;
                  cursor: pointer;
                " onclick="window.location.hash='${n.linkUrl || '#/notifications'}';">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 20px;">${n.category === 'CONTRACT' ? '📜' : n.category === 'REMARK' ? '💬' : '📋'}</span>
                    <div>
                      <div style="font-size: 13.5px; font-weight: 600; color: #0F172A;">${n.title}</div>
                      <div style="font-size: 12.5px; color: #475569; margin-top: 2px;">${n.message}</div>
                      <div style="font-size: 11px; color: #94A3B8; margin-top: 4px;">
                        ${new Date(n.createdAt).toLocaleDateString()} ${new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div>
                    ${!n.isRead ? '<span class="badge badge-rose">New</span>' : '<span class="badge badge-slate">Read</span>'}
                  </div>
                </div>
              `
                  )
                  .join('')
          }
        </div>
      </div>
    </div>
  `;
}
