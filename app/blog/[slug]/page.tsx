import { createClient as createSupabaseClient } from "@/utils/supabase/server";
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const supabase = await createSupabaseClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-serif font-bold text-vc-navy mb-4">Report Not Found</h2>
      <Link href="/" className="text-vc-navy/60 hover:text-vc-navy font-bold uppercase tracking-widest text-xs">Return to Journal</Link>
    </div>
  );

  return (
    <article className="max-w-3xl mx-auto py-12 px-6">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-vc-navy/40 hover:text-vc-navy font-bold text-xs uppercase tracking-widest mb-12 transition-colors group"
      >
        <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Journal
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight text-vc-navy tracking-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-vc-navy/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-vc-navy/5 flex items-center justify-center text-vc-navy/20">
              {post.authorName?.[0] || "A"}
            </div>
            <span className="text-vc-navy">{post.authorName || "Anonymous"}</span>
          </div>
          <span className="opacity-20">/</span>
          <span>{post.authorRole || "Contributor"}</span>
          <span className="opacity-20">/</span>
          <span>
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric'
            })}
          </span>
        </div>
      </header>

      <div className="prose prose-vc max-w-none">
        <div className="text-vc-navy/80 leading-relaxed text-lg space-y-6">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-4xl font-serif font-bold mt-12 mb-6 text-vc-navy">{children}</h1>,
              h2: ({ children }) => <h2 className="text-3xl font-serif font-bold mt-10 mb-5 text-vc-navy">{children}</h2>,
              h3: ({ children }) => <h3 className="text-2xl font-serif font-bold mt-8 mb-4 text-vc-navy">{children}</h3>,
              p: ({ children }) => <p className="mb-6">{children}</p>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-vc-navy/20 pl-6 italic my-8 text-vc-navy/60 text-xl font-serif">
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => <ul className="list-disc ml-6 mb-6 space-y-3">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal ml-6 mb-6 space-y-3">{children}</ol>,
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </div>

      <footer className="mt-20 pt-10 border-t border-vc-navy/10">
        <div className="bg-vc-navy text-vc-beige p-10 rounded-3xl">
          <h3 className="text-xl font-serif font-bold mb-4">Venture Compass Analysis</h3>
          <p className="text-vc-beige/60 text-sm leading-relaxed mb-6">
            This report was compiled as part of our ongoing tracking of frontier technology and market shifts. 
            For inquiries regarding this analysis or to suggest a startup for review, please contact the editors.
          </p>
          <Link href="/about" className="inline-block border-b border-vc-beige/30 hover:border-vc-beige transition-colors font-bold uppercase tracking-widest text-[10px]">
            About Our Methodology →
          </Link>
        </div>
      </footer>
    </article>
  );
}