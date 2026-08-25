import { Activity, Cpu } from 'lucide-react'
import { ESP32Device } from './types'

interface DeviceHealthSummaryProps {
  devices: ESP32Device[]
}

export function DeviceHealthSummary({ devices }: DeviceHealthSummaryProps) {
  const totalNodes = devices.length

  const operationalSensors = devices.reduce((acc, d) => {
    let count = 0
    if (d.temperatureSensor.status === 'operational') count++
    if (d.humiditySensor.status === 'operational') count++
    return acc + count
  }, 0)
  const totalSensors = totalNodes * 2

  return (
    <div className="grid gap-4 sm:grid-cols-2">

      {/* Online ESP32 Microcontrollers */}
      <div className="rounded-xl border border-border bg-card p-5 transition-all hover:shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Active ESP32 Nodes</span>
          <div className="flex size-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400">
            <Cpu className="size-4.5" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight text-foreground">
          {totalNodes} <span className="text-sm font-normal text-muted-foreground">/ {totalNodes} </span>
        </div>
      </div>

      {/* Sensor Probe Integrity */}
      <div className="rounded-xl border border-border bg-card p-5 transition-all hover:shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Dual Sensor Probes</span>
          <div className="flex size-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
            <Activity className="size-4.5" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight text-foreground">
          {operationalSensors} <span className="text-sm font-normal text-muted-foreground">/ {totalSensors} </span>
        </div>

      </div>
    </div>
  )
}
