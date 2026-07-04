import { hash, compare } from "bcryptjs"
import { NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "./prisma"

export async function hashPassword(password: string) {
  return hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

export async function requireAdmin() {
  const session = await auth()
  if (!session?.user || session.user.role !== "admin") {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  }
  return { user: session.user }
}

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@nextora.com"
  const password = process.env.ADMIN_PASSWORD || "admin123"

  const existing = await prisma.user.findUnique({ where: { email } })
  if (!existing) {
    const hashed = await hashPassword(password)
    await prisma.user.create({
      data: { email, password: hashed, name: "Admin", role: "admin" },
    })
    console.log("Admin user seeded")
  }
}
