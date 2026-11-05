import * as cheerio from "cheerio";
import fs from "node:fs";
const BASE = "https://www.divinebrujitadj.org";
const OUT = "E:/xampp/htdocs/divine-brujita/lib/content/";
const get = async (p) => (await fetch(BASE + p, { headers: { "user-agent": "Mozilla/5.0" } })).text();
const clean = (s) => s.replace(/\u200b/g, "").replace(/[ \t\r]+/g, " ").replace(/ *\n */g, "\n").trim();
function blocks(html) {
  const $ = cheerio.load(html);
  $("script,style,header,footer,nav,noscript,svg,form").remove();
  const root = $("main").length ? $("main") : $("body");
  const out = [];
  root.find("h1,h2,h3,h4,p,li").each((_, el) => {
    const $el = $(el);
    if ($el.parents("li").length && el.tagName !== "li") return;
    if ($el.find("h1,h2,h3,h4,p,li").length) return;
    $el.find("br").replaceWith("\n");
    const text = clean($el.text());
    if (!text) return;
    const t = /^h/.test(el.tagName) ? "h" : el.tagName === "li" ? "li" : "p";
    out.push({ t, text });
  });
  return out;
}
const save = (n, d) => { fs.writeFileSync(OUT + n + ".json", JSON.stringify(d)); console.log(n, Array.isArray(d) ? d.length : Object.keys(d)); };

// legal
const legal = {};
for (const [k, p] of [["privacy", "/new-page-1"], ["refund", "/new-page-1-1"], ["disclaimer", "/new-page-1-2"], ["terms", "/new-page-1-3"]]) legal[k] = blocks(await get(p));
save("legal", legal);

// madre
const mHtml = await get("/madre");
save("madre", blocks(mHtml));

// faq
{
  const $ = cheerio.load(await get("/faq-1"));
  const items = [];
  $(".accordion-item").each((_, el) => {
    const q = clean($(el).find(".accordion-item__title").first().text());
    const d = $(el).find(".accordion-item__description").first();
    d.find("br").replaceWith("\n");
    d.find("p,li,div").each((__, e) => { $(e).append("\n"); });
    const a = clean(d.text());
    if (q) items.push({ q, a });
  });
  save("faq", items);
}

// testimonials
{
  const $ = cheerio.load(await get("/new-page-3"));
  $("br").replaceWith(" ");
  const txt = $(".sqs-html-content").map((_, e) => $(e).text()).get().join(" ").replace(/\u200b/g, "");
  const re = /Username:\s*(.*?)\s*Date:\s*(\d{4}-\d{2}-\d{2})\s*Testimony:\s*(.*?)(?=Username:|$)/gs;
  const items = [];
  let m;
  while ((m = re.exec(txt))) items.push({ u: m[1].trim(), d: m[2], q: clean(m[3]) });
  save("testimonials", items);
}

// videos
save("videos", blocks(await get("/new-page-2")));
// services-content blocks
save("services-content", blocks(await get("/services-content")));

// products
async function coll(path, name) {
  let off = "", all = [];
  for (let i = 0; i < 20; i++) {
    const j = await (await fetch(BASE + path + "?format=json" + off, { headers: { "user-agent": "Mozilla/5.0" } })).json();
    for (const it of j.items || []) {
      const sc = it.structuredContent || {};
      const variants = (sc.variants || []).map((v) => ({ price: Number(v.priceMoney?.value), opts: (v.optionValues || []).map((o) => o.value) }));
      const prices = variants.map((v) => v.price).filter(Boolean);
      const $ = cheerio.load("<div>" + (it.body || "") + "</div>");
      $("br").replaceWith("\n");
      const paras = [];
      $("p,li,h1,h2,h3,h4").each((_, e) => { const t = clean($(e).text()); if (t) paras.push(t); });
      const imgs = [it.assetUrl, ...((it.items || []).map((x) => x.assetUrl))].filter(Boolean);
      all.push({
        slug: (it.fullUrl || "").split("/").pop(),
        title: it.title,
        price: prices.length ? Math.min(...prices) : 0,
        priceMax: prices.length ? Math.max(...prices) : 0,
        options: (sc.variantOptionOrdering || []).map((n, idx) => ({ name: n, values: [...new Set(variants.map((v) => v.opts[idx]).filter(Boolean))] })),
        images: [...new Set(imgs)],
        body: paras,
        categories: it.categories || [],
      });
    }
    const next = j.pagination?.nextPageOffset;
    if (!next) break;
    off = "&offset=" + next;
  }
  save(name, all);
}
await coll("/shop", "spells");
await coll("/store-1-copy-1", "creations");
