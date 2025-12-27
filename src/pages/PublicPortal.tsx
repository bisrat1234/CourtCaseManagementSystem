import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Search, FileText, Bell, Shield, Calendar, AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useCases } from '@/contexts/CasesContext';
import { CourtCase } from '@/types/court';
import { StatusBadge } from '@/components/StatusBadge';
import { format } from 'date-fns';
import { useSettings } from '@/contexts/SettingsContext';

const PublicPortal = () => {
  const { settings } = useSettings();
  const { cases } = useCases();
  const [caseNumber, setCaseNumber] = useState('');
  const [searchResult, setSearchResult] = useState<CourtCase | null>(null);
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearched(true);

    // Simulate search delay
    setTimeout(() => {
      const foundCase = cases.find(
        c => c.caseNumber.toLowerCase() === caseNumber.toLowerCase()
      );
      setSearchResult(foundCase || null);
      setIsSearching(false);
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <CheckCircle2 className="h-5 w-5 text-status-open" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-status-pending" />;
      case 'suspended':
        return <AlertCircle className="h-5 w-5 text-status-suspended" />;
      case 'closed':
        return <CheckCircle2 className="h-5 w-5 text-status-closed" />;
      case 'declined':
        return <XCircle className="h-5 w-5 text-status-declined" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
            <div className="p-4 rounded-2xl bg-accent shadow-lg">
              <Scale className="h-12 w-12 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                {settings.courtName}
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Court Case Tracking System - Public Portal
              </p>
            </div>
            <p className="max-w-2xl text-primary-foreground/70">
              Track your court case status, view hearing schedules, and stay informed about your legal proceedings.
            </p>
          </div>
        </div>
      </header>

      {/* Announcement Section */}
      {settings.announcement && (
        <section className="container mx-auto px-4 py-6">
          <Card className="border-l-4 border-l-blue-500 bg-blue-50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Court Announcement</h3>
                  <p className="text-blue-800 text-sm">{settings.announcement}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Search Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <Card className="max-w-2xl mx-auto shadow-elegant animate-slide-up">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-serif">Search Your Case</CardTitle>
            <CardDescription>
              Enter your case number to view the current status and details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Enter case number (e.g., EGH-2025-001)"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <Button type="submit" size="lg" disabled={isSearching}>
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </form>

            {/* Search Result */}
            {searched && !isSearching && (
              <div className="mt-6 animate-fade-in">
                {searchResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-status-open">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Case Found</span>
                    </div>
                    
                    <Card className="border-2 border-primary/20">
                      <CardContent className="pt-6 space-y-4">
                        {/* Case Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Case Number</p>
                            <p className="font-mono font-bold text-lg text-primary">
                              {searchResult.caseNumber}
                            </p>
                          </div>
                          <StatusBadge status={searchResult.status} />
                        </div>

                        {/* Case Title */}
                        <div>
                          <p className="text-sm text-muted-foreground">Case Title</p>
                          <p className="font-serif font-semibold">{searchResult.title}</p>
                        </div>

                        {/* Case Details Grid */}
                        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                          <div>
                            <p className="text-sm text-muted-foreground">Case Type</p>
                            <p className="font-medium capitalize">{searchResult.caseType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Filing Date</p>
                            <p className="font-medium">
                              {format(new Date(searchResult.filingDate), 'MMMM dd, yyyy')}
                            </p>
                          </div>
                          {searchResult.assignedJudgeName && (
                            <div>
                              <p className="text-sm text-muted-foreground">Assigned Judge</p>
                              <p className="font-medium">{searchResult.assignedJudgeName}</p>
                            </div>
                          )}
                          {searchResult.nextHearingDate && (
                            <div>
                              <p className="text-sm text-muted-foreground">Next Hearing</p>
                              <p className="font-medium text-primary">
                                {format(new Date(searchResult.nextHearingDate), 'MMMM dd, yyyy')}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Parties */}
                        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                          <div>
                            <p className="text-sm text-muted-foreground">Plaintiff</p>
                            <p className="font-medium">{searchResult.plaintiff.fullName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Defendant</p>
                            <p className="font-medium">{searchResult.defendant.fullName}</p>
                          </div>
                        </div>

                        {/* Judgement if closed */}
                        {searchResult.status === 'closed' && searchResult.judgement && (
                          <div className="pt-4 border-t border-border">
                            <p className="text-sm text-muted-foreground">Judgement</p>
                            <p className="font-medium">{searchResult.judgement}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-muted">
                    <AlertCircle className="h-10 w-10 text-muted-foreground" />
                    <p className="text-muted-foreground font-medium">No case found</p>
                    <p className="text-sm text-muted-foreground text-center">
                      Please verify your case number and try again. If you believe this is an error, 
                      please contact the court registrar.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-serif font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Search className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-serif font-semibold text-lg">Search Your Case</h3>
            <p className="text-muted-foreground text-sm">
              Enter your unique case number to instantly access your case information.
            </p>
          </div>
          
          <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <FileText className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-serif font-semibold text-lg">View Details</h3>
            <p className="text-muted-foreground text-sm">
              See your case status, assigned judge, hearing dates, and case progress.
            </p>
          </div>
          
          <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Calendar className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-serif font-semibold text-lg">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Track upcoming hearings and important dates related to your case.
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border-l-4 border-l-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-serif flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                Need Assistance?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                For any inquiries regarding your case, please visit the East Gojjam High Court 
                registrar's office or contact us during working hours.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-serif flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Staff Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Court staff can access the full system to manage cases, schedules, and documents.
              </p>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Staff Login →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-serif flex items-center gap-2">
                <FileText className="h-5 w-5 text-secondary" />
                About System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Learn more about the complete court case management system and its features.
              </p>
              <Link to="/about">
                <Button variant="outline" size="sm">
                  Learn More →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scale className="h-5 w-5 text-primary" />
            <span className="font-serif font-semibold">{settings.courtName}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {settings.address}
          </p>
          <p className="text-sm text-muted-foreground">
            Phone: {settings.phone} | Email: {settings.email}
          </p>
          <p className="text-sm text-muted-foreground">
            Working Hours: {settings.workingHours}
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            © 2025 Court Case Tracking System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicPortal;
