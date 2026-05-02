"use client";

import { useState, useEffect, use } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Send, Trash2 } from "lucide-react";

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    body: "",
    authorName: "",
    authorRole: "",
    mainImage: "",
    date: "",
  });
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setFormData({
          title: data.title,
          category: data.category,
          excerpt: data.excerpt,
          body: data.body,
          authorName: data.authorName,
          authorRole: data.authorRole,
          mainImage: data.mainImage,
          date: data.date,
        });
      }
      setLoading(false);
    }
    fetchPost();
  }, [id, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("posts")
      .update(formData)
      .eq("id", id);

    if (error) {
      alert(error.message);
      setSaving(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  if (loading) return <div className="py-20 text-center text-vc-navy/40 font-bold uppercase tracking-widest text-xs">Loading Intelligence...</div>;

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
        <h1 className="text-4xl font-serif font-bold text-vc-navy">Edit Entry</h1>
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold uppercase tracking-wider hover:bg-red-100 transition-all"
          >
            <Trash2 size={18} />
            Delete
          </button>
          <button
            form="article-form"
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-vc-navy text-vc-beige rounded-xl font-bold uppercase tracking-wider hover:bg-vc-navy/90 transition-all shadow-lg shadow-vc-navy/10 disabled:opacity-50"
          >
            <Send size={18} />
            {saving ? "Saving..." : "Save Changes"}
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
              className="w-full text-2xl font-serif font-bold bg-transparent border-b border-vc-navy/10 pb-4 focus:outline-none focus:border-vc-navy transition-colors text-vc-navy"
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
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
