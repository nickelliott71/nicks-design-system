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
  variant?: "timeline" | "grid"
}

export function EventCard({ event, variant = "grid" }: EventCardProps) {

  console.log(event);
  return (
    <Card className="overflow-hidden">
      <div className={variant === "timeline" ? "lg:flex" : "md:flex"}>
        <div
          className={`relative ${
            variant === "timeline" ? "h-[200px] lg:h-[300px] w-full lg:w-[350px]" : "h-[300px] w-full md:w-[400px]"
          } shrink-0`}
        >
          <Image src="/placeholder.svg" alt={`${event.title} Cover`} fill className="object-cover" />
        </div>
        <div className="p-4 lg:p-6 flex-1">
          <div className="flex flex-col h-full gap-4 lg:gap-6">
            <div>
              <h2
                className={`${variant === "timeline" ? "text-2xl lg:text-3xl" : "text-3xl"} font-bold tracking-tight`}
              >
                {event.title}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{event.publisher?.name}</Badge>
                <Badge variant="outline">{event.release_year}</Badge>
                {event.event_type && <Badge variant="secondary">{event.event_type.name}</Badge>}
              </div>
              <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">{event.description}</p>
            </div>

            {variant === "timeline" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold">
                      {String((event.issue_counts?.core ?? 0) + (event.issue_counts?.tie_in ?? 0))} Issues
                    </div>
                    <div className="text-muted-foreground">
                      {String(event.issue_counts?.core ?? 0)} Core / {String(event.issue_counts?.tie_in ?? 0)} Tie-in
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
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
              <Link href={`/reading-orders/${event.slug}`} className="flex-1">
                <Button size="lg" className="w-full">
                  {variant === "timeline" ? "Start Reading" : "View Reading Order"}
                </Button>
              </Link>
              {variant === "grid" && (
                <Link href={`/reading-orders/${event.slug}/background`}>
                  <Button variant="outline">Read Background</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

