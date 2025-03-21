"use client"

import { Button } from "@/components/ui/button"
import { getEbayUrl } from "@/lib/constants"
import { ShoppingCart } from "lucide-react"

interface PurchaseButtonProps {
  buttonType?: string 
  className?: string
  ebay_search_term?: string
}

export function EBayButton({ buttonType, className, ebay_search_term }: PurchaseButtonProps) {
  const size = buttonType === "small" ? "sm" : "default"; 

  return (
    <Button
      size={size}
      className={`h-7 px-2 bg-blue-600 hover:bg-blue-700 text-white gap-2 ${className}`}
      onClick={() => {
        if (ebay_search_term) {
          window.open(getEbayUrl(ebay_search_term), "_blank");
        }
      }}
    >
      <ShoppingCart size={16} />
      eBay
    </Button>
  )
}