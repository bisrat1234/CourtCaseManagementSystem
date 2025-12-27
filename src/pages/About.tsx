import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="p-4 rounded-xl bg-accent inline-block mb-4">
            <div className="h-12 w-12 bg-accent-foreground rounded mx-auto" />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-4">East Gojjam Court Case Management System</h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            A comprehensive digital solution for streamlining court operations, case tracking, and judicial administration in East Gojjam High Court.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* System Overview */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">System Overview</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">🔐 Authentication</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm">
                <p>Secure JWT-based login system with role-based access control for different user types.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">📋 Case Management</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm">
                <p>Complete case lifecycle management from registration to judgment with real-time tracking.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">👥 User Management</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm">
                <p>Role-based user system with profile management for judges, clerks, registrars, and admins.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">📊 Analytics</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm">
                <p>Real-time dashboards with case statistics, performance metrics, and court efficiency tracking.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* User Roles */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">User Roles & Responsibilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>👨‍💼 Administrator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Full system access and configuration</p>
                <p>• User management (create, update, delete users)</p>
                <p>• System settings and analytics</p>
                <p>• Complete case oversight</p>
                <p>• System reporting and monitoring</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚖️ Judge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Case review and decision making</p>
                <p>• Hearing scheduling and management</p>
                <p>• Case assignment acceptance/rejection</p>
                <p>• Judgment and ruling entry</p>
                <p>• Case status updates</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📝 Registrar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Case registration and filing</p>
                <p>• Initial case processing</p>
                <p>• Document verification</p>
                <p>• Case assignment to judges</p>
                <p>• Public portal management</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>👩‍💻 Clerk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Case documentation and filing</p>
                <p>• Hearing scheduling assistance</p>
                <p>• Document management</p>
                <p>• Case status updates</p>
                <p>• Administrative support</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Features */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Core System Features</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>📋 Case Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Case registration with plaintiff/defendant info</p>
                <p>• Real-time case status tracking</p>
                <p>• Automatic and manual judge assignment</p>
                <p>• Support for Civil, Criminal, Commercial, Family cases</p>
                <p>• Advanced search and filtering</p>
                <p>• Complete case history and audit trail</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚖️ Court Operations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Hearing scheduling and management</p>
                <p>• Court calendar with hearing schedules</p>
                <p>• Document upload and management</p>
                <p>• Automated notification system</p>
                <p>• Judgment recording and tracking</p>
                <p>• Payment and fee management</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🏛️ Public Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Public case status inquiry</p>
                <p>• Court information and procedures</p>
                <p>• Contact information and location</p>
                <p>• Public announcements and notices</p>
                <p>• Online case tracking</p>
                <p>• Court schedule information</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technical Architecture */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Technical Architecture</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🖥️ Frontend Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• React 18 with TypeScript</p>
                <p>• Vite (build tool and dev server)</p>
                <p>• shadcn-ui (UI component library)</p>
                <p>• Tailwind CSS (utility-first styling)</p>
                <p>• React Router (client-side routing)</p>
                <p>• React Hook Form (form handling)</p>
                <p>• React Query (server state management)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🔧 Backend Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Node.js with Express.js</p>
                <p>• MongoDB with Mongoose ODM</p>
                <p>• JWT (JSON Web Tokens) authentication</p>
                <p>• bcryptjs for password hashing</p>
                <p>• CORS for cross-origin requests</p>
                <p>• RESTful API architecture</p>
                <p>• Environment-based configuration</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Database Schema */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Database Collections</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Users', desc: 'System users with roles and permissions' },
              { name: 'Cases', desc: 'Court cases with complete lifecycle tracking' },
              { name: 'Parties', desc: 'Plaintiffs and defendants information' },
              { name: 'Hearings', desc: 'Court session scheduling and management' },
              { name: 'Documents', desc: 'Case-related file management' },
              { name: 'Judgments', desc: 'Court decisions and rulings' },
              { name: 'Payments', desc: 'Court fees and financial transactions' },
              { name: 'Notifications', desc: 'System alerts and communications' },
              { name: 'AuditLogs', desc: 'Complete system activity tracking' }
            ].map((collection) => (
              <Card key={collection.name} className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{collection.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{collection.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Security Features */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Security & Compliance</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div>
                  <h4 className="font-semibold mb-2">🔐 Authentication</h4>
                  <p className="text-sm text-muted-foreground">JWT-based secure authentication with token expiration</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🛡️ Authorization</h4>
                  <p className="text-sm text-muted-foreground">Role-based access control with granular permissions</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🔒 Data Protection</h4>
                  <p className="text-sm text-muted-foreground">Password hashing with bcrypt and salt rounds</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">📋 Audit Trail</h4>
                  <p className="text-sm text-muted-foreground">Complete activity logging and system monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Access the East Gojjam Court Case Management System to streamline your judicial operations.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/login">
                  <Button size="lg">Staff Login</Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg">Public Portal</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;