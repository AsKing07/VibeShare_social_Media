"use client"
import { signup } from "./../actions";
import React, {useState} from "react";
import Link from "next/link";
import { Eye, EyeClosed, LoaderCircleIcon } from "lucide-react";

export default function RegisterPage() {
  const [passwordHiden, setPasswordHiden] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const result = await signup(formData);
      if (result.redirect) {
        // Redirigez l'utilisateur vers la page de vérification d'email
        window.location.href = result.redirect;
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="min-h-screen flex items-center justify-center mt">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Créer un compte</h1>
            <p className="text-gray-600">Rejoignez la communauté VibeShare</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-row space-x-4">
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="johndoe"
              />
            </div>

            </div>
           

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  name="password"
                  type={passwordHiden ? "password" : "text"}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setPasswordHiden(!passwordHiden)}
                  className=" cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={passwordHiden ? "Afficher le mot de passe" : "Masquer le mot de passe"}
                >
                  {passwordHiden ? (
                    <EyeClosed className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="justify-center  cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02]"
            >
              {isSubmitting ? <LoaderCircleIcon className="animate-spin mx-auto" /> : "Créer un compte"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Déjà un compte ?{" "}
              <Link 
                href="/auth/login" 
                className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
