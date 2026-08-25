'use client'

import { MapPin } from 'lucide-react'

const locations = [
  {
    name: 'Karnataka',
    sensors: 8,
    online: 8,
  },
  {
    name: 'Maharashtra',
    sensors: 6,
    online: 5,
  },
  {
    name: 'Andhra Pradesh',
    sensors: 5,
    online: 4,
  },
  {
    name: 'Tamil Nadu',
    sensors: 3,
    online: 3,
  },
  {
    name: 'Telangana',
    sensors: 2,
    online: 1,
  },
]

export function ProjectLocations() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">
          Sensor locations
        </h3>

        <p className="mt-1 text-xs text-muted-foreground">
          Sensors grouped by location.
        </p>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-5">
        {locations.map((location) => {
          const allOnline = location.online === location.sensors

          return (
            <div
              key={location.name}
              className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
                  <MapPin className="size-4" />
                </div>

                <span
                  className={`size-2 rounded-full ${
                    allOnline
                      ? 'bg-emerald-500'
                      : 'bg-amber-500'
                  }`}
                />
              </div>

              <p className="mt-3 text-sm font-semibold text-foreground">
                {location.name}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {location.sensors} sensors
              </p>

              <p
                className={`mt-1 text-xs ${
                  allOnline
                    ? 'text-emerald-600'
                    : 'text-amber-600'
                }`}
              >
                {location.online} online
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectLocations