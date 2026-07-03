"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Globe,
  ShoppingCart,
  Code2,
  Search,
  MapPin,
  BarChart3,
  Users,
  ShieldCheck,
  Server,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Globe,
    title: "WordPress Development",
    description: "Custom WordPress solutions tailored to your brand — from simple sites to complex platforms.",
    iconColor: "text-primary",
  },
  {
    icon: ShoppingCart,
    title: "WooCommerce Development",
    description: "High-converting online stores built on WooCommerce with seamless checkout experiences.",
    iconColor: "text-primary",
  },
  {
    icon: Code2,
    title: "Custom Website Development",
    description: "Full-stack web applications built with modern frameworks for maximum performance.",
    iconColor: "text-primary",
  },
  {
    icon: Search,
    title: "SEO Services",
    description: "Comprehensive search optimization to dominate rankings and drive organic traffic.",
    iconColor: "text-primary",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    description: "Dominate local search results and attract nearby customers ready to convert.",
    iconColor: "text-primary",
  },
  {
    icon: BarChart3,
    title: "Technical SEO",
    description: "Deep technical audits and implementations that search engines reward.",
    iconColor: "text-primary",
  },
  {
    icon: Users,
    title: "Digital Marketing",
    description: "Multi-channel campaigns engineered for maximum reach and conversion.",
    iconColor: "text-primary",
  },
  {
    icon: ShieldCheck,
    title: "Lead Generation",
    description: "Systems and funnels designed to consistently attract and convert high-quality leads.",
    iconColor: "text-primary",
  },
  {
    icon: Server,
    title: "Hosting Solutions",
    description: "Premium managed hosting with enterprise-grade performance and 24/7 support.",
    iconColor: "text-primary",
  },
]

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

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
            What We Do
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            Full-Suite Digital{" "}
            <span className="gradient-text">Growth Services</span>
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Every service is designed to work together, creating a unified growth engine for your business.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div key={service.title} variants={itemVariants}>
                <Card hover className="group h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-light mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <div className="mt-6 pt-6 border-t border-border">
                      <span className="text-sm text-primary group-hover:text-[#E5531A] transition-colors inline-flex items-center gap-1.5 font-medium">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-14 text-center"
        >
          <Link href="/services">
            <Button variant="secondary" size="lg">
              Explore All Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
