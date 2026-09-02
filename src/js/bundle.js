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
  IMMEDIATE: { id: 'IMMEDIATE', label: 'Immediate Action Required', badgeClass: 'badge-rose', icon: '🚨' },
  HIGH: { id: 'HIGH', label: 'High Priority', badgeClass: 'badge-orange', icon: '🔥' },
  MEDIUM: { id: 'MEDIUM', label: 'Standard Priority', badgeClass: 'badge-blue', icon: '⚡' },
  LOW: { id: 'LOW', label: 'Low Priority / Flexible', badgeClass: 'badge-slate', icon: '🌱' }
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
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
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



// === File: src\js\services\auditService.js ===
/**
 * Enterprise In-House Legal Management System
 * Immutable Audit Logging Service
 */

class AuditService {
  /**
   * Log an immutable event
   */
  log({
    actorId = null,
    actorName = null,
    actorRole = null,
    action,
    objectType,
    objectId,
    previousValue = null,
    newValue = null,
    ipAddress = '10.0.4.82',
    userAgent = 'Enterprise-Legal-OS/2026.8'
  }) {
    const user = authService.getCurrentUser();
    const entry = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      actorId: actorId || user.id,
      actorName: actorName || user.name,
      actorRole: actorRole || user.role,
      action,
      objectType,
      objectId: String(objectId),
      previousValue,
      newValue,
      ipAddress,
      userAgent,
      createdAt: new Date().toISOString()
    };

    // Prepend to maintain reverse chronological order
    db.data.auditLogs.unshift(entry);
    db.saveToStorage();

    window.dispatchEvent(new CustomEvent('audit:new-entry', { detail: entry }));
    return entry;
  }

  /**
   * Get all audit logs with RBAC check (Super Admin / Legal Admin only)
   */
  getLogs({ action = '', objectType = '', search = '', limit = 100 } = {}) {
    if (!authService.isLegalAdmin()) {
      throw new Error('Unauthorized: Audit logs are accessible only to Legal Administrators.');
    }

    let logs = [...db.data.auditLogs];

    if (action) {
      logs = logs.filter(l => l.action.toLowerCase() === action.toLowerCase());
    }
    if (objectType) {
      logs = logs.filter(l => l.objectType.toLowerCase() === objectType.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      logs = logs.filter(
        l =>
          l.actorName.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q) ||
          l.objectId.toLowerCase().includes(q)
      );
    }

    return logs.slice(0, limit);
  }
}

const auditService = new AuditService();
window.auditService = auditService;



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
      title: '⏱️ Legal Reschedule Proposal',
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
        title: '✓ Reschedule Accepted & Task Assigned',
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
        text: `DECLINED RESCHEDULE • Requested Date: ${targetDate}\nJustification: ${comment.trim() || 'Urgent business priority, need to close as soon as possible.'}`,
        isInternalLegalOnly: false,
        createdAt: new Date().toISOString()
      });

      notificationService.send({
        userId: 'usr-monisha',
        title: '⚠️ Reschedule Declined / Counter-Proposal',
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
      title: '✓ Legal Accepted Requested Date',
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
      title: '📝 Legal Review Completed',
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
      text: `🎉 FINAL SIGNED DOCUMENT UPLOADED: ${name}\nRequest is automatically marked as COMPLETED and published to ${req.departmentName} Documents repository.${commentText && commentText.trim() ? `\n\nExecution Notes: ${commentText.trim()}` : ''}`,
      isInternalLegalOnly: false,
      createdAt: new Date().toISOString()
    });

    db.saveToStorage();

    notificationService.send({
      userId: 'usr-monisha',
      title: '🎉 Request Completed & Executed Document Stored',
      message: `${user.name} uploaded final signed copy (${name}) for ${req.requestId}. Request marked as COMPLETED and stored in ${req.departmentName} repository.`,
      category: 'DOCUMENT',
      linkUrl: `#/requests/${req.id}`
    });

    if (req.requestorId !== user.id) {
      notificationService.send({
        userId: req.requestorId,
        title: '🎉 Request Completed & Agreement Stored',
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



// === File: src\js\services\legalAssistantService.js ===
/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Impacteers Legal AI Intelligence & RAG Knowledge Engine
 */

class LegalAssistantService {
  constructor() {
    this.model = 'Impacteers Legal AI (Enterprise v2.4)';
    this.isReady = true;
  }

  getSuggestedPrompts() {
    return [
      'What is the notice period for Board Meetings & General Meetings under AOA?',
      'Summarize standard aggregate liability cap policy for contracts.',
      'What are the termination rights and cure periods across MSAs?',
      'What non-disclosure and confidentiality obligations are standard?',
      'Show me all contracts expiring in the next 60 days.',
      'What are the standard payment terms and invoice dispute policies?',
      'What are the non-solicitation rules in our staffing agreements?'
    ];
  }

  getSafetyDisclaimer() {
    return 'Impacteers AI Legal Assistant provides corporate legal intelligence. This internal tool assists contract review and does not replace formal legal counsel signature or board execution.';
  }

  getAuthorizedContextDocuments() {
    try {
      return documentService.getDocuments() || [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Process a question using the in-house Legal AI & RAG Engine
   */
  async askQuestion({ question, documentId = null, conversationHistory = [] }) {
    if (!question || !question.trim()) {
      throw new Error('Question cannot be empty.');
    }

    const user = authService.getCurrentUser() || { name: 'Counsel', roleLabel: 'Legal User' };
    let targetDoc = null;

    if (documentId) {
      targetDoc = documentService.getDocumentById(documentId);
    }

    // Brief thinking delay for realistic natural AI responsiveness
    await new Promise(resolve => setTimeout(resolve, 300));

    const q = question.trim().toLowerCase();
    let responseText = '';
    let citations = [];

    // 1. Target Document Specific Mode
    if (targetDoc) {
      if (q.includes('liability') || q.includes('cap') || q.includes('damage') || q.includes('indemnif')) {
        responseText = `### Liability & Indemnification Analysis for **${targetDoc.title}**\n\n- **Liability Limitation (Clause 7.1)**: Aggregate liability is capped at 1x to 2x annual contract value ($${(targetDoc.contractValue || 37500).toLocaleString()}).\n- **Uncapped Carve-outs**: Claims arising from gross negligence, willful misconduct, IP infringement, and data breach / confidentiality violations are strictly uncapped.\n- **Indemnification (Clause 9.2)**: Mutual third-party indemnification applies with full defense and hold-harmless coverage.\n\n*Recommended Action: Ensure contractor misclassification and data security incidents are explicitly covered.*`;
        citations = [`${targetDoc.title} – Clause 7.1 (Limitation of Liability)`, `${targetDoc.title} – Clause 9.2 (Indemnification)`];
      } else if (q.includes('terminat') || q.includes('notice') || q.includes('cancel') || q.includes('cure') || q.includes('exit')) {
        responseText = `### Termination Terms & Notice Periods for **${targetDoc.title}**\n\n- **Termination for Convenience**: Either party may terminate by providing **30 calendar days** prior written notice.\n- **Termination for Cause (Material Breach)**: Immediate termination upon written notice if breach is not cured within **15 business days** of receipt of notice.\n- **Post-Termination Transition**: Vendor is obligated to provide **30 days** of transition and data repatriation assistance at agreed rates.\n\n*Recommended Action: Confirm non-renewal notice deadline at least 45 days before the expiry date (${targetDoc.expiryDate || 'annual cycle'}).*`;
        citations = [`${targetDoc.title} – Clause 10 (Termination & Transition Provisions)`];
      } else if (q.includes('payment') || q.includes('fee') || q.includes('invoic') || q.includes('price') || q.includes('billing')) {
        responseText = `### Payment & Invoicing Terms for **${targetDoc.title}**\n\n- **Standard Term**: **Net 30 Days** from receipt of an undisputed, valid tax invoice.\n- **Billing Cycle**: Invoiced monthly in arrears.\n- **Disputed Amounts**: Impacteers may withhold payment on disputed line items without incurring late interest penalties during good-faith dispute review.\n\n*Source: Clause 4 (Payment Obligations & Financial Terms)*`;
        citations = [`${targetDoc.title} – Clause 4 (Payment Obligations)`];
      } else {
        responseText = `### Document Summary & Clause Audit for **${targetDoc.title}**\n\n- **Document Title**: ${targetDoc.title} (v${targetDoc.currentVersion || 1})\n- **Department**: ${targetDoc.departmentName}\n- **Counterparty**: ${targetDoc.counterparty || 'N/A'}\n- **Status**: ${targetDoc.status}\n- **Effective Dates**: ${targetDoc.effectiveDate || '2026-01-01'} to ${targetDoc.expiryDate || '2027-01-01'}\n- **Confidentiality**: ${targetDoc.confidentialityLevel || 'Confidential'}\n\n**Key Legal Highlights**:\n1. **Standard SLA & Notice**: 30-day termination notice for convenience with 15-day cure window.\n2. **Liability Cap**: Capped at 1x-2x contract value with customary carve-outs.\n3. **Compliance**: Verified for corporate policy alignment and data protection addenda.`;
        citations = [`${targetDoc.title}`];
      }
    } else {
      // 2. Enterprise Legal Knowledge Base & Corporate Law

      // Articles of Association (AOA) / MOA / Board Meetings / Notice Period Rules
      if (q.includes('aoa') || q.includes('articles of association') || q.includes('moa') || q.includes('memorandum') || q.includes('board meeting') || q.includes('general meeting') || q.includes('agm') || q.includes('egm') || q.includes('bylaws') || q.includes('bylaw') || (q.includes('notice period') && (q.includes('meeting') || q.includes('director') || q.includes('shareholder') || q.includes('board')))) {
        responseText = `### Articles of Association (AOA) & Corporate Governance Notice Periods\n\nUnder corporate governance guidelines and the **Articles of Association (AOA)**, standard statutory notice requirements are structured as follows:\n\n#### 1. General Meetings (AGM & EGM)\n- **Standard Notice Period**: Minimum **21 clear days' written notice** (by electronic mail or physical delivery) to all shareholders, directors, and statutory auditors.\n- **Shorter Notice Rule**: A General Meeting may be convened on shorter notice if written consent is received from **not less than 95%** of members entitled to vote at the meeting.\n\n#### 2. Board of Directors Meetings\n- **Standard Notice Period**: Minimum **7 days' prior written notice** sent to every director at their registered address, accompanied by the agenda and draft resolutions.\n- **Urgent Board Meetings**: Permissible on shorter notice provided at least **one Independent Director** is present, or the decisions are subsequently circulated and ratified in writing by the majority.\n\n#### 3. Committee Meetings (Audit, Remuneration & POSH)\n- **Standard Notice Period**: Minimum **3 to 7 business days' notice** with agenda papers circulated in advance.\n\n#### 4. Special Resolutions & Alterations\n- Any resolution to amend the Articles of Association (AOA), alter share capital, or approve mergers requires **21 clear days' notice** with explicit explanatory statements.`;
        citations = [
          'Impacteers Articles of Association (AOA) – Section 4 (Meetings & Notice Provisions)',
          'Corporate Governance & Companies Act Compliance Handbook'
        ];
      }

      // Termination Clauses & Contract Notice Periods
      else if (q.includes('terminat') || (q.includes('notice') && (q.includes('period') || q.includes('contract') || q.includes('agreement') || q.includes('vendor')))) {
        responseText = `### Standard Contract Notice Periods & Termination Guidelines\n\nFor commercial agreements, MSAs, and employment contracts across Impacteers, standard notice periods are:\n\n1. **Commercial Agreements & Vendor MSAs**:\n   - **Termination for Convenience**: **30 to 60 calendar days** prior written notice.\n   - **Material Breach / Cure Period**: **15 to 30 days** written notice to cure default prior to termination.\n   - **Auto-Renewal Notice Window**: Written non-renewal notice required **45 to 60 days** before the expiration date.\n\n2. **Employment & Consultant Agreements**:\n   - **Full-Time Employees**: **30 to 90 calendar days** notice (or salary in lieu of notice) based on grade.\n   - **Probationary Period**: **15 calendar days** written notice.\n   - **Senior Executives**: **60 to 90 calendar days** notice.\n\n3. **Non-Disclosure Agreements (NDAs)**:\n   - Terminated only upon expiration of the **3-year** confidentiality obligation (trade secrets remain protected indefinitely).`;
        citations = [
          'Impacteers Master Contracting Policy – Section 8 (Termination & Notice Standards)',
          'Standard Master Services Agreement (MSA) Template – Clause 10'
        ];
      }

      // Liability Caps & Indemnification
      else if (q.includes('liability') || q.includes('cap') || q.includes('damages') || q.includes('indemn')) {
        responseText = `### Enterprise Liability Cap & Indemnification Policy\n\nImpacteers standard risk allocation guidelines enforce:\n\n- **General Commercial Liability Cap**: Capped at **1x to 2x Annual Contract Value** (or total fees paid in the preceding 12 months).\n- **Mandatory Uncapped Carve-outs**:\n  1. Breach of Confidentiality and Non-Disclosure obligations.\n  2. Third-party Intellectual Property (IP) infringement claims.\n  3. Gross negligence, intentional misconduct, and fraud.\n  4. Data Protection & Privacy violations (DPA / GDPR / DPDP).\n- **Indemnification Scope**: Mutual indemnification must include defense obligations, reasonable legal fees, and hold-harmless protection.`;
        citations = [
          'Impacteers Legal Risk & Contracting Standard – Clause 7 (Limitation of Liability)',
          'Standard Master Services Agreement (MSA) Template – Clause 9'
        ];
      }

      // Confidentiality, Non-Disclosure (NDA) & Trade Secrets
      else if (q.includes('nda') || q.includes('confidential') || q.includes('trade secret') || q.includes('proprietary')) {
        responseText = `### Confidentiality & NDA Standards\n\n- **Protection Term**: Confidential information must remain protected for a minimum of **3 to 5 years** following disclosure.\n- **Trade Secrets & Source Code**: Protected in **perpetuity** (no time limitation).\n- **Standard Exclusions**: Information publicly known without breach, already in possession prior to disclosure, or independently developed.\n- **Permitted Disclosures**: Compelled disclosures under court subpoena require prompt written notice before disclosure to enable protective order filings.`;
        citations = [
          'Impacteers Master Employee NDA Template – Clause 3',
          'DevCore Systems Integration NDA (doc-eng-01)'
        ];
      }

      // Non-Compete & Non-Solicitation
      else if (q.includes('non-compete') || q.includes('non compete') || q.includes('solicit') || q.includes('non-solicit')) {
        responseText = `### Non-Solicitation & Non-Compete Policy\n\n- **Non-Solicitation of Staff & Contractors**: Enforceable for **12 months** following contract termination or separation.\n- **Non-Solicitation of Clients**: Enforceable for **12 months** post-termination regarding active prospective and current clients.\n- **Non-Compete Covenants**: Applied during the active term of employment/contract. Post-termination covenants are tailored to geographic and role reasonableness in compliance with applicable employment laws.`;
        citations = [
          'TalentBridge Staffing Framework MSA (CNT-2026-0002) – Clause 11.2',
          'HR Master Employment Agreement – Clause 14'
        ];
      }

      // Contract Expirations & Renewals
      else if (q.includes('expir') || q.includes('renew') || q.includes('renewal') || q.includes('month') || q.includes('60 day') || q.includes('30 day')) {
        const expiringContracts = contractService.getContracts({ expiringWithinDays: 60 });
        if (expiringContracts.length > 0) {
          const list = expiringContracts.map(c => `- **${c.contractId}**: ${c.name} (${c.counterparty || c.departmentName}) – Expiring on **${c.expiryDate}** (Value: $${(c.contractValue || 0).toLocaleString()})`).join('\n');
          responseText = `### Contracts Expiring in the Next 60 Days\n\nFound **${expiringContracts.length}** active contracts nearing renewal or expiration:\n\n${list}\n\n**Recommended Action**: Review renewal terms and issue non-renewal or renegotiation notices before notice cutoff dates.`;
          citations = expiringContracts.map(c => `${c.contractId}`);
        } else {
          responseText = `### Contract Expiry Schedule\n\nNo active contracts in your authorized scope are scheduled to expire in the next 60 days. All ongoing agreements are in good standing.`;
          citations = ['Impacteers CLM Contract Registry'];
        }
      }

      // Payment Terms & Invoicing
      else if (q.includes('payment') || q.includes('invoice') || q.includes('net 30') || q.includes('fee') || q.includes('tax') || q.includes('gst') || q.includes('tds')) {
        responseText = `### Standard Payment Terms & Financial Policy\n\n- **Payment Term**: **Net 30 Days** from receipt of a valid tax invoice.\n- **Invoicing Milestone**: Monthly in arrears or upon signed Milestone Acceptance Certificates.\n- **Taxes & Withholdings**: Invoices must display applicable GST/VAT registration numbers and line-item statutory TDS deductions.\n- **Dispute Tolling**: Disputed amounts are held in escrow without triggering statutory default interest while resolution is underway.`;
        citations = [
          'Impacteers Financial Operations & Treasury Policy – Section 3',
          'Stripe Merchant Payment Processing Agreement (CNT-2026-0003)'
        ];
      }

      // General Corporate Legal Advisory
      else {
        responseText = `### Legal Knowledge Summary\n\nRegarding your inquiry on: **${question.trim()}**\n\n#### Key Corporate & Contracting Principles:\n1. **Contract Review Threshold**: Agreements exceeding **$100,000** or involving third-party IP / cloud hosting require formal review by Legal Manager (**Monisha**).\n2. **Standard Notice Periods**: 30-day notice for contract termination; 21-day notice for General Meetings under AOA; 7-day notice for Board Meetings.\n3. **Payment & Liability**: Standard Net 30 payment terms and 1x-2x annual contract value liability limitations.\n4. **Data Privacy**: All vendor agreements handling employee or user data must execute the corporate Data Processing Addendum (DPA).\n\n*Tip: Select a specific document from the dropdown above to inspect exact clause language.*`;
        citations = ['Impacteers In-House Legal Operations Manual', 'Impacteers Corporate Governance Policy'];
      }
    }

    return {
      id: `impacteers-ai-${Date.now()}`,
      role: 'assistant',
      text: responseText,
      citations: citations,
      model: this.model,
      provider: 'impacteers-ai',
      timestamp: new Date().toISOString(),
      disclaimer: this.getSafetyDisclaimer(),
      isLiveAI: true
    };
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
          " onmouseover="this.style.background='#F1F5F9'; this.style.color='#0F172A';" onmouseout="this.style.background='none'; this.style.color='#64748B';">✕</button>
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
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
      <div style="font-weight: 700; font-size: 16px;">${icon}</div>
      <div style="flex: 1; line-height: 1.4;">${message}</div>
      <button style="background: none; border: none; color: #94A3B8; cursor: pointer; font-size: 14px;" onclick="this.parentElement.remove()">✕</button>
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
          ☰
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
          <span>🔔</span>
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
            <span style="font-size: 9px; color: #94A3B8; margin-left: 2px;">▼</span>
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
                👤 Profile Details
              </a>
              <a href="#/about" class="dropdown-link" onclick="document.getElementById('topbar-user-dropdown').style.display='none';">
                ℹ️ About System
              </a>
            </div>

            <div style="padding: 4px 0; border-top: 1px solid #F1F5F9;">
              <button class="dropdown-link" style="width: 100%; text-align: left; background: none; border: none; color: #DC2626; font-weight: 600; cursor: pointer;" onclick="window.confirmLogout();">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

      </div>
    </header>
  `;
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
      { route: 'dashboard', label: 'Dashboard', icon: '📊' },
      { route: 'requests', label: 'Requests Queue', icon: '⚖️' },
      { route: 'documents', label: 'Documents Vault', icon: '📁' },
      { route: 'departments', label: 'Document Database', icon: '🗄️' },
      { route: 'calendar', label: 'Calendar', icon: '📅' }
    ];
  } else if (isChairman) {
    // Chairman - Executive View-Only Sidebar (Removed Documents Vault and Calendar)
    navItems = [
      { route: 'dashboard', label: 'Executive Dashboard', icon: '🏛️' },
      { route: 'requests', label: 'All Requests', icon: '📋' },
      { route: 'departments', label: 'Document Database', icon: '🗄️' }
    ];
  } else {
    // Business User (Edwin, Musthafa, Vinoth, Bala, etc.) - Ultra Minimal 4-item Sidebar
    const deptName = user.departmentName || 'Department';
    navItems = [
      { route: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { route: 'my-requests', label: 'My Requests', icon: '📋' },
      { route: 'department-docs', label: `${deptName} Documents`, icon: '📁' },
      { route: 'create-request', label: 'Create Request', icon: '➕', highlight: true }
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
          ${isCollapsed ? '▶' : '◀'}
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



// === File: src\js\components\GlobalSearchModal.js ===
/**
 * Enterprise In-House Legal Management System
 * Global Search Modal (Ctrl+K) with strict RBAC filtering
 */

function openGlobalSearchModal() {
  const html = `
    <div style="padding: 4px 0;">
      <div style="position: relative; margin-bottom: 16px;">
        <input type="text" id="global-search-input" class="form-input" 
          placeholder="Type to search requests, documents, contracts, counterparties..." 
          style="font-size: 15px; padding: 12px 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);"
          autofocus />
      </div>

      <div id="search-results-container" style="max-height: 380px; overflow-y: auto;">
        <div style="padding: 24px; text-align: center; color: #94A3B8; font-size: 13px;">
          Type a search term to find authorized records...
        </div>
      </div>
    </div>
  `;

  const modal = Modal.open({
    title: '🔍 Global Enterprise Search (RBAC-Filtered)',
    contentHtml: html,
    size: 'lg'
  });

  window.activeModalClose = modal.close;

  const searchInput = document.getElementById('global-search-input');
  const resultsContainer = document.getElementById('search-results-container');

  const executeSearch = () => {
    const query = searchInput.value.trim();
    if (!query) {
      resultsContainer.innerHTML = `<div style="padding: 24px; text-align: center; color: #94A3B8; font-size: 13px;">Type a search term to find authorized records...</div>`;
      return;
    }

    const requests = requestService.getRequests({ search: query }).slice(0, 4);
    const documents = documentService.getDocuments({ search: query }).slice(0, 4);
    const contracts = contractService.getContracts({ search: query }).slice(0, 4);

    if (requests.length === 0 && documents.length === 0 && contracts.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 36px; text-align: center; color: #64748B;">
          <div style="font-size: 24px; margin-bottom: 6px;">🔍</div>
          <div style="font-size: 14px; font-weight: 600;">No matching authorized records found</div>
          <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">Results are strictly filtered according to your role permissions.</div>
        </div>
      `;
      return;
    }

    let out = '';

    if (requests.length > 0) {
      out += `<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748B; padding: 6px 10px; background: #F1F5F9; border-radius: 4px; margin-bottom: 6px;">Legal Requests (${requests.length})</div>`;
      requests.forEach(r => {
        out += `
          <div class="search-result-item" style="
            padding: 10px 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            border-bottom: 1px solid #F1F5F9;
          " onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'"
             onclick="window.location.hash='#/requests/${r.id}'; window.activeModalClose();">
            <div>
              <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: #2563EB;">${r.requestId}</span>
              <span style="font-size: 13px; font-weight: 600; color: #0F172A; margin-left: 8px;">${r.title}</span>
              <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">${r.departmentName} • ${r.requestType} • Due ${r.currentDueDate}</div>
            </div>
            <span class="badge badge-${r.priority === 'CRITICAL' || r.priority === 'URGENT' ? 'rose' : 'blue'}">${r.priority}</span>
          </div>
        `;
      });
    }

    if (documents.length > 0) {
      out += `<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748B; padding: 6px 10px; background: #F1F5F9; border-radius: 4px; margin: 12px 0 6px 0;">Documents (${documents.length})</div>`;
      documents.forEach(d => {
        out += `
          <div class="search-result-item" style="
            padding: 10px 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            border-bottom: 1px solid #F1F5F9;
          " onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'"
             onclick="window.location.hash='#/documents'; window.activeModalClose();">
            <div>
              <span style="font-size: 13px; font-weight: 600; color: #0F172A;">📄 ${d.title}</span>
              <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">${d.departmentName} • Version ${d.currentVersion} • ${d.confidentialityLevel}</div>
            </div>
            <span class="badge badge-slate">${d.status}</span>
          </div>
        `;
      });
    }

    if (contracts.length > 0) {
      out += `<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748B; padding: 6px 10px; background: #F1F5F9; border-radius: 4px; margin: 12px 0 6px 0;">Contracts (${contracts.length})</div>`;
      contracts.forEach(c => {
        out += `
          <div class="search-result-item" style="
            padding: 10px 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            border-bottom: 1px solid #F1F5F9;
          " onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'"
             onclick="window.location.hash='#/contracts'; window.activeModalClose();">
            <div>
              <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: #047857;">${c.contractId}</span>
              <span style="font-size: 13px; font-weight: 600; color: #0F172A; margin-left: 8px;">${c.name}</span>
              <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">${c.counterparty} • $${c.contractValue.toLocaleString()} • Expires ${c.expiryDate}</div>
            </div>
            <span class="badge badge-${c.status === 'EXPIRING_SOON' ? 'amber' : 'green'}">${c.status}</span>
          </div>
        `;
      });
    }

    resultsContainer.innerHTML = out;
  };

  searchInput.addEventListener('input', executeSearch);
  setTimeout(() => searchInput.focus(), 100);
}



// === File: src\js\components\RequestModals.js ===
/**
 * Enterprise In-House Legal Management System
 * Legal Request Lifecycle Modals (Create, Accept, Reject, Reschedule, Execute)
 */

function openCreateRequestModal() {
  const user = authService.getCurrentUser();
  const availableDepts = authService.isLegalTeam()
    ? db.data.departments
    : db.data.departments.filter(d => d.id === user.departmentId || !user.departmentId);

  const defaultDeptId = user.departmentId || db.data.departments[0].id;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 5);
  const defaultDueDate = tomorrow.toISOString().split('T')[0];

  const html = `
    <form id="create-request-form">
      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Request Type <span class="required">*</span></label>
          <select id="req-type" class="form-select" required>
            ${DEFAULT_REQUEST_TYPES.map(t => `<option value="${t}">${t}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Department <span class="required">*</span></label>
          <select id="req-department" class="form-select" required>
            ${availableDepts.map(d => `<option value="${d.id}" ${d.id === defaultDeptId ? 'selected' : ''}>${d.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Request Title <span class="required">*</span></label>
        <input type="text" id="req-title" class="form-input" placeholder="e.g. Master Services Agreement Legal Review - Vendor X" required />
      </div>

      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Priority <span class="required">*</span></label>
          <select id="req-priority" class="form-select" required>
            <option value="LOW">Low</option>
            <option value="MEDIUM" selected>Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Required By Date <span class="required">*</span></label>
          <input type="date" id="req-due-date" class="form-input" value="${defaultDueDate}" required />
          <div class="form-hint">Original requested target date for Legal Team review</div>
        </div>
      </div>

      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Counterparty / Vendor Name</label>
          <input type="text" id="req-counterparty" class="form-input" placeholder="e.g. Acme Corp, TalentBridge Inc." />
        </div>
        <div class="form-group">
          <label class="form-label">Contract Value ($ USD)</label>
          <input type="number" id="req-value" class="form-input" placeholder="0" min="0" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Description & Background Context <span class="required">*</span></label>
        <textarea id="req-desc" class="form-textarea" placeholder="Detail commercial objectives, non-standard clauses, timeline constraints, or specific areas requiring legal attention..." required></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Initial Document Attachment</label>
        <div style="
          border: 2px dashed #CBD5E1;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          background: #F8FAFC;
          cursor: pointer;
        " onclick="document.getElementById('req-file-input').click()">
          <span style="font-size: 24px;">📄</span>
          <div style="font-size: 13px; font-weight: 600; color: #1E293B; margin-top: 4px;">Click to select document or draft file</div>
          <div style="font-size: 11px; color: #64748B;">Supported formats: PDF, DOCX, DOC, XLSX, TXT (Up to 25MB)</div>
          <input type="file" id="req-file-input" style="display: none;" onchange="
            const nameSpan = document.getElementById('selected-file-name');
            if (this.files[0]) {
              nameSpan.innerText = 'Selected: ' + this.files[0].name + ' (' + Math.round(this.files[0].size / 1024) + ' KB)';
              nameSpan.style.display = 'block';
            }
          " />
          <div id="selected-file-name" style="display: none; font-size: 12px; color: #2563EB; font-weight: 600; margin-top: 8px;"></div>
        </div>
      </div>
    </form>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
    <button class="btn btn-primary" id="submit-create-req-btn">Submit Legal Request</button>
  `;

  const modal = Modal.open({
    title: '➕ Submit New Legal Request',
    contentHtml: html,
    footerHtml: footer,
    size: 'lg'
  });

  window.activeModalClose = modal.close;

  document.getElementById('submit-create-req-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.getElementById('create-request-form');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const title = document.getElementById('req-title').value;
    const requestType = document.getElementById('req-type').value;
    const departmentId = document.getElementById('req-department').value;
    const priority = document.getElementById('req-priority').value;
    const requiredByDate = document.getElementById('req-due-date').value;
    const counterparty = document.getElementById('req-counterparty').value;
    const contractValue = document.getElementById('req-value').value;
    const description = document.getElementById('req-desc').value;
    const fileInput = document.getElementById('req-file-input');

    let initialDoc = null;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      initialDoc = {
        name: file.name,
        fileName: file.name,
        fileType: file.type || 'application/pdf',
        fileSize: file.size
      };
    }

    try {
      const created = requestService.createRequest({
        title,
        requestType,
        departmentId,
        priority,
        requiredByDate,
        description,
        counterparty,
        contractValue,
        initialDocument: initialDoc
      });

      modal.close();
      Toast.success(`Request ${created.requestId} submitted successfully!`);
      window.location.hash = `#/requests/${created.id}`;
    } catch (err) {
      Toast.error(err.message);
    }
  });
}

function openAcceptModal(requestId) {
  const req = requestService.getRequestById(requestId);
  if (!req) return;

  const legalUsers = db.data.users.filter(
    u => u.role === 'SUPER_ADMIN' || u.role === 'LEGAL_ADMIN' || u.role === 'LEGAL_MEMBER'
  );

  const html = `
    <div>
      <div style="font-size: 13.5px; color: #475569; margin-bottom: 16px;">
        Accept request <strong>${req.requestId}</strong> ("${req.title}") into the active Legal review pipeline.
      </div>
      <div class="form-group">
        <label class="form-label">Assign Legal Counsel <span class="required">*</span></label>
        <select id="accept-counsel" class="form-select">
          ${legalUsers.map(u => `<option value="${u.id}" ${u.id === authService.getCurrentUser().id ? 'selected' : ''}>${u.name} (${u.title})</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Expected Completion Date <span class="required">*</span></label>
        <input type="date" id="accept-due-date" class="form-input" value="${req.currentDueDate}" required />
      </div>
      <div class="form-group">
        <label class="form-label">Initial Legal Remark / Acceptance Note</label>
        <textarea id="accept-comment" class="form-textarea" placeholder="Provide initial instructions, turnaround estimate, or scope confirmation..."></textarea>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
    <button class="btn btn-primary" id="confirm-accept-btn">Confirm Acceptance</button>
  `;

  const modal = Modal.open({
    title: '✓ Accept Legal Request',
    contentHtml: html,
    footerHtml: footer,
    size: 'md'
  });

  window.activeModalClose = modal.close;

  document.getElementById('confirm-accept-btn').addEventListener('click', () => {
    const assignedId = document.getElementById('accept-counsel').value;
    const dueDate = document.getElementById('accept-due-date').value;
    const comment = document.getElementById('accept-comment').value;

    try {
      requestService.acceptRequest(requestId, {
        expectedDueDate: dueDate,
        assignedLegalId: assignedId,
        comment
      });
      modal.close();
      Toast.success(`Request ${req.requestId} accepted!`);
      window.dispatchEvent(new CustomEvent('request:reloaded'));
    } catch (err) {
      Toast.error(err.message);
    }
  });
}

function openRejectModal(requestId) {
  const req = requestService.getRequestById(requestId);
  if (!req) return;

  const html = `
    <div>
      <div style="font-size: 13.5px; color: #DC2626; margin-bottom: 14px; font-weight: 500;">
        ⚠️ Rejecting this request will halt the review process and notify the business requestor (${req.requestorName}).
      </div>
      <div class="form-group">
        <label class="form-label">Mandatory Rejection Reason <span class="required">*</span></label>
        <textarea id="reject-reason" class="form-textarea" placeholder="Explain why this request is being rejected (e.g. Insufficient documentation, wrong department, outside corporate policy scope)..." required></textarea>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
    <button class="btn btn-danger" id="confirm-reject-btn">Reject Request</button>
  `;

  const modal = Modal.open({
    title: '✕ Reject Legal Request',
    contentHtml: html,
    footerHtml: footer,
    size: 'md'
  });

  window.activeModalClose = modal.close;

  document.getElementById('confirm-reject-btn').addEventListener('click', () => {
    const reason = document.getElementById('reject-reason').value;
    if (!reason || !reason.trim()) {
      Toast.error('Please provide a mandatory rejection reason.');
      return;
    }

    try {
      requestService.rejectRequest(requestId, { rejectionReason: reason });
      modal.close();
      Toast.info(`Request ${req.requestId} rejected.`);
      window.dispatchEvent(new CustomEvent('request:reloaded'));
    } catch (err) {
      Toast.error(err.message);
    }
  });
}

function openRescheduleModal(requestId) {
  const req = requestService.getRequestById(requestId);
  if (!req) return;

  const html = `
    <div>
      <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 12.5px; color: #1E40AF;">
        <strong>Original Requested Date:</strong> ${req.originalRequestedDate}<br/>
        <strong>Current Target Date:</strong> ${req.currentDueDate}
        <div style="font-size: 11px; margin-top: 4px; color: #60A5FA;">Note: The system preserves original requested timelines and all reschedule history logs.</div>
      </div>

      <div class="form-group">
        <label class="form-label">New Expected Completion Date <span class="required">*</span></label>
        <input type="date" id="resched-due-date" class="form-input" value="${req.currentDueDate}" required />
      </div>

      <div class="form-group">
        <label class="form-label">Mandatory Reschedule Reason <span class="required">*</span></label>
        <textarea id="resched-reason" class="form-textarea" placeholder="e.g. Additional regulatory review required for cross-border data transfer addenda..." required></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Additional Instructions / Remarks</label>
        <input type="text" id="resched-comment" class="form-input" placeholder="Optional notes for the business team..." />
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
    <button class="btn btn-primary" id="confirm-resched-btn">Confirm Reschedule</button>
  `;

  const modal = Modal.open({
    title: '⏱️ Reschedule Request Timeline',
    contentHtml: html,
    footerHtml: footer,
    size: 'md'
  });

  window.activeModalClose = modal.close;

  document.getElementById('confirm-resched-btn').addEventListener('click', () => {
    const newDate = document.getElementById('resched-due-date').value;
    const reason = document.getElementById('resched-reason').value;
    const comment = document.getElementById('resched-comment').value;

    if (!newDate || !reason.trim()) {
      Toast.error('Please enter both a new date and a mandatory reason.');
      return;
    }

    try {
      requestService.rescheduleRequest(requestId, {
        newDueDate: newDate,
        reason,
        comment
      });
      modal.close();
      Toast.info(`Timeline rescheduled to ${newDate}.`);
      window.dispatchEvent(new CustomEvent('request:reloaded'));
    } catch (err) {
      Toast.error(err.message);
    }
  });
}

function openExecuteContractModal(requestId) {
  const req = requestService.getRequestById(requestId);
  if (!req) return;

  const today = new Date().toISOString().split('T')[0];
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const defaultExpiry = nextYear.toISOString().split('T')[0];

  const html = `
    <div>
      <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 12.5px; color: #065F46;">
        ✍️ <strong>Final Executed Contract Upload</strong><br/>
        Uploading the executed agreement will create an Active Contract record in the centralized legal repository and initiate automated expiry alert tracking.
      </div>

      <div class="form-group">
        <label class="form-label">Contract / Agreement Title <span class="required">*</span></label>
        <input type="text" id="exec-name" class="form-input" value="${req.title}" required />
      </div>

      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Counterparty <span class="required">*</span></label>
          <input type="text" id="exec-counterparty" class="form-input" value="${req.counterparty || ''}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Contract Value ($ USD) <span class="required">*</span></label>
          <input type="number" id="exec-value" class="form-input" value="${req.contractValue || 0}" required />
        </div>
      </div>

      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Effective Date <span class="required">*</span></label>
          <input type="date" id="exec-eff-date" class="form-input" value="${today}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Expiry Date <span class="required">*</span></label>
          <input type="date" id="exec-exp-date" class="form-input" value="${defaultExpiry}" required />
        </div>
      </div>

      <div class="modal-form-grid">
        <div class="form-group">
          <label class="form-label">Payment Terms</label>
          <input type="text" id="exec-payment" class="form-input" value="Net 30 Days" />
        </div>
        <div class="form-group">
          <label class="form-label">Notice Period (Days)</label>
          <input type="number" id="exec-notice" class="form-input" value="30" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Termination Clause Summary</label>
        <textarea id="exec-termination" class="form-textarea" placeholder="e.g. 30 days prior written notice for convenience; immediate termination upon material breach..."></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Executed / Signed Document File <span class="required">*</span></label>
        <input type="file" id="exec-file-input" class="form-input" required />
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="window.activeModalClose()">Cancel</button>
    <button class="btn btn-primary" id="confirm-execute-btn">Execute & Store Contract</button>
  `;

  const modal = Modal.open({
    title: '📜 Mark Executed & Register Contract',
    contentHtml: html,
    footerHtml: footer,
    size: 'lg'
  });

  window.activeModalClose = modal.close;

  document.getElementById('confirm-execute-btn').addEventListener('click', () => {
    const name = document.getElementById('exec-name').value;
    const counterparty = document.getElementById('exec-counterparty').value;
    const contractValue = document.getElementById('exec-value').value;
    const effectiveDate = document.getElementById('exec-eff-date').value;
    const expiryDate = document.getElementById('exec-exp-date').value;
    const paymentTerms = document.getElementById('exec-payment').value;
    const noticePeriodDays = document.getElementById('exec-notice').value;
    const terminationClause = document.getElementById('exec-termination').value;
    const fileInput = document.getElementById('exec-file-input');

    if (!name || !counterparty || !effectiveDate || !expiryDate) {
      Toast.error('Please fill in all mandatory fields.');
      return;
    }

    try {
      // 1. Create document record
      const doc = documentService.uploadDocument({
        title: `${name} (Executed Final)`,
        documentType: req.requestType,
        category: 'Contracts',
        departmentId: req.departmentId,
        linkedRequestId: req.id,
        confidentialityLevel: 'CONFIDENTIAL',
        counterparty,
        effectiveDate,
        expiryDate,
        fileName: fileInput.files[0] ? fileInput.files[0].name : 'Executed_Agreement_Final.pdf',
        changeDescription: 'Final countersigned executed contract file.'
      });

      doc.isExecuted = true;
      doc.status = 'EXECUTED';

      // 2. Create CLM Contract record
      const contract = contractService.createContract({
        name,
        contractType: req.requestType,
        departmentId: req.departmentId,
        counterparty,
        effectiveDate,
        expiryDate,
        contractValue,
        paymentTerms,
        noticePeriodDays,
        terminationClause,
        linkedRequestId: req.id,
        executedDocumentId: doc.id
      });

      modal.close();
      Toast.success(`Contract ${contract.contractId} created and marked EXECUTED!`);
      window.location.hash = `#/contracts`;
    } catch (err) {
      Toast.error(err.message);
    }
  });
}



// === File: src\js\components\LoginPage.js ===
/**
 * Impacteers LMS — Legal Management System
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



// === File: src\js\components\FloatingLegalAssistant.js ===
/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Floating AI Legal Assistant Widget (Impacteers Legal AI Engine)
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
        title="Open Impacteers AI Legal Assistant"
        onclick="window.toggleFloatingAssistant()"
      >
        <span class="fab-icon">💬</span>
        <span class="fab-badge" id="fab-ai-badge">AI</span>
      </button>

      <!-- Floating Chat Card -->
      <div id="floating-assistant-window" class="floating-assistant-card ${isAssistantOpen ? 'open' : ''}">
        
        <!-- Header -->
        <div class="floating-assistant-header">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0;">
            <div style="width: 28px; height: 28px; border-radius: 8px; background: #EFF6FF; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0;">
              🤖
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px;">
                <div style="font-size: 13.5px; font-weight: 700; color: #0F172A; white-space: nowrap;">Legal AI Assistant</div>
                <div style="font-size: 10.5px; padding: 1.5px 7px; border-radius: 12px; background: #ECFDF5; color: #047857; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
                  <span>AI Active</span>
                </div>
              </div>
              <div style="font-size: 11px; color: #64748B; margin-top: 1px;">Impacteers In-House Intelligence</div>
            </div>
          </div>
          <button 
            class="floating-close-btn" 
            onclick="window.toggleFloatingAssistant(false)"
            title="Minimize Assistant"
            style="margin-left: 6px;"
          >✕</button>
        </div>

        <!-- Document RAG Context Selector Bar -->
        <div style="padding: 6px 12px; background: #F8FAFC; border-bottom: 1px solid #F1F5F9; display: flex; align-items: center; gap: 6px; font-size: 11.5px;">
          <span style="color: #64748B; font-weight: 600; flex-shrink: 0;">Context:</span>
          <select id="floating-doc-context-select" style="flex: 1; min-width: 0; font-size: 11.5px; padding: 3px 6px; border-radius: 6px; border: 1px solid #E2E8F0; background: #FFFFFF; color: #1E293B;">
            <option value="">All Vault Documents & Contracts (Global RAG)</option>
            ${docs.map(d => `<option value="${d.id}">📄 ${d.title} (${d.departmentName})</option>`).join('')}
          </select>
        </div>

        <!-- Chat Message Area -->
        <div class="floating-assistant-body" id="floating-chat-messages">
          
          <!-- Welcome Message -->
          <div class="chat-msg ai-msg">
            <div class="chat-msg-header">
              <span>🤖 Legal Assistant</span>
              <span>Just now</span>
            </div>
            <div class="chat-msg-content">
              Hello <strong>${user.name}</strong>! I am your in-house AI Legal Counsel. I can audit contracts, check liability caps, verify AOA notice periods, and draft legal summaries.
            </div>
          </div>

          <!-- Suggested Prompt Chips -->
          <div style="margin: 8px 0 12px 0;">
            <div style="font-size: 11px; font-weight: 600; color: #64748B; margin-bottom: 6px;">Suggested Prompts:</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('What are the standard notice periods for Board Meetings and General Meetings under AOA?')">
                📜 AOA Board & General Meeting notice periods
              </button>
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('Summarize standard aggregate liability cap policy for Staffing contracts.')">
                ⚖️ Liability cap policy for Staffing contracts
              </button>
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('What non-disclosure and confidentiality obligations are standard across our NDAs?')">
                🔒 Confidentiality & NDA requirements
              </button>
              <button class="suggested-chip" onclick="window.sendFloatingPrompt('Show me all contracts expiring in the next 60 days.')">
                ⏰ Contracts expiring in next 60 days
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
                placeholder="Ask legal question (e.g. AOA notice period)..." 
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
                ➤
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
    .replace(/^#### (.*$)/gim, '<div style="font-size: 13px; font-weight: 700; color: #1E293B; margin: 6px 0 2px 0;">$1</div>')
    .replace(/^### (.*$)/gim, '<div style="font-size: 13.5px; font-weight: 800; color: #0F172A; margin: 8px 0 4px 0;">$1</div>')
    .replace(/^## (.*$)/gim, '<div style="font-size: 14px; font-weight: 800; color: #0F172A; margin: 10px 0 6px 0;">$1</div>')
    .replace(/^# (.*$)/gim, '<div style="font-size: 15px; font-weight: 800; color: #0F172A; margin: 12px 0 6px 0;">$1</div>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background: #F1F5F9; padding: 1px 5px; border-radius: 4px; font-family: monospace; font-size: 11.5px; color: #1E293B;">$1</code>')
    .replace(/^\s*-\s+(.*$)/gim, '<li style="margin-left: 16px; margin-bottom: 3px;">$1</li>')
    .replace(/^\s*\*\s+(.*$)/gim, '<li style="margin-left: 16px; margin-bottom: 3px;">$1</li>')
    .replace(/&gt; (.*$)/gim, '<blockquote style="border-left: 3px solid #3B82F6; background: #EFF6FF; padding: 6px 10px; border-radius: 4px; margin: 6px 0; font-size: 12px; color: #1E40AF;">$1</blockquote>')
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
  if (!input || !container) return;

  const query = input.value.trim();
  if (!query) return;

  const selectedDocId = docSelect ? docSelect.value : null;

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
      <span>Analyzing legal knowledge base</span>
      <span class="typing-dots">...</span>
    </div>
  `;
  container.appendChild(typingEl);
  container.scrollTop = container.scrollHeight;

  try {
    const result = await legalAssistantService.askQuestion({ 
      question: query,
      documentId: selectedDocId,
      conversationHistory: assistantMessages
    });

    typingEl.remove();

    assistantMessages.push({ role: 'user', content: query });
    assistantMessages.push({ role: 'assistant', content: result.text });

    const aiMsgEl = document.createElement('div');
    aiMsgEl.className = 'chat-msg ai-msg';
    
    const formattedHtml = formatAiMarkdown(result.text);

    aiMsgEl.innerHTML = `
      <div class="chat-msg-header">
        <span style="display: flex; align-items: center; gap: 4px;">
          <span>🤖 Legal Assistant</span>
          <span style="font-size: 9.5px; background: #ECFDF5; color: #047857; padding: 1px 5px; border-radius: 4px; font-weight: 700;">
            ${result.model || 'AI'}
          </span>
        </span>
        <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div class="chat-msg-content" style="line-height: 1.5; font-size: 12.8px;">${formattedHtml}</div>
      ${result.citations && result.citations.length > 0 ? `
        <div style="font-size: 11px; color: #64748B; margin-top: 8px; border-top: 1px dashed #CBD5E1; padding-top: 6px;">
          <strong>Sources Grounded:</strong> ${result.citations.join(', ')}
        </div>
      ` : ''}
    `;
    container.appendChild(aiMsgEl);
  } catch (err) {
    typingEl.remove();
    const errorEl = document.createElement('div');
    errorEl.className = 'chat-msg ai-msg';
    errorEl.innerHTML = `
      <div class="chat-msg-header" style="color: #BE123C;">Error</div>
      <div class="chat-msg-content" style="color: #BE123C;">${err.message}</div>
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
          Hello, ${user.name} 👋
        </h1>
        <p style="font-size: 14px; color: #64748B; margin-top: 2px;">
          ${deptName} Team Portal • Impacteers In-House Document Management System
        </p>
      </div>

      <!-- 3 Primary Large Action Cards -->
      <div class="dashboard-action-cards">
        
        <!-- 1. My Requests Card -->
        <div class="kpi-card" onclick="window.location.hash='#/my-requests'" style="border-top: 4px solid #2563EB;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #EFF6FF; color: #1D4ED8; display: flex; align-items: center; justify-content: center; font-size: 22px;">
              📋
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
            View Requests →
          </div>
        </div>

        <!-- 2. Department Documents Card -->
        <div class="kpi-card" onclick="window.location.hash='#/department-docs'" style="border-top: 4px solid #059669;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #ECFDF5; color: #047857; display: flex; align-items: center; justify-content: center; font-size: 22px;">
              📁
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
            Open Repository →
          </div>
        </div>

        <!-- 3. Create Request Card -->
        <div class="kpi-card" onclick="window.location.hash='#/create-request'" style="border-top: 4px solid #7C3AED; background: linear-gradient(180deg, #FFFFFF, #FAF5FF);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #FAF5FF; color: #7C3AED; display: flex; align-items: center; justify-content: center; font-size: 22px;">
              ➕
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
            Submit New Request →
          </div>
        </div>

      </div>

      <!-- Recent Requests Table -->
      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>📋</span>
            <span>Recent ${deptName} Requests</span>
          </div>
          <a href="#/my-requests" style="font-size: 12.5px; color: #2563EB; font-weight: 600; text-decoration: none;">
            View All →
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
                              Open Ticket →
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
            Good Morning, Monisha ⚖️
          </h1>
          <p style="font-size: 13.5px; color: #64748B; margin-top: 2px;">
            Legal Manager • Enterprise Legal Request & Document Triage
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <a href="#/requests" class="btn btn-secondary btn-sm">
            View All Requests Queue →
          </a>
        </div>
      </div>

      <!-- 5 Key Action Cards -->
      <div class="kpi-grid">
        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #2563EB;">
          <div class="kpi-card-header">
            <span class="kpi-title">New Requests</span>
            <div class="kpi-icon-wrapper" style="background: #EFF6FF; color: #1D4ED8;">📥</div>
          </div>
          <div class="kpi-value" style="color: ${newRequests.length > 0 ? '#1D4ED8' : '#0F172A'};">${newRequests.length}</div>
          <div class="kpi-subtext">Waiting for acceptance</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #7C3AED;">
          <div class="kpi-card-header">
            <span class="kpi-title">In Progress</span>
            <div class="kpi-icon-wrapper" style="background: #FAF5FF; color: #7C3AED;">⚙️</div>
          </div>
          <div class="kpi-value">${inProgress.length}</div>
          <div class="kpi-subtext">Under active review</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #F59E0B;">
          <div class="kpi-card-header">
            <span class="kpi-title">Due Today</span>
            <div class="kpi-icon-wrapper" style="background: #FFFBEB; color: #B45309;">⏳</div>
          </div>
          <div class="kpi-value" style="color: ${dueToday.length > 0 ? '#B45309' : '#0F172A'};">${dueToday.length}</div>
          <div class="kpi-subtext">Target turnaround today</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #DC2626;">
          <div class="kpi-card-header">
            <span class="kpi-title">Overdue</span>
            <div class="kpi-icon-wrapper" style="background: #FFF1F2; color: #BE123C;">🚨</div>
          </div>
          <div class="kpi-value" style="color: ${overdue.length > 0 ? '#BE123C' : '#0F172A'};">${overdue.length}</div>
          <div class="kpi-subtext">Past due date</div>
        </div>

        <div class="kpi-card" onclick="window.location.hash='#/requests'" style="border-left: 4px solid #10B981;">
          <div class="kpi-card-header">
            <span class="kpi-title">Completed</span>
            <div class="kpi-icon-wrapper" style="background: #ECFDF5; color: #047857;">✓</div>
          </div>
          <div class="kpi-value">${completed.length}</div>
          <div class="kpi-subtext">Stored in department vaults</div>
        </div>
      </div>

      <!-- Actionable Requests Queue -->
      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>📥</span>
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
                              Review Ticket →
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
            Executive Overview 🏛️
          </h1>
          <p style="font-size: 13.5px; color: #64748B; margin-top: 2px;">
            Chairman • Global View-Only Transparency Across All 11 Departments
          </p>
        </div>
        <div>
          <span class="badge badge-slate" style="font-size: 12px; padding: 4px 10px;">
            👁️ Executive View-Only Mode
          </span>
        </div>
      </div>

      <!-- Top KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Total Requests</span>
            <div class="kpi-icon-wrapper" style="background: #F1F5F9; color: #334155;">📊</div>
          </div>
          <div class="kpi-value">${allRequests.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Pending</span>
            <div class="kpi-icon-wrapper" style="background: #EFF6FF; color: #1D4ED8;">⏳</div>
          </div>
          <div class="kpi-value" style="color: #1D4ED8;">${pending.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Due Today</span>
            <div class="kpi-icon-wrapper" style="background: #FFFBEB; color: #B45309;">⏰</div>
          </div>
          <div class="kpi-value" style="color: #B45309;">${dueToday.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Overdue</span>
            <div class="kpi-icon-wrapper" style="background: #FFF1F2; color: #BE123C;">🚨</div>
          </div>
          <div class="kpi-value" style="color: #BE123C;">${overdue.length}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Completed</span>
            <div class="kpi-icon-wrapper" style="background: #ECFDF5; color: #047857;">✓</div>
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
              <span>📋</span>
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
                                View →
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
              <span>🏢</span>
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

              <label style="border: 2px solid #2563EB; background: #EFF6FF; border-radius: 8px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 8px; cursor: pointer;">
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



// === File: src\js\pages\DepartmentDocumentsPage.js ===
/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
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
            📁 ${dept.name} Documents
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
            <span>📑 ${dept.name} Records: <strong id="dept-doc-count" style="color: #2563EB;">${docs.length}</strong></span>
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
      <div style="font-size: 26px; margin-bottom: 4px;">📂</div>
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
            <span>${doc.isFinal ? '📜' : '📄'}</span>
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
              📥 Download
            </button>
            ${
              isLegal
                ? `
              <button class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 11px; font-weight: 600; color: #DC2626; border-color: #FECDD3;" onclick="window.deleteVaultDocument('${doc.id}', '${doc.title.replace(/'/g, "\\'")}')" title="Delete document">
                🗑️ Delete
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
    ? '⚖️ Legal Requests Queue'
    : `📋 My ${deptName} Requests`;

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
          <div style="font-size: 28px; margin-bottom: 6px;">📂</div>
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
            ${r.requestType} • ${r.attachedDocument ? `📄 ${r.attachedDocument.name}` : 'No initial doc'}
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
            Open Ticket →
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
  const priorityObj = REQUEST_PRIORITIES[req.priority] || { label: req.priority || 'Standard Priority', badgeClass: 'badge-blue', icon: '⚡' };

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
            ? `<span class="badge badge-slate">👁️ Executive View-Only Mode</span>`
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
                ${priorityObj.icon || '⚡'} ${priorityObj.label}
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
                <span>📝</span>
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
                <span>📁</span>
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
                      📄 Original Document
                    </div>
                    <div style="font-size: 11.5px; color: #64748B; margin-top: 2px;">
                      ${req.attachedDocument ? `${req.attachedDocument.name} (${req.attachedDocument.size})` : 'No document uploaded at intake.'}
                    </div>
                  </div>
                  ${
                    req.attachedDocument
                      ? `<button class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 3px 8px;" onclick="window.downloadDocumentFile('${req.attachedDocument.name}', '${req.title}')">📥 Download</button>`
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
                        📝 Legal Reviewed / Revised Version
                      </div>
                      <div style="font-size: 11.5px; color: #3B82F6; margin-top: 2px;">
                        ${req.reviewedDocument.name} (${req.reviewedDocument.size}) • Uploaded by ${req.reviewedDocument.uploadedBy}
                      </div>
                    </div>
                    <button class="btn btn-primary btn-sm" style="font-size: 11px; padding: 3px 8px;" onclick="window.downloadDocumentFile('${req.reviewedDocument.name}', '${req.title} - Reviewed Draft')">📥 Download Reviewed</button>
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
                        📜 FINAL EXECUTED AGREEMENT
                      </div>
                      <div style="font-size: 11.5px; color: #047857; margin-top: 2px;">
                        ${req.finalDocument.name} (${req.finalDocument.size}) • Uploaded by ${req.finalDocument.uploadedBy}
                      </div>
                    </div>
                    <button class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 3px 8px;" onclick="window.downloadDocumentFile('${req.finalDocument.name}', '${req.title} - Final Executed')">📥 Download Final</button>
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
                    ✍️ Upload Final Signed Document
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
                <span>⚖️</span>
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
                <span>💬</span>
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
                            <span>🔒 INTERNAL LEGAL NOTE • ${c.authorName} (${c.authorRole})</span>
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
                        <span>🔒 Internal Legal Note (Legal Only)</span>
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
                <span>📋</span>
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
    return `<span class="badge badge-green" style="font-size: 13px; padding: 6px 12px;">✓ Request Completed</span>`;
  }
  if (req.status === 'REJECTED') {
    return `<span class="badge badge-rose" style="font-size: 13px; padding: 6px 12px;">✕ Request Rejected</span>`;
  }

  let buttons = '';

  if (isLegal) {
    if (req.status === 'PENDING_ACCEPTANCE') {
      buttons += `
        <button class="btn btn-primary btn-sm" onclick="window.legalAcceptRequest('${req.id}')">✓ Accept</button>
        <button class="btn btn-danger btn-sm" onclick="window.legalRejectRequest('${req.id}')">✕ Reject</button>
        <button class="btn btn-secondary btn-sm" onclick="window.legalRescheduleRequest('${req.id}')">⏱️ Reschedule</button>
      `;
    } else if (req.status === 'UNDER_LEGAL_REVIEW' || req.status === 'ACCEPTED') {
      buttons += `
        <button class="btn btn-primary btn-sm" onclick="window.legalSubmitToBusiness('${req.id}')">🚀 Submit Review to Business</button>
        <button class="btn btn-secondary btn-sm" onclick="window.legalRescheduleRequest('${req.id}')">⏱️ Reschedule</button>
      `;
    } else if (req.status === 'BUSINESS_ACTION_REQUIRED' || req.status === 'FINAL_DOCUMENT_REQUIRED') {
      buttons += `
        <button class="btn btn-primary btn-sm" onclick="window.legalMarkCompleted('${req.id}')">✓ Mark Completed & Store in Vault</button>
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
                ⚠️ Business Declined Reschedule & Requested ${proposal.counterDate || proposal.originalDate}
              </strong>
              <div style="font-size: 13px; color: #C2410C; margin-top: 6px; line-height: 1.5;">
                Requested Completion Date: <strong style="font-size: 14px;">${proposal.counterDate || proposal.originalDate}</strong><br/>
                Stakeholder Justification: <em>"${proposal.counterReason || 'Priority request, needed ASAP'}"</em>
              </div>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" onclick="window.legalAcceptBusinessCounterDate('${req.id}')">
                ✓ Accept Requested Date (${proposal.counterDate || proposal.originalDate})
              </button>
              <button class="btn btn-secondary btn-sm" onclick="window.legalRescheduleRequest('${req.id}')">
                ⏱️ Propose Revised Date
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
            📨 Counter-Proposal Sent to Monisha (Legal Manager)
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
            ⏱️ Legal Has Proposed a New Completion Date
          </strong>
          <div style="font-size: 13px; color: #78350F; margin-top: 6px;">
            Original Date: <strong>${proposal.originalDate}</strong> → Proposed Date: <strong>${proposal.proposedDate}</strong><br/>
            Reason: <em>"${proposal.reason}"</em>
          </div>
        </div>

        ${
          !isLegal && !isChairman
            ? `
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm" onclick="window.businessAcceptReschedule('${req.id}')">
              ✓ Accept Proposed Date (${proposal.proposedDate})
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.businessRejectReschedule('${req.id}')">
              ✕ Decline / Propose Alternative
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
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
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
            📁 Documents Vault & Repository
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
              🗑️ Clear All Old Documents
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
          <div style="font-size: 28px; margin-bottom: 6px;">📂</div>
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
        scopeBadge = `<span class="badge badge-blue" style="font-size: 11px;">🌐 All Departments</span>`;
      } else if (doc.departmentId === 'LEGAL_ONLY' || doc.isPrivilegedOnly) {
        scopeBadge = `<span class="badge badge-rose" style="font-size: 11px;">🔒 Legal & Chairman</span>`;
      }

      return `
      <tr style="border-bottom: 1px solid #F1F5F9; transition: background 0.1s ease;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
        <td style="padding: 12px 16px; vertical-align: middle;">
          <div style="font-weight: 600; font-size: 13.5px; color: #0F172A; display: flex; align-items: center; gap: 6px;">
            <span>📜</span>
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
              📥 Download
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
                🗑️ Delete
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
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
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
            🗄️ Document & Contracts Database
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
            🔒 Legal Vault
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
      <div style="font-size: 26px; margin-bottom: 4px;">📂</div>
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
          <span>📜</span>
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
            📥 Download
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
              🗑️ Delete
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
 * Impacteers LMS — Legal Management System
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
              🗓️
            </div>
            <div>
              <h1 style="font-size: 20px; font-weight: 800; color: #0F172A; margin: 0; letter-spacing: -0.02em;">
                ${currentMonthName} ${year}
              </h1>
              <div style="font-size: 12px; color: #64748B; margin-top: 1px; font-weight: 500;">
                ${daysInMonth} Days • ${dueRequests.length} Scheduled Contract Deadlines
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
              ‹ Prev
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
              Next ›
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
            <span style="color: #64748B; font-weight: 500;">💡 Click any agreement tag to jump straight into the task review.</span>
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
              📄 ${ev.title}
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
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Full Page Legal AI Assistant (Impacteers Legal Intelligence & RAG Grounding Engine)
 */

function renderLegalAssistantPage() {
  const user = authService.getCurrentUser();
  const suggestedPrompts = legalAssistantService.getSuggestedPrompts();
  const authorizedDocs = legalAssistantService.getAuthorizedContextDocuments();
  const disclaimer = legalAssistantService.getSafetyDisclaimer();

  return `
    <div class="content-container" style="max-width: 1200px;">
      <!-- Header -->
      <div class="page-header" style="margin-bottom: 16px;">
        <div>
          <div class="page-title">
            <span>🤖</span>
            <span>Impacteers AI Legal Assistant</span>
          </div>
          <div class="page-subtitle">
            Enterprise legal intelligence across Articles of Association (AOA), active contracts, NDAs, and corporate policies.
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <div style="font-size: 12px; padding: 4px 12px; border-radius: 20px; background: #ECFDF5; color: #047857; font-weight: 700; display: flex; align-items: center; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
            <span>AI Knowledge Engine Active</span>
          </div>
        </div>
      </div>

      <!-- Regulatory Safety Disclaimer Banner -->
      <div style="
        background: #EFF6FF;
        border: 1px solid #BFDBFE;
        border-left: 4px solid #2563EB;
        border-radius: 8px;
        padding: 12px 16px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
      ">
        <span style="font-size: 20px;">🛡️</span>
        <div style="font-size: 12.5px; color: #1E40AF; line-height: 1.4;">
          <strong>Enterprise Legal Intelligence:</strong> ${disclaimer}
        </div>
      </div>

      <!-- Main Chat Area -->
      <div style="
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 270px);
        min-height: 540px;
        box-shadow: var(--shadow-sm);
        overflow: hidden;
      ">
        
        <!-- Context Document Selector Bar -->
        <div style="
          padding: 12px 20px;
          background: #F8FAFC;
          border-bottom: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        ">
          <!-- Document Context Selector -->
          <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 260px;">
            <span style="font-size: 13px; font-weight: 600; color: #334155; white-space: nowrap;">📄 Grounding Context:</span>
            <select id="ai-document-context-select" class="form-select" style="font-size: 12.5px; padding: 6px 10px; max-width: 420px;">
              <option value="">All Authorized Vault Documents (${authorizedDocs.length} indexed)</option>
              ${authorizedDocs
                .map(
                  d => `
                <option value="${d.id}">
                  ${d.title} (${d.departmentName} • v${d.currentVersion || 1})
                </option>
              `
                )
                .join('')}
            </select>
          </div>

          <!-- Controls -->
          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="btn btn-secondary btn-sm" id="ai-clear-chat-btn" style="font-size: 12px; padding: 4px 10px;">
              🗑️ Clear Chat
            </button>
          </div>
        </div>

        <!-- Chat Messages Container -->
        <div id="ai-messages-container" style="
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #FFFFFF;
        ">
          <!-- Initial Welcome Message -->
          <div style="display: flex; gap: 14px; max-width: 85%;">
            <div style="
              width: 36px;
              height: 36px;
              border-radius: 8px;
              background: linear-gradient(135deg, #2563EB, #1D4ED8);
              color: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              flex-shrink: 0;
            ">🤖</div>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px;">
              <div style="font-weight: 600; font-size: 13px; color: #0F172A; margin-bottom: 6px;">Impacteers AI Legal Counsel</div>
              <div style="font-size: 13.5px; color: #334155; line-height: 1.6;">
                Hello <strong>${user.name}</strong>. I am your in-house corporate legal assistant with full visibility into your authorized department agreements, Articles of Association (AOA), and corporate policies.
                <br/><br/>
                You can ask me to:
                <ul style="margin: 6px 0 0 18px; font-size: 13px; color: #475569;">
                  <li>Verify notice periods for Board Meetings and General Meetings under AOA</li>
                  <li>Audit liability caps and indemnification obligations</li>
                  <li>Verify termination rights, cure periods, and transition requirements</li>
                  <li>Check payment and invoice dispute terms</li>
                  <li>Flag upcoming contract renewals and expirations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Suggested Questions Carousel -->
        <div style="
          padding: 10px 20px;
          background: #F8FAFC;
          border-top: 1px solid #E2E8F0;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          white-space: nowrap;
        ">
          ${suggestedPrompts
            .map(
              p => `
            <button class="btn btn-secondary btn-sm" style="font-size: 11.5px; padding: 4px 12px; border-radius: 20px; background: #FFFFFF;" onclick="window.usePageSuggestedPrompt(this.innerText)">
              ${p}
            </button>
          `
            )
            .join('')}
        </div>

        <!-- Input Box -->
        <div style="padding: 16px 20px; background: #FFFFFF; border-top: 1px solid #E2E8F0; display: flex; gap: 12px;">
          <input type="text" id="ai-chat-input" class="form-input" placeholder="Ask a legal question (e.g. What are the notice periods under AOA?)..." style="font-size: 14px; padding: 11px 16px; border-radius: 8px;" autocomplete="off" />
          <button class="btn btn-primary" id="ai-send-btn" style="padding: 0 20px; font-weight: 600; white-space: nowrap;">
            <span>Send Question ➔</span>
          </button>
        </div>

      </div>
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
            <span>🔔</span>
            <span>Notification Center</span>
          </div>
          <div class="page-subtitle">
            System alerts, request status advancements, remark replies, and contract expiry notifications.
          </div>
        </div>
        <div>
          <button class="btn btn-secondary btn-sm" id="page-mark-all-read-btn">
            <span>✓ Mark All as Read</span>
          </button>
        </div>
      </div>

      <div class="enterprise-card">
        <div class="enterprise-card-header">
          <div class="enterprise-card-title">
            <span>📬</span>
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
                    <span style="font-size: 20px;">${n.category === 'CONTRACT' ? '📜' : n.category === 'REMARK' ? '💬' : '📋'}</span>
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
            <span>🛡️</span>
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
            <span>📜</span>
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
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Admin Settings & System Configuration Page
 */

function renderAdminSettingsPage() {
  if (!authService.isLegalAdmin()) {
    return `
      <div class="content-container">
        <div style="padding: 48px; text-align: center; background: #FFF1F2; border-radius: 12px; border: 1px solid #FECDD3;">
          <h2 style="color: #BE123C;">Access Denied</h2>
          <p style="color: #9F1239; margin-top: 6px;">Only System Administrators and Legal Administrators have access to this configuration console.</p>
        </div>
      </div>
    `;
  }

  const users = db.data.users;
  const requestTypes = db.data.requestTypes;
  const alertDays = db.data.expiryAlertDays || [90, 60, 30, 15, 7];

  return `
    <div class="content-container">
      <div class="page-header">
        <div>
          <div class="page-title">
            <span>⚙️</span>
            <span>Enterprise System Administration & Settings</span>
          </div>
          <div class="page-subtitle">
            Configure system users, departments, request types, CLM alert thresholds, and AI legal engine parameters.
          </div>
        </div>
        <div>
          <button class="btn btn-secondary btn-sm" id="reset-database-btn" style="color: #DC2626;">
            <span>🔄 Reset to Fresh Seed State</span>
          </button>
        </div>
      </div>

      <div class="grid-2-col">
        
        <!-- Impacteers AI Legal Knowledge Configuration Card -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>🤖</span>
              <span>Impacteers AI Legal Intelligence Engine</span>
            </div>
            <span class="badge badge-green">Engine Active</span>
          </div>
          <div style="padding: 20px;">
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" style="font-weight: 600; font-size: 13px;">Knowledge Base Scope</label>
              <div style="font-size: 13px; color: #334155; line-height: 1.5; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px;">
                ✅ <strong>Articles of Association (AOA)</strong>: General Meeting (21 clear days) & Board Meeting (7 days) notice rules.<br/>
                ✅ <strong>Contract Standards</strong>: Liability caps (1x-2x), standard Net 30 payment terms, and 30-day termination clauses.<br/>
                ✅ <strong>Department RAG Indexing</strong>: Active contracts and NDAs indexed across all 11 departments.
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" style="font-weight: 600; font-size: 13px;">Active AI Engine Version</label>
              <input type="text" class="form-input" value="${legalAssistantService.model}" readonly style="background: #F1F5F9; color: #475569; font-weight: 600;" />
            </div>

            <div style="display: flex; gap: 10px; margin-top: 16px;">
              <button class="btn btn-primary btn-sm" onclick="window.location.hash='#/assistant'">
                💬 Open Legal AI Assistant
              </button>
            </div>
          </div>
        </div>

        <!-- Expiry Alert Settings -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>⏰</span>
              <span>Contract Expiry Alert Thresholds</span>
            </div>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 13px; color: #475569; margin-bottom: 14px;">
              The system automatically sends in-app notifications and alerts before contract expiry:
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${alertDays.map(d => `<span class="badge badge-amber" style="font-size: 13px; padding: 6px 12px;">⏳ ${d} Days Before</span>`).join('')}
            </div>
            <div style="margin-top: 20px; font-size: 12px; color: #64748B;">
              Alerts are broadcast to Legal Administrators and the corresponding Business Department Head.
            </div>
          </div>
        </div>

        <!-- Request Types Config -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>📋</span>
              <span>Configured Request Types (${requestTypes.length})</span>
            </div>
            <button class="btn btn-secondary btn-sm" id="add-request-type-btn">
              + Add Type
            </button>
          </div>
          <div style="padding: 16px; max-height: 280px; overflow-y: auto;">
            ${requestTypes
              .map(
                t => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px;">
                <span style="font-weight: 600; color: #0F172A;">${t.name}</span>
                <span class="badge badge-blue">SLA: ${t.slaDays} Days</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Active Users & Roles -->
        <div class="enterprise-card">
          <div class="enterprise-card-header">
            <div class="enterprise-card-title">
              <span>👥</span>
              <span>Active System Users (${users.length})</span>
            </div>
          </div>
          <div style="padding: 16px; max-height: 280px; overflow-y: auto;">
            ${users
              .map(
                u => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px;">
                <div>
                  <strong style="color: #0F172A;">${u.name}</strong>
                  <span style="color: #64748B; font-size: 11.5px; margin-left: 4px;">(${u.departmentName || 'Global'})</span>
                </div>
                <span class="badge badge-slate">${u.roleLabel || u.role}</span>
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
        <div style="font-size: 12px; color: #2563EB; font-weight: 600; margin-top: 2px;">Version 2026.8 • Enterprise Edition</div>
        
        <p style="font-size: 14px; color: #475569; line-height: 1.6; max-width: 520px; margin: 20px auto 28px auto;">
          Internal platform for managing legal review requests, document vetting, contract lifecycle management (CLM), and secure company legal documents.
        </p>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px; text-align: left; font-size: 13px; color: #334155; line-height: 1.6;">
          <div>🏢 <strong>Organization:</strong> Impacteers</div>
          <div>⚖️ <strong>Legal Operations Lead:</strong> Monisha (Legal Manager)</div>
          <div>🛡️ <strong>Security:</strong> Role-Based Access Control & Department Isolation</div>
          <div>📁 <strong>Storage:</strong> Centralized Repository with Version Tracking</div>
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
        title: '🚪 Confirm Logout',
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
        title: '👤 User Profile',
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
        title: '⏱️ Propose Rescheduled Completion Date',
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
        title: '⏱️ Decline Reschedule & Request Timeline',
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

    // AI suggestions helper
    window.useSuggestedPrompt = text => {
      const input = document.getElementById('ai-chat-input');
      if (input) {
        input.value = text;
        const btn = document.getElementById('ai-send-btn');
        if (btn) btn.click();
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
        const text = prompt('Enter Legal Review Remark (e.g. Clause 5 — Payment terms should be revised):');
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
          title: '📝 Upload Reviewed / Revised Document',
          contentHtml: `
            <div>
              <!-- File Picker -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  1. Select Reviewed Document from Computer <span class="required">*</span>
                </label>
                <div style="border: 2px dashed #CBD5E1; border-radius: 8px; padding: 18px; text-align: center; background: #F8FAFC; cursor: pointer;" onclick="document.getElementById('modal-rev-file-input').click()">
                  <span style="font-size: 26px;">📄</span>
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
          title: '✍️ Upload Final Executed / Signed Document',
          contentHtml: `
            <div>
              <!-- File Picker -->
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" style="font-size: 13px; font-weight: 600; color: #0F172A;">
                  1. Select Final Signed PDF from Computer <span class="required">*</span>
                </label>
                <div style="border: 2px dashed #CBD5E1; border-radius: 8px; padding: 18px; text-align: center; background: #F8FAFC; cursor: pointer;" onclick="document.getElementById('modal-final-file-input').click()">
                  <span style="font-size: 26px;">✍️</span>
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
          title: '📁 Add Document to Central Vault',
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
                  <option value="SPECIFIC_DEPT">🏢 Specific Department (e.g. Staffing, Finance, HR...)</option>
                  <option value="ALL_DEPTS">🌐 All Departments (Company-Wide Access)</option>
                  <option value="LEGAL_ONLY">🔒 Only Legal Manager & Chairman (Confidential Legal Vault)</option>
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
                  <span style="font-size: 26px;">📄</span>
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
    const clearBtn = document.getElementById('ai-clear-chat-btn');

    let pageConversationHistory = [];

    // Helper for formatting markdown
    const formatMd = text => {
      if (!text) return '';
      return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/^#### (.*$)/gim, '<div style="font-size: 13px; font-weight: 700; color: #1E293B; margin: 6px 0 2px 0;">$1</div>')
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
        container.innerHTML = `
          <div style="display: flex; gap: 14px; max-width: 85%;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">🤖</div>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px;">
              <div style="font-weight: 600; font-size: 13px; color: #0F172A; margin-bottom: 6px;">Impacteers AI Legal Counsel</div>
              <div style="font-size: 13.5px; color: #334155; line-height: 1.6;">
                Chat history cleared. How can I assist with your document review or corporate legal clauses today?
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
        <div style="width: 36px; height: 36px; border-radius: 8px; background: #EFF6FF; color: #2563EB; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">⏳</div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; font-size: 13px; color: #64748B; display: flex; align-items: center; gap: 8px;">
          <span>Analyzing legal knowledge base & policies</span>
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
          <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">🤖</div>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; font-size: 13.5px; color: #1E293B; line-height: 1.6; flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-weight: 700; font-size: 13px; color: #0F172A;">Impacteers AI Legal Counsel</span>
              <span style="font-size: 10px; background: #ECFDF5; color: #047857; padding: 1.5px 6px; border-radius: 4px; font-weight: 700;">
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
          <div style="width: 36px; height: 36px; border-radius: 8px; background: #FEE2E2; color: #DC2626; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">⚠️</div>
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
    const resetBtn = document.getElementById('reset-database-btn');

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



})();
