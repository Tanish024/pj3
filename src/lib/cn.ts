import { type ClassValue, clsx } from 'clsx'

// Lightweight cn() — we only need clsx for conditional classes.
// If you later add tailwind-merge, swap this implementation.
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
