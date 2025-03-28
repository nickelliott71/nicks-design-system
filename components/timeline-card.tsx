"use client"

import Image from "next/image"
import Link from "next/link"
/*import { BookOpen, Clock, Users2, Trophy } from "lucide-react"*/
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Timeline } from "@/lib/supabase/types"

interface TimelineCardProps {
  timeline: Timeline
}

export function TimelineCard({ timeline }: TimelineCardProps) {

  return (
    <Card className="overflow-hidden">
      <div className="lg:flex">
        <div
          className={`relative h-[200px] lg:h-[300px] w-full lg:w-[350px] shrink-0`}
        >
          {/*<Image src="/placeholder.svg" alt={`${timeline.name} Cover`} fill className="object-cover" />*/}
          <Image
            src={`/images/timelines/${timeline.id}.png`}
            alt={timeline.name}
            fill
            sizes="(min-width: 768px) 120px, 195px"
            className="object-cover object-top"
          />
        </div>
        <div className="p-4 lg:p-6 flex-1">
          <div className="flex flex-col h-full gap-4 lg:gap-6">
            <div>
              <h2
                className="text-2xl lg:text-3xl font-bold tracking-tight"
              >
                {timeline.name}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{timeline.publisher?.name}</Badge>
                <Badge variant="outline">{timeline.release_years}</Badge>
              </div>
              <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">{timeline.description}</p>
            </div>
              {/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
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
              </div>*/}

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
              <Link href={`/timeline/${timeline.slug}`} className="flex-1">
                <Button size="lg" className="w-full">
                  View timeline
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

