"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote:
      "Nextora transformed our online presence completely. Our traffic grew 340% in six months, and our conversion rate more than doubled. They're not just a service provider — they're a true growth partner.",
    author: "Sarah Mitchell",
    role: "CEO",
    company: "Bloom Retail",
    initials: "SM",
  },
  {
    quote:
      "The team's technical expertise is unmatched. They rebuilt our WooCommerce store from the ground up, and we saw a 180% increase in revenue within the first quarter post-launch.",
    author: "James Rodriguez",
    role: "Founder",
    company: "Artisan Goods Co.",
    initials: "JR",
  },
  {
    quote:
      "We've been working with Nextora for over three years. Their SEO strategy alone has been worth every penny — we now rank #1 for over 50 high-value keywords in our industry.",
    author: "Emily Chen",
    role: "Marketing Director",
    company: "TechVantage",
    initials: "EC",
  },
  {
    quote:
      "From strategy to execution, Nextora brought a level of professionalism and insight that we hadn't experienced with other agencies. Our lead generation pipeline has never been stronger.",
    author: "Michael Thompson",
    role: "VP of Growth",
    company: "ScaleForce",
    initials: "MT",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
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
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>
                  <div className="mt-10 flex items-center justify-center gap-4">
                    <div className="h-11 w-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                      {testimonials[current].initials}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-light text-sm">
                        {testimonials[current].author}
                      </div>
                      <div className="text-xs text-muted">
                        {testimonials[current].role}, {testimonials[current].company}
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
              {testimonials.map((_, index) => (
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
