import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article'
}

export function Card({ as: Tag = 'div', className, children, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
