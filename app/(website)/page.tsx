import { createClient as createSupabaseClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60; // Revalidate every minute

export default async function BlogListPage() {
  // Fetch from Supabase
  const supabase = await createSupabaseClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div className="space-y-16 py-8">
      <header className="mb-12 border-b border-vc-navy/10 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold text-vc-navy uppercase tracking-tighter">
            Journal
          </h1>
          <p className="text-vc-navy/40 text-xs font-bold uppercase tracking-widest mt-2">Startup intelligence</p>
        </div>
      </header>

      <div className="flex flex-col gap-16">
        {posts && posts.length > 0 ? (
          posts.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                <div className="md:col-span-5 relative aspect-[4/3] overflow-hidden rounded-2xl border border-vc-navy/5 bg-vc-beige shadow-sm">
                  {post.mainImage ? (
                    <Image
                      src={post.mainImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-vc-navy/5 flex items-center justify-center text-vc-navy/20">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{post.category || 'VC'}</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center gap-2 capitalize text-sm text-vc-navy/40 mb-2 font-bold tracking-tight">
                    <span>
                      {post.date
                        ? new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          timeZone: 'UTC'
                        })
                        : 'Draft'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-vc-navy/10" />
                    <span className="uppercase tracking-widest text-[10px]">{post.category || 'General'}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-vc-navy group-hover:text-vc-navy/80 transition-colors tracking-tight">
                    {post.title}
                  </h2>

                  <p className="text-vc-navy/60 leading-relaxed text-sm md:text-base line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-vc-navy border-b-2 border-vc-navy/10 group-hover:border-vc-navy transition-all">
                      Access Report →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-vc-navy/10 rounded-3xl">
            <p className="text-vc-navy/40 font-serif italic text-lg">No reports published yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
