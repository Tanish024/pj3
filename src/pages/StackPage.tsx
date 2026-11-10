import { useState, useMemo } from 'react'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { Input } from '../components/Input'
import {
  Layers,
  Cpu,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import {
  TOOLS_DATA,
  PROJECT_TECH_STACK,
  FUTURE_IMPROVEMENTS,
  type ToolItem,
} from '../data/toolsData'

export type { ToolItem }

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
              aria-label="Search tools by name, purpose, or alternative"
              className="h-9 text-xs"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Tool categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-accent ${
                selectedCategory === cat
                  ? 'bg-accent text-white dark:text-[#151412] font-semibold shadow-xs'
                  : 'bg-card text-muted hover:text-text border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Table Container */}
        <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs" aria-label="Tool ecosystem comparison table">
              <thead>
                <tr className="border-b border-border bg-card/60 text-muted font-mono uppercase tracking-wider text-[11px]">
                  <th scope="col" className="py-3.5 px-4 font-medium">Tool</th>
                  <th scope="col" className="py-3.5 px-4 font-medium">Purpose</th>
                  <th scope="col" className="py-3.5 px-4 font-medium">Why Chosen</th>
                  <th scope="col" className="py-3.5 px-4 font-medium">Cost Tier</th>
                  <th scope="col" className="py-3.5 px-4 font-medium">Alternative</th>
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
