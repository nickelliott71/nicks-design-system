"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TimelineNavigator } from "@/components/timeline-navigator"
import { VisualTimeline } from "@/components/visual-timeline"
import type { Timeline } from "@/lib/supabase/types"

interface TimelinePageProps {
  timeline: Timeline
}

export default function TimelinePage({ timeline }: TimelinePageProps) {
  const [search] = useState("")
  const [selectedPublisher] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  const filteredEvents = timeline.events?.filter((event) => {
    const matchesSearch = search === "" || event.title.toLowerCase().includes(search.toLowerCase())

    const matchesPublisher = selectedPublisher === "all" || event.publisher?.slug === selectedPublisher

    return matchesSearch && matchesPublisher
  })

  console.log("timeline", timeline)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">{timeline.name} <span className="text-muted-foreground">Timeline</span></h1>
          </div>

          {/* Mobile filters button */}
          <Sheet>
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
          </Sheet>
        </div>

        <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
          {/* Desktop year navigator */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <h2 className="font-semibold mb-4">Browse by Year</h2>
              {<TimelineNavigator
                events={filteredEvents ?? []}
                selectedYear={selectedYear}
                onYearSelect={(year) => setSelectedYear(year === selectedYear ? null : year)}
              />}
            </div>
          </div>

          <div className="min-w-0">
            {" "}
            {/* Add min-w-0 to prevent overflow */}
            {<VisualTimeline events={filteredEvents ?? []} selectedYear={selectedYear} timeline={timeline} />}
          </div>
        </div>
      </div>
    </main>
  )
}

