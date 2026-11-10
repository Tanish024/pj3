import { useState, type ReactNode } from 'react'
import { cn } from '../lib/cn'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const nextIndex = (index + 1) % tabs.length
      setActive(tabs[nextIndex].id)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prevIndex = (index - 1 + tabs.length) % tabs.length
      setActive(tabs[prevIndex].id)
    }
  }

  return (
    <div className={className}>
      <div className="flex gap-1 border-b border-border" role="tablist" aria-orientation="horizontal">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors duration-200 -mb-px cursor-pointer',
              'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
              active === tab.id
                ? 'border-b-2 border-accent text-accent font-semibold'
                : 'text-muted hover:text-text',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`panel-${active}`}
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        className="pt-4 focus:outline-none"
      >
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  )
}
