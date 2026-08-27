'use client'

import {
  Droplets,
  Thermometer,
  Wind,
  Activity,
  ArrowRight,
} from 'lucide-react'

const readings = [
  {
    id: 'DR-001',
    name: 'Temperature sensor',
    value: '27.4°C',
    location: 'Mangalore, Karnataka',
    status: 'Normal',
    icon: Thermometer,
    iconStyle:
      'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400',
  },
  {
    id: 'DR-002',
    name: 'Humidity sensor',
    value: '65%',
    location: 'Udupi, Karnataka',
    status: 'Normal',
    icon: Droplets,
    iconStyle:
      'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400',
  },
  {
    id: 'DR-003',
    name: 'Gas & Air Quality',
    value: '62 ppm',
    location: 'Bengaluru, Karnataka',
    status: 'Warning',
    icon: Wind,
    iconStyle:
      'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
  },
  {
    id: 'DR-004',
    name: 'Temperature sensor',
    value: '26.0°C',
    location: 'Mysuru, Karnataka',
    status: 'Normal',
    icon: Thermometer,
    iconStyle:
      'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400',
  },
  {
    id: 'DR-005',
    name: 'Gas & Air Quality',
    value: '28 ppm',
    location: 'Hubballi, Karnataka',
    status: 'Normal',
    icon: Wind,
    iconStyle:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  },
  {
    id: 'DR-006',
    name: 'Multi-Sensor Node',
    value: '45 ppm (Alert)',
    location: 'Belagavi, Karnataka',
    status: 'Warning',
    icon: Activity,
    iconStyle:
      'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
  },
]

interface RecentDevicesProps {
  onViewAll?: () => void
  onInspectDevice?: (deviceId: string) => void
}

export function RecentDevices({ onViewAll, onInspectDevice }: RecentDevicesProps = {}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Device Menu
          </h3>

          <p className="mt-0.5 text-xs text-muted-foreground">
            Active sensors & telemetry
          </p>
        </div>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-primary transition hover:bg-primary/10"
          >
            View all
            <ArrowRight className="size-3.5" />
          </button>
        )}
      </div>

      <div className="flex-1 divide-y divide-border overflow-y-auto max-h-[520px]">
        {readings.map((device) => {
          const Icon = device.icon

          return (
            <div
              key={device.id}
              onClick={() => onInspectDevice?.(device.id)}
              className={`flex items-center gap-3 px-5 py-4 transition ${
                onInspectDevice ? 'cursor-pointer hover:bg-muted/40' : ''
              }`}
              title={onInspectDevice ? 'Click to inspect in Devices tab' : undefined}
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