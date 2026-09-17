/**
 * Enterprise In-House Legal Management System
 * Contract Lifecycle Management (CLM) Service
 */

import { db } from '../db.js';
import { authService } from './authService.js';
import { auditService } from './auditService.js';
import { notificationService } from './notificationService.js';

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
    db.syncToFirestore('contracts', newContract.id, newContract);

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
    db.syncToFirestore('contracts', contract.id, contract);

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

export const contractService = new ContractService();
