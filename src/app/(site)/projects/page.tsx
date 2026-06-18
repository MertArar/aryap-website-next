import type { Metadata } from "next";
import ProjectsPage from "@/features/projects/ProjectsPage";

export const metadata: Metadata = {
  title: "Projeler | Aryap Ahşap & Tasarım",
  description:
    "Aryap Ahşap & Tasarım projeler sayfası. Ahşap, mobilya ve iç mekân üretim süreçleri.",
};

export default function Page() {
  return <ProjectsPage />;
}