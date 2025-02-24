"use client"

import { useMemo } from "react"
import { EventCard } from "@/components/event-card"
import type { Event } from "@/lib/supabase/types"

interface VisualTimelineProps {
  events: Event[]
  selectedYear: number | null
}

export function VisualTimeline({ events, selectedYear }: VisualTimelineProps) {
  const sortedEvents = useMemo(() => [...events].sort((a, b) => a.release_year - b.release_year), [events])

  const filteredEvents = selectedYear
    ? sortedEvents.filter((event) => event.release_year === selectedYear)
    : sortedEvents

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[100px] lg:left-[120px] top-0 bottom-0 w-px bg-border" />

      <div className="space-y-8">
        {filteredEvents.map((event) => (
          <div key={event.id} className="relative">
            {/* Year marker */}
            <div className="absolute left-0 top-10 w-[80px] lg:w-[100px] text-right">
              <span className="text-xl lg:text-2xl font-bold">{event.release_year}</span>
            </div>

            {/* Timeline dot */}
            <div className="absolute left-[92px] lg:left-[112px] top-10 w-4 h-4 rounded-full border-4 border-background bg-primary" />

            {/* Event card */}
            <div className="ml-[120px] lg:ml-[140px]">
              <EventCard event={event} variant="timeline" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

