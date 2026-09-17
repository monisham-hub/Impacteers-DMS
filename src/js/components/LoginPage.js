/**
 * Impacteers LMS — Legal Management System
 * World-Class Centered Login & Stakeholder Selection Page
 * Designed with senior UI/UX aesthetics, glassmorphism, and responsive centering
 */

import { DEPARTMENTS } from '../constants.js';

export function renderLoginPage() {
  const deptOptionsHtml = DEPARTMENTS.map(
    d => `<option value="${d.id}">${d.name} (${d.description})</option>`
  ).join('');

  return `
    <div style="
      min-height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 10%, #1E293B 0%, #0F172A 70%, #020617 100%);
      padding: 32px 16px;
      box-sizing: border-box;
      position: fixed;
      inset: 0;
      overflow-y: auto;
    ">
      
      <!-- Glowing Ambient Background Accents -->
      <div style="
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 480px;
        height: 480px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(37, 99, 235, 0) 70%);
        pointer-events: none;
        filter: blur(40px);
      "></div>

      <!-- Centered Glassmorphic Card -->
      <div style="
        position: relative;
        width: 100%;
        max-width: 490px;
        background: rgba(255, 255, 255, 0.98);
        border: 1px solid rgba(255, 255, 255, 0.8);
        border-radius: 20px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.2);
        padding: 36px 32px;
        box-sizing: border-box;
        margin: auto;
        animation: loginCardFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        
        <!-- Header & Logo -->
        <div style="text-align: center; margin-bottom: 22px;">
          <div style="display: inline-block; margin-bottom: 10px;">
            <img src="./assets/impacteers-logo.png" alt="Impacteers Logo" style="height: 50px; width: auto; display: block; margin: 0 auto;" />
          </div>
          
          <h1 style="font-size: 23px; font-weight: 800; color: #0F172A; letter-spacing: -0.02em; margin: 0 0 4px 0;">
            Impacteers DMS
          </h1>
          
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 4px;">
            <span style="font-size: 13px; color: #64748B; font-weight: 500;">
              Document Management System
            </span>
            <span style="font-size: 10px; font-weight: 700; color: #2563EB; background: #EFF6FF; border: 1px solid #DBEAFE; padding: 1px 6px; border-radius: 4px;">
              Enterprise Suite
            </span>
          </div>
        </div>

        <!-- Auth Tabs (Sign In / Sign Up) -->
        <div style="
          display: flex;
          background: #F1F5F9;
          padding: 4px;
          border-radius: 12px;
          margin-bottom: 22px;
          gap: 4px;
        ">
          <button 
            type="button" 
            id="tab-btn-signin"
            style="
              flex: 1;
              padding: 9px 12px;
              border: none;
              border-radius: 8px;
              font-size: 13.5px;
              font-weight: 700;
              cursor: pointer;
              background: #FFFFFF;
              color: #1E293B;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              transition: all 0.2s ease;
            "
          >
            Sign In
          </button>
          <button 
            type="button" 
            id="tab-btn-signup"
            style="
              flex: 1;
              padding: 9px 12px;
              border: none;
              border-radius: 8px;
              font-size: 13.5px;
              font-weight: 600;
              cursor: pointer;
              background: transparent;
              color: #64748B;
              transition: all 0.2s ease;
            "
          >
            Create Account
          </button>
        </div>

        <!-- 1. Sign In Form -->
        <form id="login-form">
          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label" style="font-size: 12.5px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.04em;">
              Email or Username
            </label>
            <div style="position: relative;">
              <input 
                type="email" 
                id="login-email" 
                class="form-input" 
                placeholder="name@impacteers.club" 
                style="padding: 11px 14px 11px 36px; font-size: 13.5px; border-radius: 10px; border: 1.5px solid #CBD5E1;" 
                value="" 
                required 
              />
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #94A3B8;">✉️</span>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label class="form-label" style="font-size: 12.5px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.04em; margin: 0;">
                Password
              </label>
              <a href="javascript:void(0)" onclick="alert('Please contact your system administrator or use the Reset Password feature.')" style="font-size: 12px; color: #2563EB; text-decoration: none; font-weight: 600;">
                Forgot Password?
              </a>
            </div>
            <div style="position: relative;">
              <input 
                type="password" 
                id="login-password" 
                class="form-input" 
                placeholder="Enter your password" 
                style="padding: 11px 14px 11px 36px; font-size: 13.5px; border-radius: 10px; border: 1.5px solid #CBD5E1;" 
                value="" 
                required 
              />
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #94A3B8;">🔒</span>
            </div>
          </div>

          <button 
            type="submit" 
            id="login-submit-btn"
            class="btn btn-primary" 
            style="
              width: 100%; 
              padding: 12px; 
              font-size: 14px; 
              font-weight: 700; 
              border-radius: 10px; 
              background: linear-gradient(135deg, #2563EB, #1D4ED8);
              box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
              border: none;
              cursor: pointer;
            "
          >
            Sign In to Workspace
          </button>

          <div style="text-align: center; margin-top: 18px; font-size: 13px; color: #64748B;">
            Don't have an account? 
            <a href="javascript:void(0)" id="switch-to-signup-link" style="color: #2563EB; font-weight: 700; text-decoration: none; margin-left: 4px;">
              Sign up here
            </a>
          </div>
        </form>

        <!-- 2. Sign Up Form -->
        <form id="signup-form" style="display: none;">
          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label" style="font-size: 12px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.04em;">
              Full Name <span style="color: #EF4444;">*</span>
            </label>
            <div style="position: relative;">
              <input 
                type="text" 
                id="signup-name" 
                class="form-input" 
                placeholder="e.g. Alex Johnson" 
                style="padding: 10px 14px 10px 36px; font-size: 13px; border-radius: 10px; border: 1.5px solid #CBD5E1;" 
                required 
              />
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #94A3B8;">👤</span>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label" style="font-size: 12px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.04em;">
              Work Email <span style="color: #EF4444;">*</span>
            </label>
            <div style="position: relative;">
              <input 
                type="email" 
                id="signup-email" 
                class="form-input" 
                placeholder="e.g. alex@impacteers.club" 
                style="padding: 10px 14px 10px 36px; font-size: 13px; border-radius: 10px; border: 1.5px solid #CBD5E1;" 
                required 
              />
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #94A3B8;">✉️</span>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label" style="font-size: 12px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.04em;">
              Department <span style="color: #EF4444;">*</span>
            </label>
            <div style="position: relative;">
              <select 
                id="signup-department" 
                class="form-select"
                style="padding: 10px 14px 10px 36px; font-size: 13px; border-radius: 10px; border: 1.5px solid #CBD5E1;"
                required
              >
                ${deptOptionsHtml}
              </select>
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #94A3B8;">🏢</span>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label" style="font-size: 12px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.04em;">
              Password (min. 6 characters) <span style="color: #EF4444;">*</span>
            </label>
            <div style="position: relative;">
              <input 
                type="password" 
                id="signup-password" 
                class="form-input" 
                placeholder="••••••••" 
                minlength="6"
                style="padding: 10px 14px 10px 36px; font-size: 13px; border-radius: 10px; border: 1.5px solid #CBD5E1;" 
                required 
              />
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #94A3B8;">🔒</span>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label" style="font-size: 12px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.04em;">
              Confirm Password <span style="color: #EF4444;">*</span>
            </label>
            <div style="position: relative;">
              <input 
                type="password" 
                id="signup-confirm-password" 
                class="form-input" 
                placeholder="••••••••" 
                minlength="6"
                style="padding: 10px 14px 10px 36px; font-size: 13px; border-radius: 10px; border: 1.5px solid #CBD5E1;" 
                required 
              />
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #94A3B8;">🔑</span>
            </div>
          </div>

          <button 
            type="submit" 
            id="signup-submit-btn"
            class="btn btn-primary" 
            style="
              width: 100%; 
              padding: 12px; 
              font-size: 14px; 
              font-weight: 700; 
              border-radius: 10px; 
              background: linear-gradient(135deg, #10B981, #059669);
              box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
              border: none;
              cursor: pointer;
            "
          >
            Create Workspace Account
          </button>

          <div style="text-align: center; margin-top: 18px; font-size: 13px; color: #64748B;">
            Already have an account? 
            <a href="javascript:void(0)" id="switch-to-signin-link" style="color: #2563EB; font-weight: 700; text-decoration: none; margin-left: 4px;">
              Sign in here
            </a>
          </div>
        </form>

      </div>

    </div>
  `;
}
