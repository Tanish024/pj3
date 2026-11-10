import * as htmlToImage from 'html-to-image'
import { jsPDF } from 'jspdf'
import JSZip from 'jszip'
import type { AspectRatio } from '../data/carouselContent'

export interface ExportProgress {
  current: number
  total: number
  stage: string
  percentage: number
}

// Helper to trigger browser file download
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Download single slide as PNG at full resolution
export async function exportSingleSlideAsPng(
  slideElement: HTMLElement,
  filename: string = 'carousel-slide.png',
  pixelRatio: number = 1,
): Promise<void> {
  // Ensure web fonts are rendered
  if (document.fonts) {
    await document.fonts.ready
  }

  const dataUrl = await htmlToImage.toPng(slideElement, {
    pixelRatio,
    cacheBust: true,
    quality: 0.98,
    skipFonts: false,
  })

  // Convert dataUrl to blob and download
  const res = await fetch(dataUrl)
  const blob = await res.blob()
  downloadBlob(blob, filename)
}

// Export all slides as a ZIP archive of PNGs
export async function exportAllSlidesAsZip(
  getSlideElement: (index: number) => HTMLElement | null,
  totalSlides: number,
  onProgress?: (progress: ExportProgress) => void,
  zipFilename: string = 'carousel-slides.zip',
  pixelRatio: number = 1,
): Promise<void> {
  if (document.fonts) {
    await document.fonts.ready
  }

  const zip = new JSZip()
  const folder = zip.folder('carousel-slides') || zip

  for (let i = 0; i < totalSlides; i++) {
    const el = getSlideElement(i)
    if (!el) continue

    if (onProgress) {
      onProgress({
        current: i + 1,
        total: totalSlides,
        stage: `Rendering slide ${i + 1} of ${totalSlides}...`,
        percentage: Math.round(((i + 0.5) / totalSlides) * 90),
      })
    }

    const dataUrl = await htmlToImage.toPng(el, {
      pixelRatio,
      cacheBust: true,
      quality: 0.98,
      skipFonts: false,
    })

    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '')
    const slideNumber = String(i + 1).padStart(2, '0')
    folder.file(`slide-${slideNumber}.png`, base64Data, { base64: true })
  }

  if (onProgress) {
    onProgress({
      current: totalSlides,
      total: totalSlides,
      stage: 'Compressing ZIP archive...',
      percentage: 95,
    })
  }

  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })

  downloadBlob(zipBlob, zipFilename)
}

// Export all slides as a multi-page PDF (LinkedIn Carousel Document)
export async function exportAllSlidesAsPdf(
  getSlideElement: (index: number) => HTMLElement | null,
  totalSlides: number,
  aspectRatio: AspectRatio,
  onProgress?: (progress: ExportProgress) => void,
  pdfFilename: string = 'carousel-deck.pdf',
): Promise<void> {
  if (document.fonts) {
    await document.fonts.ready
  }

  const canvasWidth = 1080
  const canvasHeight = aspectRatio === '1:1' ? 1080 : 1350

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvasWidth, canvasHeight],
    hotfixes: ['px_scaling'],
  })

  for (let i = 0; i < totalSlides; i++) {
    const el = getSlideElement(i)
    if (!el) continue

    if (onProgress) {
      onProgress({
        current: i + 1,
        total: totalSlides,
        stage: `Capturing slide ${i + 1} of ${totalSlides} for PDF...`,
        percentage: Math.round(((i + 0.8) / totalSlides) * 90),
      })
    }

    const dataUrl = await htmlToImage.toPng(el, {
      pixelRatio: 1,
      cacheBust: true,
      quality: 0.98,
      skipFonts: false,
    })

    if (i > 0) {
      doc.addPage([canvasWidth, canvasHeight], 'portrait')
    }

    doc.addImage(dataUrl, 'PNG', 0, 0, canvasWidth, canvasHeight, undefined, 'FAST')
  }

  if (onProgress) {
    onProgress({
      current: totalSlides,
      total: totalSlides,
      stage: 'Generating LinkedIn PDF Document...',
      percentage: 98,
    })
  }

  doc.save(pdfFilename)
}

