'use client'

import { useState } from 'react'
import { Droplets, Thermometer } from 'lucide-react'

const temperatureData = [
  25, 26, 26.5, 27, 28, 27.5,
  29, 30, 29, 28, 27.5, 28,
  29.5, 31, 30, 29, 28.5, 29,
  30, 32, 31, 29.5, 28.5, 28,
]

const humidityData = [
  58, 60, 61, 63, 65, 64,
  66, 68, 67, 65, 64, 62,
  64, 69, 72, 70, 68, 66,
  67, 71, 74, 70, 65, 62,
]

export function SensorActivityChart() {
  const [activeSensor, setActiveSensor] = useState<
    'temperature' | 'humidity'
  >('temperature')

  const data =
    activeSensor === 'temperature'
      ? temperatureData
      : humidityData

  const max =
    activeSensor === 'temperature' ? 35 : 80

  const min =
    activeSensor === 'temperature' ? 20 : 40

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex flex-col gap-4 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Sensor activity
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Temperature and humidity readings over the last 24 hours.
          </p>
        </div>

        <div className="flex rounded-lg border border-border bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setActiveSensor('temperature')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium ${
              activeSensor === 'temperature'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground'
            }`}
          >
            <Thermometer className="size-3.5" />
            Temperature
          </button>

          <button
            type="button"
            onClick={() => setActiveSensor('humidity')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium ${
              activeSensor === 'humidity'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground'
            }`}
          >
            <Droplets className="size-3.5" />
            Humidity
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex h-56 items-end gap-1 sm:gap-2">
          {data.map((value, index) => {
            const height =
              ((value - min) / (max - min)) * 100

            return (
              <div
                key={index}
                className="group relative flex h-full flex-1 items-end"
              >
                <div
                  className={`w-full rounded-t-md transition-all group-hover:opacity-80 ${
                    activeSensor === 'temperature'
                      ? 'bg-sky-400'
                      : 'bg-cyan-400'
                  }`}
                  style={{
                    height: `${Math.max(height, 8)}%`,
                  }}
                />

                <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-[10px] text- group-hover:block">
                  {value}
                  {activeSensor === 'temperature'
                    ? '°C'
                    : '%'}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-3 flex justify-between text-[11px] text-muted-foreground">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>Now</span>
        </div>
      </div>
    </div>
  )
}

export default SensorActivityChart