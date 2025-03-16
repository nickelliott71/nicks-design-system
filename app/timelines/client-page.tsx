"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft/*, Filter*/ } from "lucide-react"
import { Button } from "@/components/ui/button"
/*import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TimelineNavigator } from "@/components/timeline-navigator"
import { VisualTimeline } from "@/components/visual-timeline"*/
import type { Timeline } from "@/lib/supabase/types"
import { TimelineCard } from "@/components/timeline-card"

interface TimelinePageProps {
  timelines: Timeline []
}

export default function TimelinesPage({ timelines }: TimelinePageProps) {
  /*const [search] = useState("")
  const [selectedPublisher] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  const filteredEvents = timeline.events?.filter((event) => {
    const matchesSearch = search === "" || event.title.toLowerCase().includes(search.toLowerCase())

    const matchesPublisher = selectedPublisher === "all" || event.publisher?.slug === selectedPublisher

    return matchesSearch && matchesPublisher
  })*/

  console.log("timeline", timelines)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div>
            <h1 className="text-4xl font-bold">Comic Timelines</h1>
            <p className="mt-4 text-xl text-muted-foreground md:text-2xl">
              Explore the chronological order of comic events, characters and eras
            </p>
          </div>

          {/* Mobile filters button */}
          {/*<Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-8 border-t pt-6">
                <h2 className="font-semibold mb-4">Browse by Year</h2>
                {<TimelineNavigator
                  events={filteredEvents ?? []}
                  selectedYear={selectedYear}
                  onYearSelect={(year) => setSelectedYear(year === selectedYear ? null : year)}
                />}
              </div>
            </SheetContent>
          </Sheet>*/}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {!timelines || timelines.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <h2 className="text-2xl font-bold">No timelines found</h2>
                <p className="text-muted-foreground mt-2">Check back later for new timelines</p>
              </div>
            ) : (
              timelines.map((timeline) => (
                <div key={timeline.id} className="">
                  <TimelineCard timeline={timeline} />
                </div>
              )
          ))}
        </div>



        
      </div>
    </main>
  )
}

