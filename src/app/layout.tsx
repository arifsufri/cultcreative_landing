import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://cultcreativeasia.com"),
  title: "Cult Creative",
  description: "Connecting Brands With Content Creators",
  icons: {
    icon: [{ url: "/logo/newlogo.svg", type: "image/svg+xml" }],
    shortcut: ["/logo/newlogo.svg"],
    apple: [{ url: "/logo/newlogo.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Cult Creative",
    description: "Connecting Brands With Content Creators",
    url: "https://cultcreativeasia.com",
    siteName: "Cult Creative",
    images: [{ url: "/logo/newlogo.svg" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cult Creative",
    description: "Connecting Brands With Content Creators",
    images: ["/logo/newlogo.svg"],
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
        {/* Preconnect to font CDNs for faster loading */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://use.typekit.net" />
        <link rel="dns-prefetch" href="https://fonts.cdnfonts.com" />
        {/* Preconnect to video storage */}
        <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
