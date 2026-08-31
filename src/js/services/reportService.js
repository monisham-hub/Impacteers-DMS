/**
 * Enterprise In-House Legal Management System
 * Reporting, Analytics & Workload Metrics Service
 */

import { db } from '../db.js';
import { authService } from './authService.js';
import { DEPARTMENTS } from '../constants.js';

class ReportService {
  /**
   * Compute comprehensive dashboard & report KPIs
   */
  getMetrics() {
    const user = authService.getCurrentUser();
    let requests = [...(db.data.requests || [])].filter(r => !r.isArchived);
    let contracts = [...(db.data.contracts || [])].filter(c => !c.isArchived);
    let documents = [...(db.data.documents || [])].filter(d => !d.isArchived);

    // Scoping if business user
    if (!authService.isLegalTeam()) {
      requests = requests.filter(r => r.departmentId === user.departmentId);
      contracts = contracts.filter(c => c.departmentId === user.departmentId);
      documents = documents.filter(d => d.departmentId === user.departmentId && d.confidentialityLevel !== 'LEGAL_PRIVILEGED');
    }

    const now = new Date('2026-08-27T00:00:00.000Z');
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const openRequests = requests.filter(r => !['COMPLETED', 'REJECTED'].includes(r.status));
    const pendingAcceptance = requests.filter(r => ['NEW_REQUEST', 'PENDING_LEGAL_ACCEPTANCE', 'RESCHEDULE_REQUESTED'].includes(r.status));
    
    const dueThisWeek = openRequests.filter(r => {
      const d = new Date(r.currentDueDate);
      return d >= now && d <= oneWeekFromNow;
    });

    const overdue = openRequests.filter(r => {
      const d = new Date(r.currentDueDate);
      return d < now;
    });

    const completed = requests.filter(r => r.status === 'COMPLETED');
    const accepted = requests.filter(r => r.status === 'ACCEPTED' || r.status === 'UNDER_LEGAL_REVIEW');
    const rejected = requests.filter(r => r.status === 'REJECTED');
    const rescheduled = requests.filter(r => (r.rescheduledHistory && r.rescheduledHistory.length > 0));

    const activeContracts = contracts.filter(c => c.status === 'ACTIVE' || c.status === 'EXPIRING_SOON');
    const expiringSoonContracts = contracts.filter(c => {
      const exp = new Date(c.expiryDate);
      const diff = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
      return diff >= 0 && diff <= 30;
    });

    const totalContractValue = activeContracts.reduce((sum, c) => sum + (c.contractValue || 0), 0);

    // Department Distribution
    const departmentDistribution = DEPARTMENTS.map(dept => {
      const deptRequests = requests.filter(r => r.departmentId === dept.id);
      const deptContracts = contracts.filter(c => c.departmentId === dept.id);
      const deptValue = deptContracts.reduce((sum, c) => sum + (c.contractValue || 0), 0);
      return {
        id: dept.id,
        code: dept.code,
        name: dept.name,
        totalRequests: deptRequests.length,
        openRequests: deptRequests.filter(r => !['COMPLETED', 'REJECTED'].includes(r.status)).length,
        activeContracts: deptContracts.length,
        contractValue: deptValue
      };
    });

    // Request Type Distribution
    const requestTypeCounts = {};
    requests.forEach(r => {
      requestTypeCounts[r.requestType] = (requestTypeCounts[r.requestType] || 0) + 1;
    });

    // Legal Counsel Workload Distribution
    const legalWorkload = db.data.users
      .filter(u => u.role === 'LEGAL_ADMIN' || u.role === 'LEGAL_MEMBER')
      .map(counsel => {
        const assigned = requests.filter(r => r.assignedLegalId === counsel.id && !['COMPLETED', 'REJECTED'].includes(r.status));
        return {
          id: counsel.id,
          name: counsel.name,
          title: counsel.title,
          activeCases: assigned.length,
          highPriority: assigned.filter(r => ['HIGH', 'URGENT', 'CRITICAL'].includes(r.priority)).length
        };
      });

    return {
      totalRequests: requests.length,
      totalOpenRequests: openRequests.length,
      pendingLegalReview: pendingAcceptance.length,
      dueThisWeek: dueThisWeek.length,
      overdue: overdue.length,
      accepted: accepted.length,
      rejected: rejected.length,
      rescheduled: rescheduled.length,
      completed: completed.length,
      activeContracts: activeContracts.length,
      contractsExpiringSoon: expiringSoonContracts.length,
      totalContractValue,
      departmentDistribution,
      requestTypeCounts,
      legalWorkload,
      averageTurnaroundDays: 3.4
    };
  }

  /**
   * Export report data to CSV
   */
  exportToCsv(type = 'requests') {
    let rows = [];
    let headers = [];

    if (type === 'requests') {
      headers = ['Request ID', 'Title', 'Type', 'Department', 'Requestor', 'Priority', 'Status', 'Due Date', 'Value'];
      rows = db.data.requests.map(r => [
        r.requestId,
        `"${r.title.replace(/"/g, '""')}"`,
        r.requestType,
        r.departmentName,
        r.requestorName,
        r.priority,
        r.status,
        r.currentDueDate,
        r.contractValue
      ]);
    } else if (type === 'contracts') {
      headers = ['Contract ID', 'Name', 'Type', 'Department', 'Counterparty', 'Status', 'Effective Date', 'Expiry Date', 'Value'];
      rows = (db.data.contracts || []).map(c => [
        c.contractId,
        `"${(c.name || '').replace(/"/g, '""')}"`,
        c.contractType || '',
        c.departmentName || '',
        `"${(c.counterparty || '').replace(/"/g, '""')}"`,
        c.status || '',
        c.effectiveDate || '',
        c.expiryDate || '',
        c.contractValue || 0
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Legal_Report_${type}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const reportService = new ReportService();
