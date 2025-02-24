interface HeroSectionProps {
  title: string
  subtitle: string
  showNewsletter?: boolean
}

export function HeroSection({ title, subtitle, showNewsletter = false }: HeroSectionProps) {
  return (
    <div className="bg-background border-b">
      <div className="container px-4 py-20 mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mt-4 text-xl text-muted-foreground md:text-2xl">{subtitle}</p>
        {showNewsletter && (
          <div className="mt-8 flex justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-sm rounded-md border bg-background px-4 py-2"
            />
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Subscribe</button>
          </div>
        )}
      </div>
    </div>
  )
}

