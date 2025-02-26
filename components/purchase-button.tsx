"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getAmazonUrl } from "@/lib/constants"
import type { CollectionPurchaseOption, IssuePurchaseOption } from "@/lib/supabase/types"

interface PurchaseButtonProps {
  options: CollectionPurchaseOption[] | IssuePurchaseOption[]
  className?: string
}

export function PurchaseButton({ options, className }: PurchaseButtonProps) {
  if (!options || options.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className}>Purchase</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {options.map((option, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={() => {
              window.open(getAmazonUrl(option.asin), "_blank")
            }}
          >
            {"format" in option && typeof option.format === "object" && "name" in option.format
              ? option.format.name === "digital"
                ? "Digital Edition"
                : option.format.name.charAt(0).toUpperCase() + option.format.name.slice(1)
              : "Purchase"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

