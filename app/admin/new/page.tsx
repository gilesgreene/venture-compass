"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Send, Image as ImageIcon, Save } from "lucide-react";

export default function NewArticlePage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    body: "",
    authorName: "",
    authorRole: "",
    mainImage: "",
    date: new Date().toISOString().split("T")[0],
  });
  const router = useRouter();
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = generateSlug(formData.title);

    const { error } = await supabase.from("posts").insert([
      {
        ...formData,
        slug,
      },
    ]);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Link 
        href="/admin" 
        className="inline-flex items-center gap-2 text-vc-navy/40 hover:text-vc-navy font-bold text-xs uppercase tracking-widest mb-8 transition-colors"
      >
        <ChevronLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-serif font-bold text-vc-navy">New Journal Entry</h1>
        <div className="flex gap-4">
          <button
            form="article-form"
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-vc-navy text-vc-beige rounded-xl font-bold uppercase tracking-wider hover:bg-vc-navy/90 transition-all shadow-lg shadow-vc-navy/10 disabled:opacity-50"
          >
            <Send size={18} />
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <form id="article-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white/40 border border-vc-navy/5 p-8 rounded-3xl space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-vc-navy/40 mb-3 ml-1">
              Article Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full text-2xl font-serif font-bold bg-transparent border-b border-vc-navy/10 pb-4 focus:outline-none focus:border-vc-navy transition-colors text-vc-navy placeholder:text-vc-navy/10"
              placeholder="The Future of Defense Tech..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-vc-navy/40 mb-3 ml-1">
                Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-vc-beige/20 border border-vc-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vc-navy/10 transition-all text-vc-navy"
                placeholder="Thesis / Macro / Intelligence"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-vc-navy/40 mb-3 ml-1">
                Publish Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-vc-beige/20 border border-vc-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vc-navy/10 transition-all text-vc-navy"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-vc-navy/40 mb-3 ml-1">
              Short Excerpt
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full px-5 py-4 bg-vc-beige/20 border border-vc-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vc-navy/10 transition-all text-vc-navy resize-none"
              placeholder="A brief hook for the journal feed..."
              required
            />
          </div>
        </div>

        <div className="bg-white/40 border border-vc-navy/5 p-8 rounded-3xl space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-vc-navy/40 mb-3 ml-1">
              Main Image URL
            </label>
            <input
              name="mainImage"
              value={formData.mainImage}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-vc-beige/20 border border-vc-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vc-navy/10 transition-all text-vc-navy"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-vc-navy/40 mb-3 ml-1">
              Main Body (Markdown Supported)
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows={15}
              className="w-full px-5 py-4 bg-vc-beige/20 border border-vc-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vc-navy/10 transition-all text-vc-navy font-mono text-sm leading-relaxed"
              placeholder="Write your analysis here..."
              required
            />
          </div>
        </div>

        <div className="bg-white/40 border border-vc-navy/5 p-8 rounded-3xl">
          <h3 className="text-sm font-bold uppercase tracking-widest text-vc-navy/40 mb-6">Author Attribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-vc-navy/40 mb-3 ml-1">
                Name
              </label>
              <input
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-vc-beige/20 border border-vc-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vc-navy/10 transition-all text-vc-navy"
                placeholder="Giles Greene"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-vc-navy/40 mb-3 ml-1">
                Role / Title
              </label>
              <input
                name="authorRole"
                value={formData.authorRole}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-vc-beige/20 border border-vc-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vc-navy/10 transition-all text-vc-navy"
                placeholder="Lead Researcher"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
