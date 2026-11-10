import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { jsPDF } from 'jspdf'

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const SAMPLES_DIR = path.resolve('samples')
const TEMP_DIR = path.resolve('scripts/temp')

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true })
if (!fs.existsSync(SAMPLES_DIR)) fs.mkdirSync(SAMPLES_DIR, { recursive: true })

const slides = [
  {
    index: 1,
    type: 'hook',
    theme: 'ink',
    tag: 'Care Guide',
    headline: 'Choosing a vet?<br><span style="position:relative;display:inline-block;margin-top:12px;">Check these 5 things first.<span style="position:absolute;bottom:-12px;left:0;height:6px;width:100%;border-radius:99px;background-color:#E8794F;"></span></span>',
    body: "Don't wait for an emergency to find out you chose the wrong clinic.",
    handle: '@yourbrand',
  },
  {
    index: 2,
    type: 'problem',
    theme: 'sand',
    tag: 'The Reality',
    subhead: 'The common pitfall',
    headline: 'Most pet owners pick a vet by distance alone.',
    body: 'Convenience feels good until your pet needs complex diagnostics, urgent overnight care, or genuine bedside patience.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    handle: '@yourbrand',
  },
  {
    index: 3,
    type: 'tip',
    theme: 'ink',
    tipNumber: '01',
    headline: 'Emergency availability',
    body: 'Confirm 24/7 coverage and overnight monitoring. You need to know exactly who answers at 2 AM on a Sunday.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"/><line x1="12" y1="2" x2="12" y2="4"/></svg>`,
    handle: '@yourbrand',
  },
  {
    index: 4,
    type: 'tip',
    theme: 'sand',
    tipNumber: '02',
    headline: 'Qualifications & depth',
    body: "Ask about surgeon credentials, technician certifications, and direct experience with your pet's specific breed.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    handle: '@yourbrand',
  },
  {
    index: 5,
    type: 'tip',
    theme: 'ink',
    tipNumber: '03',
    headline: 'Clean, safe facility',
    body: 'Separate dog and cat recovery areas reduce distress. Inspect sterile prep hygiene and quiet spaces.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    handle: '@yourbrand',
  },
  {
    index: 6,
    type: 'tip',
    theme: 'sand',
    tipNumber: '04',
    headline: 'Transparent pricing',
    body: 'Reputable clinics provide written itemized estimates before treatment. Avoid practices that hesitate to explain fees.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/></svg>`,
    handle: '@yourbrand',
  },
  {
    index: 7,
    type: 'tip',
    theme: 'sand',
    tipNumber: '05',
    headline: 'Handling & temperament',
    body: 'Watch how staff greet animals. Do they practice Fear-Free handling and take time to calm anxious pets?',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    handle: '@yourbrand',
  },
  {
    index: 8,
    type: 'cta',
    theme: 'ink',
    headline: 'Find trusted vets near you',
    body: 'Save this guide for your next clinic visit. A ten-minute interview now prevents years of heartache.',
    ctaLabel: 'Find trusted vets near you',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
    handle: '@yourbrand',
  },
]

function generateHtml(slide) {
  const isInk = slide.theme === 'ink'
  const bg = isInk ? '#1C1B19' : '#F6F1E7'
  const text = isInk ? '#F1EBDF' : '#1C1B19'
  const muted = isInk ? '#A29A8B' : '#6E675B'
  const border = isInk ? '#34302A' : '#DDD2BF'
  const accent = isInk ? '#E8794F' : '#D9633B'
  const cardBg = isInk ? '#26231F' : '#FFFBF3'
  const isLast = slide.index === 8

  let bodyContent = ''

  if (slide.type === 'hook') {
    bodyContent = `
      <div style="display:flex;flex-direction:column;gap:36px;margin:auto 0;">
        <div>
          <div style="display:inline-block;padding:8px 20px;border-radius:99px;font-size:20px;font-weight:500;background:#26231F;color:${accent};border:1px solid ${border};margin-bottom:24px;">
            Essential Vet Guide
          </div>
          <h1 style="font-family:'Fraunces',serif;font-size:78px;font-weight:600;line-height:1.08;letter-spacing:-0.02em;margin:0;">
            ${slide.headline}
          </h1>
        </div>
        <p style="font-size:34px;font-weight:400;line-height:1.4;color:${muted};max-width:820px;margin:0;">
          ${slide.body}
        </p>
      </div>
    `
  } else if (slide.type === 'problem') {
    bodyContent = `
      <div style="display:flex;flex-direction:column;gap:36px;margin:auto 0;">
        <div style="width:96px;height:96px;border-radius:18px;display:flex;align-items:center;justify-content:center;background:${cardBg};border:1px solid ${border};color:${accent};">
          ${slide.iconSvg}
        </div>
        <div>
          <span style="font-family:'Fraunces',serif;font-style:italic;font-size:28px;color:${accent};display:block;margin-bottom:12px;">
            ${slide.subhead}
          </span>
          <h2 style="font-family:'Fraunces',serif;font-size:68px;font-weight:600;line-height:1.12;letter-spacing:-0.02em;margin:0;">
            ${slide.headline}
          </h2>
        </div>
        <p style="font-size:34px;font-weight:400;line-height:1.45;color:${muted};max-width:840px;margin:0;">
          ${slide.body}
        </p>
      </div>
    `
  } else if (slide.type === 'tip') {
    bodyContent = `
      <div style="display:flex;flex-direction:column;gap:32px;margin:auto 0;">
        <div style="display:flex;align-items:baseline;justify-content:space-between;border-bottom:1px solid ${border};padding-bottom:24px;">
          <span style="font-family:'Fraunces',serif;font-size:170px;font-weight:600;line-height:0.9;letter-spacing:-0.04em;color:${accent};">
            ${slide.tipNumber}
          </span>
          <div style="width:108px;height:108px;border-radius:20px;display:flex;align-items:center;justify-content:center;background:${cardBg};border:1px solid ${border};color:${accent};">
            ${slide.iconSvg}
          </div>
        </div>
        <div>
          <h2 style="font-family:'Fraunces',serif;font-size:64px;font-weight:600;line-height:1.14;letter-spacing:-0.02em;margin:0 0 20px 0;">
            ${slide.headline}
          </h2>
          <p style="font-size:34px;font-weight:400;line-height:1.48;color:${muted};max-width:850px;margin:0;">
            ${slide.body}
          </p>
        </div>
      </div>
    `
  } else if (slide.type === 'cta') {
    bodyContent = `
      <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:36px;margin:auto 0;">
        <div style="width:112px;height:112px;border-radius:24px;display:flex;align-items:center;justify-content:center;background:#26231F;border:1px solid ${border};color:${accent};">
          ${slide.iconSvg}
        </div>
        <div>
          <h2 style="font-family:'Fraunces',serif;font-size:72px;font-weight:600;line-height:1.1;letter-spacing:-0.02em;margin:0 0 20px 0;">
            ${slide.headline}
          </h2>
          <p style="font-size:32px;font-weight:400;line-height:1.45;color:${muted};max-width:860px;margin:0 auto;">
            ${slide.body}
          </p>
        </div>
        <div>
          <div style="display:inline-block;padding:24px 48px;border-radius:18px;font-size:30px;font-weight:500;background:${accent};color:#FFF;box-shadow:0 10px 25px rgba(0,0,0,0.2);">
            ${slide.ctaLabel}
          </div>
        </div>
        <span style="font-size:24px;color:${muted};">
          Follow ${slide.handle} for more mindful pet care checklists
        </span>
      </div>
    `
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Inter:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0;
      width: 1080px; height: 1350px;
      overflow: hidden;
      background: ${bg};
      color: ${text};
      font-family: 'Inter', sans-serif;
    }
    .slide {
      width: 1080px; height: 1350px;
      padding: 96px;
      display: flex; flex-direction: column; justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="slide">
    <!-- Header -->
    <header style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ${border};padding-bottom:24px;">
      <span style="font-size:20px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${accent};">
        ${slide.tag || (slide.tipNumber ? `Checklist · Item ${slide.tipNumber}` : 'Pet Care Editorial')}
      </span>
      <span style="font-family:monospace;font-size:22px;letter-spacing:0.1em;color:${muted};">
        0${slide.index} / 08
      </span>
    </header>

    <!-- Body -->
    ${bodyContent}

    <!-- Footer -->
    <footer style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid ${border};padding-top:24px;">
      <span style="font-family:monospace;font-size:22px;color:${text};">
        ${slide.handle}
      </span>
      <span style="font-size:20px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${muted};">
        Slide ${slide.index} of 8
      </span>
      <div style="min-width:120px;display:flex;justify-content:flex-end;">
        ${
          !isLast
            ? `<div style="display:flex;align-items:center;gap:8px;font-size:22px;color:${accent};font-weight:500;">
                 <span>Swipe</span>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
               </div>`
            : `<span style="font-size:20px;color:${muted};">End</span>`
        }
      </div>
    </footer>
  </div>
</body>
</html>`
}

async function run() {
  console.log('Generating 8 sample carousel PNGs...')

  const pngFiles = []

  for (const s of slides) {
    const html = generateHtml(s)
    const htmlPath = path.join(TEMP_DIR, `slide-0${s.index}.html`)
    const pngPath = path.join(SAMPLES_DIR, `slide-0${s.index}.png`)
    fs.writeFileSync(htmlPath, html, 'utf-8')

    // Run headless Edge screenshot at 1080x1350
    const cmd = `"${EDGE_PATH}" --headless --disable-gpu --hide-scrollbars --window-size=1080,1350 --screenshot="${pngPath}" "${htmlPath}"`
    execSync(cmd)
    pngFiles.push(pngPath)
    console.log(`Generated samples/slide-0${s.index}.png`)
  }

  console.log('Assembling samples/sample-carousel.pdf...')
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [1080, 1350],
    hotfixes: ['px_scaling'],
  })

  for (let i = 0; i < pngFiles.length; i++) {
    const filePath = pngFiles[i]
    const buffer = fs.readFileSync(filePath)
    const base64 = buffer.toString('base64')
    const dataUri = `data:image/png;base64,${base64}`

    if (i > 0) {
      doc.addPage([1080, 1350], 'portrait')
    }
    doc.addImage(dataUri, 'PNG', 0, 0, 1080, 1350, undefined, 'FAST')
  }

  const pdfPath = path.join(SAMPLES_DIR, 'sample-carousel.pdf')
  doc.save(pdfPath)
  console.log('Generated samples/sample-carousel.pdf successfully!')

  // Cleanup temp HTML files
  fs.rmSync(TEMP_DIR, { recursive: true, force: true })
}

run()

