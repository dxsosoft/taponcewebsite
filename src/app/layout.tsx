import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TapOnce | One Tap. Endless Connections.",
  description: "TapOnce brings your contact details, social profiles, website, portfolio and business information together in one smart digital identity — accessible with a simple tap or scan.",
  openGraph: {
    title: "TapOnce | Digital Identity Platform",
    description: "Your professional identity, instantly shared.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
