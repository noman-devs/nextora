"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Luxe Retail Platform",
    category: "WooCommerce",
    description: "A high-end e-commerce experience with custom product configurators and seamless checkout.",
    tags: ["WooCommerce", "Custom Theme", "Payment Integration"],
  },
  {
    title: "SaaS Landing Ecosystem",
    category: "Custom Development",
    description: "A multi-page conversion-optimized platform with dynamic content and A/B testing infrastructure.",
    tags: ["Next.js", "SEO", "CRO"],
  },
  {
    title: "National Brand Portal",
    category: "WordPress",
    description: "Enterprise WordPress solution with multi-site architecture and advanced content workflows.",
    tags: ["WordPress", "Multi-site", "Enterprise"],
  },
]

export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.01] to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <Badge variant="primary" className="mb-5">
            Our Work
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            A selection of projects we&apos;re proud to have delivered for our clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="group h-full overflow-hidden">
                <div className="aspect-[16/10] bg-primary/[0.03] flex items-center justify-center relative">
                  <ExternalLink className="h-10 w-10 text-primary/20 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-300" />
                </div>
                <CardContent className="p-8">
                  <Badge variant="ghost" className="mb-4">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-light mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full bg-black/[0.03] border border-border text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <Link href="/portfolio">
            <Button variant="secondary" size="lg">
              View Full Portfolio
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
