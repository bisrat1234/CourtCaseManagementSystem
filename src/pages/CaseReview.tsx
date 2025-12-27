import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { useCases } from '@/contexts/CasesContext';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const CaseReview = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { getCasesByStatus, assignJudgeToCase, updateCase } = useCases();
  const [acceptDialog, setAcceptDialog] = useState<string | null>(null);
  const [summonDate, setSummonDate] = useState('');

  const pendingCases = getCasesByStatus('pending');

  const handleAccept = (caseId: string) => {
    if (user) {
      assignJudgeToCase(caseId, user.id, user.fullName);
      updateCase(caseId, {
        summonDate: new Date(summonDate),
        status: 'open'
      });
    }
    setAcceptDialog(null);
    setSummonDate('');
    toast({ 
      title: 'Case Accepted', 
      description: 'The case has been assigned to you and summon date set.' 
    });
  };

  const handleDecline = (caseId: string) => {
    updateCase(caseId, { status: 'declined' });
    toast({ 
      title: 'Case Declined', 
      description: 'The case has been declined and will be reassigned.' 
    });
  };

  return (
    <DashboardLayout title="Case Review">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-bold">Pending Cases for Review</h2>
          <p className="text-muted-foreground">Review and decide on newly submitted cases</p>
        </div>

        {pendingCases.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No pending cases to review</CardContent></Card>
        ) : (
          <div className="space-y-4">
            {pendingCases.map((courtCase) => (
              <Card key={courtCase.id} className="border-l-4 border-l-status-pending">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-primary font-semibold">{courtCase.caseNumber}</p>
                      <CardTitle className="text-lg font-serif">{courtCase.title}</CardTitle>
                    </div>
                    <StatusBadge status={courtCase.status} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{courtCase.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Plaintiff:</span> {courtCase.plaintiff.fullName}</div>
                    <div><span className="text-muted-foreground">Defendant:</span> {courtCase.defendant.fullName}</div>
                    <div><span className="text-muted-foreground">Filed:</span> {format(new Date(courtCase.filingDate), 'MMM dd, yyyy')}</div>
                    <div><span className="text-muted-foreground">Type:</span> <span className="capitalize">{courtCase.caseType}</span></div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t">
                    <Button onClick={() => setAcceptDialog(courtCase.id)} className="bg-status-open hover:bg-status-open/90">
                      ✅ Accept Case
                    </Button>
                    <Button variant="destructive" onClick={() => handleDecline(courtCase.id)}>
                      ❌ Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={!!acceptDialog} onOpenChange={() => setAcceptDialog(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Set Summon Date</DialogTitle></DialogHeader>
            <div className="space-y-2 py-4">
              <Label>Summon Date</Label>
              <Input type="date" value={summonDate} onChange={(e) => setSummonDate(e.target.value)} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAcceptDialog(null)}>Cancel</Button>
              <Button onClick={() => acceptDialog && handleAccept(acceptDialog)}>Accept & Set Date</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default CaseReview;
