import { client } from '../../../sanity/lib/client';
import { PortableText } from '@portabletext/react';

// This map tells PortableText exactly how to render your Studio headers
const ptComponents = {
  block: {
    // These match the "Heading 1", "Heading 2", etc. in your Sanity Studio
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-10 mb-4 text-[#001f3f]">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-8 mb-3 text-[#001f3f]">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mt-6 mb-2 text-[#001f3f]">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-7 mb-4">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 italic my-6 text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      authorName,
      authorRole,
      _createdAt
    }`,
    { slug }
  );

  if (!post) return <div className="p-20 text-center">Post not found.</div>;

  return (
    <article className="max-w-3xl mx-auto p-10">
      <header className="mb-10">
        {/* Main Page Title */}
        <h1 className="text-5xl font-extrabold mb-4 leading-tight text-gray-900">
          {post.title}
        </h1>
        
        {/* Byline with Navy Blue Author Name */}
        <div className="flex items-center gap-3 text-sm">
          <span className="font-bold text-[#001f3f] uppercase tracking-wider">
            By {post.authorName || "Anonymous"}
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 italic">
            {post.authorRole}
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400">
            {new Date(post._createdAt).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric'
            })}
          </span>
        </div>
      </header>

      {/* The Body Content where the Headers live */}
      <div className="mt-8 border-t pt-8">
        <PortableText value={post.body} components={ptComponents} />
      </div>
    </article>
  );
}