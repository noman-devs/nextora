"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: string
  name: string
  company: string | null
  role: string | null
  content: string
}

const fallbackTestimonials = [
  {
    id: "1",
    quote:
      "Nextora transformed our online presence completely. Our traffic grew 340% in six months, and our conversion rate more than doubled. They're not just a service provider — they're a true growth partner.",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "Bloom Retail",
    initials: "SM",
  },
  {
    id: "2",
    quote:
      "The team's technical expertise is unmatched. They rebuilt our WooCommerce store from the ground up, and we saw a 180% increase in revenue within the first quarter post-launch.",
    name: "James Rodriguez",
    role: "Founder",
    company: "Artisan Goods Co.",
    initials: "JR",
  },
  {
    id: "3",
    quote:
      "We've been working with Nextora for over three years. Their SEO strategy alone has been worth every penny — we now rank #1 for over 50 high-value keywords in our industry.",
    name: "Emily Chen",
    role: "Marketing Director",
    company: "TechVantage",
    initials: "EC",
  },
  {
    id: "4",
    quote:
      "From strategy to execution, Nextora brought a level of professionalism and insight that we hadn't experienced with other agencies. Our lead generation pipeline has never been stronger.",
    name: "Michael Thompson",
    role: "VP of Growth",
    company: "ScaleForce",
    initials: "MT",
  },
]

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

interface DisplayTestimonial {
  id: string
  quote: string
  name: string
  role: string | null
  company: string | null
  initials: string
}

export function Testimonials({ testimonials: dbTestimonials }: { testimonials?: Testimonial[] }) {
  const mapped: DisplayTestimonial[] =
    dbTestimonials && dbTestimonials.length > 0
      ? dbTestimonials.map((t) => ({
          id: t.id,
          quote: t.content,
          name: t.name,
          role: t.role,
          company: t.company,
          initials: getInitials(t.name),
        }))
      : fallbackTestimonials

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % mapped.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + mapped.length) % mapped.length)
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  }

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.015] to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <Badge variant="primary" className="mb-5">
            Testimonials
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            What Our{" "}
            <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Real feedback from real partnerships.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[340px] sm:h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center px-4 max-w-3xl mx-auto">
                  <Quote className="h-10 w-10 text-primary/10 mx-auto mb-8" />
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl text-light leading-relaxed font-medium">
                    &ldquo;{mapped[current].quote}&rdquo;
                  </blockquote>
                  <div className="mt-10 flex items-center justify-center gap-4">
                    <div className="h-11 w-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                      {mapped[current].initials}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-light text-sm">
                        {mapped[current].name}
                      </div>
                      <div className="text-xs text-muted">
                        {[mapped[current].role, mapped[current].company].filter(Boolean).join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border border-border bg-white flex items-center justify-center text-muted hover:text-light hover:bg-black/5 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {mapped.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1)
                    setCurrent(index)
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === current
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-muted"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="h-10 w-10 rounded-full border border-border bg-white flex items-center justify-center text-muted hover:text-light hover:bg-black/5 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
