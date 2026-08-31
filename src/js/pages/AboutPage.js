/**
 * Impacteers Legal docs
 * Simple About System Page
 */

export function renderAboutPage() {
  return `
    <div class="content-container" style="max-width: 720px;">
      <div class="enterprise-card" style="padding: 40px; text-align: center;">
        <img src="./assets/impacteers-logo.png" alt="Impacteers Logo" style="height: 54px; width: auto; display: block; margin: 0 auto 20px auto;" />
        <h1 style="font-size: 24px; font-weight: 800; color: #0F172A;">Impacteers DMS</h1>
        <div style="font-size: 13.5px; color: #64748B; font-weight: 600; margin-top: 4px;">Document Management System</div>
        <div style="font-size: 12px; color: #2563EB; font-weight: 600; margin-top: 2px;">Version 2026.8 • Enterprise Edition</div>
        
        <p style="font-size: 14px; color: #475569; line-height: 1.6; max-width: 520px; margin: 20px auto 28px auto;">
          Internal platform for managing legal review requests, document vetting, contract lifecycle management (CLM), and secure company legal documents.
        </p>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px; text-align: left; font-size: 13px; color: #334155; line-height: 1.6;">
          <div>🏢 <strong>Organization:</strong> Impacteers</div>
          <div>⚖️ <strong>Legal Operations Lead:</strong> Monisha (Legal Manager)</div>
          <div>🛡️ <strong>Security:</strong> Role-Based Access Control & Department Isolation</div>
          <div>📁 <strong>Storage:</strong> Centralized Repository with Version Tracking</div>
        </div>

        <div style="margin-top: 28px;">
          <a href="#/dashboard" class="btn btn-primary">Return to Dashboard</a>
        </div>
      </div>
    </div>
  `;
}
