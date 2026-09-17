/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Database Engine, Storage Store & Schema Migration
 */

import { DEPARTMENTS, DEMO_USERS, REQUEST_TYPES, USER_ROLES } from './constants.js';
import { dbFirestore } from './firebaseConfig.js';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

const DB_STORAGE_KEY = 'IMPACTEERS_LEGAL_DOCS_STORE_V4_CLEAN';

export class LegalDatabase {
  constructor() {
    // Clear legacy v1, v2, v3 stores if present in browser
    try {
      localStorage.removeItem('IMPACTEERS_LEGAL_DOCS_STORE_V1');
      localStorage.removeItem('IMPACTEERS_LEGAL_DOCS_STORE_V2');
      localStorage.removeItem('IMPACTEERS_LEGAL_DOCS_STORE_V3');
      localStorage.removeItem('impacteers_dms_db');
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
      
      // Deep clone to safely mutate and strip out large base64 dataUrls
      // Firebase throws "invalid nested entity" or "payload exceeds limit" for giant strings
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
      console.error('Failed to sync to Firestore:', e);
      alert('Firestore Sync Error: ' + e.message + '\n\nCheck your Firestore Security Rules in the Firebase Console! They are likely denying writes.');
    }
  }

  async fetchFromFirestore() {
    try {
      if (!dbFirestore) return;
      const reqSnapshot = await getDocs(collection(dbFirestore, 'requests'));
      const requests = [];
      reqSnapshot.forEach(doc => requests.push(doc.data()));
      
      if (requests.length > 0) {
        // Merge with local data or overwrite. We'll overwrite for simplicity if cloud has data
        this.data.requests = requests;
        this.saveToStorage();
        console.log('Successfully hydrated from Firestore');
      }
    } catch(e) {
      console.error('Failed to fetch from Firestore', e);
      alert('Firestore Fetch Error: ' + e.message + '\n\nCheck your Firestore Security Rules in the Firebase Console! They are likely denying reads.');
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
    if (!Array.isArray(this.data.departments)) {
      this.data.departments = [...DEPARTMENTS];
    }
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
