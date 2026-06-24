import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const footerLinks = {
  Services: [
    { label: "WordPress Development", href: "/services" },
    { label: "WooCommerce Development", href: "/services" },
    { label: "Custom Development", href: "/services" },
    { label: "SEO Services", href: "/services" },
    { label: "Digital Marketing", href: "/services" },
    { label: "Lead Generation", href: "/services" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "#" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/#faq" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-sm font-bold text-background">N</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-light">
                Nextora
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Your complete digital growth partner. We build, optimize, and scale digital
              experiences that drive real business results.
            </p>
            <div className="mt-6 flex gap-3">
              {["LI", "X", "IG", "FB"].map((s) => (
                <span
                  key={s}
                  className="h-8 w-8 rounded-lg bg-card border border-border flex items-center justify-center text-xs text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all cursor-pointer"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-light mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-light transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.href.startsWith("http") && (
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Nextora. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted hover:text-light transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted hover:text-light transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-muted hover:text-light transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
