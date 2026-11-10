import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from './Button'
import { RotateCcw, AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    try {
      localStorage.removeItem('carousel-studio-deck-v1')
      localStorage.removeItem('carousel-studio-schedule')
    } catch {
      // ignore
    }
    window.location.href = import.meta.env.BASE_URL || '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-text text-center">
          <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-8 shadow-xl space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="font-serif text-2xl font-semibold">Something went wrong</h1>
            <p className="text-xs text-muted leading-relaxed">
              An unexpected error occurred while rendering the studio. Resetting local cache will restore the initial working state.
            </p>
            {this.state.error && (
              <pre className="p-3 rounded-xl bg-card text-[11px] font-mono text-left text-muted overflow-x-auto max-h-28">
                {this.state.error.message}
              </pre>
            )}
            <Button onClick={this.handleReset} className="w-full">
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset Deck & Reload
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
