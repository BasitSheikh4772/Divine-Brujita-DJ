import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for shared hosting (Hostinger): generates ./out
  output: "export",
  trailingSlash: true,
  // Set NEXT_PUBLIC_BASE_PATH=/Repo-Name when hosting under github.io/Repo-Name
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
