"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="mt-4 text-muted-foreground">We couldn&apos;t load the timeline. Please try again.</p>
        <Button onClick={reset} className="mt-4">
          Try again
        </Button>
      </div>
    </div>
  )
}