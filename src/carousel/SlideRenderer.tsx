import { forwardRef } from 'react'
import type { CarouselSlideData, AspectRatio } from '../data/carouselContent'
import { SlideIcon } from './SlideIcon'
import { ArrowRight, Bookmark } from 'lucide-react'

interface SlideRendererProps {
  slide: CarouselSlideData
  totalSlides?: number
  aspectRatio?: AspectRatio
  className?: string
}

export const SlideRenderer = forwardRef<HTMLDivElement, SlideRendererProps>(
  ({ slide, totalSlides = 8, aspectRatio = '4:5', className = '' }, ref) => {
    const isInk = slide.theme === 'ink'
    const isTerracotta = slide.theme === 'terracotta'
    const isSquare = aspectRatio === '1:1'
    const isLastSlide = slide.index === totalSlides

    // Theme color mappings specifically tuned for high-resolution canvas rendering
    let bgStyle = '#F6F1E7'
    let textStyle = '#1C1B19'
    let mutedStyle = '#6E675B'
    let borderStyle = '#DDD2BF'
    let accentStyle = '#D9633B'
    let cardBgStyle = '#FFFBF3'

    if (isInk) {
      bgStyle = '#1C1B19'
      textStyle = '#F1EBDF'
      mutedStyle = '#A29A8B'
      borderStyle = '#34302A'
      accentStyle = '#E8794F'
      cardBgStyle = '#26231F'
    } else if (isTerracotta) {
      bgStyle = '#D9633B'
      textStyle = '#FFFBF3'
      mutedStyle = '#FBECE7'
      borderStyle = 'rgba(255, 255, 255, 0.25)'
      accentStyle = '#FFFBF3'
      cardBgStyle = '#C4552F'
    }

    const canvasWidth = 1080
    const canvasHeight = isSquare ? 1080 : 1350
    const padding = isSquare ? '72px' : '96px'

    return (
      <div
        ref={ref}
        data-slide-index={slide.index}
        data-slide-type={slide.type}
        data-slide-theme={slide.theme}
        className={`relative flex flex-col justify-between select-none overflow-hidden ${className}`}
        style={{
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          padding,
          backgroundColor: bgStyle,
          color: textStyle,
          fontFamily: "'Inter', sans-serif",
          boxSizing: 'border-box',
          transition: 'background-color 200ms ease, color 200ms ease',
        }}
      >
        {/* Top Header Row */}
        <header
          className="flex items-center justify-between border-b pb-5"
          style={{ borderColor: borderStyle }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-[19px] font-medium tracking-[0.2em] uppercase"
              style={{ color: accentStyle }}
            >
              {slide.tag || (slide.tipNumber ? `Checklist · Item ${slide.tipNumber}` : 'Pet Care Editorial')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[20px] font-medium tracking-widest"
              style={{ color: mutedStyle }}
            >
              {String(slide.index).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
          </div>
        </header>

        {/* Slide Body Content */}
        <main className="my-auto flex flex-col justify-center">
          {/* 1. Hook Slide Layout */}
          {slide.type === 'hook' && (
            <div className={`flex flex-col ${isSquare ? 'gap-6' : 'gap-10'}`}>
              <div className="space-y-5">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[19px] font-medium"
                  style={{
                    backgroundColor: isTerracotta ? '#C4552F' : isInk ? '#26231F' : '#E9DFCF',
                    color: isTerracotta ? '#FFFBF3' : accentStyle,
                    border: `1px solid ${borderStyle}`,
                  }}
                >
                  Essential Vet Guide
                </div>

                <div className="relative">
                  <h1
                    className={`font-serif font-semibold tracking-[-0.02em] ${
                      isSquare
                        ? 'text-[64px] leading-[1.1]'
                        : 'text-[78px] leading-[1.08]'
                    }`}
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Choosing a vet?
                    <br />
                    <span className="relative inline-block mt-2">
                      Check these 5 things first.
                      {/* Terracotta / accent underline */}
                      <span
                        className="absolute -bottom-3 left-0 h-[6px] w-full rounded-full"
                        style={{
                          backgroundColor: isTerracotta ? '#FFFBF3' : accentStyle,
                        }}
                      />
                    </span>
                  </h1>
                </div>
              </div>

              <p
                className={`font-normal leading-[1.4] ${
                  isSquare
                    ? 'max-w-[860px] text-[28px] mt-2'
                    : 'max-w-[820px] text-[34px] mt-5'
                }`}
                style={{ color: mutedStyle }}
              >
                {slide.body}
              </p>
            </div>
          )}

          {/* 2. Problem Slide Layout */}
          {slide.type === 'problem' && (
            <div className={`flex flex-col ${isSquare ? 'gap-6' : 'gap-10'}`}>
              <div
                className={`flex items-center justify-center rounded-2xl border ${
                  isSquare ? 'h-[80px] w-[80px]' : 'h-[96px] w-[96px]'
                }`}
                style={{
                  backgroundColor: cardBgStyle,
                  borderColor: borderStyle,
                  color: isTerracotta ? '#FFFBF3' : accentStyle,
                }}
              >
                <SlideIcon name={slide.iconName} size={isSquare ? 40 : 48} strokeWidth={1.25} />
              </div>

              <div className="space-y-4">
                <span
                  className="font-serif italic text-[26px]"
                  style={{
                    color: isTerracotta ? '#FFFBF3' : accentStyle,
                    fontFamily: "'Fraunces', serif",
                  }}
                >
                  The common pitfall
                </span>
                <h2
                  className={`font-serif font-semibold tracking-[-0.02em] ${
                    isSquare
                      ? 'text-[56px] leading-[1.14]'
                      : 'text-[68px] leading-[1.12]'
                  }`}
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {slide.headline}
                </h2>
              </div>

              <p
                className={`font-normal leading-[1.45] ${
                  isSquare
                    ? 'max-w-[860px] text-[28px]'
                    : 'max-w-[840px] text-[34px]'
                }`}
                style={{ color: mutedStyle }}
              >
                {slide.body}
              </p>
            </div>
          )}

          {/* 3. Tip Slide Layout (Tips 1 to 5) */}
          {slide.type === 'tip' && (
            <div className={`flex flex-col ${isSquare ? 'gap-5' : 'gap-8'}`}>
              {/* Huge Fraunces Numeral and Icon row */}
              <div
                className="flex items-baseline justify-between border-b pb-4"
                style={{ borderColor: borderStyle }}
              >
                <span
                  className={`font-serif font-semibold leading-none tracking-[-0.04em] ${
                    isSquare ? 'text-[130px]' : 'text-[170px]'
                  }`}
                  style={{
                    fontFamily: "'Fraunces', serif",
                    color: isTerracotta ? '#FFFBF3' : accentStyle,
                  }}
                >
                  {slide.tipNumber}
                </span>

                <div
                  className={`flex items-center justify-center rounded-2xl border shadow-sm ${
                    isSquare ? 'h-[88px] w-[88px]' : 'h-[108px] w-[108px]'
                  }`}
                  style={{
                    backgroundColor: cardBgStyle,
                    borderColor: borderStyle,
                    color: isTerracotta ? '#FFFBF3' : accentStyle,
                  }}
                >
                  <SlideIcon name={slide.iconName} size={isSquare ? 44 : 54} strokeWidth={1.25} />
                </div>
              </div>

              <div className="space-y-4 pt-1">
                <h2
                  className={`font-serif font-semibold tracking-[-0.02em] ${
                    isSquare
                      ? 'text-[54px] leading-[1.16]'
                      : 'text-[64px] leading-[1.14]'
                  }`}
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {slide.headline}
                </h2>

                <p
                  className={`font-normal leading-[1.48] ${
                    isSquare
                      ? 'max-w-[860px] text-[28px]'
                      : 'max-w-[850px] text-[34px]'
                  }`}
                  style={{ color: mutedStyle }}
                >
                  {slide.body}
                </p>
              </div>
            </div>
          )}

          {/* 4. CTA Slide Layout */}
          {slide.type === 'cta' && (
            <div className={`flex flex-col items-center text-center ${isSquare ? 'gap-6' : 'gap-10'}`}>
              <div
                className={`flex items-center justify-center rounded-3xl border ${
                  isSquare ? 'h-[92px] w-[92px]' : 'h-[112px] w-[112px]'
                }`}
                style={{
                  backgroundColor: isTerracotta ? '#C4552F' : isInk ? '#26231F' : '#FFFBF3',
                  borderColor: borderStyle,
                  color: isTerracotta ? '#FFFBF3' : accentStyle,
                }}
              >
                <Bookmark size={isSquare ? 44 : 54} strokeWidth={1.25} />
              </div>

              <div className="space-y-4 max-w-[860px]">
                <h2
                  className={`font-serif font-semibold tracking-[-0.02em] ${
                    isSquare
                      ? 'text-[58px] leading-[1.12]'
                      : 'text-[72px] leading-[1.1]'
                  }`}
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {slide.headline}
                </h2>

                <p
                  className={`font-normal leading-[1.45] ${
                    isSquare ? 'text-[26px]' : 'text-[32px]'
                  }`}
                  style={{ color: mutedStyle }}
                >
                  {slide.body}
                </p>
              </div>

              {/* Terracotta Button-style Action Pill */}
              <div className="pt-2">
                <div
                  className={`inline-flex items-center justify-center rounded-2xl font-medium tracking-wide shadow-lg cursor-pointer ${
                    isSquare ? 'px-10 py-4 text-[26px]' : 'px-12 py-6 text-[30px]'
                  }`}
                  style={{
                    backgroundColor: isTerracotta ? '#FFFBF3' : accentStyle,
                    color: isTerracotta ? '#D9633B' : '#FFFFFF',
                  }}
                >
                  {slide.ctaLabel || 'Find trusted vets near you'}
                </div>
              </div>

              <span
                className={`font-normal tracking-wide ${
                  isSquare ? 'text-[20px]' : 'text-[24px]'
                }`}
                style={{ color: mutedStyle }}
              >
                Follow {slide.handle} for more mindful pet care checklists
              </span>
            </div>
          )}
        </main>

        {/* Bottom Footer Row */}
        <footer
          className="flex items-center justify-between border-t pt-5"
          style={{ borderColor: borderStyle }}
        >
          {/* Brand Handle */}
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[20px] font-medium tracking-wider"
              style={{ color: textStyle }}
            >
              {slide.handle}
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            <span
              className="text-[18px] font-medium tracking-widest uppercase"
              style={{ color: mutedStyle }}
            >
              Slide {slide.index} of {totalSlides}
            </span>
          </div>

          {/* Swipe indicator with arrow: on every slide except the last */}
          <div className="min-w-[120px] flex justify-end">
            {!isLastSlide ? (
              <div
                className="flex items-center gap-2 text-[20px] font-medium"
                style={{ color: isTerracotta ? '#FFFBF3' : accentStyle }}
              >
                <span>Swipe</span>
                <ArrowRight size={22} strokeWidth={2} />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[18px]" style={{ color: mutedStyle }}>
                <span>End</span>
              </div>
            )}
          </div>
        </footer>
      </div>
    )
  },
)

SlideRenderer.displayName = 'SlideRenderer'
