"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, TrendingUp, Search, ShoppingCart, Users, Globe, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const caseStudies = [
  {
    title: "E-Commerce Revenue Doubled in 4 Months",
    category: "WooCommerce + SEO",
    icon: ShoppingCart,
    results: [
      { label: "Revenue Growth", value: "210%" },
      { label: "Organic Traffic", value: "450%" },
      { label: "Conversion Rate", value: "3.8%" },
    ],
    description:
      "A complete WooCommerce overhaul combined with a targeted SEO strategy transformed this retail brand's online presence, doubling revenue within four months.",
  },
  {
    title: "Local SEO Drives 450% Lead Increase",
    category: "Local SEO",
    icon: MapPin,
    results: [
      { label: "Local Traffic", value: "450%" },
      { label: "Map Pack Rank", value: "#1" },
      { label: "Lead Volume", value: "190%" },
    ],
    description:
      "A comprehensive local SEO campaign including GBP optimization, citation building, and local content strategy drove a service business from obscurity to market dominance.",
  },
  {
    title: "Enterprise WordPress Scales to 500+ Pages",
    category: "WordPress Development",
    icon: Globe,
    results: [
      { label: "Pages Managed", value: "500+" },
      { label: "Load Time", value: "<3s" },
      { label: "Uptime", value: "99.9%" },
    ],
    description:
      "An enterprise-grade WordPress multisite solution with custom workflows, advanced governance, and optimized performance for a national organization.",
  },
  {
    title: "B2B Lead Generation Engine",
    category: "Digital Marketing",
    icon: Users,
    results: [
      { label: "Monthly Leads", value: "3,200+" },
      { label: "Cost per Lead", value: "-40%" },
      { label: "Close Rate", value: "12%" },
    ],
    description:
      "A fully integrated lead generation system combining optimized landing pages, marketing automation, and CRM integration that transformed this B2B company's sales pipeline.",
  } as const,
]

export function CaseStudiesContent() {
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
            <Badge variant="primary" className="mb-5">Case Studies</Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04]">
              Real Results,{" "}
              <span className="gradient-text">Real Growth</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Dive into detailed case studies that show exactly how we deliver measurable outcomes.
            </p>
          </motion.div>

          <div ref={ref} className="space-y-8">
            {caseStudies.map((study, index) => {
              const Icon = study.icon
              return (
                <motion.div
                  key={study.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="overflow-hidden group">
                    <div className="grid lg:grid-cols-5">
                      <div className="lg:col-span-3 p-8 sm:p-10 lg:p-12">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <Badge variant="ghost">{study.category}</Badge>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-light mb-4">
                          {study.title}
                        </h2>
                        <p className="text-muted leading-relaxed mb-6">
                          {study.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-primary group-hover:text-[#E5531A] transition-colors font-medium">
                          Read full case study
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                      <div className="lg:col-span-2 bg-black/[0.02] border-t lg:border-t-0 lg:border-l border-border p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                        <div className="text-xs text-muted mb-6 uppercase tracking-wider font-medium">
                          Key Results
                        </div>
                        <div className="space-y-6">
                          {study.results.map((result) => (
                            <div key={result.label}>
                              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                                {result.value}
                              </div>
                              <div className="text-xs text-muted mt-1">
                                {result.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
