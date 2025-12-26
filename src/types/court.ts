// User Roles
export type UserRole = 'admin' | 'registrar' | 'judge' | 'clerk' | 'plaintiff' | 'defendant' | 'lawyer';

// Case Status
export type CaseStatus = 'pending' | 'open' | 'suspended' | 'closed' | 'declined';

// Case Type
export type CaseType = 'civil' | 'criminal' | 'commercial' | 'family' | 'administrative';

// User Interface
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

// Party (Plaintiff/Defendant)
export interface Party {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  email?: string;
}

// Case Interface
export interface CourtCase {
  id: string;
  caseNumber: string;
  caseType: CaseType;
  title: string;
  description: string;
  status: CaseStatus;
  plaintiff: Party;
  defendant: Party;
  assignedJudgeId?: string;
  assignedJudgeName?: string;
  registrarId: string;
  registrarName: string;
  filingDate: Date;
  summonDate?: Date;
  nextHearingDate?: Date;
  closedDate?: Date;
  judgement?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Document Interface
export interface CaseDocument {
  id: string;
  caseId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: Date;
  documentType: 'petition' | 'evidence' | 'ruling' | 'witness' | 'defence' | 'other';
}

// Notification Interface
export interface Notification {
  id: string;
  userId: string;
  caseId?: string;
  caseNumber?: string;
  title: string;
  message: string;
  type: 'case_update' | 'hearing_scheduled' | 'document_uploaded' | 'case_accepted' | 'case_declined' | 'system';
  isRead: boolean;
  createdAt: Date;
}

// Hearing/Appointment Interface
export interface Hearing {
  id: string;
  caseId: string;
  caseNumber: string;
  scheduledDate: Date;
  description: string;
  status: 'scheduled' | 'completed' | 'postponed' | 'cancelled';
  createdBy: string;
  createdAt: Date;
}

// Dashboard Stats
export interface DashboardStats {
  totalCases: number;
  pendingCases: number;
  openCases: number;
  closedCases: number;
  todayHearings: number;
  totalUsers?: number;
}

// Auth Context Type
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}
