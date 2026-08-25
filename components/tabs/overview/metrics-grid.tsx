'use client'

import {
  Bell,
  Droplets,
  Thermometer,
  Wifi,
} from 'lucide-react'

const metrics = [
  {
    title: 'Active sensors',
    value: '24',
    subtitle: '3 added this month',
    icon: Thermometer,
    iconStyle: 'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400',
  },
  {
    title: 'Online now',
    value: '21',
    subtitle: '87.5% of sensors',
    icon: Wifi,
    iconStyle:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  },
  {
    title: 'Active alerts',
    value: '3',
    subtitle: '2 need attention',
    icon: Bell,
    iconStyle:
      'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
  },
  {
    title: 'Avg. humidity',
    value: '62%',
    subtitle: 'Within normal range',
    icon: Droplets,
    iconStyle:
      'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400',
  },
]

export function MetricsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon

        return (
          <div
            key={metric.title}
            className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {metric.title}
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                  {metric.value}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {metric.subtitle}
                </p>
              </div>

              <div
                className={`flex size-10 items-center justify-center rounded-lg ${metric.iconStyle}`}
              >
                <Icon className="size-5" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MetricsGrid