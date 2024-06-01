import { createClient } from "@supabase/supabase-js";

const option = {
  db: { schema: "public" },
};

export const supabase = createClient(
  process.env.supabase_url!,
  process.env.supabase_anon_key!,
  option
);
