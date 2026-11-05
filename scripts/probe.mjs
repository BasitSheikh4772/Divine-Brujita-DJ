const BASE = "https://www.divinebrujitadj.org";
const pages = ["/", "/new-page-2", "/madre", "/faq-1", "/new-page-3", "/new-page-4", "/services-content", "/shop", "/store-1-copy-1"];
const uniq = (a) => [...new Set(a)];
for (const p of pages) {
  const t = await (await fetch(BASE + p, { headers: { "user-agent": "Mozilla/5.0" } })).text();
  const vid = uniq([...t.matchAll(/https?:[^"'\\\s<>]+\.(?:mp4|mov|m3u8|webm)[^"'\\\s<>]*/g)].map((m) => m[0]));
  const sqvid = uniq([...t.matchAll(/video\.squarespace-cdn\.com[^"'\\\s<>]*/g)].map((m) => m[0]));
  const ifr = uniq([...t.matchAll(/<iframe[^>]+src="([^"]+)"/g)].map((m) => m[1]));
  const emb = uniq([...t.matchAll(/(?:tiktok|youtube|youtu|vimeo)\.(?:com|be)\/[^"'\\\s<>]+/g)].map((m) => m[0]));
  const cfg = (t.match(/data-config-video/g) || []).length;
  const html = (t.match(/sqs-block-video|video-block|native-video/g) || []).length;
  const imgs = uniq([...t.matchAll(/https:\/\/images\.squarespace-cdn\.com\/[^"'\\\s<>)]+/g)].map((m) => m[0].split("?")[0]));
  console.log(p, JSON.stringify({ vid: vid.slice(0, 6), sqvid: sqvid.slice(0, 6), ifr: ifr.slice(0, 6), emb: emb.slice(0, 10), cfg, html, imgs: imgs.length }));
}
