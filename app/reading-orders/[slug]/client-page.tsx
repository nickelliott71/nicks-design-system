"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Library, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PurchaseButton } from "@/components/purchase-button"
import { formatDate } from "@/lib/utils"
import type { Event, Issue, IssueType } from "@/lib/supabase/types"

interface ReadingOrderPageProps {
  event: Event
  issues: Issue[]
}

export default function ReadingOrderPage({ event, issues }: ReadingOrderPageProps) {
  const [filter, setFilter] = useState<IssueType>("all")

  const filteredIssues = issues.filter((issue) => {
    if (filter === "all") return true
    return issue.type.name === filter
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{event.title} Reading Order</h1>
          <p className="mt-4 text-xl text-muted-foreground">{event.description}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <Badge className="text-lg" variant="outline">
              {issues.filter((i) => i.type.name === "lead-in").length} Lead-ins
            </Badge>
            <Badge className="text-lg" variant="secondary">
              {issues.filter((i) => i.type.name === "core").length} Core Issues
            </Badge>
            <Badge className="text-lg" variant="outline">
              {issues.filter((i) => i.type.name === "tie-in").length} Tie-ins
            </Badge>
          </div>

          <div className="flex gap-4">
            {event.previous_event && (
              <Link href={`/reading-orders/${event.previous_event.slug}`}>
                <Button variant="outline" size="sm">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {event.previous_event.title}
                </Button>
              </Link>
            )}
            {event.next_event && (
              <Link href={`/reading-orders/${event.next_event.slug}`}>
                <Button variant="outline" size="sm">
                  {event.next_event.title}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All Issues
          </Button>
          <Button variant={filter === "core" ? "default" : "outline"} onClick={() => setFilter("core")}>
            Core Story
          </Button>
          <Button variant={filter === "lead-in" ? "default" : "outline"} onClick={() => setFilter("lead-in")}>
            Lead-ins
          </Button>
          <Button variant={filter === "tie-in" ? "default" : "outline"} onClick={() => setFilter("tie-in")}>
            Tie-ins
          </Button>
          <Link href={`/reading-orders/${event.slug}/collected-editions`}>
            <Button variant="ghost">
              <Library className="mr-2 h-4 w-4" />
              Collected Editions
            </Button>
          </Link>
        </div>

        <ScrollArea className="h-[600px] pr-4">
          {filteredIssues.map((issue, index) => (
            <Card key={index} className="mb-4 overflow-hidden">
              <div className="md:flex">
                <div className="relative h-[200px] w-full md:w-[150px]">
                  <Image src="/placeholder.svg" alt={issue.title} fill className="object-cover" />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">{issue.title}</h3>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{issue.importance}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-muted-foreground">{issue.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant={issue.type.name === "core" ? "default" : "secondary"}>
                        {issue.type.name === "core" ? "Core Issue" : issue.type.name === "tie-in" ? "Tie-in" : "Lead-in"}
                      </Badge>
                        <Badge variant="outline">{formatDate(issue.date)}</Badge>
                      </div>

                      {issue.collection && (
                        <div className="mt-4 border-t pt-4">
                          <p className="text-sm font-medium">Collected in:</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="outline">{issue.collection.title}</Badge>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {issue.purchase_options && issue.purchase_options.length > 0 && (
                        <PurchaseButton options={issue.purchase_options} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}

