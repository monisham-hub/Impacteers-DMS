/**
 * Impacteers LMS — Legal Management System
 * World-Class Centered Login & Stakeholder Selection Page
 * Designed with senior UI/UX aesthetics, glassmorphism, and responsive centering
 */

import { DEMO_USERS } from '../constants.js';
import { authService } from '../services/authService.js';
import { Toast } from './Toast.js';

export function renderLoginPage() {
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
        width: 450px;
        height: 450px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(37, 99, 235, 0) 70%);
        pointer-events: none;
        filter: blur(40px);
      "></div>

      <!-- Centered Glassmorphic Card -->
      <div style="
        position: relative;
        width: 100%;
        max-width: 480px;
        background: rgba(255, 255, 255, 0.98);
        border: 1px solid rgba(255, 255, 255, 0.8);
        border-radius: 20px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.2);
        padding: 40px 36px;
        box-sizing: border-box;
        margin: auto;
        animation: loginCardFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        
        <!-- Header & Logo -->
        <div style="text-align: center; margin-bottom: 26px;">
          <div style="display: inline-block; margin-bottom: 12px;">
            <img src="./assets/impacteers-logo.png" alt="Impacteers Logo" style="height: 52px; width: auto; display: block; margin: 0 auto;" />
          </div>
          
          <h1 style="font-size: 24px; font-weight: 800; color: #0F172A; letter-spacing: -0.02em; margin: 0 0 4px 0;">
            Impacteers DMS
          </h1>
          
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 4px;">
            <span style="font-size: 13.5px; color: #64748B; font-weight: 500;">
              Document Management System
            </span>
            <span style="font-size: 10px; font-weight: 700; color: #2563EB; background: #EFF6FF; border: 1px solid #DBEAFE; padding: 1px 6px; border-radius: 4px;">
              Enterprise Suite
            </span>
          </div>
        </div>

        <!-- Login Form -->
        <form id="login-form">
          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label" style="font-size: 12.5px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.04em;">
              Email or Username
            </label>
            <div style="position: relative;">
              <input 
                type="text" 
                id="login-email" 
                class="form-input" 
                placeholder="e.g. monisha@impacteers.club" 
                style="padding: 11px 14px 11px 36px; font-size: 13.5px; border-radius: 10px; border: 1.5px solid #CBD5E1;" 
                value="monisha@impacteers.club" 
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
              <a href="javascript:void(0)" onclick="alert('Please select any demo stakeholder role below to sign in instantly.')" style="font-size: 12px; color: #2563EB; text-decoration: none; font-weight: 600;">
                Forgot Password?
              </a>
            </div>
            <div style="position: relative;">
              <input 
                type="password" 
                id="login-password" 
                class="form-input" 
                placeholder="••••••••" 
                style="padding: 11px 14px 11px 36px; font-size: 13.5px; border-radius: 10px; border: 1.5px solid #CBD5E1;" 
                value="password123" 
                required 
              />
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #94A3B8;">🔒</span>
            </div>
          </div>

          <button 
            type="submit" 
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
        </form>

        <!-- Quick Demo Stakeholder Selector -->
        <div style="margin-top: 26px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #64748B; text-align: center; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span>⚡</span>
            <span>1-Click Stakeholder Demo Logins</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button 
              class="demo-role-btn" 
              onclick="window.quickLogin('usr-monisha')"
              title="Legal Manager with Full Access"
            >
              <span style="font-size: 16px;">👩‍⚖️</span>
              <div style="text-align: left; overflow: hidden;">
                <div style="font-weight: 700; font-size: 12px; color: #0F172A;">Monisha</div>
                <div style="font-size: 10px; color: #2563EB; font-weight: 600;">Legal Manager</div>
              </div>
            </button>

            <button 
              class="demo-role-btn" 
              onclick="window.quickLogin('usr-chairman')"
              title="Executive View-Only Transparency"
            >
              <span style="font-size: 16px;">🏛️</span>
              <div style="text-align: left; overflow: hidden;">
                <div style="font-weight: 700; font-size: 12px; color: #0F172A;">Chairman</div>
                <div style="font-size: 10px; color: #64748B; font-weight: 600;">Executive View</div>
              </div>
            </button>

            <button 
              class="demo-role-btn" 
              onclick="window.quickLogin('usr-bala')"
              title="Staffing Department"
            >
              <span style="font-size: 16px;">👔</span>
              <div style="text-align: left; overflow: hidden;">
                <div style="font-weight: 700; font-size: 12px; color: #0F172A;">Bala</div>
                <div style="font-size: 10px; color: #64748B; font-weight: 600;">Staffing Lead</div>
              </div>
            </button>

            <button 
              class="demo-role-btn" 
              onclick="window.quickLogin('usr-edwin')"
              title="HR Department"
            >
              <span style="font-size: 16px;">👥</span>
              <div style="text-align: left; overflow: hidden;">
                <div style="font-weight: 700; font-size: 12px; color: #0F172A;">Edwin</div>
                <div style="font-size: 10px; color: #64748B; font-weight: 600;">HR Head</div>
              </div>
            </button>

            <button 
              class="demo-role-btn" 
              onclick="window.quickLogin('usr-musthafa')"
              title="IT Department"
            >
              <span style="font-size: 16px;">💻</span>
              <div style="text-align: left; overflow: hidden;">
                <div style="font-weight: 700; font-size: 12px; color: #0F172A;">Musthafa</div>
                <div style="font-size: 10px; color: #64748B; font-weight: 600;">IT Lead</div>
              </div>
            </button>

            <button 
              class="demo-role-btn" 
              onclick="window.quickLogin('usr-vinoth')"
              title="Engineering Department"
            >
              <span style="font-size: 16px;">⚙️</span>
              <div style="text-align: left; overflow: hidden;">
                <div style="font-weight: 700; font-size: 12px; color: #0F172A;">Vinoth</div>
                <div style="font-size: 10px; color: #64748B; font-weight: 600;">Engineering</div>
              </div>
            </button>

            <button 
              class="demo-role-btn" 
              onclick="window.quickLogin('usr-swami')"
              title="Product Department"
            >
              <span style="font-size: 16px;">📱</span>
              <div style="text-align: left; overflow: hidden;">
                <div style="font-weight: 700; font-size: 12px; color: #0F172A;">Swami</div>
                <div style="font-size: 10px; color: #64748B; font-weight: 600;">Product Lead</div>
              </div>
            </button>

            <button 
              class="demo-role-btn" 
              onclick="window.quickLogin('usr-muzammil')"
              title="Courses Department"
            >
              <span style="font-size: 16px;">🎓</span>
              <div style="text-align: left; overflow: hidden;">
                <div style="font-weight: 700; font-size: 12px; color: #0F172A;">Muzammil</div>
                <div style="font-size: 10px; color: #64748B; font-weight: 600;">Courses Lead</div>
              </div>
            </button>
          </div>
        </div>

      </div>

    </div>
  `;
}
