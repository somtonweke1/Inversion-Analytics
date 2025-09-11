# Inversion Analytics MVP

A comprehensive web application that automates the "Axiom Health Report" process for GAC (Granular Activated Carbon) system analysis. The platform allows data center operators to request reports, submit technical data, and receive professionally generated PDF analyses.

## Features

- **Marketing Homepage**: Sleek, professional landing page with contact form
- **Data Collection Form**: Comprehensive technical questionnaire with validation
- **Advanced Analysis Engine**: Freundlich Isotherm modeling and Monte Carlo simulation
- **PDF Report Generation**: Professional, investor-ready reports
- **Email Integration**: Automated email notifications via Resend
- **Admin Dashboard**: Management interface for monitoring requests and reports
- **Authentication**: Secure admin access with Next-Auth

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **PDF Generation**: @react-pdf/renderer
- **Authentication**: Next-Auth
- **Email**: Resend.com with React Email
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Resend.com API key (for email functionality)

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd axiom-mvp
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/axiom_mvp?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Resend (for email functionality)
RESEND_API_KEY="your-resend-api-key-here"

# Admin Access
ADMIN_EMAIL="admin@axiomanalytics.com"
ADMIN_PASSWORD="admin123"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Marketing homepage
│   ├── data-form/[id]/    # Data submission form
│   ├── report/[id]/       # Report display page
│   ├── admin/             # Admin dashboard and login
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Shadcn/UI components
│   └── emails/           # Email templates
├── lib/                  # Utility functions
│   ├── prisma.ts         # Database client
│   ├── auth.ts           # Authentication config
│   ├── validations.ts    # Zod schemas
│   ├── analysis-engine.ts # GAC analysis algorithms
│   ├── pdf-generator.ts  # PDF report generation
│   └── email.ts          # Email service
└── prisma/               # Database schema
    └── schema.prisma
```

## 🔧 Key Components

### Analysis Engine (`lib/analysis-engine.ts`)

Implements advanced GAC system analysis including:
- Freundlich Isotherm modeling for capacity estimation
- Monte Carlo simulation for uncertainty analysis
- Economic optimization calculations
- Risk assessment and safety factors

### PDF Generator (`lib/pdf-generator.ts`)

Creates professional PDF reports with:
- Executive summary with key metrics
- Detailed system configuration
- Water quality parameters
- GAC properties and performance analysis
- Key findings and recommendations

### Email System (`lib/email.ts`)

Automated email notifications:
- Data form invitation emails
- Report ready notifications
- Admin notifications for new reports

## 🎯 User Flow

1. **Landing Page**: User visits homepage and clicks "Request Your Free Report"
2. **Contact Form**: User submits company and contact information
3. **Email Invitation**: User receives email with secure link to data form
4. **Data Submission**: User completes comprehensive technical questionnaire
5. **Analysis Processing**: System runs advanced modeling algorithms
6. **Report Generation**: PDF report is generated and stored
7. **Notification**: User and admin receive email notifications
8. **Report Access**: User can view and download their analysis report

## 🔐 Admin Access

- **Login**: `/admin/login`
- **Dashboard**: `/admin/dashboard`
- **Default Credentials**: 
  - Email: `admin@axiomanalytics.com`
  - Password: `admin123`

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database Setup

For production, use a managed PostgreSQL service like:
- Neon.tech
- Supabase
- PlanetScale
- AWS RDS

## 📊 Analysis Features

### Freundlich Isotherm Modeling
- Capacity estimation based on PFAS concentration
- Water quality factor adjustments
- System type considerations

### Monte Carlo Simulation
- 5,000 iteration uncertainty analysis
- P95 confidence intervals
- Risk assessment metrics

### Economic Analysis
- Cost per million gallons treated
- Capital avoidance calculations
- ROI projections

## 🛡 Security Features

- Input validation with Zod schemas
- Secure unique tokens (CUIDs)
- Server-side data processing
- Protected admin routes
- Email verification workflow

## 📈 Performance Optimizations

- Server-side PDF generation
- Efficient database queries
- Optimized React components
- Static asset optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software for Inversion Analytics.

## 📞 Support

For technical support or questions:
- Email: somtonwekec@gmail.com
- Documentation: [Link to docs]

---

**Built with ❤️ for water treatment optimization**
