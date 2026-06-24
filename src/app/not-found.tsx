import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center min-h-[80vh]">
        <div className="text-center px-4">
          <div className="text-8xl font-bold gradient-text mb-4">404</div>
          <h1 className="text-2xl font-bold text-light mb-3">Page not found</h1>
          <p className="text-muted mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
