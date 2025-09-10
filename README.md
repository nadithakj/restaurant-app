# Restaurant App

## Features

- Admin portal to manage menu, tables, QR codes, orders, payments
- Diner portal for table-specific ordering and payment
- Kitchen portal for real-time order management
- Railway.app deployment ready

## Stack

- Node.js (Express), Prisma, PostgreSQL
- React (Vite/Next.js), Tailwind CSS
- Stripe, qrcode
- Railway.app for deployment

## Local Development

1. **Clone the repo**
   ```bash
   git clone https://github.com/nadithakj/restaurant-app.git
   cd restaurant-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   cd ../apps/admin && npm install
   cd ../diner && npm install
   cd ../kitchen && npm install
   ```

3. **Setup database**
   - Create a PostgreSQL DB (Railway or locally)
   - Copy `.env.example` to `.env` and set values
   - Run Prisma migrations:
     ```bash
     cd backend
     npx prisma migrate dev --name init
     ```

4. **Start backend**
   ```bash
   cd backend
   npm run dev
   ```

5. **Start frontends**
   ```bash
   cd apps/admin && npm run dev
   cd ../diner && npm run dev
   cd ../kitchen && npm run dev
   ```

## Deploy to Railway

1. Push your repo to GitHub
2. Create a new Railway project, link your repo
3. Configure environment variables in Railway dashboard
4. Railway will auto-deploy on push

## Stripe Setup

- Create a Stripe account
- Set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in Railway env vars

## QR Codes

- Admin portal will display QR code for each table
- Print and place QR codes on tables

---

For more details, see `apps/admin/README.md`, `apps/diner/README.md`, and `apps/kitchen/README.md`.