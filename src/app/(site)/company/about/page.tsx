import type { Metadata } from "next";
import AboutPage from "@/features/about/AboutPage";

export const metadata: Metadata = {
  title: "Hakkımızda | Aryap Ahşap & Tasarım",
  description:
    "Aryap Ahşap & Tasarım hakkında. Ahşap üretimi, mobilya ve iç mekân uygulamalarında kurumsal hikâyemiz.",
};

export default function Page() {
  return <AboutPage />;
}