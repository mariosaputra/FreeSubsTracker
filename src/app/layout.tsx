import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freesubstracker.com"),
  title: "Free Subscriptions Tracker - Track & Manage All Your Subscriptions | FreeSubsTracker",
  description:
    "Free subscriptions tracker to manage and monitor all your recurring subscriptions in one place. No sign-up required, your data stays private in your browser. Support multiple currencies.",
  keywords: [
    "free subscriptions tracker",
    "subscription tracker",
    "subscription manager",
    "track subscriptions",
    "manage subscriptions",
    "recurring payments tracker",
    "free subscription manager",
    "monthly subscription tracker",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Free Subscriptions Tracker | FreeSubsTracker",
    description:
      "Track and manage all your recurring subscriptions for free. No sign-up, no accounts — your data stays private in your browser.",
    type: "website",
    url: "https://freesubstracker.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Subscriptions Tracker | FreeSubsTracker",
    description:
      "Track and manage all your recurring subscriptions for free. No sign-up, no accounts — your data stays private in your browser.",
    creator: "@xmarioapps",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#09090b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
