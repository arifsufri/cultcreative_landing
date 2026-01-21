import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://cultcreativeasia.com"),
  title: "Cult Creative: Connecting Brands With Content Creators",
  description:
    "Hire top creators across Southeast Asia with Cult Creative. Our trusted platform makes it easy for brands and creators to connect and collaborate seamlessly.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Cult Creative: Connecting Brands With Content Creators",
    description:
      "Hire top creators across Southeast Asia with Cult Creative. Our trusted platform makes it easy for brands and creators to connect and collaborate seamlessly.",
    url: "https://cultcreativeasia.com",
    siteName: "Cult Creative",
    images: [
      {
        url: "/favicon-48x48.png",
        width: 48,
        height: 48,
        alt: "Cult Creative - Connecting Brands With Content Creators",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cult Creative: Connecting Brands With Content Creators",
    description:
      "Hire top creators across Southeast Asia with Cult Creative. Our trusted platform makes it easy for brands and creators to connect and collaborate seamlessly.",
    images: ["/favicon-48x48.png"],
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
