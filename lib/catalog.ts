import spellsRaw from "./content/spells.json";
import creationsRaw from "./content/creations.json";
import imgmap from "./content/imgmap.json";
import catData from "./content/categories.json";

export type Product = {
  slug: string;
  title: string;
  price: number;
  priceMax: number;
  options: { name: string; values: string[] }[];
  images: string[];
  excerpt: string;
  kind: "spell" | "creation";
  cat: string;
  cats: string[];
};

/** Squarespace CDN resizer — keeps pages light without a local copy of every image. */
const map = imgmap as Record<string, string>;
export const sq = (url: string | undefined, w = 600) => {
  if (!url) return "/img/hero.png";
  const local = map[url.split("?")[0]];
  return local ?? `${url}${url.includes("?") ? "&" : "?"}format=${w}w`;
};

export const cleanTitle = (t: string) => t.replace(/^[^\w#]+/u, "").trim();

type CatGroup = { cats: { id: string; label: string; n: number }[]; bySlug: Record<string, string[]> };
const cd = catData as { spells: CatGroup; creations: CatGroup };
export const spellCats = [{ id: "all", label: "All" }, ...cd.spells.cats.map((c) => ({ id: c.id, label: c.label }))];
export const creationCats = [{ id: "all", label: "All" }, ...cd.creations.cats.map((c) => ({ id: c.id, label: c.label }))];

type Raw = { slug: string; title: string; price: number; priceMax: number; options: { name: string; values: string[] }[]; images: string[]; excerpt: string };

function build(raw: Raw[], kind: Product["kind"], dedupe = false): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const r of raw) {
    const key = r.title + r.price;
    if (dedupe) {
      if (seen.has(key)) continue;
      seen.add(key);
    }
    out.push({ ...r, title: cleanTitle(r.title), kind, cats: (kind === "spell" ? cd.spells : cd.creations).bySlug[r.slug] ?? [], cat: ((kind === "spell" ? cd.spells : cd.creations).bySlug[r.slug] ?? ["other"])[0] });
  }
  return out;
}

export const spells = build(spellsRaw as Raw[], "spell");
export const creations = build(creationsRaw as Raw[], "creation", true);

export const spellBySlug = (s: string) => spells.find((p) => p.slug === s);
export const creationBySlug = (s: string) => creations.find((p) => p.slug === s);
export const spellByNumber = (n: string) => spells.find((p) => p.title.startsWith(`#${n} `));
export const spellHref = (n: string) => {
  const p = spellByNumber(n);
  return p ? `/shop/${p.slug}` : "/shop";
};
export const spellByTitle = (frag: string) => spells.find((p) => p.title.toLowerCase().includes(frag.toLowerCase()));
