import type { CarouselSlideData } from '../data/carouselContent'

export interface GeneratedCaptions {
  instagram: string
  linkedin: string
}

export function generateCaptions(
  slides: CarouselSlideData[],
  deckTitle: string,
  authorHandle: string = '@yourbrand',
): GeneratedCaptions {
  const hookSlide = slides.find((s) => s.type === 'hook') || slides[0]
  const tipSlides = slides.filter((s) => s.type === 'tip')
  const problemSlide = slides.find((s) => s.type === 'problem')

  // Generate Instagram Caption
  const igTips = tipSlides
    .map(
      (s, i) =>
        `${i + 1}️⃣ ${s.headline}: ${s.body.slice(0, 75)}${s.body.length > 75 ? '...' : ''}`,
    )
    .join('\n\n')

  const instagram = `${hookSlide.headline} 🐾\n\nMost pet parents choose a vet based solely on proximity. But when an emergency happens at 2 AM, distance is the last thing that matters.\n\nSwipe through for the 5 non-negotiable checks before trusting anyone with your pet:\n\n${igTips}\n\n📌 Save this checklist before your next vet visit!\n👉 Follow ${authorHandle} for more thoughtful pet wellness guides.\n\n#PetCareTips #VeterinarianChecklist #DogHealth #CatCare #PetWellness #WarmEditorial #PetParenting #VeterinaryCare`

  // Generate LinkedIn Post
  const linkedInTips = tipSlides
    .map((s, i) => `• 0${i + 1} ${s.headline} — ${s.body}`)
    .join('\n')

  const linkedin = `${deckTitle}\n\nOver 68% of pet parents pick their primary veterinarian simply because they're within a 3-mile radius.\n\nConvenience feels great for routine checkups. But critical care exposes clinical gaps:\n\n${problemSlide ? `"${problemSlide.body}"\n\n` : ''}Here is the 5-point checklist we recommend reviewing before committing to a clinic:\n\n${linkedInTips}\n\n📄 I've attached the complete editorial slide deck above as a PDF document for easy reference and team sharing.\n\nWhat's the #1 question you ask a new vet? Let's discuss in the comments.\n\n—\nWritten with ${authorHandle} · Warm Editorial Systems`

  return { instagram, linkedin }
}
