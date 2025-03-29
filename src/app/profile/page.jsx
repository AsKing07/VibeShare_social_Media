import ProfileForm from "./ProfileForm";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <ProfileForm user={user} />;
}
