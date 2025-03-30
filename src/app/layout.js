/* eslint-disable react/prop-types */
import React from "react";
import "../styles/globals.css";
// import NavBar from "@/components/Navbar/NavBar";
import NavBar from "../components/Navbar/NavBar";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "VibeShare - Votre Réseau Social",
  description: "Connectez-vous et partagez vos moments avec VibeShare",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <div className="container w-full ">
          <NavBar />
          <div className="flex flex-col items-center justify-center min-h-screen pt-16 mt-2">
            <ToastContainer position="top-right" />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
