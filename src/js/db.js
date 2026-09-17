/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Database Engine, Storage Store & Schema Migration
 */

import { DEPARTMENTS, DEMO_USERS, REQUEST_TYPES, USER_ROLES } from './constants.js';
import { dbFirestore } from './firebaseConfig.js';
import { collection, doc, setDoc, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore';

const DB_STORAGE_KEY = 'IMPACTEERS_DMS_STORE_V6_LIVE';

export class LegalDatabase {
  constructor() {
    // Clear all legacy and stale stores if present in browser
    try {
      const keysToPurge = [
        'IMPACTEERS_LEGAL_DOCS_STORE_V1',
        'IMPACTEERS_LEGAL_DOCS_STORE_V2',
        'IMPACTEERS_LEGAL_DOCS_STORE_V3',
        'IMPACTEERS_LEGAL_DOCS_STORE_V4',
        'IMPACTEERS_LEGAL_DOCS_STORE_V4_CLEAN',
        'IMPACTEERS_LEGAL_DOCS_STORE_V5_LIVE',
        'impacteers_dms_db'
      ];
      keysToPurge.forEach(k => localStorage.removeItem(k));
    } catch (e) {}

    this.data = this.loadFromStorage() || this.initializeSeedData();
    this.ensureSchema();
  }

  loadFromStorage() {
    try {
      const serialized = localStorage.getItem(DB_STORAGE_KEY);
      if (serialized) {
        return JSON.parse(serialized);
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using fresh clean initial state:', e);
    }
    return null;
  }

  saveToStorage() {
    try {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Could not save to localStorage:', e);
    }
  }

  async syncToFirestore(collectionName, docId, documentData) {
    try {
      if (!dbFirestore) return;
      
      const safeData = JSON.parse(JSON.stringify(documentData));
      
      if (safeData.attachedDocument && safeData.attachedDocument.dataUrl) {
        delete safeData.attachedDocument.dataUrl;
      }
      if (safeData.reviewedDocument && safeData.reviewedDocument.dataUrl) {
        delete safeData.reviewedDocument.dataUrl;
      }
      if (safeData.finalDocument && safeData.finalDocument.dataUrl) {
        delete safeData.finalDocument.dataUrl;
      }
      if (safeData.dataUrl) {
        delete safeData.dataUrl;
      }

      await setDoc(doc(dbFirestore, collectionName, docId), safeData);
      console.log(`Synced ${docId} to Firestore collection ${collectionName}`);
    } catch (e) {
      console.warn('Failed to sync to Firestore:', e.message);
    }
  }

  async deleteFromFirestore(collectionName, docId) {
    try {
      if (!dbFirestore) return;
      await deleteDoc(doc(dbFirestore, collectionName, docId));
      console.log(`Deleted ${docId} from Firestore collection ${collectionName}`);
    } catch (e) {
      console.warn(`Failed to delete ${docId} from Firestore:`, e.message);
    }
  }

  initRealtimeSync() {
    if (!dbFirestore) return;

    try {
      // 1. Real-time requests listener
      onSnapshot(collection(dbFirestore, 'requests'), (snapshot) => {
        const liveRequests = [];
        snapshot.forEach(d => {
          const item = d.data();
          if (item) liveRequests.push({ id: d.id, ...item });
        });
        this.data.requests = liveRequests;
        this.saveToStorage();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('request:updated'));
        }
      }, (err) => console.warn('Requests real-time sync notice:', err.message));

      // 2. Real-time documents listener
      onSnapshot(collection(dbFirestore, 'documents'), (snapshot) => {
        const liveDocs = [];
        snapshot.forEach(d => {
          const item = d.data();
          if (item) liveDocs.push({ id: d.id, ...item });
        });
        this.data.documents = liveDocs;
        this.saveToStorage();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('document:updated'));
        }
      }, (err) => console.warn('Documents real-time sync notice:', err.message));

      // 3. Real-time contracts listener
      onSnapshot(collection(dbFirestore, 'contracts'), (snapshot) => {
        const liveContracts = [];
        snapshot.forEach(d => {
          const item = d.data();
          if (item) liveContracts.push({ id: d.id, ...item });
        });
        this.data.contracts = liveContracts;
        this.saveToStorage();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('contract:updated'));
        }
      }, (err) => console.warn('Contracts real-time sync notice:', err.message));

      // 4. Real-time users listener
      onSnapshot(collection(dbFirestore, 'users'), (snapshot) => {
        const liveUsers = [];
        snapshot.forEach(d => {
          const uData = d.data();
          if (uData) liveUsers.push({ id: d.id, ...uData });
        });
        if (liveUsers.length > 0) {
          this.data.users = liveUsers;
          this.saveToStorage();
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('user:updated'));
          }
        }
      }, (err) => console.warn('Users real-time sync notice:', err.message));
    } catch (e) {
      console.warn('Real-time sync initialization skipped:', e);
    }
  }

  async fetchFromFirestore() {
    try {
      if (!dbFirestore) return;

      // 1. Fetch live requests from Firestore (source of truth)
      const reqSnapshot = await getDocs(collection(dbFirestore, 'requests'));
      const liveRequests = [];
      reqSnapshot.forEach(d => {
        const item = d.data();
        if (item) liveRequests.push({ id: d.id, ...item });
      });
      this.data.requests = liveRequests;

      // 2. Fetch live documents from Firestore (source of truth)
      try {
        const docSnapshot = await getDocs(collection(dbFirestore, 'documents'));
        const liveDocs = [];
        docSnapshot.forEach(d => {
          const item = d.data();
          if (item) liveDocs.push({ id: d.id, ...item });
        });
        this.data.documents = liveDocs;
      } catch (err) {
        console.warn('Documents collection fetch skipped:', err.message);
      }

      // 3. Fetch live contracts from Firestore (source of truth)
      try {
        const cntSnapshot = await getDocs(collection(dbFirestore, 'contracts'));
        const liveContracts = [];
        cntSnapshot.forEach(d => {
          const item = d.data();
          if (item) liveContracts.push({ id: d.id, ...item });
        });
        this.data.contracts = liveContracts;
      } catch (err) {
        console.warn('Contracts collection fetch skipped:', err.message);
      }

      // 4. Fetch live users from Firestore (source of truth)
      try {
        const usersSnapshot = await getDocs(collection(dbFirestore, 'users'));
        const liveUsers = [];
        usersSnapshot.forEach(d => {
          const uData = d.data();
          if (uData && (uData.email || uData.id)) {
            liveUsers.push({ id: d.id, ...uData });
          }
        });

        const currentSavedUser = (() => {
          try {
            const raw = localStorage.getItem('IMPACTEERS_AUTH_USER');
            return raw ? JSON.parse(raw) : null;
          } catch(e) { return null; }
        })();

        if (liveUsers.length > 0) {
          this.data.users = liveUsers;
          if (currentSavedUser) {
            const matched = this.data.users.find(
              u => (currentSavedUser.id && u.id === currentSavedUser.id) || (u.email && u.email.toLowerCase() === currentSavedUser.email?.toLowerCase())
            );
            if (matched) {
              localStorage.setItem('IMPACTEERS_AUTH_USER', JSON.stringify(matched));
            }
          }
        } else {
          // If Firestore users collection is empty/cleared, only keep active session user or minimal primary user
          if (currentSavedUser) {
            this.data.users = [currentSavedUser];
          } else {
            this.data.users = [...DEMO_USERS];
          }
        }
      } catch (err) {
        console.warn('Users collection fetch skipped:', err.message);
      }

      this.saveToStorage();
      console.log(`Successfully hydrated from Firestore. Requests: ${this.data.requests.length}, Documents: ${this.data.documents.length}, Contracts: ${this.data.contracts.length}, Users: ${this.data.users.length}`);
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('request:updated'));
        window.dispatchEvent(new CustomEvent('document:updated'));
        window.dispatchEvent(new CustomEvent('contract:updated'));
        window.dispatchEvent(new CustomEvent('user:updated'));
      }
    } catch(e) {
      console.warn('Failed to fetch from Firestore:', e.message);
    }
  }

  reset() {
    this.data = this.initializeSeedData();
    this.saveToStorage();
    return this.data;
  }

  resetToSeed() {
    return this.reset();
  }

  /**
   * Guarantees all tables/arrays exist and are clean & iterable
   */
  ensureSchema() {
    if (!this.data || typeof this.data !== 'object') {
      this.data = this.initializeSeedData();
    }
    if (!Array.isArray(this.data.contracts)) {
      this.data.contracts = [];
    }
    if (!Array.isArray(this.data.documents)) {
      this.data.documents = [];
    }
    if (!Array.isArray(this.data.requests)) {
      this.data.requests = [];
    }
    if (!Array.isArray(this.data.users)) {
      this.data.users = [...DEMO_USERS];
    }
    this.data.departments = [...DEPARTMENTS];
    if (!Array.isArray(this.data.notifications)) {
      this.data.notifications = [];
    }
    if (!Array.isArray(this.data.auditLogs)) {
      this.data.auditLogs = [];
    }
    if (!Array.isArray(this.data.comments)) {
      this.data.comments = [];
    }
    if (!Array.isArray(this.data.requestTypes)) {
      this.data.requestTypes = [
        { id: 'rt-1', name: 'Draft a Document', slaDays: 3 },
        { id: 'rt-2', name: 'Review a Document', slaDays: 3 },
        { id: 'rt-3', name: 'Verify a Document', slaDays: 2 },
        { id: 'rt-4', name: 'Legal Opinion', slaDays: 4 },
        { id: 'rt-5', name: 'Other', slaDays: 5 }
      ];
    }
    if (!Array.isArray(this.data.expiryAlertDays)) {
      this.data.expiryAlertDays = [90, 60, 30, 15, 7];
    }
    this.saveToStorage();
  }

  getDefaultContracts() {
    return [];
  }

  getDefaultDocuments() {
    return [];
  }

  initializeSeedData() {
    return {
      users: [...DEMO_USERS],
      departments: [...DEPARTMENTS],
      requestTypes: [
        { id: 'rt-1', name: 'Draft a Document', slaDays: 3 },
        { id: 'rt-2', name: 'Review a Document', slaDays: 3 },
        { id: 'rt-3', name: 'Verify a Document', slaDays: 2 },
        { id: 'rt-4', name: 'Legal Opinion', slaDays: 4 },
        { id: 'rt-5', name: 'Other', slaDays: 5 }
      ],
      expiryAlertDays: [90, 60, 30, 15, 7],
      requests: [],
      documents: [],
      contracts: [],
      notifications: [],
      auditLogs: [],
      comments: []
    };
  }
}

export const db = new LegalDatabase();
