import { Check } from 'lucide-react'
import { cn } from '../lib/cn'

interface Step {
  id: string
  label: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {steps.map((step, i) => {
        const isCompleted = i < currentStep
        const isCurrent = i === currentStep

        return (
          <div key={step.id} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={cn(
                  'h-px w-8 sm:w-12 transition-colors duration-200',
                  isCompleted ? 'bg-accent' : 'bg-border',
                )}
              />
            )}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors duration-200',
                  isCompleted && 'bg-accent text-white',
                  isCurrent && 'border-2 border-accent text-accent',
                  !isCompleted && !isCurrent && 'border border-border text-muted',
                )}
              >
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={cn(
                  'hidden text-sm sm:inline',
                  isCurrent ? 'font-medium text-text' : 'text-muted',
                )}
              >
                {step.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
