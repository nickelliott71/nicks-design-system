"use client"

import { Button } from "@/components/ui/button"
import { getAmazonUrl } from "@/lib/constants"
import { ShoppingCart } from "lucide-react"

interface PurchaseButtonProps {
  buttonType?: string 
  className?: string
  amazonRef?: string
}

export function AmazonButton({ buttonType, className, amazonRef }: PurchaseButtonProps) {
  const size = buttonType === "xs" ? "xs" : buttonType === "small" ? "sm" : "default"; 

  return (
    <Button
      size={size}
      className={`h-7 px-2 bg-yellow-400 hover:bg-yellow-500 text-black gap-2 ${className}`}
      onClick={() => {
      if (amazonRef) {
        window.open(getAmazonUrl(amazonRef), "_blank")
      }
    }}><ShoppingCart size={16} />Amazon</Button>
  )
}