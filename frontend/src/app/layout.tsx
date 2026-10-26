import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoPratle - Event Requirements",
  description: "Post your event requirements for planners, performers and crew.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Suspense fallback={<div className="h-13.25 border-b border-gray-200 bg-white" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
