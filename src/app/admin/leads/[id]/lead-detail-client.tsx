"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Mail, Phone, Building2, Wrench, Calendar, Clock, MessageSquareText } from "lucide-react"
import Link from "next/link"

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
  updatedAt: string
}

const statusColors: Record<string, string> = {
  new: "border-primary/30 bg-primary/10 text-primary",
  contacted: "border-secondary/30 bg-secondary/10 text-secondary",
  qualified: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  converted: "border-green-500/30 bg-green-500/10 text-green-400",
  closed: "border-white/10 bg-white/5 text-muted",
}

const statuses = ["new", "contacted", "qualified", "converted", "closed"]

export function LeadDetailClient({ lead }: { lead: Lead }) {
  const router = useRouter()
  const [status, setStatus] = useState(lead.status)
  const [updating, setUpdating] = useState(false)

  async function handleStatusChange(newStatus: string) {
    setUpdating(true)
    await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    setStatus(newStatus)
    setUpdating(false)
    router.refresh()
  }

  return (
    <>
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-light transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Leads
      </Link>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl font-bold text-light">{lead.name}</h1>
              <p className="text-sm text-muted mt-1">{lead.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${statusColors[status] || statusColors.new}`}>
                {status}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted">Email</p>
                <a href={`mailto:${lead.email}`} className="text-sm text-light hover:text-primary transition-colors truncate block">
                  {lead.email}
                </a>
              </div>
            </div>
            {lead.phone && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted">Phone</p>
                  <a href={`tel:${lead.phone}`} className="text-sm text-light hover:text-primary transition-colors truncate block">
                    {lead.phone}
                  </a>
                </div>
              </div>
            )}
            {lead.company && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border">
                <Building2 className="h-4 w-4 text-blue-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted">Company</p>
                  <p className="text-sm text-light truncate">{lead.company}</p>
                </div>
              </div>
            )}
            {lead.service && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border">
                <Wrench className="h-4 w-4 text-purple-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted">Service Interest</p>
                  <p className="text-sm text-light truncate">{lead.service}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Created {format(new Date(lead.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              Updated {format(new Date(lead.updatedAt), "MMM d, yyyy 'at' h:mm a")}
            </span>
          </div>

          {lead.message && (
            <div className="p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquareText className="h-4 w-4 text-muted" />
                <p className="text-xs font-medium text-muted">Message</p>
              </div>
              <p className="text-sm text-light whitespace-pre-wrap">{lead.message}</p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold text-light mb-3">Update Status</h2>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              disabled={updating || status === s}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                status === s
                  ? "bg-primary text-background"
                  : "bg-background border border-border text-muted hover:text-light hover:border-primary/30"
              } disabled:opacity-50`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
