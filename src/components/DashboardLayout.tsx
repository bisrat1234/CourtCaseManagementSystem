import { ReactNode, useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72">
        <DashboardHeader 
          title={title} 
          onMenuClick={() => setSidebarOpen(true)}
          showMenuButton
        />
        
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
