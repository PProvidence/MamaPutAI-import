import { createClient } from "@supabase/supabase-js";

export const supabase = createClient({
    apiKey: '<API_KEY>',
    project: '<PROJECT_ID>'
  });