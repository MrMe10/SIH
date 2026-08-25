'use client'

import {
  CheckCircle2,
  CircleAlert,
  WifiOff,
} from 'lucide-react'

const health = {
  normal: 18,
  warning: 4,
  critical: 1,
  offline: 1,
}

const total =
  health.normal +
  health.warning +
  health.critical +
  health.offline

export function SensorHealth() {
  const onlinePercentage = Math.round(
    ((health.normal + health.warning + health.critical) / total) * 100
  )

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">
          Sensor status
        </h3>

        <p className="mt-1 text-xs text-muted-foreground">
          Current condition of connected sensors.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
          <CheckCircle2 className="size-5 text-emerald-600" />

          <p className="mt-3 text-2xl font-semibold text-foreground">
            {health.normal}
          </p>

          <p className="text-xs text-muted-foreground">
            Normal
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
          <CircleAlert className="size-5 text-amber-600" />

          <p className="mt-3 text-2xl font-semibold text-foreground">
            {health.warning}
          </p>

          <p className="text-xs text-muted-foreground">
            Warning
          </p>
        </div>

        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950/30">
          <CircleAlert className="size-5 text-rose-600" />

          <p className="mt-3 text-2xl font-semibold text-foreground">
            {health.critical}
          </p>

          <p className="text-xs text-muted-foreground">
            Critical
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/30">
          <WifiOff className="size-5 text-slate-600" />

          <p className="mt-3 text-2xl font-semibold text-foreground">
            {health.offline}
          </p>

          <p className="text-xs text-muted-foreground">
            Offline
          </p>
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Sensors online
          </span>

          <span className="text-xs font-semibold text-foreground">
            {onlinePercentage}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${onlinePercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default SensorHealth