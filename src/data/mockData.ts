import { User, CourtCase, Notification, CaseDocument, Hearing, DashboardStats } from '@/types/court';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'admin',
    email: 'admin@court.gov.et',
    fullName: 'System Administrator',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'u2',
    username: 'judge.abebe',
    email: 'abebe@court.gov.et',
    fullName: 'Judge Abebe Kebede',
    role: 'judge',
    status: 'active',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: 'u3',
    username: 'registrar.sara',
    email: 'sara@court.gov.et',
    fullName: 'Sara Tesfaye',
    role: 'registrar',
    status: 'active',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: 'u4',
    username: 'clerk.meron',
    email: 'meron@court.gov.et',
    fullName: 'Meron Hailu',
    role: 'clerk',
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: 'u5',
    username: 'judge.tigist',
    email: 'tigist@court.gov.et',
    fullName: 'Judge Tigist Worku',
    role: 'judge',
    status: 'active',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
];

// Mock Cases
export const mockCases: CourtCase[] = [
  {
    id: 'c1',
    caseNumber: 'EGH-2025-001',
    caseType: 'civil',
    title: 'Land Dispute - Debre Markos',
    description: 'Dispute over agricultural land boundaries between two neighboring farmers in Debre Markos woreda.',
    status: 'open',
    plaintiff: {
      id: 'p1',
      fullName: 'Getachew Mulugeta',
      phone: '+251911234567',
      address: 'Debre Markos, Kebele 04',
      email: 'getachew@email.com',
    },
    defendant: {
      id: 'd1',
      fullName: 'Tesfaye Girma',
      phone: '+251922345678',
      address: 'Debre Markos, Kebele 04',
    },
    assignedJudgeId: 'u2',
    assignedJudgeName: 'Judge Abebe Kebede',
    registrarId: 'u3',
    registrarName: 'Sara Tesfaye',
    filingDate: new Date('2025-01-15'),
    summonDate: new Date('2025-02-01'),
    nextHearingDate: new Date('2025-03-15'),
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-02-10'),
  },
  {
    id: 'c2',
    caseNumber: 'EGH-2025-002',
    caseType: 'criminal',
    title: 'Theft Case - Machakel',
    description: 'Criminal case involving theft of livestock in Machakel district.',
    status: 'pending',
    plaintiff: {
      id: 'p2',
      fullName: 'Almaz Bekele',
      phone: '+251933456789',
      address: 'Machakel, Kebele 02',
    },
    defendant: {
      id: 'd2',
      fullName: 'Unknown Suspect',
      phone: 'N/A',
      address: 'Unknown',
    },
    registrarId: 'u3',
    registrarName: 'Sara Tesfaye',
    filingDate: new Date('2025-02-20'),
    createdAt: new Date('2025-02-20'),
    updatedAt: new Date('2025-02-20'),
  },
  {
    id: 'c3',
    caseNumber: 'EGH-2025-003',
    caseType: 'commercial',
    title: 'Contract Breach - Trade Agreement',
    description: 'Commercial dispute regarding breach of trade agreement between two businesses.',
    status: 'open',
    plaintiff: {
      id: 'p3',
      fullName: 'Abebe Trading PLC',
      phone: '+251944567890',
      address: 'Debre Markos, Commercial Area',
      email: 'info@abebetrading.com',
    },
    defendant: {
      id: 'd3',
      fullName: 'Kebede Suppliers Ltd',
      phone: '+251955678901',
      address: 'Bahir Dar, Industrial Zone',
    },
    assignedJudgeId: 'u5',
    assignedJudgeName: 'Judge Tigist Worku',
    registrarId: 'u3',
    registrarName: 'Sara Tesfaye',
    filingDate: new Date('2025-01-25'),
    summonDate: new Date('2025-02-15'),
    nextHearingDate: new Date('2025-03-20'),
    createdAt: new Date('2025-01-25'),
    updatedAt: new Date('2025-02-15'),
  },
  {
    id: 'c4',
    caseNumber: 'EGH-2025-004',
    caseType: 'family',
    title: 'Divorce Proceedings',
    description: 'Family case regarding divorce and child custody arrangements.',
    status: 'suspended',
    plaintiff: {
      id: 'p4',
      fullName: 'Hana Mekonnen',
      phone: '+251966789012',
      address: 'Sinan, Kebele 01',
    },
    defendant: {
      id: 'd4',
      fullName: 'Dawit Tadesse',
      phone: '+251977890123',
      address: 'Sinan, Kebele 03',
    },
    assignedJudgeId: 'u2',
    assignedJudgeName: 'Judge Abebe Kebede',
    registrarId: 'u3',
    registrarName: 'Sara Tesfaye',
    filingDate: new Date('2024-12-10'),
    summonDate: new Date('2025-01-05'),
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2025-02-01'),
  },
  {
    id: 'c5',
    caseNumber: 'EGH-2024-089',
    caseType: 'civil',
    title: 'Property Inheritance Dispute',
    description: 'Civil case regarding inheritance of family property after the passing of the family patriarch.',
    status: 'closed',
    plaintiff: {
      id: 'p5',
      fullName: 'Yonas Alemayehu',
      phone: '+251988901234',
      address: 'Debre Markos, Kebele 07',
    },
    defendant: {
      id: 'd5',
      fullName: 'Mulugeta Alemayehu',
      phone: '+251999012345',
      address: 'Addis Ababa',
    },
    assignedJudgeId: 'u5',
    assignedJudgeName: 'Judge Tigist Worku',
    registrarId: 'u3',
    registrarName: 'Sara Tesfaye',
    filingDate: new Date('2024-08-15'),
    summonDate: new Date('2024-09-01'),
    closedDate: new Date('2024-12-20'),
    judgement: 'Property to be divided equally among all heirs as per Ethiopian inheritance law.',
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-12-20'),
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u2',
    caseId: 'c2',
    caseNumber: 'EGH-2025-002',
    title: 'New Case Assigned',
    message: 'A new criminal case (EGH-2025-002) has been submitted for your review.',
    type: 'case_update',
    isRead: false,
    createdAt: new Date('2025-02-20'),
  },
  {
    id: 'n2',
    userId: 'u2',
    caseId: 'c1',
    caseNumber: 'EGH-2025-001',
    title: 'Hearing Reminder',
    message: 'Reminder: Hearing scheduled for case EGH-2025-001 on March 15, 2025.',
    type: 'hearing_scheduled',
    isRead: true,
    createdAt: new Date('2025-03-01'),
  },
  {
    id: 'n3',
    userId: 'u3',
    caseId: 'c1',
    caseNumber: 'EGH-2025-001',
    title: 'Document Uploaded',
    message: 'New evidence document uploaded for case EGH-2025-001.',
    type: 'document_uploaded',
    isRead: false,
    createdAt: new Date('2025-02-28'),
  },
];

// Mock Documents
export const mockDocuments: CaseDocument[] = [
  {
    id: 'doc1',
    caseId: 'c1',
    fileName: 'Land_Survey_Report.pdf',
    fileType: 'application/pdf',
    fileSize: 2500000,
    uploadedBy: 'u4',
    uploadedAt: new Date('2025-02-10'),
    documentType: 'evidence',
  },
  {
    id: 'doc2',
    caseId: 'c1',
    fileName: 'Plaintiff_Petition.pdf',
    fileType: 'application/pdf',
    fileSize: 1200000,
    uploadedBy: 'u3',
    uploadedAt: new Date('2025-01-15'),
    documentType: 'petition',
  },
  {
    id: 'doc3',
    caseId: 'c3',
    fileName: 'Trade_Agreement_Contract.pdf',
    fileType: 'application/pdf',
    fileSize: 3500000,
    uploadedBy: 'u3',
    uploadedAt: new Date('2025-01-25'),
    documentType: 'evidence',
  },
];

// Mock Hearings
export const mockHearings: Hearing[] = [
  {
    id: 'h1',
    caseId: 'c1',
    caseNumber: 'EGH-2025-001',
    scheduledDate: new Date('2025-03-15T09:00:00'),
    description: 'Evidence presentation by plaintiff',
    status: 'scheduled',
    createdBy: 'u2',
    createdAt: new Date('2025-02-10'),
  },
  {
    id: 'h2',
    caseId: 'c3',
    caseNumber: 'EGH-2025-003',
    scheduledDate: new Date('2025-03-20T14:00:00'),
    description: 'Initial hearing and case overview',
    status: 'scheduled',
    createdBy: 'u5',
    createdAt: new Date('2025-02-15'),
  },
];

// Dashboard Stats
export const getDashboardStats = (userRole: string, userId?: string): DashboardStats => {
  let cases = mockCases;
  
  if (userRole === 'judge' && userId) {
    cases = mockCases.filter(c => c.assignedJudgeId === userId);
  }
  
  return {
    totalCases: cases.length,
    pendingCases: cases.filter(c => c.status === 'pending').length,
    openCases: cases.filter(c => c.status === 'open').length,
    closedCases: cases.filter(c => c.status === 'closed').length,
    todayHearings: mockHearings.filter(h => {
      const today = new Date();
      const hearingDate = new Date(h.scheduledDate);
      return hearingDate.toDateString() === today.toDateString();
    }).length,
    totalUsers: mockUsers.length,
  };
};

// Password map for demo login
export const userPasswords: Record<string, string> = {
  'admin': 'admin123',
  'judge.abebe': 'judge123',
  'registrar.sara': 'registrar123',
  'clerk.meron': 'clerk123',
  'judge.tigist': 'judge123',
};
