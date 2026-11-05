import * as cheerio from "cheerio";
import fs from "node:fs";
const BASE = "https://www.divinebrujitadj.org";
const OUT = "E:/xampp/htdocs/divine-brujita/lib/content/";
const H = { headers: { "user-agent": "Mozilla/5.0" } };
const clean = (s) => s.replace(/\u200b/g, "").replace(/[ \t\r]+/g, " ").replace(/ *\n */g, "\n").trim();
const body = (html) => {
  const $ = cheerio.load("<div>" + (html || "") + "</div>");
  $("br").replaceWith("\n");
  const out = [];
  $("p,li,h1,h2,h3,h4").each((_, e) => { const t = clean($(e).text()); if (t) out.push(t); });
  if (!out.length) { const t = clean($("div").text()); if (t) out.push(t); }
  return out;
};
async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; try { await fn(items[k], k); } catch (e) { console.log("fail", items[k].url); } } }));
}
async function coll(path, name) {
  let off = "", all = [];
  for (let i = 0; i < 30; i++) {
    const j = await (await fetch(BASE + path + "?format=json" + off, H)).json();
    for (const it of j.items || []) {
      const sc = it.structuredContent || {};
      const variants = (sc.variants || []).map((v) => ({ price: Number(v.priceMoney?.value), opts: (v.optionValues || []).map((o) => o.value) }));
      const prices = variants.map((v) => v.price).filter(Boolean);
      all.push({
        slug: (it.fullUrl || "").split("/").pop(), url: it.fullUrl, title: it.title,
        price: prices.length ? Math.min(...prices) : 0, priceMax: prices.length ? Math.max(...prices) : 0,
        options: (sc.variantOptionOrdering || []).map((n, idx) => ({ name: n, values: [...new Set(variants.map((v) => v.opts[idx]).filter(Boolean))] })),
        images: [...new Set([it.assetUrl, ...((it.items || []).map((x) => x.assetUrl))].filter(Boolean))],
        body: body(it.body), excerpt: it.excerpt ? clean(cheerio.load("<div>" + it.excerpt + "</div>")("div").text()) : "",
      });
    }
    const next = j.pagination?.nextPageOffset;
    if (!next) break;
    off = "&offset=" + next;
  }
  await pool(all, 8, async (p) => {
    const j = await (await fetch(BASE + p.url + "?format=json", H)).json();
    const it = j.item || {};
    p.body = body(it.body);
    const imgs = [it.assetUrl, ...((it.items || []).map((x) => x.assetUrl))].filter(Boolean);
    if (imgs.length) p.images = [...new Set(imgs)];
  });
  fs.writeFileSync(OUT + name + ".json", JSON.stringify(all));
  console.log(name, all.length, "with body", all.filter((p) => p.body.length).length);
}
await coll("/shop", "spells");
await coll("/store-1-copy-1", "creations");
