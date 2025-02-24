"use client"

import { EventCard } from "@/components/event-card"
import type { Event } from "@/lib/supabase/types"

interface HomePageProps {
  events: Event[]
}

export default function HomePage({ events }: HomePageProps) {
  return (
    <main>
      <div className="bg-background border-b">
        <div className="container px-4 py-20 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Your Guide to Comic Reading Orders
          </h1>
          <p className="mt-4 text-xl text-muted-foreground md:text-2xl">
            Navigate the multiverse of comics with confidence
          </p>
        </div>
      </div>
      <section className="container mx-auto px-4 py-8">
        <div className="relative">
          <input
            type="search"
            placeholder="Search events, series, or characters..."
            className="w-full px-10 py-2 rounded-md border bg-background"
          />
        </div>

        <div className="mt-12 space-y-8">
          {!events || events.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold">No events found</h2>
              <p className="text-muted-foreground mt-2">Check back later for new reading orders</p>
            </div>
          ) : (
            events.map((event) => <EventCard key={event.id} event={event} variant="timeline" />)
          )}
        </div>
      </section>
    </main>
  )
}

