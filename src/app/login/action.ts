"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: { email: string; password: string }) {
  const supabase = createClient();

  const data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  const result = await supabase.auth.signInWithPassword(data);

  return JSON.stringify(result);
}

export async function signup(formData: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const supabase = createClient();

  const data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  const result = await supabase.auth.signUp(data);

  return JSON.stringify(result);
}

export async function signOut() {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}

export async function getAdmin() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  const result = await supabase
    .from("Roles")
    .select("*")
    .eq("user_id", data?.user?.id)
    .single();

  if (!result.data) {
    return false;
  }

  return true;
}

export async function isAuth() {
  const supabase = createClient();

  const result = await supabase.auth.getUser();

  if (!result.data) {
    return false;
  }

  return true;
}
