import type { Metadata } from "next";
import Image from "next/image"; // Import this
import "./globals.css";

export const metadata: Metadata = {
  title: "The Venture Compass",
  description: "Navigating the venture landscape",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-vc-beige text-vc-navy min-h-screen">
        <header className="max-w-4xl mx-auto p-8 flex flex-col items-center gap-4">
          {/* Your New Logo */}
          <div className="w-32 h-32 relative">
            <Image 
              src="/venture-compass-logo.png" 
              alt="The Venture Compass Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          
          <h1 className="text-4xl font-serif font-bold italic tracking-tight">
            The Venture Compass
          </h1>
          <div className="h-px w-full bg-vc-navy/10 mt-4" />
        </header>

        <main className="max-w-4xl mx-auto p-8 pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}