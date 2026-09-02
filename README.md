# Impacteers DMS — Enterprise In-House Legal & Document Management System

> **A modern, secure, enterprise-grade In-House Legal Operations, Contract Lifecycle Management (CLM), Document Vault & AI Intelligence System for Impacteers.**

---

## 🌟 Executive Overview

**Impacteers DMS** (Document Management System) is built for modern corporate legal teams and cross-functional business departments to streamline the complete legal and document lifecycle:
1. **Legal Requests & Ticket Management**: Triage, assignment, acceptance, rejection, and timeline rescheduling with SLA tracking.
2. **Dedicated Clause Legal Remarks**: Granular clause-level review (`Clause 4 - Payment terms`, `Clause 7 - Liability cap`) with threaded business responses and resolution workflows (`Open`, `In Progress`, `Resolved`).
3. **Version-Controlled Document Review**: Immutable multi-version history (`v1 Original Draft`, `v2 Legal Redlines`, `vFinal Executed Agreement`).
4. **Centralized Legal Repository & Vault**: Global legal archive for counsel and strictly isolated department repositories for 11 business units.
5. **Contract Lifecycle Management (CLM)**: Active contract tracking, automatic expiry alerts (90d, 60d, 30d, 15d, 7d), notice period management, and execution workflow.
6. **In-House AI Legal Assistant**: Enterprise intelligence with permission-scoped Legal RAG grounding across Articles of Association (AOA), contracts, NDAs, and corporate policies.
7. **Immutable Security Audit Trail**: Tamper-evident logging of all events with actor, diffs, timestamps, and IP/session metadata.

---

## 👥 Role-Based Access Control (RBAC) Matrix

| Feature / Resource | Legal Manager (Monisha) | Chairman | Business Head (e.g. Staffing) | Business User (e.g. HR / IT) |
| :--- | :---: | :---: | :---: | :---: |
| **All Company Departments** | ✅ Full Access | ✅ Executive Overview | ❌ Own Dept Only | ❌ Own Dept Only |
| **Accept / Reject / Reschedule Requests** | ✅ Yes | 👁️ View Only | ❌ No | ❌ No |
| **Add Clause Legal Remarks** | ✅ Yes | 👁️ View Only | 💬 Reply Only | 💬 Reply Only |
| **Internal Legal Notes** | 👁️ Visible | 👁️ Visible | 🚫 Hidden | 🚫 Hidden |
| **Legal Privileged Documents** | ✅ Full Access | ✅ Full Access | 🚫 Restricted | 🚫 Restricted |
| **CLM Contract Execution** | ✅ Yes | 👁️ Executive View | 👁️ Dept Contracts | 👁️ Authorized |
| **Audit Logs Inspection** | ✅ Full Access | ✅ Full Access | ❌ No | ❌ No |
| **AI Legal Assistant Scope** | Global RAG | Global RAG | Dept Restricted | User Restricted |

---

## 🏗️ Technical Architecture & Directory Layout

```
legal-management-system/
├── index.html                           # Modern HTML5 application entry point
├── server.ps1                           # Zero-dependency PowerShell HTTP web server
├── README.md                            # Comprehensive project documentation
├── .gitignore                           # Standard git exclusion rules
├── supabase/
│   ├── migrations/
│   │   └── 20260827_initial_schema.sql  # Complete PostgreSQL DDL with RLS policies, tables & indexes
│   └── seed/
│       └── seed_data.sql                # Production-grade seed data across all 11 departments
├── src/
│   ├── css/
│   │   └── app.css                      # Custom enterprise design system tokens & responsive styles
│   └── js/
│       ├── constants.js                 # Request types, priorities, roles, departments
│       ├── db.js                        # Relational database engine, schema migration & storage persistence
│       ├── bundle.js                    # Standalone zero-dependency distribution bundle
│       ├── app.js                       # Client router & application coordinator
│       ├── services/
│       │   ├── authService.js           # RBAC permission evaluator & persona switcher
│       │   ├── requestService.js        # Request state machine & rescheduling engine
│       │   ├── documentService.js       # Repository vault & immutable version control
│       │   ├── contractService.js       # CLM lifecycle & automated expiry alerts
│       │   ├── remarkService.js         # Dedicated clause legal remarks & thread replies
│       │   ├── commentService.js        # Comments & Internal Legal Notes filtering
│       │   ├── reportService.js         # Analytics, turnaround metrics & CSV exporter
│       │   ├── legalAssistantService.js # AI Legal Intelligence & RAG Grounding engine
│       │   ├── auditService.js          # Cryptographic immutable audit logging
│       │   └── notificationService.js   # Notification center & alerts
│       ├── components/
│       │   ├── Sidebar.js               # Collapsible enterprise navigation
│       │   ├── Topbar.js                # Top navigation with live persona switcher & global search
│       │   ├── Modal.js                 # Reusable modal controller
│       │   ├── Toast.js                 # Animated toast notifications
│       │   ├── GlobalSearchModal.js     # Ctrl+K global instant search
│       │   ├── FloatingLegalAssistant.js# Floating AI assistant widget
│       │   └── RequestModals.js         # Create, Accept, Reject, Reschedule & Execute dialogs
│       └── pages/
│           ├── DashboardPage.js         # Role-aware dashboard & request pipeline
│           ├── LegalRequestsPage.js     # Request queue & triage
│           ├── RequestDetailPage.js     # Detailed ticket view with remarks & versions
│           ├── DocumentsPage.js         # Document Vault & Department Repositories
│           ├── ContractsPage.js         # Contract Lifecycle Management (CLM)
│           ├── DepartmentsPage.js       # 11-Department Isolation Hub
│           ├── CalendarPage.js          # Deadlines, expiries & SLA calendar
│           ├── ReportsPage.js           # Analytics & turnaround time reports
│           ├── LegalAssistantPage.js    # Full-page AI Assistant interface
│           ├── NotificationsPage.js     # Notifications inbox
│           ├── AuditLogsPage.js         # Immutable security audit trail
│           └── AdminSettingsPage.js     # User, role, SLA & AI engine configuration
```

---

## 🚀 Quick Start & Local Execution

This project runs **100% standalone** without requiring Node.js or `node_modules`.

### 1. Launch the Server
Open PowerShell in the project directory:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

### 2. Access the Application
Open your browser and navigate to:
```
http://127.0.0.1:8080/
```

---

## 🎭 Active Personas for Demo Testing

Switch personas dynamically using the top-bar **🎭 Persona Selector**:
- **Monisha** (`Legal Manager`) — Full global control over requests, contracts, legal remarks, vault documents, and audit logs.
- **Edwin** (`HR Team`) — Submits HR vendor and employment agreements.
- **Musthafa** (`IT Team`) — Manages cloud infrastructure agreements (AWS MSA).
- **Bala** (`Staffing Lead`) — Manages staffing framework contracts.
- **Prem** (`Finance`) — Handles payment processing and gateway agreements.
- **Vinoth** (`Engineering`) — Manages vendor NDAs and open-source compliance.

---

## 📄 License & Ownership
Copyright © 2026 Impacteers. All rights reserved.
