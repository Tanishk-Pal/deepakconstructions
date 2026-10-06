import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import SmoothScrolls from "@/components/animations/SmoothScrolls";
import LoaderProvider from "@/components/loaders/LoaderProvider";
import PageTransition from "@/components/loaders/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deepak Construction",
  description:
    "Premium infrastructure, pipeline and construction company website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-[#f5f3ee] text-black overflow-x-hidden antialiased"
        suppressHydrationWarning
      >
        <SmoothScrolls />

        <LoaderProvider>
          <PageTransition>{children}</PageTransition>
        </LoaderProvider>
      </body>
    </html>
  );
}