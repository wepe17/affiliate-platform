# Affiliate Platform

Admin panel & public affiliate portal untuk mengelola program affiliate di ERPNext. Dibangun dengan Next.js 16.4, React 18, dan custom styling.

## Features

### Admin Panel (`/admin`)
- ✅ Affiliate management (create, edit, approve, suspend)
- ✅ Search & filter affiliates by status/name
- ✅ Commission rules management (create, edit)
- ✅ Payout batch creation & payment tracking
- ✅ Admin dashboard dengan key metrics

### Affiliate Portal (`/affiliate`)
- ✅ Public signup form dengan bank details
- ✅ Affiliate dashboard (earnings, sales, referral link)
- ✅ Settings page (profile & bank updates)
- ✅ Recent sales activity tracking
- ✅ Referral link copy & share

### Features
- **Commission Management**: Automatic calculation by product type (Physical, Digital, Service, Subscription)
- **Commission Rules**: Different rates per product type/category
- **Payout Tracking**: Monthly/quarterly commission payouts
- **Responsive Design**: Works on desktop, tablet, mobile
- **Orange Theme**: Consistent branding with dark mode support

## Tech Stack

- Next.js 16.4 (App Router)
- React 18.3
- TypeScript 5
- Custom CSS (no Tailwind/shadcn)
- ERPNext API integration

## Quick Start

### Prerequisites
- Node.js 18+
- ERPNext instance with affiliate doctypes
- ERPNext API credentials

### Installation

```bash
# 1. Clone & setup
git clone https://github.com/wepe17/affiliate-platform.git
cd affiliate-platform

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with:
#   NEXT_PUBLIC_ERP_URL=https://erp.mavens.biz.id
#   ERP_API_KEY=your_key
#   ERP_API_SECRET=your_secret

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx
│   ├── globals.css                 # Orange theme
│   ├── (app)/
│   │   ├── admin/                  # Admin panel
│   │   │   ├── page.tsx            # Dashboard
│   │   │   ├── affiliate/          # Affiliate management
│   │   │   ├── commission-rules/
│   │   │   └── payouts/
│   │   └── layout.tsx
│   └── affiliate/                  # Public portal
│       ├── page.tsx                # Landing page
│       ├── signup/
│       └── dashboard/
├── components/
├── lib/
│   └── erp/
│       ├── client.ts               # API wrapper
│       └── affiliate.ts            # Affiliate methods
└── public/
```

## API Methods

All affiliate operations via `/src/lib/erp/affiliate.ts`:

**Affiliates:**
- `listAffiliates()` - Get all affiliates
- `getAffiliate(id)` - Get single affiliate
- `createAffiliate(data)` - Create new
- `updateAffiliate(id, data)` - Update
- `approveAffiliate(id)` - Activate
- `suspendAffiliate(id)` - Suspend

**Commission Rules:**
- `listCommissionRules()`
- `createCommissionRule(data)`
- `updateCommissionRule(id, data)`

**Sales & Payouts:**
- `listAffiliateSales()`
- `listPayments()`
- `createPaymentBatch(data)`
- `recordPayment(id, data)`

## Environment Variables

```env
# Required
NEXT_PUBLIC_ERP_URL=https://erp.mavens.biz.id
ERP_API_KEY=your_frappe_api_key
ERP_API_SECRET=your_frappe_api_secret

# Optional
NEXT_PUBLIC_APP_NAME=Affiliate Platform
NEXT_PUBLIC_STORE_URL=https://yourstore.com
```

## User Flows

### Admin
1. Dashboard: View metrics (affiliates, earnings, rules)
2. Affiliate Management: Create, search, filter, approve
3. Commission Rules: Define product type rates
4. Payouts: Generate batches, record payments

### Affiliate
1. Landing page: `/affiliate`
2. Sign up: `/affiliate/signup`
3. Dashboard: `/affiliate/dashboard/[affiliateId]`
4. Copy referral link & share
5. Track sales & earnings in real-time
6. Update profile in settings

## Development

```bash
npm run dev     # Dev server (port 3000)
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Check TypeScript
```

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Self-hosted
```bash
npm run build
npm start
```

Set environment variables in your hosting platform.

## Color Theme

Orange branding:
- Primary: `#FF6B35` (orange)
- Soft: `#FFF5F0` (light orange)
- Secondary: `#FF8C42` (lighter orange)
- Accent: `#004E89` (dark blue)

Dark mode support included.

## Commits

**Phase 1 (Backend):** Backend doctypes on ERPNext
- Initial affiliate architecture & database setup

**Phase 2 (Admin Panel):** Sprint 1-4
- Sprint 1: Foundation (API wrapper, layouts, list page)
- Sprint 2: Management (search, filter, edit, approve, commission rules, payouts, dashboard)

**Phase 3 (Public Portal):** Sprint 3+
- Sprint 3: Affiliate signup, dashboard, settings
- Landing page with program overview & FAQ

## Next Steps

- [ ] Authentication & login system
- [ ] Email notifications
- [ ] Affiliate referral program (invite friends)
- [ ] Advanced analytics & reporting
- [ ] Automated payout processing
- [ ] Multi-language support

## License

MIT
