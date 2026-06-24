"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Sparkles, BarChart3, ShieldCheck, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const perks = [
  { icon: BarChart3, text: "Free growth audit" },
  { icon: ShieldCheck, text: "No commitment required" },
  { icon: HeadphonesIcon, text: "30-minute strategy call" },
]

export function LeadGenCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/[0.03] to-background" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-card to-secondary/[0.04] p-8 sm:p-12 lg:p-16 text-center overflow-hidden glow-lime"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-6" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              Ready to Grow Your{" "}
              <span className="gradient-text">Digital Presence?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-lg text-muted max-w-2xl mx-auto"
            >
              Book a free strategy session and discover exactly what your business needs to
              scale online. No pressure, no pitch — just actionable insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6"
            >
              {perks.map((perk) => {
                const PerkIcon = perk.icon
                return (
                  <div key={perk.text} className="flex items-center gap-2 text-sm text-muted">
                    <PerkIcon className="h-4 w-4 text-primary" />
                    <span>{perk.text}</span>
                  </div>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <Button variant="primary" size="xl">
                  Book Your Free Strategy Session
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="xl">
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
