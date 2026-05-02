"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md bg-white/50 backdrop-blur-xl p-10 rounded-3xl border border-vc-navy/10 shadow-2xl shadow-vc-navy/5">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 relative mb-4">
            <Image 
              src="/venture-compass-logo-transparent.png" 
              alt="Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-serif font-bold text-vc-navy">Welcome Back</h1>
          <p className="text-vc-navy/60 text-sm mt-2 uppercase tracking-widest font-bold">Secure Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-vc-navy/70 mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-vc-beige/30 border border-vc-navy/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vc-navy/20 transition-all text-vc-navy"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-vc-navy/70 mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-vc-beige/30 border border-vc-navy/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vc-navy/20 transition-all text-vc-navy"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-vc-navy text-vc-beige font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-vc-navy/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-vc-navy/20"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-vc-navy/40 text-xs font-medium">
          Authorized personnel only. Access is monitored.
        </p>
      </div>
    </div>
  );
}
