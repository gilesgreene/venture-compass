import { getAllPosts, Post } from '../lib/mdx';
import Link from 'next/link';

export default function Home() {
  const posts: Post[] = getAllPosts();

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-serif font-bold mb-12 border-b border-vc-navy/10 pb-4">
        The Venture Compass
      </h1>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-2xl font-bold group-hover:text-blue-800 transition">
                {post.title}
              </h2>
              <p className="text-vc-navy/70">{post.description}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}