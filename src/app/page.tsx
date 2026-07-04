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
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const [projects, testimonials] = await Promise.all([
    prisma.portfolioProject.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <ServicesSection />
        <Process />
        <Portfolio projects={projects} />
        <Testimonials testimonials={testimonials} />
        <FAQ />
        <LeadGenCTA />
      </main>
      <Footer />
    </>
  )
}
