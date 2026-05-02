import type { Metadata } from "next";
import { Header } from "@/lib/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Venture Compass | Startup Intelligence",
  description: "Independent tracking of frontier technology and market shifts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-vc-beige text-vc-navy min-h-screen font-sans">
        <Header />
        <main className="max-w-4xl mx-auto p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}