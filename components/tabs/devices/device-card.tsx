'use client'

import { Battery, MapPin, MoreVertical, Radio, Thermometer } from 'lucide-react'
import { Device } from '@/types/iot'

interface DeviceCardProps {
  device: Device
}

export function DeviceCard({ device }: DeviceCardProps) {
  const Icon = device.icon || Thermometer
  const isOnline = device.status === 'Online'
  const isWarning = device.status === 'Warning'

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-border/80 hover:shadow-xs">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 items-center justify-center rounded-lg ${
                device.bg || 'bg-muted'
              }`}
            >
              <Icon className={`size-5 ${device.color || 'text-foreground'}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground leading-snug">{device.name}</h3>
              <p className="text-xs text-muted-foreground font-mono">{device.id}</p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Device actions"
          >
            <MoreVertical className="size-4" />
          </button>
        </div>

        <div className="mt-5 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {device.value}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                : isWarning
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                isOnline ? 'bg-emerald-500' : isWarning ? 'bg-rose-500' : 'bg-muted-foreground'
              }`}
            />
            {device.status}
          </span>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-3.5 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          {device.location}
        </span>
        {device.battery && (
          <span className="flex items-center gap-1.5">
            <Battery className="size-3.5" />
            {device.battery}
          </span>
        )}
      </div>
    </div>
  )
}
