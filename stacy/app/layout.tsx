import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Stacy Thrifts | Curated Preloved Fashion — Naga City",
    template: "%s | Stacy Thrifts",
  },
  description:
    "Shop Stacy Thrifts — affordable ukay-ukay finds, curated streetwear & vintage picks, bundle deals, and weekly drops. Based in Naga City. Order via Facebook.",
  keywords: [
    "Stacy Thrifts",
    "thrift shop Naga City",
    "preloved fashion Philippines",
    "ukay-ukay",
    "affordable streetwear",
    "vintage thrift Camarines Sur",
    "Facebook shop Philippines",
    "bundle deals ukay",
  ],
  openGraph: {
    title: "Stacy Thrifts | Curated Preloved Fashion",
    description:
      "Affordable, stylish, and curated ukay-ukay finds with fresh drops every week. Based in Naga City — shop on Facebook.",
    siteName: "Stacy Thrifts",
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stacy Thrifts | Curated Preloved Fashion",
    description: "Ukay finds, bundle deals, and weekly drops. Based in Naga City.",
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
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
