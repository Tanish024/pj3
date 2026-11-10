import {
  Bot,
  Database,
  Webhook,
  Palette,
  Share2,
  BarChart3,
  Globe,
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
