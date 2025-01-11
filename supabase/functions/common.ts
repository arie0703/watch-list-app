import { createClient } from "npm:@supabase/supabase-js"

export const supabase = createClient(
  "http://host.docker.internal:54321",
  Deno.env.get('SUPABASE_ANON_KEY')!
)

export const generateRandomString = () => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const N = 16
  const randomString = Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('')
  return randomString
}

// CORS等headerの設定
export const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}
