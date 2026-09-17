/**
 * Impacteers Legal docs
 * Minimal Dynamic Role-Based Sidebar
 */

import { authService } from '../services/authService.js';
import { notificationService } from '../services/notificationService.js';

export function renderSidebar(activeRoute = 'dashboard', isCollapsed = false) {
  const user = authService.getCurrentUser();
  if (!user) return '';

  const isLegal = authService.isLegalManager();
  const isChairman = authService.isChairman();
  const unreadCount = notificationService.getUnreadCount();

  let navItems = [];

  if (isLegal) {
    // Monisha - Legal Manager Clean Sidebar
    navItems = [
      { route: 'dashboard', label: 'Dashboard', icon: '📊' },
      { route: 'requests', label: 'Requests Queue', icon: '⚖️' },
      { route: 'documents', label: 'Documents Vault', icon: '📁' },
      { route: 'departments', label: 'Document Database', icon: '🗄️' },
      { route: 'calendar', label: 'Calendar', icon: '📅' },
      { route: 'legal-admin', label: 'Legal Admin', icon: '🛡️' }
    ];
  } else if (isChairman) {
    // Chairman - Executive View-Only Sidebar (Removed Documents Vault and Calendar)
    navItems = [
      { route: 'dashboard', label: 'Executive Dashboard', icon: '🏛️' },
      { route: 'requests', label: 'All Requests', icon: '📋' },
      { route: 'departments', label: 'Document Database', icon: '🗄️' },
      { route: 'legal-admin', label: 'Legal Admin', icon: '🛡️' }
    ];
  } else {
    // Business User (Edwin, Musthafa, Vinoth, Bala, etc.) - Ultra Minimal 4-item Sidebar
    const deptName = user.departmentName || 'Department';
    navItems = [
      { route: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { route: 'my-requests', label: 'My Requests', icon: '📋' },
      { route: 'department-docs', label: `${deptName} Documents`, icon: '📁' },
      { route: 'create-request', label: 'Create Request', icon: '➕', highlight: true }
    ];
  }

  return `
    <aside id="app-sidebar" class="sidebar" style="
      width: ${isCollapsed ? '72px' : '250px'};
      background: #0F172A;
      color: #F8FAFC;
      display: flex;
      flex-direction: column;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
      border-right: 1px solid #1E293B;
      transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    ">
      <!-- Sidebar Header & Exact Logo (No white background) -->
      <div style="
        height: 60px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: ${isCollapsed ? 'center' : 'space-between'};
        border-bottom: 1px solid #1E293B;
      ">
        <div style="display: flex; align-items: center; gap: 10px; overflow: hidden; ${isCollapsed ? 'display: none;' : ''}">
          <img src="./assets/impacteers-logo.png" alt="Impacteers Logo" style="height: 28px; width: auto; display: block; flex-shrink: 0;" />
          <div style="overflow: hidden;">
            <div style="font-size: 13.5px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.01em; white-space: nowrap; line-height: 1.1;">
              Impacteers DMS
            </div>
            <div style="font-size: 9.5px; color: #94A3B8; white-space: nowrap; margin-top: 2px;">Document Management System</div>
          </div>
        </div>
        ${
          isCollapsed
            ? `<img src="./assets/impacteers-logo.png" alt="Impacteers" style="height: 22px; width: auto; object-fit: contain;" />`
            : ''
        }

        <button id="sidebar-toggle-btn" style="
          background: transparent;
          border: 1px solid #334155;
          color: #94A3B8;
          border-radius: 6px;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 11px;
        ">
          ${isCollapsed ? '▶' : '◀'}
        </button>
      </div>

      <!-- Navigation Links -->
      <div style="flex: 1; overflow-y: auto; padding: 14px 10px; display: flex; flex-direction: column; gap: 4px;">
        ${navItems
          .map(item => {
            const isActive = activeRoute === item.route;
            return `
            <a href="#/${item.route}" class="nav-item ${isActive ? 'active' : ''}" style="
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 9px 12px;
              border-radius: 8px;
              color: ${isActive ? '#FFFFFF' : item.highlight ? '#60A5FA' : '#94A3B8'};
              background: ${isActive ? '#2563EB' : item.highlight ? 'rgba(37, 99, 235, 0.12)' : 'transparent'};
              text-decoration: none;
              font-size: 13.5px;
              font-weight: ${isActive || item.highlight ? '600' : '500'};
              transition: all 0.15s ease;
            " onmouseover="if(!${isActive}) { this.style.background='#1E293B'; this.style.color='#FFFFFF'; }"
               onmouseout="if(!${isActive}) { this.style.background='${item.highlight ? 'rgba(37, 99, 235, 0.12)' : 'transparent'}'; this.style.color='${item.highlight ? '#60A5FA' : '#94A3B8'}'; }">
              <span style="font-size: 16px; min-width: 22px; text-align: center;">${item.icon}</span>
              <span style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; ${isCollapsed ? 'display: none;' : ''}">
                ${item.label}
              </span>
              ${
                item.unread && item.unread > 0
                  ? `<span style="font-size: 10px; background: #DC2626; color: #FFFFFF; width: 18px; height: 18px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; font-weight: 700;">${item.unread}</span>`
                  : ''
              }
            </a>
          `;
          })
          .join('')}
      </div>

      <!-- User info in sidebar footer -->
      <div style="
        padding: 12px 14px;
        border-top: 1px solid #1E293B;
        background: #090D16;
        ${isCollapsed ? 'display: none;' : ''}
      ">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: #1E293B;
            color: #60A5FA;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          ">${user.avatar || 'U'}</div>
          <div style="flex: 1; overflow: hidden;">
            <div style="font-size: 12.5px; font-weight: 600; color: #F8FAFC; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${user.name}
            </div>
            <div style="font-size: 10.5px; color: #64748B; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${user.tagline || user.roleLabel}
            </div>
          </div>
        </div>
      </div>
    </aside>
  `;
}
