import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { IBM_Plex_Mono, VT323 } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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

export const metadata: Metadata = {
  title: "Lumon Ipsum Generator",
  description: "Generate Severance-themed placeholder text. Please enjoy all paragraphs equally.",
  keywords: ["Severance", "placeholder text", "lorem ipsum", "Lumon", "text generator", "dummy text", "Apple TV+"],
  authors: [{ name: "Luc H" }],
  creator: "Luc H",
  metadataBase: new URL("https://lumonipsum.com"),
  openGraph: {
    title: "Lumon Ipsum Generator",
    description: "Generate Severance-themed placeholder text. Please enjoy all paragraphs equally.",
    url: "https://lumonipsum.com",
    siteName: "Lumon Ipsum Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumon Ipsum Generator",
    description: "Generate Severance-themed placeholder text. Please enjoy all paragraphs equally.",
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
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Lumon Ipsum Generator",
              "description": "Generate Severance-themed placeholder text. Please enjoy all paragraphs equally.",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "Luc H"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} ${vt323.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
