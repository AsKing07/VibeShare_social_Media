"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    options: {
      data: {
        fullname: formData.get("fullname") ? formData.get("fullname") : "",
        username: formData.get("username") ? formData.get("username") : "",
        avatar_url: formData.get("avatar_url")
          ? formData.get("avatar_url")
          : "",
      },
    },
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/profile");
}

export async function signup(formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    options: {
      data: {
        fullname: formData.get("fullname") || "",
        username: formData.get("username") || "",
      }
    }
  };

  try {
    const { error } = await supabase.auth.signUp(data);

    if (error) {
      console.error("Erreur d'inscription:", error.message);
      return redirect ("/error");
    }

    revalidatePath("/", "layout");
    redirect("/auth/verify-email");
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    // throw error;
    return redirect ("/error");
  }
}
