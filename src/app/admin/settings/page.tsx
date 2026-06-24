"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save, Building2, Mail, Share2, Search } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [companyName, setCompanyName] = useState("")
  const [tagline, setTagline] = useState("")
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [facebook, setFacebook] = useState("")
  const [twitter, setTwitter] = useState("")
  const [instagram, setInstagram] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [gaId, setGaId] = useState("")
  const [pixelId, setPixelId] = useState("")

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const s = data.data || {}
        setCompanyName(s.companyName || "")
        setTagline(s.tagline || "")
        setDescription(s.description || "")
        setEmail(s.email || "")
        setPhone(s.phone || "")
        setAddress(s.address || "")
        setFacebook(s.facebook || "")
        setTwitter(s.twitter || "")
        setInstagram(s.instagram || "")
        setLinkedin(s.linkedin || "")
        setMetaTitle(s.metaTitle || "")
        setMetaDescription(s.metaDescription || "")
        setGaId(s.gaId || "")
        setPixelId(s.pixelId || "")
      })
      .catch(() => setError("Failed to load settings"))
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess(false)

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          tagline,
          description,
          email,
          phone,
          address,
          facebook,
          twitter,
          instagram,
          linkedin,
          metaTitle,
          metaDescription,
          gaId,
          pixelId,
        }),
      })

      if (!res.ok) throw new Error("Failed to save")

      setSuccess(true)
      router.refresh()
    } catch {
      setError("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-light">Settings</h1>
        <p className="text-sm text-muted mt-1">Manage your website configuration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary text-sm">{error}</div>
        )}
        {success && (
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
            Settings saved successfully
          </div>
        )}

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-light">Company Information</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your Company Name"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Your company tagline"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Brief description of your company"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-y"
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-light">Contact Details</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@example.com"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              placeholder="123 Main St, City, State, ZIP"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-y"
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Share2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-light">Social Media</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Facebook URL</label>
            <input
              type="url"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="https://facebook.com/yourpage"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Twitter / X URL</label>
            <input
              type="url"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="https://twitter.com/yourhandle"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Instagram URL</label>
            <input
              type="url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://instagram.com/yourhandle"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">LinkedIn URL</label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Search className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-light">SEO Settings</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Default Meta Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Your Website | Best Services"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Default Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              placeholder="Brief description of your website for search engines"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Google Analytics ID</label>
            <input
              type="text"
              value={gaId}
              onChange={(e) => setGaId(e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Meta Pixel ID</label>
            <input
              type="text"
              value={pixelId}
              onChange={(e) => setPixelId(e.target.value)}
              placeholder="1234567890"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm font-mono"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}
