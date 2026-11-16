# Affiliate Platform

Admin panel & affiliate portal untuk mengelola program affiliate di ERPNext.

## Features

- **Admin Panel**: Manage affiliates, commission rules, payouts
- **Affiliate Dashboard**: Track earnings, sales, referrals
- **Commission Tracking**: Automatic calculation & payment batching
- **Multi-tier Product Support**: Physical, Digital, Service products

## Tech Stack

- Next.js 16.4 (App Router)
- React 19
- TypeScript
- Custom CSS (no Tailwind)

## Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your ERPNext credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/               # Next.js App Router pages
│   ├── (app)/        # Authenticated routes
│   │   ├── admin/    # Admin panel
│   │   └── affiliate/# Affiliate portal
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── admin/        # Admin-specific components
│   ├── affiliate/    # Affiliate-specific components
│   └── ui/           # Shared UI components
└── lib/              # Utilities & helpers
    ├── erp/          # ERPNext API wrappers
    └── auth.ts       # Authentication utilities
```

## Environment Variables

See `.env.example` for all available configuration options.

## Deployment

Deploy to Vercel or any Node.js hosting:

```bash
npm run build
npm start
```
