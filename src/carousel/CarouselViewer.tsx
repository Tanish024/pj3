import { useState } from 'react'
import type { CarouselDeckData } from '../data/carouselContent'
import { SlidePreview } from './SlidePreview'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Square,
  Sparkles,
} from 'lucide-react'

interface CarouselViewerProps {
  deck: CarouselDeckData
  className?: string
}

export function CarouselViewer({ deck, className = '' }: CarouselViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single')

  const total = deck.slides.length
  const currentSlide = deck.slides[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : prev))
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-semibold text-text">{deck.title}</span>
            <Badge variant="accent">8 Slides</Badge>
          </div>
          <p className="text-xs text-muted">
            1080 × 1350 px · Warm Editorial (Sand & Ink rhythm) · Handled by {deck.authorHandle}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl border border-border p-1 bg-surface">
            <button
              onClick={() => setViewMode('single')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                viewMode === 'single'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-muted hover:text-text'
              }`}
            >
              <Square className="h-3.5 w-3.5" /> Single
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-muted hover:text-text'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> All Slides
            </button>
          </div>
        </div>
      </div>

      {/* Main Single Slide View */}
      {viewMode === 'single' ? (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Stage */}
          <div className="w-full lg:w-[480px] xl:w-[520px] mx-auto flex flex-col items-center space-y-4">
            <div className="w-full shadow-lg rounded-2xl overflow-hidden bg-card">
              <SlidePreview slide={currentSlide} totalSlides={total} />
            </div>

            {/* Carousel Navigation Toolbar */}
            <div className="flex items-center justify-between w-full px-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-medium text-muted">
                  Slide {currentIndex + 1} / {total}
                </span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full uppercase font-mono ${
                    currentSlide.theme === 'ink'
                      ? 'bg-black text-amber-100 border border-neutral-700'
                      : 'bg-[#F6F1E7] text-[#1C1B19] border border-[#DDD2BF]'
                  }`}
                >
                  {currentSlide.theme} theme
                </span>
              </div>

              <Button
                size="sm"
                onClick={handleNext}
                disabled={currentIndex === total - 1}
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Side Info & Thumbnail Navigator */}
          <div className="w-full lg:flex-1 space-y-6">
            {/* Slide Metadata Card */}
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <h3 className="font-serif text-base font-semibold text-text">Slide Inspector</h3>
                </div>
                <Badge variant={currentSlide.theme === 'ink' ? 'accent' : 'outline'}>
                  {currentSlide.type.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted">Headline</span>
                  <p className="font-serif text-base font-medium text-text mt-0.5">
                    {currentSlide.headline}
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-muted">Body Copy</span>
                  <p className="text-muted leading-relaxed mt-0.5">{currentSlide.body}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-border/70">
                  <div>
                    <span className="text-muted">Word Count</span>
                    <p className="font-mono font-medium text-text mt-0.5">
                      {currentSlide.headline.split(/\s+/).length + currentSlide.body.split(/\s+/).length} words (max 25)
                    </p>
                  </div>
                  <div>
                    <span className="text-muted">Canvas Resolution</span>
                    <p className="font-mono font-medium text-text mt-0.5">1080 × 1350 px (4:5)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="space-y-3">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                Slide Navigator ({total} slides)
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                {deck.slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`group relative text-left rounded-xl overflow-hidden border p-1 transition-all duration-200 cursor-pointer ${
                      currentIndex === idx
                        ? 'border-accent ring-2 ring-accent/30 bg-card'
                        : 'border-border hover:border-accent/50 bg-surface'
                    }`}
                  >
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-background">
                      <SlidePreview slide={s} totalSlides={total} autoScale={true} />
                    </div>
                    <div className="mt-1 px-1 flex items-center justify-between text-[11px] font-mono text-muted">
                      <span>0{s.index}</span>
                      <span className="uppercase">{s.theme}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid View: All 8 slides */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deck.slides.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => {
                  setCurrentIndex(idx)
                  setViewMode('single')
                }}
                className="group cursor-pointer rounded-2xl border border-border bg-surface p-3 transition-all duration-200 hover:border-accent hover:shadow-md space-y-2"
              >
                <div className="rounded-xl overflow-hidden bg-card border border-border/50">
                  <SlidePreview slide={s} totalSlides={total} />
                </div>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="font-mono font-medium text-text">Slide 0{s.index}</span>
                  <Badge variant={s.theme === 'ink' ? 'accent' : 'outline'}>{s.type}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

