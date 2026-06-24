import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactContent } from "./content"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ready to grow? Contact Nextora for a free strategy session. Let's discuss your goals and build a growth plan tailored to your business.",
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </>
  )
}
