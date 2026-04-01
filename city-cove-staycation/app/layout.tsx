import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "City Cove Staycation | Pool-View Stay in Pasay",
  description:
    "A bright and modern staycation landing page for City Cove Staycation, blending condo comfort, pool-view calm, and quick access to the Pasay and MOA area.",
  openGraph: {
    title: "City Cove Staycation",
    description:
      "Modern staycation comfort with a polished, pool-view vibe near the Pasay and MOA area.",
    siteName: "City Cove Staycation",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "City Cove Staycation",
    description:
      "Modern staycation comfort with a polished, pool-view vibe near the Pasay and MOA area.",
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
