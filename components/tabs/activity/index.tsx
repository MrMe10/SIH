'use client'

import dynamic from 'next/dynamic'
import { activityLogs } from '@/lib/mock-data'
import { ActivityItem } from './activity-item'

const DeviceMap = dynamic(() => import('./device-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-xl border border-border bg-card">
      <p className="text-sm text-muted-foreground">
        Loading device map...
      </p>
    </div>
  ),
})

export function ActivityTab() {
  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Activity
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor temperature and humidity sensors.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">

        {/* Temperature */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Average Temperature
              </p>

              <p className="mt-2 text-2xl font-semibold">
                27.4°C
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                Normal
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              🌡️
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Average Humidity
              </p>

              <p className="mt-2 text-2xl font-semibold">
                56%
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                Normal
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              💧
            </div>
          </div>
        </div>

        {/* Sensors */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Active Sensors
              </p>

              <p className="mt-2 text-2xl font-semibold">
                24
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                21 online
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              📡
            </div>
          </div>
        </div>

      </div>

      {/* Device Map */}
      <DeviceMap />

      {/* Recent Activity */}
      <div>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-foreground">
            Recent Sensor Activity
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest temperature and humidity readings.
          </p>
        </div>

        <div className="space-y-3">
          {activityLogs.map((event) => (
            <ActivityItem
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default ActivityTab