import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your actual Supabase URL and Anon Key
// It's recommended to store these in environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('Supabase URL from env:', supabaseUrl ? 'Loaded' : 'MISSING!');
console.log('Supabase Anon Key from env:', supabaseAnonKey ? 'Loaded' : 'MISSING!');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("CRITICAL ERROR: Supabase URL or Anon Key is missing. Check .env file and RESTART the application!");
  // Optionally throw an error or handle this case appropriately
  // throw new Error("Supabase credentials missing.");
}

// Initialize client only if keys exist
export const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (supabase) {
  console.log('Supabase client initialized successfully.');
} else {
  console.error('Supabase client initialization FAILED.');
}
