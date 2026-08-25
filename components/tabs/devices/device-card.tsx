'use client'

import {
  Activity,
  Battery,
  Cpu,
  Droplets,
  HardDrive,
  Thermometer,
  Wifi,
} from 'lucide-react'
import { ESP32Device } from './types'

interface DeviceCardProps {
  device: ESP32Device
  onInspect: (device: ESP32Device) => void
}

export function DeviceCard({ device, onInspect }: DeviceCardProps) {
  const isHealthy = device.status === 'healthy'
  const isWarning = device.status === 'warning'
  const freeHeapKb = Math.round(device.hardware.freeHeapBytes / 1024)

  // Clean probe model display name (e.g. SHT31, DS18B20, BME280)
  const tempModel = device.temperatureSensor.model.split(' ')[0]
  const humModel = device.humiditySensor.model.split(' ')[0]

  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-5 transition-all hover:border-border/80 hover:shadow-xs xl:flex-row xl:items-center xl:justify-between">
      {/* 1. Device Info */}
      <div className="flex items-center gap-3.5 min-w-[240px] xl:w-[280px] shrink-0">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/40">
          <Cpu className="size-5.5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground truncate text-sm sm:text-base leading-snug">
            {device.name}
          </h3>
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {device.location} · <span className="font-mono text-[11px] opacity-80">{device.hardware.uptimeString}</span>
          </p>
        </div>
      </div>

      {/* 2. ESP32 SoC Telemetry Stats (WiFi, Power, Heap) */}
      <div className="grid grid-cols-3 gap-3 rounded-lg border border-border/60 bg-muted/30 px-3.5 py-2 text-xs shrink-0">
        {/* WiFi RSSI */}
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
            <Wifi className="size-3 text-sky-500" /> WiFi
          </span>
          <span
            className={`font-mono font-semibold mt-0.5 ${
              device.hardware.wifiRssiDbm > -70
                ? 'text-emerald-600 dark:text-emerald-400'
                : device.hardware.wifiRssiDbm > -85
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {device.hardware.wifiRssiDbm} <span className="text-[10px] font-normal text-muted-foreground">dBm</span>
          </span>
        </div>

        {/* Power Subsystem */}
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
            <Battery className="size-3 text-amber-500" /> Power
          </span>
          <span
            className={`font-mono font-semibold mt-0.5 ${
              device.hardware.batteryPercent > 50
                ? 'text-foreground'
                : device.hardware.batteryPercent > 25
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {device.hardware.batteryPercent}%{' '}
            <span className="text-[10px] font-normal text-muted-foreground">({device.hardware.batteryVoltage}V)</span>
          </span>
        </div>

        {/* Free Heap */}
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
            <HardDrive className="size-3 text-indigo-500" /> Heap
          </span>
          <span className="font-mono font-semibold text-foreground mt-0.5">
            {freeHeapKb} <span className="text-[10px] font-normal text-muted-foreground">KB</span>
          </span>
        </div>
      </div>

      {/* 3. Dual Sensor Probes (Temperature & Humidity) */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Temperature Probe Box */}
        <div className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-card px-3.5 py-2 min-w-[145px]">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400">
            <Thermometer className="size-4" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Temp ({tempModel})
            </p>
            <p className="text-sm font-bold tracking-tight text-foreground">
              {device.temperatureSensor.currentReading}{' '}
              <span className="text-xs font-normal text-muted-foreground">
                {device.temperatureSensor.unit}
              </span>
            </p>
          </div>
        </div>

        {/* Humidity Probe Box */}
        <div className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-card px-3.5 py-2 min-w-[145px]">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400">
            <Droplets className="size-4" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Humidity ({humModel})
            </p>
            <p className="text-sm font-bold tracking-tight text-foreground">
              {device.humiditySensor.currentReading}{' '}
              <span className="text-xs font-normal text-muted-foreground">
                {device.humiditySensor.unit}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 4. Health Score Badge & Diagnostics Trigger */}
      <div className="flex items-center justify-between gap-3 border-t border-border pt-3 xl:border-t-0 xl:pt-0 shrink-0">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            isHealthy
              ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40'
              : isWarning
              ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40'
              : 'bg-rose-500/10 text-rose-700 border border-rose-500/20 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/40'
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              isHealthy ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-rose-500'
            }`}
          />
          {device.overallHealthScore}% Health
        </span>

        <button
          type="button"
          onClick={() => onInspect(device)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-muted hover:text-primary shadow-2xs"
        >
          <Activity className="size-3.5 text-sky-500" />
          Diagnostics
        </button>
      </div>
    </div>
  )
}
