"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import Image from "next/image"
import { ImageIcon, Plus, Trash2, Loader2, ExternalLink, FileType } from "lucide-react"

interface MediaItem {
  id: string
  filename: string
  url: string
  type: string | null
  size: number | null
  createdAt: string
}

export default function MediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filename, setFilename] = useState("")
  const [url, setUrl] = useState("")
  const [type, setType] = useState("")
  const [size, setSize] = useState("")
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const res = await fetch("/api/media", { signal: controller.signal })
        if (res.ok) {
          const data = await res.json()
          setMediaItems(data)
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Failed to load media")
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    load()
    return () => controller.abort()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!filename || !url) return
    setCreating(true)
    setError("")

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, url, type: type || undefined, size: size || undefined }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to create")
      }

      setFilename("")
      setUrl("")
      setType("")
      setSize("")
      setShowForm(false)
      const refreshed = await fetch("/api/media")
      if (refreshed.ok) {
        setMediaItems(await refreshed.json())
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this media entry?")) return
    setDeleting(id)
    try {
      await fetch(`/api/media/${id}`, { method: "DELETE" })
      setMediaItems((prev) => prev.filter((m) => m.id !== id))
    } catch {
      setError("Failed to delete")
    } finally {
      setDeleting(null)
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-light">Media Library</h1>
          <p className="text-sm text-muted mt-1">Manage your uploaded media files</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Media
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary text-sm">{error}</div>
      )}

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-border bg-card p-6 space-y-4"
        >
          <h2 className="text-sm font-semibold text-light">New Media Entry</h2>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">Filename *</label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              required
              placeholder="e.g. hero-banner.jpg"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light mb-1.5">URL *</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="https://example.com/image.jpg"
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-light mb-1.5">Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. image, video, document"
                className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-light mb-1.5">Size (bytes)</label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. 102400"
                className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={creating}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add Media
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-card border border-border text-light font-medium text-sm hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {mediaItems.length === 0 ? (
        <div className="text-center py-20">
          <ImageIcon className="h-10 w-10 text-muted mx-auto mb-3" />
          <p className="text-muted text-sm">No media files yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-primary text-sm hover:underline mt-1"
          >
            Add your first media entry
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-card hover:border-primary/30 transition-colors overflow-hidden group"
            >
              <div className="aspect-video bg-background flex items-center justify-center overflow-hidden">
                {item.url.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i) ? (
                  <Image
                    src={item.url}
                    alt={item.filename}
                    width={300}
                    height={170}
                    unoptimized
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none"
                      const parent = (e.target as HTMLImageElement).parentElement
                      if (parent) {
                        const icon = document.createElement("div")
                        icon.className = "flex flex-col items-center gap-2 text-muted"
                        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`
                        parent.appendChild(icon)
                      }
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted">
                    <FileType className="h-8 w-8" />
                    <span className="text-xs">{item.type || "file"}</span>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-1.5">
                <p className="text-sm font-medium text-light truncate" title={item.filename}>
                  {item.filename}
                </p>
                {item.type && (
                  <p className="text-xs text-muted">{item.type}</p>
                )}
                <p className="text-xs text-muted">
                  {format(new Date(item.createdAt), "MMM d, yyyy")}
                </p>
                <div className="flex items-center gap-2 pt-1.5">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    className="p-1.5 rounded-lg text-muted hover:text-secondary hover:bg-secondary/10 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
