"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2, Save, Send } from "lucide-react"

interface BlogPostData {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  seoTitle: string | null
  metaDesc: string | null
  featuredImage: string | null
  category: string | null
  status: string
}

export function BlogForm({ post }: { post?: BlogPostData }) {
  const router = useRouter()
  const isEdit = !!post

  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [content, setContent] = useState(post?.content || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [category, setCategory] = useState(post?.category || "")
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle || "")
  const [metaDesc, setMetaDesc] = useState(post?.metaDesc || "")
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || "")
  const [status, setStatus] = useState(post?.status || "draft")
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

    const url = isEdit ? `/api/blog/${post.id}` : "/api/blog"
    const method = isEdit ? "PATCH" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          content,
          excerpt: excerpt || null,
          category: category || null,
          seoTitle: seoTitle || null,
          metaDesc: metaDesc || null,
          featuredImage: featuredImage || null,
          status,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save")
      }

      router.push("/admin/blog")
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
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-light transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
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
            placeholder="Enter post title"
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
            placeholder="post-slug"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm font-mono"
          />
          <p className="text-xs text-muted mt-1">/{slug}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            placeholder="Write your post content here..."
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            placeholder="Brief description for listings and cards"
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. SEO, Development, Design"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-light">SEO Settings</h2>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">SEO Title</label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="Custom title for search engines"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Meta Description</label>
          <textarea
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
            rows={2}
            placeholder="Brief description for search results"
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-y"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-light">Featured Image</h2>

        <div>
          <label className="block text-sm font-medium text-light mb-1.5">Image URL</label>
          <input
            type="url"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
          {featuredImage && (
            <img
              src={featuredImage}
              alt="Preview"
              className="mt-3 h-40 w-full object-cover rounded-xl border border-border"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none"
              }}
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          onClick={() => setStatus("draft")}
          disabled={saving}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-card border border-border text-light font-medium text-sm hover:bg-white/5 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Draft
        </button>
        <button
          type="submit"
          onClick={() => setStatus("published")}
          disabled={saving}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {status === "published" && isEdit ? "Update" : "Publish"}
        </button>
      </div>
    </form>
  )
}
