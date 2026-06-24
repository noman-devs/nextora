import { PortfolioForm } from "../portfolio-form"

export const dynamic = "force-dynamic"

export default function NewPortfolioPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-light">New Project</h1>
        <p className="text-sm text-muted mt-1">Add a new portfolio project</p>
      </div>
      <PortfolioForm />
    </div>
  )
}
