import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-10">
      <h2 className="text-2xl font-serif italic mb-10 border-b border-vc-navy/10 pb-4">
        Latest Insights
      </h2>
      
      <div className="grid gap-12">
        <article className="group">
          <Link href="/blog/test-post" className="flex flex-col gap-2">
            {/* Removed 'uppercase' - now it displays exactly as typed */}
            <span className="text-xs tracking-widest text-vc-navy/40 font-medium">
              Feb 22, 2026
            </span>
            <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
              Test Post
            </h3>
            <p className="text-vc-navy/70 italic">Read more →</p>
          </Link>
        </article>
      </div>
    </div>
  );
}