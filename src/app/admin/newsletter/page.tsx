"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Mail, Trash2, Download, Loader2 } from "lucide-react"

interface Subscriber {
  id: string
  email: string
  createdAt: string
}

export default function NewsletterPage() {
  const router = useRouter()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState("")

  async function loadSubscribers() {
    try {
      const res = await fetch("/api/subscribers")
      if (res.ok) {
        const data = await res.json()
        setSubscribers(data)
      }
    } catch {
      setError("Failed to load subscribers")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSubscribers()
  }, [])

  async function handleDelete(id: string) {
    if (!confirm("Delete this subscriber?")) return
    setDeleting(id)
    try {
      await fetch(`/api/subscribers/${id}`, { method: "DELETE" })
      setSubscribers((prev) => prev.filter((s) => s.id !== id))
    } catch {
      setError("Failed to delete")
    } finally {
      setDeleting(null)
    }
  }

  function handleExportCSV() {
    const headers = ["Email", "Subscription Date"]
    const rows = subscribers.map((s) => [
      s.email,
      format(new Date(s.createdAt), "yyyy-MM-dd HH:mm:ss"),
    ])
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `subscribers-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
    URL.revokeObjectURL(url)
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
          <h1 className="text-2xl font-bold text-light">Newsletter Subscribers</h1>
          <p className="text-sm text-muted mt-1">
            {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
          </p>
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary text-sm">{error}</div>
      )}

      {subscribers.length === 0 ? (
        <div className="text-center py-20">
          <Mail className="h-10 w-10 text-muted mx-auto mb-3" />
          <p className="text-muted text-sm">No subscribers yet</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-5 py-4">
                    Email
                  </th>
                  <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-5 py-4">
                    Subscribed On
                  </th>
                  <th className="text-right text-xs font-semibold text-muted uppercase tracking-wider px-5 py-4 w-20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <span className="text-sm text-light">{sub.email}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted">
                        {format(new Date(sub.createdAt), "MMM d, yyyy")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        disabled={deleting === sub.id}
                        className="p-1.5 rounded-lg text-muted hover:text-secondary hover:bg-secondary/10 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
