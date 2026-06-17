import type { Metadata } from "next";
import ContactPage from "@/features/contact/ContactPage";

export const metadata: Metadata = {
  title: "İletişim | Aryap Ahşap & Tasarım",
  description:
    "Aryap Ahşap & Tasarım iletişim sayfası. Projeleriniz için bizimle iletişime geçin.",
};

export default function Page() {
  return <ContactPage />;
}