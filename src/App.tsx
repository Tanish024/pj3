import { lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { Navbar } from './components/Navbar'
import { Container } from './components/Container'
import { Layers } from 'lucide-react'

// Lazy loaded routes for optimal bundle code-splitting
const StudioPage = lazy(() => import('./pages/StudioPage'))
const WorkflowPage = lazy(() => import('./pages/WorkflowPage'))
const StackPage = lazy(() => import('./pages/StackPage'))

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <span className="font-serif text-xs text-muted">Loading studio...</span>
      </div>
    </div>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="flex min-h-dvh flex-col bg-background text-text selection:bg-accent/20 selection:text-accent">
      <Navbar theme={theme} onToggleTheme={toggle} />

      <main className="flex-1 pt-4 sm:pt-6 pb-16">
        <Container>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<StudioPage />} />
              <Route path="/workflow" element={<WorkflowPage />} />
              <Route path="/stack" element={<StackPage />} />
            </Routes>
          </Suspense>
        </Container>
      </main>

      {/* Warm Editorial Footer */}
      <footer className="border-t border-border bg-surface/50 py-8 text-xs text-muted">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-accent" />
            <span className="font-serif font-semibold text-text">Carousel Studio</span>
            <span className="hidden sm:inline">·</span>
            <span>Warm Editorial Design System</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <Link to="/" className="hover:text-text transition-colors">
              Studio
            </Link>
            <Link to="/workflow" className="hover:text-text transition-colors">
              Workflow
            </Link>
            <Link to="/stack" className="hover:text-text transition-colors">
              Stack
            </Link>
          </div>

          <p className="text-[11px] font-mono text-muted/80">
            Prototype built for assignment purposes
          </p>
        </Container>
      </footer>
    </div>
  )
}
