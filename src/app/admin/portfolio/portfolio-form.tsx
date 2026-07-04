"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Loader2, Save } from "lucide-react"

interface PortfolioData {
  id: string
  title: string
  slug: string
  description: string | null
  content: string | null
  category: string | null
  projectUrl: string | null
  featuredImage: string | null
  tags: string
  results: string
}

export function PortfolioForm({ project }: { project?: PortfolioData }) {
  const router = useRouter()
  const isEdit = !!project

  const [title, setTitle] = useState(project?.title || "")
  const [slug, setSlug] = useState(project?.slug || "")
  const [description, setDescription] = useState(project?.description || "")
  const [content, setContent] = useState(project?.content || "")
  const [category, setCategory] = useState(project?.category || "")
  const [projectUrl, setProjectUrl] = useState(project?.projectUrl || "")
  const [featuredImage, setFeaturedImage] = useState(project?.featuredImage || "")
  const [tags, setTags] = useState(project?.tags ? JSON.parse(project.tags).join(", ") : "")
  const [results, setResults] = useState(project?.results ? JSON.parse(project.results).join(", ") : "")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function generateSlug(value: string) {
    if (isEdit) return
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const url = isEdit ? `/api/portfolio/${project.id}` : "/api/portfolio"
    const method = isEdit ? "PATCH" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          description: description || null,
          content: content || null,
          category: category || null,
          projectUrl: projectUrl || null,
          featuredImage: featuredImage || null,
          tags: tags ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
          results: results ? results.split(",").map((r: string) => r.trim()).filter(Boolean) : [],
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save")
      }

      router.push("/admin/portfolio")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Link
        href="/admin/portfolio"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-light transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Portfolio
      </Link>

      {error && (
        <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary text-sm">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              generateSlug(e.target.value)
            }}
            required
            placeholder="Project title"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Slug *</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="project-slug"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm font-mono"
          />
          <p className="text-xs text-muted mt-1">/{slug}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Brief project description"
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Case Study Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            placeholder="Write the full case study content here..."
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Web Development, Branding, SEO"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Project URL</label>
          <input
            type="url"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-light">Media</h2>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Featured Image URL</label>
          <input
            type="url"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
          {featuredImage && (
            <Image
              src={featuredImage}
              alt="Preview"
              width={400}
              height={160}
              unoptimized
              className="mt-3 h-40 w-full object-cover rounded-xl border border-border"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none"
              }}
            />
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-light">Additional Info</h2>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="React, TypeScript, Tailwind (comma separated)"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
          <p className="text-xs text-muted mt-1">Separate tags with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Results</label>
          <input
            type="text"
            value={results}
            onChange={(e) => setResults(e.target.value)}
            placeholder="50% increase in traffic, 3x conversion rate (comma separated)"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
          <p className="text-xs text-muted mt-1">Separate results with commas</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isEdit ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  )
}
