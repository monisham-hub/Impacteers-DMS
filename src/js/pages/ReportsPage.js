/**
 * Enterprise In-House Legal Management System
 * Reports & Legal Operations Analytics Page
 */

import { reportService } from '../services/reportService.js';
import { Toast } from '../components/Toast.js';

export function renderReportsPage() {
  const metrics = reportService.getMetrics();

  return `
    <div class="content-container">
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>📈</span>
            <span>Legal Operations & Workload Analytics</span>
          </div>
          <div class="page-subtitle">
            Executive metrics on turnaround times, department demand, contract portfolio value, and counsel workload.
          </div>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary btn-sm" onclick="window.exportReportCsv('requests')">
            <span>📥 Export Requests CSV</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.exportReportCsv('contracts')">
            <span>📥 Export Contracts CSV</span>
          </button>
        </div>
      </div>

      <!-- Top Summary Metrics Grid -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Average Turnaround Time</span>
            <div class="kpi-icon-wrapper" style="background: #EFF6FF; color: #1D4ED8;">⚡</div>
          </div>
          <div class="kpi-value">${metrics.averageTurnaroundDays} <span style="font-size: 16px; font-weight: 500; color: #64748B;">days</span></div>
          <div class="kpi-subtext">Target SLA: 5.0 days</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Total Active Portfolio</span>
            <div class="kpi-icon-wrapper" style="background: #ECFDF5; color: #047857;">💰</div>
          </div>
          <div class="kpi-value">$${(metrics.totalContractValue / 1000000).toFixed(2)}M</div>
          <div class="kpi-subtext">Across ${metrics.activeContracts} active agreements</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Total Requests Handled</span>
            <div class="kpi-icon-wrapper" style="background: #FAF5FF; color: #6B21A8;">📂</div>
          </div>
          <div class="kpi-value">${metrics.totalRequests}</div>
          <div class="kpi-subtext">${metrics.completed} successfully executed</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Reschedule Rate</span>
            <div class="kpi-icon-wrapper" style="background: #FFFBEB; color: #B45309;">⏱️</div>
          </div>
          <div class="kpi-value">${Math.round((metrics.rescheduled / (metrics.totalRequests || 1)) * 100)}%</div>
          <div class="kpi-subtext">${metrics.rescheduled} requests rescheduled</div>
        </div>
      </div>

      <!-- Analytics Breakdown Grids -->
      <div class="grid-2-col">
        
        <!-- Department Workload Table -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>🏢</span>
              <span>Demand by Business Department</span>
            </div>
          </div>
          <div class="table-responsive">
            <table class="enterprise-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Open Requests</th>
                  <th>Active Contracts</th>
                  <th>Portfolio Value</th>
                </tr>
              </thead>
              <tbody>
                ${metrics.departmentDistribution
                  .map(
                    d => `
                  <tr>
                    <td style="font-weight: 600;">${d.name}</td>
                    <td style="color: #2563EB; font-weight: 700;">${d.openRequests}</td>
                    <td style="color: #047857; font-weight: 700;">${d.activeContracts}</td>
                    <td style="font-family: var(--font-mono); font-size: 12px;">$${d.contractValue.toLocaleString()}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Legal Counsel Workload & Capacity -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>⚖️</span>
              <span>Legal Counsel Active Workload</span>
            </div>
          </div>
          <div style="padding: 20px;">
            ${metrics.legalWorkload
              .map(
                counsel => `
              <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #F1F5F9;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <div>
                    <strong style="font-size: 14px; color: #0F172A;">${counsel.name}</strong>
                    <div style="font-size: 11.5px; color: #64748B;">${counsel.title}</div>
                  </div>
                  <span class="badge badge-blue">${counsel.activeCases} Active Matters</span>
                </div>
                <div style="background: #E2E8F0; border-radius: 9999px; height: 8px; overflow: hidden; margin-top: 8px;">
                  <div style="background: #2563EB; height: 100%; width: ${Math.min(counsel.activeCases * 25, 100)}%;"></div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}
