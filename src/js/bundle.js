(function() {
  'use strict';

// === File: src\js\constants.js ===
/**
 * Impacteers Legal docs
 * Constants & Role Definitions
 */

const USER_ROLES = {
  LEGAL_MANAGER: 'LEGAL_MANAGER',
  CHAIRMAN: 'CHAIRMAN',
  BUSINESS_USER: 'BUSINESS_USER'
};

const REQUEST_STATUSES = {
  PENDING_ACCEPTANCE: { label: 'Pending Acceptance', color: 'indigo', badgeClass: 'badge-blue' },
  ACCEPTED: { label: 'Accepted', color: 'blue', badgeClass: 'badge-blue' },
  RESCHEDULED: { label: 'Rescheduled', color: 'amber', badgeClass: 'badge-amber' },
  UNDER_LEGAL_REVIEW: { label: 'Under Legal Review', color: 'purple', badgeClass: 'badge-purple' },
  BUSINESS_ACTION_REQUIRED: { label: 'Business Action Required', color: 'orange', badgeClass: 'badge-orange' },
  FINAL_DOCUMENT_REQUIRED: { label: 'Final Document Required', color: 'teal', badgeClass: 'badge-blue' },
  COMPLETED: { label: 'Completed', color: 'green', badgeClass: 'badge-green' },
  REJECTED: { label: 'Rejected', color: 'rose', badgeClass: 'badge-rose' }
};

const REQUEST_TYPES = [
  'Draft a Document',
  'Review a Document',
  'Verify a Document',
  'Legal Opinion',
  'Other'
];

const REQUEST_PRIORITIES = {
  IMMEDIATE: { id: 'IMMEDIATE', label: 'Immediate Action Required', badgeClass: 'badge-rose', icon: 'ðŸš¨' },
  HIGH: { id: 'HIGH', label: 'High Priority', badgeClass: 'badge-orange', icon: 'ðŸ”¥' },
  MEDIUM: { id: 'MEDIUM', label: 'Standard Priority', badgeClass: 'badge-blue', icon: 'âš¡' },
  LOW: { id: 'LOW', label: 'Low Priority / Flexible', badgeClass: 'badge-slate', icon: 'ðŸŒ±' }
};

const DEPARTMENTS = [
  { id: 'dept-hr', code: 'HR', name: 'HR', description: 'Human Resources & Employment Agreements' },
  { id: 'dept-it', code: 'IT', name: 'IT', description: 'Information Technology, Cloud & Software Licensing' },
  { id: 'dept-engineering', code: 'ENGINEERING', name: 'Engineering', description: 'Software Development & Technical Compliance' },
  { id: 'dept-product', code: 'PRODUCT', name: 'Product', description: 'Product Specifications & IP Agreements' },
  { id: 'dept-staffing', code: 'STAFFING', name: 'Staffing', description: 'Recruitment & Vendor Staffing MSAs' },
  { id: 'dept-finance', code: 'FINANCE', name: 'Finance', description: 'Finance, Banking & Treasury Agreements' },
  { id: 'dept-courses', code: 'COURSES', name: 'Courses', description: 'Curriculum Licensing & Content Agreements' },
  { id: 'dept-campus', code: 'CAMPUS', name: 'Campus', description: 'University Tie-ups & Academic MOUs' },
  { id: 'dept-institutions', code: 'INSTITUTIONS', name: 'Institutions', description: 'Institutional Training Partnerships' },
  { id: 'dept-marketing', code: 'MARKETING', name: 'Marketing', description: 'Marketing Agencies, Influencers & Brand' }
];

const DEMO_USERS = [
  {
    id: 'usr-monisha',
    name: 'Monisha',
    email: 'monisha@impacteers.club',
    role: USER_ROLES.LEGAL_MANAGER,
    roleLabel: 'Legal Manager',
    departmentId: null,
    departmentName: 'Legal Team',
    avatar: 'M',
    tagline: 'Legal Manager'
  },
  {
    id: 'usr-chairman',
    name: 'Chairman',
    email: 'chairman@impacteers.club',
    role: USER_ROLES.CHAIRMAN,
    roleLabel: 'Chairman',
    departmentId: null,
    departmentName: 'Executive Office',
    avatar: 'C',
    tagline: 'Chairman (View-Only)'
  },
  {
    id: 'usr-edwin',
    name: 'Edwin',
    email: 'edwin@impacteers.club',
    role: USER_ROLES.BUSINESS_USER,
    roleLabel: 'HR Team User',
    departmentId: 'dept-hr',
    departmentName: 'HR',
    avatar: 'E',
    tagline: 'HR Team'
  },
  {
    id: 'usr-musthafa',
    name: 'Musthafa',
    email: 'musthafa@impacteers.club',
    role: USER_ROLES.BUSINESS_USER,
    roleLabel: 'IT Team User',
    departmentId: 'dept-it',
    departmentName: 'IT',
    avatar: 'M',
    tagline: 'IT Team'
  },
  {
    id: 'usr-vinoth',
    name: 'Vinoth',
    email: 'vinoth@impacteers.club',
    role: USER_ROLES.BUSINESS_USER,
    roleLabel: 'Engineering Team User',
    departmentId: 'dept-engineering',
    departmentName: 'Engineering',
    avatar: 'V',
    tagline: 'Engineering Team'
  },
  {
    id: 'usr-swami',
    name: 'Swami',
    email: 'swami@impacteers.club',
    role: USER_ROLES.BUSINESS_USER,
    roleLabel: 'Product Team User',
    departmentId: 'dept-product',
    departmentName: 'Product',
    avatar: 'S',
    tagline: 'Product Team'
  },
  {
    id: 'usr-bala',
    name: 'Bala',
    email: 'bala@impacteers.club',
    role: USER_ROLES.BUSINESS_USER,
    roleLabel: 'Staffing Team User',
    departmentId: 'dept-staffing',
    departmentName: 'Staffing',
    avatar: 'B',
    tagline: 'Staffing Team'
  },
  {
    id: 'usr-prem',
    name: 'Prem',
    email: 'prem@impacteers.club',
    role: USER_ROLES.BUSINESS_USER,
    roleLabel: 'Finance Team User',
    departmentId: 'dept-finance',
    departmentName: 'Finance',
    avatar: 'P',
    tagline: 'Finance Team'
  },
  {
    id: 'usr-muzammil',
    name: 'Muzammil',
    email: 'muzammil@impacteers.club',
    role: USER_ROLES.BUSINESS_USER,
    roleLabel: 'Courses Team Head',
    departmentId: 'dept-courses',
    departmentName: 'Courses',
    avatar: 'M',
    tagline: 'Courses Team'
  },
  {
    id: 'usr-campus',
    name: 'Campus Lead',
    email: 'campus@impacteers.club',
    role: USER_ROLES.BUSINESS_USER,
    roleLabel: 'Campus Team User',
    departmentId: 'dept-campus',
    departmentName: 'Campus',
    avatar: 'C',
    tagline: 'Campus Team'
  },
  {
    id: 'usr-institutions',
    name: 'Institutions Lead',
    email: 'institutions@impacteers.club',
    role: USER_ROLES.BUSINESS_USER,
    roleLabel: 'Institutions Team User',
    departmentId: 'dept-institutions',
    departmentName: 'Institutions',
    avatar: 'I',
    tagline: 'Institutions Team'
  },
  {
    id: 'usr-marketing',
    name: 'Marketing Lead',
    email: 'marketing@impacteers.club',
    role: USER_ROLES.BUSINESS_USER,
    roleLabel: 'Marketing Team User',
    departmentId: 'dept-marketing',
    departmentName: 'Marketing',
    avatar: 'M',
    tagline: 'Marketing Team'
  }
];

// === File: src\js\db.js ===
/**
 * Impacteers DMS â€” Enterprise In-House Legal & Document Management System
 * Database Engine, Storage Store & Schema Migration
 */


const DB_STORAGE_KEY = 'IMPACTEERS_LEGAL_DOCS_STORE_V3';

class LegalDatabase {
  constructor() {
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
      console.warn('Could not read from localStorage, using memory seed:', e);
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

  reset() {
    this.data = this.initializeSeedData();
    this.saveToStorage();
    return this.data;
  }

  resetToSeed() {
    return this.reset();
  }

  /**
   * Guarantees all tables/arrays exist and are iterable even when loading old browser localStorage
   */
  ensureSchema() {
    if (!this.data || typeof this.data !== 'object') {
      this.data = this.initializeSeedData();
    }
    if (!Array.isArray(this.data.contracts)) {
      this.data.contracts = this.getDefaultContracts();
    }
    if (!Array.isArray(this.data.documents)) {
      this.data.documents = this.getDefaultDocuments();
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
    return [
      {
        id: 'cnt-001',
        contractId: 'CNT-2026-0001',
        name: 'AWS Enterprise Cloud Services Agreement',
        contractType: 'Agreement',
        departmentId: 'dept-it',
        departmentName: 'IT',
        counterparty: 'Amazon Web Services Inc.',
        companyEntity: 'Impacteers Inc.',
        effectiveDate: '2026-01-01',
        expiryDate: '2026-12-31',
        renewalDate: '2026-11-30',
        contractValue: 450000,
        currency: 'USD',
        paymentTerms: 'Net 30 Days',
        noticePeriodDays: 60,
        terminationClause: '60 days written notice for convenience; immediate termination upon material breach.',
        ownerId: 'usr-musthafa',
        ownerName: 'Musthafa',
        legalOwnerId: 'usr-monisha',
        legalOwnerName: 'Monisha',
        status: 'ACTIVE',
        linkedRequestId: 'req-0013',
        executedDocumentId: 'doc-it-01',
        notes: 'Standard enterprise cloud terms verified by Monisha.',
        isArchived: false,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'cnt-002',
        contractId: 'CNT-2026-0002',
        name: 'TalentBridge Global Staffing Framework MSA',
        contractType: 'Agreement',
        departmentId: 'dept-staffing',
        departmentName: 'Staffing',
        counterparty: 'TalentBridge Staffing Inc.',
        companyEntity: 'Impacteers Inc.',
        effectiveDate: '2026-03-01',
        expiryDate: '2026-09-15',
        renewalDate: '2026-08-15',
        contractValue: 180000,
        currency: 'USD',
        paymentTerms: 'Net 30 Days',
        noticePeriodDays: 30,
        terminationClause: '30 days prior written notice for convenience.',
        ownerId: 'usr-bala',
        ownerName: 'Bala',
        legalOwnerId: 'usr-monisha',
        legalOwnerName: 'Monisha',
        status: 'EXPIRING_SOON',
        linkedRequestId: 'req-0015',
        executedDocumentId: 'doc-staffing-01',
        notes: 'Non-solicitation clause scaled to 12 months.',
        isArchived: false,
        createdAt: '2026-03-01T00:00:00.000Z',
        updatedAt: '2026-08-25T00:00:00.000Z'
      },
      {
        id: 'cnt-003',
        contractId: 'CNT-2026-0003',
        name: 'Stripe Merchant Processing Agreement',
        contractType: 'Agreement',
        departmentId: 'dept-finance',
        departmentName: 'Finance',
        counterparty: 'Stripe Payments LLC',
        companyEntity: 'Impacteers Inc.',
        effectiveDate: '2026-02-01',
        expiryDate: '2027-02-01',
        renewalDate: '2027-01-01',
        contractValue: 95000,
        currency: 'USD',
        paymentTerms: 'Net 30 Days',
        noticePeriodDays: 30,
        terminationClause: 'Standard payment provider terms with statutory interest waiver.',
        ownerId: 'usr-prem',
        ownerName: 'Prem',
        legalOwnerId: 'usr-monisha',
        legalOwnerName: 'Monisha',
        status: 'ACTIVE',
        linkedRequestId: null,
        executedDocumentId: 'doc-fin-01',
        notes: 'PCI-DSS and DPA compliance addenda executed.',
        isArchived: false,
        createdAt: '2026-02-01T00:00:00.000Z',
        updatedAt: '2026-02-01T00:00:00.000Z'
      },
      {
        id: 'cnt-004',
        contractId: 'CNT-2026-0004',
        name: 'University Curriculum Alliance MOU',
        contractType: 'MOU',
        departmentId: 'dept-courses',
        departmentName: 'Courses',
        counterparty: 'Global Tech University Alliance',
        companyEntity: 'Impacteers Inc.',
        effectiveDate: '2026-04-01',
        expiryDate: '2026-09-30',
        renewalDate: '2026-08-30',
        contractValue: 120000,
        currency: 'USD',
        paymentTerms: 'Net 30 Days',
        noticePeriodDays: 45,
        terminationClause: 'Mutual notice with student cohort completion transition period.',
        ownerId: 'usr-muzammil',
        ownerName: 'Muzammil',
        legalOwnerId: 'usr-monisha',
        legalOwnerName: 'Monisha',
        status: 'EXPIRING_SOON',
        linkedRequestId: null,
        executedDocumentId: 'doc-courses-01',
        notes: 'Academic courseware co-branding agreement.',
        isArchived: false,
        createdAt: '2026-04-01T00:00:00.000Z',
        updatedAt: '2026-04-01T00:00:00.000Z'
      },
      {
        id: 'cnt-005',
        contractId: 'CNT-2026-0005',
        name: 'Open Source Software Integration NDA',
        contractType: 'NDA',
        departmentId: 'dept-engineering',
        departmentName: 'Engineering',
        counterparty: 'DevCore Systems LLC',
        companyEntity: 'Impacteers Inc.',
        effectiveDate: '2026-01-15',
        expiryDate: '2029-01-15',
        renewalDate: null,
        contractValue: 0,
        currency: 'USD',
        paymentTerms: 'N/A',
        noticePeriodDays: 30,
        terminationClause: '3 years confidential obligation; trade secrets indefinite.',
        ownerId: 'usr-vinoth',
        ownerName: 'Vinoth',
        legalOwnerId: 'usr-monisha',
        legalOwnerName: 'Monisha',
        status: 'ACTIVE',
        linkedRequestId: null,
        executedDocumentId: 'doc-eng-01',
        notes: 'Standard bilateral NDA executed.',
        isArchived: false,
        createdAt: '2026-01-15T00:00:00.000Z',
        updatedAt: '2026-01-15T00:00:00.000Z'
      }
    ];
  }

  getDefaultDocuments() {
    return [
      {
        id: 'doc-hr-01',
        title: 'Master Employee NDA Template',
        documentType: 'NDA',
        departmentId: 'dept-hr',
        departmentName: 'HR',
        status: 'Executed',
        fileName: 'Master_Employee_Confidentiality_NDA_v2.pdf',
        fileSize: '840 KB',
        uploadedBy: 'Edwin',
        updatedAt: '2026-08-25',
        linkedRequestId: null,
        isFinal: true
      },
      {
        id: 'doc-hr-02',
        title: 'Consultant Agreement',
        documentType: 'Agreement',
        departmentId: 'dept-hr',
        departmentName: 'HR',
        status: 'Under Review',
        fileName: 'HR_Senior_Advisor_Consultant_Agreement.docx',
        fileSize: '1.4 MB',
        uploadedBy: 'Edwin',
        updatedAt: '2026-08-24',
        linkedRequestId: 'req-0012',
        isFinal: false
      },
      {
        id: 'doc-hr-03',
        title: 'HR MOU',
        documentType: 'MOU',
        departmentId: 'dept-hr',
        departmentName: 'HR',
        status: 'Executed',
        fileName: 'HR_Training_Partnership_MOU_Final.pdf',
        fileSize: '3.2 MB',
        uploadedBy: 'Edwin',
        updatedAt: '2026-08-20',
        linkedRequestId: null,
        isFinal: true
      },
      {
        id: 'doc-it-01',
        title: 'Cloud Infrastructure Master Agreement',
        documentType: 'Agreement',
        departmentId: 'dept-it',
        departmentName: 'IT',
        status: 'Executed',
        fileName: 'AWS_Enterprise_Cloud_MSA_Final.pdf',
        fileSize: '4.1 MB',
        uploadedBy: 'Musthafa',
        updatedAt: '2026-08-21',
        linkedRequestId: null,
        isFinal: true
      },
      {
        id: 'doc-staffing-01',
        title: 'Staffing TalentBridge Framework MSA',
        documentType: 'Agreement',
        departmentId: 'dept-staffing',
        departmentName: 'Staffing',
        status: 'Executed',
        fileName: 'Executed_TalentBridge_Staffing_MSA_Final.pdf',
        fileSize: '3.1 MB',
        uploadedBy: 'Bala',
        updatedAt: '2026-08-25',
        linkedRequestId: 'req-0015',
        isFinal: true
      },
      {
        id: 'doc-courses-01',
        title: 'University Certification Curriculum MOU',
        documentType: 'MOU',
        departmentId: 'dept-courses',
        departmentName: 'Courses',
        status: 'Executed',
        fileName: 'University_Curriculum_Alliance_MOU_Final.pdf',
        fileSize: '2.5 MB',
        uploadedBy: 'Muzammil',
        updatedAt: '2026-08-22',
        linkedRequestId: null,
        isFinal: true
      },
      {
        id: 'doc-fin-01',
        title: 'Payment Gateway Merchant Agreement',
        documentType: 'Agreement',
        departmentId: 'dept-finance',
        departmentName: 'Finance',
        status: 'Executed',
        fileName: 'Stripe_Merchant_Processing_Agreement_Final.pdf',
        fileSize: '1.8 MB',
        uploadedBy: 'Prem',
        updatedAt: '2026-08-18',
        linkedRequestId: null,
        isFinal: true
      },
      {
        id: 'doc-eng-01',
        title: 'Open Source Software Integration NDA',
        documentType: 'NDA',
        departmentId: 'dept-engineering',
        departmentName: 'Engineering',
        status: 'Executed',
        fileName: 'Engineering_Vendor_NDA_Executed.pdf',
        fileSize: '950 KB',
        uploadedBy: 'Vinoth',
        updatedAt: '2026-08-15',
        linkedRequestId: null,
        isFinal: true
      }
    ];
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
      requests: [
        {
          id: 'req-0012',
          requestId: 'LEG-2026-0012',
          title: 'Review HR Vendor Agreement',
          requestType: 'Review a Document',
          departmentId: 'dept-hr',
          departmentName: 'HR',
          requestorId: 'usr-edwin',
          requestorName: 'Edwin',
          requestorRole: 'HR Team',
          assignedLegalId: 'usr-monisha',
          assignedLegalName: 'Monisha',
          status: 'PENDING_ACCEPTANCE',
          requiredByDate: '2026-08-28',
          currentDueDate: '2026-08-28',
          description: 'Please review the attached HR vendor agreement for recruiter sourcing software. Kindly verify clause 7 on data privacy and liability caps.',
          attachedDocument: {
            name: 'HR_Vendor_Agreement.pdf',
            size: '2.4 MB',
            uploadedAt: '2026-08-27T10:00:00.000Z'
          },
          rescheduleProposal: null,
          rescheduleHistory: [],
          legalRemarks: [],
          reviewedDocument: null,
          finalDocument: null,
          createdAt: '2026-08-27T10:00:00.000Z',
          updatedAt: '2026-08-27T10:00:00.000Z'
        },
        {
          id: 'req-0013',
          requestId: 'LEG-2026-0013',
          title: 'IT Cloud Services Agreement Verification',
          requestType: 'Verify a Document',
          departmentId: 'dept-it',
          departmentName: 'IT',
          requestorId: 'usr-musthafa',
          requestorName: 'Musthafa',
          requestorRole: 'IT Team',
          assignedLegalId: 'usr-monisha',
          assignedLegalName: 'Monisha',
          status: 'UNDER_LEGAL_REVIEW',
          requiredByDate: '2026-08-30',
          currentDueDate: '2026-08-30',
          description: 'Multi-region enterprise cloud infrastructure agreement with AWS. Need confirmation on uptime SLA penalties and data migration clauses.',
          attachedDocument: {
            name: 'AWS_Cloud_Agreement_Draft.pdf',
            size: '3.8 MB',
            uploadedAt: '2026-08-26T14:30:00.000Z'
          },
          rescheduleProposal: null,
          rescheduleHistory: [],
          legalRemarks: [
            {
              id: 'rem-1',
              authorId: 'usr-monisha',
              authorName: 'Monisha (Legal Manager)',
              authorRole: 'LEGAL_MANAGER',
              comment: 'Reviewed clause 4.2. SLA uptime credit multiplier increased to 15%. Awaiting final confirmation on audit rights clause.',
              timestamp: '2026-08-27T11:15:00.000Z'
            }
          ],
          reviewedDocument: null,
          finalDocument: null,
          createdAt: '2026-08-26T14:30:00.000Z',
          updatedAt: '2026-08-27T11:15:00.000Z'
        },
        {
          id: 'req-0014',
          requestId: 'LEG-2026-0014',
          title: 'Campus Recruitment Drive MOU with Tech University',
          requestType: 'Draft a Document',
          departmentId: 'dept-campus',
          departmentName: 'Campus',
          requestorId: 'usr-muzammil',
          requestorName: 'Muzammil',
          requestorRole: 'Campus Lead',
          assignedLegalId: 'usr-monisha',
          assignedLegalName: 'Monisha',
          status: 'ACCEPTED',
          requiredByDate: '2026-08-29',
          currentDueDate: '2026-08-29',
          description: 'Standard 2-year university recruitment MOU including internship provisions and campus hackathon sponsorship.',
          attachedDocument: {
            name: 'Campus_MOU_Draft_v1.docx',
            size: '1.2 MB',
            uploadedAt: '2026-08-27T09:00:00.000Z'
          },
          rescheduleProposal: null,
          rescheduleHistory: [],
          legalRemarks: [],
          reviewedDocument: null,
          finalDocument: null,
          createdAt: '2026-08-27T09:00:00.000Z',
          updatedAt: '2026-08-27T09:30:00.000Z'
        },
        {
          id: 'req-0015',
          requestId: 'LEG-2026-0015',
          title: 'TalentBridge Staffing Master Services Agreement',
          requestType: 'Review a Document',
          departmentId: 'dept-staffing',
          departmentName: 'Staffing',
          requestorId: 'usr-bala',
          requestorName: 'Bala',
          requestorRole: 'Staffing Lead',
          assignedLegalId: 'usr-monisha',
          assignedLegalName: 'Monisha',
          status: 'FINAL_DOCUMENT_REQUIRED',
          requiredByDate: '2026-08-25',
          currentDueDate: '2026-08-25',
          description: 'Staffing provider MSA for engineering contractors. Legal review completed and redlined version approved.',
          attachedDocument: {
            name: 'TalentBridge_Staffing_MSA.pdf',
            size: '2.9 MB',
            uploadedAt: '2026-08-22T10:00:00.000Z'
          },
          rescheduleProposal: null,
          rescheduleHistory: [],
          legalRemarks: [
            {
              id: 'rem-2',
              authorId: 'usr-monisha',
              authorName: 'Monisha (Legal Manager)',
              authorRole: 'LEGAL_MANAGER',
              comment: 'Redlines approved. Please upload final executed copy signed by both parties to close the ticket.',
              timestamp: '2026-08-24T16:00:00.000Z'
            }
          ],
          reviewedDocument: {
            name: 'TalentBridge_Staffing_MSA_Legal_Redlines.docx',
            size: '3.1 MB',
            uploadedAt: '2026-08-24T15:45:00.000Z'
          },
          finalDocument: null,
          createdAt: '2026-08-22T10:00:00.000Z',
          updatedAt: '2026-08-24T16:00:00.000Z'
        },
        {
          id: 'req-0016',
          requestId: 'LEG-2026-0016',
          title: 'Marketing Agency Creative Retainer Contract',
          requestType: 'Review a Document',
          departmentId: 'dept-marketing',
          departmentName: 'Marketing',
          requestorId: 'usr-arun',
          requestorName: 'Arun',
          requestorRole: 'Marketing Team',
          assignedLegalId: 'usr-monisha',
          assignedLegalName: 'Monisha',
          status: 'RESCHEDULED',
          requiredByDate: '2026-08-26',
          currentDueDate: '2026-09-02',
          description: 'Quarterly creative agency retainer contract for social media and performance marketing.',
          attachedDocument: {
            name: 'Marketing_Retainer_Contract.pdf',
            size: '1.9 MB',
            uploadedAt: '2026-08-25T14:00:00.000Z'
          },
          rescheduleProposal: null,
          rescheduleHistory: [
            {
              proposedBy: 'Monisha',
              proposedDate: '2026-09-02',
              reason: 'Heavy contract workload due to Q3 enterprise cloud renegotiations. Extended review window needed.',
              status: 'ACCEPTED',
              proposedAt: '2026-08-25T15:30:00.000Z',
              decidedAt: '2026-08-25T16:00:00.000Z'
            }
          ],
          legalRemarks: [],
          reviewedDocument: null,
          finalDocument: null,
          createdAt: '2026-08-25T14:00:00.000Z',
          updatedAt: '2026-08-25T16:00:00.000Z'
        }
      ],
      documents: this.getDefaultDocuments(),
      contracts: this.getDefaultContracts(),
      notifications: [
        {
          id: 'notif-1',
          userId: 'usr-monisha',
          title: 'New Request Received',
          message: 'Edwin (HR) submitted LEG-2026-0012: "Review HR Vendor Agreement".',
          linkUrl: '#/requests/req-0012',
          isRead: false,
          createdAt: '2026-08-27T10:00:00.000Z'
        },
        {
          id: 'notif-2',
          userId: 'usr-edwin',
          title: 'Legal Update',
          message: 'Your request LEG-2026-0012 has been delivered to Monisha (Legal Manager).',
          linkUrl: '#/requests/req-0012',
          isRead: false,
          createdAt: '2026-08-27T10:00:00.000Z'
        }
      ],
      auditLogs: [
        {
          id: 'aud-1',
          actorName: 'Edwin',
          actorRole: 'HR Team User',
          action: 'CREATE_REQUEST',
          target: 'LEG-2026-0012',
          timestamp: '2026-08-27T10:00:00.000Z'
        },
        {
          id: 'aud-2',
          actorName: 'Monisha',
          actorRole: 'Legal Manager',
          action: 'ACCEPT_REQUEST',
          target: 'LEG-2026-0013',
          timestamp: '2026-08-27T08:30:00.000Z'
        }
      ]
    };
  }
}

const db = new LegalDatabase();

// === File: src\js\services\authService.js ===
/**
 * Impacteers Legal docs
 * Authentication & Role-Based Access Control Service
 */


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

const authService = new AuthService();

// === File: src\js\services\notificationService.js ===
/**
 * Enterprise In-House Legal Management System
 * Notification Center Service
 */


class NotificationService {
  /**
   * Send notification to a specific user
   */
  send({ userId, title, message, category = 'GENERAL', linkUrl = '' }) {
    const notif = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      title,
      message,
      category,
      linkUrl,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    db.data.notifications.unshift(notif);
    db.saveToStorage();

    window.dispatchEvent(new CustomEvent('notification:received', { detail: notif }));
    return notif;
  }

  /**
   * Broadcast to all legal team members
   */
  broadcastToLegal({ title, message, category = 'REQUEST', linkUrl = '' }) {
    const legalUsers = db.data.users.filter(
      u => u.role === 'SUPER_ADMIN' || u.role === 'LEGAL_ADMIN' || u.role === 'LEGAL_MEMBER'
    );
    legalUsers.forEach(u => {
      this.send({ userId: u.id, title, message, category, linkUrl });
    });
  }

  /**
   * Get notifications for the currently active user
   */
  getMyNotifications() {
    const user = authService.getCurrentUser();
    if (!user) return [];
    return db.data.notifications.filter(n => n.userId === user.id);
  }

  getUnreadCount() {
    const notifs = this.getMyNotifications();
    return notifs.filter(n => !n.isRead).length;
  }

  markAsRead(notificationId) {
    const notif = db.data.notifications.find(n => n.id === notificationId);
    if (notif) {
      notif.isRead = true;
      db.saveToStorage();
      window.dispatchEvent(new CustomEvent('notification:updated'));
    }
  }

  markAllAsRead() {
    const user = authService.getCurrentUser();
    db.data.notifications.forEach(n => {
      if (n.userId === user.id) {
        n.isRead = true;
      }
    });
    db.saveToStorage();
    window.dispatchEvent(new CustomEvent('notification:updated'));
  }
}

const notificationService = new NotificationService();

// === File: src\js\services\documentService.js ===
/**
 * Enterprise In-House Legal Management System
 * Centralized Legal Document Repository & Vault Service
 */


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

  /**
   * Permanently delete a document from vault
   */
  deleteDocument(docId) {
    const user = authService.getCurrentUser();
    const index = db.data.documents.findIndex(d => d.id === docId);
    if (index === -1) throw new Error('Document not found.');

    const doc = db.data.documents[index];
    db.data.documents.splice(index, 1);
    db.saveToStorage();

    auditService.log({
      actorName: user.name,
      actorRole: user.roleLabel || user.role,
      action: 'DELETE_DOCUMENT',
      target: `${doc.title} (${doc.departmentName || doc.departmentId})`
    });

    window.dispatchEvent(new CustomEvent('document:deleted', { detail: { id: docId } }));
    return true;
  }

  /**
   * Delete all old/archived documents or clear all vault documents
   */
  deleteAllDocuments() {
    const user = authService.getCurrentUser();
    if (!authService.isLegalAdmin() && !authService.isLegalManager()) {
      throw new Error('Unauthorized: Only Legal Managers can delete all vault documents.');
    }

    const count = db.data.documents.length;
    db.data.documents = [];
    db.saveToStorage();

    auditService.log({
      actorName: user.name,
      actorRole: user.roleLabel || user.role,
      action: 'PURGE_ALL_DOCUMENTS',
      target: `Purged ${count} vault documents`
    });

    window.dispatchEvent(new CustomEvent('documents:cleared', { detail: { count } }));
    return count;
  }
}

const documentService = new DocumentService();

// === File: src\js\services\contractService.js ===
/**
 * Enterprise In-House Legal Management System
 * Contract Lifecycle Management (CLM) Service
 */


class ContractService {
  /**
   * Get all contracts with RBAC filtering and dynamic expiry computation
   */
  getContracts({
    status = '',
    departmentId = '',
    search = '',
    expiringWithinDays = null
  } = {}) {
    const user = authService.getCurrentUser();
    const contractsList = Array.isArray(db.data.contracts) ? db.data.contracts : (db.data.contracts = []);
    let contracts = [...contractsList].filter(c => !c.isArchived);

    // Dynamic expiry status evaluation against current date
    const now = new Date('2026-08-27T00:00:00.000Z'); // Consistent base date

    contracts.forEach(contract => {
      if (contract.status !== 'TERMINATED' && contract.status !== 'RENEWED') {
        const expDate = new Date(contract.expiryDate);
        const diffDays = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) {
          contract.status = 'EXPIRED';
        } else if (diffDays <= 30) {
          contract.status = 'EXPIRING_SOON';
        }
      }
    });

    // RBAC FILTERING
    if (!authService.isLegalTeam()) {
      contracts = contracts.filter(c => c.departmentId === user.departmentId);
    }

    if (status) {
      contracts = contracts.filter(c => c.status === status);
    }
    if (departmentId) {
      contracts = contracts.filter(c => c.departmentId === departmentId);
    }
    if (expiringWithinDays !== null) {
      contracts = contracts.filter(c => {
        const expDate = new Date(c.expiryDate);
        const diffDays = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= expiringWithinDays;
      });
    }
    if (search) {
      const q = search.toLowerCase();
      contracts = contracts.filter(
        c =>
          c.contractId.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.counterparty.toLowerCase().includes(q) ||
          c.departmentName.toLowerCase().includes(q)
      );
    }

    return contracts.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
  }

  getContractById(contractId) {
    const contracts = db.data.contracts || [];
    const contract = contracts.find(
      c => (c.id === contractId || c.contractId === contractId) && !c.isArchived
    );
    if (!contract) return null;

    if (!authService.isLegalTeam() && contract.departmentId !== authService.getCurrentUser().departmentId) {
      throw new Error(`Access Denied: You do not have permission to view contract ${contract.contractId}.`);
    }

    return contract;
  }

  /**
   * Create an executed contract from a finalized Legal Request or direct entry
   */
  createContract({
    name,
    contractType,
    departmentId,
    counterparty,
    companyEntity = 'Impacteers Inc.',
    effectiveDate,
    expiryDate,
    renewalDate = null,
    contractValue = 0,
    currency = 'USD',
    paymentTerms = 'Net 30 Days',
    noticePeriodDays = 30,
    terminationClause = '',
    ownerId = null,
    legalOwnerId = null,
    linkedRequestId = null,
    executedDocumentId = null,
    notes = ''
  }) {
    const user = authService.getCurrentUser();
    const dept = db.data.departments.find(d => d.id === departmentId);
    if (!dept) throw new Error('Invalid department.');

    if (!Array.isArray(db.data.contracts)) {
      db.data.contracts = [];
    }

    const currentYear = new Date().getFullYear();
    const existingCount = db.data.contracts.length + 1;
    const formattedNum = String(existingCount).padStart(4, '0');
    const newContractId = `CNT-${currentYear}-${formattedNum}`;
    const newId = `cnt-${Date.now()}`;

    const newContract = {
      id: newId,
      contractId: newContractId,
      name: name.trim(),
      contractType,
      departmentId,
      departmentName: dept.name,
      counterparty: counterparty.trim(),
      companyEntity,
      effectiveDate,
      expiryDate,
      renewalDate,
      contractValue: Number(contractValue) || 0,
      currency,
      paymentTerms,
      noticePeriodDays: Number(noticePeriodDays) || 30,
      terminationClause: terminationClause.trim(),
      ownerId: ownerId || user.id,
      ownerName: user.name,
      legalOwnerId: legalOwnerId || (authService.isLegalTeam() ? user.id : null),
      legalOwnerName: authService.isLegalTeam() ? user.name : 'Legal Counsel',
      status: 'ACTIVE',
      linkedRequestId,
      executedDocumentId,
      notes: notes.trim(),
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.data.contracts.unshift(newContract);

    // If linked to a request, advance request to COMPLETED and update executed status
    if (linkedRequestId) {
      const req = db.data.requests.find(r => r.id === linkedRequestId);
      if (req) {
        req.status = 'COMPLETED';
        req.completedDate = new Date().toISOString().split('T')[0];
        req.updatedAt = new Date().toISOString();
      }
    }

    db.saveToStorage();

    auditService.log({
      action: 'CREATE_CONTRACT',
      objectType: 'CONTRACT',
      objectId: newContractId,
      previousValue: null,
      newValue: {
        name: newContract.name,
        counterparty: newContract.counterparty,
        value: newContract.contractValue,
        expiryDate: newContract.expiryDate,
        department: dept.name
      }
    });

    notificationService.broadcastToLegal({
      title: 'New Active Contract Executed',
      message: `${newContractId}: ${newContract.name} ($${newContract.contractValue.toLocaleString()}) active until ${newContract.expiryDate}.`,
      category: 'CONTRACT',
      linkUrl: `#/contracts`
    });

    window.dispatchEvent(new CustomEvent('contract:created', { detail: newContract }));
    return newContract;
  }

  /**
   * Terminate / Renew contract
   */
  updateContractStatus(contractId, newStatus, { notes = '' } = {}) {
    const contract = this.getContractById(contractId);
    if (!contract) throw new Error('Contract not found.');

    if (!authService.isLegalAdmin()) {
      throw new Error('Unauthorized: Only Legal Administrators can change contract statuses.');
    }

    const previousStatus = contract.status;
    contract.status = newStatus;
    if (notes) {
      contract.notes = `${contract.notes || ''}\n[${new Date().toISOString().split('T')[0]}] Status changed to ${newStatus}: ${notes}`.trim();
    }
    contract.updatedAt = new Date().toISOString();

    db.saveToStorage();

    auditService.log({
      action: 'UPDATE_CONTRACT_STATUS',
      objectType: 'CONTRACT',
      objectId: contract.contractId,
      previousValue: { status: previousStatus },
      newValue: { status: newStatus, notes }
    });

    window.dispatchEvent(new CustomEvent('contract:updated', { detail: contract }));
    return contract;
  }
}

const contractService = new ContractService();

// === File: src\js\services\requestService.js ===
/**
 * Impacteers Legal docs
 * Simplified Legal Request Workflow Service
 */


class RequestService {
  /**
   * Get requests accessible by current user
   */
  getRequests({ departmentId = '', status = '', search = '', myRequestsOnly = false } = {}) {
    const user = authService.getCurrentUser();
    if (!user) return [];

    let requests = [...db.data.requests];

    // RBAC check
    if (authService.isLegalManager() || authService.isChairman()) {
      // Sees all
    } else {
      // Business user sees only their department
      requests = requests.filter(r => r.departmentId === user.departmentId || r.requestorId === user.id);
    }

    if (myRequestsOnly) {
      requests = requests.filter(r => r.requestorId === user.id);
    }

    if (departmentId) {
      requests = requests.filter(r => r.departmentId === departmentId);
    }

    if (status) {
      requests = requests.filter(r => r.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      requests = requests.filter(
        r =>
          r.requestId.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.requestorName.toLowerCase().includes(q) ||
          r.departmentName.toLowerCase().includes(q)
      );
    }

    return requests.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  getRequestById(idOrReqId) {
    const req = db.data.requests.find(r => r.id === idOrReqId || r.requestId === idOrReqId);
    if (!req) return null;

    if (!authService.canAccessRequest(req)) {
      throw new Error(`Access Denied: You cannot access request ${req.requestId}.`);
    }

    // Attach comments
    const comments = db.data.comments
      .filter(c => c.requestId === req.id)
      .filter(c => (c.isInternalLegalOnly ? authService.canViewInternalNotes() : true));

    return {
      ...req,
      comments
    };
  }

  /**
   * Create a new simple legal request
   */
  createRequest({ title, requestType, priority = 'MEDIUM', requiredByDate, description, attachedDocument = null, comment = '' }) {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('User not logged in.');

    if (!title || !requestType || !requiredByDate || !description) {
      throw new Error('Please fill in all mandatory fields.');
    }

    const dept = db.data.departments.find(d => d.id === user.departmentId) || db.data.departments[0];
    const currentYear = new Date().getFullYear();
    const count = db.data.requests.length + 1;
    const formattedNum = String(count).padStart(4, '0');
    const newRequestId = `LEG-${currentYear}-${formattedNum}`;
    const newId = `req-${Date.now()}`;

    const newRequest = {
      id: newId,
      requestId: newRequestId,
      title: title.trim(),
      requestType,
      priority: priority || 'MEDIUM',
      departmentId: dept.id,
      departmentName: dept.name,
      requestorId: user.id,
      requestorName: user.name,
      requestorRole: user.tagline || user.roleLabel,
      assignedLegalId: 'usr-monisha',
      assignedLegalName: 'Monisha',
      status: 'PENDING_ACCEPTANCE',
      requiredByDate,
      currentDueDate: requiredByDate,
      description: description.trim(),
      attachedDocument,
      rescheduleProposal: null,
      rescheduleHistory: [],
      legalRemarks: [],
      reviewedDocument: null,
      finalDocument: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.data.requests.unshift(newRequest);

    // Initial conversation message
    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: newId,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.tagline || user.roleLabel,
      text: comment ? `${description.trim()}\n\nAdditional Note: ${comment.trim()}` : description.trim(),
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    // Notify Monisha
    notificationService.send({
      userId: 'usr-monisha',
      title: 'New Legal Request Received',
      message: `${user.name} (${dept.name}) submitted ${newRequestId}: "${title}".`,
      linkUrl: `#/requests/${newId}`
    });

    auditService.log({
      actorName: user.name,
      actorRole: user.roleLabel,
      action: 'CREATE_REQUEST',
      target: newRequestId
    });

    window.dispatchEvent(new CustomEvent('request:created', { detail: newRequest }));
    return newRequest;
  }

  /**
   * Accept request (Monisha)
   */
  acceptRequest(requestId, comment = '') {
    if (!authService.isLegalManager()) {
      throw new Error('Only the Legal Manager can accept requests.');
    }

    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.status = 'UNDER_LEGAL_REVIEW';
    req.updatedAt = new Date().toISOString();

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: comment ? `Accepted request for review. Target completion date: ${req.currentDueDate}.\n\nNote: ${comment}` : `Accepted request for review. Target completion date: ${req.currentDueDate}.`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: 'Legal Request Accepted',
      message: `Monisha accepted your request ${req.requestId}. Review in progress.`,
      linkUrl: `#/requests/${req.id}`
    });

    auditService.log({
      actorName: 'Monisha',
      actorRole: 'Legal Manager',
      action: 'ACCEPT_REQUEST',
      target: req.requestId
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Reject request (Monisha)
   */
  rejectRequest(requestId, reason) {
    if (!authService.isLegalManager()) {
      throw new Error('Only the Legal Manager can reject requests.');
    }
    if (!reason || !reason.trim()) {
      throw new Error('Please provide a mandatory rejection reason.');
    }

    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.status = 'REJECTED';
    req.updatedAt = new Date().toISOString();

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: `REQUEST REJECTED: ${reason.trim()}`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: 'Legal Request Rejected',
      message: `Your request ${req.requestId} was rejected. Reason: "${reason.trim()}"`,
      linkUrl: `#/requests/${req.id}`
    });

    auditService.log({
      actorName: 'Monisha',
      actorRole: 'Legal Manager',
      action: 'REJECT_REQUEST',
      target: req.requestId
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Reschedule request (Monisha proposes new date)
   */
  rescheduleRequest(requestId, { proposedDate, reason }) {
    if (!authService.isLegalManager()) {
      throw new Error('Only the Legal Manager can reschedule requests.');
    }
    if (!proposedDate || !reason) {
      throw new Error('Proposed date and reason are required.');
    }

    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.status = 'RESCHEDULED';
    req.rescheduleProposal = {
      originalDate: req.currentDueDate,
      proposedDate,
      reason: reason.trim(),
      proposedBy: 'Monisha',
      proposedAt: new Date().toISOString(),
      status: 'PENDING_BUSINESS_RESPONSE'
    };
    req.updatedAt = new Date().toISOString();

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: `RESCHEDULE PROPOSED: New target date of ${proposedDate}.\nReason: ${reason.trim()}`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: 'â±ï¸ Legal Reschedule Proposal',
      message: `Monisha proposed a new completion date (${proposedDate}) for ${req.requestId} ("${req.title}"). Reason: "${reason.trim()}"`,
      category: 'RESCHEDULE',
      linkUrl: `#/requests/${req.id}`
    });

    auditService.log({
      actorName: 'Monisha',
      actorRole: 'Legal Manager',
      action: 'PROPOSE_RESCHEDULE',
      target: req.requestId
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Business response to reschedule (Accept or Decline/Counter-Proposal)
   */
  respondToReschedule(requestId, { action, counterDate = null, comment = '' }) {
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req || !req.rescheduleProposal) throw new Error('No active reschedule proposal.');

    const user = authService.getCurrentUser();

    if (action === 'ACCEPT') {
      req.rescheduleHistory.push({
        ...req.rescheduleProposal,
        status: 'ACCEPTED_BY_BUSINESS',
        resolvedAt: new Date().toISOString()
      });
      req.currentDueDate = req.rescheduleProposal.proposedDate;
      req.status = 'UNDER_LEGAL_REVIEW';
      req.rescheduleProposal = null;

      db.data.comments.push({
        id: `comm-${Date.now()}`,
        requestId: req.id,
        authorId: user.id,
        authorName: user.name,
        authorRole: user.tagline || user.roleLabel,
        text: `Proposed completion date (${req.currentDueDate}) accepted by ${user.name}. Task is assigned to Monisha.${comment ? ` Note: ${comment}` : ''}`,
        isInternalLegalOnly: false,
        createdAt: new Date().toISOString()
      });

      notificationService.send({
        userId: 'usr-monisha',
        title: 'âœ“ Reschedule Accepted & Task Assigned',
        message: `${user.name} accepted the new date (${req.currentDueDate}) for ${req.requestId}. Task is now assigned and in review.`,
        category: 'RESCHEDULE',
        linkUrl: `#/requests/${req.id}`
      });
    } else {
      // Decline & Counter-Propose Alternate Date
      const targetDate = counterDate || req.rescheduleProposal.originalDate;
      req.rescheduleProposal.status = 'COUNTER_PROPOSED_BY_BUSINESS';
      req.rescheduleProposal.counterDate = targetDate;
      req.rescheduleProposal.counterReason = comment.trim();

      db.data.comments.push({
        id: `comm-${Date.now()}`,
        requestId: req.id,
        authorId: user.id,
        authorName: user.name,
        authorRole: user.tagline || user.roleLabel,
        text: `DECLINED RESCHEDULE â€¢ Requested Date: ${targetDate}\nJustification: ${comment.trim() || 'Urgent business priority, need to close as soon as possible.'}`,
        isInternalLegalOnly: false,
        createdAt: new Date().toISOString()
      });

      notificationService.send({
        userId: 'usr-monisha',
        title: 'âš ï¸ Reschedule Declined / Counter-Proposal',
        message: `${user.name} (${req.departmentName}) declined the reschedule for ${req.requestId}. Requested Date: ${targetDate}. Reason: "${comment.trim()}"`,
        category: 'RESCHEDULE',
        linkUrl: `#/requests/${req.id}`
      });
    }

    req.updatedAt = new Date().toISOString();
    db.saveToStorage();

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Legal Manager accepts business counter date
   */
  acceptBusinessCounterDate(requestId) {
    if (!authService.isLegalManager()) throw new Error('Only Legal Manager can accept timeline.');
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req || !req.rescheduleProposal) throw new Error('No active reschedule proposal.');

    const targetDate = req.rescheduleProposal.counterDate || req.rescheduleProposal.originalDate;
    req.currentDueDate = targetDate;
    req.status = 'UNDER_LEGAL_REVIEW';
    req.rescheduleHistory.push({
      ...req.rescheduleProposal,
      status: 'COUNTER_ACCEPTED_BY_LEGAL',
      resolvedAt: new Date().toISOString()
    });
    req.rescheduleProposal = null;
    req.updatedAt = new Date().toISOString();

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: `Accepted business requested completion date (${targetDate}). Task is now in active review.`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: 'âœ“ Legal Accepted Requested Date',
      message: `Monisha accepted your requested completion date (${targetDate}) for ${req.requestId}. Review in active progress.`,
      category: 'RESCHEDULE',
      linkUrl: `#/requests/${req.id}`
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Add remark (Monisha)
   */
  addRemark(requestId, text) {
    if (!authService.isLegalManager()) throw new Error('Only Legal Manager can add legal remarks.');
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    const remark = {
      id: `rem-${Date.now()}`,
      text: text.trim(),
      createdAt: new Date().toISOString()
    };
    req.legalRemarks = req.legalRemarks || [];
    req.legalRemarks.push(remark);
    req.updatedAt = new Date().toISOString();

    db.saveToStorage();
    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return remark;
  }

  /**
   * Upload reviewed document with optional legal remarks & comments (Monisha)
   */
  uploadReviewedDocument(requestId, { name, size = '2.0 MB', remarkText = '', commentText = '' }) {
    if (!authService.isLegalManager()) throw new Error('Only Legal Manager can upload reviewed documents.');
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.reviewedDocument = {
      name,
      size,
      uploadedBy: 'Monisha',
      uploadedAt: new Date().toISOString()
    };

    if (remarkText && remarkText.trim()) {
      req.legalRemarks = req.legalRemarks || [];
      req.legalRemarks.push({
        id: `rem-${Date.now()}`,
        text: remarkText.trim(),
        createdAt: new Date().toISOString()
      });
    }

    req.status = 'BUSINESS_ACTION_REQUIRED';
    req.updatedAt = new Date().toISOString();

    const fullComment = commentText && commentText.trim()
      ? `Uploaded reviewed version: ${name}\n\nReview Notes: ${remarkText.trim() ? remarkText.trim() + '\n\n' : ''}${commentText.trim()}`
      : `Uploaded reviewed version: ${name}${remarkText.trim() ? `\n\nReview Remarks: ${remarkText.trim()}` : ''}`;

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: fullComment,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: 'ðŸ“ Legal Review Completed',
      message: `Monisha uploaded reviewed draft (${name}) for ${req.requestId}. Please review and execute with client.`,
      category: 'DOCUMENT',
      linkUrl: `#/requests/${req.id}`
    });

    auditService.log({
      actorName: 'Monisha',
      actorRole: 'Legal Manager',
      action: 'UPLOAD_REVIEWED_DOCUMENT',
      target: req.requestId
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Submit Legal Work to Business (Monisha)
   */
  submitToBusiness(requestId) {
    if (!authService.isLegalManager()) throw new Error('Only Legal Manager can submit review.');
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.status = 'BUSINESS_ACTION_REQUIRED';
    req.updatedAt = new Date().toISOString();

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: 'Legal review completed and submitted to business stakeholder for client execution and signing.',
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: 'Legal Review Completed',
      message: `Monisha completed legal review for ${req.requestId}. Please download the reviewed draft and proceed with client signing.`,
      category: 'DOCUMENT',
      linkUrl: `#/requests/${req.id}`
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Upload Final Signed Document (Business or Legal) -> Automatically Completes Request and Publishes to Department Documents
   */
  uploadFinalSignedDocument(requestId, { name, size = '3.0 MB', commentText = '' }) {
    const user = authService.getCurrentUser();
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.finalDocument = {
      name,
      size,
      uploadedBy: user.name,
      uploadedAt: new Date().toISOString(),
      isExecuted: true
    };
    
    // Automatically transition status to COMPLETED
    req.status = 'COMPLETED';
    req.updatedAt = new Date().toISOString();

    // Automatically publish to Department Documents Repository
    const finalDocName = name;
    const docId = `doc-${Date.now()}`;
    const exists = db.data.documents.some(d => d.linkedRequestId === req.id && d.fileName === finalDocName);
    
    if (!exists) {
      db.data.documents.unshift({
        id: docId,
        title: req.title,
        documentType: req.requestType.includes('MOU') ? 'MOU' : req.requestType.includes('NDA') ? 'NDA' : 'Agreement',
        departmentId: req.departmentId,
        departmentName: req.departmentName,
        status: 'Executed',
        fileName: finalDocName,
        fileSize: size || '2.5 MB',
        uploadedBy: user.name,
        updatedAt: new Date().toISOString().split('T')[0],
        linkedRequestId: req.id,
        isFinal: true
      });
    }

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.tagline || user.roleLabel,
      text: `ðŸŽ‰ FINAL SIGNED DOCUMENT UPLOADED: ${name}\nRequest is automatically marked as COMPLETED and published to ${req.departmentName} Documents repository.${commentText && commentText.trim() ? `\n\nExecution Notes: ${commentText.trim()}` : ''}`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: 'usr-monisha',
      title: 'ðŸŽ‰ Request Completed & Executed Document Stored',
      message: `${user.name} uploaded final signed copy (${name}) for ${req.requestId}. Request marked as COMPLETED and stored in ${req.departmentName} repository.`,
      category: 'DOCUMENT',
      linkUrl: `#/requests/${req.id}`
    });

    if (req.requestorId !== user.id) {
      notificationService.send({
        userId: req.requestorId,
        title: 'ðŸŽ‰ Request Completed & Agreement Stored',
        message: `Final signed document (${name}) uploaded for ${req.requestId}. Agreement published in ${req.departmentName} Documents repository.`,
        category: 'DOCUMENT',
        linkUrl: `#/department-docs`
      });
    }

    auditService.log({
      actorName: user.name,
      actorRole: user.roleLabel,
      action: 'COMPLETE_AND_PUBLISH_DOCUMENT',
      target: `${req.requestId} -> ${finalDocName}`
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Mark Request Completed (Monisha) -> Automatically publishes final document into department repository!
   */
  markCompleted(requestId) {
    if (!authService.isLegalManager()) throw new Error('Only Legal Manager can mark requests completed.');
    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    req.status = 'COMPLETED';
    req.updatedAt = new Date().toISOString();

    // Auto-publish final document to department repository
    const finalDocName = req.finalDocument ? req.finalDocument.name : `${req.title}_Final_Executed.pdf`;
    const docId = `doc-${Date.now()}`;

    db.data.documents.unshift({
      id: docId,
      title: req.title,
      documentType: req.requestType.includes('MOU') ? 'MOU' : req.requestType.includes('NDA') ? 'NDA' : 'Agreement',
      departmentId: req.departmentId,
      departmentName: req.departmentName,
      status: 'Executed',
      fileName: finalDocName,
      fileSize: req.finalDocument ? req.finalDocument.size : '2.5 MB',
      uploadedBy: req.finalDocument ? req.finalDocument.uploadedBy : 'Monisha',
      updatedAt: new Date().toISOString().split('T')[0],
      linkedRequestId: req.id,
      isFinal: true
    });

    db.data.comments.push({
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: 'usr-monisha',
      authorName: 'Monisha',
      authorRole: 'Legal Manager',
      text: `Request completed. Final agreement stored in ${req.departmentName} Documents repository.`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: req.requestorId,
      title: 'Legal Request Completed',
      message: `Your request ${req.requestId} is completed! Final document is now available in ${req.departmentName} Documents.`,
      linkUrl: `#/department-docs`
    });

    auditService.log({
      actorName: 'Monisha',
      actorRole: 'Legal Manager',
      action: 'COMPLETE_REQUEST',
      target: req.requestId
    });

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return req;
  }

  /**
   * Add comment to request
   */
  addComment(requestId, text, isInternalLegalOnly = false) {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Not logged in.');
    if (!text || !text.trim()) throw new Error('Comment cannot be empty.');

    const req = db.data.requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request not found.');

    const comment = {
      id: `comm-${Date.now()}`,
      requestId: req.id,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.tagline || user.roleLabel,
      text: text.trim(),
      isInternalLegalOnly: isInternalLegalOnly && authService.isLegalManager(),
      createdAt: new Date().toISOString()
    };

    db.data.comments.push(comment);
    req.updatedAt = new Date().toISOString();
    db.saveToStorage();

    if (!comment.isInternalLegalOnly) {
      if (authService.isLegalManager()) {
        notificationService.send({
          userId: req.requestorId,
          title: 'Legal Comment',
          message: `Monisha commented on ${req.requestId}.`,
          linkUrl: `#/requests/${req.id}`
        });
      } else {
        notificationService.send({
          userId: 'usr-monisha',
          title: 'New Comment',
          message: `${user.name} commented on ${req.requestId}.`,
          linkUrl: `#/requests/${req.id}`
        });
      }
    }

    window.dispatchEvent(new CustomEvent('request:updated', { detail: req }));
    return comment;
  }
}

const requestService = new RequestService();

// === File: src\js\services\aiService.js ===
/**
 * Impacteers DMS â€” Enterprise AI Legal Assistant Service
 * Abstraction layer for legal research, contract auditing, clause analysis, and session memory.
 * Communicates exclusively with the secure server-side API (/api/legal-assistant/chat).
 */

class AIService {
  constructor() {
    this.storageKey = 'impacteers_dms_ai_sessions_v2';
    this.currentSessionIdKey = 'impacteers_dms_current_ai_session_id';
    this.activeJurisdictionKey = 'impacteers_dms_ai_jurisdiction';
    this.activeModeKey = 'impacteers_dms_ai_mode';

    this.defaultJurisdiction = localStorage.getItem(this.activeJurisdictionKey) || 'India';
    this.defaultMode = localStorage.getItem(this.activeModeKey) || 'general';

    this.initDefaultSession();
  }

  // ---------------------------------------------------------------------------
  // 1. Backend Status & Metadata
  // ---------------------------------------------------------------------------
  async getStatus() {
    try {
      const res = await fetch('/api/legal-assistant/status');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return {
        status: 'offline',
        provider: 'Fallback Rule Engine',
        model: 'in-house-v1',
        apiKeyConfigured: false,
        jurisdictions: ['India', 'Tamil Nadu', 'Delaware / US', 'United Kingdom', 'Custom'],
        disclaimer: 'AI Legal Assistant provides general legal information and document-analysis support and does not constitute legal advice.'
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Chat Query Execution
  // ---------------------------------------------------------------------------
  async generateLegalResponse({ message, documentText = '', jurisdiction = null, mode = null, history = [], model = null }) {
    const activeJur = jurisdiction || this.getJurisdiction();
    const activeMode = mode || this.getMode();

    const payload = {
      message: message.trim(),
      documentText: documentText ? documentText.trim() : '',
      jurisdiction: activeJur,
      mode: activeMode,
      conversationHistory: history.slice(-8), // Keep recent conversation window
      model: model || null
    };

    try {
      const res = await fetch('/api/legal-assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      return {
        success: true,
        reply: data.reply,
        provider: data.provider || 'Impacteers Legal Assistant',
        jurisdiction: data.jurisdiction || activeJur,
        mode: data.mode || activeMode,
        timestamp: data.timestamp || new Date().toISOString()
      };
    } catch (err) {
      return {
        success: false,
        error: 'Unable to connect to the Legal Assistant right now. Please try again or verify your server configuration.',
        reply: `âš ï¸ **Unable to connect to the Legal Assistant right now.**\n\nPlease try again in a few moments.\n\n*Error details: ${err.message || 'Connection failed'}*`,
        provider: 'Connection Error'
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 3. Document Analysis & Clause Auditing Specialized Methods
  // ---------------------------------------------------------------------------
  async analyzeDocument({ documentText, fileName, jurisdiction = null }) {
    const prompt = `Please perform a comprehensive contract review of this agreement (${fileName || 'Uploaded Agreement'}). 
Identify:
1. One-sided or unbalanced obligations
2. Liability caps and indemnification scope
3. Termination rights and notice periods
4. Missing critical clauses (Data Protection, Force Majeure, IP assignment, Non-Solicit)
5. Clear recommended action points and a clause risk matrix table.`;

    return this.generateLegalResponse({
      message: prompt,
      documentText,
      jurisdiction,
      mode: 'review'
    });
  }

  async compareClauses({ clauseA, clauseB, jurisdiction = null }) {
    const prompt = `Please perform a side-by-side legal comparison between these two clauses:

CLAUSE A:
"""
${clauseA}
"""

CLAUSE B:
"""
${clauseB}
"""

Evaluate:
1. Which clause provides stronger legal and commercial protection?
2. What are the key risk differences?
3. Provide a recommended balanced version.`;

    return this.generateLegalResponse({
      message: prompt,
      jurisdiction,
      mode: 'compare'
    });
  }

  async checkMissingClauses({ documentText, contractType = 'Commercial Agreement', jurisdiction = null }) {
    const prompt = `Review this ${contractType} specifically to identify any MISSING clauses or omitted protections that should be included under ${jurisdiction || 'applicable law'}. Generate a missing-clause risk checklist with suggested drafting additions.`;

    return this.generateLegalResponse({
      message: prompt,
      documentText,
      jurisdiction,
      mode: 'missing_clauses'
    });
  }

  // ---------------------------------------------------------------------------
  // 4. Session & Chat History Management (Client Storage)
  // ---------------------------------------------------------------------------
  getSessions() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveSessions(sessions) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions to localStorage:', e);
    }
  }

  getCurrentSessionId() {
    return localStorage.getItem(this.currentSessionIdKey);
  }

  setCurrentSessionId(id) {
    localStorage.setItem(this.currentSessionIdKey, id);
  }

  getCurrentSession() {
    const sessions = this.getSessions();
    const currentId = this.getCurrentSessionId();
    let current = sessions.find(s => s.id === currentId);
    if (!current && sessions.length > 0) {
      current = sessions[0];
      this.setCurrentSessionId(current.id);
    }
    return current || null;
  }

  initDefaultSession() {
    const sessions = this.getSessions();
    if (sessions.length === 0) {
      this.createSession('General Legal Consultation', this.defaultJurisdiction);
    }
  }

  createSession(title = 'New Legal Chat', jurisdiction = null) {
    const sessions = this.getSessions();
    const newSession = {
      id: 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
      title: title || 'New Legal Consultation',
      jurisdiction: jurisdiction || this.getJurisdiction(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attachedDocument: null, // { name, text, size }
      messages: [
        {
          id: 'msg-' + Date.now(),
          role: 'assistant',
          content: `Hello! I am your **AI Legal Assistant**. I can assist you with contract review, clause risk analysis, plain-English explanations, drafting safer wording, and checking compliance under **${jurisdiction || this.getJurisdiction()}** law.\n\nHow can I help you today? You can also upload or paste a contract for clause-by-clause analysis.`,
          timestamp: new Date().toISOString(),
          provider: 'Impacteers Legal Assistant'
        }
      ]
    };

    sessions.unshift(newSession);
    this.saveSessions(sessions);
    this.setCurrentSessionId(newSession.id);
    return newSession;
  }

  addMessage(sessionId, message) {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    const newMsg = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      role: message.role, // 'user' | 'assistant'
      content: message.content,
      timestamp: new Date().toISOString(),
      provider: message.provider || 'Impacteers AI',
      jurisdiction: message.jurisdiction || session.jurisdiction,
      mode: message.mode || 'general'
    };

    session.messages.push(newMsg);
    session.updatedAt = new Date().toISOString();

    // Auto-update title based on first user question
    if (session.messages.filter(m => m.role === 'user').length === 1 && message.role === 'user') {
      const cleanTitle = message.content.slice(0, 36).replace(/\n/g, ' ').trim() + (message.content.length > 36 ? '...' : '');
      session.title = cleanTitle || 'Legal Inquiry';
    }

    this.saveSessions(sessions);
    return newMsg;
  }

  attachDocumentToSession(sessionId, docObj) {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    session.attachedDocument = docObj; // { name, text, size, charCount }
    session.updatedAt = new Date().toISOString();
    this.saveSessions(sessions);
  }

  removeAttachedDocument(sessionId) {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    session.attachedDocument = null;
    session.updatedAt = new Date().toISOString();
    this.saveSessions(sessions);
  }

  deleteSession(sessionId) {
    let sessions = this.getSessions();
    sessions = sessions.filter(s => s.id !== sessionId);
    this.saveSessions(sessions);

    if (this.getCurrentSessionId() === sessionId) {
      if (sessions.length > 0) {
        this.setCurrentSessionId(sessions[0].id);
      } else {
        this.createSession('General Legal Consultation', this.getJurisdiction());
      }
    }
  }

  clearAllSessions() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.currentSessionIdKey);
    return this.createSession('General Legal Consultation', this.getJurisdiction());
  }

  // ---------------------------------------------------------------------------
  // 5. Jurisdiction & Preferences
  // ---------------------------------------------------------------------------
  getJurisdiction() {
    return localStorage.getItem(this.activeJurisdictionKey) || 'India';
  }

  setJurisdiction(jurisdiction) {
    localStorage.setItem(this.activeJurisdictionKey, jurisdiction);
    const session = this.getCurrentSession();
    if (session) {
      session.jurisdiction = jurisdiction;
      const sessions = this.getSessions();
      const idx = sessions.findIndex(s => s.id === session.id);
      if (idx !== -1) {
        sessions[idx].jurisdiction = jurisdiction;
        this.saveSessions(sessions);
      }
    }
  }

  getMode() {
    return localStorage.getItem(this.activeModeKey) || 'general';
  }

  setMode(mode) {
    localStorage.setItem(this.activeModeKey, mode);
  }
}

const aiService = new AIService();

// === File: src\js\services\legalAssistantService.js ===
/**
 * Impacteers DMS â€” Enterprise In-House Legal & Document Management System
 * Local LLM Ollama Integration & Secure Legal AI Gateway
 */


class LegalAssistantService {
  constructor() {
    this.endpoint = localStorage.getItem('OLLAMA_ENDPOINT') || 'http://127.0.0.1:11434';
    this.proxyEndpoint = '/api/ollama';
    this.model = localStorage.getItem('OLLAMA_MODEL') || 'llama3.2';
    this.temperature = parseFloat(localStorage.getItem('OLLAMA_TEMP') || '0.3');
    this.isConnected = false;
    this.installedModels = [];
    this.lastCheckTime = null;
    this.isChecking = false;
  }

  getSuggestedPrompts() {
    return [
      'Review this contract for legal risks',
      'Explain this clause in simple language',
      'Identify missing clauses',
      'Summarise this agreement',
      'Compare these two clauses',
      'Draft a stronger termination clause',
      'Identify commercial risks',
      'Check this agreement for inconsistencies'
    ];
  }

  getSafetyDisclaimer() {
    return 'AI Legal Assistant provides general legal information and document-analysis support and does not constitute legal advice or create an attorney-client relationship. AI-generated responses should be independently verified against applicable law and reviewed by a qualified legal professional.';
  }

  getAuthorizedContextDocuments() {
    try {
      return documentService.getDocuments() || [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Check live connection to local Ollama server
   */
  async checkOllamaStatus() {
    if (this.isChecking) return { connected: this.isConnected, models: this.installedModels, activeModel: this.model };
    this.isChecking = true;

    const endpointsToTry = [
      `${this.proxyEndpoint}/tags`,
      `${this.endpoint}/api/tags`
    ];

    let success = false;
    let foundModels = [];

    for (const url of endpointsToTry) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const res = await fetch(url, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.models)) {
            foundModels = data.models.map(m => m.name || m.model);
            success = true;
            break;
          }
        }
      } catch (err) {
        // Try next endpoint
      }
    }

    this.isChecking = false;
    this.lastCheckTime = Date.now();

    if (success && foundModels.length > 0) {
      this.isConnected = true;
      this.installedModels = foundModels;
      
      if (!this.installedModels.includes(this.model) && !this.installedModels.some(m => m.startsWith(this.model))) {
        this.model = this.installedModels[0];
        localStorage.setItem('OLLAMA_MODEL', this.model);
      }

      return {
        connected: true,
        models: this.installedModels,
        activeModel: this.model,
        endpoint: this.endpoint
      };
    } else {
      this.isConnected = false;
      return {
        connected: false,
        models: [],
        activeModel: this.model,
        endpoint: this.endpoint,
        error: 'Ollama is offline or unreachable'
      };
    }
  }

  /**
   * Main Query Entrypoint â€” calls secure backend /api/legal-assistant/chat via aiService
   */
  async queryLegalAI({ prompt, contextDocId = null, customDocText = '', jurisdiction = 'India', mode = 'general', history = [] }) {
    let docContextText = customDocText || '';

    // If a vault doc ID was selected, retrieve its text & metadata
    if (contextDocId) {
      const docs = this.getAuthorizedContextDocuments();
      const targetDoc = docs.find(d => d.id === contextDocId);
      if (targetDoc) {
        docContextText = `[Vault Document: ${targetDoc.title}]\nCategory: ${targetDoc.documentType || 'Agreement'}\nDepartment: ${targetDoc.departmentName || 'General'}\nStatus: ${targetDoc.status || 'Executed'}\n\n${targetDoc.content || targetDoc.summary || 'Document executed and archived in Impacteers secure legal vault.'}`;
      }
    }

    return await aiService.generateLegalResponse({
      message: prompt,
      documentText: docContextText,
      jurisdiction,
      mode,
      history
    });
  }

  /**
   * Extract contractual clauses by keyword
   */
  extractClauses(text) {
    if (!text) return [];
    const clauses = [];
    const lower = text.toLowerCase();

    const patterns = [
      { type: 'Liability Cap', keyword: 'liability', icon: 'âš–ï¸', desc: 'Aggregate liability limit' },
      { type: 'Indemnification', keyword: 'indemn', icon: 'ðŸ›¡ï¸', desc: 'Third-party claim protections' },
      { type: 'Termination', keyword: 'terminat', icon: 'â±ï¸', desc: 'Notice period & cause rights' },
      { type: 'Payment Terms', keyword: 'payment', icon: 'ðŸ’³', desc: 'Invoice cycle & dispute protocol' },
      { type: 'Confidentiality', keyword: 'confidential', icon: 'ðŸ”’', desc: 'Proprietary info & NDA term' },
      { type: 'Intellectual Property', keyword: 'intellectual property', icon: 'ðŸ’¡', desc: 'Ownership & licensing rights' },
      { type: 'Governing Law', keyword: 'governing law', icon: 'ðŸ›ï¸', desc: 'Jurisdiction & arbitration venue' },
      { type: 'Non-Solicitation', keyword: 'solicit', icon: 'ðŸ‘¥', desc: 'Employee & customer non-solicit' },
      { type: 'Force Majeure', keyword: 'force majeure', icon: 'âš¡', desc: 'Unforeseen disaster excusal' }
    ];

    for (const p of patterns) {
      if (lower.includes(p.keyword)) {
        clauses.push({
          type: p.type,
          icon: p.icon,
          description: p.desc,
          status: 'Present'
        });
      } else {
        clauses.push({
          type: p.type,
          icon: p.icon,
          description: p.desc,
          status: 'Missing / Review Needed'
        });
      }
    }

    return clauses;
  }
}

const legalAssistantService = new LegalAssistantService();

// === File: src\js\components\Modal.js ===
/**
 * Impacteers Legal docs
 * Modal Dialog Controller
 */

class Modal {
  static open({ title, contentHtml, footerHtml = '', size = 'md', onClose = null }) {
    this.close(); // Close any currently open modal

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.id = 'active-modal-backdrop';

    const maxWidthMap = {
      sm: '460px',
      md: '600px',
      lg: '800px',
      xl: '1000px'
    };

    backdrop.innerHTML = `
      <div class="modal-content" style="max-width: ${maxWidthMap[size] || '600px'};" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3 style="font-size: 16px; font-weight: 700; color: #0F172A; letter-spacing: -0.01em; margin: 0;">${title}</h3>
          <button id="modal-close-btn" style="
            background: none;
            border: 1px solid #E2E8F0;
            border-radius: 6px;
            color: #64748B;
            font-size: 14px;
            cursor: pointer;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
          " onmouseover="this.style.background='#F1F5F9'; this.style.color='#0F172A';" onmouseout="this.style.background='none'; this.style.color='#64748B';">âœ•</button>
        </div>
        <div class="modal-body" id="modal-body-container">
          ${contentHtml}
        </div>
        ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
      </div>
    `;

    document.body.appendChild(backdrop);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Trigger animation
    requestAnimationFrame(() => backdrop.classList.add('open'));

    const handleClose = () => {
      document.body.style.overflow = '';
      backdrop.classList.remove('open');
      setTimeout(() => {
        if (backdrop.parentNode) backdrop.remove();
        if (onClose) onClose();
      }, 150);
    };

    backdrop.querySelector('#modal-close-btn').addEventListener('click', handleClose);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) handleClose();
    });

    const escListener = (e) => {
      if (e.key === 'Escape') {
        handleClose();
        document.removeEventListener('keydown', escListener);
      }
    };
    document.addEventListener('keydown', escListener);

    return {
      close: handleClose,
      container: backdrop.querySelector('#modal-body-container')
    };
  }

  static close() {
    document.body.style.overflow = '';
    const existing = document.getElementById('active-modal-backdrop');
    if (existing) {
      existing.classList.remove('open');
      setTimeout(() => {
        if (existing.parentNode) existing.remove();
      }, 150);
    }
  }
}

// Global modal close helper
window.activeModalClose = () => Modal.close();

// === File: src\js\components\Toast.js ===
/**
 * Enterprise In-House Legal Management System
 * Toast Notification Utility
 */

class Toast {
  static show(message, type = 'info', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'â„¹ï¸';
    if (type === 'success') icon = 'âœ“';
    if (type === 'error') icon = 'âš ï¸';

    toast.innerHTML = `
      <div style="font-weight: 700; font-size: 16px;">${icon}</div>
      <div style="flex: 1; line-height: 1.4;">${message}</div>
      <button style="background: none; border: none; color: #94A3B8; cursor: pointer; font-size: 14px;" onclick="this.parentElement.remove()">âœ•</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  static success(msg) { this.show(msg, 'success'); }
  static error(msg) { this.show(msg, 'error', 4500); }
  static info(msg) { this.show(msg, 'info'); }
}

// === File: src\js\components\Sidebar.js ===
/**
 * Impacteers Legal docs
 * Minimal Dynamic Role-Based Sidebar
 */


function renderSidebar(activeRoute = 'dashboard', isCollapsed = false) {
  const user = authService.getCurrentUser();
  if (!user) return '';

  const isLegal = authService.isLegalManager();
  const isChairman = authService.isChairman();
  const unreadCount = notificationService.getUnreadCount();

  let navItems = [];

  if (isLegal) {
    // Monisha - Legal Manager Clean Sidebar
    navItems = [
      { route: 'dashboard', label: 'Dashboard', icon: 'ðŸ“Š' },
      { route: 'requests', label: 'Requests Queue', icon: 'âš–ï¸' },
      { route: 'documents', label: 'Documents Vault', icon: 'ðŸ“' },
      { route: 'departments', label: 'Document Database', icon: 'ðŸ—„ï¸' },
      { route: 'calendar', label: 'Calendar', icon: 'ðŸ“…' }
    ];
  } else if (isChairman) {
    // Chairman - Executive View-Only Sidebar (Removed Documents Vault and Calendar)
    navItems = [
      { route: 'dashboard', label: 'Executive Dashboard', icon: 'ðŸ›ï¸' },
      { route: 'requests', label: 'All Requests', icon: 'ðŸ“‹' },
      { route: 'departments', label: 'Document Database', icon: 'ðŸ—„ï¸' }
    ];
  } else {
    // Business User (Edwin, Musthafa, Vinoth, Bala, etc.) - Ultra Minimal 4-item Sidebar
    const deptName = user.departmentName || 'Department';
    navItems = [
      { route: 'dashboard', label: 'Dashboard', icon: 'ðŸ ' },
      { route: 'my-requests', label: 'My Requests', icon: 'ðŸ“‹' },
      { route: 'department-docs', label: `${deptName} Documents`, icon: 'ðŸ“' },
      { route: 'create-request', label: 'Create Request', icon: 'âž•', highlight: true }
    ];
  }

  return `
    <aside id="app-sidebar" class="sidebar" style="
      width: ${isCollapsed ? '72px' : '250px'};
      background: #0F172A;
      color: #F8FAFC;
      display: flex;
      flex-direction: column;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
      border-right: 1px solid #1E293B;
      transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    ">
      <!-- Sidebar Header & Exact Logo (No white background) -->
      <div style="
        height: 60px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: ${isCollapsed ? 'center' : 'space-between'};
        border-bottom: 1px solid #1E293B;
      ">
        <div style="display: flex; align-items: center; gap: 10px; overflow: hidden; ${isCollapsed ? 'display: none;' : ''}">
          <img src="./assets/impacteers-logo.png" alt="Impacteers Logo" style="height: 28px; width: auto; display: block; flex-shrink: 0;" />
          <div style="overflow: hidden;">
            <div style="font-size: 13.5px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.01em; white-space: nowrap; line-height: 1.1;">
              Impacteers DMS
            </div>
            <div style="font-size: 9.5px; color: #94A3B8; white-space: nowrap; margin-top: 2px;">Document Management System</div>
          </div>
        </div>
        ${
          isCollapsed
            ? `<img src="./assets/impacteers-logo.png" alt="Impacteers" style="height: 22px; width: auto; object-fit: contain;" />`
            : ''
        }

        <button id="sidebar-toggle-btn" style="
          background: transparent;
          border: 1px solid #334155;
          color: #94A3B8;
          border-radius: 6px;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 11px;
        ">
          ${isCollapsed ? 'â–¶' : 'â—€'}
        </button>
      </div>

      <!-- Navigation Links -->
      <div style="flex: 1; overflow-y: auto; padding: 14px 10px; display: flex; flex-direction: column; gap: 4px;">
        ${navItems
          .map(item => {
            const isActive = activeRoute === item.route;
            return `
            <a href="#/${item.route}" class="nav-item ${isActive ? 'active' : ''}" style="
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 9px 12px;
              border-radius: 8px;
              color: ${isActive ? '#FFFFFF' : item.highlight ? '#60A5FA' : '#94A3B8'};
              background: ${isActive ? '#2563EB' : item.highlight ? 'rgba(37, 99, 235, 0.12)' : 'transparent'};
              text-decoration: none;
              font-size: 13.5px;
              font-weight: ${isActive || item.highlight ? '600' : '500'};
              transition: all 0.15s ease;
            " onmouseover="if(!${isActive}) { this.style.background='#1E293B'; this.style.color='#FFFFFF'; }"
               onmouseout="if(!${isActive}) { this.style.background='${item.highlight ? 'rgba(37, 99, 235, 0.12)' : 'transparent'}'; this.style.color='${item.highlight ? '#60A5FA' : '#94A3B8'}'; }">
              <span style="font-size: 16px; min-width: 22px; text-align: center;">${item.icon}</span>
              <span style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; ${isCollapsed ? 'display: none;' : ''}">
                ${item.label}
              </span>
              ${
                item.unread && item.unread > 0
                  ? `<span style="font-size: 10px; background: #DC2626; color: #FFFFFF; width: 18px; height: 18px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; font-weight: 700;">${item.unread}</span>`
                  : ''
              }
            </a>
          `;
          })
          .join('')}
      </div>

      <!-- User info in sidebar footer -->
      <div style="
        padding: 12px 14px;
        border-top: 1px solid #1E293B;
        background: #090D16;
        ${isCollapsed ? 'display: none;' : ''}
      ">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: #1E293B;
            color: #60A5FA;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          ">${user.avatar || 'U'}</div>
          <div style="flex: 1; overflow: hidden;">
            <div style="font-size: 12.5px; font-weight: 600; color: #F8FAFC; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${user.name}
            </div>
            <div style="font-size: 10.5px; color: #64748B; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${user.tagline || user.roleLabel}
            </div>
          </div>
        </div>
      </div>
    </aside>
  `;
}

// === File: src\js\components\Topbar.js ===
/**
 * Impacteers Legal docs
 * Clean, Elegant Topbar with Notification Bell & User Profile
 */


function renderTopbar() {
  const user = authService.getCurrentUser();
  if (!user) return '';

  const unreadCount = notificationService.getUnreadCount();

  return `
    <header id="app-topbar">
      <!-- Left: Mobile Menu Toggle + Clean Active Workspace Context -->
      <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
        <button id="mobile-menu-btn" class="mobile-menu-toggle" title="Toggle Navigation Menu" aria-label="Toggle navigation">
          â˜°
        </button>
        <span style="font-size: 13.5px; font-weight: 800; color: #0F172A; letter-spacing: -0.01em; white-space: nowrap;">
          Impacteers DMS
        </span>
        <span class="topbar-breadcrumb-slash" style="color: #CBD5E1; font-size: 11px;">/</span>
        <span class="badge badge-slate topbar-dept-badge" style="font-size: 11.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">
          ${user.departmentName || 'Global Legal'}
        </span>
      </div>

      <!-- Right: Notifications & User Profile Menu -->
      <div style="display: flex; align-items: center; gap: 14px;">
        
        <!-- Notification Bell -->
        <a href="#/notifications" title="Notifications (${unreadCount} unread)" style="
          text-decoration: none;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          color: #334155;
          font-size: 15px;
          transition: all 0.15s ease;
        " onmouseover="this.style.background='#F1F5F9'; this.style.borderColor='#CBD5E1';" onmouseout="this.style.background='#F8FAFC'; this.style.borderColor='#E2E8F0';">
          <span>ðŸ””</span>
          ${
            unreadCount > 0
              ? `
            <span style="
              position: absolute;
              top: -4px;
              right: -4px;
              background: #EF4444;
              color: #FFFFFF;
              font-size: 10px;
              font-weight: 700;
              min-width: 17px;
              height: 17px;
              border-radius: 9999px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid #FFFFFF;
              padding: 0 3px;
              animation: pulse 2s infinite;
            ">${unreadCount}</span>
          `
              : ''
          }
        </a>

        <!-- User Profile Pill & Dropdown -->
        <div style="position: relative;">
          <button id="topbar-user-btn" style="
            display: flex;
            align-items: center;
            gap: 8px;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            padding: 4px 10px 4px 6px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.15s ease;
            box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          " onmouseover="this.style.borderColor='#CBD5E1'" onmouseout="this.style.borderColor='#E2E8F0'">
            <div style="
              width: 26px;
              height: 26px;
              border-radius: 9999px;
              background: #2563EB;
              color: #FFFFFF;
              font-size: 11.5px;
              font-weight: 700;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              ${user.avatar || 'U'}
            </div>
            <div style="text-align: left;">
              <div style="font-size: 12px; font-weight: 700; color: #0F172A; line-height: 1.1;">
                ${user.name}
              </div>
            </div>
            <span style="font-size: 9px; color: #94A3B8; margin-left: 2px;">â–¼</span>
          </button>

          <!-- User Menu Dropdown -->
          <div id="topbar-user-dropdown" style="
            display: none;
            position: absolute;
            right: 0;
            top: 42px;
            width: 220px;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            z-index: 1000;
            overflow: hidden;
          ">
            <div style="padding: 10px 14px; border-bottom: 1px solid #F1F5F9; background: #F8FAFC;">
              <div style="font-size: 12.5px; font-weight: 700; color: #0F172A;">${user.name}</div>
              <div style="font-size: 11px; color: #64748B;">${user.tagline || user.roleLabel}</div>
            </div>

            <div style="padding: 4px 0;">
              <a href="javascript:void(0)" class="dropdown-link" onclick="window.showProfileModal(); document.getElementById('topbar-user-dropdown').style.display='none';">
                ðŸ‘¤ Profile Details
              </a>
              <a href="#/about" class="dropdown-link" onclick="document.getElementById('topbar-user-dropdown').style.display='none';">
                â„¹ï¸ About System
              </a>
            </div>

            <div style="padding: 4px 0; border-top: 1px solid #F1F5F9;">
              <button class="dropdown-link" style="width: 100%; text-align: left; background: none; border: none; color: #DC2626; font-weight: 600; cursor: pointer;" onclick="window.confirmLogout();">
                ðŸšª Logout
              </button>
            </div>
          </div>
        </div>

      </div>
    </header>
  `;
}

// === File: src\js\components\LoginPage.js ===
/**
 * Impacteers LMS â€” Legal Management System
 * World-Class Centered Login & Stakeholder Selection Page
 * Designed with senior UI/UX aesthetics, glassmorphism, and responsive centering
 */


function renderLoginPage() {
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
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #94A3B8;">âœ‰ï¸</span>
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
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" 
                style="padding: 11px 14px 11px 36px; font-size: 13.5px; border-radius: 10px; border: 1.5px solid #CBD5E1;" 
                value="password123" 
                required 
              />
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #94A3B8;">ðŸ”’</span>
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
            <span>âš¡</span>
            <span>1-Click Stakeholder Demo Logins</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button 
              class="demo-role-btn" 
              onclick="window.quickLogin('usr-monisha')"
              title="Legal Manager with Full Access"
            >
              <span style="font-size: 16px;">ðŸ‘©â€âš–ï¸</span>
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
              <span style="font-size: 16px;">ðŸ›ï¸</span>
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
              <span style="font-size: 16px;">ðŸ‘”</span>
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
              <span style="font-size: 16px;">ðŸ‘¥</span>
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
              <span style="font-size: 16px;">ðŸ’»</span>
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
              <span style="font-size: 16px;">âš™ï¸</span>
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
              <span style="font-size: 16px;">ðŸ“±</span>
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
              <span style="font-size: 16px;">ðŸŽ“</span>
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

// === File: src\js\components\FloatingLegalAssistant.js ===
/**
 * Impacteers DMS â€” Enterprise In-House Legal & Document Management System
 * Floating AI Legal Assistant Widget (Secure Gateway & AI Integration)
 */


let isAssistantOpen = false;
let assistantMessages = [];

function renderFloatingLegalAssistant() {
  const user = authService.getCurrentUser();
  if (!user) return '';

  const docs = documentService.getDocuments();

  return `
    <!-- Floating Legal Assistant Trigger (FAB) -->
    <div id="floating-assistant-container">
      <button 
        id="floating-assistant-fab" 
        class="floating-fab" 
        title="Open AI Legal Assistant"
        onclick="window.toggleFloatingAssistant()"
      >
        <span class="fab-icon">ðŸ’¬</span>
        <span class="fab-badge" id="fab-ai-badge">AI</span>
      </button>

      <!-- Floating Chat Card -->
      <div id="floating-assistant-window" class="floating-assistant-card ${isAssistantOpen ? 'open' : ''}">
        
        <!-- Header -->
        <div class="floating-assistant-header">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0;">
            <div style="width: 28px; height: 28px; border-radius: 8px; background: #EFF6FF; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0;">
              âš–ï¸
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px;">
                <div style="font-size: 13.5px; font-weight: 700; color: #0F172A; white-space: nowrap;">Legal AI Assistant</div>
                <div id="floating-gateway-status-pill" onclick="window.showAIConfigModal()" style="font-size: 10.5px; padding: 1.5px 7px; border-radius: 12px; background: #ECFDF5; color: #047857; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0;" title="Click to view AI Gateway status">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
                  <span>AI Active</span>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
                <span style="font-size: 11px; color: #64748B;">Jurisdiction:</span>
                <select id="floating-jur-select" onchange="window.handleJurisdictionChange(this.value)" style="font-size: 11px; padding: 1px 4px; border-radius: 4px; border: 1px solid #CBD5E1; background: #FFFFFF; color: #334155; max-width: 130px; cursor: pointer;">
                  <option value="India">ðŸ‡®ðŸ‡³ India</option>
                  <option value="Tamil Nadu">ðŸ‡®ðŸ‡³ Tamil Nadu</option>
                  <option value="Delaware / US">ðŸ‡ºðŸ‡¸ Delaware</option>
                  <option value="United Kingdom">ðŸ‡¬ðŸ‡§ UK</option>
                </select>
                <button onclick="window.showAIConfigModal()" style="background: none; border: none; font-size: 11px; color: #64748B; cursor: pointer; padding: 0 2px;" title="AI Configuration">âš™ï¸</button>
              </div>
            </div>
          </div>
          <button 
            class="floating-close-btn" 
            onclick="window.toggleFloatingAssistant(false)"
            title="Minimize Assistant"
            style="margin-left: 6px;"
          >âœ•</button>
        </div>

        <!-- Document RAG Context Selector Bar -->
        <div style="padding: 6px 12px; background: #F8FAFC; border-bottom: 1px solid #F1F5F9; display: flex; align-items: center; gap: 6px; font-size: 11.5px;">
          <span style="color: #64748B; font-weight: 600; flex-shrink: 0;">Context:</span>
          <select id="floating-doc-context-select" style="flex: 1; min-width: 0; font-size: 11.5px; padding: 3px 6px; border-radius: 6px; border: 1px solid #E2E8F0; background: #FFFFFF; color: #1E293B;">
            <option value="">All Vault Documents & Contracts (Global)</option>
            ${docs.map(d => `<option value="${d.id}">ðŸ“„ ${d.title} (${d.departmentName})</option>`).join('')}
          </select>
        </div>

        <!-- Chat Message Area -->
        <div class="floating-assistant-body" id="floating-chat-messages">
          
          <!-- Welcome Message -->
          <div class="chat-msg ai-msg">
            <div class="chat-msg-header">
              <span>âš–ï¸ AI Legal Counsel</span>
              <span>Just now</span>
            </div>
            <div class="chat-msg-content">
              Hello <strong>${user.name}</strong>! I am your enterprise AI Legal Assistant. You can ask me to audit clauses, check liability exposure, review notice terms, and analyze contracts.
            </div>
          </div>

          <!-- Suggested Prompt Chips -->
          <div style="margin: 8px 0 12px 0;">
            <div style="font-size: 11px; font-weight: 600; color: #64748B; margin-bottom: 6px;">Suggested Inquiries:</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('Review this contract for legal risks')">
                ðŸ“‘ Review this contract for legal risks
              </button>
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('Explain this clause in simple language')">
                ðŸ” Explain clause in simple language
              </button>
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('Identify missing clauses')">
                âš ï¸ Identify missing clauses
              </button>
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('Draft a stronger termination clause')">
                âœï¸ Draft stronger termination clause
              </button>
            </div>
          </div>

        </div>

        <!-- Input Footer -->
        <div class="floating-assistant-footer">
          <form id="floating-assistant-form" onsubmit="event.preventDefault(); window.submitFloatingAssistantMessage();">
            <div style="display: flex; gap: 8px; align-items: center;">
              <input 
                type="text" 
                id="floating-chat-input" 
                class="form-input" 
                placeholder="Ask legal question or request clause audit..." 
                style="height: 38px; font-size: 12.5px; border-radius: 20px; padding: 0 14px;"
                autocomplete="off"
              />
              <button 
                type="submit" 
                id="floating-chat-send-btn" 
                class="btn btn-primary" 
                style="width: 38px; height: 38px; border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
                title="Send Message"
              >
                âž¤
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  `;
}

// Markdown formatting helper
function formatAiMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^### (.*$)/gim, '<div style="font-size: 13.5px; font-weight: 800; color: #0F172A; margin: 8px 0 4px 0;">$1</div>')
    .replace(/^## (.*$)/gim, '<div style="font-size: 14px; font-weight: 800; color: #0F172A; margin: 10px 0 6px 0;">$1</div>')
    .replace(/^# (.*$)/gim, '<div style="font-size: 15px; font-weight: 800; color: #0F172A; margin: 12px 0 6px 0;">$1</div>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background: #F1F5F9; padding: 1px 5px; border-radius: 4px; font-family: monospace; font-size: 11.5px; color: #1E293B;">$1</code>')
    .replace(/^\s*-\s+(.*$)/gim, '<li style="margin-left: 16px; margin-bottom: 3px;">$1</li>')
    .replace(/\n\n/g, '<div style="height: 8px;"></div>')
    .replace(/\n/g, '<br/>');
}

window.toggleFloatingAssistant = function(forceState = null) {
  const win = document.getElementById('floating-assistant-window');
  if (!win) return;

  if (forceState !== null) {
    isAssistantOpen = forceState;
  } else {
    isAssistantOpen = !isAssistantOpen;
  }

  if (isAssistantOpen) {
    win.classList.add('open');
    const input = document.getElementById('floating-chat-input');
    if (input) setTimeout(() => input.focus(), 150);
  } else {
    win.classList.remove('open');
  }
};

window.sendFloatingPrompt = function(promptText) {
  const input = document.getElementById('floating-chat-input');
  if (input) {
    input.value = promptText;
    window.submitFloatingAssistantMessage();
  }
};

window.submitFloatingAssistantMessage = async function() {
  const input = document.getElementById('floating-chat-input');
  const container = document.getElementById('floating-chat-messages');
  const docSelect = document.getElementById('floating-doc-context-select');
  const jurSelect = document.getElementById('floating-jur-select');
  if (!input || !container) return;

  const query = input.value.trim();
  if (!query) return;

  const selectedDocId = docSelect ? docSelect.value : null;
  const jurisdiction = jurSelect ? jurSelect.value : 'India';

  // Append user message
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'chat-msg user-msg';
  userMsgEl.innerHTML = `
    <div class="chat-msg-header">
      <span>You</span>
      <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
    <div class="chat-msg-content">${query.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
  `;
  container.appendChild(userMsgEl);
  input.value = '';
  container.scrollTop = container.scrollHeight;

  // Append typing indicator
  const typingEl = document.createElement('div');
  typingEl.className = 'chat-msg ai-msg';
  typingEl.id = 'floating-typing-indicator';
  typingEl.innerHTML = `
    <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748B;">
      <span>Consulting AI Legal Counsel (${jurisdiction})</span>
      <span class="typing-dots">...</span>
    </div>
  `;
  container.appendChild(typingEl);
  container.scrollTop = container.scrollHeight;

  try {
    const result = await legalAssistantService.queryLegalAI({ 
      prompt: query,
      contextDocId: selectedDocId,
      jurisdiction: jurisdiction,
      history: assistantMessages
    });

    typingEl.remove();

    assistantMessages.push({ role: 'user', content: query });
    assistantMessages.push({ role: 'assistant', content: result.reply });

    const aiMsgEl = document.createElement('div');
    aiMsgEl.className = 'chat-msg ai-msg';
    
    const formattedHtml = formatAiMarkdown(result.reply);

    aiMsgEl.innerHTML = `
      <div class="chat-msg-header">
        <span style="display: flex; align-items: center; gap: 4px;">
          <span>âš–ï¸ AI Legal Counsel</span>
          <span style="font-size: 9.5px; background: #EFF6FF; color: #1E40AF; padding: 1px 5px; border-radius: 4px; font-weight: 700;">
            ${result.provider || 'AI'}
          </span>
        </span>
        <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div class="chat-msg-content" style="line-height: 1.5; font-size: 12.8px;">${formattedHtml}</div>
    `;
    container.appendChild(aiMsgEl);
  } catch (err) {
    typingEl.remove();
    const errorEl = document.createElement('div');
    errorEl.className = 'chat-msg ai-msg';
    errorEl.innerHTML = `
      <div class="chat-msg-header" style="color: #BE123C;">Error</div>
      <div class="chat-msg-content" style="color: #BE123C;">Unable to connect to Legal Assistant. Please try again.</div>
    `;
    container.appendChild(errorEl);
  }

  container.scrollTop = container.scrollHeight;
};

// === File: src\js\pages\BusinessDashboardPage.js ===
/**
 * Impacteers Legal docs
 * Business User Dashboard (e.g. Edwin - HR, Musthafa - IT)
 */


function renderBusinessDashboardPage() {
  const user = authService.getCurrentUser();
  const deptName = user.departmentName || 'Department';
  const requests = requestService.getRequests({ departmentId: user.departmentId });
  const pendingRequests = requests.filter(r => r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const deptDocs = db.data.documents.filter(d => d.departmentId === user.departmentId);

  return `
    <div class="content-container" style="max-width: 1200px;">
      <!-- Welcome Header -->
      <div style="margin-bottom: 28px;">
        <h1 style="font-size: 26px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
          Hello, ${user.name} ðŸ‘‹
        </h1>
        <p style="font-size: 14px; color: #64748B; margin-top: 2px;">
          ${deptName} Team Portal â€¢ Impacteers In-House Document Management System
        </p>
      </div>

      <!-- 3 Primary Large Action Cards -->
      <div class="dashboard-action-cards">
        
        <!-- 1. My Requests Card -->
        <div class="kpi-card" onclick="window.location.hash='#/my-requests'" style="border-top: 4px solid #2563EB;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #EFF6FF; color: #1D4ED8; display: flex; align-items: center; justify-content: center; font-size: 22px;">
              ðŸ“‹
            </div>
            <span class="badge badge-blue">${pendingRequests.length} Active</span>
          </div>
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: #0F172A;">My Requests</h3>
            <p style="font-size: 13px; color: #64748B; margin-top: 4px; line-height: 1.4;">
              View and track legal review and drafting requests submitted by ${deptName}.
            </p>
          </div>
          <div style="margin-top: 16px; font-size: 12.5px; font-weight: 600; color: #2563EB;">
            View Requests â†’
          </div>
        </div>

        <!-- 2. Department Documents Card -->
        <div class="kpi-card" onclick="window.location.hash='#/department-docs'" style="border-top: 4px solid #059669;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #ECFDF5; color: #047857; display: flex; align-items: center; justify-content: center; font-size: 22px;">
              ðŸ“
            </div>
            <span class="badge badge-green">${deptDocs.length} Documents</span>
          </div>
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: #0F172A;">${deptName} Documents</h3>
            <p style="font-size: 13px; color: #64748B; margin-top: 4px; line-height: 1.4;">
              Access completed agreements, MOUs, and approved legal records.
            </p>
          </div>
          <div style="margin-top: 16px; font-size: 12.5px; font-weight: 600; color: #059669;">
            Open Repository â†’
          </div>
        </div>

        <!-- 3. Create Request Card -->
        <div class="kpi-card" onclick="window.location.hash='#/create-request'" style="border-top: 4px solid #7C3AED; background: linear-gradient(180deg, #FFFFFF, #FAF5FF);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #FAF5FF; color: #7C3AED; display: flex; align-items: center; justify-content: center; font-size: 22px;">
              âž•
            </div>
            <span class="badge badge-purple">Fast Track</span>
          </div>
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: #0F172A;">Create Request</h3>
            <p style="font-size: 13px; color: #64748B; margin-top: 4px; line-height: 1.4;">
              Send a new document for drafting, vetting, or verification directly to Monisha.
            </p>
          </div>
          <div style="margin-top: 16px; font-size: 12.5px; font-weight: 600; color: #7C3AED;">
            Submit New Request â†’
          </div>
        </div>

      </div>

      <!-- Recent Requests Table -->
      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>ðŸ“‹</span>
            <span>Recent ${deptName} Requests</span>
          </div>
          <a href="#/my-requests" style="font-size: 12.5px; color: #2563EB; font-weight: 600; text-decoration: none;">
            View All â†’
          </a>
        </div>
        <div class="table-responsive">
          <table class="enterprise-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Required By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${
                requests.length === 0
                  ? `<tr><td colspan="6" style="text-align: center; padding: 36px; color: #94A3B8;">No requests submitted yet. Click "Create Request" above to get started.</td></tr>`
                  : requests.slice(0, 5)
                      .map(r => {
                        const statusObj = REQUEST_STATUSES[r.status] || { label: r.status, badgeClass: 'badge-blue' };
                        return `
                        <tr>
                          <td>
                            <a href="#/requests/${r.id}" style="font-family: var(--font-mono); font-weight: 700; color: #2563EB; text-decoration: none;">
                              ${r.requestId}
                            </a>
                          </td>
                          <td style="font-weight: 600; color: #0F172A;">${r.title}</td>
                          <td style="font-size: 12.5px; color: #475569;">${r.requestType}</td>
                          <td style="font-family: var(--font-mono); font-size: 12px; font-weight: 600;">${r.currentDueDate}</td>
                          <td>
                            <span class="badge ${statusObj.badgeClass}">${statusObj.label}</span>
                          </td>
                          <td>
                            <a href="#/requests/${r.id}" class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11.5px;">
                              Open Ticket â†’
                            </a>
                          </td>
                        </tr>
                      `;
                      })
                      .join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// === File: src\js\pages\LegalDashboardPage.js ===
/**
 * Impacteers Legal docs
 * Legal Manager Dashboard (Monisha)
 */


function renderLegalDashboardPage() {
  const allRequests = requestService.getRequests();
  const todayStr = '2026-08-27';

  const newRequests = allRequests.filter(r => r.status === 'PENDING_ACCEPTANCE' || r.status === 'RESCHEDULED');
  const inProgress = allRequests.filter(r => r.status === 'ACCEPTED' || r.status === 'UNDER_LEGAL_REVIEW' || r.status === 'BUSINESS_ACTION_REQUIRED' || r.status === 'FINAL_DOCUMENT_REQUIRED');
  const dueToday = allRequests.filter(r => r.currentDueDate === todayStr && r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const overdue = allRequests.filter(r => new Date(r.currentDueDate) < new Date(todayStr) && r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const completed = allRequests.filter(r => r.status === 'COMPLETED');

  return `
    <div class="content-container">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 style="font-size: 24px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
            Good Morning, Monisha âš–ï¸
          </h1>
          <p style="font-size: 13.5px; color: #64748B; margin-top: 2px;">
            Legal Manager â€¢ Enterprise Legal Request & Document Triage
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <a href="#/requests" class="btn btn-secondary btn-sm">
            View All Requests Queue â†’
          </a>
        </div>
      </div>

      <!-- 5 Key Action Cards -->
      <div class="kpi-grid">
        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #2563EB;">
          <div class="kpi-card-header">
            <span class="kpi-title">New Requests</span>
            <div class="kpi-icon-wrapper" style="background: #EFF6FF; color: #1D4ED8;">ðŸ“¥</div>
          </div>
          <div class="kpi-value" style="color: ${newRequests.length > 0 ? '#1D4ED8' : '#0F172A'};">${newRequests.length}</div>
          <div class="kpi-subtext">Waiting for acceptance</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #7C3AED;">
          <div class="kpi-card-header">
            <span class="kpi-title">In Progress</span>
            <div class="kpi-icon-wrapper" style="background: #FAF5FF; color: #7C3AED;">âš™ï¸</div>
          </div>
          <div class="kpi-value">${inProgress.length}</div>
          <div class="kpi-subtext">Under active review</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #F59E0B;">
          <div class="kpi-card-header">
            <span class="kpi-title">Due Today</span>
            <div class="kpi-icon-wrapper" style="background: #FFFBEB; color: #B45309;">â³</div>
          </div>
          <div class="kpi-value" style="color: ${dueToday.length > 0 ? '#B45309' : '#0F172A'};">${dueToday.length}</div>
          <div class="kpi-subtext">Target turnaround today</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #DC2626;">
          <div class="kpi-card-header">
            <span class="kpi-title">Overdue</span>
            <div class="kpi-icon-wrapper" style="background: #FFF1F2; color: #BE123C;">ðŸš¨</div>
          </div>
          <div class="kpi-value" style="color: ${overdue.length > 0 ? '#BE123C' : '#0F172A'};">${overdue.length}</div>
          <div class="kpi-subtext">Past due date</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #10B981;">
          <div class="kpi-card-header">
            <span class="kpi-title">Completed</span>
            <div class="kpi-icon-wrapper" style="background: #ECFDF5; color: #047857;">âœ“</div>
          </div>
          <div class="kpi-value">${completed.length}</div>
          <div class="kpi-subtext">Stored in department vaults</div>
        </div>
      </div>

      <!-- Actionable Requests Queue -->
      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>ðŸ“¥</span>
            <span>Requests Requiring Action (${newRequests.length + inProgress.length})</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="enterprise-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Title</th>
                <th>Department</th>
                <th>Requested By</th>
                <th>Required By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${
                allRequests.length === 0
                  ? '<tr><td colspan="7" style="text-align: center; padding: 32px; color: #94A3B8;">No requests in queue.</td></tr>'
                  : allRequests
                      .map(r => {
                        const statusObj = REQUEST_STATUSES[r.status] || { label: r.status, badgeClass: 'badge-blue' };
                        return `
                        <tr>
                          <td>
                            <a href="#/requests/${r.id}" style="font-family: var(--font-mono); font-weight: 700; color: #2563EB; text-decoration: none;">
                              ${r.requestId}
                            </a>
                          </td>
                          <td style="font-weight: 600; color: #0F172A;">${r.title}</td>
                          <td><span class="badge badge-slate">${r.departmentName}</span></td>
                          <td style="font-size: 12.5px;">${r.requestorName}</td>
                          <td style="font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: #0F172A;">${r.currentDueDate}</td>
                          <td><span class="badge ${statusObj.badgeClass}">${statusObj.label}</span></td>
                          <td>
                            <a href="#/requests/${r.id}" class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11.5px;">
                              Review Ticket â†’
                            </a>
                          </td>
                        </tr>
                      `;
                      })
                      .join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// === File: src\js\pages\ChairmanDashboardPage.js ===
/**
 * Impacteers Legal docs
 * Chairman Dashboard (Executive View-Only)
 */


function renderChairmanDashboardPage() {
  const allRequests = requestService.getRequests();
  const todayStr = '2026-08-27';

  const pending = allRequests.filter(r => r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const dueToday = allRequests.filter(r => r.currentDueDate === todayStr && r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const overdue = allRequests.filter(r => new Date(r.currentDueDate) < new Date(todayStr) && r.status !== 'COMPLETED' && r.status !== 'REJECTED');
  const completed = allRequests.filter(r => r.status === 'COMPLETED');

  return `
    <div class="content-container">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 style="font-size: 24px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
            Executive Overview ðŸ›ï¸
          </h1>
          <p style="font-size: 13.5px; color: #64748B; margin-top: 2px;">
            Chairman â€¢ Global View-Only Transparency Across All 11 Departments
          </p>
        </div>
        <div>
          <span class="badge badge-slate" style="font-size: 12px; padding: 4px 10px;">
            ðŸ‘ï¸ Executive View-Only Mode
          </span>
        </div>
      </div>

      <!-- Top KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Total Requests</span>
            <div class="kpi-icon-wrapper" style="background: #F1F5F9; color: #334155;">ðŸ“Š</div>
          </div>
          <div class="kpi-value">${allRequests.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Pending</span>
            <div class="kpi-icon-wrapper" style="background: #EFF6FF; color: #1D4ED8;">â³</div>
          </div>
          <div class="kpi-value" style="color: #1D4ED8;">${pending.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Due Today</span>
            <div class="kpi-icon-wrapper" style="background: #FFFBEB; color: #B45309;">â°</div>
          </div>
          <div class="kpi-value" style="color: #B45309;">${dueToday.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Overdue</span>
            <div class="kpi-icon-wrapper" style="background: #FFF1F2; color: #BE123C;">ðŸš¨</div>
          </div>
          <div class="kpi-value" style="color: #BE123C;">${overdue.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Completed</span>
            <div class="kpi-icon-wrapper" style="background: #ECFDF5; color: #047857;">âœ“</div>
          </div>
          <div class="kpi-value" style="color: #047857;">${completed.length}</div>
        </div>
      </div>

      <!-- Main Layout: Pending Requests + Department Overview -->
      <div class="grid-2-1-col">
        
        <!-- Pending Requests Table -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>ðŸ“‹</span>
              <span>Pending Legal Requests (${pending.length})</span>
            </div>
          </div>
          <div class="table-responsive">
            <table class="enterprise-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Owner</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                ${
                  pending.length === 0
                    ? '<tr><td colspan="7" style="text-align: center; padding: 28px; color: #94A3B8;">No pending requests.</td></tr>'
                    : pending
                        .map(r => {
                          const statusObj = REQUEST_STATUSES[r.status] || { label: r.status, badgeClass: 'badge-blue' };
                          return `
                          <tr>
                            <td>
                              <a href="#/requests/${r.id}" style="font-family: var(--font-mono); font-weight: 700; color: #2563EB; text-decoration: none;">
                                ${r.requestId}
                              </a>
                            </td>
                            <td style="font-weight: 600; color: #0F172A;">${r.title}</td>
                            <td><span class="badge badge-slate">${r.departmentName}</span></td>
                            <td style="font-size: 12.5px;">${r.requestorName}</td>
                            <td style="font-family: var(--font-mono); font-size: 12px; font-weight: 600;">${r.currentDueDate}</td>
                            <td><span class="badge ${statusObj.badgeClass}">${statusObj.label}</span></td>
                            <td>
                              <a href="#/requests/${r.id}" class="btn btn-secondary btn-sm" style="padding: 2px 8px; font-size: 11px;">
                                View â†’
                              </a>
                            </td>
                          </tr>
                        `;
                        })
                        .join('')
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Department Overview -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>ðŸ¢</span>
              <span>Department Overview</span>
            </div>
          </div>
          <div style="padding: 12px 16px;">
            ${DEPARTMENTS.map(d => {
              const deptPending = allRequests.filter(r => r.departmentId === d.id && r.status !== 'COMPLETED' && r.status !== 'REJECTED').length;
              return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px;">
                  <span style="font-weight: 600; color: #0F172A;">${d.name}</span>
                  <span class="badge ${deptPending > 0 ? 'badge-blue' : 'badge-slate'}">
                    ${deptPending} Pending
                  </span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}

// === File: src\js\pages\CreateRequestPage.js ===
/**
 * Impacteers Legal docs
 * Simple Request Creation Page with Priority & Urgency
 */


function renderCreateRequestPage() {
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
          âž• Create Legal Request
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
                  <div style="font-size: 12.5px; font-weight: 700; color: #BE123C;">ðŸš¨ Immediate Action Required</div>
                  <div style="font-size: 11px; color: #9F1239; margin-top: 2px;">Critical / Blocker</div>
                </div>
              </label>

              <label style="border: 1px solid #FED7AA; background: #FFF7ED; border-radius: 8px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 8px; cursor: pointer;">
                <input type="radio" name="req-priority" value="HIGH" style="margin-top: 3px;" />
                <div>
                  <div style="font-size: 12.5px; font-weight: 700; color: #C2410C;">ðŸ”¥ High Priority</div>
                  <div style="font-size: 11px; color: #9A3412; margin-top: 2px;">Urgent business need</div>
                </div>
              </label>

              <label style="border: 2px solid #2563EB; background: #EFF6FF; border-radius: 8px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 8px; cursor: pointer;">
                <input type="radio" name="req-priority" value="MEDIUM" style="margin-top: 3px;" checked />
                <div>
                  <div style="font-size: 12.5px; font-weight: 700; color: #1D4ED8;">âš¡ Standard Priority</div>
                  <div style="font-size: 11px; color: #1E40AF; margin-top: 2px;">Normal workflow</div>
                </div>
              </label>

              <label style="border: 1px solid #E2E8F0; background: #F8FAFC; border-radius: 8px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 8px; cursor: pointer;">
                <input type="radio" name="req-priority" value="LOW" style="margin-top: 3px;" />
                <div>
                  <div style="font-size: 12.5px; font-weight: 700; color: #475569;">ðŸŒ± Low Priority / Flexible</div>
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
              <span style="font-size: 28px;">ðŸ“„</span>
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
              Send Request to Legal â†’
            </button>
          </div>

        </form>
      </div>
    </div>
  `;
}

// === File: src\js\pages\DepartmentDocumentsPage.js ===
/**
 * Impacteers DMS â€” Enterprise In-House Legal & Document Management System
 * Department Document Repository Page
 * With Instant Search, Category Filter, Download & Delete Support
 */


function renderDepartmentDocumentsPage(targetDeptId = null) {
  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalManager();
  const deptId = targetDeptId || (user ? user.departmentId : 'dept-staffing');
  const dept = db.data.departments.find(d => d.id === deptId) || db.data.departments[0];

  // RBAC Access Check
  if (!authService.canAccessDepartment(dept.id)) {
    return `
      <div class="content-container">
        <div style="padding: 48px; text-align: center; background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 12px;">
          <h2 style="color: #BE123C; font-size: 18px;">Access Denied</h2>
          <p style="color: #9F1239; margin-top: 6px;">You only have permission to access documents belonging to your own department (${user.departmentName}).</p>
        </div>
      </div>
    `;
  }

  const docs = db.data.documents.filter(d => d.departmentId === dept.id || d.departmentId === 'ALL');

  return `
    <div class="content-container" style="max-width: 1200px;">
      <!-- Header -->
      <div class="page-header" style="margin-bottom: 20px;">
        <div>
          <h1 style="font-size: 22px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
            ðŸ“ ${dept.name} Documents
          </h1>
          <p style="font-size: 13px; color: #64748B; margin-top: 2px;">
            Secure repository for ${dept.name} executed contracts, verified agreements, and legal records.
          </p>
        </div>
      </div>

      <!-- Search & Filter Bar -->
      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        padding: 12px 16px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      ">
        <div style="flex: 1; min-width: 240px;">
          <input 
            type="text" 
            id="dept-doc-search" 
            class="form-input" 
            placeholder="Search ${dept.name} documents by name, keyword, or counterparty..." 
            oninput="window.filterDepartmentDocs('${dept.id}')"
            style="height: 36px; font-size: 13px; padding: 6px 12px;"
          />
        </div>
        <div>
          <select 
            id="dept-doc-filter-type" 
            class="form-select" 
            style="min-width: 150px; height: 36px; font-size: 12.5px; padding: 6px 10px;"
            onchange="window.filterDepartmentDocs('${dept.id}')"
          >
            <option value="">All Document Types</option>
            <option value="Agreement">Agreements</option>
            <option value="MSA">Master Services Agreement (MSA)</option>
            <option value="MOU">MOUs</option>
            <option value="NDA">NDAs</option>
            <option value="Policy">Corporate Policies</option>
            <option value="License">Software Licenses</option>
          </select>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="
          const s = document.getElementById('dept-doc-search');
          const t = document.getElementById('dept-doc-filter-type');
          if (s) s.value = '';
          if (t) t.value = '';
          window.filterDepartmentDocs('${dept.id}');
        " style="height: 36px; padding: 0 12px; font-size: 12px;">
          Reset
        </button>
      </div>

      <!-- Documents Table -->
      <div class="enterprise-card" style="box-shadow: 0 1px 3px rgba(0,0,0,0.04); border-radius: 10px; overflow: hidden;">
        <div class="enterprise-card-header" style="padding: 12px 18px; background: #FAFAFA; border-bottom: 1px solid #E2E8F0;">
          <div class="enterprise-card-title" style="font-size: 13.5px; font-weight: 700; color: #0F172A;">
            <span>ðŸ“‘ ${dept.name} Records: <strong id="dept-doc-count" style="color: #2563EB;">${docs.length}</strong></span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="enterprise-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Document</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Type</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 110px;">Status</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 180px;">File Details</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 120px;">Updated</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 150px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="dept-doc-tbody">
              ${renderDepartmentDocRows(docs)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderDepartmentDocRows(docs) {
  const isLegal = authService.isLegalManager();

  if (!docs || docs.length === 0) {
    return `<tr><td colspan="6" style="text-align: center; padding: 40px 16px; color: #94A3B8;">
      <div style="font-size: 26px; margin-bottom: 4px;">ðŸ“‚</div>
      <div style="font-size: 13.5px; font-weight: 600; color: #475569;">No matching documents found.</div>
      <div style="font-size: 12px; color: #94A3B8; margin-top: 2px;">Try adjusting your search terms or filters.</div>
    </td></tr>`;
  }

  return docs
    .map(doc => {
      const fileName = doc.fileName || (doc.versions && doc.versions.length ? doc.versions[doc.versions.length - 1].fileName : `${doc.title.replace(/\s+/g, '_')}.pdf`);
      const fileSize = doc.fileSize || '2.0 MB';

      return `
      <tr style="border-bottom: 1px solid #F1F5F9; transition: background 0.1s ease;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
        <td style="padding: 12px 16px; vertical-align: middle;">
          <div style="font-weight: 600; font-size: 13.5px; color: #0F172A; display: flex; align-items: center; gap: 8px;">
            <span>${doc.isFinal ? 'ðŸ“œ' : 'ðŸ“„'}</span>
            <span>${doc.title}</span>
          </div>
          ${doc.counterparty ? `<div style="font-size: 11px; color: #64748B; margin-left: 24px;">Counterparty: ${doc.counterparty}</div>` : ''}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; font-size: 12.5px; color: #334155;">
          ${doc.documentType || doc.category || 'Agreement'}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle;">
          <span class="badge ${doc.status === 'Executed' ? 'badge-green' : 'badge-amber'}">
            ${doc.status || 'Executed'}
          </span>
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; font-family: var(--font-mono); font-size: 11.5px; color: #64748B;">
          ${fileName} (${fileSize})
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; font-size: 12px; color: #64748B;">
          ${doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : 'Active'}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; text-align: right; white-space: nowrap;">
          <div style="display: flex; gap: 6px; justify-content: flex-end; align-items: center;">
            <button class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11px; font-weight: 600;" onclick="window.downloadDocumentFile('${fileName}', '${doc.title.replace(/'/g, "\\'")}')">
              ðŸ“¥ Download
            </button>
            ${
              isLegal
                ? `
              <button class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11px; font-weight: 600; color: #DC2626; border-color: #FECDD3;" onclick="window.deleteVaultDocument('${doc.id}', '${doc.title.replace(/'/g, "\\'")}')" title="Delete document">
                ðŸ—‘ï¸ Delete
              </button>
            `
                : ''
            }
          </div>
        </td>
      </tr>
    `;
    })
    .join('');
}

// === File: src\js\pages\LegalRequestsPage.js ===
/**
 * Impacteers Legal docs
 * My Requests & Legal Queue Page (Clean, Perfectly Aligned Jira-style Table)
 */


function renderLegalRequestsPage({ myRequestsOnly = false } = {}) {
  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalManager();
  const deptName = user.departmentName || 'Department';

  let requests = requestService.getRequests({
    departmentId: isLegal ? null : user.departmentId,
    myRequestsOnly: myRequestsOnly
  });

  const pageTitle = isLegal
    ? 'âš–ï¸ Legal Requests Queue'
    : `ðŸ“‹ My ${deptName} Requests`;

  const pageSubtitle = isLegal
    ? 'All company legal review, vetting, and contract drafting requests.'
    : `Track and manage legal requests submitted by ${deptName}.`;

  return `
    <div class="content-container" style="max-width: 1200px;">
      
      <!-- Page Header -->
      <div class="page-header" style="margin-bottom: 20px;">
        <div>
          <h1 class="page-title" style="font-size: 22px; font-weight: 700; color: #0F172A;">
            ${pageTitle}
          </h1>
          <p class="page-subtitle" style="font-size: 13px; color: #64748B; margin-top: 2px;">
            ${pageSubtitle}
          </p>
        </div>
        <div>
          <a href="#/create-request" class="btn btn-primary btn-sm" style="font-size: 12.5px; padding: 7px 14px; font-weight: 600;">
            + Create New Request
          </a>
        </div>
      </div>

      <!-- Search & Filters Bar -->
      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        padding: 12px 16px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      ">
        <div style="flex: 1; min-width: 220px;">
          <input 
            type="text" 
            id="filter-search" 
            class="form-input" 
            placeholder="Search by ID, title, or type..." 
            style="height: 36px; font-size: 13px; padding: 6px 12px;"
          />
        </div>

        <div>
          <select id="filter-status" class="form-select" style="min-width: 170px; height: 36px; font-size: 12.5px; padding: 6px 10px;">
            <option value="">All Statuses</option>
            ${Object.keys(REQUEST_STATUSES).map(k => `<option value="${k}">${REQUEST_STATUSES[k].label}</option>`).join('')}
          </select>
        </div>

        ${
          isLegal
            ? `
          <div>
            <select id="filter-dept" class="form-select" style="min-width: 160px; height: 36px; font-size: 12.5px; padding: 6px 10px;">
              <option value="">All Departments</option>
              ${DEPARTMENTS.map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
            </select>
          </div>
        `
            : ''
        }

        <button id="filter-reset-btn" class="btn btn-secondary btn-sm" style="height: 36px; padding: 0 12px; font-size: 12px;">
          Reset
        </button>
      </div>

      <!-- Requests Table Card -->
      <div class="enterprise-card" style="box-shadow: 0 1px 3px rgba(0,0,0,0.04); border-radius: 10px; overflow: hidden;">
        <div class="enterprise-card-header" style="padding: 12px 18px; background: #FAFAFA; border-bottom: 1px solid #E2E8F0;">
          <div class="enterprise-card-title" style="font-size: 13.5px; font-weight: 700; color: #0F172A;">
            <span>Total Requests: <strong id="table-count" style="color: #2563EB;">${requests.length}</strong></span>
          </div>
        </div>
        
        <div class="table-responsive">
          <table class="enterprise-table" id="legal-requests-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Request ID</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Title & Type</th>
                ${isLegal ? `<th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 130px;">Department</th>` : ''}
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 150px;">Required By</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 180px;">Status</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 110px; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody id="requests-tbody">
              ${renderRequestRows(requests, isLegal)}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

function renderRequestRows(requests, isLegal = false) {
  if (!requests || requests.length === 0) {
    return `
      <tr>
        <td colspan="${isLegal ? '6' : '5'}" style="text-align: center; padding: 40px 16px; color: #94A3B8;">
          <div style="font-size: 28px; margin-bottom: 6px;">ðŸ“‚</div>
          <div style="font-size: 14px; font-weight: 600; color: #475569;">No requests found.</div>
          <div style="font-size: 12px; color: #94A3B8; margin-top: 2px;">Submit a new request or change your search filters.</div>
        </td>
      </tr>
    `;
  }

  return requests
    .map(r => {
      const statusObj = REQUEST_STATUSES[r.status] || { label: r.status, badgeClass: 'badge-blue' };

      return `
      <tr style="border-bottom: 1px solid #F1F5F9; transition: background 0.1s ease;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
        <td style="padding: 12px 16px; vertical-align: middle;">
          <a href="#/requests/${r.id}" style="
            font-family: var(--font-mono);
            font-weight: 700;
            font-size: 12.5px;
            color: #2563EB;
            text-decoration: none;
            background: #EFF6FF;
            padding: 3px 8px;
            border-radius: 6px;
            display: inline-block;
          ">
            ${r.requestId}
          </a>
        </td>
        <td style="padding: 12px 16px; vertical-align: middle;">
          <a href="#/requests/${r.id}" style="font-weight: 600; font-size: 13.5px; color: #0F172A; text-decoration: none;">
            ${r.title}
          </a>
          <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">
            ${r.requestType} â€¢ ${r.attachedDocument ? `ðŸ“„ ${r.attachedDocument.name}` : 'No initial doc'}
          </div>
        </td>
        ${
          isLegal
            ? `
          <td style="padding: 12px 16px; vertical-align: middle;">
            <span class="badge badge-slate" style="font-size: 11px;">${r.departmentName}</span>
          </td>
        `
            : ''
        }
        <td style="padding: 12px 16px; vertical-align: middle; font-family: var(--font-mono); font-size: 12.5px; font-weight: 600; color: #0F172A;">
          ${r.currentDueDate}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle;">
          <span class="badge ${statusObj.badgeClass}" style="font-size: 11.5px; font-weight: 600;">
            ${statusObj.label}
          </span>
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; text-align: right;">
          <a href="#/requests/${r.id}" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 11.5px; font-weight: 600;">
            Open Ticket â†’
          </a>
        </td>
      </tr>
    `;
    })
    .join('');
}

// === File: src\js\pages\RequestDetailPage.js ===
/**
 * Impacteers Legal docs
 * Simplified Jira-Style Request Detail View & Action Center
 */


function renderRequestDetailPage(requestId) {
  let req;
  try {
    req = requestService.getRequestById(requestId);
  } catch (err) {
    return `
      <div class="content-container">
        <div style="padding: 48px; text-align: center; background: #FFF1F2; border-radius: 12px; border: 1px solid #FECDD3;">
          <h2 style="color: #BE123C; font-size: 18px;">Access Denied</h2>
          <p style="color: #9F1239; margin-top: 6px;">${err.message}</p>
          <a href="#/dashboard" class="btn btn-primary btn-sm" style="margin-top: 14px;">Return to Dashboard</a>
        </div>
      </div>
    `;
  }

  if (!req) {
    return `
      <div class="content-container">
        <div style="padding: 48px; text-align: center; background: #FFFFFF; border-radius: 12px; border: 1px solid #E2E8F0;">
          <h2>Request Not Found</h2>
          <a href="#/dashboard" class="btn btn-primary btn-sm" style="margin-top: 14px;">Return to Dashboard</a>
        </div>
      </div>
    `;
  }

  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalManager();
  const isChairman = authService.isChairman();
  const statusObj = REQUEST_STATUSES[req.status] || { label: req.status, badgeClass: 'badge-blue' };
  const priorityObj = REQUEST_PRIORITIES[req.priority] || { label: req.priority || 'Standard Priority', badgeClass: 'badge-blue', icon: 'âš¡' };

  return `
    <div class="content-container" style="max-width: 1200px;">
      <!-- Breadcrumb & Top Action Toolbar -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #64748B;">
          <a href="#/requests" style="color: #2563EB; text-decoration: none; font-weight: 500;">Requests</a>
          <span>/</span>
          <span style="font-family: var(--font-mono); font-weight: 700; color: #0F172A;">${req.requestId}</span>
        </div>

        <!-- Action Toolbar -->
        ${
          isChairman
            ? `<span class="badge badge-slate">ðŸ‘ï¸ Executive View-Only Mode</span>`
            : `<div style="display: flex; gap: 8px; flex-wrap: wrap;" id="request-action-toolbar">
                ${renderWorkflowActionButtons(req, isLegal)}
              </div>`
        }
      </div>

      <!-- Ticket Header Card -->
      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 22px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
              <span style="font-family: var(--font-mono); font-size: 14px; font-weight: 700; color: #2563EB; background: #EFF6FF; padding: 2px 8px; border-radius: 6px;">
                ${req.requestId}
              </span>
              <span class="badge ${statusObj.badgeClass}" style="font-size: 12px;">
                ${statusObj.label}
              </span>
              <span class="badge ${priorityObj.badgeClass}" style="font-size: 12px;">
                ${priorityObj.icon || 'âš¡'} ${priorityObj.label}
              </span>
              <span class="badge badge-slate">${req.departmentName}</span>
            </div>
            <h1 style="font-size: 20px; font-weight: 700; color: #0F172A;">
              ${req.title}
            </h1>
          </div>

          <div style="text-align: right;">
            <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748B;">Required Completion Date</div>
            <div style="font-family: var(--font-mono); font-size: 18px; font-weight: 700; color: #B45309; margin-top: 2px;">
              ${req.currentDueDate}
            </div>
            <div style="font-size: 11px; color: #94A3B8;">Assigned to: ${req.assignedLegalName}</div>
          </div>
        </div>
      </div>

      <!-- Reschedule Proposal Banner (If active) -->
      ${renderRescheduleProposalBanner(req, isLegal, isChairman)}

      <!-- Main Layout: Left Work Area + Right Ticket Info -->
      <div class="grid-2-1-col">
        
        <!-- Left: Description, Documents, Legal Remarks, Conversation -->
        <div>
          
          <!-- Description Card -->
          <div class="enterprise-card">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>ðŸ“</span>
                <span>Request Description</span>
              </div>
            </div>
            <div style="padding: 18px; font-size: 13.5px; line-height: 1.6; color: #1E293B;">
              ${req.description.replace(/\n/g, '<br/>')}
            </div>
          </div>

          <!-- Document Review & Version Area -->
          <div class="enterprise-card">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>ðŸ“</span>
                <span>Documents & Review Drafts</span>
              </div>
              ${
                isLegal && req.status !== 'COMPLETED'
                  ? `<button class="btn btn-secondary btn-sm" id="btn-upload-reviewed-doc">
                      + Upload Reviewed Version
                    </button>`
                  : ''
              }
            </div>
            <div style="padding: 16px;">
              <div style="display: flex; flex-direction: column; gap: 10px;">
                
                <!-- 1. Original Document -->
                <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; background: #FFFFFF; display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="font-size: 13px; font-weight: 600; color: #0F172A;">
                      ðŸ“„ Original Document
                    </div>
                    <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">
                      ${req.attachedDocument ? `${req.attachedDocument.name} (${req.attachedDocument.size})` : 'No document uploaded at intake.'}
                    </div>
                  </div>
                  ${
                    req.attachedDocument
                      ? `<button class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 3px 8px;" onclick="window.downloadDocumentFile('${req.attachedDocument.name}', '${req.title}')">ðŸ“¥ Download</button>`
                      : ''
                  }
                </div>

                <!-- 2. Legal Reviewed Document -->
                ${
                  req.reviewedDocument
                    ? `
                  <div style="border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px; background: #EFF6FF; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 13px; font-weight: 600; color: #1E40AF;">
                        ðŸ“ Legal Reviewed / Revised Version
                      </div>
                      <div style="font-size: 11.5px; color: #3B82F6; margin-top: 2px;">
                        ${req.reviewedDocument.name} (${req.reviewedDocument.size}) â€¢ Uploaded by ${req.reviewedDocument.uploadedBy}
                      </div>
                    </div>
                    <button class="btn btn-primary btn-sm" style="font-size: 11px; padding: 3px 8px;" onclick="window.downloadDocumentFile('${req.reviewedDocument.name}', '${req.title} - Reviewed Draft')">ðŸ“¥ Download Reviewed</button>
                  </div>
                `
                    : ''
                }

                <!-- 3. Final Signed Document -->
                ${
                  req.finalDocument
                    ? `
                  <div style="border: 1px solid #A7F3D0; border-radius: 8px; padding: 12px; background: #ECFDF5; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 13px; font-weight: 700; color: #065F46;">
                        ðŸ“œ FINAL EXECUTED AGREEMENT
                      </div>
                      <div style="font-size: 11.5px; color: #047857; margin-top: 2px;">
                        ${req.finalDocument.name} (${req.finalDocument.size}) â€¢ Uploaded by ${req.finalDocument.uploadedBy}
                      </div>
                    </div>
                    <button class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 3px 8px;" onclick="window.downloadDocumentFile('${req.finalDocument.name}', '${req.title} - Final Executed')">ðŸ“¥ Download Final</button>
                  </div>
                `
                    : ''
                }

              </div>

              <!-- Upload Final Signed Document Button for Business/Legal -->
              ${
                !isChairman && req.status !== 'COMPLETED'
                  ? `
                <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #E2E8F0; text-align: right;">
                  <button class="btn btn-secondary btn-sm" id="btn-upload-final-signed-doc" style="font-weight: 600;">
                    âœï¸ Upload Final Signed Document
                  </button>
                </div>
              `
                  : ''
              }
            </div>
          </div>

          <!-- Legal Remarks Section -->
          <div class="enterprise-card" style="border-left: 4px solid #7C3AED;">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>âš–ï¸</span>
                <span>Legal Review Remarks (${req.legalRemarks ? req.legalRemarks.length : 0})</span>
              </div>
              ${
                isLegal && req.status !== 'COMPLETED'
                  ? `<button class="btn btn-secondary btn-sm" id="btn-add-legal-remark">
                      + Add Legal Remark
                    </button>`
                  : ''
              }
            </div>
            <div style="padding: 16px;">
              ${
                !req.legalRemarks || req.legalRemarks.length === 0
                  ? `<div style="text-align: center; color: #94A3B8; font-size: 13px; padding: 16px;">No legal review remarks added yet.</div>`
                  : req.legalRemarks
                      .map(
                        (rem, i) => `
                    <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
                      <div style="font-size: 13px; font-weight: 600; color: #0F172A;">
                        Remark #${i + 1}
                      </div>
                      <div style="font-size: 13px; color: #334155; margin-top: 4px; line-height: 1.5;">
                        ${rem.text}
                      </div>
                    </div>
                  `
                      )
                      .join('')
              }
            </div>
          </div>

          <!-- Jira/Slack-Style Conversation Thread -->
          <div class="enterprise-card">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>ðŸ’¬</span>
                <span>Request Conversation</span>
              </div>
            </div>
            <div style="padding: 16px;">
              <!-- Comments List -->
              <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px;">
                ${req.comments
                  .map(c => {
                    if (c.isInternalLegalOnly) {
                      return `
                        <div class="internal-legal-note">
                          <div style="display: flex; justify-content: space-between; font-size: 11.5px; font-weight: 700; color: #92400E; margin-bottom: 4px;">
                            <span>ðŸ”’ INTERNAL LEGAL NOTE â€¢ ${c.authorName} (${c.authorRole})</span>
                            <span style="font-size: 10px; color: #B45309;">${new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div style="font-size: 13px; color: #78350F; line-height: 1.4;">${c.text.replace(/\n/g, '<br/>')}</div>
                        </div>
                      `;
                    }
                    return `
                      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                          <div>
                            <strong style="font-size: 13px; color: #0F172A;">${c.authorName}</strong>
                            <span style="font-size: 11px; color: #64748B; margin-left: 6px;">(${c.authorRole})</span>
                          </div>
                          <span style="font-size: 11px; color: #94A3B8;">${new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div style="font-size: 13px; color: #334155; line-height: 1.5;">${c.text.replace(/\n/g, '<br/>')}</div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>

              <!-- New Comment Box -->
              ${
                !isChairman && req.status !== 'COMPLETED'
                  ? `
                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px;">
                  <div class="form-group" style="margin-bottom: 10px;">
                    <textarea id="ticket-comment-text" class="form-textarea" placeholder="Add a comment or reply..." style="min-height: 70px;"></textarea>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    ${
                      isLegal
                        ? `
                      <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #92400E; cursor: pointer;">
                        <input type="checkbox" id="comment-is-internal-checkbox" />
                        <span>ðŸ”’ Internal Legal Note (Legal Only)</span>
                      </label>
                    `
                        : `<div></div>`
                    }
                    <button class="btn btn-primary btn-sm" id="btn-submit-ticket-comment">
                      Send Comment
                    </button>
                  </div>
                </div>
              `
                  : ''
              }
            </div>
          </div>

        </div>

        <!-- Right Column: Ticket Metadata -->
        <div>
          <div class="enterprise-card">
            <div class="enterprise-card-header">
              <div class="enterprise-card-title">
                <span>ðŸ“‹</span>
                <span>Ticket Details</span>
              </div>
            </div>
            <div style="padding: 16px; font-size: 12.5px;">
              <div style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Request Type:</span>
                <strong>${req.requestType}</strong>
              </div>
              <div style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Department:</span>
                <span class="badge badge-slate">${req.departmentName}</span>
              </div>
              <div style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Requested By:</span>
                <strong>${req.requestorName} (${req.requestorRole})</strong>
              </div>
              <div style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Assigned Counsel:</span>
                <strong style="color: #2563EB;">${req.assignedLegalName}</strong>
              </div>
              <div style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Submitted On:</span>
                <span>${new Date(req.createdAt).toLocaleDateString()}</span>
              </div>
              <div style="padding: 8px 0; display: flex; justify-content: space-between;">
                <span style="color: #64748B;">Target Due Date:</span>
                <strong style="color: #B45309;">${req.currentDueDate}</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

function renderWorkflowActionButtons(req, isLegal) {
  if (req.status === 'COMPLETED') {
    return `<span class="badge badge-green" style="font-size: 13px; padding: 6px 12px;">âœ“ Request Completed</span>`;
  }
  if (req.status === 'REJECTED') {
    return `<span class="badge badge-rose" style="font-size: 13px; padding: 6px 12px;">âœ• Request Rejected</span>`;
  }

  let buttons = '';

  if (isLegal) {
    if (req.status === 'PENDING_ACCEPTANCE') {
      buttons += `
        <button class="btn btn-primary btn-sm" onclick="window.legalAcceptRequest('${req.id}')">âœ“ Accept</button>
        <button class="btn btn-danger btn-sm" onclick="window.legalRejectRequest('${req.id}')">âœ• Reject</button>
        <button class="btn btn-secondary btn-sm" onclick="window.legalRescheduleRequest('${req.id}')">â±ï¸ Reschedule</button>
      `;
    } else if (req.status === 'UNDER_LEGAL_REVIEW' || req.status === 'ACCEPTED') {
      buttons += `
        <button class="btn btn-primary btn-sm" onclick="window.legalSubmitToBusiness('${req.id}')">ðŸš€ Submit Review to Business</button>
        <button class="btn btn-secondary btn-sm" onclick="window.legalRescheduleRequest('${req.id}')">â±ï¸ Reschedule</button>
      `;
    } else if (req.status === 'BUSINESS_ACTION_REQUIRED' || req.status === 'FINAL_DOCUMENT_REQUIRED') {
      buttons += `
        <button class="btn btn-primary btn-sm" onclick="window.legalMarkCompleted('${req.id}')">âœ“ Mark Completed & Store in Vault</button>
      `;
    }
  }

  return buttons;
}

function renderRescheduleProposalBanner(req, isLegal, isChairman) {
  if (req.status !== 'RESCHEDULED' || !req.rescheduleProposal) return '';

  const proposal = req.rescheduleProposal;

  // Case A: Business Stakeholder has Counter-Proposed
  if (proposal.status === 'COUNTER_PROPOSED_BY_BUSINESS') {
    if (isLegal) {
      return `
        <div style="
          background: #FFF7ED;
          border: 1px solid #FFEDD5;
          border-left: 4px solid #EA580C;
          border-radius: 8px;
          padding: 16px 20px;
          margin-bottom: 20px;
        ">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
            <div>
              <strong style="font-size: 14.5px; color: #9A3412;">
                âš ï¸ Business Declined Reschedule & Requested ${proposal.counterDate || proposal.originalDate}
              </strong>
              <div style="font-size: 13px; color: #C2410C; margin-top: 6px; line-height: 1.5;">
                Requested Completion Date: <strong style="font-size: 14px;">${proposal.counterDate || proposal.originalDate}</strong><br/>
                Stakeholder Justification: <em>"${proposal.counterReason || 'Priority request, needed ASAP'}"</em>
              </div>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" onclick="window.legalAcceptBusinessCounterDate('${req.id}')">
                âœ“ Accept Requested Date (${proposal.counterDate || proposal.originalDate})
              </button>
              <button class="btn btn-secondary btn-sm" onclick="window.legalRescheduleRequest('${req.id}')">
                â±ï¸ Propose Revised Date
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div style="
          background: #F0FDF4;
          border: 1px solid #DCFCE7;
          border-left: 4px solid #16A34A;
          border-radius: 8px;
          padding: 16px 20px;
          margin-bottom: 20px;
        ">
          <div style="font-size: 14px; font-weight: 700; color: #15803D;">
            ðŸ“¨ Counter-Proposal Sent to Monisha (Legal Manager)
          </div>
          <div style="font-size: 13px; color: #166534; margin-top: 4px;">
            You requested completion by <strong>${proposal.counterDate || proposal.originalDate}</strong> (Reason: <em>"${proposal.counterReason}"</em>). Awaiting Legal confirmation.
          </div>
        </div>
      `;
    }
  }

  // Case B: Legal Manager has proposed a new date (Waiting for Business Response)
  return `
    <div style="
      background: #FFFBEB;
      border: 1px solid #FDE68A;
      border-left: 4px solid #F59E0B;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 20px;
    ">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
        <div>
          <strong style="font-size: 14.5px; color: #92400E;">
            â±ï¸ Legal Has Proposed a New Completion Date
          </strong>
          <div style="font-size: 13px; color: #78350F; margin-top: 6px;">
            Original Date: <strong>${proposal.originalDate}</strong> â†’ Proposed Date: <strong>${proposal.proposedDate}</strong><br/>
            Reason: <em>"${proposal.reason}"</em>
          </div>
        </div>

        ${
          !isLegal && !isChairman
            ? `
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm" onclick="window.businessAcceptReschedule('${req.id}')">
              âœ“ Accept Proposed Date (${proposal.proposedDate})
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.businessRejectReschedule('${req.id}')">
              âœ• Decline / Propose Alternative
            </button>
          </div>
        `
            : `<span class="badge badge-amber">Awaiting Business Stakeholder Response</span>`
        }
      </div>
    </div>
  `;
}

// === File: src\js\pages\DocumentsPage.js ===
/**
 * Impacteers DMS â€” Enterprise In-House Legal & Document Management System
 * Centralized Legal Document Repository & Vault Page
 * With "+ Add Document" Dialog, Department Sharing Permissions & Delete Actions
 */


function renderDocumentsPage() {
  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalManager();
  const isChairman = authService.isChairman();
  const docs = documentService.getDocuments();

  return `
    <div class="content-container" style="max-width: 1200px;">
      
      <!-- Page Header -->
      <div class="page-header" style="margin-bottom: 20px;">
        <div>
          <h1 class="page-title" style="font-size: 22px; font-weight: 700; color: #0F172A;">
            ðŸ“ Documents Vault & Repository
          </h1>
          <p class="page-subtitle" style="font-size: 13px; color: #64748B; margin-top: 2px;">
            Central repository of executed agreements, master contracts, and company legal records.
          </p>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          ${
            isLegal
              ? `
            <button class="btn btn-secondary btn-sm" id="btn-purge-all-docs" onclick="window.deleteAllVaultDocuments()" style="font-size: 12px; color: #DC2626; border-color: #FECDD3; background: #FFF1F2;">
              ðŸ—‘ï¸ Clear All Old Documents
            </button>
            <button class="btn btn-primary btn-sm" id="btn-vault-add-doc" style="font-size: 12.5px; padding: 7px 14px; font-weight: 600;">
              + Add Document
            </button>
          `
              : ''
          }
        </div>
      </div>

      <!-- Filters & Search Bar -->
      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        padding: 12px 16px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      ">
        <div style="flex: 1; min-width: 220px;">
          <input 
            type="text" 
            id="doc-search-input" 
            class="form-input" 
            placeholder="Search documents by title, file name, keyword, or counterparty..." 
            oninput="window.filterVaultDocs()"
            style="height: 36px; font-size: 13px; padding: 6px 12px;"
          />
        </div>

        <div>
          <select id="doc-dept-filter" class="form-select" onchange="window.filterVaultDocs()" style="min-width: 170px; height: 36px; font-size: 12.5px; padding: 6px 10px;">
            <option value="">All Scopes & Departments</option>
            <option value="ALL">Company-Wide (All)</option>
            <option value="LEGAL_ONLY">Confidential Legal Only</option>
            ${DEPARTMENTS.map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
          </select>
        </div>

        <div>
          <select id="doc-type-filter" class="form-select" onchange="window.filterVaultDocs()" style="min-width: 150px; height: 36px; font-size: 12.5px; padding: 6px 10px;">
            <option value="">All Document Types</option>
            <option value="Agreement">Agreement</option>
            <option value="MSA">Master Services Agreement (MSA)</option>
            <option value="MOU">MOU</option>
            <option value="NDA">NDA</option>
            <option value="Policy">Corporate Policy</option>
            <option value="License">Software License</option>
          </select>
        </div>

        <button id="doc-reset-filter-btn" class="btn btn-secondary btn-sm" onclick="
          const s = document.getElementById('doc-search-input');
          const d = document.getElementById('doc-dept-filter');
          const t = document.getElementById('doc-type-filter');
          if (s) s.value = '';
          if (d) d.value = '';
          if (t) t.value = '';
          window.filterVaultDocs();
        " style="height: 36px; padding: 0 12px; font-size: 12px;">
          Reset
        </button>
      </div>

      <!-- Documents Table Card -->
      <div class="enterprise-card" style="box-shadow: 0 1px 3px rgba(0,0,0,0.04); border-radius: 10px; overflow: hidden;">
        <div class="enterprise-card-header" style="padding: 12px 18px; background: #FAFAFA; border-bottom: 1px solid #E2E8F0;">
          <div class="enterprise-card-title" style="font-size: 13.5px; font-weight: 700; color: #0F172A;">
            <span>Total Vault Records: <strong id="doc-count" style="color: #2563EB;">${docs.length}</strong></span>
          </div>
        </div>

        <div class="table-responsive">
          <table class="enterprise-table" id="vault-docs-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Document Title</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Type</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 180px;">Shared Scope</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 120px;">Effective Date</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 110px;">Status</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 160px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="docs-tbody">
              ${renderVaultDocRows(docs)}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

function renderVaultDocRows(docs) {
  const isLegal = authService.isLegalManager();

  if (!docs || docs.length === 0) {
    return `
      <tr>
        <td colspan="6" style="text-align: center; padding: 40px 16px; color: #94A3B8;">
          <div style="font-size: 28px; margin-bottom: 6px;">ðŸ“‚</div>
          <div style="font-size: 14px; font-weight: 600; color: #475569;">No documents found in vault.</div>
          <div style="font-size: 12px; color: #94A3B8; margin-top: 2px;">Click "+ Add Document" above to upload a new record.</div>
        </td>
      </tr>
    `;
  }

  return docs
    .map(doc => {
      const fileName = doc.fileName || (doc.versions && doc.versions.length ? doc.versions[doc.versions.length - 1].fileName : `${doc.title}.pdf`);
      const fileSize = doc.fileSize || '2.2 MB';

      let scopeBadge = `<span class="badge badge-slate" style="font-size: 11px;">${doc.departmentName}</span>`;
      if (doc.departmentId === 'ALL') {
        scopeBadge = `<span class="badge badge-blue" style="font-size: 11px;">ðŸŒ All Departments</span>`;
      } else if (doc.departmentId === 'LEGAL_ONLY' || doc.isPrivilegedOnly) {
        scopeBadge = `<span class="badge badge-rose" style="font-size: 11px;">ðŸ”’ Legal & Chairman</span>`;
      }

      return `
      <tr style="border-bottom: 1px solid #F1F5F9; transition: background 0.1s ease;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
        <td style="padding: 12px 16px; vertical-align: middle;">
          <div style="font-weight: 600; font-size: 13.5px; color: #0F172A; display: flex; align-items: center; gap: 6px;">
            <span>ðŸ“œ</span>
            <span>${doc.title}</span>
          </div>
          <div style="font-size: 11.5px; color: #64748B; margin-top: 2px; margin-left: 22px;">
            ${fileName} (${fileSize})
          </div>
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; font-size: 12.5px; color: #334155;">
          ${doc.documentType || doc.category || 'Agreement'}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle;">
          ${scopeBadge}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; font-family: var(--font-mono); font-size: 12px; color: #475569;">
          ${doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : 'Active'}
        </td>
        <td style="padding: 12px 16px; vertical-align: middle;">
          <span class="badge badge-green" style="font-size: 11px;">${doc.status || 'Executed'}</span>
        </td>
        <td style="padding: 12px 16px; vertical-align: middle; text-align: right; white-space: nowrap;">
          <div style="display: flex; gap: 6px; justify-content: flex-end; align-items: center;">
            <button 
              class="btn btn-secondary btn-sm" 
              style="padding: 3px 8px; font-size: 11px; font-weight: 600;" 
              onclick="window.downloadDocumentFile('${fileName}', '${doc.title.replace(/'/g, "\\'")}')"
            >
              ðŸ“¥ Download
            </button>
            ${
              isLegal
                ? `
              <button 
                class="btn btn-secondary btn-sm" 
                style="padding: 3px 8px; font-size: 11px; font-weight: 600; color: #DC2626; border-color: #FECDD3;" 
                onclick="window.deleteVaultDocument('${doc.id}', '${doc.title.replace(/'/g, "\\'")}')"
                title="Delete this document"
              >
                ðŸ—‘ï¸ Delete
              </button>
            `
                : ''
            }
          </div>
        </td>
      </tr>
    `;
    })
    .join('');
}

// === File: src\js\pages\DepartmentsPage.js ===
/**
 * Impacteers DMS â€” Enterprise In-House Legal & Document Management System
 * Document Database & Contracts Repository Page
 * Shows all company legal agreements across departments with search and filtering
 */


function renderDepartmentsPage(selectedDeptId = null) {
  const user = authService.getCurrentUser();
  const isLegal = authService.isLegalManager();
  const isChairman = authService.isChairman();

  let allDocs = documentService.getDocuments();
  
  if (selectedDeptId && selectedDeptId !== 'ALL') {
    allDocs = allDocs.filter(d => d.departmentId === selectedDeptId || (selectedDeptId === 'LEGAL_ONLY' && (d.departmentId === 'LEGAL_ONLY' || d.isPrivilegedOnly)));
  }

  return `
    <div class="content-container" style="max-width: 1200px;">
      
      <!-- Page Header -->
      <div class="page-header" style="margin-bottom: 20px;">
        <div>
          <h1 class="page-title" style="font-size: 22px; font-weight: 700; color: #0F172A;">
            ðŸ—„ï¸ Document & Contracts Database
          </h1>
          <p class="page-subtitle" style="font-size: 13px; color: #64748B; margin-top: 2px;">
            Central enterprise database indexing all active contracts, department agreements, and approved legal records.
          </p>
        </div>
      </div>

      <!-- Department Filter Pills -->
      <div style="
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding-bottom: 12px;
        margin-bottom: 16px;
      ">
        <button 
          class="btn btn-sm ${!selectedDeptId || selectedDeptId === 'ALL' ? 'btn-primary' : 'btn-secondary'}" 
          style="border-radius: 20px; padding: 5px 14px; font-size: 12px; font-weight: 600;"
          onclick="window.filterDatabaseDept('ALL')"
        >
          All Departments (${documentService.getDocuments().length})
        </button>

        ${DEPARTMENTS.map(d => {
          const count = documentService.getDocuments().filter(doc => doc.departmentId === d.id).length;
          const isSelected = selectedDeptId === d.id;
          return `
            <button 
              class="btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}" 
              style="border-radius: 20px; padding: 5px 14px; font-size: 12px; font-weight: 600; white-space: nowrap;"
              onclick="window.filterDatabaseDept('${d.id}')"
            >
              ${d.name} (${count})
            </button>
          `;
        }).join('')}

        ${
          isLegal || isChairman
            ? `
          <button 
            class="btn btn-sm ${selectedDeptId === 'LEGAL_ONLY' ? 'btn-primary' : 'btn-secondary'}" 
            style="border-radius: 20px; padding: 5px 14px; font-size: 12px; font-weight: 600; white-space: nowrap;"
            onclick="window.filterDatabaseDept('LEGAL_ONLY')"
          >
            ðŸ”’ Legal Vault
          </button>
        `
            : ''
        }
      </div>

      <!-- Search Bar -->
      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        padding: 12px 16px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      ">
        <div style="flex: 1;">
          <input 
            type="text" 
            id="database-doc-search" 
            class="form-input" 
            placeholder="Search across all contracts and department documents..." 
            oninput="window.filterDatabaseSearch('${selectedDeptId || 'ALL'}')"
            style="height: 36px; font-size: 13px; padding: 6px 12px;"
          />
        </div>
        <button class="btn btn-secondary btn-sm" onclick="
          const s = document.getElementById('database-doc-search');
          if (s) s.value = '';
          window.filterDatabaseSearch('${selectedDeptId || 'ALL'}');
        " style="height: 36px; padding: 0 12px; font-size: 12px;">
          Reset
        </button>
      </div>

      <!-- Database Table Card -->
      <div class="enterprise-card" style="box-shadow: 0 1px 3px rgba(0,0,0,0.04); border-radius: 10px; overflow: hidden;">
        <div class="enterprise-card-header" style="padding: 12px 18px; background: #FAFAFA; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
          <div class="enterprise-card-title" style="font-size: 13.5px; font-weight: 700; color: #0F172A;">
            <span>Document Records (<strong id="database-doc-count" style="color: #2563EB;">${allDocs.length}</strong>)</span>
          </div>
        </div>

        <div class="table-responsive">
          <table class="enterprise-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Document Title</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Type</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Department</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 120px;">Effective Date</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 110px;">Status</th>
                <th style="padding: 10px 16px; font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; width: 150px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="database-doc-tbody">
              ${renderDatabaseDocRows(allDocs)}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

function renderDatabaseDocRows(allDocs) {
  const isLegal = authService.isLegalManager();

  if (!allDocs || allDocs.length === 0) {
    return `<tr><td colspan="6" style="text-align: center; padding: 40px 16px; color: #94A3B8;">
      <div style="font-size: 26px; margin-bottom: 4px;">ðŸ“‚</div>
      <div style="font-size: 13.5px; font-weight: 600; color: #475569;">No documents found.</div>
      <div style="font-size: 12px; color: #94A3B8; margin-top: 2px;">Try adjusting your search terms or department filters.</div>
    </td></tr>`;
  }

  return allDocs
    .map(doc => {
      const fileName = doc.fileName || `${doc.title.replace(/\s+/g, '_')}.pdf`;
      const fileSize = doc.fileSize || '2.0 MB';
      return `
    <tr style="border-bottom: 1px solid #F1F5F9; transition: background 0.1s ease;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
      <td style="padding: 12px 16px; vertical-align: middle;">
        <div style="font-weight: 600; font-size: 13.5px; color: #0F172A; display: flex; align-items: center; gap: 6px;">
          <span>ðŸ“œ</span>
          <span>${doc.title}</span>
        </div>
        <div style="font-size: 11.5px; color: #64748B; margin-top: 2px; margin-left: 22px;">
          ${fileName} (${fileSize})
        </div>
      </td>
      <td style="padding: 12px 16px; vertical-align: middle; font-size: 12.5px; color: #334155;">
        ${doc.documentType || doc.category || 'Agreement'}
      </td>
      <td style="padding: 12px 16px; vertical-align: middle;">
        <span class="badge badge-slate" style="font-size: 11px;">${doc.departmentName}</span>
      </td>
      <td style="padding: 12px 16px; vertical-align: middle; font-family: var(--font-mono); font-size: 12px; color: #475569;">
        ${doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : 'Active'}
      </td>
      <td style="padding: 12px 16px; vertical-align: middle;">
        <span class="badge badge-green" style="font-size: 11px;">${doc.status || 'Executed'}</span>
      </td>
      <td style="padding: 12px 16px; vertical-align: middle; text-align: right; white-space: nowrap;">
        <div style="display: flex; gap: 6px; justify-content: flex-end; align-items: center;">
          <button 
            class="btn btn-secondary btn-sm" 
            style="padding: 3px 8px; font-size: 11px; font-weight: 600;" 
            onclick="window.downloadDocumentFile('${fileName}', '${doc.title.replace(/'/g, "\\'")}')"
          >
            ðŸ“¥ Download
          </button>
          ${
            isLegal
              ? `
            <button 
              class="btn btn-secondary btn-sm" 
              style="padding: 3px 8px; font-size: 11px; font-weight: 600; color: #DC2626; border-color: #FECDD3;" 
              onclick="window.deleteVaultDocument('${doc.id}', '${doc.title.replace(/'/g, "\\'")}')"
              title="Delete this document"
            >
              ðŸ—‘ï¸ Delete
            </button>
          `
              : ''
          }
        </div>
      </td>
    </tr>
  `;
    })
    .join('');
}

// === File: src\js\pages\CalendarPage.js ===
/**
 * Impacteers LMS â€” Legal Management System
 * Senior UI/UX Designer Grade Centered Calendar
 * Symmetrical 7-Column Grid, Pixel-Perfect Centering, Real Date Math (Day 1 to 31)
 */


let calendarMonthOffset = 0;

function renderCalendarPage(monthOffset = 0) {
  calendarMonthOffset = monthOffset;
  const requests = requestService.getRequests();

  // Filter requests with target completion due dates
  const dueRequests = requests.filter(r => r.currentDueDate);

  // Month navigation calculation (Base: August 2026)
  const baseDate = new Date(2026, 7, 1); // 2026-08-01 (August)
  baseDate.setMonth(baseDate.getMonth() + monthOffset);

  const year = baseDate.getFullYear();
  const month = baseDate.getMonth(); // 0-indexed (7 = August)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[month];

  // Calendar Math:
  // First day of month: 0 = Sun, 1 = Mon, ..., 6 = Sat
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Total days in this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Days in previous month
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Current system date for "Today" badge
  const todayStr = '2026-08-28';

  // Map events by date 'YYYY-MM-DD'
  const eventsByDate = {};
  dueRequests.forEach(r => {
    const d = r.currentDueDate;
    if (!eventsByDate[d]) eventsByDate[d] = [];
    eventsByDate[d].push(r);
  });

  return `
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center; padding: 10px 0 40px 0;">
      
      <!-- Perfectly Centered Container (Max-Width 1020px) -->
      <div style="width: 100%; max-width: 1020px; margin: 0 auto;">
        
        <!-- Header: Centered Title & Navigation Toolbar -->
        <div style="
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 16px 24px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        ">
          
          <!-- Month & Year Title -->
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 40px; 
              height: 40px; 
              border-radius: 10px; 
              background: linear-gradient(135deg, #EFF6FF, #DBEAFE); 
              color: #2563EB; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              font-size: 20px;
              box-shadow: inset 0 0 0 1px rgba(37, 99, 235, 0.1);
            ">
              ðŸ—“ï¸
            </div>
            <div>
              <h1 style="font-size: 20px; font-weight: 800; color: #0F172A; margin: 0; letter-spacing: -0.02em;">
                ${currentMonthName} ${year}
              </h1>
              <div style="font-size: 12px; color: #64748B; margin-top: 1px; font-weight: 500;">
                ${daysInMonth} Days â€¢ ${dueRequests.length} Scheduled Contract Deadlines
              </div>
            </div>
          </div>

          <!-- Navigation Pills -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <button 
              class="btn btn-secondary btn-sm" 
              style="font-size: 12px; font-weight: 600; padding: 5px 12px; height: 34px; border-radius: 8px;"
              onclick="window.navigateCalendar(${monthOffset - 1})"
              title="Previous Month"
            >
              â€¹ Prev
            </button>

            <button 
              class="btn btn-secondary btn-sm" 
              style="font-size: 12px; font-weight: 600; padding: 5px 14px; height: 34px; border-radius: 8px; background: #EFF6FF; color: #2563EB; border-color: #BFDBFE;"
              onclick="window.navigateCalendar(0)"
              title="Jump to Current Date"
            >
              Today
            </button>

            <button 
              class="btn btn-secondary btn-sm" 
              style="font-size: 12px; font-weight: 600; padding: 5px 12px; height: 34px; border-radius: 8px;"
              onclick="window.navigateCalendar(${monthOffset + 1})"
              title="Next Month"
            >
              Next â€º
            </button>
          </div>

        </div>

        <!-- Main Centered Calendar Card with Responsive Horizontal Scroll Container -->
        <div class="calendar-scroll-wrapper">
          <div class="calendar-grid-inner">
            <!-- 7-Column Weekday Header Bar -->
            <div style="
              display: grid;
              grid-template-columns: repeat(7, 1fr);
              background: #F8FAFC;
              border-bottom: 1px solid #E2E8F0;
              text-align: center;
            ">
              ${['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => `
                <div style="
                  padding: 12px 0;
                  font-size: 11.5px;
                  font-weight: 700;
                  color: ${day === 'SUN' || day === 'SAT' ? '#94A3B8' : '#475569'};
                  letter-spacing: 0.06em;
                  border-right: 1px solid #F1F5F9;
                ">
                  ${day}
                </div>
              `).join('')}
            </div>

            <!-- Symmetrical 7-Column Date Grid (1px border separation) -->
            <div style="
              display: grid;
              grid-template-columns: repeat(7, 1fr);
              background: #E2E8F0;
              gap: 1px;
            ">
              ${renderCenteredCalendarCells(year, month, firstDayIndex, daysInMonth, prevMonthDays, eventsByDate, todayStr)}
            </div>
          </div>
        </div>

        <!-- Bottom Legend & Helper Note -->
        <div style="
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #64748B;
          padding: 0 4px;
        ">
          <div style="display: flex; gap: 18px; align-items: center;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #2563EB; display: inline-block;"></span>
              <span style="font-weight: 500;">Today's Date</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 3px; background: #EFF6FF; border: 1px solid #93C5FD; display: inline-block;"></span>
              <span style="font-weight: 500;">Active Task / Review Due</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 3px; background: #ECFDF5; border: 1px solid #A7F3D0; display: inline-block;"></span>
              <span style="font-weight: 500;">Completed Contract</span>
            </div>
          </div>
          <div>
            <span style="color: #64748B; font-weight: 500;">ðŸ’¡ Click any agreement tag to jump straight into the task review.</span>
          </div>
        </div>

      </div>

    </div>
  `;
}

function renderCenteredCalendarCells(year, month, firstDayIndex, daysInMonth, prevMonthDays, eventsByDate, todayStr) {
  let cellsHtml = '';

  // 1. Previous Month Days Padding (Equal height 100px, subtle gray)
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const prevDayNum = prevMonthDays - i;
    cellsHtml += `
      <div style="
        height: 100px;
        background: #F8FAFC;
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
      ">
        <span style="font-size: 12px; font-weight: 500; color: #CBD5E1;">${prevDayNum}</span>
      </div>
    `;
  }

  // 2. Current Month Days (Day 1 through Day 31)
  for (let day = 1; day <= daysInMonth; day++) {
    const dayPadded = String(day).padStart(2, '0');
    const monthPadded = String(month + 1).padStart(2, '0');
    const dateKey = `${year}-${monthPadded}-${dayPadded}`;
    const isToday = dateKey === todayStr;
    const events = eventsByDate[dateKey] || [];

    cellsHtml += `
      <div style="
        height: 100px;
        background: ${isToday ? '#F0F7FF' : '#FFFFFF'};
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
        transition: background 0.12s ease;
        position: relative;
        overflow: hidden;
      " onmouseover="this.style.background='${isToday ? '#E0EFFF' : '#F8FAFC'}'" onmouseout="this.style.background='${isToday ? '#F0F7FF' : '#FFFFFF'}'">
        
        <!-- Day Number Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          ${
            isToday
              ? `
            <div style="
              width: 24px; 
              height: 24px; 
              border-radius: 50%; 
              background: #2563EB; 
              color: #FFFFFF; 
              font-size: 12px; 
              font-weight: 800; 
              display: flex; 
              align-items: center; 
              justify-content: center;
              box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);
            ">
              ${day}
            </div>
            <span style="font-size: 9.5px; font-weight: 800; color: #2563EB; background: #DBEAFE; padding: 1px 5px; border-radius: 4px;">TODAY</span>
          `
              : `
            <span style="font-size: 12.5px; font-weight: 700; color: #1E293B;">
              ${day === 1 ? 'Aug 1' : day}
            </span>
          `
          }
        </div>

        <!-- Agreement / Task Tags Container -->
        <div style="display: flex; flex-direction: column; gap: 3px; overflow-y: auto; flex: 1;">
          ${events.map(ev => {
            const isCompleted = ev.status === 'COMPLETED';
            return `
            <a 
              href="#/requests/${ev.id}" 
              title="${ev.requestId}: ${ev.title} (${ev.departmentName}) - Click to review task"
              style="
                text-decoration: none;
                background: ${isCompleted ? '#ECFDF5' : '#EFF6FF'};
                color: ${isCompleted ? '#065F46' : '#1D4ED8'};
                border-left: 3px solid ${isCompleted ? '#10B981' : '#2563EB'};
                border-radius: 4px;
                padding: 3px 6px;
                display: block;
                font-size: 11px;
                font-weight: 600;
                line-height: 1.25;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                transition: all 0.1s ease;
              "
              onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.06)';"
              onmouseout="this.style.transform='none'; this.style.boxShadow='none';"
            >
              ðŸ“„ ${ev.title}
            </a>
          `;
          }).join('')}
        </div>

      </div>
    `;
  }

  // 3. Next Month Days Padding to complete the grid (Equal 100px height)
  const totalCells = firstDayIndex + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let j = 1; j <= remainingCells; j++) {
    cellsHtml += `
      <div style="
        height: 100px;
        background: #F8FAFC;
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
      ">
        <span style="font-size: 12px; font-weight: 500; color: #CBD5E1;">${j}</span>
      </div>
    `;
  }

  return cellsHtml;
}

window.navigateCalendar = function(offset) {
  calendarMonthOffset = offset;
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.innerHTML = renderCalendarPage(calendarMonthOffset);
  }
};

// === File: src\js\pages\LegalAssistantPage.js ===
/**
 * Impacteers DMS â€” Enterprise In-House Legal & Document Management System
 * Full 3-Panel Enterprise AI Legal Assistant & Contract Audit Workspace
 */


function renderLegalAssistantPage() {
  const user = authService.getCurrentUser();
  const sessions = aiService.getSessions();
  const currentSession = aiService.getCurrentSession() || (sessions.length ? sessions[0] : null);
  const activeJurisdiction = currentSession ? currentSession.jurisdiction : aiService.getJurisdiction();
  const activeMode = aiService.getMode();
  const suggestedPrompts = legalAssistantService.getSuggestedPrompts();
  const vaultDocs = legalAssistantService.getAuthorizedContextDocuments();
  const disclaimer = legalAssistantService.getSafetyDisclaimer();

  const attachedDoc = currentSession ? currentSession.attachedDocument : null;
  const messages = currentSession ? currentSession.messages : [];
  const extractedClauses = attachedDoc ? legalAssistantService.extractClauses(attachedDoc.text) : [];

  return `
    <div class="content-container" style="max-width: 1440px; padding: 0 16px 24px 16px;">
      
      <!-- Top Page Breadcrumb & Quick Info -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <h1 style="font-size: 22px; font-weight: 700; color: #0F172A; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>âš–ï¸</span>
            <span>AI Legal Assistant & Contract Workspace</span>
          </h1>
          <span class="badge badge-blue" style="font-size: 11.5px; font-weight: 700; padding: 3px 10px;">Enterprise AI</span>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <div id="ai-backend-status-pill" style="font-size: 12px; padding: 4px 12px; border-radius: 20px; background: #ECFDF5; color: #065F46; font-weight: 700; display: flex; align-items: center; gap: 6px; border: 1px solid #A7F3D0;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
            <span>AI Gateway Connected</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.showAIConfigModal()" style="font-size: 12px;">
            âš™ï¸ AI & Provider Settings
          </button>
        </div>
      </div>

      <!-- Mandatory Safety & Regulatory Disclaimer Banner -->
      <div style="
        background: #EFF6FF;
        border: 1px solid #BFDBFE;
        border-left: 4px solid #2563EB;
        border-radius: 8px;
        padding: 10px 16px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
      ">
        <span style="font-size: 18px;">ðŸ›¡ï¸</span>
        <div style="font-size: 12px; color: #1E40AF; line-height: 1.45;">
          <strong>Legal Information Notice:</strong> ${disclaimer}
        </div>
      </div>

      <!-- 3-Panel Main Layout Container -->
      <div style="
        display: grid;
        grid-template-columns: 280px 1fr 300px;
        gap: 16px;
        height: calc(100vh - 230px);
        min-height: 600px;
      " id="ai-three-panel-grid">

        <!-- ================================================================= -->
        <!-- PANEL 1 (LEFT): Chat Sessions & Jurisdiction Controls -->
        <!-- ================================================================= -->
        <div style="
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        ">
          <!-- New Chat Button -->
          <div style="padding: 14px; border-bottom: 1px solid #E2E8F0;">
            <button class="btn btn-primary" style="width: 100%; justify-content: center; font-weight: 600; font-size: 13px;" onclick="window.handleCreateNewChat()">
              âž• New Legal Chat
            </button>
          </div>

          <!-- Jurisdiction Selector Card -->
          <div style="padding: 12px 14px; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
            <label style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #475569; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">
              ðŸ“ Active Jurisdiction
            </label>
            <select id="ai-jurisdiction-select" class="form-select" onchange="window.handleJurisdictionChange(this.value)" style="font-size: 12.5px; padding: 6px 10px; font-weight: 600; color: #0F172A;">
              <option value="India" ${activeJurisdiction === 'India' ? 'selected' : ''}>ðŸ‡®ðŸ‡³ India (National Law)</option>
              <option value="Tamil Nadu" ${activeJurisdiction === 'Tamil Nadu' ? 'selected' : ''}>ðŸ‡®ðŸ‡³ Tamil Nadu (State Law & Regulations)</option>
              <option value="Delaware / US" ${activeJurisdiction === 'Delaware / US' ? 'selected' : ''}>ðŸ‡ºðŸ‡¸ Delaware / US (Corporate Law)</option>
              <option value="United Kingdom" ${activeJurisdiction === 'United Kingdom' ? 'selected' : ''}>ðŸ‡¬ðŸ‡§ United Kingdom (Common Law)</option>
              <option value="Custom" ${activeJurisdiction === 'Custom' ? 'selected' : ''}>ðŸŒ Custom / International</option>
            </select>
          </div>

          <!-- Analysis Mode Switcher -->
          <div style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; background: #FFFFFF;">
            <label style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #475569; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">
              ðŸŽ¯ Analysis Focus
            </label>
            <select id="ai-mode-select" class="form-select" onchange="window.handleModeChange(this.value)" style="font-size: 12px; padding: 5px 8px;">
              <option value="general" ${activeMode === 'general' ? 'selected' : ''}>âš–ï¸ General Legal Q&A</option>
              <option value="review" ${activeMode === 'review' ? 'selected' : ''}>ðŸ“‘ Full Contract Audit</option>
              <option value="explainer" ${activeMode === 'explainer' ? 'selected' : ''}>ðŸ” Clause Explainer</option>
              <option value="compare" ${activeMode === 'compare' ? 'selected' : ''}>âš–ï¸ Compare Clauses</option>
              <option value="missing_clauses" ${activeMode === 'missing_clauses' ? 'selected' : ''}>âš ï¸ Missing Clauses Audit</option>
              <option value="checklist" ${activeMode === 'checklist' ? 'selected' : ''}>ðŸ“‹ Compliance Checklist</option>
            </select>
          </div>

          <!-- Sessions List Header -->
          <div style="padding: 10px 14px; font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between; align-items: center;">
            <span>Recent Consultations</span>
            <span style="font-size: 10.5px; background: #E2E8F0; padding: 1px 6px; border-radius: 10px; color: #334155;">${sessions.length}</span>
          </div>

          <!-- Sessions List -->
          <div style="flex: 1; overflow-y: auto; padding: 0 8px;" id="ai-sessions-list-container">
            ${sessions
              .map(s => {
                const isActive = currentSession && currentSession.id === s.id;
                const msgCount = s.messages ? s.messages.length : 0;
                return `
                <div 
                  onclick="window.handleSelectSession('${s.id}')"
                  style="
                    padding: 10px 12px;
                    border-radius: 8px;
                    margin-bottom: 4px;
                    cursor: pointer;
                    background: ${isActive ? '#EFF6FF' : 'transparent'};
                    border: 1px solid ${isActive ? '#BFDBFE' : 'transparent'};
                    transition: all 0.15s ease;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                  "
                  onmouseover="if(!${isActive}) this.style.background='#F8FAFC'"
                  onmouseout="if(!${isActive}) this.style.background='transparent'"
                >
                  <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 12.5px; font-weight: ${isActive ? '700' : '500'}; color: ${isActive ? '#1E40AF' : '#1E293B'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${s.title}
                    </div>
                    <div style="font-size: 11px; color: #64748B; margin-top: 2px;">
                      ${new Date(s.updatedAt).toLocaleDateString()} â€¢ ${s.jurisdiction || 'India'}
                    </div>
                  </div>
                  <button 
                    onclick="event.stopPropagation(); window.handleDeleteSession('${s.id}')"
                    style="background: transparent; border: none; font-size: 12px; cursor: pointer; color: #94A3B8; padding: 2px 4px; border-radius: 4px;"
                    title="Delete consultation"
                    onmouseover="this.style.color='#DC2626'"
                    onmouseout="this.style.color='#94A3B8'"
                  >
                    ðŸ—‘ï¸
                  </button>
                </div>
              `;
              })
              .join('')}
          </div>

          <!-- Left Panel Footer -->
          <div style="padding: 10px 14px; border-top: 1px solid #E2E8F0; background: #FAFAFA;">
            <button class="btn btn-secondary btn-sm" style="width: 100%; font-size: 11.5px; justify-content: center; color: #64748B;" onclick="window.handleClearAllSessions()">
              ðŸ§¹ Clear All History
            </button>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- PANEL 2 (CENTER): Active Chat Stream & Composer -->
        <!-- ================================================================= -->
        <div style="
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        ">
          <!-- Active Conversation Header Bar -->
          <div style="
            padding: 12px 18px;
            background: #F8FAFC;
            border-bottom: 1px solid #E2E8F0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          ">
            <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;">
              <div style="font-size: 14px; font-weight: 700; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${currentSession ? currentSession.title : 'Legal Consultation'}
              </div>
              <span class="badge badge-slate" style="font-size: 11px;">
                ðŸ“ ${activeJurisdiction}
              </span>
            </div>

            <!-- Attached Document Pill / Status -->
            <div style="display: flex; align-items: center; gap: 8px;">
              ${
                attachedDoc
                  ? `
                <div style="font-size: 12px; padding: 4px 10px; border-radius: 6px; background: #EFF6FF; border: 1px solid #BFDBFE; color: #1E40AF; display: flex; align-items: center; gap: 6px;">
                  <span>ðŸ“„ ${attachedDoc.name}</span>
                  <span style="cursor: pointer; color: #DC2626; font-weight: 700;" onclick="window.handleRemoveAttachedDocument()" title="Remove document">âœ–</span>
                </div>
              `
                  : `
                <button class="btn btn-secondary btn-sm" onclick="window.openDocumentAttachModal()" style="font-size: 11.5px; padding: 4px 10px;">
                  ðŸ“Ž Attach Agreement / Clause
                </button>
              `
              }
              <button class="btn btn-secondary btn-sm" onclick="window.toggleRightInspector()" style="font-size: 11.5px; padding: 4px 10px;">
                ðŸ“Š Inspector
              </button>
            </div>
          </div>

          <!-- Chat Messages Container -->
          <div id="ai-chat-messages-scroll" style="
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            background: #FAFAFA;
          ">
            ${messages
              .map(msg => renderLegalMessageBubble(msg))
              .join('')}
          </div>

          <!-- Suggested Prompts Quick Bar -->
          <div style="
            padding: 8px 16px;
            background: #FFFFFF;
            border-top: 1px solid #F1F5F9;
            overflow-x: auto;
            display: flex;
            gap: 8px;
            white-space: nowrap;
          ">
            ${suggestedPrompts
              .map(
                p => `
              <button 
                class="btn btn-sm" 
                style="border-radius: 16px; padding: 4px 12px; font-size: 11.5px; background: #F1F5F9; color: #334155; border: 1px solid #E2E8F0;"
                onclick="window.handlePromptClick('${p.replace(/'/g, "\\'")}')"
              >
                ðŸ’¡ ${p}
              </button>
            `
              )
              .join('')}
          </div>

          <!-- Input Composer Area -->
          <div style="
            padding: 12px 16px;
            background: #FFFFFF;
            border-top: 1px solid #E2E8F0;
          ">
            <div style="display: flex; gap: 10px; align-items: flex-end;">
              <div style="flex: 1; position: relative;">
                <textarea 
                  id="ai-chat-input" 
                  class="form-textarea" 
                  rows="2" 
                  placeholder="Ask a legal question, paste a contract clause, or request drafting recommendations..."
                  style="resize: none; font-size: 13.5px; padding: 10px 12px; line-height: 1.45; border-radius: 8px;"
                  onkeydown="if(event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); window.handleSendLegalQuery(); }"
                ></textarea>
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px;">
                <button 
                  class="btn btn-primary" 
                  id="ai-send-query-btn"
                  onclick="window.handleSendLegalQuery()"
                  style="height: 40px; padding: 0 18px; font-weight: 600;"
                >
                  <span>Send</span>
                  <span>ðŸš€</span>
                </button>
                <button 
                  class="btn btn-secondary btn-sm" 
                  onclick="window.openDocumentAttachModal()"
                  style="padding: 2px 8px; font-size: 11px;"
                  title="Attach or paste agreement"
                >
                  ðŸ“Ž Attach
                </button>
              </div>
            </div>
            
            <div style="font-size: 11px; color: #94A3B8; margin-top: 6px; display: flex; justify-content: space-between;">
              <span>Press <strong>Enter</strong> to send â€¢ <strong>Shift+Enter</strong> for newline</span>
              <span>All uploads evaluated in secure server sandbox</span>
            </div>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- PANEL 3 (RIGHT): Document & Clause Risk Inspector (Collapsible) -->
        <!-- ================================================================= -->
        <div id="ai-right-inspector-panel" style="
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        ">
          <div style="padding: 12px 16px; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 13px; font-weight: 700; color: #0F172A; display: flex; align-items: center; gap: 6px;">
              <span>ðŸ“Š</span>
              <span>Document & Risk Audit</span>
            </div>
          </div>

          <div style="flex: 1; overflow-y: auto; padding: 14px;">
            ${
              attachedDoc
                ? `
              <!-- Document Metadata Card -->
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
                <div style="font-size: 13px; font-weight: 700; color: #0F172A;">${attachedDoc.name}</div>
                <div style="font-size: 11.5px; color: #64748B; margin-top: 4px;">
                  Length: <strong>${attachedDoc.charCount || attachedDoc.text.length} chars</strong> â€¢ Words: <strong>~${Math.round(attachedDoc.text.split(/\s+/).length)}</strong>
                </div>
              </div>

              <!-- Clause Checklist Breakdown -->
              <div style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; color: #475569; letter-spacing: 0.05em; margin-bottom: 8px;">
                Key Contractual Clauses
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${extractedClauses
                  .map(
                    c => `
                  <div style="
                    padding: 8px 10px;
                    border-radius: 6px;
                    background: ${c.status === 'Present' ? '#F0FDF4' : '#FFFBEB'};
                    border: 1px solid ${c.status === 'Present' ? '#BBF7D0' : '#FDE68A'};
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                  ">
                    <div>
                      <div style="font-size: 12px; font-weight: 600; color: #1E293B;">
                        ${c.icon} ${c.type}
                      </div>
                      <div style="font-size: 10.5px; color: #64748B;">
                        ${c.description}
                      </div>
                    </div>
                    <span class="badge ${c.status === 'Present' ? 'badge-green' : 'badge-amber'}" style="font-size: 10px; padding: 2px 6px;">
                      ${c.status === 'Present' ? 'Detected' : 'Review'}
                    </span>
                  </div>
                `
                  )
                  .join('')}
              </div>

              <div style="margin-top: 16px;">
                <button class="btn btn-secondary btn-sm" style="width: 100%; font-size: 11.5px; justify-content: center;" onclick="window.handlePromptClick('Review this contract for legal risks')">
                  ðŸ” Perform Full Risk Audit
                </button>
              </div>
            `
                : `
              <!-- Empty State in Inspector -->
              <div style="text-align: center; padding: 40px 12px; color: #94A3B8;">
                <div style="font-size: 32px; margin-bottom: 8px;">ðŸ“„</div>
                <div style="font-size: 13px; font-weight: 600; color: #475569;">No Document Attached</div>
                <div style="font-size: 11.5px; color: #64748B; margin-top: 4px; line-height: 1.4;">
                  Attach an agreement or paste contract text to extract clauses, audit liability limits, and inspect missing protections.
                </div>
                <button class="btn btn-primary btn-sm" onclick="window.openDocumentAttachModal()" style="margin-top: 14px; font-size: 12px;">
                  âž• Attach Document
                </button>
              </div>
            `
            }
          </div>
        </div>

      </div>

    </div>
  `;
}

/**
 * Render structured Legal Message bubble with risk badge, Markdown tables, and action tools
 */
function renderLegalMessageBubble(msg) {
  const isUser = msg.role === 'user';

  if (isUser) {
    return `
      <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
        <div style="
          max-width: 80%;
          background: #2563EB;
          color: #FFFFFF;
          border-radius: 12px 12px 2px 12px;
          padding: 12px 16px;
          font-size: 13.5px;
          line-height: 1.5;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        ">
          ${msg.content.replace(/\n/g, '<br/>')}
          <div style="font-size: 10.5px; color: #BFDBFE; text-align: right; margin-top: 4px;">
            ${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    `;
  }

  // Format Assistant Response
  const formattedHtml = formatLegalMarkdown(msg.content);
  const rawCleanText = msg.content.replace(/"/g, '&quot;');

  return `
    <div style="display: flex; gap: 12px; max-width: 92%; margin-bottom: 12px;">
      <div style="
        width: 34px;
        height: 34px;
        border-radius: 8px;
        background: linear-gradient(135deg, #1E40AF, #2563EB);
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
        margin-top: 2px;
      ">âš–ï¸</div>

      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 2px 12px 12px 12px;
        padding: 16px 18px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        flex: 1;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #F1F5F9; padding-bottom: 6px;">
          <div style="font-size: 12.5px; font-weight: 700; color: #0F172A; display: flex; align-items: center; gap: 6px;">
            <span>Impacteers AI Legal Counsel</span>
            <span style="font-size: 11px; font-weight: 400; color: #64748B;">â€¢ ${msg.provider || 'AI Gateway'}</span>
          </div>
          <span class="badge badge-slate" style="font-size: 10.5px;">
            ${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div class="legal-markdown-body" style="font-size: 13.5px; color: #1E293B; line-height: 1.6;">
          ${formattedHtml}
        </div>

        <!-- Action Bar per AI Response -->
        <div style="
          margin-top: 14px;
          padding-top: 10px;
          border-top: 1px solid #F1F5F9;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        ">
          <button 
            class="btn btn-secondary btn-sm" 
            style="font-size: 11px; padding: 3px 8px;"
            onclick="window.copyToClipboard('${msg.id}')"
            title="Copy answer to clipboard"
          >
            ðŸ“‹ Copy Response
          </button>
          <button 
            class="btn btn-secondary btn-sm" 
            style="font-size: 11px; padding: 3px 8px;"
            onclick="window.handleRegenerateResponse('${msg.id}')"
            title="Regenerate this response"
          >
            ðŸ”„ Regenerate
          </button>
        </div>
        <textarea id="raw-msg-${msg.id}" style="display:none;">${msg.content}</textarea>
      </div>
    </div>
  `;
}

/**
 * Convert structured legal markdown into clean, styled HTML with tables and risk badges
 */
function formatLegalMarkdown(md) {
  if (!md) return '';

  let html = md;

  // 1. Headers
  html = html.replace(/^### (.*$)/gim, '<h4 style="font-size: 14px; font-weight: 700; color: #0F172A; margin: 12px 0 4px 0; border-bottom: 1px solid #F1F5F9; padding-bottom: 3px;">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 style="font-size: 15px; font-weight: 700; color: #1E3A8A; margin: 14px 0 6px 0;">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 style="font-size: 16px; font-weight: 700; color: #1E3A8A; margin: 16px 0 8px 0;">$1</h2>');

  // 2. Risk Badges
  html = html.replace(/\*\*(Low Risk)\*\*/gi, '<span class="badge badge-green" style="font-size: 12px; padding: 3px 8px;">ðŸŸ¢ Low Risk</span>');
  html = html.replace(/\*\*(Medium Risk)\*\*/gi, '<span class="badge badge-amber" style="font-size: 12px; padding: 3px 8px;">ðŸŸ¡ Medium Risk</span>');
  html = html.replace(/\*\*(High Risk)\*\*/gi, '<span class="badge badge-red" style="font-size: 12px; padding: 3px 8px; background: #FFF1F2; color: #BE123C; border: 1px solid #FECDD3;">ðŸŸ  High Risk</span>');
  html = html.replace(/\*\*(Critical Risk)\*\*/gi, '<span class="badge badge-red" style="font-size: 12px; padding: 3px 8px; background: #991B1B; color: #FFFFFF;">ðŸ”´ Critical Risk</span>');

  // 3. Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 4. Code / Suggested Wording Blocks
  html = html.replace(/```(?:text|markdown)?([\s\S]*?)```/g, (match, code) => {
    return `
      <div style="position: relative; margin: 10px 0;">
        <div style="background: #1E293B; color: #F8FAFC; border-radius: 8px; padding: 12px 14px; font-family: var(--font-mono); font-size: 12px; line-height: 1.5; overflow-x: auto; white-space: pre-wrap;">${code.trim()}</div>
      </div>
    `;
  });

  // 5. Unordered lists
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li style="margin-bottom: 4px;">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ul style="margin: 6px 0 10px 18px; padding-left: 4px;">$1</ul>');

  // 6. Tables
  const lines = html.split('\n');
  let inTable = false;
  let tableRows = [];
  let outputLines = [];

  for (let line of lines) {
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      inTable = true;
      if (line.includes('---')) continue; // skip markdown divider
      const cells = line.split('|').map(c => c.trim()).filter((c, i, arr) => i > 0 && i < arr.length - 1);
      tableRows.push(cells);
    } else {
      if (inTable) {
        outputLines.push(renderHtmlTable(tableRows));
        tableRows = [];
        inTable = false;
      }
      outputLines.push(line);
    }
  }
  if (inTable && tableRows.length > 0) {
    outputLines.push(renderHtmlTable(tableRows));
  }

  return outputLines.join('\n').replace(/\n\n/g, '<br/>');
}

function renderHtmlTable(rows) {
  if (!rows || rows.length === 0) return '';
  const header = rows[0];
  const body = rows.slice(1);

  return `
    <div style="overflow-x: auto; margin: 12px 0; border: 1px solid #E2E8F0; border-radius: 8px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
        <thead>
          <tr style="background: #F1F5F9; border-bottom: 1px solid #E2E8F0;">
            ${header.map(h => `<th style="padding: 8px 12px; font-weight: 700; color: #334155;">${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${body.map(row => `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              ${row.map(cell => `<td style="padding: 8px 12px; color: #1E293B;">${cell}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// === File: src\js\pages\NotificationsPage.js ===
/**
 * Enterprise In-House Legal Management System
 * Notifications Center Page
 */


function renderNotificationsPage() {
  const notifs = notificationService.getMyNotifications();

  return `
    <div class="content-container">
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>ðŸ””</span>
            <span>Notification Center</span>
          </div>
          <div class="page-subtitle">
            System alerts, request status advancements, remark replies, and contract expiry notifications.
          </div>
        </div>
        <div>
          <button class="btn btn-secondary btn-sm" id="page-mark-all-read-btn">
            <span>âœ“ Mark All as Read</span>
          </button>
        </div>
      </div>

      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>ðŸ“¬</span>
            <span>All Notifications (${notifs.length})</span>
          </div>
        </div>
        <div style="padding: 10px 16px;">
          ${
            notifs.length === 0
              ? '<div style="padding: 48px; text-align: center; color: #94A3B8;">No notifications in your inbox.</div>'
              : notifs
                  .map(
                    n => `
                <div style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 14px;
                  border-bottom: 1px solid #F1F5F9;
                  background: ${n.isRead ? '#FFFFFF' : '#EFF6FF'};
                  border-radius: 8px;
                  margin-bottom: 6px;
                  cursor: pointer;
                " onclick="window.location.hash='${n.linkUrl || '#/notifications'}';">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 20px;">${n.category === 'CONTRACT' ? 'ðŸ“œ' : n.category === 'REMARK' ? 'ðŸ’¬' : 'ðŸ“‹'}</span>
                    <div>
                      <div style="font-size: 13.5px; font-weight: 600; color: #0F172A;">${n.title}</div>
                      <div style="font-size: 12.5px; color: #475569; margin-top: 2px;">${n.message}</div>
                      <div style="font-size: 11px; color: #94A3B8; margin-top: 4px;">
                        ${new Date(n.createdAt).toLocaleDateString()} ${new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div>
                    ${!n.isRead ? '<span class="badge badge-rose">New</span>' : '<span class="badge badge-slate">Read</span>'}
                  </div>
                </div>
              `
                  )
                  .join('')
          }
        </div>
      </div>
    </div>
  `;
}

// === File: src\js\pages\AuditLogsPage.js ===
/**
 * Enterprise In-House Legal Management System
 * Immutable Audit Logs & Security Trail Page
 */


function renderAuditLogsPage() {
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
            <span>ðŸ›¡ï¸</span>
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
            <span>ðŸ“œ</span>
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

// === File: src\js\pages\AdminSettingsPage.js ===
/**
 * Impacteers DMS â€” Enterprise In-House Legal & Document Management System
 * Admin Settings & AI Gateway Configuration Page
 */


function renderAdminSettingsPage() {
  const user = authService.getCurrentUser();
  const alertDays = db.data.contractAlertDays || [60, 30, 15, 7];

  return `
    <div class="content-container">
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>âš™ï¸</span>
            <span>Enterprise System Administration & Settings</span>
          </div>
          <div class="page-subtitle">
            Configure system users, departments, request types, CLM alert thresholds, and AI Legal Assistant Gateway.
          </div>
        </div>
        <div>
          <button class="btn btn-secondary btn-sm" id="reset-database-btn" style="color: #DC2626;">
            <span>ðŸ”„ Reset to Fresh Seed State</span>
          </button>
        </div>
      </div>

      <div class="grid-2-col">
        
        <!-- Enterprise AI Legal Assistant Gateway Card -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>ðŸ¤–</span>
              <span>Enterprise Legal AI Gateway</span>
            </div>
            <span class="badge badge-blue">Secure Server-Side</span>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 13px; color: #475569; margin-bottom: 14px; line-height: 1.5;">
              The AI Legal Assistant connects via the secure backend API (<code>/api/legal-assistant/chat</code>) with zero client-side credential exposure.
            </p>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 14px; margin-bottom: 16px;">
              <div style="font-size: 12.5px; font-weight: 700; color: #0F172A; margin-bottom: 4px;">Supported AI Providers:</div>
              <ul style="margin: 0 0 0 16px; font-size: 12px; color: #475569; line-height: 1.6;">
                <li><strong>Google Gemini</strong>: <code>gemini-1.5-flash</code>, <code>gemini-2.0-flash</code></li>
                <li><strong>OpenAI</strong>: <code>gpt-4o</code>, <code>gpt-4o-mini</code></li>
                <li><strong>Groq</strong>: <code>llama-3.3-70b-versatile</code>, <code>mixtral-8x7b-32768</code></li>
                <li><strong>OpenRouter</strong>: Multi-model router with free & pro endpoints</li>
                <li><strong>Local Ollama</strong>: <code>llama3.2</code>, <code>mistral</code>, <code>qwen2.5</code> (100% private on-device)</li>
              </ul>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" onclick="window.showAIConfigModal()">
                âš™ï¸ View AI Gateway Configuration
              </button>
              <button class="btn btn-secondary btn-sm" id="test-ai-gateway-btn" onclick="window.testAIGatewayConnection()">
                ðŸ”„ Test AI Connection
              </button>
            </div>
          </div>
        </div>

        <!-- Expiry Alert Settings -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>â°</span>
              <span>Contract Expiry Alert Thresholds</span>
            </div>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 13px; color: #475569; margin-bottom: 14px;">
              The system automatically sends in-app notifications and alerts before contract expiry:
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${alertDays.map(d => `<span class="badge badge-amber" style="font-size: 13px; padding: 6px 12px;">â³ ${d} Days Before</span>`).join('')}
            </div>
            <div style="margin-top: 20px; font-size: 12px; color: #64748B;">
              Alerts are broadcast to Legal Administrators and the corresponding Business Department Head.
            </div>
          </div>
        </div>

      </div>

      <!-- Department Directory -->
      <div class="enterprise-card" style="margin-top: 20px;">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>ðŸ¢</span>
            <span>Registered Business Departments (${db.data.departments.length})</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="enterprise-table">
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Department Code</th>
                <th>Active Head</th>
                <th>Total Contracts</th>
              </tr>
            </thead>
            <tbody>
              ${db.data.departments
                .map(d => {
                  const docCount = db.data.documents.filter(doc => doc.departmentId === d.id).length;
                  return `
                  <tr>
                    <td style="font-weight: 600;">${d.name}</td>
                    <td style="font-family: var(--font-mono); font-size: 12px; color: #64748B;">${d.id}</td>
                    <td>${d.headName || 'Assigned'}</td>
                    <td><span class="badge badge-blue">${docCount} Documents</span></td>
                  </tr>
                `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// === File: src\js\pages\AboutPage.js ===
/**
 * Impacteers Legal docs
 * Simple About System Page
 */

function renderAboutPage() {
  return `
    <div class="content-container" style="max-width: 720px;">
      <div class="enterprise-card" style="padding: 40px; text-align: center;">
        <img src="./assets/impacteers-logo.png" alt="Impacteers Logo" style="height: 54px; width: auto; display: block; margin: 0 auto 20px auto;" />
        <h1 style="font-size: 24px; font-weight: 800; color: #0F172A;">Impacteers DMS</h1>
        <div style="font-size: 13.5px; color: #64748B; font-weight: 600; margin-top: 4px;">Document Management System</div>
        <div style="font-size: 12px; color: #2563EB; font-weight: 600; margin-top: 2px;">Version 2026.8 â€¢ Enterprise Edition</div>
        
        <p style="font-size: 14px; color: #475569; line-height: 1.6; max-width: 520px; margin: 20px auto 28px auto;">
          Internal platform for managing legal review requests, document vetting, contract lifecycle management (CLM), and secure company legal documents.
        </p>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px; text-align: left; font-size: 13px; color: #334155; line-height: 1.6;">
          <div>ðŸ¢ <strong>Organization:</strong> Impacteers</div>
          <div>âš–ï¸ <strong>Legal Operations Lead:</strong> Monisha (Legal Manager)</div>
          <div>ðŸ›¡ï¸ <strong>Security:</strong> Role-Based Access Control & Department Isolation</div>
          <div>ðŸ“ <strong>Storage:</strong> Centralized Repository with Version Tracking</div>
        </div>

        <div style="margin-top: 28px;">
          <a href="#/dashboard" class="btn btn-primary">Return to Dashboard</a>
        </div>
      </div>
    </div>
  `;
}

// === File: src\js\app.js ===
/**
 * Impacteers Legal docs
 * Main Application Orchestrator & Role-Based Router
 */




class App {
  constructor() {
    this.isSidebarCollapsed = false;
    this.currentRoute = 'dashboard';
    this.init();
  }

  init() {
    this.bindWindowGlobals();
    this.handleRoute();

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('auth:changed', () => {
      this.handleRoute();
    });
    window.addEventListener('request:created', () => this.handleRoute());
    window.addEventListener('request:updated', () => this.handleRoute());
  }

  bindWindowGlobals() {
    // Quick Demo Logins
    window.quickLogin = userId => {
      try {
        const user = authService.login(userId);
        Toast.success(`Signed in as ${user.name} (${user.tagline || user.roleLabel})`);
        window.location.hash = '#/dashboard';
      } catch (e) {
        Toast.error(e.message);
      }
    };

    // Logout confirmation
    window.confirmLogout = () => {
      Modal.open({
        title: 'ðŸšª Confirm Logout',
        contentHtml: `
          <div style="font-size: 14px; color: #334155; padding: 6px 0;">
            Are you sure you want to log out of <strong>Impacteers DMS</strong> (Document Management System)?
          </div>
        `,
        footerHtml: `
          <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
          <button class="btn btn-danger" id="confirm-logout-btn">Logout</button>
        `,
        size: 'sm'
      });

      document.getElementById('confirm-logout-btn').addEventListener('click', () => {
        authService.logout();
        Modal.close();
        Toast.info('Logged out successfully.');
        window.location.hash = '#/login';
      });
    };

    // Filter Document Database by department
    window.filterDatabaseDept = deptId => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.innerHTML = renderDepartmentsPage(deptId);
      }
    };

    // Profile modal
    window.showProfileModal = () => {
      const user = authService.getCurrentUser();
      if (!user) return;
      Modal.open({
        title: 'ðŸ‘¤ User Profile',
        contentHtml: `
          <div style="font-size: 13.5px; line-height: 1.6;">
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #E2E8F0;">
              <div style="width: 48px; height: 48px; border-radius: 9999px; background: #2563EB; color: #fff; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center;">
                ${user.avatar}
              </div>
              <div>
                <div style="font-size: 16px; font-weight: 700; color: #0F172A;">${user.name}</div>
                <div style="font-size: 12.5px; color: #64748B;">${user.email}</div>
              </div>
            </div>
            <div><strong>Role:</strong> ${user.roleLabel}</div>
            <div style="margin-top: 4px;"><strong>Department:</strong> ${user.departmentName || 'Global Legal'}</div>
            <div style="margin-top: 4px;"><strong>Access Scope:</strong> ${authService.isLegalManager() ? 'Full Legal Access (All Departments)' : authService.isChairman() ? 'Executive View-Only (All Departments)' : `${user.departmentName} Requests & Documents`}</div>
          </div>
        `,
        footerHtml: '<button class="btn btn-secondary" onclick="window.activeModalClose()">Close</button>',
        size: 'sm'
      });
    };

    // Workflow Actions for Monisha
    window.legalAcceptRequest = reqId => {
      try {
        requestService.acceptRequest(reqId);
        Toast.success('Request accepted and moved to Under Legal Review.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    window.legalRejectRequest = reqId => {
      const reason = prompt('Please enter mandatory rejection reason:');
      if (reason && reason.trim()) {
        try {
          requestService.rejectRequest(reqId, reason.trim());
          Toast.info('Request rejected.');
          this.handleRoute();
        } catch (e) {
          Toast.error(e.message);
        }
      }
    };

    window.legalRescheduleRequest = reqId => {
      const req = requestService.getRequestById(reqId);
      if (!req) return;

      Modal.open({
        title: 'â±ï¸ Propose Rescheduled Completion Date',
        contentHtml: `
          <div>
            <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px; margin-bottom: 14px; font-size: 12.5px; color: #1E40AF;">
              <strong>Current Required Date:</strong> ${req.currentDueDate}
            </div>
            <div class="form-group">
              <label class="form-label">New Proposed Completion Date <span class="required">*</span></label>
              <input type="date" id="resched-new-date" class="form-input" value="${req.currentDueDate}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Reason for Rescheduling <span class="required">*</span></label>
              <textarea id="resched-reason" class="form-textarea" placeholder="e.g. Additional regulatory review is required for non-standard indemnity terms..." required></textarea>
            </div>
          </div>
        `,
        footerHtml: `
          <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
          <button class="btn btn-primary" id="confirm-resched-send-btn">Send Reschedule Proposal</button>
        `,
        size: 'md'
      });

      document.getElementById('confirm-resched-send-btn').addEventListener('click', () => {
        const date = document.getElementById('resched-new-date').value;
        const reason = document.getElementById('resched-reason').value;
        if (!date || !reason.trim()) {
          Toast.error('Please provide both new date and reason.');
          return;
        }
        try {
          requestService.rescheduleRequest(reqId, { proposedDate: date, reason });
          Modal.close();
          Toast.info('Reschedule proposal sent to business stakeholder.');
          this.handleRoute();
        } catch (e) {
          Toast.error(e.message);
        }
      });
    };

    // Business Reschedule Responses
    window.businessAcceptReschedule = reqId => {
      try {
        requestService.respondToReschedule(reqId, { action: 'ACCEPT' });
        Toast.success('Proposed completion date accepted! Task is now assigned to Monisha for active review.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    window.businessRejectReschedule = reqId => {
      const req = requestService.getRequestById(reqId);
      if (!req || !req.rescheduleProposal) return;

      Modal.open({
        title: 'â±ï¸ Decline Reschedule & Request Timeline',
        contentHtml: `
          <div>
            <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 12px; margin-bottom: 14px; font-size: 12.5px; color: #92400E;">
              <strong>Legal Proposed Date:</strong> ${req.rescheduleProposal.proposedDate}<br/>
              <strong>Legal Reason:</strong> "${req.rescheduleProposal.reason}"
            </div>
            <div class="form-group">
              <label class="form-label">Your Requested Completion Date <span class="required">*</span></label>
              <input type="date" id="counter-new-date" class="form-input" value="${req.rescheduleProposal.originalDate || req.currentDueDate}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Urgency Justification / Reason <span class="required">*</span></label>
              <textarea id="counter-reason" class="form-textarea" placeholder="e.g. This is a priority case on urgent basis, need to close as soon as possible..." required>This is a priority case on urgent basis, need to close as soon as possible.</textarea>
            </div>
          </div>
        `,
        footerHtml: `
          <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
          <button class="btn btn-primary" id="confirm-counter-send-btn">Submit to Legal Manager</button>
        `,
        size: 'md'
      });

      document.getElementById('confirm-counter-send-btn').addEventListener('click', () => {
        const counterDate = document.getElementById('counter-new-date').value;
        const comment = document.getElementById('counter-reason').value;
        if (!counterDate || !comment.trim()) {
          Toast.error('Please provide both requested date and justification.');
          return;
        }
        try {
          requestService.respondToReschedule(reqId, {
            action: 'DECLINE',
            counterDate,
            comment: comment.trim()
          });
          Modal.close();
          Toast.info('Counter-proposal and notification sent directly to Monisha.');
          this.handleRoute();
        } catch (e) {
          Toast.error(e.message);
        }
      });
    };

    window.legalAcceptBusinessCounterDate = reqId => {
      try {
        requestService.acceptBusinessCounterDate(reqId);
        Toast.success('Accepted business requested completion date. Task assigned and review in progress.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    window.legalSubmitToBusiness = reqId => {
      try {
        requestService.submitToBusiness(reqId);
        Toast.success('Review submitted to business stakeholder for final signing.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    window.legalMarkCompleted = reqId => {
      try {
        requestService.markCompleted(reqId);
        Toast.success('Request completed! Final document stored in department repository.');
        this.handleRoute();
      } catch (e) {
        Toast.error(e.message);
      }
    };

    // Delete single vault document
    window.deleteVaultDocument = (docId, docTitle) => {
      if (confirm(`Are you sure you want to permanently delete "${docTitle || 'this document'}" from the repository?`)) {
        try {
          documentService.deleteDocument(docId);
          Toast.success('Document deleted successfully.');
          this.handleRoute();
        } catch (err) {
          Toast.error(err.message);
        }
      }
    };

    // Clear / delete all old vault documents
    window.deleteAllVaultDocuments = () => {
      if (confirm('Are you sure you want to delete and clear all old documents from the vault? This cannot be undone.')) {
        try {
          const count = documentService.deleteAllDocuments();
          Toast.success(`Successfully deleted all ${count} vault documents.`);
          this.handleRoute();
        } catch (err) {
          Toast.error(err.message);
        }
      }
    };

    // Global Document File Download
    window.downloadDocumentFile = (fileName, label = 'Impacteers Legal Agreement') => {
      try {
        const safeName = fileName || 'Legal_Document.pdf';
        const cleanLabel = label || 'Impacteers Document';
        const fileContent = `===============================================================
IMPACTEERS DOCUMENT MANAGEMENT SYSTEM (DMS)
===============================================================
Document File   : ${safeName}
Title / Label   : ${cleanLabel}
Downloaded At   : ${new Date().toLocaleString()}
Classification  : CONFIDENTIAL & VERIFIED LEGAL ASSET
Repository Vault: Impacteers Secure Cloud Vault
===============================================================

[VERIFIED LEGAL DOCUMENT ARTIFACT]
1. Standard Terms & Conditions: Active and verified by Legal Counsel.
2. Compliance Standard        : Validated against Impacteers Corporate Policies.
3. Verification Integrity     : SHA-256 Checksum Verified.

---------------------------------------------------------------
This document is a certified copy retrieved from the Impacteers
In-House Legal & Document Management System (DMS).
===============================================================
`;
        const mimeType = safeName.endsWith('.pdf')
          ? 'application/pdf'
          : safeName.endsWith('.docx')
          ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          : 'text/plain';
        const blob = new Blob([fileContent], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = safeName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
        Toast.success(`Downloaded "${safeName}" successfully.`);
      } catch (err) {
        Toast.error('Could not download document: ' + err.message);
      }
    };

    // Live Instant Search & Filter for Department Documents
    window.filterDepartmentDocs = (deptId) => {
      const searchInput = document.getElementById('dept-doc-search');
      const typeSelect = document.getElementById('dept-doc-filter-type');
      const tbody = document.getElementById('dept-doc-tbody');
      const countEl = document.getElementById('dept-doc-count');

      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      const type = typeSelect ? typeSelect.value.trim().toLowerCase() : '';

      let docs = db.data.documents.filter(d => d.departmentId === deptId || d.departmentId === 'ALL');

      if (query) {
        docs = docs.filter(d =>
          (d.title && d.title.toLowerCase().includes(query)) ||
          (d.fileName && d.fileName.toLowerCase().includes(query)) ||
          (d.documentType && d.documentType.toLowerCase().includes(query)) ||
          (d.category && d.category.toLowerCase().includes(query)) ||
          (d.counterparty && d.counterparty.toLowerCase().includes(query)) ||
          (d.departmentName && d.departmentName.toLowerCase().includes(query))
        );
      }

      if (type) {
        docs = docs.filter(d =>
          (d.documentType && d.documentType.toLowerCase().includes(type)) ||
          (d.category && d.category.toLowerCase().includes(type))
        );
      }

      if (tbody) {
        tbody.innerHTML = renderDepartmentDocRows(docs);
      }
      if (countEl) {
        countEl.innerText = docs.length;
      }
    };

    // Live Instant Search & Filter for Documents Vault
    window.filterVaultDocs = () => {
      const searchInput = document.getElementById('doc-search-input');
      const deptSelect = document.getElementById('doc-dept-filter');
      const typeSelect = document.getElementById('doc-type-filter');
      const tbody = document.getElementById('docs-tbody');
      const countEl = document.getElementById('doc-count');

      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      const dept = deptSelect ? deptSelect.value : '';
      const type = typeSelect ? typeSelect.value.trim().toLowerCase() : '';

      let docs = documentService.getDocuments();

      if (dept) {
        if (dept === 'ALL') {
          docs = docs.filter(d => d.departmentId === 'ALL');
        } else if (dept === 'LEGAL_ONLY') {
          docs = docs.filter(d => d.departmentId === 'LEGAL_ONLY' || d.isPrivilegedOnly);
        } else {
          docs = docs.filter(d => d.departmentId === dept);
        }
      }

      if (type) {
        docs = docs.filter(d =>
          (d.documentType && d.documentType.toLowerCase().includes(type)) ||
          (d.category && d.category.toLowerCase().includes(type))
        );
      }

      if (query) {
        docs = docs.filter(d =>
          (d.title && d.title.toLowerCase().includes(query)) ||
          (d.fileName && d.fileName.toLowerCase().includes(query)) ||
          (d.documentType && d.documentType.toLowerCase().includes(query)) ||
          (d.category && d.category.toLowerCase().includes(query)) ||
          (d.counterparty && d.counterparty.toLowerCase().includes(query)) ||
          (d.departmentName && d.departmentName.toLowerCase().includes(query))
        );
      }

      if (tbody) {
        tbody.innerHTML = renderVaultDocRows(docs);
      }
      if (countEl) {
        countEl.innerText = docs.length;
      }
    };

    // Live Search for Database Documents
    window.filterDatabaseSearch = (selectedDeptId = 'ALL') => {
      const searchInput = document.getElementById('database-doc-search');
      const tbody = document.getElementById('database-doc-tbody');
      const countEl = document.getElementById('database-doc-count');

      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      let docs = documentService.getDocuments();

      if (selectedDeptId && selectedDeptId !== 'ALL') {
        docs = docs.filter(d => d.departmentId === selectedDeptId || (selectedDeptId === 'LEGAL_ONLY' && (d.departmentId === 'LEGAL_ONLY' || d.isPrivilegedOnly)));
      }

      if (query) {
        docs = docs.filter(d =>
          (d.title && d.title.toLowerCase().includes(query)) ||
          (d.fileName && d.fileName.toLowerCase().includes(query)) ||
          (d.documentType && d.documentType.toLowerCase().includes(query)) ||
          (d.category && d.category.toLowerCase().includes(query)) ||
          (d.counterparty && d.counterparty.toLowerCase().includes(query)) ||
          (d.departmentName && d.departmentName.toLowerCase().includes(query))
        );
      }

      if (tbody) {
        tbody.innerHTML = renderDatabaseDocRows(docs);
      }
      if (countEl) {
        countEl.innerText = docs.length;
      }
    };

    // -------------------------------------------------------------------------
    // AI Legal Assistant Event Handlers & Orchestrator
    // -------------------------------------------------------------------------
    window.handleCreateNewChat = () => {
      aiService.createSession('General Legal Consultation', aiService.getJurisdiction());
      this.handleRoute();
      Toast.info('Created new legal chat session.');
    };

    window.handleSelectSession = (sessionId) => {
      aiService.setCurrentSessionId(sessionId);
      this.handleRoute();
    };

    window.handleDeleteSession = (sessionId) => {
      aiService.deleteSession(sessionId);
      this.handleRoute();
      Toast.info('Deleted consultation.');
    };

    window.handleClearAllSessions = () => {
      if (confirm('Are you sure you want to clear all consultation history?')) {
        aiService.clearAllSessions();
        this.handleRoute();
        Toast.info('All chat history cleared.');
      }
    };

    window.handleJurisdictionChange = (jurisdiction) => {
      aiService.setJurisdiction(jurisdiction);
      Toast.info(`Switched jurisdiction to ${jurisdiction}.`);
      this.handleRoute();
    };

    window.handleModeChange = (mode) => {
      aiService.setMode(mode);
      Toast.info(`Switched focus to ${mode.replace(/_/g, ' ')}.`);
    };

    window.handlePromptClick = (text) => {
      const input = document.getElementById('ai-chat-input');
      if (input) {
        input.value = text;
        window.handleSendLegalQuery();
      }
    };

    window.copyToClipboard = (msgId) => {
      const rawTextEl = document.getElementById(`raw-msg-${msgId}`);
      if (rawTextEl) {
        navigator.clipboard.writeText(rawTextEl.value || rawTextEl.innerText);
        Toast.success('Copied legal response to clipboard.');
      }
    };

    window.toggleRightInspector = () => {
      const panel = document.getElementById('ai-right-inspector-panel');
      const grid = document.getElementById('ai-three-panel-grid');
      if (panel && grid) {
        if (panel.style.display === 'none') {
          panel.style.display = 'flex';
          grid.style.gridTemplateColumns = '280px 1fr 300px';
        } else {
          panel.style.display = 'none';
          grid.style.gridTemplateColumns = '280px 1fr';
        }
      }
    };

    window.handleRemoveAttachedDocument = () => {
      const session = aiService.getCurrentSession();
      if (session) {
        aiService.removeAttachedDocument(session.id);
        this.handleRoute();
        Toast.info('Removed attached document.');
      }
    };

    window.openDocumentAttachModal = () => {
      const docs = documentService.getDocuments();
      Modal.open({
        title: 'ðŸ“Ž Attach Document or Paste Agreement',
        contentHtml: `
          <div>
            <div class="form-group" style="margin-bottom: 14px;">
              <label class="form-label">Option A: Select Document from Legal Vault</label>
              <select id="modal-attach-vault-doc" class="form-select" onchange="
                if(this.value) {
                  const d = ${JSON.stringify(docs)}.find(x => x.id === this.value);
                  if (d) {
                    document.getElementById('modal-attach-doc-title').value = d.title;
                    document.getElementById('modal-attach-doc-text').value = d.content || d.summary || (d.title + ' executed legal agreement.');
                  }
                }
              ">
                <option value="">-- Choose a vault document --</option>
                ${docs.map(d => `<option value="${d.id}">${d.title} (${d.departmentName})</option>`).join('')}
              </select>
            </div>

            <div style="text-align: center; font-size: 11px; font-weight: 700; color: #94A3B8; margin: 8px 0;">â€” OR â€”</div>

            <div class="form-group" style="margin-bottom: 14px;">
              <label class="form-label">Option B: Document / Clause Title</label>
              <input type="text" id="modal-attach-doc-title" class="form-input" placeholder="e.g. Master Services Agreement v2.0" />
            </div>

            <div class="form-group" style="margin-bottom: 14px;">
              <label class="form-label">Option C: Paste Contract Text / Clause</label>
              <textarea id="modal-attach-doc-text" class="form-textarea" rows="6" placeholder="Paste contractual provisions, liability clauses, termination terms..."></textarea>
            </div>
          </div>
        `,
        footerHtml: `
          <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
          <button class="btn btn-primary" id="confirm-attach-doc-btn">Attach to Conversation</button>
        `,
        size: 'lg'
      });

      document.getElementById('confirm-attach-doc-btn').addEventListener('click', () => {
        const title = document.getElementById('modal-attach-doc-title').value || 'Pasted Agreement Excerpt';
        const text = document.getElementById('modal-attach-doc-text').value;

        if (!text.trim()) {
          Toast.error('Please paste or select some contract text.');
          return;
        }

        const session = aiService.getCurrentSession();
        if (session) {
          aiService.attachDocumentToSession(session.id, {
            name: title.trim(),
            text: text.trim(),
            charCount: text.trim().length
          });
          Modal.close();
          this.handleRoute();
          Toast.success(`Attached "${title}" to consultation.`);
        }
      });
    };

    window.showAIConfigModal = async () => {
      const status = await aiService.getStatus();
      Modal.open({
        title: 'âš™ï¸ Enterprise Legal AI & Gateway Configuration',
        contentHtml: `
          <div style="font-size: 13px; line-height: 1.6;">
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong>Server Gateway Status:</strong>
                <span class="badge ${status.status === 'online' ? 'badge-green' : 'badge-amber'}">${status.status.toUpperCase()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong>Active Provider:</strong>
                <span style="font-family: monospace; font-size: 12px; color: #1E293B;">${status.provider || 'openai_compatible'}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong>Active Model:</strong>
                <span style="font-family: monospace; font-size: 12px; color: #1E293B;">${status.model || 'gemini-1.5-flash'}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <strong>Server API Key:</strong>
                <span class="badge ${status.apiKeyConfigured ? 'badge-green' : 'badge-slate'}">${status.apiKeyConfigured ? 'Configured in .env' : 'Fallback Engine / Local AI'}</span>
              </div>
            </div>

            <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 12.5px; color: #1E40AF;">
              <strong>ðŸ”’ Zero Client-Side Exposure:</strong> All API keys are loaded server-side from <code>.env</code>. Keys are never sent to the browser or logged in client network traffic.
            </div>

            <div style="font-size: 12.5px; color: #334155;">
              <strong>How to Configure Any AI Model:</strong>
              <ol style="margin: 6px 0 0 18px; line-height: 1.6;">
                <li>Open the <code>.env</code> file in your project folder.</li>
                <li>Set your <code>AI_API_KEY</code> and desired <code>AI_MODEL</code> (e.g. <code>gemini-1.5-flash</code>, <code>gpt-4o</code>, <code>llama-3.3-70b-versatile</code>).</li>
                <li>For local on-device AI, set <code>AI_PROVIDER=ollama</code> and run <code>ollama run llama3.2</code> in your terminal.</li>
              </ol>
            </div>
          </div>
        `,
        footerHtml: `
          <button class="btn btn-primary" onclick="window.activeModalClose()">Close</button>
        `,
        size: 'md'
      });
    };

    window.testAIGatewayConnection = async () => {
      Toast.info('Testing AI Gateway connection...');
      try {
        const res = await aiService.generateLegalResponse({
          message: 'Connection test: ping legal AI assistant.'
        });
        if (res.success) {
          Toast.success(`AI Gateway Active! Provider: ${res.provider}`);
        } else {
          Toast.info('AI Gateway operating in safe offline rule-engine mode.');
        }
      } catch (err) {
        Toast.error('Gateway test failed: ' + err.message);
      }
    };

    window.handleSendLegalQuery = async () => {
      const input = document.getElementById('ai-chat-input');
      const sendBtn = document.getElementById('ai-send-query-btn');
      if (!input) return;

      const userText = input.value.trim();
      if (!userText) return;

      const session = aiService.getCurrentSession();
      if (!session) return;

      aiService.addMessage(session.id, {
        role: 'user',
        content: userText
      });

      input.value = '';
      this.handleRoute();

      const scrollEl = document.getElementById('ai-chat-messages-scroll');
      if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;

      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = `<span>Thinking...</span> <span class="spinner" style="width:12px; height:12px; border:2px solid #fff; border-top-color:transparent; border-radius:50%; display:inline-block; animation:spin 1s linear infinite;"></span>`;
      }

      const docText = session.attachedDocument ? session.attachedDocument.text : '';
      const history = session.messages.map(m => ({ role: m.role, content: m.content }));

      const res = await aiService.generateLegalResponse({
        message: userText,
        documentText: docText,
        jurisdiction: session.jurisdiction,
        mode: aiService.getMode(),
        history
      });

      aiService.addMessage(session.id, {
        role: 'assistant',
        content: res.reply,
        provider: res.provider
      });

      this.handleRoute();

      const scrollElAfter = document.getElementById('ai-chat-messages-scroll');
      if (scrollElAfter) scrollElAfter.scrollTop = scrollElAfter.scrollHeight;
    };

    window.handleRegenerateResponse = async (msgId) => {
      const session = aiService.getCurrentSession();
      if (!session) return;

      const userMsgs = session.messages.filter(m => m.role === 'user');
      const lastUserMsg = userMsgs.length ? userMsgs[userMsgs.length - 1].content : 'Review this contract';

      Toast.info('Regenerating legal response...');

      const docText = session.attachedDocument ? session.attachedDocument.text : '';
      const history = session.messages.map(m => ({ role: m.role, content: m.content }));

      const res = await aiService.generateLegalResponse({
        message: lastUserMsg,
        documentText: docText,
        jurisdiction: session.jurisdiction,
        mode: aiService.getMode(),
        history
      });

      aiService.addMessage(session.id, {
        role: 'assistant',
        content: res.reply,
        provider: res.provider
      });

      this.handleRoute();
      Toast.success('Response regenerated.');
    };

    // AI suggestions helper
    window.useSuggestedPrompt = text => {
      const input = document.getElementById('ai-chat-input');
      if (input) {
        input.value = text;
        window.handleSendLegalQuery();
      }
    };
  }

  handleRoute() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const hash = window.location.hash || '#/dashboard';
    let route = hash.replace('#/', '');
    let subParam = null;

    if (route.includes('/')) {
      const parts = route.split('/');
      route = parts[0];
      subParam = parts[1];
    }

    this.currentRoute = route;

    // 1. Check if user is logged in
    if (!authService.isLoggedIn() || route === 'login') {
      appEl.innerHTML = renderLoginPage();
      this.setupLoginEvents();
      return;
    }

    // 2. Render Authenticated App Shell
    appEl.innerHTML = `
      <div id="sidebar-backdrop"></div>
      ${renderSidebar(this.currentRoute, this.isSidebarCollapsed)}
      <div class="main-wrapper ${this.isSidebarCollapsed ? 'collapsed' : ''}" id="main-wrapper">
        ${renderTopbar()}
        <main id="main-content"></main>
      </div>
      ${renderFloatingLegalAssistant()}
    `;

    this.setupShellEvents();

    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // 3. Dispatch to role-based page renderers
    if (route === 'dashboard') {
      if (authService.isLegalManager()) {
        mainContent.innerHTML = renderLegalDashboardPage();
      } else if (authService.isChairman()) {
        mainContent.innerHTML = renderChairmanDashboardPage();
      } else {
        mainContent.innerHTML = renderBusinessDashboardPage();
      }
    } else if (route === 'create-request') {
      mainContent.innerHTML = renderCreateRequestPage();
      this.setupCreateRequestEvents();
    } else if (route === 'my-requests') {
      mainContent.innerHTML = renderLegalRequestsPage({ myRequestsOnly: true });
    } else if (route === 'requests') {
      if (subParam) {
        mainContent.innerHTML = renderRequestDetailPage(subParam);
        this.setupRequestDetailEvents(subParam);
      } else {
        mainContent.innerHTML = renderLegalRequestsPage({ myRequestsOnly: false });
      }
    } else if (route === 'department-docs') {
      mainContent.innerHTML = renderDepartmentDocumentsPage();
    } else if (route === 'documents') {
      if (authService.isChairman()) {
        mainContent.innerHTML = renderDepartmentsPage();
      } else if (authService.isBusinessUser()) {
        mainContent.innerHTML = renderDepartmentDocumentsPage();
      } else {
        mainContent.innerHTML = renderDocumentsPage();
        this.setupDocumentsEvents();
      }
    } else if (route === 'departments') {
      mainContent.innerHTML = renderDepartmentsPage();
    } else if (route === 'calendar') {
      if (authService.isChairman()) {
        mainContent.innerHTML = renderChairmanDashboardPage();
      } else {
        mainContent.innerHTML = renderCalendarPage();
      }
    } else if (route === 'assistant') {
      mainContent.innerHTML = renderLegalAssistantPage();
      this.setupAssistantEvents();
    } else if (route === 'notifications') {
      mainContent.innerHTML = renderNotificationsPage();
    } else if (route === 'audit-logs') {
      mainContent.innerHTML = renderAuditLogsPage();
    } else if (route === 'settings') {
      mainContent.innerHTML = renderAdminSettingsPage();
      this.setupSettingsEvents();
    } else if (route === 'about') {
      mainContent.innerHTML = renderAboutPage();
    } else {
      mainContent.innerHTML = authService.isLegalManager()
        ? renderLegalDashboardPage()
        : renderBusinessDashboardPage();
    }

    window.scrollTo(0, 0);
  }

  setupLoginEvents() {
    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        try {
          const user = authService.login(email);
          Toast.success(`Welcome back, ${user.name}!`);
          window.location.hash = '#/dashboard';
        } catch (err) {
          Toast.error(err.message);
        }
      });
    }
  }

  setupShellEvents() {
    // Sidebar toggle
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        this.handleRoute();
      });
    }

    // Mobile sidebar toggle & backdrop
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const backdrop = document.getElementById('sidebar-backdrop');

    const closeMobileSidebar = () => {
      document.body.classList.remove('mobile-sidebar-open');
    };

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', e => {
        e.stopPropagation();
        document.body.classList.toggle('mobile-sidebar-open');
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMobileSidebar);
    }

    // Close mobile sidebar on route link navigation
    const navLinks = document.querySelectorAll('#app-sidebar a.nav-item');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          closeMobileSidebar();
        }
      });
    });

    // Topbar profile dropdown
    const userBtn = document.getElementById('topbar-user-btn');
    const dropdown = document.getElementById('topbar-user-dropdown');
    if (userBtn && dropdown) {
      userBtn.addEventListener('click', e => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      });
      document.addEventListener('click', () => {
        if (dropdown) dropdown.style.display = 'none';
      });
    }
  }

  setupCreateRequestEvents() {
    const form = document.getElementById('simple-create-request-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const type = document.getElementById('req-type-select').value;
        const title = document.getElementById('req-title-input').value;
        const date = document.getElementById('req-date-input').value;
        const desc = document.getElementById('req-desc-input').value;
        const comment = document.getElementById('req-comment-input').value;
        const fileInput = document.getElementById('req-doc-file');

        let attachedDoc = null;
        if (fileInput && fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          attachedDoc = {
            name: file.name,
            size: `${Math.round(file.size / 1024)} KB`,
            uploadedAt: new Date().toISOString()
          };
        }

        const priorityEl = form.querySelector('input[name="req-priority"]:checked');
        const priority = priorityEl ? priorityEl.value : 'MEDIUM';

        try {
          const req = requestService.createRequest({
            title,
            requestType: type,
            priority,
            requiredByDate: date,
            description: desc,
            attachedDocument: attachedDoc,
            comment
          });

          Toast.success(`Request ${req.requestId} submitted successfully to Monisha!`);
          window.location.hash = `#/requests/${req.id}`;
        } catch (err) {
          Toast.error(err.message);
        }
      });
    }
  }

  setupRequestDetailEvents(requestId) {
    // Add Remark Button (Monisha)
    const addRemarkBtn = document.getElementById('btn-add-legal-remark');
    if (addRemarkBtn) {
      addRemarkBtn.addEventListener('click', () => {
        const text = prompt('Enter Legal Review Remark (e.g. Clause 5 â€” Payment terms should be revised):');
        if (text && text.trim()) {
          try {
            requestService.addRemark(requestId, text.trim());
            Toast.success('Legal remark added.');
            this.handleRoute();
          } catch (e) {
            Toast.error(e.message);
          }
        }
      });
    }

    // File Download Simulator
    window.downloadDocumentFile = (fileName, label = 'Impacteers Legal Agreement') => {
      try {
        const fileContent = `=== IMPACTEERS LEGAL OS ===\nDocument: ${fileName}\nCategory: ${label}\nTimestamp: ${new Date().toISOString()}\n\n[VERIFIED LEGAL DOCUMENT ARTIFACT - IMPACTEERS DOCUMENT MANAGEMENT SYSTEM]\nThis document is verified and stored in the secure legal vault.`;
        const blob = new Blob([fileContent], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'Legal_Document.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        Toast.success(`Downloaded ${fileName}`);
      } catch (err) {
        Toast.error('Could not initiate download: ' + err.message);
      }
    };

    // Upload Reviewed / Revised Doc (Monisha)
    const uploadReviewedBtn = document.getElementById('btn-upload-reviewed-doc');
    if (uploadReviewedBtn) {
      uploadReviewedBtn.addEventListener('click', () => {
        const req = requestService.getRequestById(requestId);
        const defaultName = req.attachedDocument
          ? req.attachedDocument.name.replace(/(\.[^.]+)$/, '_Legal_Reviewed$1')
          : `${req.title.replace(/\s+/g, '_')}_Legal_Reviewed.docx`;

        Modal.open({
          title: 'ðŸ“ Upload Reviewed / Revised Document',
          contentHtml: `
            <div>
              <!-- File Picker -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  1. Select Reviewed Document from Computer <span class="required">*</span>
                </label>
                <div style="border: 2px dashed #CBD5E1; border-radius: 8px; padding: 18px; text-align: center; background: #F8FAFC; cursor: pointer;" onclick="document.getElementById('modal-rev-file-input').click()">
                  <span style="font-size: 26px;">ðŸ“„</span>
                  <div style="font-size: 13px; font-weight: 600; color: #1E293B; margin-top: 4px;">Click to browse and choose file</div>
                  <div style="font-size: 11.5px; color: #64748B;">Supported: PDF, DOCX, DOC, XLSX, TXT</div>
                  <input type="file" id="modal-rev-file-input" style="display: none;" onchange="
                    if (this.files[0]) {
                      document.getElementById('modal-rev-file-preview').innerText = 'Selected: ' + this.files[0].name + ' (' + Math.round(this.files[0].size/1024) + ' KB)';
                      document.getElementById('modal-rev-file-preview').style.display = 'block';
                    }
                  " />
                  <div id="modal-rev-file-preview" style="display: none; font-size: 12.5px; color: #2563EB; font-weight: 600; margin-top: 8px;"></div>
                </div>
              </div>

              <!-- Legal Remarks -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  2. Legal Remarks / Revision Notes <span class="required">*</span>
                </label>
                <textarea id="modal-rev-remark-input" class="form-textarea" placeholder="e.g. Clause 5 payment terms updated to Net 30 days. Liability cap limited to 2x contract value..." style="min-height: 80px;" required>Clause 5 payment terms verified and revised. Liability cap limited to standard terms.</textarea>
              </div>

              <!-- Note to Stakeholder -->
              <div class="form-group" style="margin-bottom: 8px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  3. Note to Business Stakeholder <span style="font-size: 11px; color: #64748B; font-weight: 400;">(Optional)</span>
                </label>
                <input type="text" id="modal-rev-comment-input" class="form-input" placeholder="e.g. Reviewed copy attached. Please execute with client..." value="Reviewed copy attached. Please proceed with client execution and upload final signed agreement." />
              </div>
            </div>
          `,
          footerHtml: `
            <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
            <button class="btn btn-primary" id="confirm-upload-rev-btn">Upload & Submit to Business</button>
          `,
          size: 'md'
        });

        document.getElementById('confirm-upload-rev-btn').addEventListener('click', () => {
          const fileInput = document.getElementById('modal-rev-file-input');
          const remarkText = document.getElementById('modal-rev-remark-input').value;
          const commentText = document.getElementById('modal-rev-comment-input').value;

          let fileName = defaultName;
          let fileSize = '2.4 MB';

          if (fileInput && fileInput.files && fileInput.files[0]) {
            fileName = fileInput.files[0].name;
            fileSize = `${Math.round(fileInput.files[0].size / 1024)} KB`;
          }

          if (!remarkText.trim()) {
            Toast.error('Please enter legal review remarks.');
            return;
          }

          try {
            requestService.uploadReviewedDocument(requestId, {
              name: fileName,
              size: fileSize,
              remarkText: remarkText.trim(),
              commentText: commentText.trim()
            });
            Modal.close();
            Toast.success('Reviewed document & remarks submitted to stakeholder!');
            this.handleRoute();
          } catch (e) {
            Toast.error(e.message);
          }
        });
      });
    }

    // Upload Final Signed Document (Business or Legal)
    const uploadFinalBtn = document.getElementById('btn-upload-final-signed-doc');
    if (uploadFinalBtn) {
      uploadFinalBtn.addEventListener('click', () => {
        const req = requestService.getRequestById(requestId);
        const defaultName = req.attachedDocument
          ? req.attachedDocument.name.replace(/(\.[^.]+)$/, '_Final_Executed$1')
          : `${req.title.replace(/\s+/g, '_')}_Final_Executed.pdf`;

        Modal.open({
          title: 'âœï¸ Upload Final Executed / Signed Document',
          contentHtml: `
            <div>
              <!-- File Picker -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  1. Select Final Signed PDF from Computer <span class="required">*</span>
                </label>
                <div style="border: 2px dashed #CBD5E1; border-radius: 8px; padding: 18px; text-align: center; background: #F8FAFC; cursor: pointer;" onclick="document.getElementById('modal-final-file-input').click()">
                  <span style="font-size: 26px;">âœï¸</span>
                  <div style="font-size: 13px; font-weight: 600; color: #1E293B; margin-top: 4px;">Click to browse and choose signed document</div>
                  <div style="font-size: 11.5px; color: #64748B;">Supported: PDF, DOCX, DOC (Executed & Signed)</div>
                  <input type="file" id="modal-final-file-input" style="display: none;" onchange="
                    if (this.files[0]) {
                      document.getElementById('modal-final-file-preview').innerText = 'Selected: ' + this.files[0].name + ' (' + Math.round(this.files[0].size/1024) + ' KB)';
                      document.getElementById('modal-final-file-preview').style.display = 'block';
                    }
                  " />
                  <div id="modal-final-file-preview" style="display: none; font-size: 12.5px; color: #059669; font-weight: 600; margin-top: 8px;"></div>
                </div>
              </div>

              <!-- Execution Comment -->
              <div class="form-group" style="margin-bottom: 8px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  2. Execution / Signature Comments <span style="font-size: 11px; color: #64748B; font-weight: 400;">(Optional)</span>
                </label>
                <textarea id="modal-final-comment-input" class="form-textarea" placeholder="e.g. Executed and signed by both parties on 27 Aug 2026..." style="min-height: 70px;">Executed copy signed by client and company authorized signatory.</textarea>
              </div>
            </div>
          `,
          footerHtml: `
            <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
            <button class="btn btn-primary" id="confirm-upload-final-btn">Upload Final Document</button>
          `,
          size: 'md'
        });

        document.getElementById('confirm-upload-final-btn').addEventListener('click', () => {
          const fileInput = document.getElementById('modal-final-file-input');
          const commentText = document.getElementById('modal-final-comment-input').value;

          let fileName = defaultName;
          let fileSize = '3.2 MB';

          if (fileInput && fileInput.files && fileInput.files[0]) {
            fileName = fileInput.files[0].name;
            fileSize = `${Math.round(fileInput.files[0].size / 1024)} KB`;
          }

          try {
            requestService.uploadFinalSignedDocument(requestId, {
              name: fileName,
              size: fileSize,
              commentText: commentText.trim()
            });
            Modal.close();
            Toast.success('Final signed document uploaded! Ready for completion.');
            this.handleRoute();
          } catch (e) {
            Toast.error(e.message);
          }
        });
      });
    }

    // Send Comment
    const commentBtn = document.getElementById('btn-submit-ticket-comment');
    if (commentBtn) {
      commentBtn.addEventListener('click', () => {
        const textInput = document.getElementById('ticket-comment-text');
        const internalCheck = document.getElementById('comment-is-internal-checkbox');
        if (!textInput || !textInput.value.trim()) return;

        try {
          requestService.addComment(
            requestId,
            textInput.value.trim(),
            internalCheck ? internalCheck.checked : false
          );
          Toast.success('Comment posted.');
          this.handleRoute();
        } catch (e) {
          Toast.error(e.message);
        }
      });
    }
  }

  setupDocumentsEvents() {
    const addDocBtn = document.getElementById('btn-vault-add-doc');
    if (addDocBtn) {
      addDocBtn.addEventListener('click', () => {
        Modal.open({
          title: 'ðŸ“ Add Document to Central Vault',
          contentHtml: `
            <div>
              <!-- 1. Document Title -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  1. Document Title <span class="required">*</span>
                </label>
                <input type="text" id="vault-doc-title" class="form-input" placeholder="e.g. Staffing Framework Master Services Agreement" required />
              </div>

              <!-- 2. Document Type -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  2. Document Category / Type <span class="required">*</span>
                </label>
                <select id="vault-doc-type" class="form-select" required>
                  <option value="Master Services Agreement">Master Services Agreement (MSA)</option>
                  <option value="Vendor Agreement">Vendor Agreement</option>
                  <option value="MOU">MOU / Memorandum of Understanding</option>
                  <option value="NDA">NDA / Non-Disclosure Agreement</option>
                  <option value="Corporate Policy">Corporate Policy</option>
                  <option value="Software License">Software License</option>
                  <option value="Employment Contract">Employment Contract</option>
                </select>
              </div>

              <!-- 3. Sharing / Access Permission -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  3. Share With Department / Scope <span class="required">*</span>
                </label>
                <select id="vault-doc-scope" class="form-select" onchange="
                  const deptPicker = document.getElementById('vault-dept-picker-container');
                  if (deptPicker) {
                    deptPicker.style.display = this.value === 'SPECIFIC_DEPT' ? 'block' : 'none';
                  }
                " required>
                  <option value="SPECIFIC_DEPT">ðŸ¢ Specific Department (e.g. Staffing, Finance, HR...)</option>
                  <option value="ALL_DEPTS">ðŸŒ All Departments (Company-Wide Access)</option>
                  <option value="LEGAL_ONLY">ðŸ”’ Only Legal Manager & Chairman (Confidential Legal Vault)</option>
                </select>
              </div>

              <!-- Specific Dept Picker -->
              <div class="form-group" id="vault-dept-picker-container" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  Select Target Department <span class="required">*</span>
                </label>
                <select id="vault-target-dept" class="form-select">
                  <option value="dept-staffing">Staffing</option>
                  <option value="dept-finance">Finance</option>
                  <option value="dept-hr">HR</option>
                  <option value="dept-it">IT</option>
                  <option value="dept-engineering">Engineering</option>
                  <option value="dept-product">Product</option>
                  <option value="dept-courses">Courses</option>
                  <option value="dept-campus">Campus</option>
                  <option value="dept-institutions">Institutions</option>
                  <option value="dept-marketing">Marketing</option>
                </select>
              </div>

              <!-- 4. File Picker -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  4. Select Document File from Computer <span class="required">*</span>
                </label>
                <div style="border: 2px dashed #CBD5E1; border-radius: 8px; padding: 18px; text-align: center; background: #F8FAFC; cursor: pointer;" onclick="document.getElementById('vault-file-input').click()">
                  <span style="font-size: 26px;">ðŸ“„</span>
                  <div style="font-size: 13px; font-weight: 600; color: #1E293B; margin-top: 4px;">Click to browse and choose file</div>
                  <div style="font-size: 11.5px; color: #64748B;">Supported: PDF, DOCX, DOC, XLSX, TXT</div>
                  <input type="file" id="vault-file-input" style="display: none;" onchange="
                    if (this.files[0]) {
                      document.getElementById('vault-file-preview').innerText = 'Selected: ' + this.files[0].name + ' (' + Math.round(this.files[0].size/1024) + ' KB)';
                      document.getElementById('vault-file-preview').style.display = 'block';
                    }
                  " />
                  <div id="vault-file-preview" style="display: none; font-size: 12.5px; color: #2563EB; font-weight: 600; margin-top: 8px;"></div>
                </div>
              </div>

              <!-- 5. Effective Date -->
              <div class="form-group" style="margin-bottom: 8px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  5. Effective Date <span style="font-size: 11px; color: #64748B;">(Optional)</span>
                </label>
                <input type="date" id="vault-effective-date" class="form-input" value="${new Date().toISOString().split('T')[0]}" />
              </div>
            </div>
          `,
          footerHtml: `
            <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
            <button class="btn btn-primary" id="confirm-vault-save-btn">Save Document to Vault</button>
          `,
          size: 'md'
        });

        document.getElementById('confirm-vault-save-btn').addEventListener('click', () => {
          const title = document.getElementById('vault-doc-title').value;
          const type = document.getElementById('vault-doc-type').value;
          const scope = document.getElementById('vault-doc-scope').value;
          const targetDept = document.getElementById('vault-target-dept').value;
          const effDate = document.getElementById('vault-effective-date').value;
          const fileInput = document.getElementById('vault-file-input');

          if (!title.trim()) {
            Toast.error('Please enter a document title.');
            return;
          }

          let fileName = `${title.trim().replace(/\s+/g, '_')}.pdf`;
          let fileSize = '2.4 MB';

          if (fileInput && fileInput.files && fileInput.files[0]) {
            fileName = fileInput.files[0].name;
            fileSize = `${Math.round(fileInput.files[0].size / 1024)} KB`;
          }

          try {
            documentService.addVaultDocument({
              title: title.trim(),
              documentType: type,
              fileName,
              fileSize,
              sharingTarget: scope,
              targetDepartmentId: targetDept,
              effectiveDate: effDate,
              status: 'Executed'
            });
            Modal.close();
            Toast.success(`"${title}" added to vault and synced to repository!`);
            this.handleRoute();
          } catch (e) {
            Toast.error(e.message);
          }
        });
      });
    }
  }

  setupAssistantEvents() {
    const sendBtn = document.getElementById('ai-send-btn');
    const input = document.getElementById('ai-chat-input');
    const container = document.getElementById('ai-messages-container');
    const docSelect = document.getElementById('ai-document-context-select');
    const modelSelect = document.getElementById('ai-page-model-select');
    const statusPill = document.getElementById('page-ollama-status-pill');
    const clearBtn = document.getElementById('ai-clear-chat-btn');

    let pageConversationHistory = [];

    // Helper for formatting markdown
    const formatMd = text => {
      if (!text) return '';
      return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/^### (.*$)/gim, '<div style="font-size: 14px; font-weight: 800; color: #0F172A; margin: 8px 0 4px 0;">$1</div>')
        .replace(/^## (.*$)/gim, '<div style="font-size: 15px; font-weight: 800; color: #0F172A; margin: 10px 0 6px 0;">$1</div>')
        .replace(/^# (.*$)/gim, '<div style="font-size: 16px; font-weight: 800; color: #0F172A; margin: 12px 0 6px 0;">$1</div>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code style="background: #F1F5F9; padding: 1px 5px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #1E293B;">$1</code>')
        .replace(/^\s*-\s+(.*$)/gim, '<li style="margin-left: 18px; margin-bottom: 4px;">$1</li>')
        .replace(/^\s*\*\s+(.*$)/gim, '<li style="margin-left: 18px; margin-bottom: 4px;">$1</li>')
        .replace(/&gt; (.*$)/gim, '<blockquote style="border-left: 3px solid #3B82F6; background: #EFF6FF; padding: 6px 12px; border-radius: 4px; margin: 6px 0; font-size: 12.5px; color: #1E40AF;">$1</blockquote>')
        .replace(/\n\n/g, '<div style="height: 8px;"></div>')
        .replace(/\n/g, '<br/>');
    };

    // Update status pill & model list
    const updatePageStatus = async () => {
      const status = await legalAssistantService.checkOllamaStatus();
      if (statusPill) {
        if (status.connected) {
          statusPill.innerHTML = `<span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981; display: inline-block;"></span><span>Ollama Live (${status.activeModel})</span>`;
          statusPill.style.background = '#ECFDF5';
          statusPill.style.color = '#047857';
          if (modelSelect && status.models.length > 0) {
            modelSelect.innerHTML = status.models.map(m => `<option value="${m}" ${m === status.activeModel ? 'selected' : ''}>${m}</option>`).join('');
          }
        } else {
          statusPill.innerHTML = `<span style="width: 8px; height: 8px; border-radius: 50%; background: #EF4444; display: inline-block;"></span><span>Ollama Offline (Simulation)</span>`;
          statusPill.style.background = '#FEE2E2';
          statusPill.style.color = '#B91C1C';
        }
      }
    };
    updatePageStatus();

    // Suggested prompt click handler
    window.usePageSuggestedPrompt = text => {
      if (input) {
        input.value = text;
        handleSend();
      }
    };

    // Clear chat handler
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        pageConversationHistory = [];
        const user = authService.getCurrentUser();
        container.innerHTML = `
          <div style="display: flex; gap: 14px; max-width: 85%;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">ðŸ¤–</div>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px;">
              <div style="font-weight: 600; font-size: 13px; color: #0F172A; margin-bottom: 6px;">Impacteers AI Legal Counsel</div>
              <div style="font-size: 13.5px; color: #334155; line-height: 1.6;">
                Chat history cleared. How can I assist with your document review or contract clauses today?
              </div>
            </div>
          </div>
        `;
        Toast.info('Chat history cleared.');
      });
    }

    const handleSend = async () => {
      const q = input.value.trim();
      if (!q) return;

      input.value = '';
      const selectedDocId = docSelect ? docSelect.value : null;

      // Render user question
      const userMsg = document.createElement('div');
      userMsg.style.cssText = 'display: flex; justify-content: flex-end;';
      userMsg.innerHTML = `
        <div style="background: #2563EB; color: #fff; padding: 12px 18px; border-radius: 14px; font-size: 13.5px; max-width: 80%; line-height: 1.5; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
          ${q.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </div>
      `;
      container.appendChild(userMsg);
      container.scrollTop = container.scrollHeight;

      // Render typing indicator
      const typingMsg = document.createElement('div');
      typingMsg.id = 'page-typing-indicator';
      typingMsg.style.cssText = 'display: flex; gap: 14px; max-width: 85%;';
      typingMsg.innerHTML = `
        <div style="width: 36px; height: 36px; border-radius: 8px; background: #EFF6FF; color: #2563EB; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">â³</div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; font-size: 13px; color: #64748B; display: flex; align-items: center; gap: 8px;">
          <span>Reasoning with ${legalAssistantService.isConnected ? 'local ' + legalAssistantService.model : 'Legal RAG engine'}</span>
          <span class="typing-dots">...</span>
        </div>
      `;
      container.appendChild(typingMsg);
      container.scrollTop = container.scrollHeight;

      try {
        const result = await legalAssistantService.askQuestion({
          question: q,
          documentId: selectedDocId,
          conversationHistory: pageConversationHistory
        });

        typingMsg.remove();
        pageConversationHistory.push({ role: 'user', content: q });
        pageConversationHistory.push({ role: 'assistant', content: result.text });

        const aiMsg = document.createElement('div');
        aiMsg.style.cssText = 'display: flex; gap: 14px; max-width: 85%;';
        aiMsg.innerHTML = `
          <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">ðŸ¤–</div>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; font-size: 13.5px; color: #1E293B; line-height: 1.6; flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-weight: 700; font-size: 13px; color: #0F172A;">Impacteers AI Legal Counsel</span>
              <span style="font-size: 10px; background: ${result.isLiveOllama ? '#ECFDF5' : '#F1F5F9'}; color: ${result.isLiveOllama ? '#047857' : '#475569'}; padding: 1.5px 6px; border-radius: 4px; font-weight: 700;">
                ${result.model}
              </span>
            </div>
            <div>${formatMd(result.text)}</div>
            ${result.citations && result.citations.length > 0 ? `
              <div style="font-size: 11px; color: #64748B; margin-top: 10px; border-top: 1px dashed #CBD5E1; padding-top: 6px;">
                <strong>Grounded Sources:</strong> ${result.citations.join(', ')}
              </div>
            ` : ''}
          </div>
        `;
        container.appendChild(aiMsg);
      } catch (err) {
        typingMsg.remove();
        const errEl = document.createElement('div');
        errEl.style.cssText = 'display: flex; gap: 14px; max-width: 85%;';
        errEl.innerHTML = `
          <div style="width: 36px; height: 36px; border-radius: 8px; background: #FEE2E2; color: #DC2626; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">âš ï¸</div>
          <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 12px; padding: 14px; font-size: 13px; color: #BE123C; flex: 1;">
            <strong>Error:</strong> ${err.message}
          </div>
        `;
        container.appendChild(errEl);
      }

      container.scrollTop = container.scrollHeight;
    };

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleSend();
      });
    }
  }

  setupSettingsEvents() {
    const saveBtn = document.getElementById('save-ai-endpoint-btn');
    const testBtn = document.getElementById('test-ollama-btn');
    const endpointInput = document.getElementById('ai-endpoint-input');
    const modelInput = document.getElementById('ai-model-input');
    const tempInput = document.getElementById('ai-temp-input');
    const resetBtn = document.getElementById('reset-database-btn');

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        if (endpointInput) legalAssistantService.setEndpoint(endpointInput.value.trim());
        if (modelInput) legalAssistantService.setModel(modelInput.value.trim());
        if (tempInput) legalAssistantService.setTemperature(tempInput.value);
        Toast.success('Local Ollama AI configuration saved successfully!');
      });
    }

    if (testBtn) {
      testBtn.addEventListener('click', async () => {
        testBtn.disabled = true;
        testBtn.innerText = 'Testing...';
        const res = await legalAssistantService.checkOllamaStatus();
        testBtn.disabled = false;
        testBtn.innerText = 'ðŸ”„ Test Connection';

        if (res.connected) {
          Toast.success(`Connected to Ollama! Found ${res.models.length} model(s): ${res.models.join(', ')}`);
        } else {
          Toast.error('Cannot connect to Ollama. Make sure Ollama is running (`ollama run llama3.2`).');
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset the enterprise database to its original state?')) {
          db.reset();
          Toast.success('Database has been reset.');
          this.handleRoute();
        }
      });
    }
  }
}

// Initialize Application immediately or when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.impacteersApp = new App();
  });
} else {
  window.impacteersApp = new App();
}

window.impacteersApp = new App();
})();
