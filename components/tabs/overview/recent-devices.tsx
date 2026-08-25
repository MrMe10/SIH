'use client'

import { initialDevices } from '@/lib/mock-data'
import { Thermometer } from 'lucide-react'

interface RecentDevicesProps {
  onViewAll?: () => void
}

export function RecentDevices({ onViewAll }: RecentDevicesProps) {
  // Show first 3 recent devices for summary view
  const recentList = initialDevices.slice(0, 3)

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground">Recent devices</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Latest device readings</p>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
        >
          View all
        </button>
      </div>

      <div className="mt-5 divide-y divide-border">
        {recentList.map(({ name, id, value, status, icon: Icon = Thermometer, color, bg }) => (
          <div key={id} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
            <div
              className={`flex size-10 items-center justify-center rounded-lg ${
                bg || 'bg-muted'
              }`}
            >
              <Icon className={`size-4.5 ${color || 'text-foreground'}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{name}</p>
              <p className="text-xs text-muted-foreground">{id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{value}</p>
              <p className="flex items-center justify-end gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
