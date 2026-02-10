"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/app/lib/supabase/server";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?e=1");
  }

  redirect("/app");
}