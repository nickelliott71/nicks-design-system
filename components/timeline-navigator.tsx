"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/supabase/types"

interface TimelineNavigatorProps {
  events: Event[]
  onYearSelect: (year: number) => void
  selectedYear: number | null
}

interface YearGroup {
  decade: number
  years: {
    year: number
    eventCount: number
  }[]
}

export function TimelineNavigator({ events, onYearSelect, selectedYear }: TimelineNavigatorProps) {
  const [expandedDecades, setExpandedDecades] = useState<number[]>([])

  const yearGroups = useMemo(() => {
    const years = events.map((e) => e.release_year)
    const uniqueYears = Array.from(new Set(years)).sort((a, b) => a - b)

    const groups: YearGroup[] = []
    uniqueYears.forEach((year) => {
      const decade = Math.floor(year / 10) * 10
      const group = groups.find((g) => g.decade === decade)
      const eventCount = events.filter((e) => e.release_year === year).length

      if (group) {
        group.years.push({ year, eventCount })
      } else {
        groups.push({
          decade,
          years: [{ year, eventCount }],
        })
      }
    })

    return groups.sort((a, b) => a.decade - b.decade)
  }, [events])

  const toggleDecade = (decade: number) => {
    setExpandedDecades((prev) => (prev.includes(decade) ? prev.filter((d) => d !== decade) : [...prev, decade]))
  }

  return (
    <div className="space-y-2">
      {yearGroups.map((group) => (
        <div key={group.decade} className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-between font-medium"
            onClick={() => toggleDecade(group.decade)}
          >
            <span>{group.decade}s</span>
            {expandedDecades.includes(group.decade) ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>

          {expandedDecades.includes(group.decade) && (
            <div className="ml-4 space-y-1">
              {group.years.map(({ year, eventCount }) => (
                <Button
                  key={year}
                  variant={selectedYear === year ? "default" : "ghost"}
                  className="w-full justify-between pl-4"
                  onClick={() => onYearSelect(year)}
                >
                  <span>{year}</span>
                  <span className="text-xs bg-muted rounded-full px-2 py-0.5">{eventCount}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

