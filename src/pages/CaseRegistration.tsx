import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, User, Scale, CheckCircle2 } from 'lucide-react';
import { CaseType, CourtCase } from '@/types/court';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/data/mockData';

const CaseRegistration = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newCaseNumber, setNewCaseNumber] = useState('');

  const [formData, setFormData] = useState({
    caseType: '' as CaseType,
    title: '',
    description: '',
    plaintiffName: '',
    plaintiffPhone: '',
    plaintiffAddress: '',
    plaintiffEmail: '',
    defendantName: '',
    defendantPhone: '',
    defendantAddress: '',
    defendantEmail: '',
  });

  const judges = mockUsers.filter(u => u.role === 'judge' && u.status === 'active');

  const generateCaseNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 900) + 100;
    return `EGH-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const caseNumber = generateCaseNumber();
      setNewCaseNumber(caseNumber);
      setIsSuccess(true);
      setIsSubmitting(false);
      
      toast({
        title: 'Case Registered Successfully',
        description: `Case number ${caseNumber} has been created.`,
      });
    }, 1500);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setNewCaseNumber('');
    setFormData({
      caseType: '' as CaseType,
      title: '',
      description: '',
      plaintiffName: '',
      plaintiffPhone: '',
      plaintiffAddress: '',
      plaintiffEmail: '',
      defendantName: '',
      defendantPhone: '',
      defendantAddress: '',
      defendantEmail: '',
    });
  };

  if (isSuccess) {
    return (
      <DashboardLayout title="Case Registration">
        <div className="max-w-2xl mx-auto">
          <Card className="animate-scale-in">
            <CardContent className="pt-12 pb-10 text-center">
              <div className="w-20 h-20 rounded-full bg-status-open/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-status-open" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                Case Registered Successfully!
              </h2>
              <p className="text-muted-foreground mb-6">
                The case has been registered and is pending review by a judge.
              </p>
              <div className="p-4 bg-muted rounded-lg mb-8">
                <p className="text-sm text-muted-foreground">Case Number</p>
                <p className="text-2xl font-mono font-bold text-primary">{newCaseNumber}</p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleReset}>
                  Register Another Case
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/cases'}>
                  View All Cases
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Case Registration">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-serif font-bold text-foreground">Register New Case</h2>
          <p className="text-muted-foreground">
            Enter the case details to register a new court case.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Case Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Case Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="caseType">Case Type *</Label>
                  <Select
                    value={formData.caseType}
                    onValueChange={(value: CaseType) => setFormData(prev => ({ ...prev, caseType: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select case type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="civil">Civil</SelectItem>
                      <SelectItem value="criminal">Criminal</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="administrative">Administrative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Case Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter case title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Case Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the case..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Plaintiff Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Plaintiff Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plaintiffName">Full Name *</Label>
                  <Input
                    id="plaintiffName"
                    placeholder="Enter plaintiff's full name"
                    value={formData.plaintiffName}
                    onChange={(e) => setFormData(prev => ({ ...prev, plaintiffName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plaintiffPhone">Phone Number *</Label>
                  <Input
                    id="plaintiffPhone"
                    placeholder="+251..."
                    value={formData.plaintiffPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, plaintiffPhone: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plaintiffAddress">Address *</Label>
                  <Input
                    id="plaintiffAddress"
                    placeholder="Enter address"
                    value={formData.plaintiffAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, plaintiffAddress: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plaintiffEmail">Email (Optional)</Label>
                  <Input
                    id="plaintiffEmail"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.plaintiffEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, plaintiffEmail: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Defendant Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Defendant Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defendantName">Full Name *</Label>
                  <Input
                    id="defendantName"
                    placeholder="Enter defendant's full name"
                    value={formData.defendantName}
                    onChange={(e) => setFormData(prev => ({ ...prev, defendantName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defendantPhone">Phone Number</Label>
                  <Input
                    id="defendantPhone"
                    placeholder="+251..."
                    value={formData.defendantPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, defendantPhone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defendantAddress">Address</Label>
                  <Input
                    id="defendantAddress"
                    placeholder="Enter address"
                    value={formData.defendantAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, defendantAddress: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defendantEmail">Email (Optional)</Label>
                  <Input
                    id="defendantEmail"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.defendantEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, defendantEmail: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleReset}>
              Clear Form
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register Case'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CaseRegistration;
