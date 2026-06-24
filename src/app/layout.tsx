import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Nextora — Your Complete Digital Growth Partner",
    template: "%s | Nextora",
  },
  description:
    "Nextora is a premium digital growth agency specializing in WordPress, WooCommerce, SEO, digital marketing, and custom web development. We engineer growth that compounds.",
  keywords: [
    "digital agency",
    "WordPress development",
    "WooCommerce",
    "SEO services",
    "digital marketing",
    "web development",
    "lead generation",
    "Nextora",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nextora",
    title: "Nextora — Your Complete Digital Growth Partner",
    description:
      "Premium digital growth agency specializing in WordPress, WooCommerce, SEO, and digital marketing.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background text-light antialiased flex flex-col">
        {children}
      </body>
    </html>
  )
}
