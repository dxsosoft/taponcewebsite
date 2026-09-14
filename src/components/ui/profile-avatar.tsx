import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProfileAvatarProps {
  name: string
  avatarUrl?: string | null
  size?: "sm" | "md" | "lg"
  className?: string
  priority?: boolean
}

export function ProfileAvatar({
  name,
  avatarUrl,
  size = "lg",
  className,
  priority = false,
}: ProfileAvatarProps) {
  const getInitials = (str: string) => {
    if (!str) return "TO"
    const parts = str.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const sizeClasses = {
    sm: "w-16 h-16 text-base",
    md: "w-20 h-20 text-xl",
    lg: "w-32 h-32 text-3xl",
  }

  const ringPadding = {
    sm: "p-[2.5px]",
    md: "p-[3px]",
    lg: "p-[3.5px]",
  }

  const borderPadding = {
    sm: "p-[2px]",
    md: "p-[3px]",
    lg: "p-1",
  }

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-tr from-[#051f44] via-[#00695C] to-[#26a69a] shadow-[0_0_16px_rgba(0,105,92,0.35)] shrink-0 select-none",
        sizeClasses[size],
        ringPadding[size],
        className
      )}
    >
      <div className={cn("rounded-full bg-white dark:bg-surface w-full h-full", borderPadding[size])}>
        <div className="rounded-full overflow-hidden w-full h-full relative flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 shadow-inner">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className="object-cover"
              priority={priority}
            />
          ) : (
            <span className="font-bold tracking-wider text-accent drop-shadow-sm">
              {getInitials(name)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
