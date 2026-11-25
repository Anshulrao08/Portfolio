import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Anshul Yadav for web development roles, AI and software collaborations, speaking, or technical community initiatives.",
};

export default function ContactPage() {
  return (
    <div className="py-6">
      <ContactSection />
    </div>
  );
}
