import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  roles: string[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', roles: ['admin', 'judge', 'registrar', 'clerk'] },
  { label: 'Profile', href: '/profile', roles: ['admin', 'judge', 'registrar', 'clerk'] },
  { label: 'User Management', href: '/users', roles: ['admin'] },
  { label: 'Register Case', href: '/register-case', roles: ['registrar'] },
  { label: 'Case Review', href: '/case-review', roles: ['judge'] },
  { label: 'Case Management', href: '/case-management', roles: ['judge', 'clerk'] },
  { label: 'All Cases', href: '/cases', roles: ['admin', 'registrar', 'judge', 'clerk'] },
  { label: 'Hearings', href: '/hearings', roles: ['judge', 'clerk'] },
  { label: 'Settings', href: '/settings', roles: ['admin'] },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { settings } = useSettings();
  const location = useLocation();

  const filteredItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-72 bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sidebar-primary">
                <div className="h-5 w-5 bg-sidebar-primary-foreground rounded" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-sm">{settings.courtName.split(' ')[0]} {settings.courtName.split(' ')[1]}</h2>
                <p className="text-xs text-sidebar-foreground/70">High Court</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            >
              ×
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {filteredItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/50 text-center">
              Court Case Tracking System
            </p>
            <p className="text-xs text-sidebar-foreground/50 text-center mt-1">
              v1.0.0 © 2025
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
