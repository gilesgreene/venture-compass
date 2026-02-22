import { getPostBySlug } from '../../../lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { content, data } = getPostBySlug(slug);

  return (
    <article className="min-h-screen p-8 max-w-2xl mx-auto">
      <header className="mb-12 border-b border-vc-navy/10 pb-4">
        <h1 className="text-4xl font-serif font-bold italic">Checking: {data.title}</h1>
        <p className="text-sm opacity-50">Slug detected: {slug}</p>
      </header>

      <section className="prose prose-navy">
        {content ? (
          <MDXRemote source={content} />
        ) : (
          <p className="text-red-500 font-bold">Error: No content found in the MDX file!</p>
        )}
      </section>
    </article>
  );
}