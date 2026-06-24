import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LeadGenCTA } from "@/components/lead-gen-cta"
import { CaseStudiesContent } from "./content"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore how Nextora has driven measurable growth for businesses across industries. See real results from real partnerships.",
}

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main>
        <CaseStudiesContent />
        <LeadGenCTA />
      </main>
      <Footer />
    </>
  )
}
