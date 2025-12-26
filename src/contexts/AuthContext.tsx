import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, AuthContextType } from '@/types/court';
import { mockUsers, userPasswords } from '@/data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('courtUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.username === username);
    
    if (foundUser && userPasswords[username] === password && foundUser.status === 'active') {
      setUser(foundUser);
      localStorage.setItem('courtUser', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('courtUser');
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
