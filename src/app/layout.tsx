import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cryptologic | Superior Crypto Analysis",
  description:
    "SaaS Spot Market Superior berbasis Statistik & Financial Astrology. Analisis crypto dengan pendekatan kosmik.",
  keywords: [
    "crypto",
    "bitcoin",
    "trading",
    "astrology",
    "financial astrology",
    "market analysis",
  ],
  authors: [{ name: "Cryptologic Team" }],
  openGraph: {
    title: "Cryptologic | Superior Crypto Analysis",
    description:
      "Analisis crypto dengan pendekatan Financial Astrology & Statistik",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
