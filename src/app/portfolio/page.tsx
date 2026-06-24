import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LeadGenCTA } from "@/components/lead-gen-cta"
import { PortfolioContent } from "./content"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Nextora's portfolio of digital projects — from WordPress and WooCommerce to custom web applications and SEO campaigns.",
}

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <PortfolioContent />
        <LeadGenCTA />
      </main>
      <Footer />
    </>
  )
}
