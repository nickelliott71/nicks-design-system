"use client"

import Image from "next/image"
import Link from "next/link"
import { BookOpen, Clock, Users2, Trophy } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/supabase/types"

interface EventCardProps {
  event: Event
  timeline: number | null
}

export function EventCard({ event, timeline }: EventCardProps) {

  return (
    <Card className="overflow-hidden">
      <div className="lg:flex">
        <div
          className={`relative h-[200px] lg:h-[300px] w-full lg:w-[350px] shrink-0`}
        >
          <Image src="/placeholder.svg" alt={`${event.title} Cover`} fill className="object-cover" />
        </div>
        <div className="p-4 lg:p-6 flex-1 relative">
          {/* Coming Soon Label */}
          { event.status && event.status_id != 1 && (
            <div className="absolute top-0 right-0 z-10 w-40 h-40 overflow-hidden">
              <div className={`absolute top-0 right-0 transform translate-x-[20%] translate-y-[170%] rotate-45 
                text-white text-xs font-bold py-1 w-[125%] text-center shadow-md 
                ${event.status_id === 2 ? "bg-orange-600" : event.status_id === 3 ? "bg-gray-600" : "bg-gray-600"}`}>
                    {event.status.status}
              </div>
            </div>
          )}
          <div className="flex flex-col h-full gap-4 lg:gap-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">{event.title}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{event.publisher?.name}</Badge>
                <Badge variant="outline">{event.release_year}</Badge>
              </div>
              <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">{event.description}</p>
            </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold">
                      {String((event.issue_counts?.essential ?? 0) + (event.issue_counts?.recommended ?? 0) + (event.issue_counts?.optional ?? 0))} Issues
                    </div>
                    <div className="text-muted-foreground">
                      {String(event.issue_counts?.essential ?? 0)} Essential 
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold">Reading Time</div>
                    <div className="text-muted-foreground">
                      {String(event.reading_time)} {event.reading_time === 1 ? "hour" : "hours"}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users2 className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold">Main Characters</div>
                    <div className="text-muted-foreground">
                      {event.main_characters?.map((c) => c.name).join(", ") || "No main characters listed"}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold">Event Type</div>
                    <div className="text-muted-foreground">
                      {event.event_type?.name
                        ? event.event_type.name.charAt(0).toUpperCase() + event.event_type.name.slice(1)
                        : "Unknown"}
                    </div>
                  </div>
                </div>
              </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
              <Link href={`/reading-orders/${event.slug}?timeline=${timeline}`} className="flex-1">
                <Button size="lg" className="w-full">
                  Reading order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

