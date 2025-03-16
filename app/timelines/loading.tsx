import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-10 w-[300px]" />
        </div>

        <div className="grid gap-6 md:grid-cols-[200px_1fr]">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="md:flex">
                  <Skeleton className="h-[200px] w-full md:w-[300px]" />
                  <div className="p-6 flex-1">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2">
                            <Skeleton className="h-8 w-[200px]" />
                            <div className="flex gap-2">
                              <Skeleton className="h-5 w-20" />
                              <Skeleton className="h-5 w-20" />
                              <Skeleton className="h-5 w-20" />
                            </div>
                          </div>
                          <Skeleton className="h-10 w-[100px]" />
                        </div>
                        <Skeleton className="mt-4 h-20 w-full" />
                      </div>

                      <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="space-y-1">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

