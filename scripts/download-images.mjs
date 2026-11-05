import fs from "node:fs";
import crypto from "node:crypto";

const BASE = "https://www.divinebrujitadj.org";
const H = { headers: { "user-agent": "Mozilla/5.0" } };
const DIR = "public/img/site";
fs.mkdirSync(DIR, { recursive: true });

const urls = new Set();
const add = (u) => u && u.includes("squarespace-cdn.com") && urls.add(u.split("?")[0]);

for (const f of ["spells", "creations"]) {
  for (const p of JSON.parse(fs.readFileSync(`lib/content/${f}.json`, "utf8"))) (p.images || []).forEach(add);
}
const pages = ["/", "/madre", "/faq-1", "/new-page-2", "/new-page-3", "/new-page-4", "/services-content", "/shop", "/store-1-copy-1", "/shop/weekly-offers"];
for (const p of pages) {
  const t = await (await fetch(BASE + p, H)).text();
  for (const m of t.matchAll(/https:\/\/images\.squarespace-cdn\.com\/[^"'\\\s<>)]+/g)) add(m[0].replace(/&amp;/g, "&"));
}
console.log("unique images", urls.size);

const map = {};
const list = [...urls];
let done = 0;
async function one(u) {
  const key = crypto.createHash("md5").update(u).digest("hex").slice(0, 12);
  const existing = fs.readdirSync(DIR).find((f) => f.startsWith(key + "."));
  if (existing) { map[u] = `/img/site/${existing}`; return; }
  const r = await fetch(u + (u.includes("?") ? "&" : "?") + "format=1000w", H);
  if (!r.ok) { console.log("fail", r.status, u); return; }
  const ct = r.headers.get("content-type") || "";
  const ext = ct.includes("webp") ? "webp" : ct.includes("png") ? "png" : ct.includes("gif") ? "gif" : ct.includes("svg") ? "svg" : "jpg";
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(`${DIR}/${key}.${ext}`, buf);
  map[u] = `/img/site/${key}.${ext}`;
}
let i = 0;
await Promise.all(Array.from({ length: 8 }, async () => {
  while (i < list.length) {
    const u = list[i++];
    try { await one(u); } catch (e) { console.log("err", u); }
    if (++done % 50 === 0) console.log(done, "/", list.length);
  }
}));
fs.writeFileSync("lib/content/imgmap.json", JSON.stringify(map));
console.log("saved", Object.keys(map).length);

// favicon / icons from <head>
const head = await (await fetch(BASE + "/", H)).text();
const icons = [...head.matchAll(/<link[^>]+rel="[^"]*(?:icon|apple-touch-icon)[^"]*"[^>]*>/g)].map((m) => m[0]);
console.log(icons.join("\n"));
const og = head.match(/property="og:image"[^>]+content="([^"]+)"/)?.[1];
console.log("og:image", og);
