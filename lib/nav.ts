export const mainNav = [
  { label: "Home", href: "/", id: "home" },
  { label: "Shop Spells", href: "/shop", id: "shop" },
  { label: "Creations", href: "/creations", id: "creations" },
  { label: "Madre", href: "/madre", id: "madre" },
  { label: "Services", href: "/services", id: "services" },
  { label: "Testimonials", href: "/testimonials", id: "testimonials" },
];
export const moreNav = [
  { label: "About DJ", href: "/about", id: "about", sub: "My story, values & boundaries" },
  { label: "Ritual Videos", href: "/rituals", id: "rituals", sub: "A glimpse into the practice" },
  { label: "FAQ", href: "/faq", id: "faq", sub: "Answers before you book" },
  { label: "Donations", href: "/donations", id: "donations", sub: "Support Divine Brujita DJ" },
  { label: "Book a Session", href: "/book", id: "book", sub: "Reserve your appointment" },
  { label: "Legal", href: "/legal", id: "legal", sub: "Terms, privacy & policies" },
];
export const allNav = [...mainNav, ...moreNav];
