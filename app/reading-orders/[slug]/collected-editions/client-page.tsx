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

interface CollectedEditionsPageProps {
  event: Event
  collections: Collection[]
}

export default function CollectedEditionsPage({ event, collections }: CollectedEditionsPageProps) {
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

          <h1 className="mt-4 text-4xl font-bold">{event.title}: Collected Editions</h1>
          <p className="mt-4 text-xl text-muted-foreground">Available collected editions for the {event.title} event</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((collection, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-[400px]">
                <Image src="/placeholder.svg" alt={collection.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">{collection.title}</h3>
                <p className="mt-2 text-muted-foreground">{collection.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{formatDate(collection.release_date)}</Badge>
                    <Badge variant="secondary">{collection.pages} pages</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{collection.contents}</p>
                </div>
                <div className="mt-4">
                  {collection.amazon_ref && (
                    <AmazonButton amazonRef={collection.amazon_ref} buttonType="sm" className="w-full" /> 
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

