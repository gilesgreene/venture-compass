import { client } from '../../../sanity/lib/client';
import { PortableText } from '@portabletext/react';

// Define how we want Sanity's "blocks" to look in HTML
const ptComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-10 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-8 mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-semibold mt-6 mb-2">{children}</h3>,
    normal: ({ children }: any) => <p className="text-gray-700 leading-7 mb-4">{children}</p>,
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
      body
    }`,
    { slug }
  );

  if (!post) return <div className="p-20 text-center">Post not found.</div>;

  return (
    <article className="max-w-3xl mx-auto p-10">
      {/* The main page title */}
      <h1 className="text-5xl font-extrabold mb-10 border-b pb-4">{post.title}</h1>
      
      {/* We pass our custom components map here */}
      <div className="mt-6">
        <PortableText value={post.body} components={ptComponents} />
      </div>
    </article>
  );
}