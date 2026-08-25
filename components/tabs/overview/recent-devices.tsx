'use client'

import {
  Droplets,
  Thermometer,
} from 'lucide-react'

const readings = [
  {
    id: 'DR-001',
    name: 'Temperature sensor',
    value: '27.4°C',
    location: 'Karnataka',
    status: 'Normal',
    icon: Thermometer,
    iconStyle:
      'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400',
  },
  {
    id: 'DR-002',
    name: 'Humidity sensor',
    value: '78%',
    location: 'Maharashtra',
    status: 'Warning',
    icon: Droplets,
    iconStyle:
      'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400',
  },
  {
    id: 'DR-003',
    name: 'Temperature sensor',
    value: '32.1°C',
    location: 'Andhra Pradesh',
    status: 'Alert',
    icon: Thermometer,
    iconStyle:
      'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
  },
  {
    id: 'DR-004',
    name: 'Humidity sensor',
    value: '54%',
    location: 'Tamil Nadu',
    status: 'Normal',
    icon: Droplets,
    iconStyle:
      'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400',
  },
]

export function RecentDevices() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">
          Recent readings
        </h3>

        <p className="mt-1 text-xs text-muted-foreground">
          Latest values received from sensors.
        </p>
      </div>

      <div className="divide-y divide-border">
        {readings.map((device) => {
          const Icon = device.icon

          return (
            <div
              key={device.id}
              className="flex items-center gap-3 px-5 py-4"
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${device.iconStyle}`}
              >
                <Icon className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {device.name}
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {device.id} · {device.location}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {device.value}
                </p>

                <p
                  className={`mt-0.5 text-[11px] ${
                    device.status === 'Normal'
                      ? 'text-emerald-600'
                      : device.status === 'Warning'
                        ? 'text-amber-600'
                        : 'text-rose-600'
                  }`}
                >
                  {device.status}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecentDevices