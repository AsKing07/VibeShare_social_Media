"use client"; // Ajout pour Next.js car on utilise des hooks côté client

import { useState, useEffect, React } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icônes pour le menu
import Image from "next/image";
import { toast } from "react-toastify";

export default function NavBar() {
  const [user, setUser] = useState(null);
  const [avatar_url, setAvatarUrl] = useState("/images/default-avatar.jpg");
  const [menuOpen, setMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const supabase = createClient();

  useEffect(() => {

    
  

    // Écoute les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Événement d'authentification:", event, "Session:", session); // Log pour débogage

      if (event === 'SIGNED_IN') {
        // handle sign in event
        setUser(session.user);
        fetchUser(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
        console.log("Utilisateur déconnecté");
        setUser(null);
      } 
    
    });
  
    // Fonction pour récupérer les données de l'utilisateur
    async function fetchUser(userId) {
      try {
        const { data: profilData, error: profilError } = await supabase
          .from("profiles")
          .select(`*`)
          .eq("id", userId)
          .single();



        if (profilError) {
    console.error("Erreur lors de la récupération du profil: ", profilError);
  } else {
    setUser(profilData);
    if(profilData.avatar_url) setAvatarUrl(profilData.avatar_url);

  }

      } catch (error) {
        console.error("Erreur lors de la récupération du profil: ", error);
        toast.error("Erreur lors de la récupération du profil dans le navbar: " + error.message);
        setErrorMessage("Erreur lors de la récupération des données de profil.");
      }
    }

 // Écoute les changements de profil en temps réel
 const profileChannel = supabase
 .channel("realtime-profiles")
 .on(
   "postgres_changes",
   { event: "UPDATE", schema: "public", table: "profiles" },
   async (payload) => {
     if (  user!=null && payload.new.id === user?.id) {
       // Récupérer les nouvelles données de profil
       fetchUser(payload.new.id);
     }
   }
 )
 .subscribe();

// Nettoyage de l'abonnement lors du démontage du composant
return () => {
 subscription.unsubscribe();
 profileChannel.unsubscribe();
};
}, [supabase]);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/default-avatar.jpg" width={40} height={40} alt="Logo" />
            <span className="text-xl font-bold ml-2 text-gray-800">
              VibeShare
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Accueil
            </Link>
            {/* <Link
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              À propos
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Contact
            </Link> */}
          </div>

          {/* Boutons Connexion / Profil */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link
                href="/profile"
                className="flex items-center space-x-2"
              >
                <img
                  src={`${avatar_url}`}
                  width={32}
                  height={32}
                  className="rounded-full"
                  alt="Avatar"
                />
                <span className="text-gray-700">{user.username}</span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Menu Mobile - Bouton */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="flex flex-col space-y-3 text-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Accueil
            </Link>
            {/* <Link
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              À propos
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Contact
            </Link> */}
            {user ? (
              <Link
                href="/profile"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Mon Compte
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition mx-auto"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
