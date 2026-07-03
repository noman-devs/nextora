import { PrismaClient } from "../src/generated/prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@nextora.com"
  const password = process.env.ADMIN_PASSWORD || "admin123"

  const existing = await prisma.user.findUnique({ where: { email } })
  if (!existing) {
    const hashed = await hash(password, 12)
    await prisma.user.create({
      data: { email, password: hashed, name: "Admin", role: "admin" },
    })
    console.log("Admin user created:", email)
  } else {
    console.log("Admin user already exists")
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
