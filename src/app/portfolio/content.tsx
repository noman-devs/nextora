"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const projects = [
  {
    title: "Luxe Retail Platform",
    category: "WooCommerce",
    description: "A premium e-commerce experience with custom product builders, multi-currency support, and a checkout flow that converts at 4.2%.",
    gradient: "from-primary/20 to-secondary/20",
    tags: ["WooCommerce", "Custom Theme", "Payment Integration", "Multi-currency"],
    results: ["180% revenue increase", "4.2% conversion rate", "60% faster load time"],
  },
  {
    title: "SaaS Marketing Hub",
    category: "Custom Development",
    description: "A conversion-optimized marketing platform with dynamic landing pages, A/B testing infrastructure, and real-time analytics.",
    gradient: "from-secondary/20 to-primary/20",
    tags: ["Next.js", "SEO", "CRO", "Analytics"],
    results: ["340% traffic growth", "220% lead increase", "45% lower bounce rate"],
  },
  {
    title: "National Enterprise Portal",
    category: "WordPress",
    description: "An enterprise-grade WordPress solution with multi-site architecture, custom workflows, and advanced content governance.",
    gradient: "from-primary/20 to-secondary/20",
    tags: ["WordPress", "Multi-site", "Enterprise", "Custom Plugins"],
    results: ["500+ pages managed", "98% uptime", "3s avg. load time"],
  },
  {
    title: "Local Service Platform",
    category: "Local SEO",
    description: "A complete local SEO overhaul that took a regional service provider from page 5 to the #1 local map pack position.",
    gradient: "from-secondary/20 to-primary/20",
    tags: ["Local SEO", "GBP", "Citations", "Content"],
    results: ["#1 map pack ranking", "450% local traffic", "190% lead increase"],
  },
  {
    title: "Health & Wellness Store",
    category: "WooCommerce",
    description: "A high-volume WooCommerce store with subscription management, automated inventory, and integrated marketing automation.",
    gradient: "from-primary/20 to-secondary/20",
    tags: ["WooCommerce", "Subscriptions", "Automation", "Email"],
    results: ["250% revenue growth", "12k monthly orders", "35% repeat rate"],
  },
  {
    title: "B2B Lead Engine",
    category: "Lead Generation",
    description: "A complete lead generation system with optimized landing pages, CRM integration, and automated nurturing sequences.",
    gradient: "from-secondary/20 to-primary/20",
    tags: ["Lead Gen", "CRM", "Automation", "Landing Pages"],
    results: ["3,200 leads/month", "8% conversion rate", "40% lower CPA"],
  },
]

export function PortfolioContent() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="pt-24">
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="primary" className="mb-4">Our Portfolio</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Work That <span className="gradient-text">Speaks</span> for Itself
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Every project tells a story of partnership, precision, and measurable results.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="relative pb-24 overflow-hidden">
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
                  <div className={`aspect-[16/10] bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
                    <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors" />
                    <ExternalLink className="h-10 w-10 text-primary/40 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="ghost" className="mb-3">{project.category}</Badge>
                    <h3 className="text-lg font-semibold text-light mb-2">{project.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>
                    <div className="space-y-2 mb-4">
                      {project.results.map((r) => (
                        <div key={r} className="text-xs text-primary font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {r}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted">
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
