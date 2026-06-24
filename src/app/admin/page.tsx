import { prisma } from "@/lib/prisma"
import { format } from "date-fns"

export const dynamic = "force-dynamic"
import { Users, FileText, Briefcase, MessageSquare, Mail, ArrowUpRight, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"

async function getStats() {
  const [
    totalLeads,
    newLeads,
    totalBlogPosts,
    publishedPosts,
    totalPortfolio,
    totalTestimonials,
    totalSubscribers,
    recentLeads,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "new" } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "published" } }),
    prisma.portfolioProject.count(),
    prisma.testimonial.count(),
    prisma.subscriber.count(),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ])
  return { totalLeads, newLeads, totalBlogPosts, publishedPosts, totalPortfolio, totalTestimonials, totalSubscribers, recentLeads }
}

const statusColors: Record<string, string> = {
  new: "border-primary/30 bg-primary/10 text-primary",
  contacted: "border-secondary/30 bg-secondary/10 text-secondary",
  qualified: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  converted: "border-green-500/30 bg-green-500/10 text-green-400",
  closed: "border-white/10 bg-white/5 text-muted",
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    {
      label: "Total Leads",
      value: stats.totalLeads,
      sub: `${stats.newLeads} new`,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    { label: "Blog Posts", value: stats.totalBlogPosts, sub: `${stats.publishedPosts} published`, icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { label: "Portfolio Projects", value: stats.totalPortfolio, icon: Briefcase, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { label: "Testimonials", value: stats.totalTestimonials, icon: MessageSquare, color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/20" },
    { label: "Subscribers", value: stats.totalSubscribers, icon: Mail, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-light">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Overview of your Nextora CMS</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className={`rounded-xl border ${card.border} ${card.bg} p-5`}>
              <div className="flex items-center justify-between mb-3">
                <Icon className={`h-5 w-5 ${card.color}`} />
                <ArrowUpRight className={`h-4 w-4 ${card.color} opacity-60`} />
              </div>
              <p className="text-2xl font-bold text-light">{card.value}</p>
              <p className="text-sm text-muted mt-0.5">{card.label}</p>
              {card.sub && <p className={`text-xs mt-1 ${card.color}`}>{card.sub}</p>}
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-light">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentLeads.length === 0 ? (
              <p className="text-sm text-muted py-4 text-center">No leads yet</p>
            ) : (
              stats.recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors group"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-light truncate group-hover:text-primary transition-colors">
                      {lead.name}
                    </p>
                    <p className="text-xs text-muted truncate">{lead.email}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${statusColors[lead.status] || statusColors.new}`}>
                      {lead.status}
                    </span>
                    <span className="text-xs text-muted whitespace-nowrap">
                      {format(new Date(lead.createdAt), "MMM d")}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-light mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/blog/new"
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors text-center"
            >
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-light">New Blog Post</span>
            </Link>
            <Link
              href="/admin/leads"
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors text-center"
            >
              <Users className="h-5 w-5 text-secondary" />
              <span className="text-xs font-medium text-light">View Leads</span>
            </Link>
            <Link
              href="/admin/media"
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors text-center"
            >
              <DollarSign className="h-5 w-5 text-blue-400" />
              <span className="text-xs font-medium text-light">Media Library</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors text-center"
            >
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <span className="text-xs font-medium text-light">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
