/**
 * Enterprise In-House Legal Management System
 * Centralized Legal Document Repository & Vault Service
 */

import { db } from '../db.js';
import { authService } from './authService.js';
import { auditService } from './auditService.js';

class DocumentService {
  /**
   * Get all documents accessible to the current user (Strict RBAC & Department Isolation)
   */
  getDocuments({
    departmentId = '',
    category = '',
    confidentialityLevel = '',
    status = '',
    search = '',
    isExecuted = null
  } = {}) {
    const user = authService.getCurrentUser();
    let docs = [...db.data.documents].filter(d => !d.isArchived);

    // Strict Service-Layer Authorization Filter
    docs = docs.filter(doc => authService.canAccessDocument(doc));

    if (departmentId) {
      docs = docs.filter(d => d.departmentId === departmentId);
    }
    if (category) {
      docs = docs.filter(d => d.category === category || d.documentType === category);
    }
    if (confidentialityLevel) {
      docs = docs.filter(d => d.confidentialityLevel === confidentialityLevel);
    }
    if (status) {
      docs = docs.filter(d => d.status === status);
    }
    if (isExecuted !== null) {
      docs = docs.filter(d => d.isExecuted === isExecuted);
    }
    if (search) {
      const q = search.toLowerCase();
      docs = docs.filter(
        d =>
          d.title.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.departmentName.toLowerCase().includes(q) ||
          (d.counterparty && d.counterparty.toLowerCase().includes(q))
      );
    }

    return docs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  getDocumentById(docId) {
    const doc = db.data.documents.find(d => d.id === docId && !d.isArchived);
    if (!doc) return null;

    if (!authService.canAccessDocument(doc)) {
      throw new Error(`Access Denied: You do not have permission to view ${doc.title}.`);
    }

    return doc;
  }

  /**
   * Upload a new document record or initial version
   */
  uploadDocument({
    title,
    documentType,
    category = 'Contracts',
    departmentId,
    linkedRequestId = null,
    confidentialityLevel = 'INTERNAL',
    counterparty = '',
    effectiveDate = null,
    expiryDate = null,
    fileName,
    fileType = 'application/pdf',
    fileSizeBytes = 2000000,
    changeDescription = 'Initial document upload'
  }) {
    const user = authService.getCurrentUser();
    const dept = db.data.departments.find(d => d.id === departmentId);
    if (!dept) throw new Error('Invalid department specified.');

    // Business users cannot upload for foreign departments
    if (!authService.isLegalTeam() && user.departmentId && user.departmentId !== departmentId) {
      throw new Error('You may only upload documents for your own department.');
    }

    const newDocId = `doc-${Date.now()}`;
    const newDoc = {
      id: newDocId,
      title: title.trim(),
      documentType,
      category,
      departmentId,
      departmentName: dept.name,
      linkedRequestId,
      confidentialityLevel,
      status: 'DRAFT',
      currentVersion: 1,
      counterparty: counterparty.trim(),
      effectiveDate,
      expiryDate,
      ownerName: user.name,
      isExecuted: false,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      versions: [
        {
          versionNumber: 1,
          fileName: fileName || `${title.replace(/\s+/g, '_')}_v1.pdf`,
          fileType,
          fileSizeBytes,
          uploadedBy: user.name,
          changeDescription: changeDescription.trim(),
          status: 'DRAFT',
          uploadedAt: new Date().toISOString()
        }
      ]
    };

    db.data.documents.unshift(newDoc);
    db.saveToStorage();

    auditService.log({
      action: 'UPLOAD_DOCUMENT',
      objectType: 'DOCUMENT',
      objectId: newDocId,
      previousValue: null,
      newValue: {
        title: newDoc.title,
        version: 1,
        department: dept.name,
        confidentiality: confidentialityLevel
      }
    });

    window.dispatchEvent(new CustomEvent('document:created', { detail: newDoc }));
    return newDoc;
  }

  /**
   * Upload a revised/reviewed version to an existing document
   */
  uploadNewVersion(docId, {
    fileName,
    fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    fileSizeBytes = 2500000,
    changeDescription,
    documentStatus = 'LEGAL_REVIEWED'
  }) {
    const doc = this.getDocumentById(docId);
    if (!doc) throw new Error('Document not found.');

    const user = authService.getCurrentUser();
    const nextVersionNumber = doc.versions.length + 1;

    const newVersion = {
      versionNumber: nextVersionNumber,
      fileName: fileName || `Document_v${nextVersionNumber}.docx`,
      fileType,
      fileSizeBytes,
      uploadedBy: user.name,
      changeDescription: changeDescription || `Version ${nextVersionNumber} upload`,
      status: documentStatus,
      uploadedAt: new Date().toISOString()
    };

    doc.versions.push(newVersion);
    doc.currentVersion = nextVersionNumber;
    doc.status = documentStatus;
    doc.updatedAt = new Date().toISOString();

    db.saveToStorage();

    auditService.log({
      action: 'UPLOAD_DOCUMENT_VERSION',
      objectType: 'DOCUMENT',
      objectId: doc.id,
      previousValue: { version: nextVersionNumber - 1 },
      newValue: {
        version: nextVersionNumber,
        fileName: newVersion.fileName,
        status: documentStatus
      }
    });

    window.dispatchEvent(new CustomEvent('document:updated', { detail: doc }));
    return doc;
  }

  /**
   * Soft delete / Archive a document
   */
  archiveDocument(docId, { reason = '' } = {}) {
    if (!authService.isLegalAdmin()) {
      throw new Error('Unauthorized: Only Legal Administrators can archive repository documents.');
    }

    const doc = this.getDocumentById(docId);
    if (!doc) throw new Error('Document not found.');

    doc.isArchived = true;
    doc.status = 'ARCHIVED';
    doc.updatedAt = new Date().toISOString();

    db.saveToStorage();

    auditService.log({
      action: 'ARCHIVE_DOCUMENT',
      objectType: 'DOCUMENT',
      objectId: doc.id,
      previousValue: { isArchived: false },
      newValue: { isArchived: true, reason }
    });

    window.dispatchEvent(new CustomEvent('document:archived', { detail: doc }));
    return doc;
  }

  /**
   * Generate simulated secure temporary signed download URL
   */
  generateSecureDownloadUrl(docId, versionNumber = null) {
    const doc = this.getDocumentById(docId);
    if (!doc) throw new Error('Document not found or unauthorized.');

    const v = versionNumber
      ? doc.versions.find(ver => ver.versionNumber === versionNumber)
      : doc.versions[doc.versions.length - 1];

    if (!v) throw new Error('Version not found.');

    // Log download event in immutable audit trail
    auditService.log({
      action: 'DOWNLOAD_DOCUMENT_VERSION',
      objectType: 'DOCUMENT_VERSION',
      objectId: `${doc.id}-v${v.versionNumber}`,
      previousValue: null,
      newValue: { fileName: v.fileName, version: v.versionNumber }
    });

    return {
      fileName: v.fileName,
      signedUrl: `https://secure-vault.enterprise.internal/storage/v1/signed/${encodeURIComponent(v.fileName)}?token=exp_${Date.now() + 900000}&auth=${doc.id}`,
      expiresInSeconds: 900
    };
  }

  /**
   * Add Document to Central Vault with Department Sharing Permissions (Monisha)
   */
  addVaultDocument({
    title,
    documentType,
    fileName,
    fileSize = '2.4 MB',
    sharingTarget = 'ALL_DEPTS', // 'SPECIFIC_DEPT', 'ALL_DEPTS', 'LEGAL_ONLY'
    targetDepartmentId = null,
    effectiveDate = null,
    status = 'Executed',
    remarks = ''
  }) {
    const user = authService.getCurrentUser();
    if (!authService.isLegalManager()) {
      throw new Error('Only the Legal Manager can upload documents to the central vault.');
    }
    if (!title || !documentType || !fileName) {
      throw new Error('Please fill in document title, type, and file.');
    }

    let deptId = 'ALL';
    let deptName = 'All Departments (Company-Wide)';

    if (sharingTarget === 'SPECIFIC_DEPT') {
      const dept = db.data.departments.find(d => d.id === targetDepartmentId);
      if (!dept) throw new Error('Please select a valid department to share with.');
      deptId = dept.id;
      deptName = dept.name;
    } else if (sharingTarget === 'LEGAL_ONLY') {
      deptId = 'LEGAL_ONLY';
      deptName = 'Confidential Legal Vault';
    }

    const docId = `doc-${Date.now()}`;
    const newDoc = {
      id: docId,
      title: title.trim(),
      documentType: documentType.trim(),
      category: documentType.trim(),
      departmentId: deptId,
      departmentName: deptName,
      status: status || 'Executed',
      fileName: fileName.trim(),
      fileSize: fileSize || '2.0 MB',
      uploadedBy: user.name,
      uploadedAt: new Date().toISOString(),
      updatedAt: effectiveDate || new Date().toISOString().split('T')[0],
      isFinal: true,
      isExecuted: status === 'Executed',
      isPrivilegedOnly: sharingTarget === 'LEGAL_ONLY',
      sharingTarget,
      remarks: remarks ? remarks.trim() : ''
    };

    db.data.documents.unshift(newDoc);
    db.saveToStorage();

    auditService.log({
      actorName: user.name,
      actorRole: user.roleLabel,
      action: 'VAULT_ADD_DOCUMENT',
      target: `${title} -> ${deptName}`
    });

    window.dispatchEvent(new CustomEvent('document:created', { detail: newDoc }));
    return newDoc;
  }
}

export const documentService = new DocumentService();
