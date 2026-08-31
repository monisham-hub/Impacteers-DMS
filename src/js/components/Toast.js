/**
 * Enterprise In-House Legal Management System
 * Toast Notification Utility
 */

export class Toast {
  static show(message, type = 'info', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
      <div style="font-weight: 700; font-size: 16px;">${icon}</div>
      <div style="flex: 1; line-height: 1.4;">${message}</div>
      <button style="background: none; border: none; color: #94A3B8; cursor: pointer; font-size: 14px;" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  static success(msg) { this.show(msg, 'success'); }
  static error(msg) { this.show(msg, 'error', 4500); }
  static info(msg) { this.show(msg, 'info'); }
}
