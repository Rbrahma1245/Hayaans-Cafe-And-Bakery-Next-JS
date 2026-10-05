import Menu from "@/components/Menu";
import HomeHero from "@/components/HomeHero";
import VisitSection from "@/components/VisitSection";
import HomeFooter from "@/components/HomeFooter";

import { getSweets } from "@/lib/api";

export default async function Home() {
  const sweets = await getSweets();

  return (
    <>
      <HomeHero />

      <main id="menu">
        <Menu sweets={sweets} />
      </main>

      <VisitSection />

      <HomeFooter />
    </>
  );
}