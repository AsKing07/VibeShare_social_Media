import { createClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

export function PostCard({ className, post, userId, onDelete, onEdit, ...props }) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    async function fetchUrl() {
      if (post.image_url) {
        // const { data: imageData } = await supabase.storage
        //   .from("post-images")
        //   .download(post.image_url);
        // if (imageData) {
        //   setPostImageUrl(URL.createObjectURL(imageData));
        // }
        setPostImageUrl(post.image_url);
      }
   
        if (post.profiles.avatar_url) {
          const { data: avatarData } = supabase.storage
            .from("avatars")
            .getPublicUrl(post.profiles.avatar_url);
          setAvatarUrl(avatarData.publicUrl);
        }
      
    }

    fetchUrl().then(() => setIsLoading(false));
  }, [post, supabase]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-white shadow-md transition-all duration-300 hover:shadow-2xl ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 opacity-50"></div>
      <div className="p-6 relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={avatarUrl || "/images/default-avatar.jpg"}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-300"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{post.profiles.username}</h3>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p className="text-gray-800 text-lg">{post.content}</p>
        {postImageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={postImageUrl} 
              alt="Post" 
              className="w-full h-48 object-contain rounded-lg shadow-md"
            />
          </div>
        )}
        {userId === post.user_id && (
          <div className="flex space-x-2">
            <button onClick={()=>{onEdit(post)}} className="text-blue-500 hover:underline">
              Modifier
            </button>
            <button onClick={()=>{
              if (window.confirm("Voulez-vous supprimer ce post?")) {
                onDelete();
              }
            }} className="text-red-500 hover:underline">
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
