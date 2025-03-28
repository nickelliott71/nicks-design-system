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

          <h1 className="mt-4 text-4xl font-bold">{event.title} <span className="text-muted-foreground">Collected Editions</span></h1>
          <p className="mt-4 text-xl text-muted-foreground">Available collected editions for the {event.title} event</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <Card key={collection.id} className="flex flex-col h-full">
              <div className="p-4 flex-grow">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative w-[195px] aspect-[13/20] mb-4">
                    <Image
                      src={`/images/collections/${collection.id}.png`}
                      alt={collection.title}
                      fill
                      sizes="195px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-center">{collection.title}</h3>
                  <span className="text-2xl font-bold text-muted-foreground">{collection.subtitle}</span>
                  <div className="flex flex-wrap justify-start gap-2 m-2">
                      <Badge variant="outline">{formatDate(collection.release_date)}</Badge>
                      <Badge variant="secondary">{collection.pages} pages</Badge>
                  </div>
                  <p className="mt-2 mb-4 text-muted-foreground">{collection.description}</p>
                  <p className="text-sm text-muted-foreground">Collects: {collection.contents}</p>
                </div>


                <div className="flex justify-center mt-4 gap-4" >
                  {collection.amazon_ref && (
                    <AmazonButton amazonRef={collection.amazon_ref} buttonType="sm" /*className="w-full"*/ /> 
                  )}
                    <EBayButton ebay_search_term={collection.title + " " + getYearFromDate(collection.release_date) + " tpb"}  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

