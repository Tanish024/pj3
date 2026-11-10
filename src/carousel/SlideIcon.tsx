import {
  Siren,
  Award,
  Sparkles,
  Receipt,
  HeartHandshake,
  Compass,
  MapPin,
  HelpCircle,
  type LucideProps,
} from 'lucide-react'

interface SlideIconProps extends LucideProps {
  name?: string
}

export function SlideIcon({ name, className = '', strokeWidth = 1.25, size = 52, ...props }: SlideIconProps) {
  const iconProps = {
    className,
    strokeWidth,
    size,
    ...props,
  }

  switch (name) {
    case 'Siren':
      return <Siren {...iconProps} />
    case 'Award':
      return <Award {...iconProps} />
    case 'Sparkles':
      return <Sparkles {...iconProps} />
    case 'Receipt':
      return <Receipt {...iconProps} />
    case 'HeartHandshake':
      return <HeartHandshake {...iconProps} />
    case 'Compass':
      return <Compass {...iconProps} />
    case 'MapPin':
      return <MapPin {...iconProps} />
    default:
      return <HelpCircle {...iconProps} />
  }
}

