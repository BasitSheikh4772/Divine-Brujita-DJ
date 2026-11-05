// Custom next/image loader: static export has no optimizer, but we still need the sub-path prefix.
export default function loader({ src }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") && !src.startsWith("//") ? base + src : src;
}
