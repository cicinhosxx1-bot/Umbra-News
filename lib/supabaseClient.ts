import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // PKCE is the secure flow for SPAs — handles ?code= in URL after OAuth redirect
        flowType: 'pkce',
        // Persist session in localStorage so it survives page refreshes
        persistSession: true,
        // Automatically refresh the token before it expires
        autoRefreshToken: true,
        // Detect session from URL hash/query params on page load
        detectSessionInUrl: true,
    },
});
