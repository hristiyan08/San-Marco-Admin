// supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Замести с твоите Supabase URL и анонимен ключ
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
