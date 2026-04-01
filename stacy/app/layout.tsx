import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Stacy Thrifts | Chic Preloved Fashion Finds",
    template: "%s | Stacy Thrifts",
  },
  description:
    "Budget-friendly ukay finds, curated styles, and new Facebook drops from Stacy Thrifts.",
  keywords: [
    "Stacy Thrifts",
    "thrift shop",
    "preloved fashion",
    "ukay finds",
    "Facebook shop",
  ],
  openGraph: {
    title: "Stacy Thrifts",
    description:
      "Affordable, stylish, and curated preloved fashion with fresh Facebook drops.",
    siteName: "Stacy Thrifts",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
