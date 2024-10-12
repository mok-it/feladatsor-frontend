import { useAtomValue } from "jotai";
import { tokenAtom } from "./atoms";
import { fromBase64 } from "./toBase64";

export const useUploadImage = () => {
  const token = useAtomValue(tokenAtom);

  return async (base64: string): Promise<{ id: string; url: string }> => {
    const file = fromBase64(base64);
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
  };
};
