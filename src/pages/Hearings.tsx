import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { mockHearings, mockCases } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const Hearings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [hearings, setHearings] = useState(mockHearings);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    caseId: '',
    date: '',
    time: '',
    courtRoom: '',
    type: '',
    description: ''
  });

  const availableCases = mockCases.filter(c => 
    user?.role === 'judge' ? c.assignedJudgeId === user.id : true
  );

  const handleCreateHearing = () => {
    const selectedCase = availableCases.find(c => c.id === formData.caseId);
    if (!selectedCase) return;

    const newHearing = {
      id: `h${Date.now()}`,
      caseId: formData.caseId,
      caseNumber: selectedCase.caseNumber,
      scheduledDate: new Date(`${formData.date}T${formData.time}`),
      description: formData.description,
      status: 'scheduled' as const,
      createdBy: user?.id || '',
      createdAt: new Date()
    };

    setHearings(prev => [...prev, newHearing]);
    setIsCreateOpen(false);
    setFormData({ caseId: '', date: '', time: '', courtRoom: '', type: '', description: '' });
    
    toast({
      title: 'Hearing Scheduled',
      description: `Hearing for case ${selectedCase.caseNumber} has been scheduled.`,
    });
  };

  const updateHearingStatus = (hearingId: string, status: string) => {
    setHearings(prev => prev.map(h => 
      h.id === hearingId ? { ...h, status: status as any } : h
    ));
    
    toast({
      title: 'Status Updated',
      description: `Hearing status has been updated to ${status}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-session': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'postponed': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Hearing Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground">Court Hearings</h2>
            <p className="text-muted-foreground">Schedule and manage court hearing sessions</p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>📅 Schedule Hearing</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Hearing</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Case</Label>
                  <Select value={formData.caseId} onValueChange={(value) => setFormData(prev => ({ ...prev, caseId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select case" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCases.map(case_ => (
                        <SelectItem key={case_.id} value={case_.id}>
                          {case_.caseNumber} - {case_.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Court Room</Label>
                  <Input
                    placeholder="e.g., Court Room 1"
                    value={formData.courtRoom}
                    onChange={(e) => setFormData(prev => ({ ...prev, courtRoom: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Hearing Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="initial">Initial Hearing</SelectItem>
                      <SelectItem value="preliminary">Preliminary Hearing</SelectItem>
                      <SelectItem value="main">Main Hearing</SelectItem>
                      <SelectItem value="final">Final Hearing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Hearing description..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateHearing}>Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Hearings List */}
        <div className="space-y-4">
          {hearings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No hearings scheduled
              </CardContent>
            </Card>
          ) : (
            hearings.map((hearing) => (
              <Card key={hearing.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-primary font-semibold">{hearing.caseNumber}</p>
                      <CardTitle className="text-lg font-serif">
                        {format(new Date(hearing.scheduledDate), 'EEEE, MMMM dd, yyyy')}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(hearing.scheduledDate), 'h:mm a')}
                      </p>
                    </div>
                    <Badge className={getStatusColor(hearing.status)}>
                      {hearing.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{hearing.description}</p>
                  
                  <div className="flex gap-2 pt-4 border-t">
                    {hearing.status === 'scheduled' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => updateHearingStatus(hearing.id, 'in-session')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Start Session
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateHearingStatus(hearing.id, 'postponed')}
                        >
                          Postpone
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updateHearingStatus(hearing.id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    
                    {hearing.status === 'in-session' && (
                      <Button 
                        size="sm"
                        onClick={() => updateHearingStatus(hearing.id, 'completed')}
                      >
                        Complete Session
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Hearings;