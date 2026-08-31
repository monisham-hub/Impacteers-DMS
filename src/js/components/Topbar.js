/**
 * Impacteers Legal docs
 * Clean, Elegant Topbar with Notification Bell & User Profile
 */

import { authService } from '../services/authService.js';
import { notificationService } from '../services/notificationService.js';

export function renderTopbar() {
  const user = authService.getCurrentUser();
  if (!user) return '';

  const unreadCount = notificationService.getUnreadCount();

  return `
    <header id="app-topbar">
      <!-- Left: Mobile Menu Toggle + Clean Active Workspace Context -->
      <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
        <button id="mobile-menu-btn" class="mobile-menu-toggle" title="Toggle Navigation Menu" aria-label="Toggle navigation">
          ☰
        </button>
        <span style="font-size: 13.5px; font-weight: 800; color: #0F172A; letter-spacing: -0.01em; white-space: nowrap;">
          Impacteers DMS
        </span>
        <span class="topbar-breadcrumb-slash" style="color: #CBD5E1; font-size: 11px;">/</span>
        <span class="badge badge-slate topbar-dept-badge" style="font-size: 11.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">
          ${user.departmentName || 'Global Legal'}
        </span>
      </div>

      <!-- Right: Notifications & User Profile Menu -->
      <div style="display: flex; align-items: center; gap: 14px;">
        
        <!-- Notification Bell -->
        <a href="#/notifications" title="Notifications (${unreadCount} unread)" style="
          text-decoration: none;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          color: #334155;
          font-size: 15px;
          transition: all 0.15s ease;
        " onmouseover="this.style.background='#F1F5F9'; this.style.borderColor='#CBD5E1';" onmouseout="this.style.background='#F8FAFC'; this.style.borderColor='#E2E8F0';">
          <span>🔔</span>
          ${
            unreadCount > 0
              ? `
            <span style="
              position: absolute;
              top: -4px;
              right: -4px;
              background: #EF4444;
              color: #FFFFFF;
              font-size: 10px;
              font-weight: 700;
              min-width: 17px;
              height: 17px;
              border-radius: 9999px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid #FFFFFF;
              padding: 0 3px;
              animation: pulse 2s infinite;
            ">${unreadCount}</span>
          `
              : ''
          }
        </a>

        <!-- User Profile Pill & Dropdown -->
        <div style="position: relative;">
          <button id="topbar-user-btn" style="
            display: flex;
            align-items: center;
            gap: 8px;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            padding: 4px 10px 4px 6px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.15s ease;
            box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          " onmouseover="this.style.borderColor='#CBD5E1'" onmouseout="this.style.borderColor='#E2E8F0'">
            <div style="
              width: 26px;
              height: 26px;
              border-radius: 9999px;
              background: #2563EB;
              color: #FFFFFF;
              font-size: 11.5px;
              font-weight: 700;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              ${user.avatar || 'U'}
            </div>
            <div style="text-align: left;">
              <div style="font-size: 12px; font-weight: 700; color: #0F172A; line-height: 1.1;">
                ${user.name}
              </div>
            </div>
            <span style="font-size: 9px; color: #94A3B8; margin-left: 2px;">▼</span>
          </button>

          <!-- User Menu Dropdown -->
          <div id="topbar-user-dropdown" style="
            display: none;
            position: absolute;
            right: 0;
            top: 42px;
            width: 220px;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            z-index: 1000;
            overflow: hidden;
          ">
            <div style="padding: 10px 14px; border-bottom: 1px solid #F1F5F9; background: #F8FAFC;">
              <div style="font-size: 12.5px; font-weight: 700; color: #0F172A;">${user.name}</div>
              <div style="font-size: 11px; color: #64748B;">${user.tagline || user.roleLabel}</div>
            </div>

            <div style="padding: 4px 0;">
              <a href="javascript:void(0)" class="dropdown-link" onclick="window.showProfileModal(); document.getElementById('topbar-user-dropdown').style.display='none';">
                👤 Profile Details
              </a>
              <a href="#/about" class="dropdown-link" onclick="document.getElementById('topbar-user-dropdown').style.display='none';">
                ℹ️ About System
              </a>
            </div>

            <div style="padding: 4px 0; border-top: 1px solid #F1F5F9;">
              <button class="dropdown-link" style="width: 100%; text-align: left; background: none; border: none; color: #DC2626; font-weight: 600; cursor: pointer;" onclick="window.confirmLogout();">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

      </div>
    </header>
  `;
}
