"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-background" />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.02] blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.015] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Badge variant="primary">
            <span className="mr-1.5">✦</span> Trusted by 200+ businesses worldwide
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[1.04]"
        >
          Your Complete{" "}
          <span className="gradient-text">Digital Growth</span>
          <br />
          Partner
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 mx-auto max-w-2xl text-lg sm:text-xl text-muted leading-relaxed"
        >
          We build, optimize, and scale digital experiences that drive real business results.
          From WordPress to WooCommerce, SEO to lead generation — we&apos;re your end-to-end
          growth partner.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact">
            <Button variant="primary" size="xl">
              Start Your Growth Journey
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="secondary" size="xl">
              <Play className="h-5 w-5" />
              View Our Work
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-3xl mx-auto"
        >
          {[
            { value: "200+", label: "Clients Served" },
            { value: "97%", label: "Client Satisfaction" },
            { value: "500+", label: "Projects Delivered" },
            { value: "12+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
