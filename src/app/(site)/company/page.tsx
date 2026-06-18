import type { Metadata } from "next";
import CompanyPage from "@/features/company/CompanyPage";

export const metadata: Metadata = {
  title: "Kurumsal | Aryap Ahşap & Tasarım",
  description:
    "Aryap Ahşap & Tasarım kurumsal sayfası. Ahşap, mobilya ve iç mekân üretim süreçleri.",
};

export default function Page() {
  return <CompanyPage />;
}