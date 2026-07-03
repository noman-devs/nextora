"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function AdminError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error("Admin error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="h-14 w-14 rounded-2xl bg-secondary/10 border border-secondary/30 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="h-7 w-7 text-secondary" />
        </div>
        <h1 className="text-xl font-bold text-light mb-2">Server Error</h1>
        <p className="text-sm text-muted mb-2">
          There is a problem with the server configuration. Check the server logs for more information.
        </p>
        {error.digest && (
          <p className="text-xs text-muted/60 mb-6 font-mono">Error ID: {error.digest}</p>
        )}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => unstable_retry()}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
