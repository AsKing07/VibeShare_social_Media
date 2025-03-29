import React from "react";

export default function VerifyEmailPage() {
  return (
    <div className="justify-center items-center flex flex-col h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Vérification d'email</h1>
        <p className="text-gray-600 text-center mb-4">
          Un email de vérification a été envoyé à votre adresse email.
          Veuillez vérifier votre boîte de réception et cliquer sur le lien de vérification.
        </p>
        <p className="text-sm text-gray-500 text-center">
          Si vous ne recevez pas l'email, vérifiez votre dossier spam ou réessayez l'inscription.
        </p>
      </div>
    </div>
  );
} 