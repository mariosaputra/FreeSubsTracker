# FreeSubsTracker

Free, open-source subscriptions tracker. No sign-up, no accounts, no tracking. Your data stays in your browser.

**Live:** [freesubstracker.com](https://freesubstracker.com)

## Features

- **Track subscriptions** - Add, edit, and delete recurring subscriptions with name, cost, cycle (monthly/annual), and category
- **Multiple profiles** - Organize subscriptions by profile (Personal, Business, or custom)
- **Multi-currency** - 20 currencies supported (USD, EUR, GBP, JPY, etc.). Each currency has its own separate data
- **Cost summary** - See monthly and annual totals at a glance
- **Custom categories** - Create your own categories beyond the defaults
- **Export & Import** - Back up your data as JSON and restore it on another device
- **Dark / Light / System theme** - Toggle between themes or follow your OS preference
- **Mobile responsive** - Card layout on mobile, table on desktop
- **Privacy first** - All data stored locally in your browser via localStorage. Nothing is sent to any server

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) v4
- [shadcn/ui](https://ui.shadcn.com) components (Radix UI primitives)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode

## Getting Started

```bash
# Clone the repo
git clone https://github.com/xmarioapps/FreeSubsTracker.git
cd FreeSubsTracker

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout, metadata, ThemeProvider, ErrorBoundary
    page.tsx            # Main page
    globals.css         # Theme variables, category badge colors
  components/
    ui/                 # shadcn/ui base components (Button, Input, Card, etc.)
    AddSubscriptionForm.tsx
    CostSummary.tsx
    CurrencyPicker.tsx
    DataToolbar.tsx     # Export/Import with inline error handling
    ErrorBoundary.tsx
    HowToUse.tsx
    ProfileTabs.tsx
    SubscriptionTable.tsx
    ThemeToggle.tsx
  hooks/
    useSubscriptions.ts # Core data hook (localStorage, per-currency storage)
  lib/
    formatCurrency.ts   # Currency list + Intl.NumberFormat formatter
    utils.ts            # cn() utility (clsx + tailwind-merge)
  types/
    subscription.ts     # TypeScript types
public/
  manifest.json         # PWA manifest
  robots.txt
  sitemap.xml
```

## Privacy

All data is stored in your browser's localStorage. Nothing is sent to any server. No cookies, no analytics, no tracking.

If you clear your browser data, your subscriptions will be lost. Use the **Export** feature to back up.

## Deploy

Deploy to any platform that supports Next.js:

```bash
npm run build
```

Works with [Vercel](https://vercel.com), [Netlify](https://netlify.com), or any Node.js hosting.

## License

[MIT](LICENSE)

## Author

Built by [@xmarioapps](https://x.com/xmarioapps)
