import { useAuth } from "@/pages/AuthContext";
import { useCallback } from "react";
import { fromBase64 } from "./toBase64";

export const useUploadImage = () => {
  const { token } = useAuth();

  return useCallback(
    async (base64: string | File): Promise<{ id: string; url: string }> => {
      const file = typeof base64 == "string" ? fromBase64(base64) : base64;
      console.log(file);
      const formData = new FormData();
      formData.append("file", file as Blob);
      const res = await fetch(
        import.meta.env.VITE_APP_ENDPOINT + "/image/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      const data = await res.json();
      return { id: data.id, url: data.url };
    },
    [token],
  );
};
