import fs from "node:fs";
const BASE = "https://www.divinebrujitadj.org";
const t = await (await fetch(BASE + "/new-page-2", { headers: { "user-agent": "Mozilla/5.0" } })).text();
const un = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#39;/g, "'");
const cfgs = [...t.matchAll(/data-config-video="([^"]+)"/g)].map((m) => un(m[1]));
console.log("configs", cfgs.length);
const vids = [];
for (const c of cfgs) {
  try {
    const j = JSON.parse(c);
    vids.push(j);
  } catch (e) {
    console.log("bad json", c.slice(0, 120));
  }
}
console.log(JSON.stringify(vids[0]).slice(0, 1200));
fs.writeFileSync("scripts/videos-raw.json", JSON.stringify(vids, null, 1));
// try the first one
const v = vids[0];
const url = v?.structuredContent?.alexandriaUrl || v?.alexandriaUrl || "";
console.log("alexandriaUrl", url);
for (const variant of ["360", "1080", "360.mp4", "1080.mp4", "playlist.m3u8", "mp4"]) {
  const u = url.replace("{variant}", variant);
  try {
    const r = await fetch(u, { method: "HEAD", headers: { "user-agent": "Mozilla/5.0" } });
    console.log(variant, r.status, r.headers.get("content-type"), r.headers.get("content-length"));
  } catch (e) {
    console.log(variant, "err");
  }
}
