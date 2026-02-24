export const revalidate = 10; // Re-check for new posts every 10 seconds
import Image from "next/image";
import Link from "next/link";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// 1. Sanity Configuration
const client = createClient({
  projectId: "43zfx56t", // Find this in your sanity.config.ts or sanity manage
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false, // Set to false to see updates immediately without caching
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default async function JournalPage() {
  // 2. Fetch posts from Sanity (replaces the hard-coded POSTS array)
  const posts = await client.fetch(`*[_type == "post"] | order(date desc) {
    title,
    "slug": slug.current,
    date,
    category,
    excerpt,
    mainImage
  }`);

  return (
    <div className="space-y-16 py-8">
      <header className="mb-12 border-b border-vc-navy/10 pb-8">
        <h1 className="text-4xl font-serif font-bold text-vc-navy uppercase tracking-tighter">
          Journal
        </h1>
      </header>

      <div className="flex flex-col gap-16">
        {posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Image Container */}
              <div className="md:col-span-5 relative aspect-[4/3] overflow-hidden rounded-2xl border border-vc-navy/5 bg-vc-beige shadow-sm">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(800).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                ) : (
                  // Fallback if you forgot to upload an image in Sanity
                  <div className="w-full h-full bg-vc-navy/5 flex items-center justify-center text-vc-navy/20">
                    No Image
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-2 capitalize text-sm text-gray-400 mb-2">
                  <span>{post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}</span>
                  <span className="w-1 h-1 rounded-full bg-vc-navy/20" />
                  <span>{post.category || 'General'}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-vc-navy group-hover:text-blue-800 transition-colors tracking-tight">
                  {post.title}
                </h2>
                
                <p className="text-vc-navy/60 leading-relaxed text-sm md:text-base line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="pt-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-vc-navy border-b-2 border-vc-navy/10 group-hover:border-blue-800 transition-all">
                    Read Article →
                  </span>
                </div>
              </div>

            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
