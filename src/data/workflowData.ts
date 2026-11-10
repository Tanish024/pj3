import {
  Database,
  Webhook,
  Bot,
  FileCode2,
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
