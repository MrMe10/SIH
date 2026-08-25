'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const activityData24h = [
  35, 48, 42, 66, 54, 72, 61, 80, 58, 76, 68, 91, 74, 84, 62, 70, 88, 64, 76, 94,
  81, 72, 86, 78,
]

export function SensorActivityChart() {
  const [timeRange, setTimeRange] = useState('Last 24 hours')

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground">Sensor activity</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Events and telemetry across your project
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
        >
          {timeRange} <ChevronDown className="size-3" />
        </button>
      </div>

      <div className="mt-8 h-48">
        <div className="flex h-full items-end gap-1.5 sm:gap-2.5">
          {activityData24h.map((height, i) => (
            <div key={i} className="group relative flex h-full flex-1 items-end">
              <div
                style={{ height: `${height}%` }}
                className="w-full rounded-t-xs bg-sky-200/80 transition-all group-hover:bg-sky-500 dark:bg-sky-900/60 dark:group-hover:bg-sky-400"
              />
              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 bg-popover text-popover-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap z-10">
                {height * 12} events
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[11px] font-medium text-muted-foreground">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>Now</span>
        </div>
      </div>
    </section>
  )
}
