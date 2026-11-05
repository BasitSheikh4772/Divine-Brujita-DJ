import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/Cart";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Divine Brujita DJ | Live Spiritual Work & Santísima Devotion",
  description:
    "Live ritual spell work, cleanses and card readings performed with devotion to Santísima Madre by Divine Brujita DJ. Browse spells, handcrafted Divine Creations and book your session.",
  openGraph: {
    title: "Divine Brujita DJ",
    description: "Live ritual spell work, cleanses and readings performed with devotion.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body><CartProvider>{children}</CartProvider></body>
    </html>
  );
}
