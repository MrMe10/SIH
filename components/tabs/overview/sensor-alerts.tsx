'use client'

import {
  AlertTriangle,
  Droplets,
  Thermometer,
} from 'lucide-react'

interface Sensor {
  id: string
  location: string
  temperature: number
  humidity: number
}

const sensors: Sensor[] = [
  {
    id: 'DR-001',
    location: 'Karnataka',
    temperature: 27.4,
    humidity: 56,
  },
  {
    id: 'DR-002',
    location: 'Maharashtra',
    temperature: 29.8,
    humidity: 78,
  },
  {
    id: 'DR-003',
    location: 'Andhra Pradesh',
    temperature: 32.1,
    humidity: 73,
  },
  {
    id: 'DR-004',
    location: 'Tamil Nadu',
    temperature: 26.9,
    humidity: 54,
  },
  {
    id: 'DR-005',
    location: 'Telangana',
    temperature: 28.6,
    humidity: 61,
  },
]

function getAlerts(sensor: Sensor) {
  const alerts = []

  if (sensor.temperature >= 32) {
    alerts.push({
      id: `${sensor.id}-temperature`,
      title: 'High temperature',
      value: `${sensor.temperature}°C`,
      type: 'critical',
      icon: Thermometer,
      message: 'Temperature is above the normal range.',
    })
  } else if (sensor.temperature >= 30) {
    alerts.push({
      id: `${sensor.id}-temperature`,
      title: 'Temperature warning',
      value: `${sensor.temperature}°C`,
      type: 'warning',
      icon: Thermometer,
      message: 'Temperature is getting higher than normal.',
    })
  }

  if (sensor.humidity >= 75) {
    alerts.push({
      id: `${sensor.id}-humidity`,
      title: 'High humidity',
      value: `${sensor.humidity}%`,
      type: 'critical',
      icon: Droplets,
      message: 'Humidity is above the normal range.',
    })
  } else if (sensor.humidity >= 70) {
    alerts.push({
      id: `${sensor.id}-humidity`,
      title: 'Humidity warning',
      value: `${sensor.humidity}%`,
      type: 'warning',
      icon: Droplets,
      message: 'Humidity is getting higher than normal.',
    })
  }

  return alerts
}

export function SensorAlerts() {
  const alerts = sensors.flatMap(getAlerts)

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Sensor alerts
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Sensors that need your attention.
          </p>
        </div>

        <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
          {alerts.length} active
        </span>
      </div>

      <div className="p-5">
        {alerts.length === 0 ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Everything looks normal.
            </p>

            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-500">
              No temperature or humidity alerts right now.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon = alert.icon
              const critical = alert.type === 'critical'

              return (
                <div
                  key={alert.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 ${
                    critical
                      ? 'border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30'
                      : 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30'
                  }`}
                >
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                      critical
                        ? 'bg-rose-100 dark:bg-rose-900/40'
                        : 'bg-amber-100 dark:bg-amber-900/40'
                    }`}
                  >
                    <Icon
                      className={`size-4 ${
                        critical
                          ? 'text-rose-600'
                          : 'text-amber-600'
                      }`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">
                        {alert.title}
                      </p>

                      <span
                        className={`shrink-0 text-sm font-semibold ${
                          critical
                            ? 'text-rose-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {alert.value}
                      </span>
                    </div>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {alert.message}
                    </p>

                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {alert.id.split('-')[0]} · sensor location
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SensorAlerts