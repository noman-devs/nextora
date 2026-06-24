"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Target, Heart, Zap, Shield, Lightbulb, Handshake } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "Every decision we make is measured against your business goals. If it doesn't drive growth, we don't do it.",
  },
  {
    icon: Heart,
    title: "Client-First",
    description: "Your success is our success. We invest in your growth as if it were our own business.",
  },
  {
    icon: Zap,
    title: "Technical Excellence",
    description: "We stay at the cutting edge of technology to deliver solutions that are fast, secure, and scalable.",
  },
  {
    icon: Shield,
    title: "Radical Transparency",
    description: "Real-time reporting, open communication, and honest feedback — always.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Mindset",
    description: "We never stop learning, testing, and improving. Complacency is not in our vocabulary.",
  },
  {
    icon: Handshake,
    title: "Partnership Approach",
    description: "We don't just work for you — we work with you. Your team becomes our team.",
  },
]

const team = [
  { name: "Alex Rivera", role: "Founder & CEO", initials: "AR" },
  { name: "Sarah Chen", role: "Chief Operating Officer", initials: "SC" },
  { name: "Marcus Williams", role: "Head of Development", initials: "MW" },
  { name: "Priya Patel", role: "SEO Director", initials: "PP" },
  { name: "James Thompson", role: "Creative Director", initials: "JT" },
  { name: "Emily Rodriguez", role: "Marketing Director", initials: "ER" },
]

export function AboutContent() {
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
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="primary" className="mb-4">About Nextora</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Partner in{" "}
              <span className="gradient-text">Digital Growth</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Founded with a simple belief: that great digital experiences should be accessible
              to every business. We&apos;ve grown into a full-service digital growth agency
              trusted by 200+ clients worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="relative py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4">Our Story</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                From Passion to{" "}
                <span className="gradient-text">Partnership</span>
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                What started as a small WordPress consultancy has evolved into a comprehensive
                digital growth agency spanning development, SEO, marketing, and strategy.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                Today, we&apos;re a team of 40+ strategists, developers, designers, and marketers
                working across three continents — united by a shared commitment to delivering
                measurable results.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary">12+</div>
                  <div className="text-xs text-muted mt-1">Years in Business</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">40+</div>
                  <div className="text-xs text-muted mt-1">Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">3</div>
                  <div className="text-xs text-muted mt-1">Continents</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-5xl font-bold gradient-text">200+</div>
                  <div className="text-sm text-muted mt-2">Clients Served</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="primary" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What Drives{" "}
              <span className="gradient-text">Us</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 sm:p-8">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-light mb-2">{value.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="secondary" className="mb-4">Leadership</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Meet the{" "}
              <span className="gradient-text">Team</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6 sm:p-8">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg font-bold text-background mx-auto mb-4">
                      {member.initials}
                    </div>
                    <h3 className="text-lg font-semibold text-light">{member.name}</h3>
                    <p className="text-sm text-muted">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
