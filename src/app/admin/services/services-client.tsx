"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Globe, Edit3, Trash2, Plus, X, Loader2 } from "lucide-react"

interface ServiceItem {
  id: string
  title: string
  description: string | null
  icon: string
  features: string
  order: number
}

interface FormData {
  title: string
  description: string
  icon: string
  features: string
  order: number
}

const emptyForm: FormData = {
  title: "",
  description: "",
  icon: "Globe",
  features: "",
  order: 0,
}

export function ServicesClient({ services: initial }: { services: ServiceItem[] }) {
  const router = useRouter()
  const [services, setServices] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)

  function openNew() {
    setForm({ ...emptyForm, order: services.length + 1 })
    setEditingId(null)
    setShowForm(true)
    setError("")
  }

  function openEdit(item: ServiceItem) {
    const featuresArr: string[] = item.features ? JSON.parse(item.features) : []
    setForm({
      title: item.title,
      description: item.description || "",
      icon: item.icon,
      features: featuresArr.join(", "),
      order: item.order,
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

    const url = editingId ? `/api/services/${editingId}` : "/api/services"
    const method = editingId ? "PATCH" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description || null,
          icon: form.icon || "Globe",
          features: form.features ? form.features.split(",").map((f) => f.trim()).filter(Boolean) : [],
          order: form.order,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save")
      }

      closeForm()
      router.refresh()
      const updated = await fetch("/api/services").then((r) => r.json())
      setServices(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service permanently?")) return
    setDeleting(id)
    await fetch(`/api/services/${id}`, { method: "DELETE" })
    setDeleting(null)
    router.refresh()
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-light">Services</h1>
          <p className="text-sm text-muted mt-1">Manage your service offerings</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeForm} />
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-light">
                {editingId ? "Edit Service" : "New Service"}
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
                <label className="block text-sm font-medium text-light mb-1.5">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="Service title"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  placeholder="Brief service description"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-1.5">Icon Name</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  placeholder="e.g. Globe, Code, Palette, Search"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm font-mono"
                />
                <p className="text-xs text-muted mt-1">Lucide icon name (e.g. Globe, Code, Palette)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-1.5">Features</label>
                <input
                  type="text"
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                />
                <p className="text-xs text-muted mt-1">Separate features with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-1.5">Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                />
                <p className="text-xs text-muted mt-1">Lower numbers appear first</p>
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

      {services.length === 0 ? (
        <div className="text-center py-16">
          <Globe className="h-8 w-8 text-muted mx-auto mb-3" />
          <p className="text-muted text-sm">No services yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {services.map((item) => {
            const featuresArr: string[] = item.features ? JSON.parse(item.features) : []
            return (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-lg bg-primary/10 text-primary text-xs font-mono font-bold">
                          {item.order}
                        </span>
                        <span className="text-sm font-semibold text-light">{item.title}</span>
                        <span className="text-xs font-mono text-muted bg-white/5 px-1.5 py-0.5 rounded">
                          {item.icon}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-muted mt-1.5 line-clamp-1">{item.description}</p>
                      )}
                      {featuresArr.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {featuresArr.map((feature) => (
                            <span
                              key={feature}
                              className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium bg-white/5 text-muted border border-border"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
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
            )
          })}
        </div>
      )}
    </div>
  )
}
