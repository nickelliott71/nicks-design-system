"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TimelineNavigator } from "@/components/timeline-navigator"
import { VisualTimeline } from "@/components/visual-timeline"
import type { Event } from "@/lib/supabase/types"

interface TimelinePageProps {
  events: Event[]
}

export default function TimelinePage({ events }: TimelinePageProps) {
  const [search, setSearch] = useState("")
  const [selectedPublisher, setSelectedPublisher] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  const filteredEvents = events.filter((event) => {
    const matchesSearch = search === "" || event.title.toLowerCase().includes(search.toLowerCase())

    const matchesPublisher = selectedPublisher === "all" || event.publisher?.slug === selectedPublisher

    return matchesSearch && matchesPublisher
  })

  const Filters = () => (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
          <SelectTrigger>
            <SelectValue placeholder="Publisher" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Publishers</SelectItem>
            <SelectItem value="dc-comics">DC Comics</SelectItem>
            <SelectItem value="marvel-comics">Marvel Comics</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="beginner">Beginner Friendly</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="crisis">Crisis</SelectItem>
            <SelectItem value="crossover">Crossover</SelectItem>
            <SelectItem value="character">Character Event</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

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
            <h1 className="text-4xl font-bold">Comic Event Timeline</h1>
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
              <div className="mt-4">
                <Filters />
              </div>
              <div className="mt-8 border-t pt-6">
                <h2 className="font-semibold mb-4">Browse by Year</h2>
                <TimelineNavigator
                  events={filteredEvents}
                  selectedYear={selectedYear}
                  onYearSelect={(year) => setSelectedYear(year === selectedYear ? null : year)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop filters */}
        <div className="hidden lg:block mb-8">
          <Filters />
        </div>

        <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
          {/* Desktop year navigator */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <h2 className="font-semibold mb-4">Browse by Year</h2>
              <TimelineNavigator
                events={filteredEvents}
                selectedYear={selectedYear}
                onYearSelect={(year) => setSelectedYear(year === selectedYear ? null : year)}
              />
            </div>
          </div>

          <div className="min-w-0">
            {" "}
            {/* Add min-w-0 to prevent overflow */}
            <VisualTimeline events={filteredEvents} selectedYear={selectedYear} />
          </div>
        </div>
      </div>
    </main>
  )
}

