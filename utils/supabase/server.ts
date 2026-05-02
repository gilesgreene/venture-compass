import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // If we're in a build context, we might not have these.
    // Return a proxy to avoid crashing the build.
    return new Proxy({} as any, {
      get: (target, prop) => {
        if (prop === 'auth') {
          return {
            getUser: async () => ({ data: { user: null }, error: null }),
            getSession: async () => ({ data: { session: null }, error: null }),
          };
        }
        return () => {
          console.warn(`Supabase ${String(prop)} called without environment variables`);
          return { data: null, error: null };
        };
      }
    });
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  })
}
