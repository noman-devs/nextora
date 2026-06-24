import { prisma } from "@/lib/prisma"
import { LeadsClient } from "./leads-client"

export const dynamic = "force-dynamic"

async function getLeads(searchParams: { search?: string; status?: string }) {
  const where: Record<string, unknown> = {}
  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search } },
      { email: { contains: searchParams.search } },
      { company: { contains: searchParams.search } },
    ]
  }
  if (searchParams.status && searchParams.status !== "all") {
    where.status = searchParams.status
  }
  return prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>
}) {
  const params = await searchParams
  const leads = await getLeads(params)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-light">Leads</h1>
          <p className="text-sm text-muted mt-1">Manage incoming leads and inquiries</p>
        </div>
        <p className="text-sm text-muted">{leads.length} total</p>
      </div>
      <LeadsClient leads={JSON.parse(JSON.stringify(leads))} search={params.search || ""} currentStatus={params.status || "all"} />
    </div>
  )
}
