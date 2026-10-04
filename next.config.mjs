// Normal builds (npm run dev / build, Vercel, Netlify) need no setup.
// "npm run deploy" sets GITHUB_PAGES=true to build a static site for GitHub Pages.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/Hayaans-Cafe-And-Bakery" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isPages ? { output: "export", trailingSlash: true } : {}),
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
