// Test login by hitting the NextAuth credentials callback
const base = "http://localhost:3000"

async function main() {
  // First get CSRF token
  const csrfRes = await fetch(`${base}/api/auth/csrf`, { method: "GET" })
  const csrfData = await csrfRes.json()
  console.log("CSRF:", csrfData)

  // Try credentials sign in
  const res = await fetch(`${base}/api/auth/callback/credentials`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      email: "admin@nextora.com",
      password: "admin123",
      csrfToken: csrfData.csrfToken,
      callbackUrl: "/admin",
      json: "true",
    }),
  })
  
  console.log("Status:", res.status)
  const text = await res.text()
  console.log("Response:", text.substring(0, 500))
}

main().catch(console.error)
