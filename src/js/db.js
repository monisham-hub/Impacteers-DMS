/**
 * Impacteers DMS — Enterprise In-House Legal & Document Management System
 * Database Engine, Storage Store & Schema Migration
 */

import { DEPARTMENTS, DEMO_USERS, REQUEST_TYPES, USER_ROLES } from './constants.js';

const DB_STORAGE_KEY = 'IMPACTEERS_LEGAL_DOCS_STORE_V3';

export class LegalDatabase {
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

export const db = new LegalDatabase();
