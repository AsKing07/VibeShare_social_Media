import Posts from './Posts';
import { createClient } from '@/lib/supabase/server';

export default async function PostsPage() {
    const supabase =await createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if(user)
    {
      const { data: profilData, error: profilError } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("id", user.id)
      .single();
  
  
      return <Posts user={profilData} />;

    }
    else
    {
      return <Posts user={user} />;
    }
  
  }
  