import { Bagel_Fat_One, Figtree } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import TopBar from "@/components/layout/TopBar";
import HomeFooter from "@/components/layout/HomeFooter";
import HideOnAdmin from "@/components/layout/HideOnAdmin";

const bagel = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bagel",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata = {
  title: "HaYaan's Cafe And Bakery",
  description: "Fresh sweets, baked every morning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bagel.variable} ${figtree.variable}`}
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <CartProvider>
          <HideOnAdmin>
            <TopBar />
          </HideOnAdmin>

          {children}

          <HideOnAdmin>
            <HomeFooter />
          </HideOnAdmin>
        </CartProvider>
      </body>
    </html>
  );
}