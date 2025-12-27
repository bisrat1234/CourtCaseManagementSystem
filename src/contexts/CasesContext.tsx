import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CourtCase, CaseType } from '@/types/court';
import { mockCases } from '@/data/mockData';

interface CasesContextType {
  cases: CourtCase[];
  addCase: (caseData: any) => CourtCase;
  updateCase: (caseId: string, updates: Partial<CourtCase>) => void;
  getCasesByStatus: (status: string) => CourtCase[];
  getCasesByJudge: (judgeId: string) => CourtCase[];
  assignJudgeToCase: (caseId: string, judgeId: string, judgeName: string) => void;
}

const CasesContext = createContext<CasesContextType | undefined>(undefined);

export const CasesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<CourtCase[]>(() => {
    const saved = localStorage.getItem('courtCases');
    return saved ? JSON.parse(saved) : mockCases;
  });

  const saveCases = (newCases: CourtCase[]) => {
    setCases(newCases);
    localStorage.setItem('courtCases', JSON.stringify(newCases));
  };

  const generateCaseNumber = () => {
    const year = new Date().getFullYear();
    const count = cases.length + 1;
    return `EGH-${year}-${count.toString().padStart(3, '0')}`;
  };

  const addCase = (caseData: any): CourtCase => {
    const newCase: CourtCase = {
      id: `c${Date.now()}`,
      caseNumber: generateCaseNumber(),
      caseType: caseData.caseType,
      title: caseData.title,
      description: caseData.description,
      status: 'pending',
      plaintiff: {
        id: `p${Date.now()}`,
        fullName: caseData.plaintiffName,
        phone: caseData.plaintiffPhone,
        address: caseData.plaintiffAddress,
        email: caseData.plaintiffEmail
      },
      defendant: {
        id: `d${Date.now()}`,
        fullName: caseData.defendantName,
        phone: caseData.defendantPhone,
        address: caseData.defendantAddress,
        email: caseData.defendantEmail
      },
      registrarId: caseData.registrarId,
      registrarName: caseData.registrarName,
      filingDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedCases = [...cases, newCase];
    saveCases(updatedCases);
    return newCase;
  };

  const updateCase = (caseId: string, updates: Partial<CourtCase>) => {
    const updatedCases = cases.map(c => 
      c.id === caseId 
        ? { ...c, ...updates, updatedAt: new Date() }
        : c
    );
    saveCases(updatedCases);
  };

  const getCasesByStatus = (status: string) => {
    return cases.filter(c => c.status === status);
  };

  const getCasesByJudge = (judgeId: string) => {
    return cases.filter(c => c.assignedJudgeId === judgeId);
  };

  const assignJudgeToCase = (caseId: string, judgeId: string, judgeName: string) => {
    updateCase(caseId, {
      assignedJudgeId: judgeId,
      assignedJudgeName: judgeName,
      status: 'open'
    });
  };

  return (
    <CasesContext.Provider value={{
      cases,
      addCase,
      updateCase,
      getCasesByStatus,
      getCasesByJudge,
      assignJudgeToCase
    }}>
      {children}
    </CasesContext.Provider>
  );
};

export const useCases = (): CasesContextType => {
  const context = useContext(CasesContext);
  if (!context) {
    throw new Error('useCases must be used within a CasesProvider');
  }
  return context;
};