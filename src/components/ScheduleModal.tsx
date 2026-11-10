import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import { Select } from './Select'
import { Textarea } from './Textarea'
import {
  Calendar,
  Share2,
  CheckCircle2,
  ExternalLink,
  Trash2,
} from 'lucide-react'

export interface ScheduleData {
  id: string
  title: string
  date: string
  time: string
  platform: string
  notes: string
  savedAt: string
}

const SCHEDULE_STORAGE_KEY = 'carousel-studio-schedule'

interface ScheduleModalProps {
  open: boolean
  onClose: () => void
  deckTitle: string
  onScheduleSaved: (schedule: ScheduleData | null) => void
}

export function ScheduleModal({
  open,
  onClose,
  deckTitle,
  onScheduleSaved,
}: ScheduleModalProps) {
  // Pre-fill date with tomorrow
  const getTomorrowDate = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  }

  const getSavedSchedule = (): ScheduleData | null => {
    try {
      const stored = localStorage.getItem(SCHEDULE_STORAGE_KEY)
      return stored ? (JSON.parse(stored) as ScheduleData) : null
    } catch {
      return null
    }
  }

  const [existingSchedule, setExistingSchedule] = useState<ScheduleData | null>(getSavedSchedule)
  const [date, setDate] = useState(() => existingSchedule?.date || getTomorrowDate())
  const [time, setTime] = useState(() => existingSchedule?.time || '10:00')
  const [platform, setPlatform] = useState(() => existingSchedule?.platform || 'both')
  const [notes, setNotes] = useState(() => existingSchedule?.notes || 'Morning high-engagement editorial drop')

  const handleSave = () => {
    const newSchedule: ScheduleData = {
      id: `sched-${Date.now()}`,
      title: deckTitle,
      date,
      time,
      platform,
      notes,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(newSchedule))
    setExistingSchedule(newSchedule)
    onScheduleSaved(newSchedule)
    onClose()
  }

  const handleClear = () => {
    localStorage.removeItem(SCHEDULE_STORAGE_KEY)
    setExistingSchedule(null)
    onScheduleSaved(null)
  }

  const platformOptions = [
    { value: 'both', label: 'Both Instagram & LinkedIn (Recommended)' },
    { value: 'instagram', label: 'Instagram Portrait (1080 × 1350)' },
    { value: 'linkedin', label: 'LinkedIn PDF Document (1080 × 1080 / 1350)' },
    { value: 'twitter', label: 'Twitter / X Image Sequence' },
  ]

  return (
    <Modal open={open} onClose={onClose} title="Schedule Campaign">
      <div className="space-y-5">
        {/* Explanation Card */}
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-4 space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Share2 className="h-4 w-4" />
            <h4 className="font-serif text-sm font-semibold">Buffer & Metricool Dispatch</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Directly prepare your publication window. Once scheduled, export your PNG sequence or PDF carousel and connect to Buffer or Metricool for zero-friction queueing.
          </p>
          <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-accent">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Auto-reminders
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Timezone aligned
            </span>
          </div>
        </div>

        {/* Existing Schedule banner if already set */}
        {existingSchedule && (
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-medium text-text">Active Schedule Saved</span>
              <p className="text-[11px] text-muted">
                {existingSchedule.date} at {existingSchedule.time} · {existingSchedule.platform}
              </p>
            </div>
            <button
              onClick={handleClear}
              className="text-red-500 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-500/10 cursor-pointer"
              title="Remove Schedule"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Schedule Form */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="sched-date" className="text-xs font-medium text-text">Target Date</label>
            <input
              id="sched-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-xs text-text focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="sched-time" className="text-xs font-medium text-text">Target Time</label>
            <input
              id="sched-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-xs text-text focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Select
            label="Publishing Destination"
            options={platformOptions}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Textarea
            label="Campaign Strategy / Notes"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add context or scheduling tags..."
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <a
            href="https://buffer.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-text"
          >
            Open Buffer <ExternalLink className="h-3 w-3" />
          </a>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Calendar className="h-3.5 w-3.5" /> Save Schedule
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
