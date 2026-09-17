/**
 * Impacteers Legal docs
 * Simple Request Creation Page with Priority & Urgency
 */

import { authService } from '../services/authService.js';
import { REQUEST_TYPES, REQUEST_PRIORITIES } from '../constants.js';

export function renderCreateRequestPage() {
  const user = authService.getCurrentUser();
  const deptName = user.departmentName || 'Department';

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 3);
  const defaultDate = nextWeek.toISOString().split('T')[0];

  return `
    <div class="content-container" style="max-width: 800px;">
      <!-- Header -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
          ➕ Create Legal Request
        </h1>
        <p style="font-size: 13.5px; color: #64748B; margin-top: 4px;">
          Submit a document review, drafting, or verification request to <strong>Monisha (Legal Manager)</strong>.
        </p>
      </div>

      <!-- Creation Form Card -->
      <div class="enterprise-card" style="padding: 28px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
        <form id="simple-create-request-form">
          
          <!-- 1. What do you need from Legal? -->
          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label" style="font-size: 13.5px; font-weight: 600; color: #0F172A;">
              1. What do you need from Legal? <span class="required">*</span>
            </label>
            <select id="req-type-select" class="form-select" style="font-size: 14px; padding: 10px 14px;" required>
              ${REQUEST_TYPES.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>

          <!-- 2. Request Title -->
          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label" style="font-size: 13.5px; font-weight: 600; color: #0F172A;">
              2. Request Title <span class="required">*</span>
            </label>
            <input type="text" id="req-title-input" class="form-input" placeholder="e.g. Review ${deptName} Vendor Agreement" style="font-size: 14px; padding: 10px 14px;" required />
          </div>

          <!-- 3. Urgency & Priority Level -->
          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label" style="font-size: 13.5px; font-weight: 600; color: #0F172A;">
              3. Priority & Urgency Level <span class="required">*</span>
            </label>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px;" id="priority-selector-grid">
              
              <label style="border: 1px solid #FECDD3; background: #FFF1F2; border-radius: 8px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 8px; cursor: pointer;">
                <input type="radio" name="req-priority" value="IMMEDIATE" style="margin-top: 3px;" />
                <div>
                  <div style="font-size: 12.5px; font-weight: 700; color: #BE123C;">🚨 Immediate Action Required</div>
                  <div style="font-size: 11px; color: #9F1239; margin-top: 2px;">Critical / Blocker</div>
                </div>
              </label>

              <label style="border: 1px solid #FED7AA; background: #FFF7ED; border-radius: 8px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 8px; cursor: pointer;">
                <input type="radio" name="req-priority" value="HIGH" style="margin-top: 3px;" />
                <div>
                  <div style="font-size: 12.5px; font-weight: 700; color: #C2410C;">🔥 High Priority</div>
                  <div style="font-size: 11px; color: #9A3412; margin-top: 2px;">Urgent business need</div>
                </div>
              </label>

              <label style="border: 1px solid #BFDBFE; background: #F0F9FF; border-radius: 8px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 8px; cursor: pointer;">
                <input type="radio" name="req-priority" value="MEDIUM" style="margin-top: 3px;" checked />
                <div>
                  <div style="font-size: 12.5px; font-weight: 700; color: #1D4ED8;">⚡ Standard Priority</div>
                  <div style="font-size: 11px; color: #1E40AF; margin-top: 2px;">Normal workflow</div>
                </div>
              </label>

              <label style="border: 1px solid #E2E8F0; background: #F8FAFC; border-radius: 8px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 8px; cursor: pointer;">
                <input type="radio" name="req-priority" value="LOW" style="margin-top: 3px;" />
                <div>
                  <div style="font-size: 12.5px; font-weight: 700; color: #475569;">🌱 Low Priority / Flexible</div>
                  <div style="font-size: 11px; color: #64748B; margin-top: 2px;">Leisure / No rush</div>
                </div>
              </label>

            </div>
          </div>

          <!-- 4. Required By Date -->
          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label" style="font-size: 13.5px; font-weight: 600; color: #0F172A;">
              4. Required By Date <span class="required">*</span>
            </label>
            <input type="date" id="req-date-input" class="form-input" value="${defaultDate}" style="font-size: 14px; padding: 10px 14px; max-width: 260px;" required />
            <div class="form-hint" style="font-size: 12px; color: #64748B; margin-top: 4px;">Target completion date required for business deadlines.</div>
          </div>

          <!-- 5. Description -->
          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label" style="font-size: 13.5px; font-weight: 600; color: #0F172A;">
              5. Description & Specific Instructions <span class="required">*</span>
            </label>
            <textarea id="req-desc-input" class="form-textarea" placeholder="Describe the business background, key focus areas, non-standard terms, or specific clauses needing legal review..." style="font-size: 13.5px; min-height: 100px;" required></textarea>
          </div>

          <!-- 6. Upload Document (Optional) -->
          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label" style="font-size: 13.5px; font-weight: 600; color: #0F172A;">
              6. Upload Document <span style="font-size: 11.5px; color: #64748B; font-weight: 400;">(Optional)</span>
            </label>
            <div style="
              border: 2px dashed #CBD5E1;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              background: #F8FAFC;
              cursor: pointer;
            " onclick="document.getElementById('req-doc-file').click()">
              <span style="font-size: 28px;">📄</span>
              <div style="font-size: 13.5px; font-weight: 600; color: #1E293B; margin-top: 6px;">Click to select agreement or draft file</div>
              <div style="font-size: 11.5px; color: #64748B;">Supported: PDF, DOCX, DOC, XLSX, TXT (Optional)</div>
              <input type="file" id="req-doc-file" style="display: none;" onchange="
                if (this.files[0]) {
                  document.getElementById('file-preview-name').innerText = 'Selected: ' + this.files[0].name + ' (' + Math.round(this.files[0].size/1024) + ' KB)';
                  document.getElementById('file-preview-name').style.display = 'block';
                }
              " />
              <div id="file-preview-name" style="display: none; font-size: 12.5px; color: #2563EB; font-weight: 600; margin-top: 8px;"></div>
            </div>
          </div>

          <!-- 7. Additional Comment (Optional) -->
          <div class="form-group" style="margin-bottom: 28px;">
            <label class="form-label" style="font-size: 13.5px; font-weight: 600; color: #0F172A;">
              7. Additional Comments <span style="font-size: 11.5px; color: #64748B; font-weight: 400;">(Optional)</span>
            </label>
            <input type="text" id="req-comment-input" class="form-input" placeholder="Any urgent notes or internal team remarks..." style="font-size: 13.5px; padding: 10px 14px;" />
          </div>

          <!-- Submit Button -->
          <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <a href="#/dashboard" class="btn btn-secondary">Cancel</a>
            <button type="submit" class="btn btn-primary btn-lg" style="font-weight: 600; padding: 10px 24px;">
              Send Request to Legal →
            </button>
          </div>

        </form>
      </div>
    </div>
  `;
}
