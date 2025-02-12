'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/app/theme-toggle";

export default function Home() {
  const { toast } = useToast();

  return (
    <div className="container mx-auto p-8 space-y-12">
      <h1 className="text-3xl font-bold">Kitchen Sink</h1>


      <section>
        <h2 className="text-xl font-semibold mb-4">Theme switcher</h2>
        <div className="space-y-4">
          <ThemeToggle />
        </div>
      </section>


      {/* Buttons */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Buttons</h2>
        <div className="flex gap-4">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Inputs</h2>
        <div className="space-y-4">
          <Input placeholder="Default input" />
          <Input disabled placeholder="Disabled input" />
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Cards</h2>
        <Card>
          <CardHeader>
            <CardTitle>Example Card</CardTitle>
          </CardHeader>
          <CardContent>
            This is an example of a Card component from ShadCN.
          </CardContent>
        </Card>
      </section>

      {/* Switch */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Switch</h2>
        <Switch />
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        <div className="flex gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* Tabs */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Tabs</h2>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p>Account content goes here.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p>Settings content goes here.</p>
          </TabsContent>
        </Tabs>
      </section>

      {/* Alerts */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Alerts</h2>
        <div className="space-y-4">
          <Alert variant="default">
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>This is a standard alert message.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error Alert</AlertTitle>
            <AlertDescription>Something went wrong!</AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Modals */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Modals</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Open Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Example Modal</DialogTitle>
              <DialogDescription>This is a modal with some content inside.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      {/* Tables */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Tables</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell>Inactive</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Accordions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Accordions</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is ShadCN?</AccordionTrigger>
            <AccordionContent>ShadCN is a collection of beautiful, accessible React components built on top of Radix UI.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it customizable?</AccordionTrigger>
            <AccordionContent>Yes! You can easily customize components to fit your design system.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>


      {/* Toasts */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Toasts (Notifications)</h2>
        <div className="space-y-4">
          <Button
            onClick={() => toast({ title: "Success!", description: "This is a success message." })}
          >
            Show Toast
          </Button>
        </div>
      </section>

      {/* Progress */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Progress Bars</h2>
        <div className="space-y-4">
          <Progress value={25} />
          <Progress value={50} className="bg-green-500" />
          <Progress value={75} className="bg-blue-500" />
        </div>
      </section>

      {/* Dropdown Menus */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Dropdown Menus</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Sliders */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Sliders</h2>
        <Slider defaultValue={[50]} max={100} step={1} />
      </section>

      {/* Tooltips */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Tooltips</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover Me</Button>
          </TooltipTrigger>
          <TooltipContent>
            This is a tooltip message.
          </TooltipContent>
        </Tooltip>
      </section>

      {/* Skeleton Loader */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Skeleton Loader</h2>
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-full" />
        </div>
      </section>

      {/* Popovers */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Popovers</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>This is a popover with additional content.</p>
          </PopoverContent>
        </Popover>
      </section>

      {/* Calendar */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Calendar (Date Picker)</h2>
        <Calendar mode="single" selected={new Date()} />
      </section>

      {/* Command Palette */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Command Palette</h2>
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandItem>Open File</CommandItem>
            <CommandItem>Save</CommandItem>
            <CommandItem>Close</CommandItem>
          </CommandList>
        </Command>
      </section>

      {/* Hover Card */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Hover Card</h2>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            This is additional information when hovering.
          </HoverCardContent>
        </HoverCard>
      </section>

      {/* Menubar */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Menubar</h2>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New</MenubarItem>
              <MenubarItem>Open</MenubarItem>
              <MenubarItem>Save</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </section>

      {/* Sheet (Side Drawer) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Sheet (Side Drawer)</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>This is a slide-in drawer.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </section>

      {/* Separator */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Separator</h2>
        <p>Content above the separator.</p>
        <Separator />
        <p>Content below the separator.</p>
      </section>

      {/* Aspect Ratio */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Aspect Ratio</h2>
        <AspectRatio ratio={16 / 9}>
          <img
            src="https://source.unsplash.com/random/800x450"
            alt="Example Image"
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </section>

      {/* Scroll Area */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Scroll Area</h2>
        <ScrollArea className="h-40 w-64 border">
          <p>Scrollable content...</p>
          <p>More scrollable content...</p>
          <p>Even more scrollable content...</p>
        </ScrollArea>
      </section>
    </div>
  );
}