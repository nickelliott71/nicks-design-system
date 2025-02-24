import { Skeleton } from "@/components/ui/skeleton"
import { HeroSection } from "@/components/hero-section"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <main>
      <HeroSection
        title="Your Guide to Comic Reading Orders"
        subtitle="Navigate the multiverse of comics with confidence"
      />
      <section className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-full max-w-xl" />

        <div className="mt-12 space-y-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="md:flex">
                <Skeleton className="h-[300px] w-full md:w-[400px]" />
                <div className="p-6 w-full">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="mt-4 flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}

