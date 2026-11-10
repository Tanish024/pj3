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
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 rounded-xl py-1 px-1.5 -ml-1.5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 transition-opacity hover:opacity-90"
        >
          <Layers className="h-5 w-5 text-accent" />
          <span className="font-serif text-lg font-semibold tracking-tight text-text">
            Carousel Studio
          </span>
        </NavLink>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-3 py-1.5 text-sm font-medium transition-colors duration-200',
                  'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
                  isActive ? 'bg-card text-text' : 'text-muted hover:text-text hover:bg-card/50',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile nav + theme toggle */}
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 sm:hidden">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-2 py-1 text-xs font-medium transition-colors duration-200',
                    isActive ? 'bg-card text-text' : 'text-muted',
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
