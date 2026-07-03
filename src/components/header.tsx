"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm shadow-black/[0.02] border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-sm font-bold text-white">N</span>
            </div>
            <span className={cn(
              "text-lg font-semibold tracking-tight transition-colors duration-300",
              scrolled ? "text-light" : "text-light"
            )}>
              Nextora
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted hover:text-light hover:bg-black/[0.03]"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-light"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border/50 bg-white"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/5 text-primary"
                      : "text-muted hover:text-light hover:bg-black/[0.03]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="w-full">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
