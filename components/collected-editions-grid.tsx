"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AmazonButton } from "@/components/amazon-button"
import { EBayButton } from "@/components/ebay-button"
import { formatDate } from "@/lib/utils"
import { getYearFromDate } from "@/lib/constants"
import type { Collection } from "@/lib/supabase/types"

interface CollectedEditionsGridProps {
  collections: Collection[]
}

export function CollectedEditionsGrid({ collections }: CollectedEditionsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {collections.map((collection) => (
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

            <div className="flex justify-center mt-4 gap-4">
              {collection.amazon_ref && (
                <AmazonButton amazonRef={collection.amazon_ref} buttonType="sm" />
              )}
              <EBayButton
                ebay_search_term={`${collection.title} ${getYearFromDate(collection.release_date)} tpb`}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}