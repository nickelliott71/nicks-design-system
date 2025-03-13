"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Library, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PurchaseButton } from "@/components/purchase-button"
import { formatDate } from "@/lib/utils"
import type { Event, EventIssue, Timeline } from "@/lib/supabase/types"

type IssueType = "all" | "core" | "tie-in" | "lead-in"

interface ReadingOrderPageProps {
  event: Event
  issues: EventIssue []
  timeline: Timeline
}

export default function ReadingOrderPage({ event, issues, timeline }: ReadingOrderPageProps) {
  const [filter, setFilter] = useState<IssueType>("all")

  const filteredIssues = issues.filter((issues) => {
    if (filter === "all") return true
    return issues.type.name === filter
  })

  return (
    <div className="lex flex-col bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{event.title} <span className="text-muted-foreground">Reading Order</span></h1>
          <p className="mt-4 text-xl text-muted-foreground">{event.description}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-6 flex flex-wrap gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
              All Issues ({issues.length})
            </Button>
            <Button variant={filter === "core" ? "default" : "outline"} onClick={() => setFilter("core")}>
              Core Story ({issues.filter((i) => i.type.name === "core").length})
            </Button>
            <Button variant={filter === "lead-in" ? "default" : "outline"} onClick={() => setFilter("lead-in")}>
              Lead-ins ({issues.filter((i) => i.type.name === "lead-in").length})
            </Button>
            <Button variant={filter === "tie-in" ? "default" : "outline"} onClick={() => setFilter("tie-in")}>
              Tie-ins ({issues.filter((i) => i.type.name === "tie-in").length})
            </Button>
            <Link href={`/reading-orders/${event.slug}/collected-editions`}>
              <Button variant="ghost">
                <Library className="mr-2 h-4 w-4" />
                Collected Editions
              </Button>
            </Link>
          </div>
          <div className="flex mb-6 gap-4">
            {event.previous_event && (
              <Link href={`/reading-orders/${event.previous_event.slug}?timeline=${timeline.id}`}>
                <Button variant="outline" size="sm">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous: {event.previous_event.title}
                </Button>
              </Link>
            )}
             {event.current_timeline && (
              <Link href={`/timelines/${event.current_timeline.slug}`}>
                <Button variant="link" size="sm">
                  {event.current_timeline.name} timeline
                </Button>
              </Link>
            )}           
            {event.next_event && (
              <Link href={`/reading-orders/${event.next_event.slug}?timeline=${timeline.id}`}>
                <Button variant="outline" size="sm">
                  Next: {event.next_event.title}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div>
          {filteredIssues.map((issue, index) => (
            <Card key={index} className="mb-4 overflow-hidden">
              <div className="md:flex">
                <div className="relative w-full md:w-[150px]">
                  <Image src="/placeholder.svg" alt={issue.issues.title} fill className="object-cover" />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">{issue.order} - {issue.issues.title} <span className="text-muted-foreground">{issue.issues.subtitle}</span></h3>
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
                      <p className="text-muted-foreground">{issue.issues.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant={issue.type.name === "core" ? "default" : "secondary"}>
                          {issue.type.name === "core" ? "Core Issue" : issue.type.name === "tie-in" ? "Tie-in" : "Lead-in"}
                        </Badge>
                        <Badge variant="outline">{formatDate(issue.issues.date)}</Badge>
                      </div>

                      {issue.issues.collection && (
                        <div className="flex mt-4 border-t pt-4 items-center gap-4">
                          <span className="text-sm font-medium">Collected in:</span>
                          <Badge variant="outline">{issue.issues.collection.title}</Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {issue.issues.purchase_options && issue.issues.purchase_options.length > 0 && (
                        <PurchaseButton options={issue.issues.purchase_options} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

