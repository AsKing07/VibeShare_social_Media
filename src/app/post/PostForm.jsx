import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import UploadPostImage from "./components/uploadImage";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from "@mui/material";
import { CloseCircle, AddSquare, Additem } from "iconsax-react";


export default function PostForm({user, post, sidebarOpen, closeSidebar }) {
  const supabase = createClient();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("imageUrl", imageUrl);
   
  }, [imageUrl]);

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setImageUrl(post.image_url);
    }
  }, [post]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let erreur;

  if(!post)
  {
    const { error } = await supabase.from("posts").insert([
      {
        content,
        image_url: imageUrl,
        user_id: user?.id,
      },
    ]);
    if (error)  erreur=error;

  }
  else{
    const { error } = await supabase.from("posts").update({ content, image_url: imageUrl }).eq("id", post.id);
    if (error) erreur=error;
  }
   

    setLoading(false);

    if (erreur) {
      console.error("Erreur lors de la publication du post :", error);
    } else {
      setContent("");
      setImageUrl(null);
      alert("Post publié avec succès !");
      closeSidebar();
    }
  };

  return (
    <Dialog className="border-transparent"  open={sidebarOpen} onClose={() => closeSidebar()}>
       <DialogContent className={`fixed inset-y-0 right-0 z-50 h-full w-full max-w-[547px] overflow-y-scroll bg-white  shadow-dashboard-right-sidebar transition-all duration-500  ${
        sidebarOpen
          ? "animate-slide-left"
          : "animate-slide-right"
      } `}>
<div className="relative px-[52px] ">
<button
          onClick={closeSidebar}
          className="bg-site-red-50 absolute right-[52px] top-[52px] flex items-center justify-center rounded-full p-[10px]"
        >
          <CloseCircle size={20} className="text-[#CE2029]" />
        </button>
        <div className="mb-4 pt-[8px]">
          <AddSquare color="#333333" size={60} />
        </div>
        <div className="flex items-center gap-5 pb-[34px]">
          <h2 className="max-w-[241px] border-gray-300 pr-4 text-2xl/[36px] font-bold text-primary lg:border-r">
            {post
              ? "Modifier un post"
              : "Créer un nouveau post"}
          </h2>
          <p className="text-sm/[21px] font-light text-pure-black">
            Post
          </p>
        </div>

</div>


       <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <textarea
        className="border p-2 rounded"
        placeholder="Écrivez votre message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Composant Upload Image */}
      <UploadPostImage onUpload={setImageUrl} url={imageUrl}  uid={user?.id} />
<button
  type="submit"
  className="cursor-pointer bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center justify-center"
  disabled={!content || loading}
>
  {loading ? <CircularProgress size={24} color="inherit" /> : "Publier"}
</button>
     
    </form>
      
      </DialogContent>
    
    </Dialog>
  
  );
}
