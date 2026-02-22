'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <header className="max-w-4xl mx-auto p-8 flex flex-col items-center gap-4">
      <Link href="/" className="flex flex-col items-center gap-4 group">
        <div className="w-24 h-24 relative transition-transform group-hover:scale-105">
          <Image 
            src="/venture-compass-logo.png" 
            alt="The Venture Compass Logo" 
            fill 
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-3xl font-serif font-bold italic tracking-tight text-vc-navy">
          The Venture Compass
        </h1>
      </Link>
      <div className="h-px w-full bg-vc-navy/10 mt-4" />
    </header>
  );
}