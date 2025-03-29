"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {PostCard } from "@/components/ui/card";
import Image from "next/image";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from "@mui/material";
import PostForm from "./PostForm";
import { redirect } from "next/navigation";

export default function Posts({ user }) {
  const supabase = createClient();
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [channel, setChannel] = useState(null);

  const [loading, setLoading] = useState(true);
  const [postToEdit, setPostToEdit] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*,profiles(*)")
        .order("created_at", { ascending: false });
        console.log(postsData)

      if (postsError) {
        console.error("Erreur lors de la récupération des posts :", postsError);
      } else {
        setPosts(postsData);

      }
      setLoading(false);
    }

    fetchPosts();

    const newChannel = supabase
      .channel("realtime-posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setPosts((prevPosts) => [payload.new, ...prevPosts]);
          } else if (payload.eventType === "DELETE") {
            setPosts((prevPosts) =>
              prevPosts.filter((post) => post.id !== payload.old.id)
            );
          } else if (payload.eventType === "UPDATE") {
            setPosts((prevPosts) =>
              prevPosts.map((post) =>
                post.id === payload.new.id ? payload.new : post
              )
            );
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setChannel(newChannel);
        }
      });

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [supabase]);

  const handleDeletePost = async (postId) => {   
    setLoading(true);

    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) {
      console.error("Erreur lors de la suppression du post :", error);
      alert("Erreur lors de la suppression du post :", error);
    } else {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      setLoading(false);
      alert("Post supprimé avec succès !");
    }
  };
  
  const handleEditPost = (post) => {
    // Logique pour ouvrir un formulaire de modification avec les données du post
    console.log("Modifier le post :", post);
    setPostToEdit(post);
    setOpenDialog(true);
  };

  return (
    <div className="w-full inset-0 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="min-h-screen flex items-center justify-center">
      
      <div className="space-y-6 p-4 w-full max-w-md mx-auto">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <CircularProgress />
        </div>
      ) : posts.length > 0 ? (
        posts.map((post) => {
          return (
            <PostCard 
              key={post.id} 
              className="w-full p-5 shadow-lg hover:shadow-xl transition duration-300" 
              post={post}
              userId={user.id}
              onDelete={() => handleDeletePost(post.id)}
              onEdit={() => handleEditPost(post)}
            />
          );
        })
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Aucun post trouvé. Créez-en un nouveau !</p>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={() =>{
          if (user) {
            setOpenDialog(true);
          }
          else{
            redirect("/auth/login");
          }
        }}
      >
        Créer un post
      </Button>
      {
        user &&
        (
          <>
           

<PostForm post={postToEdit} user={user} sidebarOpen={openDialog} closeSidebar={()=>{
  setOpenDialog(false);
  setPostToEdit(null);
}}  />

          </>
        )
      }
     
    </div>
        </div>
      </div>
   
  );
}
