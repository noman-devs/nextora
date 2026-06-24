"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  service: string
  message: string
}

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  message: "",
}

const serviceOptions = [
  "WordPress Development",
  "WooCommerce Development",
  "Custom Website Development",
  "SEO Services",
  "Local SEO",
  "Technical SEO",
  "Digital Marketing",
  "Lead Generation",
  "Hosting Solutions",
  "Other",
]

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="h-16 w-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-light mb-2">
          Thank You!
        </h3>
        <p className="text-muted max-w-md mx-auto">
          Your message has been received. Our team will reach out within 24 hours
          to schedule your free strategy session.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField
          label="Full Name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField
          label="Company Name"
          name="company"
          type="text"
          placeholder="Acme Inc."
          value={formData.company}
          onChange={handleChange}
        />
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-light mb-2">
          Service Interested In
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl bg-card border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all appearance-none"
        >
          <option value="" disabled className="bg-card">
            Select a service
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-card">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-light mb-2">
          Tell Us About Your Project
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Describe your goals, challenges, and what you're looking for..."
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-muted text-center">
        By submitting, you agree to our Privacy Policy. We&apos;ll never share your information.
      </p>
    </form>
  )
}

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string
  name: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-light mb-2">
        {label}
        {required && <span className="text-secondary ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full h-11 px-4 rounded-xl bg-card border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
      />
    </div>
  )
}
