import { useRef, useState, useEffect, type Ref } from 'react'
import type { CarouselSlideData, AspectRatio } from '../data/carouselContent'
import { SlideRenderer } from './SlideRenderer'

interface SlidePreviewProps {
  slide: CarouselSlideData
  totalSlides?: number
  aspectRatio?: AspectRatio
  scale?: number
  className?: string
  innerRef?: Ref<HTMLDivElement>
  autoScale?: boolean
  borderless?: boolean
}

const CANVAS_WIDTH = 1080

export function SlidePreview({
  slide,
  totalSlides = 8,
  aspectRatio = '4:5',
  scale: fixedScale,
  className = '',
  innerRef,
  autoScale = true,
  borderless = false,
}: SlidePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dynamicScale, setDynamicScale] = useState<number>(fixedScale || 0.35)

  const canvasHeight = aspectRatio === '1:1' ? 1080 : 1350

  useEffect(() => {
    if (fixedScale || !autoScale || !containerRef.current) return

    const updateScale = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.clientWidth
      if (containerWidth > 0) {
        const calculated = containerWidth / CANVAS_WIDTH
        setDynamicScale(calculated)
      }
    }

    updateScale()

    const observer = new ResizeObserver(() => {
      updateScale()
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [fixedScale, autoScale])

  const effectiveScale = fixedScale || dynamicScale

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl transition-all duration-200 ${
        borderless ? '' : 'shadow-sm border border-border/80'
      } ${className}`}
      style={{
        width: '100%',
        maxWidth: fixedScale ? `${CANVAS_WIDTH * fixedScale}px` : undefined,
        height: `${canvasHeight * effectiveScale}px`,
      }}
    >
      <div
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${canvasHeight}px`,
          transform: `scale(${effectiveScale})`,
          transformOrigin: 'top left',
          pointerEvents: 'auto',
        }}
      >
        <SlideRenderer
          ref={innerRef}
          slide={slide}
          totalSlides={totalSlides}
          aspectRatio={aspectRatio}
        />
      </div>
    </div>
  )
}
