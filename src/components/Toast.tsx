import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type?: 'success' | 'warning' | 'info'
}

interface ToastProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-xl text-xs text-text"
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'warning' ? (
                <AlertCircle className="h-4 w-4 text-amber-500" />
              ) : toast.type === 'info' ? (
                <Info className="h-4 w-4 text-sky-500" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-accent" />
              )}
            </div>

            <div className="flex-1 space-y-0.5">
              <span className="font-serif font-semibold text-text text-sm">{toast.title}</span>
              {toast.description && (
                <p className="text-muted leading-relaxed">{toast.description}</p>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-muted hover:text-text p-1 -mr-1 -mt-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

