/**
 * Impacteers Legal docs
 * Modal Dialog Controller
 */

export class Modal {
  static open({ title, contentHtml, footerHtml = '', size = 'md', onClose = null }) {
    this.close(); // Close any currently open modal

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.id = 'active-modal-backdrop';

    const maxWidthMap = {
      sm: '460px',
      md: '600px',
      lg: '800px',
      xl: '1000px'
    };

    backdrop.innerHTML = `
      <div class="modal-content" style="max-width: ${maxWidthMap[size] || '600px'};" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3 style="font-size: 16px; font-weight: 700; color: #0F172A; letter-spacing: -0.01em; margin: 0;">${title}</h3>
          <button id="modal-close-btn" style="
            background: none;
            border: 1px solid #E2E8F0;
            border-radius: 6px;
            color: #64748B;
            font-size: 14px;
            cursor: pointer;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
          " onmouseover="this.style.background='#F1F5F9'; this.style.color='#0F172A';" onmouseout="this.style.background='none'; this.style.color='#64748B';">✕</button>
        </div>
        <div class="modal-body" id="modal-body-container">
          ${contentHtml}
        </div>
        ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
      </div>
    `;

    document.body.appendChild(backdrop);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Trigger animation
    requestAnimationFrame(() => backdrop.classList.add('open'));

    const handleClose = () => {
      document.body.style.overflow = '';
      backdrop.classList.remove('open');
      setTimeout(() => {
        if (backdrop.parentNode) backdrop.remove();
        if (onClose) onClose();
      }, 150);
    };

    backdrop.querySelector('#modal-close-btn').addEventListener('click', handleClose);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) handleClose();
    });

    const escListener = (e) => {
      if (e.key === 'Escape') {
        handleClose();
        document.removeEventListener('keydown', escListener);
      }
    };
    document.addEventListener('keydown', escListener);

    return {
      close: handleClose,
      container: backdrop.querySelector('#modal-body-container')
    };
  }

  static close() {
    document.body.style.overflow = '';
    const existing = document.getElementById('active-modal-backdrop');
    if (existing) {
      existing.classList.remove('open');
      setTimeout(() => {
        if (existing.parentNode) existing.remove();
      }, 150);
    }
  }
}

// Global modal close helper
window.activeModalClose = () => Modal.close();
