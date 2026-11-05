import fs from "node:fs";
const BASE = "https://www.divinebrujitadj.org";
const H = { headers: { "user-agent": "Mozilla/5.0" } };
const groups = {
  spells: {
    base: "/shop/",
    cats: [
      ["weekly-offers", "Weekly Offers"], ["5-in-1-bundles", "5-in-1 Bundles"], ["mini-read", "Mini Reads"], ["next-level-doll", "Next Level Dolls"], ["specialty-dolls", "Specialty Dolls"],
      ["love-attraction-relationships", "Love & Relationships"], ["protection-energy", "Protection & Energy"], ["prosperity-carrer-success", "Prosperity & Career"],
      ["emotional-spiritual-wellness", "Emotional & Spiritual Wellness"], ["family-life-journey", "Family & Life Journey"], ["justice-karma", "Justice & Karma"],
      ["beauty-and-self-empowerment", "Beauty & Self-Empowerment"], ["rebirth-transformation", "Rebirth & Transformation"],
    ],
  },
  creations: {
    base: "/store-1-copy-1/",
    cats: [["blankets", "Blankets"], ["bracelets", "Bracelets"], ["crystals", "Crystals"], ["rings-65", "Rings"], ["santa-muerte", "Santa Muerte"], ["soft-case-eye-glass-carrier", "Eyeglass Cases"], ["vases", "Vases"]],
  },
};
const out = {};
for (const [g, def] of Object.entries(groups)) {
  const bySlug = {};
  const catList = [];
  for (const [id, label] of def.cats) {
    let off = "", n = 0;
    for (let i = 0; i < 30; i++) {
      const j = await (await fetch(BASE + def.base + id + "?format=json" + off, H)).json();
      for (const it of j.items || []) {
        const slug = (it.fullUrl || "").split("/").pop();
        (bySlug[slug] ||= []).push(id);
        n++;
      }
      const nx = j.pagination?.nextPageOffset;
      if (!nx) break;
      off = "&offset=" + nx;
    }
    catList.push({ id, label, n });
    console.log(g, id, n);
  }
  out[g] = { cats: catList, bySlug };
}
fs.writeFileSync("lib/content/categories.json", JSON.stringify(out));
