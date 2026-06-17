import type { Metadata } from "next";
import KVKKPage from "@/features/kvkk/KvkkPage";

export const metadata: Metadata = {
  title: "KVKK | Aryap Ahşap & Tasarım",
  description:
    "Aryap Ahşap & Tasarım kişisel verilerin korunmasına ilişkin aydınlatma metni.",
};

export default function Page() {
  return <KVKKPage />;
}