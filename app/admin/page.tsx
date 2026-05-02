import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, Plus, FileText, Settings } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-vc-navy">Compass Control</h1>
          <p className="text-vc-navy/60 mt-2">Manage your startup journal and signals.</p>
        </div>
        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-vc-navy text-vc-beige rounded-xl font-bold uppercase tracking-wider hover:bg-vc-navy/90 transition-all shadow-lg shadow-vc-navy/10"
        >
          <Plus size={20} />
          New Article
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar/Stats could go here */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-vc-navy/40 mb-6">Recent Articles</h2>
          
          {posts && posts.length > 0 ? (
            posts.map((post: any) => (
              <div 
                key={post.id}
                className="group bg-white/40 border border-vc-navy/5 p-6 rounded-2xl flex items-center justify-between hover:bg-white/80 transition-all hover:shadow-xl hover:shadow-vc-navy/5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-vc-beige rounded-lg flex items-center justify-center text-vc-navy/20 group-hover:text-vc-navy/40 transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-vc-navy text-lg">{post.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-vc-navy/40">{post.category}</span>
                      <span className="text-[10px] text-vc-navy/20">•</span>
                      <span className="text-xs text-vc-navy/40">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <Link 
                  href={`/admin/edit/${post.id}`}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-vc-navy/60 hover:text-vc-navy transition-colors"
                >
                  Edit
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/20 rounded-3xl border border-dashed border-vc-navy/10">
              <FileText className="mx-auto text-vc-navy/10 mb-4" size={48} />
              <p className="text-vc-navy/40 font-medium">No articles found in the system.</p>
              <Link href="/admin/new" className="text-vc-navy font-bold text-sm mt-4 inline-block hover:underline underline-offset-4">
                Create your first one →
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-vc-navy text-vc-beige p-8 rounded-3xl shadow-2xl shadow-vc-navy/20">
            <h3 className="text-xl font-serif font-bold mb-4">Account</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-vc-beige/20 flex items-center justify-center text-vc-beige font-bold">
                {user.email?.[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{user.email}</p>
                <p className="text-[10px] uppercase tracking-widest opacity-50">Authorized User</p>
              </div>
            </div>
            
            <form action="/api/auth/signout" method="post">
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                <LogOut size={14} />
                Secure Logout
              </button>
            </form>
          </div>

          <div className="bg-white/40 border border-vc-navy/5 p-8 rounded-3xl">
            <h3 className="text-sm font-bold uppercase tracking-widest text-vc-navy/60 mb-6 flex items-center gap-2">
              <Settings size={16} />
              System Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-vc-navy/40">Database</span>
                <span className="text-green-600 font-bold uppercase tracking-widest">Active</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-vc-navy/40">Auth Service</span>
                <span className="text-green-600 font-bold uppercase tracking-widest">Active</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-vc-navy/40">Storage</span>
                <span className="text-green-600 font-bold uppercase tracking-widest">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
