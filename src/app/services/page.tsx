import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LeadGenCTA } from "@/components/lead-gen-cta"
import { ServicesPageContent } from "./content"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Nextora's full-suite digital services: WordPress, WooCommerce, SEO, digital marketing, lead generation, and hosting solutions.",
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesPageContent />
        <LeadGenCTA />
      </main>
      <Footer />
    </>
  )
}
