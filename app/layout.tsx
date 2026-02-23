import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const eb = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Little Faith Press",
  description: "Faith-based books & printable activities for ages 3–6.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: eb.style.fontFamily }}>
        {/* GLOBAL SITE WRAPPER */}
        <div className="lfpSite">
          <Header />

          {/* Page Content */}
          <main className="lfpPage">
            {children}
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}