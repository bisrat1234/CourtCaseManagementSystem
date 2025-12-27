import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CourtSettings {
  courtName: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  autoAssignment: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  publicAccess: boolean;
  maxCasesPerJudge: number;
  hearingDuration: number;
  announcement: string;
}

interface SettingsContextType {
  settings: CourtSettings;
  updateSettings: (newSettings: Partial<CourtSettings>) => void;
}

const defaultSettings: CourtSettings = {
  courtName: 'East Gojjam High Court',
  address: 'Debre Markos, Amhara Region, Ethiopia',
  phone: '+251-58-881-1234',
  email: 'info@eastgojjamcourt.gov.et',
  workingHours: '8:00 AM - 5:00 PM',
  autoAssignment: true,
  emailNotifications: true,
  smsNotifications: false,
  publicAccess: true,
  maxCasesPerJudge: 50,
  hearingDuration: 60,
  announcement: 'Court operations are running normally. Please check your case status regularly.'
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CourtSettings>(() => {
    const saved = localStorage.getItem('courtSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const updateSettings = (newSettings: Partial<CourtSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('courtSettings', JSON.stringify(updated));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};