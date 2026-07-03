"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "What makes Nextora different from other agencies?",
    answer:
      "We combine technical excellence with strategic thinking. Unlike traditional agencies that focus on either design or development, we provide end-to-end growth solutions — from WordPress and WooCommerce to SEO, digital marketing, and lead generation. Every service is connected by a data-driven growth strategy.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary based on scope. A standard website build takes 4-8 weeks, while larger e-commerce or custom development projects typically run 8-16 weeks. We provide a detailed timeline during our discovery phase and communicate proactively throughout.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Absolutely. We offer flexible maintenance and support packages for all our services — from hosting and security updates to ongoing SEO, content updates, and performance optimization. Many clients choose our monthly retainer packages for continuous growth.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work across a wide range of industries including e-commerce, SaaS, professional services, healthcare, education, and enterprise. Our team adapts our methodology to each industry's unique challenges and opportunities.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We define clear KPIs during the strategy phase tied directly to your business goals — whether that's organic traffic growth, conversion rate, revenue, lead volume, or search rankings. We provide transparent reporting through real-time dashboards.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer project-based pricing for defined scopes and monthly retainers for ongoing partnerships. Every engagement begins with a free consultation where we understand your needs and provide a transparent proposal with no hidden fees.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
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
            FAQ
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Everything you need to know about working with Nextora.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div
                className={cn(
                  "rounded-[20px] border border-border bg-white transition-all duration-300 cursor-pointer",
                  openIndex === index && "border-primary/20"
                )}
                onClick={() => toggle(index)}
              >
                <div className="flex items-center justify-between p-6 sm:p-8">
                  <h3 className="text-base sm:text-lg font-medium text-light pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted shrink-0 transition-transform duration-300",
                      openIndex === index && "rotate-180 text-primary"
                    )}
                  />
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                        <p className="text-sm text-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
