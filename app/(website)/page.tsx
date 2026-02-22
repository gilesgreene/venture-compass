import Link from 'next/link';
import { client } from '../../sanity/lib/client';

export default async function Home() {
  // We fetch title, slug, and the first 200 characters of the body text
  const posts = await client.fetch(`*[_type == "post"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    "excerpt": array::join(string::split(pt::text(body), "")[0..200], "") + "...",
    _createdAt
  }`);

  return (
    <main className="p-10 max-w-5xl mx-auto">
      {/* NO VENTURE COMPASS HEADER HERE */}
      
      <div className="flex flex-col gap-12">
        {posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="cursor-pointer">
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post._createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <h2 className="text-3xl font-bold group-hover:text-blue-600 transition-colors mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
              <div className="mt-4 text-blue-500 font-medium group-hover:underline">
                Read more →
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}