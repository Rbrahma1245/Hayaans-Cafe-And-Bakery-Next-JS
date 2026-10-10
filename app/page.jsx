import { Suspense } from "react";

import MenuSection from "@/components/menu/MenuSection";
import MenuSkeleton from "@/components/menu/MenuSkeleton";
import HomeHero from "@/components/home/HomeHero";
import VisitSection from "@/components/home/VisitSection";
import HomeFooter from "@/components/layout/HomeFooter";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <HomeHero />
      <main id="menu">
        <Suspense fallback={<MenuSkeleton />}>
          <MenuSection />
        </Suspense>
      </main>

      <VisitSection />
    </>
  );
}