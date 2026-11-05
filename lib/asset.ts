/** Prefix for deployments under a sub-path (GitHub Pages project sites). Empty in dev / root hosting. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => (p.startsWith("/") && !p.startsWith("//") ? BASE_PATH + p : p);
