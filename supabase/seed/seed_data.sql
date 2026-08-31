-- ============================================================================
-- Enterprise In-House Legal Management System
-- Seed Data: seed_data.sql
-- 11 Departments, Users, Requests, CLM Contracts, Documents, Audit Logs
-- ============================================================================

-- DEPARTMENTS
INSERT INTO departments (id, code, name, description) VALUES
('d1000000-0000-0000-0000-000000000001', 'COURSES', 'Courses', 'Curriculum development, certifications, and educational content delivery'),
('d1000000-0000-0000-0000-000000000002', 'STAFFING', 'Staffing', 'Enterprise talent recruitment, contract staffing, and vendor workforce solutions'),
('d1000000-0000-0000-0000-000000000003', 'CAMPUS', 'Campus', 'University tie-ups, campus recruitment drives, and academic alliances'),
('d1000000-0000-0000-0000-000000000004', 'INSTITUTIONS', 'Institutions', 'Government and large institutional training programs and MOUs'),
('d1000000-0000-0000-0000-000000000005', 'IT', 'Information Technology', 'Cloud infrastructure, enterprise software licensing, cybersecurity, and hardware procurement'),
('d1000000-0000-0000-0000-000000000006', 'HR', 'Human Resources', 'Employment contracts, workplace policies, benefits, and labor compliance'),
('d1000000-0000-0000-0000-000000000007', 'PRODUCT', 'Product Management', 'SaaS platform specifications, licensing models, and IP protection'),
('d1000000-0000-0000-0000-000000000008', 'ENGINEERING', 'Engineering', 'Software development, open source compliance, vendor API integrations, and tech patents'),
('d1000000-0000-0000-0000-000000000009', 'MARKETING', 'Marketing & Communications', 'Advertising agreements, agency retainers, influencer contracts, and brand trademarks'),
('d1000000-0000-0000-0000-000000000010', 'FINANCE', 'Finance & Treasury', 'Banking agreements, payment gateways, audit retainers, and tax compliance'),
('d1000000-0000-0000-0000-000000000011', 'OPERATIONS', 'Operations & Facilities', 'Real estate leases, logistics agreements, facility management, and insurance policies');

-- USERS
INSERT INTO users (id, email, full_name, title, role, department_id, phone) VALUES
('u1000000-0000-0000-0000-000000000001', 'sarah.jenkins@company.com', 'Sarah Jenkins', 'Chief Legal Officer / Super Admin', 'SUPER_ADMIN', NULL, '+1 (555) 019-2831'),
('u1000000-0000-0000-0000-000000000002', 'david.vance@company.com', 'David Vance', 'Lead Legal Counsel', 'LEGAL_ADMIN', NULL, '+1 (555) 019-2832'),
('u1000000-0000-0000-0000-000000000003', 'elena.rostova@company.com', 'Elena Rostova', 'Legal Associate', 'LEGAL_MEMBER', NULL, '+1 (555) 019-2833'),
('u1000000-0000-0000-0000-000000000004', 'marcus.sterling@company.com', 'Marcus Sterling', 'VP & Head of Staffing', 'BUSINESS_HEAD', 'd1000000-0000-0000-0000-000000000002', '+1 (555) 019-2834'),
('u1000000-0000-0000-0000-000000000005', 'priya.sharma@company.com', 'Priya Sharma', 'Head of IT & Infrastructure', 'BUSINESS_HEAD', 'd1000000-0000-0000-0000-000000000005', '+1 (555) 019-2835'),
('u1000000-0000-0000-0000-000000000006', 'alex.rivera@company.com', 'Alex Rivera', 'Senior Marketing Manager', 'BUSINESS_USER', 'd1000000-0000-0000-0000-000000000009', '+1 (555) 019-2836'),
('u1000000-0000-0000-0000-000000000007', 'rachel.zane@company.com', 'Rachel Zane', 'Head of HR', 'BUSINESS_HEAD', 'd1000000-0000-0000-0000-000000000006', '+1 (555) 019-2837');

-- REQUEST TYPES
INSERT INTO request_types (id, name, category, default_sla_days) VALUES
('r1000000-0000-0000-0000-000000000001', 'Contract Review', 'Contract Management', 5),
('r1000000-0000-0000-0000-000000000002', 'Contract Drafting', 'Contract Management', 7),
('r1000000-0000-0000-0000-000000000003', 'Agreement Review', 'Agreements', 5),
('r1000000-0000-0000-0000-000000000004', 'Agreement Drafting', 'Agreements', 7),
('r1000000-0000-0000-0000-000000000005', 'NDA Review', 'Confidentiality', 2),
('r1000000-0000-0000-0000-000000000006', 'NDA Drafting', 'Confidentiality', 2),
('r1000000-0000-0000-0000-000000000007', 'MOU Review', 'Partnerships', 4),
('r1000000-0000-0000-0000-000000000008', 'MOU Drafting', 'Partnerships', 6),
('r1000000-0000-0000-0000-000000000009', 'Vendor Agreement', 'Procurement', 5),
('r1000000-0000-0000-0000-000000000010', 'Employment Agreement', 'HR & Labor', 3),
('r1000000-0000-0000-0000-000000000011', 'Consultant Agreement', 'Procurement', 4),
('r1000000-0000-0000-0000-000000000012', 'Partnership Agreement', 'Strategic', 7),
('r1000000-0000-0000-0000-000000000013', 'Legal Opinion', 'Advisory', 10),
('r1000000-0000-0000-0000-000000000014', 'Compliance Review', 'Regulatory', 5),
('r1000000-0000-0000-0000-000000000015', 'Policy Review', 'Corporate Governance', 7),
('r1000000-0000-0000-0000-000000000016', 'Data Privacy Review', 'Compliance & Cyber', 4),
('r1000000-0000-0000-0000-000000000017', 'IP Review', 'Intellectual Property', 7),
('r1000000-0000-0000-0000-000000000018', 'Copyright Review', 'Intellectual Property', 5),
('r1000000-0000-0000-0000-000000000019', 'Trademark Review', 'Intellectual Property', 5),
('r1000000-0000-0000-0000-000000000020', 'Other', 'General Legal', 5);

-- EXPIRY ALERT THRESHOLDS
INSERT INTO expiry_alert_settings (days_before, is_active) VALUES
(90, TRUE),
(60, TRUE),
(30, TRUE),
(15, TRUE),
(7, TRUE);
