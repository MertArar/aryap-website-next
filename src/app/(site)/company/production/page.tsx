import type { Metadata } from "next";
import ProductionPage from "@/features/production/ProductionPage";

export const metadata: Metadata = {
  title: "Üretim | Aryap Ahşap & Tasarım",
  description:
    "Fabirakımızda bulunan son teknoloji makinelerle, yüksek kaliteli ahşap ürünler üretiyoruz. Kesim, CNC, PVC, kalıp ve boyama makinelerimizle, müşterilerimizin ihtiyaçlarına özel çözümler sunuyoruz.   ",
};

export default function Page() {
  return <ProductionPage />;
}