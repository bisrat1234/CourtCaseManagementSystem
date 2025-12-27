import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/contexts/SettingsContext';

const Settings = () => {
  const { toast } = useToast();
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings);

  const handleSave = () => {
    updateSettings(formData);
    toast({
      title: 'Settings Saved',
      description: 'System settings have been updated successfully.',
    });
  };

  const handleReset = () => {
    const defaultSettings = {
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
    setFormData(defaultSettings);
    updateSettings(defaultSettings);
    toast({
      title: 'Settings Reset',
      description: 'All settings have been reset to default values.',
    });
  };

  return (
    <DashboardLayout title="System Settings">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground">System Configuration</h2>
          <p className="text-muted-foreground">Manage court system settings and preferences</p>
        </div>

        {/* Court Information */}
        <Card>
          <CardHeader>
            <CardTitle>🏛️ Court Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courtName">Court Name</Label>
                <Input
                  id="courtName"
                  value={formData.courtName}
                  onChange={(e) => setFormData(prev => ({ ...prev, courtName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workingHours">Working Hours</Label>
                <Input
                  id="workingHours"
                  value={formData.workingHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, workingHours: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>⚙️ System Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoAssignment">Automatic Case Assignment</Label>
                <p className="text-sm text-muted-foreground">Automatically assign cases to available judges</p>
              </div>
              <Switch
                id="autoAssignment"
                checked={formData.autoAssignment}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autoAssignment: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="publicAccess">Public Portal Access</Label>
                <p className="text-sm text-muted-foreground">Allow public case status inquiries</p>
              </div>
              <Switch
                id="publicAccess"
                checked={formData.publicAccess}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, publicAccess: checked }))}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxCases">Max Cases per Judge</Label>
                <Input
                  id="maxCases"
                  type="number"
                  value={formData.maxCasesPerJudge}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxCasesPerJudge: parseInt(e.target.value) }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hearingDuration">Default Hearing Duration (minutes)</Label>
                <Input
                  id="hearingDuration"
                  type="number"
                  value={formData.hearingDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, hearingDuration: parseInt(e.target.value) }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>🔔 Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send email alerts for case updates</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={formData.emailNotifications}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Send SMS alerts for urgent updates</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={formData.smsNotifications}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, smsNotifications: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Public Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>📢 Public Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="announcement">Current Announcement</Label>
              <Textarea
                id="announcement"
                value={formData.announcement}
                onChange={(e) => setFormData(prev => ({ ...prev, announcement: e.target.value }))}
                rows={3}
                placeholder="Enter public announcement message..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;