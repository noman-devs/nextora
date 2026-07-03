"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, Clock, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const posts = [
  {
    title: "The Complete Guide to WooCommerce SEO in 2026",
    excerpt: "Learn how to optimize your WooCommerce store for search engines with proven strategies that drive traffic and sales.",
    date: "Jun 15, 2026",
    readTime: "8 min read",
    category: "SEO",
  },
  {
    title: "WordPress vs. Custom Development: Which Is Right for You?",
    excerpt: "A comprehensive comparison to help you decide between WordPress and custom development for your next project.",
    date: "Jun 8, 2026",
    readTime: "10 min read",
    category: "Development",
  },
  {
    title: "10 Local SEO Strategies That Actually Work in 2026",
    excerpt: "Proven local SEO tactics that help businesses dominate their local market and attract more customers.",
    date: "Jun 1, 2026",
    readTime: "6 min read",
    category: "SEO",
  },
  {
    title: "How to Build a Lead Generation Funnel That Converts",
    excerpt: "A step-by-step guide to creating a lead generation system that consistently attracts and converts high-quality leads.",
    date: "May 25, 2026",
    readTime: "12 min read",
    category: "Marketing",
  },
  {
    title: "Core Web Vitals: What They Are and How to Fix Them",
    excerpt: "Everything you need to know about Core Web Vitals and how to optimize your site for better rankings and user experience.",
    date: "May 18, 2026",
    readTime: "7 min read",
    category: "Technical SEO",
  },
  {
    title: "The Future of Digital Marketing: Trends to Watch",
    excerpt: "Stay ahead of the curve with our analysis of emerging digital marketing trends and technologies.",
    date: "May 10, 2026",
    readTime: "9 min read",
    category: "Marketing",
  },
]

export function BlogContent() {
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
            <Badge variant="primary" className="mb-5">Our Blog</Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04]">
              Insights &{" "}
              <span className="gradient-text">Strategies</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Expert advice, actionable tips, and industry insights from the Nextora team.
            </p>
          </motion.div>

          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card hover className="group h-full overflow-hidden">
                  <div className="aspect-[16/9] bg-primary/[0.03] flex items-center justify-center relative">
                    <Tag className="h-8 w-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="ghost">{post.category}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-light mb-3 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 pt-5 border-t border-border text-xs text-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-14 text-center"
          >
            <p className="text-muted text-sm">
              More articles coming soon. Stay tuned.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
