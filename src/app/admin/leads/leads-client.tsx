"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { Search, Trash2, ExternalLink, Mail, Phone, Building2, Wrench } from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string | null
  message: string | null
  status: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  new: "border-primary/30 bg-primary/10 text-primary",
  contacted: "border-secondary/30 bg-secondary/10 text-secondary",
  qualified: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  converted: "border-green-500/30 bg-green-500/10 text-green-400",
  closed: "border-white/10 bg-white/5 text-muted",
}

const statuses = ["all", "new", "contacted", "qualified", "converted", "closed"]

export function LeadsClient({
  leads,
  search: initialSearch,
  currentStatus,
}: {
  leads: Lead[]
  search: string
  currentStatus: string
}) {
  const router = useRouter()
  const [search, setSearch] = useState(initialSearch)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this lead?")) return
    setDeleting(id)
    await fetch(`/api/leads/${id}`, { method: "DELETE" })
    setDeleting(null)
    router.refresh()
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (currentStatus !== "all") params.set("status", currentStatus)
    router.push(`/admin/leads?${params.toString()}`)
  }

  function handleStatusFilter(status: string) {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (status !== "all") params.set("status", status)
    router.push(`/admin/leads?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
        </form>
        <div className="flex gap-1.5 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusFilter(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                currentStatus === s
                  ? "bg-primary text-background"
                  : "bg-card border border-border text-muted hover:text-light hover:border-primary/30"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted text-sm">No leads found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="text-sm font-semibold text-light hover:text-primary transition-colors"
                    >
                      {lead.name}
                    </Link>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                      <span className="flex items-center gap-1 text-xs text-muted">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </span>
                      {lead.phone && (
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </span>
                      )}
                      {lead.company && (
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Building2 className="h-3 w-3" />
                          {lead.company}
                        </span>
                      )}
                      {lead.service && (
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Wrench className="h-3 w-3" />
                          {lead.service}
                        </span>
                      )}
                    </div>
                    {lead.message && (
                      <p className="text-xs text-muted mt-2 line-clamp-1">{lead.message}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${statusColors[lead.status] || statusColors.new}`}>
                      {lead.status}
                    </span>
                    <span className="text-xs text-muted whitespace-nowrap hidden sm:block">
                      {format(new Date(lead.createdAt), "MMM d, yyyy")}
                    </span>
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="p-1.5 rounded-lg text-muted hover:text-light hover:bg-white/5 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      disabled={deleting === lead.id}
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
