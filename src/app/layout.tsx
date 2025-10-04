import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BloomCart - Fresh Flowers & Décor E-Commerce",
  description: "Your one-stop destination for fresh flowers, beautiful décor, and memorable events. Order online with same-day delivery across India.",
  keywords: "flowers, bouquets, décor, events, fresh flowers, dried flowers, artificial flowers, wedding, birthday, anniversary",
  authors: [{ name: "BloomCart Team" }],
  creator: "BloomCart",
  publisher: "BloomCart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bloomcart.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BloomCart - Fresh Flowers & Décor E-Commerce",
    description: "Your one-stop destination for fresh flowers, beautiful décor, and memorable events.",
    url: "https://bloomcart.com",
    siteName: "BloomCart",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BloomCart - Fresh Flowers & Décor",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BloomCart - Fresh Flowers & Décor E-Commerce",
    description: "Your one-stop destination for fresh flowers, beautiful décor, and memorable events.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
