import { AnnouncementBar, Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { CartToast, CursorGlow, ScrollProgress } from "@/components/ui";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartToast />
    </>
  );
}
