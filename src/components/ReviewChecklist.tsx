import { useState, useMemo } from 'react'
import type { CarouselSlideData } from '../data/carouselContent'
import { Card } from './Card'
import { Badge } from './Badge'
import { Button } from './Button'
import {
  CheckCircle2,
  Circle,
  Sparkles,
  AlertCircle,
  FastForward,
  CheckCheck,
} from 'lucide-react'

export interface ReviewItem {
  id: string
  label: string
  description: string
  autoValid?: boolean
}

interface ReviewChecklistProps {
  slides: CarouselSlideData[]
  isReviewed: boolean
  isSkipped: boolean
  onToggleReview: (completed: boolean) => void
  onSkipReview: () => void
  className?: string
}

export function ReviewChecklist({
  slides,
  isReviewed,
  isSkipped,
  onToggleReview,
  onSkipReview,
  className = '',
}: ReviewChecklistProps) {
  // Compute automated validation diagnostics
  const diagnostics = useMemo(() => {
    const hasHook = slides.some((s) => s.type === 'hook')
    const hasCta = slides.some((s) => s.type === 'cta')
    const allUnder25 = slides.every((s) => {
      const words = (s.headline + ' ' + s.body).trim().split(/\s+/).length
      return words <= 25
    })
    const consistentHandle = slides.every((s) => Boolean(s.handle && s.handle.startsWith('@')))

    return {
      hasHook,
      hasCta,
      allUnder25,
      consistentHandle,
    }
  }, [slides])

  const defaultItems: ReviewItem[] = useMemo(
    () => [
      {
        id: 'hook-clear',
        label: 'Hook is clear & sparks curiosity',
        description: 'First slide poses a compelling question or counter-intuitive hook.',
        autoValid: diagnostics.hasHook,
      },
      {
        id: 'one-idea',
        label: 'One focused idea per slide',
        description: 'Strict editorial focus with no competing secondary concepts.',
        autoValid: true,
      },
      {
        id: 'under-25-words',
        label: 'Under 25 words per card',
        description: 'Every slide respects the 25-word maximum for effortless mobile scanning.',
        autoValid: diagnostics.allUnder25,
      },
      {
        id: 'cta-present',
        label: 'CTA slide & handle present',
        description: 'Last slide includes a clear action pill and community invite.',
        autoValid: diagnostics.hasCta,
      },
      {
        id: 'brand-handle',
        label: 'Brand handle verified',
        description: 'Active creator handle (@yourbrand) visible across all footers.',
        autoValid: diagnostics.consistentHandle,
      },
      {
        id: 'no-typos',
        label: 'No typos or punctuation errors',
        description: 'Final pass on grammar, quotes, and punctuation.',
        autoValid: true,
      },
    ],
    [diagnostics],
  )

  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    'hook-clear': diagnostics.hasHook,
    'one-idea': true,
    'under-25-words': diagnostics.allUnder25,
    'cta-present': diagnostics.hasCta,
    'brand-handle': diagnostics.consistentHandle,
    'no-typos': false,
  })

  const checkedCount = Object.values(checkedIds).filter(Boolean).length
  const totalCount = defaultItems.length
  const allChecked = checkedCount === totalCount

  const handleToggle = (id: string) => {
    setCheckedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      const newCheckedCount = Object.values(next).filter(Boolean).length
      onToggleReview(newCheckedCount === totalCount)
      return next
    })
  }

  const handleCheckAll = () => {
    const allOn: Record<string, boolean> = {}
    defaultItems.forEach((item) => {
      allOn[item.id] = true
    })
    setCheckedIds(allOn)
    onToggleReview(true)
  }

  return (
    <Card className={`space-y-4 p-5 ${className}`}>
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <h3 className="font-serif text-base font-semibold text-text">Pre-Export Review</h3>
        </div>
        <div className="flex items-center gap-2">
          {isSkipped ? (
            <Badge variant="outline">Review Skipped</Badge>
          ) : allChecked || isReviewed ? (
            <Badge variant="accent">Approved (6/6)</Badge>
          ) : (
            <span className="text-xs font-mono text-muted">
              {checkedCount} / {totalCount} Checked
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-muted">
        Tick off quality checks before exporting high-resolution assets, or skip to proceed immediately.
      </p>

      {/* Checklist items */}
      <div className="space-y-2 pt-1" role="group" aria-label="Quality checklist items">
        {defaultItems.map((item) => {
          const isChecked = Boolean(checkedIds[item.id])
          return (
            <div
              key={item.id}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onClick={() => handleToggle(item.id)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault()
                  handleToggle(item.id)
                }
              }}
              className={`flex w-full items-start gap-3 p-2.5 rounded-xl border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent select-none ${
                isChecked
                  ? 'border-accent/40 bg-accent/5'
                  : 'border-border/70 bg-surface hover:border-accent/30'
              }`}
            >
              <div className="mt-0.5 text-accent shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="h-4 w-4 fill-accent text-white dark:text-[#1C1B19]" aria-hidden="true" />
                ) : (
                  <Circle className="h-4 w-4 text-muted" aria-hidden="true" />
                )}
              </div>
              <div className="space-y-0.5 text-xs">
                <span
                  className={`font-medium ${
                    isChecked ? 'text-text line-through opacity-80' : 'text-text'
                  }`}
                >
                  {item.label}
                </span>
                <p className="text-[11px] text-muted leading-tight">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Word limit diagnostic notice if violation */}
      {!diagnostics.allUnder25 && (
        <div className="flex items-start gap-2 p-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>One or more slides currently exceed 25 words. Consider trimming before public distribution.</span>
        </div>
      )}

      {/* Actions: Check All & Skip */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCheckAll}
          className="text-xs"
        >
          <CheckCheck className="h-3.5 w-3.5" /> Check All
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onSkipReview}
          className="text-xs text-muted hover:text-text"
        >
          <FastForward className="h-3.5 w-3.5" /> Skip Review
        </Button>
      </div>
    </Card>
  )
}

