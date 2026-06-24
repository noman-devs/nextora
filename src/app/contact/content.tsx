"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/contact-form"

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@nextora.com",
    href: "mailto:hello@nextora.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "San Francisco, CA",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
  },
]

export function ContactContent() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="pt-24">
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="primary" className="mb-4">Get in Touch</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Let&apos;s Start Your{" "}
              <span className="gradient-text">Growth Story</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Ready to take your digital presence to the next level? Fill out the form below and
              we&apos;ll schedule a free strategy session within 24 hours.
            </p>
          </motion.div>

          <div ref={ref} className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-light mb-6">
                    Send Us a Message
                  </h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-5"
            >
              {contactInfo.map((info) => {
                const Icon = info.icon
                return (
                  <Card key={info.label}>
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted mb-1">{info.label}</div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-light hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-sm text-light">{info.value}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold text-light mb-2">
                    Prefer a direct booking?
                  </h3>
                  <p className="text-xs text-muted mb-4">
                    Select a time that works for you and we&apos;ll handle the rest.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Book a strategy session
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
