import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  let user;
  try {
    const { data } = await supabase.auth.getUser();
    user = data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur: ", error);
  }

  //  if (!user) return redirect("/post");
  // if (user) return redirect("/profile");

   return redirect('/post')
}
