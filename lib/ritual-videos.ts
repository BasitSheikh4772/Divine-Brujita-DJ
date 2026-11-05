import meta from "./content/videos-meta.json";

/** Videos are streamed (HLS) straight from the live site's CDN; only the poster image is stored locally. */
export type RitualVideo = { n: string; hls: string; poster: string; duration: number; ratio: number };
export const allVideos = meta as RitualVideo[];

/** Which of the live site's videos belong to which ritual card (by document order on the original page). */
const byTitle: Record<string, number[]> = {
  "The Black Covenant of the Two Hearts": [0],
  "The Crystal Eye Enchantment": [1, 2],
  "The Pig-Faced Severing": [3],
  "Watermelon of Unity": [4],
  "Sacred Seduction Eggplant Ritual": [5],
  "Come Back To My Arms": [6],
  "Love Without End Ritual": [7],
  "To Infinity And Beyond": [8, 9, 10],
  "The Chicken Jar of Mayhem & Destruction": [11],
  "Watermelon in Reverse (Karmic Return)": [12],
  "The Severing of the Rival’s Heart": [13],
  "Rite of Severed Tongues": [14],
  "Payback": [15],
  "Culo Fish Add-On": [16],
  "The Glutton Swine Vanity Curse": [17],
  "Inferno of Desire": [18],
  "Mind Control & Domination": [19],
  "Chicken Feet Binding (At Your Feet)": [20],
};

export const videosFor = (title: string): RitualVideo[] => (byTitle[title] ?? []).map((i) => allVideos[i]).filter(Boolean);
export const fmtDur = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
