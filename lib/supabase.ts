import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON;
const serviceRole = process.env.SERVICE_ROLE;

console.log(supabaseUrl, serviceRole);

export const supabaseAdmin = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1enB3d214ZWFib2t2bGRndW9sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MDEwNjI0MSwiZXhwIjoyMDA1NjgyMjQxfQ.60XFSyguS0bLAfWAbnFDUxZVrChf0tkgQm5uTU2Rppk"
);

export const supabase = createClient(supabaseUrl, anonKey);
