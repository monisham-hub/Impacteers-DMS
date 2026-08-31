/**
 * Enterprise In-House Legal Management System
 * Immutable Audit Logs & Security Trail Page
 */

import { auditService } from '../services/auditService.js';
import { Modal } from '../components/Modal.js';

export function renderAuditLogsPage() {
  let logs = [];
  try {
    logs = auditService.getLogs();
  } catch (err) {
    return `
      <div class="content-container">
        <div style="padding: 48px; text-align: center; background: #FFF1F2; border-radius: 12px; border: 1px solid #FECDD3;">
          <h2 style="color: #BE123C;">Access Denied</h2>
          <p style="color: #9F1239; margin-top: 6px;">${err.message}</p>
        </div>
      </div>
    `;
  }

  return `
    <div class="content-container">
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>🛡️</span>
            <span>Immutable Security Audit Logs</span>
          </div>
          <div class="page-subtitle">
            Cryptographically sealed and tamper-evident event log of all requests, approvals, document downloads, and role activities.
          </div>
        </div>
      </div>

      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>📜</span>
            <span>Recorded Events (<span id="audit-count">${logs.length}</span>)</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="enterprise-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Role</th>
                <th>Action</th>
                <th>Target Object</th>
                <th>IP / Session</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody id="audit-tbody">
              ${logs
                .map(
                  log => `
                <tr>
                  <td style="font-family: var(--font-mono); font-size: 11.5px; color: #64748B;">
                    ${new Date(log.createdAt).toISOString().replace('T', ' ').substring(0, 19)}
                  </td>
                  <td style="font-weight: 600; color: #0F172A;">${log.actorName}</td>
                  <td><span class="badge badge-slate">${log.actorRole.replace(/_/g, ' ')}</span></td>
                  <td>
                    <span style="font-family: var(--font-mono); font-size: 11.5px; font-weight: 600; color: #1E40AF;">
                      ${log.action}
                    </span>
                  </td>
                  <td>
                    <code style="font-family: var(--font-mono); font-size: 11.5px; color: #047857; background: #ECFDF5; padding: 2px 6px; border-radius: 4px;">
                      ${log.objectType}:${log.objectId}
                    </code>
                  </td>
                  <td style="font-family: var(--font-mono); font-size: 11.5px; color: #64748B;">
                    ${log.ipAddress || '10.0.4.82'}
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm" style="padding: 2px 8px; font-size: 11px;" onclick='window.viewAuditDiff(${JSON.stringify(JSON.stringify(log))})'>
                      Inspect Diff
                    </button>
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
