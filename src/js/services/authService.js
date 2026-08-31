/**
 * Impacteers Legal docs
 * Authentication & Role-Based Access Control Service
 */

import { DEMO_USERS, USER_ROLES } from '../constants.js';
import { db } from '../db.js';

class AuthService {
  constructor() {
    this.currentUser = this.loadCurrentUser();
  }

  loadCurrentUser() {
    try {
      const savedId = localStorage.getItem('IMPACTEERS_AUTH_USER_ID');
      if (savedId) {
        const found = db.data.users.find(u => u.id === savedId);
        if (found) return found;
      }
    } catch (e) {
      console.warn('Could not load user:', e);
    }
    // Default to Edwin (HR) for instant business test, or Monisha
    return DEMO_USERS[0]; // Monisha (Legal Manager)
  }

  isLoggedIn() {
    return Boolean(this.currentUser);
  }

  login(userIdOrEmail) {
    const user = db.data.users.find(
      u => u.id === userIdOrEmail || u.email.toLowerCase() === userIdOrEmail.toLowerCase()
    );
    if (!user) {
      throw new Error('User not found. Please select an authorized account.');
    }
    this.currentUser = user;
    try {
      localStorage.setItem('IMPACTEERS_AUTH_USER_ID', user.id);
    } catch (e) {
      console.error(e);
    }
    window.dispatchEvent(new CustomEvent('auth:changed', { detail: user }));
    return user;
  }

  logout() {
    this.currentUser = null;
    try {
      localStorage.removeItem('IMPACTEERS_AUTH_USER_ID');
    } catch (e) {
      console.error(e);
    }
    window.dispatchEvent(new CustomEvent('auth:changed', { detail: null }));
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getAllUsers() {
    return db.data.users;
  }

  // ==========================================
  // ROLE HELPERS
  // ==========================================

  isLegalManager() {
    return this.currentUser && this.currentUser.role === USER_ROLES.LEGAL_MANAGER;
  }

  isLegalTeam() {
    return this.isLegalManager();
  }

  isChairman() {
    return this.currentUser && this.currentUser.role === USER_ROLES.CHAIRMAN;
  }

  isBusinessUser() {
    return this.currentUser && this.currentUser.role === USER_ROLES.BUSINESS_USER;
  }

  /**
   * Check if user can view internal legal remarks
   */
  canViewInternalNotes() {
    return this.isLegalManager();
  }

  /**
   * Check if user can perform editing/workflow mutation
   */
  canMutate() {
    // Chairman is strictly VIEW-ONLY
    if (this.isChairman()) return false;
    return true;
  }

  /**
   * Check if user can access a department
   */
  canAccessDepartment(departmentId) {
    if (!this.currentUser) return false;
    if (this.isLegalManager() || this.isChairman()) return true;
    return this.currentUser.departmentId === departmentId;
  }

  /**
   * Check access to a document
   */
  canAccessDocument(doc) {
    if (!this.currentUser || !doc) return false;
    if (this.isLegalManager() || this.isChairman()) return true;
    if (doc.departmentId === 'LEGAL_ONLY' || doc.isPrivilegedOnly) return false;
    if (doc.departmentId === 'ALL') return true;
    if (doc.sharedWithDeptIds && doc.sharedWithDeptIds.includes(this.currentUser.departmentId)) return true;
    return this.currentUser.departmentId === doc.departmentId;
  }

  /**
   * Check access to a request
   */
  canAccessRequest(req) {
    if (!this.currentUser || !req) return false;
    if (this.isLegalManager() || this.isChairman()) return true;
    return this.currentUser.departmentId === req.departmentId || this.currentUser.id === req.requestorId;
  }
}

export const authService = new AuthService();
