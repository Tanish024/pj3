import { useState, useMemo } from 'react'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { Input } from '../components/Input'
import {
  Layers,
  Cpu,
  Sparkles,
  Bot,
  Database,
  Webhook,
  Palette,
  Share2,
  BarChart3,
  Globe,
  CheckCircle2,
} from 'lucide-react'

export interface ToolItem {
  name: string
  category: 'AI & Copy' | 'Database' | 'Automation' | 'Design' | 'Publishing' | 'Analytics' | 'Hosting'
  purpose: string
  whyChosen: string
  costTier: string
  alternative: string
  icon: typeof Bot
}

export const TOOLS_DATA: ToolItem[] = [
  {
    name: 'Claude 3.5 Sonnet / Opus',
    category: 'AI & Copy',
    purpose: 'Deep topic research, structural outline, editorial copywriting, and strict JSON schema generation.',
    whyChosen: 'Nuanced editorial tone, superior compliance with complex JSON schemas, minimal hallucination, and sharp headline wit.',
    costTier: 'Usage-based (~$0.08 / deck via API)',
    alternative: 'OpenAI GPT-4o, Google Gemini 1.5 Pro',
    icon: Bot,
  },
  {
    name: 'Notion',
    category: 'Database',
    purpose: 'Central idea intake repository, content production pipeline, and performance tracking calendar.',
    whyChosen: 'Relational database properties, flexible kanban/table views, mobile quick-add widgets, and native webhook events.',
    costTier: 'Free / $10/mo Plus',
    alternative: 'Airtable, Coda, Google Sheets',
    icon: Database,
  },
  {
    name: 'n8n',
    category: 'Automation',
    purpose: 'Event-driven webhook orchestrator connecting Notion updates to Claude API and Carousel Studio endpoints.',
    whyChosen: 'Self-hostable with fair-code licensing, robust error handling, low-latency execution, and visual debug nodes.',
    costTier: 'Free (Self-hosted) / $20/mo Cloud',
    alternative: 'Make, Zapier, Relay.app',
    icon: Webhook,
  },
  {
    name: 'Make',
    category: 'Automation',
    purpose: 'Cloud-native alternative workflow automation engine for teams preferring zero-infrastructure setups.',
    whyChosen: 'Instant visual debugging, native Notion & Slack app integrations, and reliable multi-branch routers.',
    costTier: 'Free tier / $9/mo Core',
    alternative: 'n8n, Zapier',
    icon: Webhook,
  },
  {
    name: 'Canva',
    category: 'Design',
    purpose: 'Bulk Create fallback for non-developer collaborators to import generated CSV slide copy into existing marketing templates.',
    whyChosen: 'Universal team familiarity, vast font repository, native CSV column mapping, and seamless brand kit sharing.',
    costTier: 'Free / $15/mo Pro',
    alternative: 'Figma, Carousel Studio Native',
    icon: Palette,
  },
  {
    name: 'Figma',
    category: 'Design',
    purpose: 'Foundational design token authoring, visual layout experimentation, and vector asset generation.',
    whyChosen: 'Vector precision matching CSS Flexbox, reusable component variants, and precise pixel fidelity.',
    costTier: 'Free / $12/mo Professional',
    alternative: 'Penpot, Sketch',
    icon: Palette,
  },
  {
    name: 'Buffer',
    category: 'Publishing',
    purpose: 'Automated social queueing and scheduled publishing for multi-image carousels on Instagram and LinkedIn.',
    whyChosen: 'Reliable multi-channel API, intuitive queue scheduling, clean interface, and minimal overhead.',
    costTier: 'Free (3 channels) / $6/channel/mo',
    alternative: 'Metricool, Hootsuite, Later',
    icon: Share2,
  },
  {
    name: 'Metricool',
    category: 'Analytics',
    purpose: 'Comprehensive multi-platform social analytics, optimal posting time heatmaps, and performance tracking.',
    whyChosen: 'Aggregated analytics across Instagram and LinkedIn with exportable APIs that feed metrics back into Notion.',
    costTier: 'Free / $18/mo Starter',
    alternative: 'Buffer Analytics, Sprout Social',
    icon: BarChart3,
  },
  {
    name: 'Vercel',
    category: 'Hosting',
    purpose: 'Sub-second edge deployment and global CDN hosting for the Carousel Studio web application.',
    whyChosen: 'Automated git deployments, instant preview branches, and zero-configuration React/Vite builds.',
    costTier: 'Free Hobby / $20/mo Pro',
    alternative: 'Netlify, Cloudflare Pages, AWS Amplify',
    icon: Globe,
  },
]

export const PROJECT_TECH_STACK = [
  { name: 'React 19', role: 'Component-driven interactive UI & virtual DOM rendering' },
  { name: 'Vite', role: 'Next-gen lightning ES module bundler & dev server' },
  { name: 'TypeScript', role: 'Strict typing for slides, tokens, and export pipelines' },
  { name: 'Tailwind CSS v4', role: 'Modern CSS custom property design system (@theme tokens)' },
  { name: 'React Router v7', role: 'Declarative routing across Studio, Workflow, and Stack' },
  { name: 'Framer Motion', role: 'Gentle 150–250ms editorial transitions for modals & toasts' },
  { name: 'Lucide React', role: 'Minimal thin-line stroke icons (strokeWidth: 1.25)' },
  { name: 'html-to-image', role: 'High-fidelity 1080p DOM rasterization with web font embedding' },
  { name: 'jsPDF', role: 'Multi-page document carousel assembly for LinkedIn distribution' },
  { name: 'JSZip', role: 'Client-side ZIP compression for batch PNG slide packages' },
]

export const FUTURE_IMPROVEMENTS = [
  {
    title: 'Brand Voice Memory',
    badge: 'Q1 Roadmap',
    description:
      'Store historical top-performing hooks, vocabulary preferences, and founder tone profiles in a vector database for hyper-tailored copy generation.',
  },
  {
    title: 'AI Image Generation',
    badge: 'In Research',
    description:
      'Integrate Midjourney / Ideogram / Flux API to generate stylized Warm Editorial spot illustrations and textural overlays matching the Sand/Ink palette.',
  },
  {
    title: 'A/B Hook Cover Testing',
    badge: 'Under Development',
    description:
      'Automatically generate 3 hook slide variants for every carousel deck with attribution links to determine which headline drives the highest swipe-through rate.',
  },
  {
    title: 'Automated Analytics Loop',
    badge: 'Architecture Planned',
    description:
      'Bi-weekly webhook pulling engagement data from LinkedIn and Instagram back into Notion, automatically tagging winning frameworks to train future prompts.',
  },
]

export default function StackPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', 'AI & Copy', 'Database', 'Automation', 'Design', 'Publishing', 'Analytics', 'Hosting']

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.alternative.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="space-y-12 pb-20">
      {/* ============================================================== */}
      {/* HEADER SECTION                                                 */}
      {/* ============================================================== */}
      <section className="space-y-4 pt-6 sm:pt-12">
        <div className="flex items-center gap-2">
          <Badge variant="accent">Tool Ecosystem</Badge>
          <span className="text-xs text-muted font-mono">9 Core Integration Partners</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-[1.08] tracking-tight text-text max-w-4xl">
          The Automated Carousel Stack.
        </h1>

        <p className="max-w-3xl text-lg text-muted font-normal leading-relaxed">
          Every software layer powering the end-to-end founder workflow—from idea capture to multi-platform
          publishing. Selected for zero-code reliability, high design fidelity, and rapid iteration speed.
        </p>
      </section>

      {/* ============================================================== */}
      {/* TOOLS DIRECTORY TABLE                                          */}
      {/* ============================================================== */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-accent" />
            <h2 className="font-serif text-xl font-semibold text-text">Workflow Tools Comparison</h2>
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search tools, alternatives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 text-xs"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-card text-muted hover:text-text border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Table Container */}
        <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-card/60 text-muted font-mono uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-medium">Tool</th>
                  <th className="py-3.5 px-4 font-medium">Purpose</th>
                  <th className="py-3.5 px-4 font-medium">Why Chosen</th>
                  <th className="py-3.5 px-4 font-medium">Cost Tier</th>
                  <th className="py-3.5 px-4 font-medium">Alternative</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {filteredTools.map((tool) => {
                  const ToolIcon = tool.icon
                  return (
                    <tr
                      key={tool.name}
                      className="hover:bg-card/40 transition-colors"
                    >
                      {/* Tool Name & Category */}
                      <td className="py-4 px-4 align-top min-w-[200px]">
                        <div className="flex items-start gap-2.5">
                          <div className="p-1.5 rounded-lg bg-accent/10 text-accent shrink-0 mt-0.5">
                            <ToolIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-text text-sm block">
                              {tool.name}
                            </span>
                            <span className="text-[10px] uppercase font-mono text-muted tracking-wider">
                              {tool.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Purpose */}
                      <td className="py-4 px-4 align-top text-text leading-relaxed min-w-[240px]">
                        {tool.purpose}
                      </td>

                      {/* Why Chosen */}
                      <td className="py-4 px-4 align-top text-muted leading-relaxed min-w-[260px]">
                        {tool.whyChosen}
                      </td>

                      {/* Cost Tier */}
                      <td className="py-4 px-4 align-top whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded-md font-mono text-[11px] bg-card border border-border text-accent font-medium">
                          {tool.costTier}
                        </span>
                      </td>

                      {/* Alternative */}
                      <td className="py-4 px-4 align-top text-muted min-w-[160px]">
                        {tool.alternative}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2-COLUMN SECTION: PROJECT STACK & FUTURE ROADMAP               */}
      {/* ============================================================== */}
      <section className="grid gap-6 lg:grid-cols-2 items-start">
        {/* Project Tech Stack Card */}
        <Card className="p-6 space-y-5 border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-lg font-semibold text-text">Tech Stack of This Project</h3>
            </div>
            <Badge variant="accent">React + Vite</Badge>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Carousel Studio is engineered as an ultra-fast, client-side progressive web app. Zero cloud dependencies
            required for export—everything renders directly inside your browser virtual DOM.
          </p>

          <div className="grid gap-2 sm:grid-cols-2 pt-1 text-xs">
            {PROJECT_TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="p-3 rounded-xl border border-border bg-card/60 space-y-1"
              >
                <div className="flex items-center gap-1.5 text-text font-serif font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span>{tech.name}</span>
                </div>
                <p className="text-[11px] text-muted leading-tight">{tech.role}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Future Improvements Card */}
        <Card className="p-6 space-y-5 border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-lg font-semibold text-text">Future Improvements</h3>
            </div>
            <Badge variant="outline">Engineering Roadmap</Badge>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Upcoming capabilities currently in research to make the Warm Editorial pipeline fully self-optimizing
            and multi-modal.
          </p>

          <div className="space-y-3 pt-1">
            {FUTURE_IMPROVEMENTS.map((item) => (
              <div
                key={item.title}
                className="p-3.5 rounded-xl border border-border/80 bg-card/40 space-y-1.5 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-semibold text-text text-sm">{item.title}</h4>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-accent/10 text-accent font-medium">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
