/* eslint-disable react/prop-types */
"use client";
import { useCallback, useEffect, useState, React } from "react";
import { createClient } from "@/lib/supabase/client";
import UploadImage from "@/app/profile/components/uploadImage";

export default function ProfileForm({ user }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`fullname, username, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.fullname);
        setUsername(data.username);

        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Erreur de chargement des données utilisateur!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({ username, avatar_url }) {
    if (user) {
      try {
        setLoading(true);
        console.log("user", user.id);
        const { error } = await supabase
          .from("profiles")
          .update({
            fullname: fullname,
            username,
            avatar_url,
            // updated_at: new Date().toISOString(),
          })
          .eq("id", user?.id);
        if (error) throw error;
        alert("Profil mis à jour!");
      } catch (error) {
        alert("Erreur mise à jour des données !");
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Pas authentifié!");
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md  mx-4 overflow-hidden sm:rounded-lg">
      <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-600 mb-2">Bienvenue</h1>
            <p className="text-gray-400">Gérez votre compte</p>
          </div>
        <UploadImage
          uid={user?.id}
          url={avatar_url}
          size={90}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ fullname, username, avatar_url: url });
          }}
          bucket={"avatars"}
        />

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            value={user?.email}
            disabled
            className="mt-1 block w-full pl-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
            className="mt-1 block w-full pl-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full pl-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            className="cursor-pointer mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => updateProfile({ fullname, username, avatar_url })}
            disabled={loading}
          >
            {loading ? "Chargement ..." : "Mettre à jour"}
          </button>
        </div>

        <div>
          <form action="/auth/signout" method="post" className="mt-3">
            <button
              className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              type="submit"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </div>

    </div>

    
  );
}
