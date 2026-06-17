import type { Metadata } from "next";
import { Suspense } from "react";
import SolutionsPage from "@/features/solutions/SolutionsPage";

export const metadata: Metadata = {
  title: "Çözümler | Aryap Ahşap & Tasarım",
  description:
    "Aryap Ahşap & Tasarım özel üretim, mobilya tasarımı ve iç mimari çözümleri.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SolutionsPage />
    </Suspense>
  );
}