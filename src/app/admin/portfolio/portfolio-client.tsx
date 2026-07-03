"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { Briefcase, Edit3, Trash2, Search } from "lucide-react"

interface PortfolioItem {
  id: string
  title: string
  slug: string
  description: string | null
  category: string | null
  tags: string
  createdAt: string
}

export function PortfolioClient({ projects }: { projects: PortfolioItem[] }) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)

  const filtered = projects.filter((project) => {
    const q = search.toLowerCase()
    return (
      project.title.toLowerCase().includes(q) ||
      (project.category || "").toLowerCase().includes(q) ||
      (project.tags ? JSON.parse(project.tags).some((t: string) => t.toLowerCase().includes(q)) : false)
    )
  })

  async function handleDelete(id: string) {
    if (!confirm("Delete this project permanently?")) return
    setDeleting(id)
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" })
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
            placeholder="Search projects..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Briefcase className="h-8 w-8 text-muted mx-auto mb-3" />
          <p className="text-muted text-sm">No projects found</p>
          <Link href="/admin/portfolio/new" className="text-primary text-sm hover:underline mt-1 inline-block">
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((project) => {
            const tagsArr: string[] = project.tags ? JSON.parse(project.tags) : []
            return (
              <div
                key={project.id}
                className="rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/admin/portfolio/edit/${project.id}`}
                        className="text-sm font-semibold text-light hover:text-primary transition-colors"
                      >
                        {project.title}
                      </Link>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                        <span className="text-xs text-muted">/{project.slug}</span>
                        {project.category && (
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border border-primary/20 bg-primary/5 text-primary">
                            {project.category}
                          </span>
                        )}
                        <span className="text-xs text-muted">
                          {format(new Date(project.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                      {project.description && (
                        <p className="text-xs text-muted mt-2 line-clamp-1">{project.description}</p>
                      )}
                      {tagsArr.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {tagsArr.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium bg-white/5 text-muted border border-border"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/admin/portfolio/edit/${project.id}`}
                        className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deleting === project.id}
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
