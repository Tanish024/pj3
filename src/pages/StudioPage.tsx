import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { Input } from '../components/Input'
import { Textarea } from '../components/Textarea'
import { Select } from '../components/Select'
import { SlidePreview } from '../carousel/SlidePreview'
import { SlideRenderer } from '../carousel/SlideRenderer'
import { ReviewChecklist } from '../components/ReviewChecklist'
import { ScheduleModal, type ScheduleData } from '../components/ScheduleModal'
import { ToastContainer, type ToastMessage } from '../components/Toast'
import {
  sampleVetCarousel,
  sampleAIAnalysis,
  type CarouselSlideData,
  type AspectRatio,
  type SlideTheme,
  type SlideType,
} from '../data/carouselContent'
import {
  exportSingleSlideAsPng,
  exportAllSlidesAsZip,
  exportAllSlidesAsPdf,
  type ExportProgress,
} from '../lib/exportEngine'
import { generateCaptions } from '../lib/captionGenerator'
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Copy,
  Trash2,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Palette,
  FileText,
  Lightbulb,
  Sliders,
  Ratio,
  Plus,
  Download,
  Calendar,
  Undo2,
  Redo2,
  Share2,
  Check,
  FileArchive,
  Image as ImageIcon,
  Loader2,
  RotateCcw,
} from 'lucide-react'

type MobileTab = 'idea' | 'preview' | 'edit' | 'captions' | 'review'

const DECK_STORAGE_KEY = 'carousel-studio-deck-v1'

export default function StudioPage() {
  // Initialize Deck State from localStorage or sample fallback
  const getInitialDeck = (): { slides: CarouselSlideData[]; aspectRatio: AspectRatio } => {
    try {
      const stored = localStorage.getItem(DECK_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed.slides) && parsed.slides.length > 0) {
          return {
            slides: parsed.slides,
            aspectRatio: parsed.aspectRatio || '4:5',
          }
        }
      }
    } catch {
      // ignore
    }
    return {
      slides: sampleVetCarousel.slides,
      aspectRatio: '4:5',
    }
  }

  const initialData = useMemo(() => getInitialDeck(), [])
  const [slides, setSlides] = useState<CarouselSlideData[]>(initialData.slides)
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(initialData.aspectRatio)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastAutosaved, setLastAutosaved] = useState<string>('Just now')

  // History State for Undo / Redo
  const [history, setHistory] = useState<CarouselSlideData[][]>([initialData.slides])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Mobile Tabs
  const [mobileTab, setMobileTab] = useState<MobileTab>('preview')

  // Review & Approval State
  const [isReviewed, setIsReviewed] = useState(false)
  const [isReviewSkipped, setIsReviewSkipped] = useState(false)
  const isExportReady = isReviewed || isReviewSkipped

  // Export State & Progress
  const [exportOpen, setExportOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null)

  // Schedule Modal State
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [activeSchedule, setActiveSchedule] = useState<ScheduleData | null>(() => {
    try {
      const s = localStorage.getItem('carousel-studio-schedule')
      return s ? JSON.parse(s) : null
    } catch {
      return null
    }
  })

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const addToast = (title: string, description?: string, type: 'success' | 'warning' | 'info' = 'success') => {
    const id = `toast-${Date.now()}`
    setToasts((prev) => [...prev, { id, title, description, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }

  // Left Panel: Raw Idea & AI Generation State
  const [rawIdea, setRawIdea] = useState('Tips for choosing a good vet for my pet')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState<number | null>(null)

  // Captions state derived from current slides
  const generatedCaptions = useMemo(
    () => generateCaptions(slides, '5 Things to Check Before Choosing a Vet for Your Pet'),
    [slides],
  )
  const [customIgCaption, setCustomIgCaption] = useState<string | null>(null)
  const [customLinkedInPost, setCustomLinkedInPost] = useState<string | null>(null)
  const igCaption = customIgCaption ?? generatedCaptions.instagram
  const linkedInPost = customLinkedInPost ?? generatedCaptions.linkedin
  const [copiedCaption, setCopiedCaption] = useState<'ig' | 'li' | null>(null)

  // Collapsible cards state
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    research: true,
    structure: false,
    headlines: true,
    visual: false,
    captions: true,
  })

  const toggleCard = (key: string) => {
    setExpandedCards((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Autosave to localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(
          DECK_STORAGE_KEY,
          JSON.stringify({ slides, aspectRatio, updatedAt: new Date().toISOString() }),
        )
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        setLastAutosaved(`Saved at ${time}`)
      } catch {
        // ignore
      }
    }, 600)
    return () => clearTimeout(timeout)
  }, [slides, aspectRatio])

  // Helper to commit changes to history
  const commitSlides = (newSlides: CarouselSlideData[]) => {
    setSlides(newSlides)
    setHistory((prev) => {
      const sliced = prev.slice(0, historyIndex + 1)
      const next = [...sliced, newSlides]
      // Limit history to 30 snapshots
      if (next.length > 30) next.shift()
      return next
    })
    setHistoryIndex((prev) => Math.min(prev + 1, 29))
  }

  // Undo / Redo handlers
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1
      setHistoryIndex(targetIndex)
      setSlides(history[targetIndex])
      addToast('Undo', 'Reverted to previous edit snapshot', 'info')
    }
  }, [historyIndex, history])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1
      setHistoryIndex(targetIndex)
      setSlides(history[targetIndex])
      addToast('Redo', 'Restored next edit snapshot', 'info')
    }
  }, [historyIndex, history])

  // Global Keyboard listener for Undo, Redo, and Slide navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return
      }

      // Undo: Ctrl+Z or Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        handleUndo()
        return
      }

      // Redo: Ctrl+Y or Ctrl+Shift+Z or Cmd+Shift+Z
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'z' || e.key === 'Z'))
      ) {
        e.preventDefault()
        handleRedo()
        return
      }

      // Next / Previous navigation
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(0, prev - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleUndo, handleRedo, slides.length])

  // Generation sequence: 4 steps
  const generationSteps = [
    'Researching pet care protocols...',
    'Structuring 8-slide narrative outline...',
    'Writing high-contrast editorial copy...',
    'Designing sand & ink typographic layouts...',
  ]

  const handleGenerate = () => {
    setIsGenerating(true)
    setGenerationStep(0)

    const interval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev === null) return 0
        if (prev < generationSteps.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          setTimeout(() => {
            setIsGenerating(false)
            setGenerationStep(null)
            const fresh = sampleVetCarousel.slides.map((s, i) => ({
              ...s,
              index: i + 1,
            }))
            commitSlides(fresh)
            setCurrentIndex(0)
            addToast('Carousel Generated', 'Sample 8-slide vet checklist loaded into canvas')
          }, 350)
          return prev
        }
      })
    }, 450)
  }

  // Safe reference to active slide
  const currentSlide = slides[currentIndex] || slides[0]
  const totalSlides = slides.length

  // Word count calculation
  const getWordCount = (text: string) => {
    const trimmed = text.trim()
    return trimmed ? trimmed.split(/\s+/).length : 0
  }

  const headlineWords = getWordCount(currentSlide?.headline || '')
  const bodyWords = getWordCount(currentSlide?.body || '')
  const totalWords = headlineWords + bodyWords
  const isOverLimit = totalWords > 25

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev))
  }, [totalSlides])

  // Slide Modification Helpers
  const updateCurrentSlide = (updates: Partial<CarouselSlideData>) => {
    const next = slides.map((s, idx) => (idx === currentIndex ? { ...s, ...updates } : s))
    commitSlides(next)
  }

  // Move slide up
  const handleMoveUp = () => {
    if (currentIndex === 0) return
    const next = [...slides]
    const temp = next[currentIndex - 1]
    next[currentIndex - 1] = next[currentIndex]
    next[currentIndex] = temp
    const reindexed = next.map((s, idx) => ({ ...s, index: idx + 1 }))
    commitSlides(reindexed)
    setCurrentIndex((prev) => prev - 1)
  }

  // Move slide down
  const handleMoveDown = () => {
    if (currentIndex === totalSlides - 1) return
    const next = [...slides]
    const temp = next[currentIndex + 1]
    next[currentIndex + 1] = next[currentIndex]
    next[currentIndex] = temp
    const reindexed = next.map((s, idx) => ({ ...s, index: idx + 1 }))
    commitSlides(reindexed)
    setCurrentIndex((prev) => prev + 1)
  }

  // Duplicate slide
  const handleDuplicate = () => {
    const clone: CarouselSlideData = {
      ...currentSlide,
      id: `slide-${Date.now()}`,
      headline: `${currentSlide.headline} (Copy)`,
    }
    const next = [...slides]
    next.splice(currentIndex + 1, 0, clone)
    const reindexed = next.map((s, idx) => ({ ...s, index: idx + 1 }))
    commitSlides(reindexed)
    setCurrentIndex((prev) => prev + 1)
    addToast('Slide Duplicated', `Created copy at position 0${currentIndex + 2}`)
  }

  // Delete slide
  const handleDelete = () => {
    if (slides.length <= 1) return
    const next = slides.filter((_, idx) => idx !== currentIndex)
    const reindexed = next.map((s, idx) => ({ ...s, index: idx + 1 }))
    commitSlides(reindexed)
    setCurrentIndex((prev) => Math.min(prev, next.length - 1))
    addToast('Slide Deleted', 'Removed slide from deck', 'info')
  }

  // Add new blank slide
  const handleAddSlide = () => {
    const newSlide: CarouselSlideData = {
      id: `slide-${Date.now()}`,
      index: slides.length + 1,
      type: 'tip',
      theme: slides[slides.length - 1]?.theme === 'sand' ? 'ink' : 'sand',
      tipNumber: String(slides.length + 1).padStart(2, '0'),
      headline: 'New Checklist Item',
      body: 'Add concise guidance here. Keep it under 25 words for clear editorial rhythm.',
      iconName: 'Sparkles',
      handle: '@yourbrand',
    }
    const next = [...slides, newSlide]
    commitSlides(next)
    setCurrentIndex(slides.length)
    addToast('Slide Added', `New slide created at position 0${next.length}`)
  }

  // Reset to sample deck
  const handleResetSample = () => {
    const fresh = sampleVetCarousel.slides.map((s, i) => ({ ...s, index: i + 1 }))
    commitSlides(fresh)
    setCurrentIndex(0)
    addToast('Deck Reset', 'Restored initial sample carousel')
  }

  // ==========================================
  // EXPORT HANDLERS
  // ==========================================
  const getOffscreenSlideEl = (index: number) => {
    return document.getElementById(`export-slide-${index}`)
  }

  // Download Current Slide as PNG
  const handleExportCurrentPng = async () => {
    setExportOpen(false)
    setIsExporting(true)
    setExportProgress({
      current: 1,
      total: 1,
      stage: `Rendering slide 0${currentIndex + 1} at 1080 resolution...`,
      percentage: 50,
    })

    try {
      const el = getOffscreenSlideEl(currentIndex)
      if (!el) throw new Error('Offscreen slide canvas not found')

      await exportSingleSlideAsPng(
        el,
        `carousel-slide-0${currentIndex + 1}.png`,
        1, // native 1080p
      )
      addToast('Slide Downloaded', `Saved slide 0${currentIndex + 1} as 1080p PNG`)
    } catch (err) {
      console.error(err)
      addToast('Export Failed', 'An error occurred during PNG export', 'warning')
    } finally {
      setIsExporting(false)
      setExportProgress(null)
    }
  }

  // Download All Slides as ZIP
  const handleExportAllZip = async () => {
    setExportOpen(false)
    setIsExporting(true)

    try {
      await exportAllSlidesAsZip(
        getOffscreenSlideEl,
        slides.length,
        (p) => setExportProgress(p),
        'carousel-studio-slides.zip',
        1,
      )
      addToast('ZIP Downloaded', `Successfully packaged all ${slides.length} slides into ZIP`)
    } catch (err) {
      console.error(err)
      addToast('Export Failed', 'An error occurred during ZIP creation', 'warning')
    } finally {
      setIsExporting(false)
      setExportProgress(null)
    }
  }

  // Download as PDF (LinkedIn Document)
  const handleExportPdf = async () => {
    setExportOpen(false)
    setIsExporting(true)

    try {
      await exportAllSlidesAsPdf(
        getOffscreenSlideEl,
        slides.length,
        aspectRatio,
        (p) => setExportProgress(p),
        'carousel-studio-linkedin-document.pdf',
      )
      addToast('PDF Downloaded', 'Generated LinkedIn document carousel PDF')
    } catch (err) {
      console.error(err)
      addToast('Export Failed', 'An error occurred during PDF generation', 'warning')
    } finally {
      setIsExporting(false)
      setExportProgress(null)
    }
  }

  // Copy helper
  const handleCopyText = (text: string, type: 'ig' | 'li') => {
    navigator.clipboard.writeText(text)
    setCopiedCaption(type)
    addToast('Caption Copied', `${type === 'ig' ? 'Instagram' : 'LinkedIn'} text copied to clipboard`)
    setTimeout(() => setCopiedCaption(null), 2500)
  }

  // Click outside listener for export dropdown
  const exportDropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(e.target as Node)) {
        setExportOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="space-y-6 pb-20">
      {/* ============================================================== */}
      {/* HIDDEN OFFSCREEN RENDER CONTAINER (Native 1080p Canvas)        */}
      {/* ============================================================== */}
      <div
        id="offscreen-export-container"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          pointerEvents: 'none',
          opacity: 0,
        }}
        aria-hidden="true"
      >
        {slides.map((s, idx) => (
          <div key={s.id} id={`export-slide-${idx}`}>
            <SlideRenderer
              slide={s}
              totalSlides={slides.length}
              aspectRatio={aspectRatio}
            />
          </div>
        ))}
      </div>

      {/* ============================================================== */}
      {/* TOP STUDIO TOOLBAR & ACTIONS                                   */}
      {/* ============================================================== */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        {/* Title & Autosave status */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-text">
              Carousel Studio
            </h1>
            <Badge variant="accent">Warm Editorial</Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1 text-accent font-medium">
              <Check className="h-3.5 w-3.5" /> {lastAutosaved}
            </span>
            <span>·</span>
            <span>{aspectRatio === '4:5' ? '1080 × 1350' : '1080 × 1080'}</span>
            <span>·</span>
            <span>{slides.length} Slides</span>
          </div>
        </div>

        {/* Action Controls: Undo/Redo, Aspect, Review, Schedule, Export */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Undo / Redo */}
          <div className="inline-flex rounded-xl border border-border p-1 bg-surface" role="group" aria-label="History actions">
            <button
              onClick={handleUndo}
              disabled={historyIndex === 0}
              className="p-1.5 rounded-lg text-muted hover:text-text disabled:opacity-40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Undo edit (Ctrl+Z)"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 rounded-lg text-muted hover:text-text disabled:opacity-40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Redo edit (Ctrl+Y)"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="inline-flex rounded-xl border border-border p-1 bg-surface" role="group" aria-label="Aspect ratio selection">
            <button
              onClick={() => setAspectRatio('4:5')}
              aria-pressed={aspectRatio === '4:5'}
              aria-label="Set 4:5 portrait format (1080 by 1350)"
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent ${
                aspectRatio === '4:5'
                  ? 'bg-accent text-white dark:text-[#151412] font-semibold shadow-xs'
                  : 'text-muted hover:text-text'
              }`}
            >
              <Ratio className="h-3.5 w-3.5" aria-hidden="true" /> 4:5
            </button>
            <button
              onClick={() => setAspectRatio('1:1')}
              aria-pressed={aspectRatio === '1:1'}
              aria-label="Set 1:1 square format (1080 by 1080)"
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent ${
                aspectRatio === '1:1'
                  ? 'bg-accent text-white dark:text-[#151412] font-semibold shadow-xs'
                  : 'text-muted hover:text-text'
              }`}
            >
              <Ratio className="h-3.5 w-3.5" aria-hidden="true" /> 1:1
            </button>
          </div>

          {/* Schedule Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setScheduleModalOpen(true)}
            aria-label="Open publication scheduling modal"
            className="text-xs"
          >
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {activeSchedule ? 'Scheduled' : 'Schedule'}
          </Button>

          {/* Export Dropdown Menu */}
          <div className="relative" ref={exportDropdownRef}>
            <Button
              size="sm"
              disabled={!isExportReady || isExporting}
              onClick={() => setExportOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={exportOpen}
              aria-label="Export carousel options menu"
              className="text-xs shadow-xs"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Exporting...
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" aria-hidden="true" /> Export
                  <ChevronDown className="h-3 w-3 -mr-1" aria-hidden="true" />
                </>
              )}
            </Button>

            {/* Dropdown Menu Items */}
            {exportOpen && isExportReady && (
              <div
                role="menu"
                aria-label="Export formats"
                className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-border bg-surface p-2 shadow-xl z-50 space-y-1"
              >
                <button
                  role="menuitem"
                  onClick={handleExportCurrentPng}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-card text-left text-xs font-medium text-text transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <ImageIcon className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-text font-semibold">Current Slide (PNG)</p>
                    <span className="text-[11px] text-muted">Slide 0{currentIndex + 1} at 1080 resolution</span>
                  </div>
                </button>

                <button
                  role="menuitem"
                  onClick={handleExportAllZip}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-card text-left text-xs font-medium text-text transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <FileArchive className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-text font-semibold">All Slides (ZIP of PNGs)</p>
                    <span className="text-[11px] text-muted">All {slides.length} slides packaged</span>
                  </div>
                </button>

                <button
                  role="menuitem"
                  onClick={handleExportPdf}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-card text-left text-xs font-medium text-text transition-colors cursor-pointer border-t border-border/60 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <FileText className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-text font-semibold">LinkedIn Carousel (PDF)</p>
                    <span className="text-[11px] text-muted">Multi-page document carousel</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Review Checklist Notice / Banner if not completed */}
      {!isExportReady && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200 text-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <span>
              Pre-export quality review pending. Complete the checklist below to enable export, or click skip.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsReviewSkipped(true)}
              className="text-xs font-medium underline hover:text-amber-950 dark:hover:text-white cursor-pointer"
            >
              Skip Review
            </button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setMobileTab('review')}
              className="text-xs h-7 px-2.5 bg-surface text-text"
            >
              Open Checklist
            </Button>
          </div>
        </div>
      )}

      {/* Exporting Progress Banner */}
      {isExporting && exportProgress && (
        <div className="rounded-2xl border border-accent/40 bg-card p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-accent">
            <span>{exportProgress.stage}</span>
            <span>{exportProgress.percentage}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-200"
              style={{ width: `${exportProgress.percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Mobile Tab Navigation */}
      <div className="flex lg:hidden border-b border-border overflow-x-auto" role="tablist" aria-label="Mobile workspace sections">
        {(['preview', 'idea', 'edit', 'captions', 'review'] as MobileTab[]).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={mobileTab === tab}
            onClick={() => setMobileTab(tab)}
            className={`flex-1 min-w-[70px] py-2.5 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer border-b-2 -mb-px text-center focus-visible:outline-2 focus-visible:outline-accent ${
              mobileTab === tab
                ? 'border-accent text-accent font-semibold'
                : 'border-transparent text-muted hover:text-text'
            }`}
          >
            {tab === 'preview' && `Preview (${currentIndex + 1}/${totalSlides})`}
            {tab === 'idea' && 'Idea & AI'}
            {tab === 'edit' && 'Editor'}
            {tab === 'captions' && 'Captions'}
            {tab === 'review' && 'Review'}
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* 3-PANEL MAIN WORKSPACE                                         */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================== */}
        {/* LEFT PANEL: Idea Input, AI Structure & Captions                */}
        {/* ============================================================== */}
        <aside
          className={`space-y-5 lg:col-span-3 ${
            mobileTab !== 'idea' && mobileTab !== 'captions' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Idea Input Card */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-accent" />
                <h2 className="font-serif text-base font-semibold text-text">Your Raw Idea</h2>
              </div>
              <Badge variant="outline">Prompt</Badge>
            </div>

            <Textarea
              label="Carousel Topic"
              rows={3}
              value={rawIdea}
              onChange={(e) => setRawIdea(e.target.value)}
              placeholder="Enter your carousel idea..."
              className="text-xs"
            />

            <Button
              className="w-full"
              size="md"
              disabled={isGenerating}
              onClick={handleGenerate}
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? 'Structuring...' : 'Generate Carousel'}
            </Button>

            {/* Animated 4-step generation status */}
            {isGenerating && generationStep !== null && (
              <div className="rounded-xl border border-accent/40 bg-accent/10 p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-accent">
                  <span>Step {generationStep + 1} of 4</span>
                  <span>{Math.round(((generationStep + 1) / 4) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${((generationStep + 1) / 4) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-text font-serif italic">
                  {generationSteps[generationStep]}
                </p>
              </div>
            )}
          </Card>

          {/* Social Captions Accordion */}
          <Card className="p-4 space-y-3">
            <button
              onClick={() => toggleCard('captions')}
              className="flex w-full items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-accent" />
                <h3 className="font-serif text-sm font-semibold text-text">Publish Captions</h3>
              </div>
              {expandedCards.captions ? (
                <ChevronUp className="h-4 w-4 text-muted" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted" />
              )}
            </button>

            {expandedCards.captions && (
              <div className="space-y-4 pt-2 border-t border-border text-xs">
                {/* Instagram Caption */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text">Instagram Caption</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyText(igCaption, 'ig')}
                      className="h-7 px-2 text-[11px]"
                    >
                      {copiedCaption === 'ig' ? (
                        <>
                          <Check className="h-3 w-3 text-accent" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    rows={4}
                    value={igCaption}
                    onChange={(e) => setCustomIgCaption(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>

                {/* LinkedIn Post */}
                <div className="space-y-2 pt-2 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text">LinkedIn Post (Doc Carousel)</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyText(linkedInPost, 'li')}
                      className="h-7 px-2 text-[11px]"
                    >
                      {copiedCaption === 'li' ? (
                        <>
                          <Check className="h-3 w-3 text-accent" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    rows={4}
                    value={linkedInPost}
                    onChange={(e) => setCustomLinkedInPost(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Collapsible Card 1: Research Points */}
          <Card className="p-4 space-y-3">
            <button
              onClick={() => toggleCard('research')}
              className="flex w-full items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-accent" />
                <h3 className="font-serif text-sm font-semibold text-text">Research Findings</h3>
              </div>
              {expandedCards.research ? (
                <ChevronUp className="h-4 w-4 text-muted" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted" />
              )}
            </button>

            {expandedCards.research && (
              <ul className="space-y-2 pt-2 border-t border-border text-xs text-muted leading-relaxed">
                {sampleAIAnalysis.researchPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Collapsible Card 2: Structure Outline */}
          <Card className="p-4 space-y-3">
            <button
              onClick={() => toggleCard('structure')}
              className="flex w-full items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-accent" />
                <h3 className="font-serif text-sm font-semibold text-text">Structure Outline</h3>
              </div>
              {expandedCards.structure ? (
                <ChevronUp className="h-4 w-4 text-muted" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted" />
              )}
            </button>

            {expandedCards.structure && (
              <div className="space-y-2 pt-2 border-t border-border text-xs">
                {sampleAIAnalysis.structureOutline.map((item, i) => (
                  <div key={i} className="rounded-lg bg-surface p-2 border border-border/60">
                    <span className="font-mono font-medium text-accent">{item.step}</span>
                    <p className="text-muted mt-0.5">{item.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Collapsible Card 3: 3 Headline Angles */}
          <Card className="p-4 space-y-3">
            <button
              onClick={() => toggleCard('headlines')}
              className="flex w-full items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <h3 className="font-serif text-sm font-semibold text-text">3 Headline Angles</h3>
              </div>
              {expandedCards.headlines ? (
                <ChevronUp className="h-4 w-4 text-muted" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted" />
              )}
            </button>

            {expandedCards.headlines && (
              <div className="space-y-2 pt-2 border-t border-border text-xs">
                {sampleAIAnalysis.headlineOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (slides[0]) {
                        const next = slides.map((s, idx) =>
                          idx === 0 ? { ...s, headline: opt.title } : s,
                        )
                        commitSlides(next)
                        setCurrentIndex(0)
                        addToast('Headline Updated', `Applied angle to Hook slide`)
                      }
                    }}
                    className="w-full text-left rounded-lg bg-surface p-2.5 border border-border/80 hover:border-accent/60 transition-colors cursor-pointer group"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-muted group-hover:text-accent">
                      {opt.tone}
                    </span>
                    <p className="font-serif text-xs font-semibold text-text mt-0.5 line-clamp-2">
                      &quot;{opt.title}&quot;
                    </p>
                    <span className="text-[10px] text-accent underline mt-1 inline-block">
                      Apply to Hook Slide →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Collapsible Card 4: Visual Direction */}
          <Card className="p-4 space-y-3">
            <button
              onClick={() => toggleCard('visual')}
              className="flex w-full items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-accent" />
                <h3 className="font-serif text-sm font-semibold text-text">Visual Direction</h3>
              </div>
              {expandedCards.visual ? (
                <ChevronUp className="h-4 w-4 text-muted" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted" />
              )}
            </button>

            {expandedCards.visual && (
              <div className="space-y-2 pt-2 border-t border-border text-xs text-muted">
                <div>
                  <span className="font-medium text-text">Palette:</span>
                  <p className="mt-0.5">{sampleAIAnalysis.visualDirection.palette}</p>
                </div>
                <div>
                  <span className="font-medium text-text">Fonts:</span>
                  <p className="mt-0.5">{sampleAIAnalysis.visualDirection.fonts}</p>
                </div>
                <div>
                  <span className="font-medium text-text">Rhythm:</span>
                  <p className="mt-0.5">{sampleAIAnalysis.visualDirection.layoutNotes}</p>
                </div>
              </div>
            )}
          </Card>
        </aside>

        {/* ============================================================== */}
        {/* CENTER PANEL: Large Slide Preview & Navigation Strip           */}
        {/* ============================================================== */}
        <main
          className={`space-y-6 lg:col-span-6 flex flex-col items-center ${
            mobileTab !== 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Main Slide Stage */}
          <div className="w-full max-w-[480px] xl:max-w-[500px] flex flex-col items-center space-y-4">
            <div className="w-full shadow-2xl rounded-2xl overflow-hidden bg-card border border-border/70">
              <SlidePreview
                slide={currentSlide}
                totalSlides={totalSlides}
                aspectRatio={aspectRatio}
                borderless={true}
              />
            </div>

            {/* Stage Controls: Next / Prev / Counter */}
            <div className="flex items-center justify-between w-full px-2" role="group" aria-label="Slide controls">
              <Button
                variant="secondary"
                size="sm"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Previous
              </Button>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-text" aria-live="polite">
                  {currentIndex + 1} / {totalSlides}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-mono font-medium ${
                    currentSlide.theme === 'ink'
                      ? 'bg-[#1C1B19] text-[#F1EBDF] border border-[#34302A]'
                      : currentSlide.theme === 'terracotta'
                      ? 'bg-[#C04E27] text-white border border-[#A73F1C]'
                      : 'bg-[#F6F1E7] text-[#1C1B19] border border-[#DDD2BF]'
                  }`}
                >
                  {currentSlide.theme}
                </span>
              </div>

              <Button
                size="sm"
                onClick={handleNext}
                disabled={currentIndex === totalSlides - 1}
                aria-label="Next slide"
              >
                Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Thumbnail Strip Below Stage */}
          <div className="w-full space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                Deck Slides ({totalSlides})
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetSample}
                  className="inline-flex items-center gap-1 text-xs text-muted hover:text-text cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
                  title="Reset to original 8-slide vet sample"
                  aria-label="Reset to original 8-slide sample carousel"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" /> Reset Sample
                </button>
                <button
                  onClick={handleAddSlide}
                  className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-hover cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
                  aria-label="Add new slide"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add Slide
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 w-full" role="tablist" aria-label="Slide thumbnail strip">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={currentIndex === idx}
                  aria-label={`Select slide 0${s.index}: ${s.headline}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`group relative text-left rounded-xl overflow-hidden border p-1 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent ${
                    currentIndex === idx
                      ? 'border-accent ring-2 ring-accent/30 bg-card shadow-sm'
                      : 'border-border hover:border-accent/50 bg-surface'
                  }`}
                >
                  <div className="rounded-lg overflow-hidden bg-background">
                    <SlidePreview
                      slide={s}
                      totalSlides={totalSlides}
                      aspectRatio={aspectRatio}
                      autoScale={true}
                      borderless={true}
                    />
                  </div>
                  <div className="mt-1 px-1 flex items-center justify-between text-[10px] font-mono text-muted">
                    <span>0{s.index}</span>
                    <span className="capitalize">{s.type[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* ============================================================== */}
        {/* RIGHT PANEL: Live Slide Editor & Review Checklist              */}
        {/* ============================================================== */}
        <aside
          className={`space-y-5 lg:col-span-3 ${
            mobileTab !== 'edit' && mobileTab !== 'review' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Review Checklist Component */}
          <ReviewChecklist
            slides={slides}
            isReviewed={isReviewed}
            isSkipped={isReviewSkipped}
            onToggleReview={(val) => {
              setIsReviewed(val)
              if (val) addToast('Review Completed', 'All 6 quality standards passed. Export unlocked!')
            }}
            onSkipReview={() => {
              setIsReviewSkipped(true)
              addToast('Review Skipped', 'Export unlocked directly', 'info')
            }}
          />

          {/* Slide Editor Card */}
          <Card className="space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-accent" />
                <h2 className="font-serif text-base font-semibold text-text">Slide Editor</h2>
              </div>
              <Badge variant="accent">Slide 0{currentSlide.index}</Badge>
            </div>

            {/* Background Theme Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-text">Slide Canvas Theme</label>
              <div className="grid grid-cols-3 gap-2">
                {(['sand', 'ink', 'terracotta'] as SlideTheme[]).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => updateCurrentSlide({ theme })}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-medium capitalize transition-all cursor-pointer ${
                      currentSlide.theme === theme
                        ? 'border-accent ring-2 ring-accent/30 shadow-sm font-semibold'
                        : 'border-border hover:border-accent/40'
                    }`}
                    style={{
                      backgroundColor:
                        theme === 'sand'
                          ? '#F6F1E7'
                          : theme === 'ink'
                          ? '#1C1B19'
                          : '#D9633B',
                      color: theme === 'sand' ? '#1C1B19' : '#FFFBF3',
                    }}
                  >
                    <span>{theme}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slide Type Selector */}
            <div className="space-y-1.5">
              <Select
                label="Slide Role / Layout Type"
                value={currentSlide.type}
                onChange={(e) => updateCurrentSlide({ type: e.target.value as SlideType })}
                options={[
                  { value: 'hook', label: 'Hook Cover' },
                  { value: 'problem', label: 'Problem Statement' },
                  { value: 'tip', label: 'Checklist Tip' },
                  { value: 'cta', label: 'Call to Action (CTA)' },
                ]}
              />
            </div>

            {/* Headline Input */}
            <div className="space-y-1.5">
              <Input
                label="Headline"
                value={currentSlide.headline}
                onChange={(e) => updateCurrentSlide({ headline: e.target.value })}
                placeholder="Enter slide headline..."
              />
            </div>

            {/* Body Copy Textarea */}
            <div className="space-y-1.5">
              <Textarea
                label="Body Copy"
                rows={4}
                value={currentSlide.body}
                onChange={(e) => updateCurrentSlide({ body: e.target.value })}
                placeholder="Enter slide body text..."
              />
            </div>

            {/* Word Count Indicator & Warning */}
            <div
              role="status"
              aria-live="polite"
              className={`rounded-xl p-3 border text-xs space-y-1 ${
                isOverLimit
                  ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
                  : 'bg-surface border-border text-muted'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Word Count</span>
                <span className="font-mono font-semibold">
                  {totalWords} / 25 words
                </span>
              </div>
              {isOverLimit ? (
                <p className="flex items-start gap-1.5 pt-1 text-[11px] leading-tight font-medium">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Warning: Exceeds 25 words limit. Warm Editorial guidelines recommend brevity for optimal pacing.
                  </span>
                </p>
              ) : (
                <p className="flex items-center gap-1.5 pt-1 text-[11px] text-accent">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Optimal editorial density ({25 - totalWords} words remaining).</span>
                </p>
              )}
            </div>

            {/* Reorder, Duplicate, Delete Actions */}
            <div className="space-y-2 pt-2 border-t border-border">
              <span className="text-xs font-medium text-text">Slide Management</span>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleMoveUp}
                  disabled={currentIndex === 0}
                  aria-label="Move current slide earlier in order"
                  className="w-full text-xs"
                >
                  <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /> Move Up
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleMoveDown}
                  disabled={currentIndex === totalSlides - 1}
                  aria-label="Move current slide later in order"
                  className="w-full text-xs"
                >
                  <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" /> Move Down
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDuplicate}
                  aria-label="Duplicate current slide"
                  className="w-full text-xs"
                >
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" /> Duplicate
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  disabled={slides.length <= 1}
                  aria-label="Delete current slide"
                  className="w-full text-xs text-red-600 dark:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Delete
                </Button>
              </div>
            </div>
          </Card>
        </aside>
      </div>

      {/* ============================================================== */}
      {/* SCHEDULE MODAL (Buffer / Metricool helper)                     */}
      {/* ============================================================== */}
      <ScheduleModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        deckTitle="5 Things to Check Before Choosing a Vet for Your Pet"
        onScheduleSaved={(sched) => {
          setActiveSchedule(sched)
          if (sched) {
            addToast('Campaign Scheduled', `Set for ${sched.date} at ${sched.time} via ${sched.platform}`)
          } else {
            addToast('Schedule Cleared', 'Scheduled time removed', 'info')
          }
        }}
      />

      {/* ============================================================== */}
      {/* FLOATING TOAST NOTIFICATIONS CONTAINER                         */}
      {/* ============================================================== */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  )
}
