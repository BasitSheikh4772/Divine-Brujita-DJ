import legal from "./content/legal.json";

export const legalDocs = [
  { slug: "terms", key: "terms", title: "Terms & Conditions", desc: "Eligibility, services, bookings, products and how you may use this website." },
  { slug: "privacy", key: "privacy", title: "Privacy Policy", desc: "What information may be collected and how it is used and protected." },
  { slug: "disclaimer", key: "disclaimer", title: "Disclaimer", desc: "Spiritual and entertainment purposes, no guarantees and personal responsibility." },
  { slug: "refund", key: "refund", title: "Refund Policy", desc: "All sales are final — services, Zelle payments and physical products." },
] as const;

type B = { t: "h2" | "p" | "li"; text: string; id: string };

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Source blocks are headings/paragraphs/list items; short un-punctuated paragraphs are treated as sub-headings. */
export function legalBlocks(slug: string): B[] {
  const doc = legalDocs.find((d) => d.slug === slug)!;
  const raw = (legal as Record<string, { t: string; text: string }[]>)[doc.key];
  const out: B[] = [];
  raw.forEach((b, i) => {
    const text = b.text.trim();
    if (i === 0 && b.t === "h" && text.length < 40) return;
    const isHead = b.t === "h" || (b.t === "p" && text.length < 48 && !/[.:,;!?]$/.test(text) && /^[A-Z&]/.test(text));
    out.push({ t: isHead ? "h2" : b.t === "li" ? "li" : "p", text, id: slugify(text) + "-" + i });
  });
  return out;
}
