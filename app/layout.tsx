import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
        <header className="w-full border-b border-vc-navy/10 bg-vc-beige/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
            <Link href="/" className="flex items-center gap-6 group">
              {/* Larger Logo */}
              <div className="w-20 h-20 relative">
                <Image 
                  src="/venture-compass-logo.png" 
                  alt="The Venture Compass Logo" 
                  fill 
                  className="object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>

              {/* Navy Separator Line */}
              <div className="h-12 w-[2px] bg-vc-navy rounded-full" />

              {/* Blog Title */}
              <span className="text-2xl font-serif font-bold tracking-tight text-vc-navy uppercase">
                Venture Compass
              </span>
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-8">
          {children}
        </main>
      </body>
    </html>
  );
}