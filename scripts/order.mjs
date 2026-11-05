import fs from "node:fs";
const t = await (await fetch("https://www.divinebrujitadj.org/new-page-2", { headers: { "user-agent": "Mozilla/5.0" } })).text();
const rituals = JSON.parse(fs.readFileSync("lib/content/rituals.json", "utf8"));
const ev = [];
let i = 0;
for (const m of t.matchAll(/data-config-video="[^"]*systemDataId&quot;:&quot;([0-9a-f-]+)&quot;/g)) ev.push({ pos: m.index, kind: "VIDEO", id: m[1], n: i++ });
const strip = (s) => s.replace(/&#39;|&rsquo;|’/g, "'").replace(/&amp;/g, "&");
const html = strip(t);
for (const r of rituals) {
  const key = strip(r.title).slice(0, 18);
  const idx = html.toLowerCase().indexOf(key.toLowerCase());
  ev.push({ pos: idx, kind: "TITLE", title: r.title });
}
ev.sort((a, b) => a.pos - b.pos);
console.log(ev.map((e) => (e.kind === "VIDEO" ? `VIDEO#${e.n} ${e.id.slice(0, 8)}` : `  TITLE ${e.title} @${e.pos}`)).join("\n"));
