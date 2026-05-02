import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // During build/SSR, we might not have these. Return a dummy or handle gracefully.
    if (typeof window === 'undefined') {
      // Return a proxy that logs but doesn't throw on creation
      return new Proxy({} as any, {
        get: () => {
          return () => {
            console.warn('Supabase client called without environment variables during SSR/Build');
            return { data: null, error: null };
          };
        }
      });
    }
    throw new Error('Missing Supabase environment variables');
  }

  return createBrowserClient(url, key);
}
