export const isImage = (file: File | string) => {
  if (typeof file === "string") return false;
  return file.type.startsWith("image");
};
