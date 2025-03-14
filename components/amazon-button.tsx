"use client"

import { Button } from "@/components/ui/button"
import { getAmazonUrl } from "@/lib/constants"

interface PurchaseButtonProps {
  buttonType?: string 
  className?: string
  amazonRef?: string
}

export function AmazonButton({ buttonType, className, amazonRef }: PurchaseButtonProps) {
  const size = buttonType === "xs" ? "xs" : buttonType === "small" ? "sm" : "default"; 

  return (
    <Button size={size} className={`bg-black text-white ${className}`} style={{ color: '#FF9900' }} onClick={() => {
      if (amazonRef) {
        window.open(getAmazonUrl(amazonRef), "_blank")
      }
    }}>Amazon</Button>
  )
}