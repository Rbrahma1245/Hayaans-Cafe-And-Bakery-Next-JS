export function imageUrl(image) {
  if (!image) return "";
  if (/^https?:\/\//.test(image)) return image;
  if (image.startsWith("/uploads/")) return (process.env.NEXT_API_URL || "") + image;
  return (process.env.NEXT_PUBLIC_BASE_PATH || "") + image;
}
