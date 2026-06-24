"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { FileText, Edit3, Trash2, Eye, EyeOff, Search } from "lucide-react"

interface BlogPost {
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
  publishedAt: string | null
  createdAt: string
}

export function BlogClient({ posts }: { posts: BlogPost[] }) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleting, setDeleting] = useState<string | null>(null)

  const filtered = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.slug.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  async function handleDelete(id: string) {
    if (!confirm("Delete this post permanently?")) return
    setDeleting(id)
    await fetch(`/api/blog/${id}`, { method: "DELETE" })
    setDeleting(null)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["all", "draft", "published"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                statusFilter === s
                  ? "bg-primary text-background"
                  : "bg-card border border-border text-muted hover:text-light hover:border-primary/30"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="h-8 w-8 text-muted mx-auto mb-3" />
          <p className="text-muted text-sm">No blog posts found</p>
          <Link href="/admin/blog/new" className="text-primary text-sm hover:underline mt-1 inline-block">
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="text-sm font-semibold text-light hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                      <span className="text-xs text-muted">/{post.slug}</span>
                      {post.category && (
                        <span className="text-xs text-muted">{post.category}</span>
                      )}
                      <span className="text-xs text-muted">
                        {format(new Date(post.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                    {post.excerpt && (
                      <p className="text-xs text-muted mt-2 line-clamp-1">{post.excerpt}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {post.status === "published" ? (
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border border-green-500/30 bg-green-500/10 text-green-400">
                        <Eye className="h-3 w-3" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border border-white/10 bg-white/5 text-muted">
                        <EyeOff className="h-3 w-3" />
                        Draft
                      </span>
                    )}
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting === post.id}
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
