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
  Database,
  Webhook,
  Bot,
  Palette,
  Layout,
  Eye,
  Download,
  Share2,
  BarChart3,
} from 'lucide-react'

export interface WorkflowStepData {
  id: number
  title: string
  subtitle: string
  tool: string
  toolCategory: string
  icon: typeof Database
  timeSaved: string
  whatHappens: string
  inputExample: { label: string; code: string }
  outputExample: { label: string; code: string }
  keyBenefit: string
}

export const WORKFLOW_STEPS: WorkflowStepData[] = [
  {
    id: 1,
    title: 'Raw Idea Intake',
    subtitle: 'Founder captures a thought or topic query',
    tool: 'Notion Database / Google Forms',
    toolCategory: 'Capture',
    icon: Database,
    timeSaved: '15 mins',
    whatHappens:
      'Founder writes a 1–2 sentence raw idea into a mobile Notion quick-add widget or Google Form. Tags the target audience and content pillar.',
    inputExample: {
      label: 'Founder Prompt',
      code: `Title: 5 Things to Check Before Choosing a Vet for Your Pet
Pillar: Pet Wellness & Authority
Audience: First-time dog & cat owners
Notes: Focus on emergency availability and upfront pricing.`,
    },
    outputExample: {
      label: 'Notion Database Row',
      code: `{
  "id": "notion-row-902",
  "status": "Ready for Pipeline",
  "topic": "Vet checklist",
  "created_at": "2026-11-10T11:00:00Z"
}`,
    },
    keyBenefit: 'Frictionless capture without worrying about layout, formatting, or design.',
  },
  {
    id: 2,
    title: 'Automation Trigger',
    subtitle: 'Webhook fires on database update',
    tool: 'n8n / Make Webhook',
    toolCategory: 'Orchestration',
    icon: Webhook,
    timeSaved: '10 mins',
    whatHappens:
      'An event listener fires instantly when the Notion status turns to "Ready for Pipeline". It validates required fields and triggers the Claude API pipeline.',
    inputExample: {
      label: 'Webhook Payload',
      code: `POST /webhook/carousel-trigger
Headers: { "X-Auth": "bearer-token" }
Body: { "pageId": "notion-row-902", "prompt": "Vet checklist..." }`,
    },
    outputExample: {
      label: 'n8n Execution State',
      code: `{
  "executionId": "exec-44810",
  "status": "dispatched",
  "nextStage": "claude-research-agent"
}`,
    },
    keyBenefit: 'Zero manual handoffs or status chasing across different team tools.',
  },
  {
    id: 3,
    title: 'Research & Structuring',
    subtitle: 'Claude structures the core narrative',
    tool: 'Claude 3.5 Sonnet / Opus API',
    toolCategory: 'AI Reasoning',
    icon: Bot,
    timeSaved: '45 mins',
    whatHappens:
      'Claude analyzes veterinary best practices, uncovers counter-intuitive angles (e.g. proximity vs emergency readiness), and structures an 8-part narrative arc.',
    inputExample: {
      label: 'System Prompt Extract',
      code: `You are an expert editorial strategist.
Analyze the prompt: "5 Things to Check Before Choosing a Vet".
Structure an 8-slide progression: Hook, Problem, 5 Tips, CTA.
Ensure each tip offers a distinct diagnostic metric.`,
    },
    outputExample: {
      label: 'Structured Architecture',
      code: `{
  "angle": "Emergency preparedness over distance",
  "framework": "Hook -> Pitfall -> 5 Diagnostic Criteria -> Action CTA",
  "readingTime": "45 seconds"
}`,
    },
    keyBenefit: 'Deep analytical research and narrative pacing established in under 3 seconds.',
  },
  {
    id: 4,
    title: 'Copywriting & JSON Schema',
    subtitle: 'Headlines, body, and word count enforcement',
    tool: 'Claude 3.5 Sonnet API',
    toolCategory: 'AI Generation',
    icon: FileCode2,
    timeSaved: '60 mins',
    whatHappens:
      'Claude drafts concise editorial copy adhering strictly to the <25 words per slide rule. Outputs structured JSON matching the Carousel Studio schema.',
    inputExample: {
      label: 'Format Constraint',
      code: `Output JSON only:
{
  "slides": [
    { "index": number, "type": "hook"|"tip"|"problem"|"cta", "headline": string, "body": string }
  ]
}
CONSTRAINT: Never exceed 25 total words per slide.`,
    },
    outputExample: {
      label: 'Structured JSON',
      code: `{
  "slides": [
    {
      "index": 1,
      "type": "hook",
      "headline": "Choosing a vet? Check these 5 things first.",
      "body": "Don't wait for an emergency to find out you chose the wrong clinic."
    }
  ]
}`,
    },
    keyBenefit: 'Production-ready copy formatted directly into code without manual copy-pasting.',
  },
  {
    id: 5,
    title: 'Visual Direction & Styling',
    subtitle: 'Palette, font pairings, and icon assignments',
    tool: 'Claude API + Design Rules',
    toolCategory: 'AI Art Direction',
    icon: Palette,
    timeSaved: '30 mins',
    whatHappens:
      'The pipeline assigns visual tokens: alternating Sand (#F6F1E7) and Ink (#1C1B19) slides, thin-line Lucide icon names, and terracotta highlight placement.',
    inputExample: {
      label: 'Style Prompt Rules',
      code: `Rhythm: Alternate themes (Ink, Sand, Ink, Sand, Ink, Sand, Sand, Ink).
Icons: Lucide thin-line names (Siren, Award, Sparkles, Receipt, HeartHandshake).
Numerals: Fraunces serif 170px numerals.`,
    },
    outputExample: {
      label: 'Visual Assignment',
      code: `{
  "themePalette": "Warm Editorial",
  "assignedIcons": ["Siren", "Award", "Sparkles", "Receipt", "HeartHandshake"],
  "margins": 96
}`,
    },
    keyBenefit: 'Consistent aesthetic execution with zero font or color deviation.',
  },
  {
    id: 6,
    title: 'Dynamic Template Rendering',
    subtitle: 'JSON renders directly into Carousel Studio',
    tool: 'Carousel Studio Engine (or Canva Bulk Create)',
    toolCategory: 'Rendering Engine',
    icon: Layout,
    timeSaved: '45 mins',
    whatHappens:
      'The structured JSON is injected into Carousel Studio. Components render at native 1080×1350 with live CSS transform scaling, responsive on mobile and desktop.',
    inputExample: {
      label: 'React Component Mount',
      code: `<SlideRenderer
  slide={slideData}
  totalSlides={8}
  aspectRatio="4:5"
/>`,
    },
    outputExample: {
      label: 'Interactive Canvas',
      code: `Rendered 8 portrait slides (1080x1350).
Sub-second preview with instant theme swapping.`,
    },
    keyBenefit: 'Bypasses slow graphic design software; code-driven layouts scale indefinitely.',
  },
  {
    id: 7,
    title: 'Founder Review & Minor Edits',
    subtitle: 'Slack notification with 1-click preview link',
    tool: 'Carousel Studio + Slack/Email Alert',
    toolCategory: 'Human in the Loop',
    icon: Eye,
    timeSaved: '20 mins',
    whatHappens:
      'Founder receives a Slack ping: "Carousel ready for review". Founder opens Studio on mobile or desktop, tweaks 1–2 words, reorders slides, and approves the checklist.',
    inputExample: {
      label: 'Slack Notification',
      code: `[Carousel Studio] 🐾 Vet Checklist Draft Generated!
Slides: 8 | Estimated Reading: 45s
Preview: https://carousel-studio.app/?deck=vet-checklist-902`,
    },
    outputExample: {
      label: 'Review Approval',
      code: `Founder approved 6/6 checklist items.
Export permission unlocked.`,
    },
    keyBenefit: 'Founder retains 100% editorial control with under 3 minutes of active effort.',
  },
  {
    id: 8,
    title: 'Multi-Format Export',
    subtitle: 'High-res PNG sequence & LinkedIn PDF',
    tool: 'html-to-image + jsPDF + JSZip',
    toolCategory: 'Export Suite',
    icon: Download,
    timeSaved: '25 mins',
    whatHappens:
      'The browser engine renders native 1080p DOM nodes into lossless PNGs, bundles them into a ZIP file, or compiles a crisp multi-page vector PDF for LinkedIn.',
    inputExample: {
      label: 'Export Trigger',
      code: `await exportAllSlidesAsPdf(getSlideEl, 8, "4:5");
await exportAllSlidesAsZip(getSlideEl, 8);`,
    },
    outputExample: {
      label: 'Generated Files',
      code: `1. carousel-slides.zip (8 PNGs @ 1080x1350)
2. carousel-deck.pdf (8-page LinkedIn carousel document)`,
    },
    keyBenefit: 'Instant client-side export without watermarks, compression artifacts, or wait times.',
  },
  {
    id: 9,
    title: 'Automated Social Scheduling',
    subtitle: 'Queued to Instagram & LinkedIn feeds',
    tool: 'Buffer / Metricool API',
    toolCategory: 'Distribution',
    icon: Share2,
    timeSaved: '30 mins',
    whatHappens:
      'The exported PNGs and generated social captions (with curated hashtags and editorial copy) are queued into Buffer or Metricool for optimal time dispatch.',
    inputExample: {
      label: 'Buffer Schedule Payload',
      code: `POST /api/v1/posts/create
{
  "media": ["slide-01.png", "slide-02.png", ...],
  "scheduled_at": "2026-11-11T10:00:00Z",
  "channels": ["instagram", "linkedin"]
}`,
    },
    outputExample: {
      label: 'Queue Status',
      code: `{ "status": "scheduled", "estimatedReach": "3.5k - 8k impressions" }`,
    },
    keyBenefit: 'Multi-platform distribution automated at the exact peak hour for your audience.',
  },
  {
    id: 10,
    title: 'Analytics Feedback Loop',
    subtitle: 'Saves performance metrics back into Notion',
    tool: 'Metricool / Notion Sync',
    toolCategory: 'Optimization',
    icon: BarChart3,
    timeSaved: '30 mins',
    whatHappens:
      'After 48 hours, Metricool syncs engagement metrics (saves, shares, swipe-through completion rate) back into the original Notion database row to refine future hooks.',
    inputExample: {
      label: 'Social Performance Metrics',
      code: `{
  "saves": 342,
  "shares": 118,
  "completionRate": "84.2%",
  "topSlide": "Slide 03 (Emergency Availability)"
}`,
    },
    outputExample: {
      label: 'Notion Database Update',
      code: `{
  "id": "notion-row-902",
  "status": "Top Performer",
  "insights": "Emergency hooks scored 2.4x higher save rate."
}`,
    },
    keyBenefit: 'Continuous self-learning system that makes every subsequent carousel higher converting.',
  },
]

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
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleTogglePlay}
              className="text-xs"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-accent" /> Pause Simulation
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-accent" /> Play Pipeline
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs"
              title="Reset to step 1"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
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
                  onClick={() => {
                    setIsPlaying(false)
                    setActiveStepId(step.id)
                  }}
                  className={`group relative flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
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
                  className="text-xs"
                >
                  Previous Step
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={activeStep.id === 10}
                  onClick={() => setActiveStepId((prev) => Math.min(10, prev + 1))}
                  className="text-xs"
                >
                  Next Step <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
