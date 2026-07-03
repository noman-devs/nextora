"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Globe, ShoppingCart, Code2, Search, MapPin,
  BarChart3, Users, ShieldCheck, Server,
  CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const servicesDetail = [
  {
    icon: Globe,
    title: "WordPress Development",
    description: "Custom WordPress solutions built with precision. From brochure sites to complex enterprise portals, we deliver scalable, secure, and beautiful WordPress experiences.",
    features: [
      "Custom theme & plugin development",
      "Gutenberg block builder",
      "API & third-party integrations",
      "Performance optimization",
      "Security hardening",
      "Multisite architecture",
    ],
  },
  {
    icon: ShoppingCart,
    title: "WooCommerce Development",
    description: "High-converting e-commerce stores built on WooCommerce. We create seamless shopping experiences that drive sales and customer loyalty.",
    features: [
      "Custom product configurators",
      "Payment gateway integration",
      "Inventory management systems",
      "Subscription & membership",
      "Mobile-optimized checkout",
      "Multi-currency support",
    ],
  },
  {
    icon: Code2,
    title: "Custom Website Development",
    description: "Full-stack web applications built with modern frameworks. We combine performance, accessibility, and stunning design.",
    features: [
      "Next.js & React applications",
      "Headless CMS architecture",
      "Progressive web apps (PWA)",
      "API development & integration",
      "Database design & optimization",
      "Cloud deployment & scaling",
    ],
  },
  {
    icon: Search,
    title: "SEO Services",
    description: "Comprehensive search engine optimization that drives sustainable organic growth and dominates competitive keywords.",
    features: [
      "Keyword research & strategy",
      "On-page optimization",
      "Content strategy & creation",
      "Link building & digital PR",
      "Technical SEO audits",
      "Ranking tracking & reporting",
    ],
  },
  {
    icon: MapPin,
    title: "Local SEO",
    description: "Dominate local search results and attract nearby customers who are ready to convert.",
    features: [
      "Google Business Profile optimization",
      "Local citation building",
      "Review management strategy",
      "Local content optimization",
      "Map pack ranking",
      "Geo-targeted campaigns",
    ],
  },
  {
    icon: BarChart3,
    title: "Technical SEO",
    description: "Deep technical optimization that ensures search engines can crawl, index, and rank your site effectively.",
    features: [
      "Site architecture audit",
      "Core Web Vitals optimization",
      "Schema markup implementation",
      "XML sitemap & robots.txt",
      "Canonicalization & redirects",
      "Page speed optimization",
    ],
  },
  {
    icon: Users,
    title: "Digital Marketing",
    description: "Multi-channel marketing campaigns engineered for maximum reach, engagement, and conversion.",
    features: [
      "Paid search & social ads",
      "Email marketing automation",
      "Social media management",
      "Content marketing",
      "Conversion rate optimization",
      "A/B testing & experimentation",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Lead Generation",
    description: "Systems and funnels designed to consistently attract, nurture, and convert high-quality leads.",
    features: [
      "Landing page optimization",
      "Lead magnet development",
      "CRM integration & automation",
      "Lead scoring & qualification",
      "Sales funnel design",
      "Conversion tracking & analytics",
    ],
  },
  {
    icon: Server,
    title: "Hosting Solutions",
    description: "Premium managed hosting with enterprise-grade performance, security, and around-the-clock support.",
    features: [
      "Managed WordPress hosting",
      "SSD cloud infrastructure",
      "CDN & caching optimization",
      "SSL & security monitoring",
      "Automated daily backups",
      "24/7 technical support",
    ],
  },
]

export function ServicesPageContent() {
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
            <Badge variant="primary" className="mb-5">Our Services</Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04]">
              Everything You Need to{" "}
              <span className="gradient-text">Grow Online</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              From development to marketing, we provide every service needed to build,
              launch, and scale your digital presence.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {servicesDetail.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
                    <div className={isEven ? "" : "lg:order-2"}>
                      <div className="h-14 w-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-6">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.08] mb-4">
                        {service.title}
                      </h2>
                      <p className="text-muted leading-relaxed mb-8">
                        {service.description}
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {service.features.map((f) => (
                          <div key={f} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm text-light">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={isEven ? "" : "lg:order-1"}>
                      <div className="aspect-[4/3] rounded-[28px] bg-primary/[0.02] border border-border flex items-center justify-center">
                        <Icon className="h-24 w-24 text-primary/10" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
