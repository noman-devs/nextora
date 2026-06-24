import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LeadGenCTA } from "@/components/lead-gen-cta"
import { AboutContent } from "./content"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Nextora — our mission, values, and team. We're a premium digital growth agency dedicated to engineering measurable results.",
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutContent />
        <LeadGenCTA />
      </main>
      <Footer />
    </>
  )
}
