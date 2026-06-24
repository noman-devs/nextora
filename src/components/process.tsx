"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, PenTool, Code2, Rocket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery & Strategy",
    description:
      "We dive deep into your business, market, and goals to craft a data-backed strategy that sets the foundation for success.",
    accent: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design & Planning",
    description:
      "Our creative team translates strategy into stunning design concepts, mapping every user interaction for maximum conversion.",
    accent: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
  },
  {
    icon: Code2,
    step: "03",
    title: "Development & Optimization",
    description:
      "We build with precision using modern technologies, optimizing every line of code for speed, SEO, and scalability.",
    accent: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch & Growth",
    description:
      "After a flawless launch, we continue to optimize, iterate, and scale your digital presence for sustained growth.",
    accent: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
  },
]

export function Process() {
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
          <Badge variant="secondary" className="mb-4">
            Our Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            How We Deliver{" "}
            <span className="gradient-text">Results</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            A proven methodology refined through hundreds of successful projects.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-primary/40 hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card className="relative ml-0 md:ml-16">
                    <CardContent className="p-6 sm:p-8 flex items-start gap-6">
                      <div className="hidden md:flex absolute -left-16 top-8">
                        <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${step.accent} border border-primary/20 flex items-center justify-center`}>
                          <Icon className={`h-4 w-4 ${step.iconColor}`} />
                        </div>
                      </div>
                      <div className="md:hidden">
                        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${step.accent} border border-primary/20 flex items-center justify-center mb-4`}>
                          <Icon className={`h-5 w-5 ${step.iconColor}`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold text-primary tracking-wider">
                            STEP {step.step}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-light mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
