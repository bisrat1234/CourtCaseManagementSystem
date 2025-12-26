import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon, Scale, LayoutDashboard, Users, FileText, FolderOpen, Calendar, Settings, Search, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: string[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'judge', 'registrar', 'clerk'] },
  { label: 'User Management', href: '/users', icon: Users, roles: ['admin'] },
  { label: 'Register Case', href: '/register-case', icon: FileText, roles: ['registrar'] },
  { label: 'Case Review', href: '/case-review', icon: FolderOpen, roles: ['judge'] },
  { label: 'Case Management', href: '/case-management', icon: FolderOpen, roles: ['judge', 'clerk'] },
  { label: 'All Cases', href: '/cases', icon: Search, roles: ['admin', 'registrar', 'judge', 'clerk'] },
  { label: 'Hearings', href: '/hearings', icon: Calendar, roles: ['judge', 'clerk'] },
  { label: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
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
                <Scale className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-sm">East Gojjam</h2>
                <p className="text-xs text-sidebar-foreground/70">High Court</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <X className="h-5 w-5" />
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
                  <item.icon className="h-5 w-5" />
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
