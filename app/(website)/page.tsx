import Link from 'next/link';
import { client } from '../../sanity/lib/client';

export default async function Home() {
  const posts = await client.fetch(`*[_type == "post"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    "excerpt": array::join(string::split(pt::text(body), "")[0..200], "") + "...",
    _createdAt,
    authorName,
    authorRole
  }`);

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <div className="flex flex-col gap-12">
        {posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="cursor-pointer">
              {/* Navy Blue Author Info */}
              {(post.authorName || post.authorRole) && (
                <p className="text-sm font-bold text-[#001f3f] mb-1 uppercase tracking-tight">
                  {post.authorName} {post.authorRole && <span className="opacity-70 font-medium">| {post.authorRole}</span>}
                </p>
              )}
              
              {/* Date (Back to the original gray style) */}
              <p className="text-xs text-gray-400 mb-2">
                {new Date(post._createdAt).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric'
                })}
              </p>
              
              <h2 className="text-3xl font-bold group-hover:underline mb-3 text-gray-900">
                {post.title}
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}