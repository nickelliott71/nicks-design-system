import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"
import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reading Orders",
  description: "Your Ultimate Comic Reading Guide",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background text-foreground">
            <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                  Reading Orders
                </Link>
                <div className="flex items-center gap-4">
                  <Link href="/timelines">
                    <Button variant="outline">View Comic Timelines</Button>
                  </Link>
                  <ThemeToggle />
                </div>
              </div>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

