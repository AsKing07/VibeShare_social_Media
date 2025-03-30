/* eslint-disable react/prop-types */
"use client";
import React, { use, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-toastify";
// import Image from "next/image";

export default function UploadPostImage({ uid, url, size = 300, onUpload, bucket = "post-images" }) {
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
      const filePath = `${uid}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);
      const {  data, error } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

      if (uploadError|error) {
        throw uploadError;
      }


      onUpload(data.publicUrl);
    } catch (error) {
      // alert("Erreur lors du téléchargement de l'image !");
      toast.error("Erreur lors du téléchargement de l'image: " + error.message);
      console.error("Error uploading image: ", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {url ? (
        <img
        alt="post"
          width={size}
          height={size}
          src={url}
         className="rounded-lg border-2 border-gray-300"
          style={{ height: size, width: size, objectFit: "cover" }}
        />
      ) : (
        <div
          className="bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center"
          style={{ height: size, width: size }}
        >
          <span>Aucune image</span>
        </div>
      )}
      <div className="mt-4">
        <label
          className="cursor-pointer button primary flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          htmlFor="post-image-upload"
        >
          {uploading ? "Téléchargement..." : "Télécharger une image"}
        </label>
        <input
          style={{ visibility: "hidden", position: "absolute" }}
          type="file"
          id="post-image-upload"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
          size={2097152} // 2 Mo
        />
      </div>
    </div>
  );
}
