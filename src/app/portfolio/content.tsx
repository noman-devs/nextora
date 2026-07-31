"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const projects = [
  {
    title: "Luxe Retail Platform",
    category: "WooCommerce",
    image: "/portfolio/luxe-retail.svg",
    description: "A premium e-commerce experience with custom product builders, multi-currency support, and a checkout flow that converts at 4.2%.",
    tags: ["WooCommerce", "Custom Theme", "Payment Integration", "Multi-currency"],
    results: ["180% revenue increase", "4.2% conversion rate", "60% faster load time"],
  },
  {
    title: "SaaS Marketing Hub",
    category: "Custom Development",
    image: "/portfolio/saas-marketing-hub.svg",
    description: "A conversion-optimized marketing platform with dynamic landing pages, A/B testing infrastructure, and real-time analytics.",
    tags: ["Next.js", "SEO", "CRO", "Analytics"],
    results: ["340% traffic growth", "220% lead increase", "45% lower bounce rate"],
  },
  {
    title: "National Enterprise Portal",
    category: "WordPress",
    image: "/portfolio/national-enterprise-portal.svg",
    description: "An enterprise-grade WordPress solution with multi-site architecture, custom workflows, and advanced content governance.",
    tags: ["WordPress", "Multi-site", "Enterprise", "Custom Plugins"],
    results: ["500+ pages managed", "98% uptime", "3s avg. load time"],
  },
  {
    title: "Local Service Platform",
    category: "Local SEO",
    image: "/portfolio/local-service-platform.svg",
    description: "A complete local SEO overhaul that took a regional service provider from page 5 to the #1 local map pack position.",
    tags: ["Local SEO", "GBP", "Citations", "Content"],
    results: ["#1 map pack ranking", "450% local traffic", "190% lead increase"],
  },
  {
    title: "Health & Wellness Store",
    category: "WooCommerce",
    image: "/portfolio/health-wellness-store.svg",
    description: "A high-volume WooCommerce store with subscription management, automated inventory, and integrated marketing automation.",
    tags: ["WooCommerce", "Subscriptions", "Automation", "Email"],
    results: ["250% revenue growth", "12k monthly orders", "35% repeat rate"],
  },
  {
    title: "B2B Lead Engine",
    category: "Lead Generation",
    image: "/portfolio/b2b-lead-engine.svg",
    description: "A complete lead generation system with optimized landing pages, CRM integration, and automated nurturing sequences.",
    tags: ["Lead Gen", "CRM", "Automation", "Landing Pages"],
    results: ["3,200 leads/month", "8% conversion rate", "40% lower CPA"],
  },
]

export function PortfolioContent() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="pt-24">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-background" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <Badge variant="primary" className="mb-5">Our Portfolio</Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04]">
              Work That <span className="gradient-text">Speaks</span> for Itself
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Every project tells a story of partnership, precision, and measurable results.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="relative pb-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card hover className="group h-full overflow-hidden">
                  <div className="aspect-[16/10] bg-primary/[0.03] relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-8">
                    <Badge variant="ghost" className="mb-4">{project.category}</Badge>
                    <h3 className="text-xl font-semibold text-light mb-3">{project.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mb-6">{project.description}</p>
                    <div className="space-y-2 mb-5">
                      {project.results.map((r) => (
                        <div key={r} className="text-xs text-primary font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {r}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-5 border-t border-border">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-black/[0.03] border border-border text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
