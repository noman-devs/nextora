import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LeadGenCTA } from "@/components/lead-gen-cta"
import { BlogContent } from "./content"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, strategies, and best practices from the Nextora team. Learn about WordPress, SEO, digital marketing, and web development.",
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <BlogContent />
        <LeadGenCTA />
      </main>
      <Footer />
    </>
  )
}
