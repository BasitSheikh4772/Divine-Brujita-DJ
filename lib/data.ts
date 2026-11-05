export const SITE = {
  booking: "https://www.divinebrujitadj.org/shop",
  tiktok: "https://www.tiktok.com/@divine_brujita_dj",
  instagram: "https://www.instagram.com/divine_brujita_d_j",
  creationsIg: "https://www.instagram.com/divine_creations_by_dj",
  creationsShop: "https://www.divinebrujitadj.org/store-1-copy-1",
};

export const nav = [
  { label: "Home", href: "/", id: "home" },
  { label: "Spell Services", href: "/services", id: "services" },
  { label: "Creations", href: "/#creations", id: "creations" },
  { label: "Madre", href: "/#madre", id: "madre" },
  { label: "Testimonials", href: "/#testimonials", id: "testimonials" },
  { label: "FAQ", href: "/#faq", id: "faq" },
];

export const specials = [
  "Buy 2, Get 1 COMP — any 2 spellworks valued at $65 each",
  "Pito Destroyer + Ego Buster Dolls — $250",
  "Warding + Protection + Shield Me Dolls — $250",
  "Next Level Love Special — $350",
];

export const keywords = ["Cleanse", "Protect", "Open Roads", "Love", "Justice", "Devotion", "Release", "Abundance"];

export const steps = [
  { n: "01", title: "Choose your work", body: "Browse the spell menu and book the service that matches your intention." },
  { n: "02", title: "Join the TikTok LIVE", body: 'Comment "Here For My Spell" so you are added to the session queue.' },
  { n: "03", title: "Work is performed live", body: "Candles, crystals, prayer, herbs and oils — in the order received." },
];

export const weekly = [
  { title: "Buy 2, Get 1 Comp", sub: "Any 2 spellworks at $65 each — receive 1 of equal value free", price: 130, img: "/img/p-bogo.png", slug: "mini-watermelon-love-or-reverse", tag: "Weekly Special" },
  { title: "Warding + Protection + Shield Me", sub: "All 3 protective dolls workings", price: 250, img: "/img/p-ward.png", slug: "poof-be-gone-doll-reverse-fresh-start", tag: "Protection" },
  { title: "Pito Destroyer + Ego Buster", sub: "Both powerful doll workings", price: 250, img: "/img/p-pito.png", slug: "love-doll-complimentary-cemetery-burial", tag: "Bundle" },
  { title: "Next Level Love Special", sub: "2 Next Level Love Dolls + 2 Road Openers", price: 350, img: "/img/p-love.png", slug: "cry-me-a-river-pito-destroyer", tag: "Love" },
];

export const signature = [
  { title: "The Black Covenant of the Two Hearts", price: 350, img: "/img/p-covenant.png", slug: "the-black-covenant-of-the-two-hearts", tag: "Love" },
  { title: "The Crystal Eye Enchantment", price: 350, img: "/img/p-crystal-eye.png", slug: "the-crystal-eye-enchantment", tag: "Clarity" },
  { title: "The Pig-Faced Severing", price: 300, img: "/img/p-pig.png", slug: "the-pig-faced-severing", tag: "Justice" },
  { title: "#112 Pineapple of Love", price: 150, img: "/img/p-pine-love.png", slug: "111-pineapple-in-reverse-1-hd6jy", tag: "Love" },
  { title: "#111 Pineapple in Reverse", price: 150, img: "/img/p-pine-rev.png", slug: "111-pineapple-in-reverse-1", tag: "Reversal" },
];

export const intentions = [
  { title: "Love & Reconnection", tag: "Heart", body: "Come-to-me, cord release, reversals and next-level love workings.", span: "md:col-span-2", cat: "love-attraction-relationships" },
  { title: "Protection & Warding", tag: "Shield", body: "Safety, cloaking, third-party removal and aura cleansing.", span: "", cat: "protection-energy" },
  { title: "Road Opener", tag: "Opportunity", body: "Fresh starts, next steps and fruitful new doors.", span: "", cat: "prosperity-carrer-success" },
  { title: "Healing & Release", tag: "Soul", body: "Anxiety, stress, soul and emotional healing — sleep like a baby.", span: "md:col-span-2", cat: "emotional-spiritual-wellness" },
  { title: "Home & Family", tag: "Hearth", body: "Peace at home and family unity.", span: "", cat: "family-life-journey" },
  { title: "Justice & Karma", tag: "Justice", body: "Divine justice, banishing and boundaries, in devotion to Santa Muerte.", span: "", cat: "justice-karma" },
  { title: "Confidence & Self", tag: "Diosa", body: "Ego buster, Diosa, confidence and loving yourself.", span: "", cat: "beauty-and-self-empowerment" },
];

import homeReviews from "./content/home-reviews.json";
export const reviews = (homeReviews as { q: string; u: string; d: string }[]).map((r) => ({ q: r.q, u: "@" + r.u, d: r.d.replace(/^([A-Za-z]{3})[A-Za-z]*/, "$1") }));

export const why = [
  { title: "Devotion first", body: "Every ritual is performed with faith, respect and devotion to Santísima Madre." },
  { title: "Personalized work", body: "No two situations are the same. Every service is approached with care." },
  { title: "Years of practice", body: "A thoughtful, dedicated approach shaped by years of spiritual practice." },
  { title: "Respect & privacy", body: "Every client and every session is treated with discretion." },
  { title: "Performed with intention", body: "Focused intention, in line with my spiritual practices." },
  { title: "Ongoing support", body: "Guidance from the beginning of your journey to the end." },
];

export const creations = [
  { name: "Moldavite Pendant Necklace", price: 350, img: "/img/c-moldavite.jpeg", slug: "moldavite-pendant-necklace-2", note: "Crystals & Jewelry" },
  { name: "Goddess Hair Oil", price: 25, img: "/img/c-hairoil.jpeg", slug: "goddess-hair-oil", note: "Hair & Body" },
  { name: "Rose of Jericho", price: 25, img: "/img/c-rose.jpeg", slug: "xhrgtgasdvtjgu5l6xpdvk7fhuqlmt", note: "Ritual" },
  { name: "Gold-Plated Rosary", price: 35, img: "/img/c-rosary.jpeg", slug: "gold-plated-rosary", note: "Devotional" },
  { name: "Rose Quartz Goddess Figurine", price: 45, img: "/img/c-goddess.jpeg", slug: "rose-quartz-goddess-figurine", note: "Altar" },
  { name: "Obsidian Angel", price: 35, img: "/img/c-angel.jpeg", slug: "obsidian-angel", note: "Crystals" },
  { name: "Rose Quartz Owl Figurine", price: 30, img: "/img/c-owl.jpeg", slug: "rose-quartz-owl-figurine", note: "Altar" },
  { name: "Dragon Selenite Charging Plate", price: 45, img: "/img/c-selenite.jpeg", slug: "dragon-selenite-charging-plate", note: "Cleansing" },
];

export const faqs = [
  { q: "How do appointments and scheduling work?", a: 'After booking, join the TikTok LIVE and comment "Here For My Spell" to be added to the session queue. Work is performed live, in the order received, first come first served, unless announced otherwise.' },
  { q: "When is my spiritual work completed?", a: "Work is completed during the live session in the order received. Timing is announced on the LIVE." },
  { q: "What is shown live and what is private?", a: "Much of the ritual is shown on LIVE. Certain parts are performed privately out of respect for the practice and for client privacy." },
  { q: "Are results guaranteed?", a: "No. Services are for entertainment purposes only and results cannot be guaranteed. Every spiritual journey is unique." },
  { q: "Who can purchase services?", a: "Clients must be 18 years or older to purchase services." },
];
