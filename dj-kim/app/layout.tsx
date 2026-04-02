import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DJ Kim | The Law of the Dancefloor",
  description: "Official landing page for DJ Kim (iam.no.well). Professional DJ specializing in House, Nu-Disco, and Open Format. Resident at Club Above and Beans & Bottles.",
  keywords: ["DJ Kim", "iam.no.well", "Naga City DJ", "Club Above Naga", "House Music DJ", "Law and DJ", "Naga City Nightlife"],
  openGraph: {
    title: "DJ Kim | The Law of the Dancefloor",
    description: "Naga City's premium House and Open Format DJ. Explore residencies at Club Above and Beans & Bottles.",
    images: [{ url: "/og-image.jpg" }], // Placeholder for now
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} grain antialiased`}>
        {children}
      </body>
    </html>
  );
}
