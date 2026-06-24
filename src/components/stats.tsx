"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TrendingUp, Users, DollarSign, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    icon: TrendingUp,
    value: "$50M+",
    label: "Revenue Generated",
    description: "Cumulative revenue driven for our clients through digital growth strategies",
  },
  {
    icon: Users,
    value: "200+",
    label: "Happy Clients",
    description: "From startups to enterprise, across every industry vertical",
  },
  {
    icon: DollarSign,
    value: "350%",
    label: "Avg. ROI",
    description: "Average return on investment across all our client engagements",
  },
  {
    icon: Award,
    value: "97%",
    label: "Satisfaction Rate",
    description: "Client satisfaction score — our highest priority metric",
  },
]

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Results That{" "}
            <span className="gradient-text">Speak for Themselves</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            We measure our success by the tangible outcomes we deliver for every client.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full border-primary/10 glow-lime">
                  <CardContent className="p-6 sm:p-8">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-light mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted leading-relaxed">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
