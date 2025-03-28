"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AmazonButton } from "@/components/amazon-button"
import { formatDate } from "@/lib/utils"
import type { Event, Collection } from "@/lib/supabase/types"
import { EBayButton } from "@/components/ebay-button"
import { getYearFromDate } from "@/lib/constants"
import { CollectedEditionsGrid } from "@/components/collected-editions-grid"

interface CollectedEditionsPageProps {
  event: Event
  essential: Collection[]
  recommended: Collection[]
  optional: Collection[]
}

export default function CollectedEditionsPage({ event, essential, recommended, optional }: CollectedEditionsPageProps) {

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href={`/reading-orders/${event.slug}`}>
            <Button variant="outline" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Reading Order
            </Button>
          </Link>

          <h1 className="mt-4 text-4xl font-bold">{event.title} <span className="text-muted-foreground">Collected Editions</span></h1>
          <p className="mt-4 text-xl text-muted-foreground">Available collected editions for the {event.title} event</p>
        </div>


        <h2 className="mt-8 mb-4 text-3xl font-bold">Essential <span className="text-muted-foreground">Collected Editions</span></h2>
        <CollectedEditionsGrid collections={essential} />

        {recommended.length > 0 && (
          <>
            <h2 className="mt-8 mb-4 text-3xl font-bold">Recommended <span className="text-muted-foreground">Collected Editions</span></h2>
            <CollectedEditionsGrid collections={recommended} />
          </>
        )}

        {optional.length > 0 && (
          <>
            <h2 className="mt-8 mb-4 text-3xl font-bold">Optional <span className="text-muted-foreground">Collected Editions</span></h2>
            <CollectedEditionsGrid collections={optional} />
          </>
        )}

      </div>
    </div>
  )
}

