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
    gradient: "from-primary/20 to-secondary/20",
    tags: ["WooCommerce", "Custom Theme", "Payment Integration"],
  },
  {
    title: "SaaS Landing Ecosystem",
    category: "Custom Development",
    description: "A multi-page conversion-optimized platform with dynamic content and A/B testing infrastructure.",
    gradient: "from-secondary/20 to-primary/20",
    tags: ["Next.js", "SEO", "CRO"],
  },
  {
    title: "National Brand Portal",
    category: "WordPress",
    description: "Enterprise WordPress solution with multi-site architecture and advanced content workflows.",
    gradient: "from-primary/20 to-secondary/20",
    tags: ["WordPress", "Multi-site", "Enterprise"],
  },
]

export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="primary" className="mb-4">
            Our Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
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
                <div className={`aspect-[16/10] bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 bg-background/40" />
                  <ExternalLink className="h-10 w-10 text-primary/40 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                </div>
                <CardContent className="p-6">
                  <Badge variant="ghost" className="mb-3">
                    {project.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-light mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted"
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
          className="mt-12 text-center"
        >
          <Link href="/portfolio">
            <Button variant="outline" size="lg">
              View Full Portfolio
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
