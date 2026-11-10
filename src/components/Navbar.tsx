import { NavLink } from 'react-router-dom'
import { Layers } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Container } from './Container'
import { cn } from '../lib/cn'

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const links = [
  { to: '/', label: 'Studio' },
  { to: '/workflow', label: 'Workflow' },
  { to: '/stack', label: 'Stack' },
]

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-2">
        {/* Logo */}
        <NavLink
          to="/"
          aria-label="Carousel Studio Home"
          className="flex items-center gap-2 rounded-xl py-1 px-1.5 -ml-1.5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 transition-opacity hover:opacity-90 shrink-0"
        >
          <Layers className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
          <span className="font-serif text-base sm:text-lg font-semibold tracking-tight text-text whitespace-nowrap">
            Carousel Studio
          </span>
        </NavLink>

        {/* Nav links (Desktop) */}
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-3 py-1.5 text-sm font-medium transition-colors duration-200',
                  'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
                  isActive ? 'bg-card text-text shadow-xs' : 'text-muted hover:text-text hover:bg-card/50',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile nav + theme toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <nav className="flex items-center gap-1 sm:hidden" aria-label="Mobile navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-2 py-1 text-xs font-medium transition-colors duration-200',
                    'focus-visible:outline-2 focus-visible:outline-accent',
                    isActive ? 'bg-card text-text shadow-xs font-semibold' : 'text-muted hover:text-text',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </Container>
    </header>
  )
}
