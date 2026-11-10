import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

type BadgeVariant = 'default' | 'accent' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-card text-muted',
  accent: 'bg-accent/15 text-accent',
  outline: 'border border-border text-muted bg-transparent',
}

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-sans',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
