import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { ServicesSection } from "@/components/services-section"
import { Process } from "@/components/process"
import { Portfolio } from "@/components/portfolio"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { LeadGenCTA } from "@/components/lead-gen-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <ServicesSection />
        <Process />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <LeadGenCTA />
      </main>
      <Footer />
    </>
  )
}
