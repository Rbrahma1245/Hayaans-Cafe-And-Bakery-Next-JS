import { Bagel_Fat_One, Figtree } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className={`${bagel.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}