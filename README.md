# East Gojjam Court Case Management System

A comprehensive court case management system for East Gojjam courts, built with modern web technologies.

## System Overview

The East Gojjam Court Case Management System is a full-stack web application designed to streamline court operations, case tracking, and administrative tasks. The system provides role-based access control and comprehensive case lifecycle management.

## Getting Started

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- MongoDB database

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd eastgojjamcourtcase

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Start the development servers
npm run dev        # Frontend (http://localhost:5173)
cd backend && npm run dev  # Backend (http://localhost:5000)
```

## Technologies Used

### Frontend
- React 18 with TypeScript
- Vite (build tool and dev server)
- shadcn-ui (UI component library)
- Tailwind CSS (utility-first styling)
- React Router (client-side routing)
- React Hook Form (form handling and validation)
- React Query (server state management)
- Zustand (client state management)

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests
- dotenv for environment configuration

## System Features

### 🔐 Authentication & Authorization
- **Secure Login System**: JWT-based authentication with role-based access control
- **User Roles**: Admin, Judge, Registrar, Clerk with specific permissions
- **Session Management**: Automatic token refresh and secure logout
- **Password Security**: Bcrypt hashing with salt rounds

### 👥 User Management
- **Profile Management**: Users can update personal and professional information
- **Role-Based Dashboards**: Customized interfaces based on user roles
- **User Administration**: Admin can create, update, and manage user accounts
- **Department Assignment**: Users can be assigned to specific court departments

### 📋 Case Management
- **Case Registration**: Complete case filing with plaintiff/defendant information
- **Case Tracking**: Real-time status updates and case progression
- **Case Assignment**: Automatic and manual judge assignment
- **Case Types**: Support for Civil, Criminal, Commercial, Family, and Administrative cases
- **Case Search & Filter**: Advanced search capabilities with multiple filters
- **Case History**: Complete audit trail of case activities

### ⚖️ Court Operations
- **Hearing Scheduling**: Schedule and manage court hearings
- **Calendar Management**: Court calendar with hearing schedules
- **Case Status Tracking**: Real-time updates on case progress
- **Document Management**: Upload and manage case-related documents
- **Notification System**: Automated alerts for important events

### 📊 Dashboard & Analytics
- **Role-Specific Dashboards**: Customized views for different user roles
- **Case Statistics**: Real-time metrics and case analytics
- **Performance Metrics**: Court efficiency and case resolution statistics
- **Pending Cases**: Quick access to cases requiring attention
- **Upcoming Hearings**: Calendar view of scheduled hearings

### 🏛️ Public Portal
- **Case Status Inquiry**: Public access to case status information
- **Court Information**: General court information and procedures
- **Contact Information**: Court contact details and location
- **Public Announcements**: Court notices and announcements

## User Roles & Permissions

### 👨‍💼 Administrator
- Full system access and configuration
- User management (create, update, delete users)
- System settings and configuration
- Complete case oversight
- System analytics and reporting

### ⚖️ Judge
- Case review and decision making
- Hearing scheduling and management
- Case assignment acceptance/rejection
- Judgment and ruling entry
- Case status updates

### 📝 Registrar
- Case registration and filing
- Initial case processing
- Document verification
- Case assignment to judges
- Public portal management

### 👩‍💻 Clerk
- Case documentation and filing
- Hearing scheduling assistance
- Document management
- Case status updates
- Administrative support

## Database Schema

### Core Collections
- **Users**: System users with roles and permissions
- **Cases**: Court cases with complete lifecycle tracking
- **Parties**: Plaintiffs and defendants information
- **Hearings**: Court session scheduling and management
- **Documents**: Case-related file management
- **Judgments**: Court decisions and rulings
- **Payments**: Court fees and financial transactions
- **Notifications**: System alerts and communications
- **AuditLogs**: Complete system activity tracking

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (Admin only)

### User Management
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password

### Case Management
- `GET /api/cases` - Get cases with filtering
- `POST /api/cases` - Create new case
- `GET /api/cases/:id` - Get case details
- `PUT /api/cases/:id` - Update case
- `PATCH /api/cases/:id/assign-judge` - Assign judge to case

### Hearing Management
- `GET /api/hearings` - Get hearings
- `POST /api/hearings` - Schedule hearing
- `PUT /api/hearings/:id` - Update hearing

## Database Configuration

The system connects to MongoDB using the following configuration:
- **Database**: MongoDB Atlas
- **Connection**: Cluster0.5ojpbcv.mongodb.net
- **Authentication**: Username/Password based
- **Database Name**: eastgojjam_court

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds for password security
- **Role-Based Access Control**: Granular permissions based on user roles
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured cross-origin resource sharing
- **Environment Variables**: Sensitive data stored in environment variables

## Development Features

- **Hot Reload**: Instant development feedback with Vite
- **TypeScript**: Type safety and better development experience
- **ESLint**: Code quality and consistency enforcement
- **Responsive Design**: Mobile-first responsive interface
- **Component Library**: Reusable UI components with shadcn-ui
- **State Management**: Efficient state handling with React Query

## Demo Credentials

For testing purposes, use these credentials:

- **Admin**: `admin` / `admin123`
- **Judge**: `judge.abebe` / `judge123`
- **Registrar**: `registrar.sara` / `registrar123`
- **Clerk**: `clerk.meron` / `clerk123`

## System Requirements

- **Node.js**: Version 16 or higher
- **MongoDB**: Version 4.4 or higher
- **Browser**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Memory**: Minimum 4GB RAM recommended
- **Storage**: 1GB free space for development

## Deployment

### Frontend Deployment
```sh
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```sh
# Set environment variables
# Deploy to your Node.js hosting service
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For technical support or questions, contact the development team or create an issue in the repository.
