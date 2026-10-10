import Menu from "./Menu";
import { getSweets } from "@/lib/api";

export default async function MenuSection() {
  const sweets = await getSweets();
  return <Menu sweets={sweets} />;
}