import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { IBM_Plex_Mono, VT323 } from "next/font/google";
import "./globals.css";
import StructuredData from "./structured-data";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lumonipsum.com';

export const metadata: Metadata = {
  title: "Lumon Ipsum Generator | Severance-themed Lorem Ipsum Text",
  description: "Generate Severance-themed placeholder text for your design projects. Corporate-approved Lorem Ipsum with Lumon Industries flavor. Please enjoy all paragraphs equally.",
  keywords: ["lorem ipsum", "placeholder text", "severance", "lumon", "design", "mockup", "text generator", "corporate"],
  authors: [{ name: "Lumon Industries" }],
  creator: "Lumon Industries",
  publisher: "Lumon Industries",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Lumon Ipsum Generator | Severance-themed Lorem Ipsum",
    description: "Generate Severance-themed placeholder text for your design projects. Corporate-approved Lorem Ipsum with Lumon Industries flavor.",
    url: siteUrl,
    siteName: 'Lumon Ipsum Generator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/lumon-globe.svg',
        width: 800,
        height: 600,
        alt: 'Lumon Ipsum Generator - Severance themed Lorem Ipsum',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lumon Ipsum Generator | Severance-themed Lorem Ipsum",
    description: "Generate Severance-themed placeholder text for your design projects. Corporate-approved Lorem Ipsum with Lumon Industries flavor.",
    images: ['/lumon-globe.svg'],
    creator: '@lumonipsum',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#afcbd6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lumon Ipsum" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} ${vt323.variable} antialiased`}
      >
        <StructuredData />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
