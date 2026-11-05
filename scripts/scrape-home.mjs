import * as cheerio from "cheerio";
import fs from "node:fs";
const t = fs.readFileSync("scripts/home.html", "utf8");
const $ = cheerio.load(t);
const clean = (s) => s.replace(/​/g, "").replace(/[ \t\r]+/g, " ").replace(/ *\n */g, "\n").trim();

// accordions with paragraph structure
const acc = [];
$(".accordion-item").each((_, el) => {
  const q = clean($(el).find(".accordion-item__title").first().text());
  const d = $(el).find(".accordion-item__description").first();
  const paras = [];
  d.find("p,li,h1,h2,h3,h4").each((__, e) => {
    const $e = $(e);
    if ($e.find("p,li,h1,h2,h3,h4").length) return;
    $e.find("br").replaceWith("\n");
    const x = clean($e.text());
    if (x) paras.push({ t: e.tagName === "li" ? "li" : /^h/.test(e.tagName) ? "h" : "p", text: x });
  });
  if (!paras.length) { const x = clean(d.text()); if (x) paras.push({ t: "p", text: x }); }
  if (q) acc.push({ q, paras });
});
fs.writeFileSync("lib/content/home-accordions.json", JSON.stringify(acc));
console.log("accordions", acc.map((a) => a.q + " (" + a.paras.length + ")").join(" | "));

// testimonials: quote then @handle • date
const ps = [];
$("p,h1,h2,h3,h4,li").each((_, e) => {
  const $e = $(e);
  if ($e.find("p,li,h1,h2,h3,h4").length) return;
  const x = clean($e.text());
  if (x) ps.push(x);
});
const reviews = [];
for (let i = 0; i < ps.length - 1; i++) {
  const h = ps[i + 1].match(/^@(\S+)\s*•\s*(.+)$/);
  if (/^[“"]/.test(ps[i]) && h) reviews.push({ q: ps[i].replace(/^[“"]|[”"]$/g, "").trim(), u: h[1], d: h[2].trim() });
}
fs.writeFileSync("lib/content/home-reviews.json", JSON.stringify(reviews));
console.log("reviews", reviews.length);

// other home blocks (what work helps, how performed, important info, add-ons, why choose, consultation, how to book, safety)
const interesting = ps.filter((x) => x.length < 400 && !/^[“"]/.test(x) && !/^@/.test(x));
console.log(interesting.join("\n"));
