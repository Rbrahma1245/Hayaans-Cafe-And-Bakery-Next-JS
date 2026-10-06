export function parseSizes(sizes) {
  if (!sizes) return [];

  if (Array.isArray(sizes)) {
    return sizes;
  }

  if (typeof sizes === "string") {
    try {
      const parsed = JSON.parse(sizes);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}
