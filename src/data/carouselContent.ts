export type SlideType = 'hook' | 'problem' | 'tip' | 'cta'
export type SlideTheme = 'ink' | 'sand' | 'terracotta'
export type AspectRatio = '4:5' | '1:1'

export interface CarouselSlideData {
  id: string
  index: number
  type: SlideType
  theme: SlideTheme
  headline: string
  subhead?: string
  body: string
  tipNumber?: string
  iconName?: 'Siren' | 'Award' | 'Sparkles' | 'Receipt' | 'HeartHandshake' | 'MapPin' | 'Compass'
  tag?: string
  ctaLabel?: string
  handle: string
}

export interface CarouselDeckData {
  id: string
  title: string
  subtitle: string
  authorHandle: string
  aspectRatio: AspectRatio
  dimensions: {
    width: number
    height: number
    padding: number
  }
  slides: CarouselSlideData[]
}

export interface AIAnalysisData {
  rawIdea: string
  researchPoints: string[]
  structureOutline: { step: string; detail: string }[]
  headlineOptions: { title: string; tone: string }[]
  visualDirection: {
    palette: string
    fonts: string
    layoutNotes: string
  }
}

export const sampleAIAnalysis: AIAnalysisData = {
  rawIdea: 'Tips for choosing a good vet for my pet',
  researchPoints: [
    'Over 68% of pet parents choose clinics purely by distance without checking emergency coverage.',
    '24/7 overnight monitoring prevents dangerous transfers during acute trauma or post-op complications.',
    'Fear-Free certified handling reduces patient stress, making diagnostics significantly more accurate.',
    'Clear upfront itemized estimates eliminate surprise emergency surcharges.',
  ],
  structureOutline: [
    { step: '01. Hook', detail: 'Challenge the proximity-first habit with high-contrast headline.' },
    { step: '02. Problem', detail: 'Explain why convenience can fail during critical health moments.' },
    { step: '03–07. Tips', detail: '5 specific checks: 24/7 care, credentials, hygiene, pricing, temperament.' },
    { step: '08. Action CTA', detail: 'Direct call to save checklist and follow for pet care guides.' },
  ],
  headlineOptions: [
    { title: 'Choosing a vet? Check these 5 things first.', tone: 'Curiosity & Urgency (Recommended)' },
    { title: 'Before you trust someone with your pet: 5 vital checks.', tone: 'Protective & Direct' },
    { title: 'The 5-question vet checklist every pet parent needs.', tone: 'Systematic & Clear' },
  ],
  visualDirection: {
    palette: 'Warm Editorial: Sand (#F6F1E7), Ink (#1C1B19), and Terracotta (#D9633B)',
    fonts: 'Fraunces Serif (headlines & 170px numerals) + Inter Sans (body copy)',
    layoutNotes: 'Alternating Sand/Ink swipe rhythm, 96px margins, strict < 25 words/slide, thin line icons.',
  },
}

export const sampleVetCarousel: CarouselDeckData = {
  id: 'vet-checklist-editorial',
  title: '5 Things to Check Before Choosing a Vet for Your Pet',
  subtitle: 'A warm editorial guide to vetting clinics with calm confidence.',
  authorHandle: '@yourbrand',
  aspectRatio: '4:5',
  dimensions: {
    width: 1080,
    height: 1350,
    padding: 96,
  },
  slides: [
    {
      id: 'slide-1',
      index: 1,
      type: 'hook',
      theme: 'ink',
      tag: 'Care Guide',
      headline: 'Choosing a vet? Check these 5 things first.',
      body: "Don't wait for an emergency to find out you chose the wrong clinic.",
      handle: '@yourbrand',
    },
    {
      id: 'slide-2',
      index: 2,
      type: 'problem',
      theme: 'sand',
      tag: 'The Reality',
      headline: "Most pet owners pick a vet by distance alone.",
      body: 'Convenience feels good until your pet needs complex diagnostics, urgent overnight care, or genuine bedside patience.',
      iconName: 'Compass',
      handle: '@yourbrand',
    },
    {
      id: 'slide-3',
      index: 3,
      type: 'tip',
      theme: 'ink',
      tipNumber: '01',
      headline: 'Emergency availability',
      body: 'Confirm 24/7 coverage and overnight monitoring. You need to know exactly who answers at 2 AM on a Sunday.',
      iconName: 'Siren',
      handle: '@yourbrand',
    },
    {
      id: 'slide-4',
      index: 4,
      type: 'tip',
      theme: 'sand',
      tipNumber: '02',
      headline: 'Qualifications & depth',
      body: "Ask about surgeon credentials, technician certifications, and direct experience with your pet's specific breed.",
      iconName: 'Award',
      handle: '@yourbrand',
    },
    {
      id: 'slide-5',
      index: 5,
      type: 'tip',
      theme: 'ink',
      tipNumber: '03',
      headline: 'Clean, safe facility',
      body: 'Separate dog and cat recovery areas reduce distress. Inspect sterile prep hygiene and quiet spaces.',
      iconName: 'Sparkles',
      handle: '@yourbrand',
    },
    {
      id: 'slide-6',
      index: 6,
      type: 'tip',
      theme: 'sand',
      tipNumber: '04',
      headline: 'Transparent pricing',
      body: 'Reputable clinics provide written itemized estimates before treatment. Avoid practices that hesitate to explain fees.',
      iconName: 'Receipt',
      handle: '@yourbrand',
    },
    {
      id: 'slide-7',
      index: 7,
      type: 'tip',
      theme: 'sand',
      tipNumber: '05',
      headline: 'Handling & temperament',
      body: 'Watch how staff greet animals. Do they practice Fear-Free handling and take time to calm anxious pets?',
      iconName: 'HeartHandshake',
      handle: '@yourbrand',
    },
    {
      id: 'slide-8',
      index: 8,
      type: 'cta',
      theme: 'ink',
      tag: 'Take Action',
      headline: 'Find trusted vets near you',
      body: 'Save this guide for your next clinic visit. A ten-minute interview now prevents years of heartache.',
      ctaLabel: 'Find trusted vets near you',
      handle: '@yourbrand',
    },
  ],
}
