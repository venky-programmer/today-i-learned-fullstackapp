import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qupcjflzmbhlpsfcmraq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cGNqZmx6bWJobHBzZmNtcmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxODAwMzgsImV4cCI6MjAyMTc1NjAzOH0.jDb4Adbfr6pbM5XaLfDFsSplyaD6oxhygiw7U9mxuQg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
