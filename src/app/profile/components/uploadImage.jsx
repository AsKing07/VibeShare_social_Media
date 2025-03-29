/* eslint-disable react/prop-types */
"use client";
import React, {  useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function UploadImage({ uid, url, size, onUpload, bucket }) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);

 

  const uploadImage = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Vous devez sélectionner une image à télécharger.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}/${bucket}/${uid}.${fileExt}`;

      // Suppression du fichier existant avant de télécharger le nouveau
      await supabase.storage.from(bucket).remove(filePath);

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);
        const {  data, error } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      if (uploadError | error) {
        throw uploadError;
      }

      onUpload(data.publicUrl);
    } catch (error) {
      alert("Image de téléchargement d'erreur!");
      console.error("Error uploading image: ", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {imageUrl ? (
        <Image
          width={size}
          height={size}
          src={url}
          alt="Avatar"
          className="avatar image rounded-full border-2 border-gray-300"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image rounded-full border-2 border-gray-300 relative"
          style={{ height: size, width: size }}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
        </div>
      )}
      <div className="mt-4">
        <label
          className="button cursor-pointer primary  flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg- block"
          htmlFor="single"
        >
          {uploading ? "Téléchargement ... " : " Télécharger"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
          size={2097152} // 2 Mo
        />
      </div>
    </div>
  );
}
