"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { MessageSquare, Edit3, Trash2, Plus, Star, X, Loader2 } from "lucide-react"

interface TestimonialItem {
  id: string
  name: string
  company: string | null
  role: string | null
  content: string
  image: string | null
  rating: number
  createdAt: string
}

interface FormData {
  name: string
  company: string
  role: string
  content: string
  image: string
  rating: number
}

const emptyForm: FormData = {
  name: "",
  company: "",
  role: "",
  content: "",
  image: "",
  rating: 5,
}

export function TestimonialsClient({ testimonials: initial }: { testimonials: TestimonialItem[] }) {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)

  function openNew() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
    setError("")
  }

  function openEdit(item: TestimonialItem) {
    setForm({
      name: item.name,
      company: item.company || "",
      role: item.role || "",
      content: item.content,
      image: item.image || "",
      rating: item.rating,
    })
    setEditingId(item.id)
    setShowForm(true)
    setError("")
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setError("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials"
    const method = editingId ? "PATCH" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company || null,
          role: form.role || null,
          content: form.content,
          image: form.image || null,
          rating: form.rating,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save")
      }

      closeForm()
      router.refresh()
      const updated = await fetch("/api/testimonials").then((r) => r.json())
      setTestimonials(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial permanently?")) return
    setDeleting(id)
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" })
    setDeleting(null)
    router.refresh()
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-light">Testimonials</h1>
          <p className="text-sm text-muted mt-1">Manage client testimonials</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeForm} />
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-light">
                {editingId ? "Edit Testimonial" : "New Testimonial"}
              </h2>
              <button onClick={closeForm} className="p-1.5 rounded-lg text-muted hover:text-light hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary text-sm mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light mb-1.5">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Client name"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-light mb-1.5">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light mb-1.5">Role</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. CEO"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-1.5">Content *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  required
                  rows={4}
                  placeholder="Testimonial text"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-1.5">Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-1.5">Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className={`p-1 rounded-lg transition-colors ${
                        star <= form.rating ? "text-primary" : "text-muted hover:text-light"
                      }`}
                    >
                      <Star className="h-5 w-5" fill={star <= form.rating ? "currentColor" : "none"} />
                    </button>
                  ))}
                  <span className="text-sm text-muted ml-2">{form.rating}/5</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="h-11 px-6 rounded-xl bg-card border border-border text-light font-medium text-sm hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {testimonials.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="h-8 w-8 text-muted mx-auto mb-3" />
          <p className="text-muted text-sm">No testimonials yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={40}
                          height={40}
                          unoptimized
                          className="h-10 w-10 rounded-full object-cover border border-border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none"
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                          {item.name[0]}
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-semibold text-light">{item.name}</span>
                        {(item.company || item.role) && (
                          <p className="text-xs text-muted">
                            {[item.role, item.company].filter(Boolean).join(" at ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted mt-2 line-clamp-2 italic">&ldquo;{item.content}&rdquo;</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-primary" fill="currentColor" />
                        ))}
                        {Array.from({ length: 5 - item.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-muted" />
                        ))}
                      </div>
                      <span className="text-xs text-muted">
                        {format(new Date(item.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEdit(item)}
                      className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deleting === item.id}
                      className="p-1.5 rounded-lg text-muted hover:text-secondary hover:bg-secondary/10 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
