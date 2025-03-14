"use client"

import { Button } from "@/components/ui/button"
import { getAmazonUrl } from "@/lib/constants"

interface PurchaseButtonProps {
  buttonType?: string 
  className?: string
  amazonRef?: string
}

export function EBayButton({ buttonType, className, amazonRef }: PurchaseButtonProps) {
  const size = buttonType === "small" ? "sm" : "default"; 

  return (
    <Button size={size} className={className} onClick={() => {
      if (amazonRef) {
        window.open(getAmazonUrl(amazonRef), "_blank")
      }
    }}>Amazon</Button>
  )
}