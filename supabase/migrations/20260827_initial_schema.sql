-- ============================================================================
-- Enterprise In-House Legal Management System
-- Database Migration: 20260827_initial_schema.sql
-- Compatible with PostgreSQL 14+ / Supabase
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. ENUMS & CONSTANTS
-- ============================================================================

CREATE TYPE user_role_type AS ENUM (
    'SUPER_ADMIN',
    'LEGAL_ADMIN',
    'LEGAL_MEMBER',
    'BUSINESS_HEAD',
    'BUSINESS_USER'
);

CREATE TYPE request_priority_type AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'URGENT',
    'CRITICAL'
);

CREATE TYPE request_status_type AS ENUM (
    'NEW_REQUEST',
    'PENDING_LEGAL_ACCEPTANCE',
    'ACCEPTED',
    'REJECTED',
    'RESCHEDULE_REQUESTED',
    'UNDER_LEGAL_REVIEW',
    'CLARIFICATION_REQUIRED',
    'DRAFTING_REVISION',
    'BUSINESS_REVIEW',
    'LEGAL_FINAL_REVIEW',
    'READY_FOR_SIGNATURE',
    'SIGNATURE_PENDING',
    'SIGNED',
    'FINAL_DOCUMENT_UPLOADED',
    'COMPLETED'
);

CREATE TYPE confidentiality_level_type AS ENUM (
    'PUBLIC_INTERNAL',
    'INTERNAL',
    'CONFIDENTIAL',
    'HIGHLY_CONFIDENTIAL',
    'LEGAL_PRIVILEGED'
);

CREATE TYPE document_status_type AS ENUM (
    'DRAFT',
    'UNDER_REVIEW',
    'LEGAL_REVIEWED',
    'BUSINESS_REVIEWED',
    'APPROVED',
    'SIGNATURE_PENDING',
    'EXECUTED',
    'ARCHIVED'
);

CREATE TYPE contract_status_type AS ENUM (
    'DRAFT',
    'ACTIVE',
    'EXPIRING_SOON',
    'EXPIRED',
    'TERMINATED',
    'RENEWED'
);

CREATE TYPE remark_status_type AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'RESOLVED'
);

CREATE TYPE comment_type_enum AS ENUM (
    'GENERAL_COMMENT',
    'LEGAL_REMARK',
    'CLARIFICATION',
    'INTERNAL_LEGAL_NOTE'
);

-- ============================================================================
-- 2. CORE ENTITIES
-- ============================================================================

-- DEPARTMENTS
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    head_user_id UUID,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- USERS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    title VARCHAR(100),
    role user_role_type NOT NULL DEFAULT 'BUSINESS_USER',
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    avatar_url TEXT,
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Circular FK for department head
ALTER TABLE departments
ADD CONSTRAINT fk_departments_head
FOREIGN KEY (head_user_id) REFERENCES users(id) ON DELETE SET NULL;

-- ROLES & PERMISSIONS
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    module VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role user_role_type NOT NULL,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (role, permission_id)
);

-- REQUEST TYPES (Configurable by Admin)
CREATE TABLE request_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    default_sla_days INT DEFAULT 5,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. LEGAL REQUEST MANAGEMENT
-- ============================================================================

CREATE TABLE legal_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id VARCHAR(50) NOT NULL UNIQUE, -- e.g. LEG-2026-0001
    title VARCHAR(255) NOT NULL,
    request_type_id UUID REFERENCES request_types(id) ON DELETE SET NULL,
    request_type_name VARCHAR(100) NOT NULL,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    requestor_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    business_head_id UUID REFERENCES users(id) ON DELETE SET NULL,
    assigned_legal_id UUID REFERENCES users(id) ON DELETE SET NULL,
    priority request_priority_type NOT NULL DEFAULT 'MEDIUM',
    status request_status_type NOT NULL DEFAULT 'NEW_REQUEST',
    description TEXT NOT NULL,
    counterparty VARCHAR(200),
    contract_value NUMERIC(15, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    original_requested_date DATE NOT NULL,
    current_due_date DATE NOT NULL,
    accepted_date DATE,
    completed_date DATE,
    rejection_reason TEXT,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_requests_request_id ON legal_requests(request_id);
CREATE INDEX idx_requests_department_id ON legal_requests(department_id);
CREATE INDEX idx_requests_status ON legal_requests(status);
CREATE INDEX idx_requests_requestor ON legal_requests(requestor_id);
CREATE INDEX idx_requests_assigned ON legal_requests(assigned_legal_id);
CREATE INDEX idx_requests_due_date ON legal_requests(current_due_date);

-- REQUEST STATUS & RESCHEDULE HISTORY
CREATE TABLE request_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES legal_requests(id) ON DELETE CASCADE,
    from_status request_status_type,
    to_status request_status_type NOT NULL,
    changed_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    change_reason TEXT,
    notes TEXT,
    old_due_date DATE,
    new_due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_req_history_request ON request_status_history(request_id);

-- ============================================================================
-- 4. DOCUMENT & REPOSITORY MANAGEMENT
-- ============================================================================

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    linked_request_id UUID REFERENCES legal_requests(id) ON DELETE SET NULL,
    confidentiality_level confidentiality_level_type NOT NULL DEFAULT 'INTERNAL',
    status document_status_type NOT NULL DEFAULT 'DRAFT',
    current_version INT NOT NULL DEFAULT 1,
    counterparty VARCHAR(200),
    effective_date DATE,
    expiry_date DATE,
    owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    is_executed BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_department ON documents(department_id);
CREATE INDEX idx_documents_confidentiality ON documents(confidentiality_level);
CREATE INDEX idx_documents_linked_request ON documents(linked_request_id);
CREATE INDEX idx_documents_status ON documents(status);

CREATE TABLE document_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    version_number INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    storage_path TEXT NOT NULL, -- Private object storage bucket path
    checksum VARCHAR(128),
    uploaded_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    change_description TEXT,
    document_status document_status_type NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (document_id, version_number)
);

CREATE INDEX idx_doc_versions_doc_id ON document_versions(document_id);

-- ============================================================================
-- 5. LEGAL REMARKS & JIRA-STYLE COMMENTS
-- ============================================================================

CREATE TABLE legal_remarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES legal_requests(id) ON DELETE CASCADE,
    clause_reference VARCHAR(100) NOT NULL, -- e.g. "Clause 4 - Payment Terms"
    remark_text TEXT NOT NULL,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status remark_status_type NOT NULL DEFAULT 'OPEN',
    resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE legal_remark_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    remark_id UUID NOT NULL REFERENCES legal_remarks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    reply_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE request_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES legal_requests(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    comment_text TEXT NOT NULL,
    comment_type comment_type_enum NOT NULL DEFAULT 'GENERAL_COMMENT',
    is_internal_legal_only BOOLEAN NOT NULL DEFAULT FALSE,
    attachment_name VARCHAR(255),
    attachment_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_request_id ON request_comments(request_id);

-- ============================================================================
-- 6. CONTRACT LIFECYCLE MANAGEMENT (CLM)
-- ============================================================================

CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id VARCHAR(50) NOT NULL UNIQUE, -- e.g. CNT-2026-0089
    name VARCHAR(255) NOT NULL,
    contract_type VARCHAR(100) NOT NULL,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    counterparty VARCHAR(200) NOT NULL,
    company_entity VARCHAR(200) NOT NULL DEFAULT 'Enterprise Global Corp.',
    effective_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    renewal_date DATE,
    contract_value NUMERIC(15, 2) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_terms VARCHAR(255),
    notice_period_days INT DEFAULT 30,
    termination_clause TEXT,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    legal_owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status contract_status_type NOT NULL DEFAULT 'ACTIVE',
    linked_request_id UUID REFERENCES legal_requests(id) ON DELETE SET NULL,
    executed_document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
    notes TEXT,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contracts_department ON contracts(department_id);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contracts_expiry ON contracts(expiry_date);
CREATE INDEX idx_contracts_counterparty ON contracts(counterparty);

-- EXPIRY ALERT CONFIGURATION
CREATE TABLE expiry_alert_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    days_before INT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    notify_legal_admins BOOLEAN DEFAULT TRUE,
    notify_department_head BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 7. NOTIFICATIONS & IMMUTABLE AUDIT LOG
-- ============================================================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    link_url TEXT,
    category VARCHAR(50) NOT NULL, -- e.g. REQUEST, DOCUMENT, CONTRACT, REMARK
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    actor_name VARCHAR(150) NOT NULL,
    actor_role user_role_type NOT NULL,
    action VARCHAR(100) NOT NULL, -- e.g. CREATE_REQUEST, ACCEPT_REQUEST, UPLOAD_DOCUMENT, VIEW_AUDIT
    object_type VARCHAR(100) NOT NULL, -- e.g. LEGAL_REQUEST, DOCUMENT, CONTRACT
    object_id VARCHAR(100) NOT NULL,
    previous_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_object ON audit_logs(object_type, object_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE legal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 8.1 LEGAL REQUESTS POLICIES
-- Super Admin and Legal Admin can access all requests
CREATE POLICY rls_requests_legal_all ON legal_requests
    FOR ALL
    USING (
        auth.role() IN ('SUPER_ADMIN', 'LEGAL_ADMIN')
    );

-- Legal Member can access all or assigned requests
CREATE POLICY rls_requests_legal_member ON legal_requests
    FOR SELECT
    USING (
        auth.role() = 'LEGAL_MEMBER'
    );

-- Business Head can access all requests in their own department
CREATE POLICY rls_requests_business_head ON legal_requests
    FOR ALL
    USING (
        auth.role() = 'BUSINESS_HEAD' AND department_id = auth.department_id()
    );

-- Business User can access requests they created in their department
CREATE POLICY rls_requests_business_user ON legal_requests
    FOR ALL
    USING (
        auth.role() = 'BUSINESS_USER' AND (requestor_id = auth.user_id() OR department_id = auth.department_id())
    );

-- 8.2 DOCUMENTS POLICIES
-- Legal Admin and Super Admin can view all documents
CREATE POLICY rls_documents_legal_admin ON documents
    FOR ALL
    USING (
        auth.role() IN ('SUPER_ADMIN', 'LEGAL_ADMIN')
    );

-- Legal Member can view authorized company legal documents
CREATE POLICY rls_documents_legal_member ON documents
    FOR SELECT
    USING (
        auth.role() = 'LEGAL_MEMBER'
    );

-- Business Users/Heads can ONLY view documents belonging to their own department AND non-privileged
CREATE POLICY rls_documents_department_isolation ON documents
    FOR SELECT
    USING (
        department_id = auth.department_id()
        AND confidentiality_level != 'LEGAL_PRIVILEGED'
    );

-- 8.3 COMMENTS POLICIES (Internal Legal Notes filtered)
CREATE POLICY rls_comments_internal_notes ON request_comments
    FOR SELECT
    USING (
        NOT is_internal_legal_only 
        OR auth.role() IN ('SUPER_ADMIN', 'LEGAL_ADMIN', 'LEGAL_MEMBER')
    );

-- 8.4 AUDIT LOGS POLICIES
CREATE POLICY rls_audit_logs_admin_only ON audit_logs
    FOR SELECT
    USING (
        auth.role() IN ('SUPER_ADMIN', 'LEGAL_ADMIN')
    );
