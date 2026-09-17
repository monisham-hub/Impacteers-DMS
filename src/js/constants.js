/**
 * Impacteers Legal docs
 * Constants & Role Definitions
 */

export const USER_ROLES = {
  LEGAL_ADMIN: 'LEGAL_ADMIN',
  LEGAL_MANAGER: 'LEGAL_MANAGER',
  CHAIRMAN: 'CHAIRMAN',
  BUSINESS_USER: 'BUSINESS_USER'
};

export const PERMISSION_CATEGORIES = {
  LEGAL_REQUESTS: 'Legal Requests',
  DOCUMENTS: 'Documents & Agreements',
  CONTRACTS: 'Contract Management',
  USER_MANAGEMENT: 'User & Access Management',
  REPORTS: 'Reports & Dashboard',
  SYSTEM: 'System / Administrative'
};

export const PERMISSIONS = {
  // Legal Requests
  VIEW_REQUESTS: { id: 'VIEW_REQUESTS', label: 'View Legal Requests', category: PERMISSION_CATEGORIES.LEGAL_REQUESTS },
  CREATE_REQUESTS: { id: 'CREATE_REQUESTS', label: 'Create Legal Requests', category: PERMISSION_CATEGORIES.LEGAL_REQUESTS },
  EDIT_REQUESTS: { id: 'EDIT_REQUESTS', label: 'Edit Legal Requests', category: PERMISSION_CATEGORIES.LEGAL_REQUESTS },
  ASSIGN_REQUESTS: { id: 'ASSIGN_REQUESTS', label: 'Assign Legal Requests', category: PERMISSION_CATEGORIES.LEGAL_REQUESTS },
  
  // Documents
  VIEW_DOCUMENTS: { id: 'VIEW_DOCUMENTS', label: 'View Documents', category: PERMISSION_CATEGORIES.DOCUMENTS },
  UPLOAD_DOCUMENTS: { id: 'UPLOAD_DOCUMENTS', label: 'Upload Documents', category: PERMISSION_CATEGORIES.DOCUMENTS },
  EDIT_DOCUMENTS: { id: 'EDIT_DOCUMENTS', label: 'Edit Documents', category: PERMISSION_CATEGORIES.DOCUMENTS },
  APPROVE_DOCUMENTS: { id: 'APPROVE_DOCUMENTS', label: 'Approve Documents', category: PERMISSION_CATEGORIES.DOCUMENTS },
  DELETE_DOCUMENTS: { id: 'DELETE_DOCUMENTS', label: 'Delete Documents', category: PERMISSION_CATEGORIES.DOCUMENTS },

  // Contracts
  VIEW_CONTRACTS: { id: 'VIEW_CONTRACTS', label: 'View Contracts', category: PERMISSION_CATEGORIES.CONTRACTS },
  CREATE_CONTRACTS: { id: 'CREATE_CONTRACTS', label: 'Create Contracts', category: PERMISSION_CATEGORIES.CONTRACTS },
  EDIT_CONTRACTS: { id: 'EDIT_CONTRACTS', label: 'Edit Contracts', category: PERMISSION_CATEGORIES.CONTRACTS },
  APPROVE_CONTRACTS: { id: 'APPROVE_CONTRACTS', label: 'Approve Contracts', category: PERMISSION_CATEGORIES.CONTRACTS },

  // User Management
  VIEW_USERS: { id: 'VIEW_USERS', label: 'View Users', category: PERMISSION_CATEGORIES.USER_MANAGEMENT },
  MANAGE_USERS: { id: 'MANAGE_USERS', label: 'Add/Edit Users', category: PERMISSION_CATEGORIES.USER_MANAGEMENT },
  MANAGE_ROLES: { id: 'MANAGE_ROLES', label: 'Assign Roles & Permissions', category: PERMISSION_CATEGORIES.USER_MANAGEMENT },

  // Reports
  VIEW_REPORTS: { id: 'VIEW_REPORTS', label: 'View Reports', category: PERMISSION_CATEGORIES.REPORTS },
  EXPORT_REPORTS: { id: 'EXPORT_REPORTS', label: 'Export Reports', category: PERMISSION_CATEGORIES.REPORTS },

  // System
  MANAGE_SETTINGS: { id: 'MANAGE_SETTINGS', label: 'Manage Admin Settings', category: PERMISSION_CATEGORIES.SYSTEM },
  VIEW_AUDIT_LOGS: { id: 'VIEW_AUDIT_LOGS', label: 'View Audit Logs', category: PERMISSION_CATEGORIES.SYSTEM }
};

export const REQUEST_STATUSES = {
  PENDING_ACCEPTANCE: { label: 'Pending Acceptance', color: 'indigo', badgeClass: 'badge-blue' },
  ACCEPTED: { label: 'Accepted', color: 'blue', badgeClass: 'badge-blue' },
  RESCHEDULED: { label: 'Rescheduled', color: 'amber', badgeClass: 'badge-amber' },
  UNDER_LEGAL_REVIEW: { label: 'Under Legal Review', color: 'purple', badgeClass: 'badge-purple' },
  BUSINESS_ACTION_REQUIRED: { label: 'Business Action Required', color: 'orange', badgeClass: 'badge-orange' },
  FINAL_DOCUMENT_REQUIRED: { label: 'Final Document Required', color: 'teal', badgeClass: 'badge-blue' },
  COMPLETED: { label: 'Completed', color: 'green', badgeClass: 'badge-green' },
  REJECTED: { label: 'Rejected', color: 'rose', badgeClass: 'badge-rose' }
};

export const REQUEST_TYPES = [
  'Draft a Document',
  'Review a Document',
  'Verify a Document',
  'Legal Opinion',
  'Other'
];

export const REQUEST_PRIORITIES = {
  IMMEDIATE: { id: 'IMMEDIATE', label: 'Immediate Action Required', badgeClass: 'badge-rose', icon: '🚨' },
  HIGH: { id: 'HIGH', label: 'High Priority', badgeClass: 'badge-orange', icon: '🔥' },
  MEDIUM: { id: 'MEDIUM', label: 'Standard Priority', badgeClass: 'badge-blue', icon: '⚡' },
  LOW: { id: 'LOW', label: 'Low Priority / Flexible', badgeClass: 'badge-slate', icon: '🌱' }
};

export const DEPARTMENTS = [
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

export const DEMO_USERS = [
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
