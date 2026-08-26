import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClass?: string;
  id?: string;
}

export function Section({ className, containerClass, children, id, ...props }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)} {...props}>
      <div className={cn("container mx-auto px-4 md:px-6 max-w-7xl", containerClass)}>
        {children}
      </div>
    </section>
  )
}
