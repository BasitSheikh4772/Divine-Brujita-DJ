import fs from "node:fs";
import { spawnSync } from "node:child_process";

const BASE = "https://www.divinebrujitadj.org";
const H = { headers: { "user-agent": "Mozilla/5.0" } };
const t = await (await fetch(BASE + "/new-page-2", H)).text();
const un = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const vids = [...t.matchAll(/data-config-video="([^"]+)"/g)].map((m) => JSON.parse(un(m[1])));
fs.mkdirSync("public/videos", { recursive: true });
const out = [];
for (let i = 0; i < vids.length; i++) {
  const n = String(i).padStart(2, "0");
  const file = `public/videos/ritual-${n}.mp4`;
  const poster = `public/videos/ritual-${n}.jpg`;
  const master = vids[i].alexandriaUrl.replace("{variant}", "playlist.m3u8");
  const text = await (await fetch(master, H)).text();
  const lines = text.split("\n").map((l) => l.trim());
  const audio = (lines.find((l) => l.startsWith("#EXT-X-MEDIA:TYPE=AUDIO")) || "").match(/URI="([^"]+)"/)?.[1];
  const idx = lines.findIndex((l) => l.includes("RESOLUTION=360x"));
  const v360 = lines[idx + 1];
  if (!v360) { console.log(n, "no 360 variant"); continue; }
  if (!fs.existsSync(file)) {
    const hls = ["-allowed_segment_extensions", "ALL", "-extension_picky", "0"];
    const args = ["-y", "-loglevel", "error", ...hls, "-i", v360, ...(audio ? [...hls, "-i", audio] : []), "-t", "420", "-c", "copy", "-movflags", "+faststart", file];
    const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
    console.log(n, "ffmpeg", r.status, fs.existsSync(file) ? (fs.statSync(file).size / 1e6).toFixed(1) + "MB" : "missing");
  }
  if (fs.existsSync(file) && !fs.existsSync(poster)) {
    spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", "1.5", "-i", file, "-frames:v", "1", "-q:v", "4", poster], { stdio: "inherit" });
  }
  out.push({ n, file: `/videos/ritual-${n}.mp4`, poster: `/videos/ritual-${n}.jpg`, duration: Math.round(Math.min(vids[i].durationSeconds, 420)), ratio: vids[i].aspectRatio });
}
fs.writeFileSync("lib/content/videos-meta.json", JSON.stringify(out));
console.log("done", out.length);
