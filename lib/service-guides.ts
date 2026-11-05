import raw from "./content/services-content.json";

type Block = { t: string; text: string };
const b = raw as Block[];
const range = (a: number, z: number) => b.slice(a, z + 1).map((x) => x.text);

export const guideIntro = b[0].text;
export const guides: { title: string; tag: string; paras: string[] }[] = [
  { title: "Fresh Start (Road Opener)", tag: "From $65", paras: range(2, 5) },
  { title: "Aura Refresher (Egg Cleanse)", tag: "From $30", paras: range(6, 10) },
  { title: "Personalized Tarot Reading", tag: "Reading", paras: range(11, 12) },
  { title: "All-Around Spiritual Protection", tag: "Protection", paras: range(13, 17) },
  { title: "Devotional Gifts for Santísima", tag: "Offerings", paras: range(18, 27) },
  { title: "Poof! Be Gone", tag: "Release", paras: range(28, 31) },
  { title: "Cloaking — Shield Me", tag: "Privacy", paras: range(32, 38) },
  { title: "When Outside Influences Affect a Relationship", tag: "Relationships", paras: range(39, 42) },
  { title: "5-in-1 Return to My Arms — Come to Me Bundle", tag: "Bundle", paras: range(44, 60) },
];
