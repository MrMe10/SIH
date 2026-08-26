import { Activity, Cpu, ChevronDown, Server } from 'lucide-react'
import { ESP32Device } from './types'

interface DeviceHealthSummaryProps {
  devices: ESP32Device[]
  parentModuleName?: string
  parentModuleId?: string
  onSelectParentModule?: () => void
}

export function DeviceHealthSummary({
  devices,
  parentModuleName = 'DHRISHTI Master Gateway',
  parentModuleId = 'DHR-GW-KA01',
  onSelectParentModule,
}: DeviceHealthSummaryProps) {
  const totalNodes = devices.length

  const operationalSensors = devices.reduce((acc, d) => {
    let count = 0
    if (d.temperatureSensor.status === 'operational') count++
    if (d.humiditySensor.status === 'operational') count++
    return acc + count
  }, 0)
  const totalSensors = totalNodes * 2

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {/* Parent Controller / Gateway Module (Clickable to switch parent module) */}
      <div
        role="button"
        tabIndex={0}
        onClick={onSelectParentModule}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelectParentModule?.()
          }
        }}
        className="group relative rounded-xl border border-border bg-card p-5 transition-all hover:border-emerald-500/50 hover:shadow-md cursor-pointer select-none focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-muted-foreground">Parent Module</span>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              Switch <ChevronDown className="size-3" />
            </span>
          </div>
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 group-hover:scale-105 transition-transform">
            <Server className="size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div
            className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
            title={parentModuleName}
          >
            {parentModuleName}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-foreground/80">{parentModuleId}</span>
            <span>·</span>
            <span>{totalNodes} Nodes Attached</span>
          </div>
        </div>
      </div>

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

