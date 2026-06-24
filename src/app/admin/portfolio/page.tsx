import { prisma } from "@/lib/prisma"
import { PortfolioClient } from "./portfolio-client"

export const dynamic = "force-dynamic"

async function getProjects() {
  return prisma.portfolioProject.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export default async function PortfolioPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-light">Portfolio</h1>
          <p className="text-sm text-muted mt-1">Manage your portfolio projects</p>
        </div>
        <a
          href="/admin/portfolio/new"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          New Project
        </a>
      </div>
      <PortfolioClient projects={JSON.parse(JSON.stringify(projects))} />
    </div>
  )
}
