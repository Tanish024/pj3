import { useState, useEffect, useRef } from 'react'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  DollarSign,
  Sliders,
  CheckCircle2,
  FileCode2,
  Workflow,
  ArrowRight,
} from 'lucide-react'
import { WORKFLOW_STEPS, type WorkflowStepData } from '../data/workflowData'

export type { WorkflowStepData }

export default function WorkflowPage() {
  const [activeStepId, setActiveStepId] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const playTimerRef = useRef<NodeJS.Timeout | null>(null)

  const activeStep = WORKFLOW_STEPS.find((s) => s.id === activeStepId) || WORKFLOW_STEPS[0]

  // Play / Pause animation loop
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setActiveStepId((prev) => (prev < 10 ? prev + 1 : 1))
      }, 2000)
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current)
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current)
    }
  }, [isPlaying])

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setActiveStepId(1)
  }

  return (
    <div className="space-y-12 pb-20">
      {/* ============================================================== */}
      {/* HERO SECTION                                                   */}
      {/* ============================================================== */}
      <section className="space-y-4 pt-6 sm:pt-12">
        <div className="flex items-center gap-2">
          <Badge variant="accent">End-to-End Pipeline</Badge>
          <span className="text-xs text-muted font-mono">10 Automated Phases</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-[1.08] tracking-tight text-text max-w-4xl">
          Idea to ready carousel in under 15 minutes.
        </h1>

        <p className="max-w-3xl text-lg text-muted font-normal leading-relaxed">
          The exact, repeatable workflow used to transform raw founder thoughts into high-converting,
          Warm Editorial slide decks—from prompt capture to automated social analytics.
        </p>
      </section>

      {/* ============================================================== */}
      {/* BEFORE / AFTER COMPARISON SECTION                              */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2.5">
          <h2 className="font-serif text-xl font-semibold text-text">Workflow Comparison</h2>
          <span className="text-xs text-muted">Designer-Based vs. Automated Carousel Studio</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Legacy Workflow */}
          <Card className="space-y-4 border-border bg-card/60 p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-muted">The Legacy Way</span>
              <Badge variant="outline">Traditional Designer</Badge>
            </div>
            <h3 className="font-serif text-xl font-semibold text-text">Manual Agency / Freelancer</h3>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-text">Turnaround Time:</span>
                  <p className="text-muted mt-0.5">3 to 5 business days per carousel deck with multi-day Slack lag.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-text">Production Cost:</span>
                  <p className="text-muted mt-0.5">$150 – $350 per carousel ($1,200 to $2,800/month for 8 decks).</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sliders className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-text">Iteration & Control:</span>
                  <p className="text-muted mt-0.5">
                    Figma/Canva link ping-pong, typos caught post-export, inconsistent font weights and branding.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Carousel Studio Workflow */}
          <Card className="space-y-4 border-accent/40 bg-surface p-6 shadow-sm ring-1 ring-accent/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-medium">The New Way</span>
              <Badge variant="accent">Carousel Studio Pipeline</Badge>
            </div>
            <h3 className="font-serif text-xl font-semibold text-text">Automated Editorial Engine</h3>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-text">Turnaround Time:</span>
                  <p className="text-muted mt-0.5">Under 15 minutes from raw idea input to multi-platform queue.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-text">Production Cost:</span>
                  <p className="text-muted mt-0.5">~$0.08 in Claude API tokens per 8-slide deck (&lt;$1.00/month).</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sliders className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-text">Iteration & Control:</span>
                  <p className="text-muted mt-0.5">
                    Live React editor, native 1080p export, strict &lt;25 word rules, and 1-click multi-format outputs.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ============================================================== */}
      {/* INTERACTIVE WORKFLOW PIPELINE DIAGRAM                          */}
      {/* ============================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-accent" />
              <h2 className="font-serif text-xl font-semibold text-text">Interactive Pipeline Diagram</h2>
            </div>
            <p className="text-xs text-muted">
              Click any step to inspect technical details, tool choices, and time savings.
            </p>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2" role="group" aria-label="Pipeline simulation controls">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Pause pipeline animation' : 'Play pipeline animation'}
              className="text-xs"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> Pause Simulation
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> Play Pipeline
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs"
              aria-label="Reset pipeline to step 1"
              title="Reset to step 1"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
            </Button>
          </div>
        </div>

        {/* 2-Column Layout: Pipeline Track (Left) & Step Inspector (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 10 Connected Steps */}
          <div className="lg:col-span-7 space-y-3 relative">
            {/* SVG Connecting Track Line */}
            <div
              className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-border pointer-events-none hidden sm:block"
              aria-hidden="true"
            />

            {WORKFLOW_STEPS.map((step) => {
              const isActive = step.id === activeStepId
              const isPast = step.id < activeStepId
              const StepIcon = step.icon

              return (
                <div
                  key={step.id}
                  role="button"
                  tabIndex={0}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Step ${step.id}: ${step.title}. Tool: ${step.tool}. Time saved: ${step.timeSaved}`}
                  onClick={() => {
                    setIsPlaying(false)
                    setActiveStepId(step.id)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault()
                      setIsPlaying(false)
                      setActiveStepId(step.id)
                    }
                  }}
                  className={`group relative flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent select-none ${
                    isActive
                      ? 'border-accent bg-surface ring-2 ring-accent/20 shadow-md'
                      : isPast
                      ? 'border-border/80 bg-card/60 hover:border-accent/40'
                      : 'border-border/60 bg-surface/80 hover:border-accent/30'
                  }`}
                >
                  {/* Step Number Circle / Icon */}
                  <div
                    className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-mono font-semibold transition-colors duration-200 ${
                      isActive
                        ? 'bg-accent text-white shadow-sm'
                        : isPast
                        ? 'bg-accent/20 text-accent border border-accent/40'
                        : 'bg-card text-muted border border-border'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <StepIcon className={`h-4 w-4 ${isActive ? 'text-accent' : 'text-muted'}`} />
                        <h3 className="font-serif text-sm font-semibold text-text">{step.title}</h3>
                      </div>
                      <Badge variant={isActive ? 'accent' : 'outline'}>{step.toolCategory}</Badge>
                    </div>

                    <p className="text-xs text-muted leading-relaxed line-clamp-1">{step.subtitle}</p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-muted">
                      <span className="font-medium text-text">{step.tool}</span>
                      <span>·</span>
                      <span className="text-accent font-medium">Saved: {step.timeSaved}</span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`h-4 w-4 self-center transition-transform ${
                      isActive ? 'text-accent translate-x-1' : 'text-muted/40 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </div>
              )
            })}
          </div>

          {/* Right Column: Step Inspector Side Panel */}
          <div className="lg:col-span-5 sticky top-20 space-y-5">
            <Card className="p-6 space-y-5 border-accent/30 bg-surface shadow-md">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="accent">Step {String(activeStep.id).padStart(2, '0')}</Badge>
                    <span className="text-xs font-mono text-muted">{activeStep.toolCategory}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-text mt-1">{activeStep.title}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                  <Clock className="h-3.5 w-3.5" /> {activeStep.timeSaved}
                </div>
              </div>

              {/* What Happens */}
              <div className="space-y-2 text-xs">
                <span className="font-mono uppercase tracking-wider text-muted font-medium">Operational Process</span>
                <p className="text-text leading-relaxed font-normal">{activeStep.whatHappens}</p>
              </div>

              {/* Tool Badge */}
              <div className="rounded-xl border border-border bg-card p-3 flex items-center justify-between text-xs">
                <div>
                  <span className="text-muted block text-[11px]">Primary Software</span>
                  <span className="font-serif font-semibold text-text text-sm">{activeStep.tool}</span>
                </div>
                <Badge variant="outline">{activeStep.toolCategory}</Badge>
              </div>

              {/* Input Example */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-muted">
                  <FileCode2 className="h-3.5 w-3.5 text-accent" />
                  <span className="font-medium text-text">{activeStep.inputExample.label}</span>
                </div>
                <pre className="rounded-xl border border-border bg-background p-3 text-[11px] font-mono text-text overflow-x-auto leading-relaxed max-h-36">
                  {activeStep.inputExample.code}
                </pre>
              </div>

              {/* Output Example */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                  <span className="font-medium text-text">{activeStep.outputExample.label}</span>
                </div>
                <pre className="rounded-xl border border-border bg-background p-3 text-[11px] font-mono text-text overflow-x-auto leading-relaxed max-h-36">
                  {activeStep.outputExample.code}
                </pre>
              </div>

              {/* Key Benefit */}
              <div className="rounded-xl border border-accent/30 bg-accent/5 p-3 text-xs space-y-1">
                <span className="font-serif font-semibold text-accent">Strategic Impact:</span>
                <p className="text-muted leading-relaxed">{activeStep.keyBenefit}</p>
              </div>

              {/* Next Step Nav in Drawer */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={activeStep.id === 1}
                  onClick={() => setActiveStepId((prev) => Math.max(1, prev - 1))}
                  aria-label="Navigate to previous pipeline step"
                  className="text-xs"
                >
                  Previous Step
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={activeStep.id === 10}
                  onClick={() => setActiveStepId((prev) => Math.min(10, prev + 1))}
                  aria-label="Navigate to next pipeline step"
                  className="text-xs"
                >
                  Next Step <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
