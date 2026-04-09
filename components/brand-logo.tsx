import Link from "next/link"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  href?: string
  className?: string
  markClassName?: string
  textClassName?: string
  withText?: boolean
}

export function BrandLogo({
  href = "/",
  className,
  markClassName,
  textClassName,
  withText = true,
}: BrandLogoProps) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2", className)} aria-label="ThermoSmart home">
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground",
          markClassName
        )}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3H14V13.2L16.8 10.4L19 12.6L12 19.6L5 12.6L7.2 10.4L10 13.2V3Z" fill="currentColor" />
        </svg>
      </span>
      {withText && (
        <span className={cn("text-xl font-semibold text-foreground", textClassName)}>
          ThermoSmart
        </span>
      )}
    </Link>
  )
}
