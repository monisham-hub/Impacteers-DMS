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
      const rawUser = localStorage.getItem('IMPACTEERS_AUTH_USER');
      if (rawUser) {
        const user = JSON.parse(rawUser);
        if (user && user.email) {
          const matched = db.data.users.find(
            u => (user.id && u.id === user.id) || (u.email && u.email.toLowerCase() === user.email.toLowerCase())
          );
          if (matched) {
            return matched;
          }
          return user;
        }
      }

      const savedId = localStorage.getItem('IMPACTEERS_AUTH_USER_ID');
      if (savedId) {
        const found = db.data.users.find(u => u.id === savedId);
        if (found) return found;
      }
    } catch (e) {
      console.warn('Could not load user from storage:', e);
    }
    return null;
  }

  isLoggedIn() {
    return Boolean(this.currentUser);
  }

  async login(userIdOrEmail, password) {
    // Attempt Firebase Auth
    const { signInWithEmailAndPassword, auth } = await import('../firebaseConfig.js');
    let firebaseUser;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, userIdOrEmail, password);
      firebaseUser = userCredential.user;
    } catch (e) {
      if (e.code === 'auth/invalid-credential' || e.code === 'auth/invalid-login-credentials' || e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
        throw new Error('Invalid email or password. Default demo password is test@123');
      } else if (e.code === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please wait a moment or try again later.');
      }
      throw new Error(e.message || 'Invalid credentials');
    }

    let user = db.data.users.find(
      u => u.email.toLowerCase() === userIdOrEmail.toLowerCase()
    );

    // Guaranteed Full Legal Manager Role for Monisha
    const isMonisha = userIdOrEmail.toLowerCase().includes('monisha');
    if (isMonisha) {
      const { USER_ROLES } = await import('../constants.js');
      if (!user) {
        user = {
          id: 'usr-monisha',
          name: 'Monisha',
          email: userIdOrEmail.toLowerCase(),
          role: USER_ROLES.LEGAL_MANAGER,
          roleLabel: 'Legal Manager',
          departmentId: null,
          departmentName: 'Legal Team',
          avatar: 'M',
          tagline: 'Legal Manager (Full Admin Access)',
          isActive: true,
          permissions: ['*']
        };
        db.data.users.unshift(user);
      } else {
        user.role = USER_ROLES.LEGAL_MANAGER;
        user.roleLabel = 'Legal Manager';
        user.departmentName = 'Legal Team';
        user.tagline = 'Legal Manager (Full Admin Access)';
        user.permissions = ['*'];
      }
      db.saveToStorage();
    } else if (!user && firebaseUser) {
      const { USER_ROLES } = await import('../constants.js');
      const namePart = (firebaseUser.displayName || userIdOrEmail.split('@')[0]);
      const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      user = {
        id: firebaseUser.uid || ('usr-' + Date.now().toString(36)),
        name: capitalizedName,
        email: (firebaseUser.email || userIdOrEmail).toLowerCase(),
        role: USER_ROLES.BUSINESS_USER,
        roleLabel: 'Business Stakeholder',
        departmentId: 'dept-engineering',
        departmentName: 'Engineering',
        avatar: capitalizedName.charAt(0).toUpperCase(),
        tagline: 'Team Stakeholder',
        isActive: true,
        permissions: []
      };
      db.data.users.push(user);
      db.saveToStorage();
    }

    if (!user) {
      throw new Error('User profile could not be loaded. Please contact an administrator.');
    }
    if (user.isActive === false) {
      throw new Error('This account has been deactivated. Please contact an administrator.');
    }
    this.currentUser = user;
    try {
      localStorage.setItem('IMPACTEERS_AUTH_USER', JSON.stringify(user));
      localStorage.setItem('IMPACTEERS_AUTH_USER_ID', user.id);
    } catch (e) {
      console.error(e);
    }
    db.syncToFirestore('users', user.id, user);
    this.logAudit('USER_LOGIN', `User signed in: ${user.email}`, user.id);
    window.dispatchEvent(new CustomEvent('auth:changed', { detail: user }));
    return user;
  }

  async signup({ name, email, password, departmentId }) {
    const { createUserWithEmailAndPassword, auth } = await import('../firebaseConfig.js');
    let firebaseUser;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      firebaseUser = userCredential.user;
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        throw new Error('An account with this email already exists. Please sign in instead.');
      } else if (e.code === 'auth/weak-password') {
        throw new Error('Password must be at least 6 characters long.');
      } else if (e.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      }
      throw new Error(e.message || 'Signup failed. Please try again.');
    }

    const { DEPARTMENTS, USER_ROLES } = await import('../constants.js');
    const dept = DEPARTMENTS.find(d => d.id === departmentId);

    const newUser = {
      id: firebaseUser.uid || ('usr-' + Date.now().toString(36)),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: USER_ROLES.BUSINESS_USER,
      roleLabel: dept ? `${dept.name} Team User` : 'Business Stakeholder',
      departmentId: dept ? dept.id : (departmentId || null),
      departmentName: dept ? dept.name : 'General',
      avatar: name.trim().charAt(0).toUpperCase() || 'U',
      tagline: dept ? `${dept.name} Team` : 'Stakeholder',
      isActive: true,
      permissions: []
    };

    const existingIndex = db.data.users.findIndex(u => u.email.toLowerCase() === newUser.email);
    if (existingIndex !== -1) {
      db.data.users[existingIndex] = { ...db.data.users[existingIndex], ...newUser };
    } else {
      db.data.users.push(newUser);
    }
    db.saveToStorage();

    this.currentUser = newUser;
    try {
      localStorage.setItem('IMPACTEERS_AUTH_USER', JSON.stringify(newUser));
      localStorage.setItem('IMPACTEERS_AUTH_USER_ID', newUser.id);
    } catch (e) {
      console.error(e);
    }
    db.syncToFirestore('users', newUser.id, newUser);
    this.logAudit('USER_SIGNUP', `New user registered via Firebase Auth: ${newUser.email}`, newUser.id);
    window.dispatchEvent(new CustomEvent('auth:changed', { detail: newUser }));
    return newUser;
  }

  async logout() {
    const { signOut, auth } = await import('../firebaseConfig.js');
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Logout error:', e);
    }
    
    this.currentUser = null;
    try {
      localStorage.removeItem('IMPACTEERS_AUTH_USER');
      localStorage.removeItem('IMPACTEERS_AUTH_USER_ID');
    } catch (e) {
      console.error(e);
    }
    window.dispatchEvent(new CustomEvent('auth:changed', { detail: null }));
  }

  async initAuth(callback) {
    // 1. Immediately invoke callback if session was already restored from localStorage
    if (this.currentUser && callback) {
      callback(this.currentUser);
    }

    const { onAuthStateChanged, auth } = await import('../firebaseConfig.js');
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        let user = db.data.users.find(u => u.email.toLowerCase() === firebaseUser.email.toLowerCase());
        if (!user) {
          const isMonisha = firebaseUser.email.toLowerCase().includes('monisha');
          user = {
            id: firebaseUser.uid || ('usr-' + Date.now().toString(36)),
            name: isMonisha ? 'Monisha' : (firebaseUser.displayName || firebaseUser.email.split('@')[0]),
            email: firebaseUser.email.toLowerCase(),
            role: isMonisha ? 'LEGAL_MANAGER' : 'BUSINESS_USER',
            roleLabel: isMonisha ? 'Legal Manager' : 'Business Stakeholder',
            departmentId: isMonisha ? null : 'dept-engineering',
            departmentName: isMonisha ? 'Legal Team' : 'Engineering',
            avatar: (isMonisha ? 'M' : firebaseUser.email.charAt(0)).toUpperCase(),
            tagline: isMonisha ? 'Legal Manager (Full Admin Access)' : 'Team Stakeholder',
            isActive: true,
            permissions: isMonisha ? ['*'] : []
          };
          db.data.users.push(user);
          db.saveToStorage();
          db.syncToFirestore('users', user.id, user);
        }
        this.currentUser = user;
        try {
          localStorage.setItem('IMPACTEERS_AUTH_USER', JSON.stringify(user));
          localStorage.setItem('IMPACTEERS_AUTH_USER_ID', user.id);
        } catch (e) {}
        if (callback) callback(this.currentUser);
      } else {
        // Only clear if localStorage has no active saved user session
        const hasSession = localStorage.getItem('IMPACTEERS_AUTH_USER');
        if (!hasSession) {
          this.currentUser = null;
          if (callback) callback(null);
        }
      }
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getAllUsers() {
    return db.data.users;
  }

  // ==========================================
  // USER MANAGEMENT (CRUD)
  // ==========================================

  addUser(userData) {
    if (!this.isLegalAdmin()) throw new Error('Unauthorized');
    
    // Check if email/username exists
    const exists = db.data.users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) throw new Error('A user with this email already exists.');

    const newUser = {
      id: 'usr-' + Date.now().toString(36),
      name: userData.name,
      email: userData.email,
      role: userData.role || USER_ROLES.BUSINESS_USER,
      roleLabel: userData.roleLabel || 'User',
      departmentId: userData.departmentId || null,
      departmentName: userData.departmentName || '',
      avatar: userData.name.charAt(0).toUpperCase(),
      tagline: userData.tagline || '',
      isActive: true,
      permissions: userData.permissions || []
    };

    db.data.users.push(newUser);
    db.saveToStorage();
    db.syncToFirestore('users', newUser.id, newUser);
    this.logAudit('ADD_USER', `Added new user ${newUser.email}`, newUser.id);
    return newUser;
  }

  updateUser(userId, updates) {
    if (!this.isLegalAdmin()) throw new Error('Unauthorized');
    
    const userIndex = db.data.users.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error('User not found.');

    const oldEmail = db.data.users[userIndex].email;
    const newEmail = updates.email ? updates.email.trim().toLowerCase() : oldEmail;

    // Check for email conflicts
    if (newEmail !== oldEmail.toLowerCase()) {
      const exists = db.data.users.find((u, i) => i !== userIndex && u.email.toLowerCase() === newEmail);
      if (exists) throw new Error(`A user with email '${newEmail}' already exists.`);
    }

    db.data.users[userIndex] = { ...db.data.users[userIndex], ...updates, email: newEmail };
    db.saveToStorage();
    
    // Carry forward to Firestore DB!
    db.syncToFirestore('users', userId, db.data.users[userIndex]);

    // If the edited user is currently logged in, sync the active session
    if (this.currentUser && (this.currentUser.id === userId || this.currentUser.email.toLowerCase() === oldEmail.toLowerCase())) {
      this.currentUser = { ...this.currentUser, ...db.data.users[userIndex] };
      try {
        localStorage.setItem('IMPACTEERS_AUTH_USER', JSON.stringify(this.currentUser));
        localStorage.setItem('IMPACTEERS_AUTH_USER_ID', this.currentUser.id);
      } catch (e) {}
    }

    this.logAudit('UPDATE_USER', `Updated user details for ${newEmail} (was: ${oldEmail})`, userId);
    return db.data.users[userIndex];
  }

  deleteUser(userId) {
    if (!this.isLegalAdmin()) throw new Error('Unauthorized');
    if (userId === this.currentUser.id) throw new Error('Cannot delete your own account.');

    const userIndex = db.data.users.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error('User not found.');

    const deletedEmail = db.data.users[userIndex].email;
    db.data.users.splice(userIndex, 1);
    db.saveToStorage();
    db.deleteFromFirestore('users', userId);
    this.logAudit('DELETE_USER', `Deleted user ${deletedEmail}`, userId);
  }

  logAudit(action, details, targetId = null) {
    if (!db.data.auditLogs) db.data.auditLogs = [];
    db.data.auditLogs.unshift({
      id: 'audit-' + Date.now(),
      actorId: this.currentUser ? this.currentUser.id : 'system',
      actorName: this.currentUser ? this.currentUser.name : 'System',
      action,
      details,
      targetId,
      timestamp: new Date().toISOString()
    });
    db.saveToStorage();
  }

  // ==========================================
  // ROLE HELPERS
  // ==========================================

  isLegalAdmin() {
    return this.currentUser && (this.currentUser.role === USER_ROLES.LEGAL_ADMIN || this.currentUser.role === USER_ROLES.LEGAL_MANAGER || this.currentUser.role === USER_ROLES.CHAIRMAN);
  }

  isLegalManager() {
    return this.currentUser && (this.currentUser.role === USER_ROLES.LEGAL_MANAGER || this.currentUser.role === USER_ROLES.LEGAL_ADMIN);
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
