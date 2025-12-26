import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { CaseCard } from '@/components/CaseCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockCases, mockHearings, getDashboardStats } from '@/data/mockData';
import { FileText, FolderOpen, CheckCircle2, Clock, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const stats = getDashboardStats(user?.role || '', user?.id);

  // Get cases based on role
  const getRelevantCases = () => {
    if (user?.role === 'judge') {
      return mockCases.filter(c => c.assignedJudgeId === user.id).slice(0, 4);
    }
    return mockCases.slice(0, 4);
  };

  const upcomingHearings = mockHearings
    .filter(h => new Date(h.scheduledDate) >= new Date())
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 5);

  const pendingCases = mockCases.filter(c => c.status === 'pending').slice(0, 3);

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'admin':
        return 'Administrator Dashboard';
      case 'judge':
        return 'Judge Dashboard';
      case 'registrar':
        return 'Registrar Dashboard';
      case 'clerk':
        return 'Clerk Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <DashboardLayout title={getRoleTitle()}>
      <div className="space-y-8">
        {/* Welcome Message */}
        <div className="animate-fade-in">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-1">
            Welcome back, {user?.fullName.split(' ')[0]}
          </h2>
          <p className="text-muted-foreground">
            Here's an overview of your court case management activities.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Cases"
            value={stats.totalCases}
            icon={FileText}
            description="All registered cases"
          />
          <StatCard
            title="Pending Review"
            value={stats.pendingCases}
            icon={Clock}
            description="Awaiting judge decision"
          />
          <StatCard
            title="Open Cases"
            value={stats.openCases}
            icon={FolderOpen}
            description="Active proceedings"
          />
          <StatCard
            title="Closed Cases"
            value={stats.closedCases}
            icon={CheckCircle2}
            description="Resolved cases"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Cases */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-serif flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-primary" />
                  Recent Cases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getRelevantCases().map((courtCase, index) => (
                  <div 
                    key={courtCase.id} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CaseCard courtCase={courtCase} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Upcoming Hearings */}
            <Card className="animate-slide-in-right">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-serif flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Upcoming Hearings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingHearings.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingHearings.map((hearing) => (
                      <div 
                        key={hearing.id}
                        className="p-3 rounded-lg bg-muted/50 border border-border/50"
                      >
                        <p className="font-mono text-sm font-semibold text-primary">
                          {hearing.caseNumber}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {hearing.description}
                        </p>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {format(new Date(hearing.scheduledDate), 'MMM dd, yyyy • HH:mm')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming hearings scheduled
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Pending for Review (for judges) */}
            {(user?.role === 'judge' || user?.role === 'admin') && pendingCases.length > 0 && (
              <Card className="animate-slide-in-right border-l-4 border-l-status-pending">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <Clock className="h-5 w-5 text-status-pending" />
                    Pending Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingCases.map((courtCase) => (
                      <div 
                        key={courtCase.id}
                        className="p-3 rounded-lg bg-muted/50 border border-border/50"
                      >
                        <p className="font-mono text-sm font-semibold text-primary">
                          {courtCase.caseNumber}
                        </p>
                        <p className="text-sm font-medium mt-1 line-clamp-1">
                          {courtCase.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Filed: {format(new Date(courtCase.filingDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats for Admin */}
            {user?.role === 'admin' && (
              <Card className="animate-slide-in-right">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    System Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold font-serif text-foreground">
                    {stats.totalUsers}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Active system users
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
