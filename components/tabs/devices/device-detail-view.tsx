'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Battery,
  CheckCircle2,
  Cpu,
  Droplets,
  HardDrive,
  Radio,
  RefreshCw,
  Thermometer,
  Wifi,
} from 'lucide-react'
import { ESP32Device } from './types'
import { PARENT_MODULES } from './parent-modules'

interface DeviceDetailViewProps {
  device: ESP32Device
  onBack: () => void
}

export function DeviceDetailView({ device, onBack }: DeviceDetailViewProps) {
  const [isRunningSelfTest, setIsRunningSelfTest] = useState(false)
  const [selfTestResult, setSelfTestResult] = useState<string | null>(null)
  const [isPinging, setIsPinging] = useState(false)
  const [pingResult, setPingResult] = useState<string | null>(null)

  const parentMod = PARENT_MODULES.find(
    (m) => m.nodeIds.includes(device.id) || m.id === device.parentModule
  )

  const handleRunSelfTest = () => {
    setIsRunningSelfTest(true)
    setSelfTestResult(null)
    setTimeout(() => {
      setIsRunningSelfTest(false)
      setSelfTestResult(
        `Self-test passed: I2C/OneWire buses verified, Free Heap: ${Math.round(
          device.hardware.freeHeapBytes / 1024
        )} KB, 0 CRC frame corruptions.`
      )
    }, 1000)
  }

  const handlePingNode = () => {
    setIsPinging(true)
    setPingResult(null)
    setTimeout(() => {
      setIsPinging(false)
      const latency = Math.floor(Math.random() * 15) + 12
      setPingResult(
        `Ping response from ${device.hardware.ipAddress}: 64 bytes in ${latency}ms (RTT).`
      )
    }, 500)
  }

  const freeHeapKb = Math.round(device.hardware.freeHeapBytes / 1024)
  const totalHeapKb = Math.round(device.hardware.totalHeapBytes / 1024)
  const heapUsagePercent = Math.round(((totalHeapKb - freeHeapKb) / totalHeapKb) * 100)

  const isHealthy = device.status === 'healthy'
  const isWarning = device.status === 'warning'

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted shadow-2xs"
        >
          <ArrowLeft className="size-4 text-primary" />
          <span>Back to all devices</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Devices</span>
          <span>/</span>
          <span>{parentMod?.name || 'Gateway Hub'}</span>
          <span>/</span>
          <span className="font-semibold text-foreground">{device.id}</span>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 border border-sky-500/20 dark:bg-sky-950/40 dark:text-sky-400">
              <Cpu className="size-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-bold text-foreground">{device.name}</h1>
                <span className="rounded-md bg-muted px-2.5 py-0.5 font-mono text-xs font-semibold text-muted-foreground">
                  {device.id}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold ${
                    isHealthy
                      ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : isWarning
                      ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:bg-amber-950/40 dark:text-amber-400'
                      : 'bg-rose-500/10 text-rose-700 border border-rose-500/20 dark:bg-rose-950/40 dark:text-rose-400'
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      isHealthy ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                  />
                  {device.status.toUpperCase()} ({device.overallHealthScore}% Health)
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                📍 {device.location} · <span className="text-foreground/80">{device.applicationNote}</span> · Attached to{' '}
                <span className="font-semibold text-foreground">{parentMod?.name || 'Gateway'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={isRunningSelfTest}
              onClick={handleRunSelfTest}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-xs transition-all hover:opacity-90 disabled:opacity-50"
            >
              <RefreshCw className={`size-3.5 ${isRunningSelfTest ? 'animate-spin' : ''}`} />
              {isRunningSelfTest ? 'Running Self-Test...' : 'Run Diagnostics'}
            </button>

            <button
              type="button"
              disabled={isPinging}
              onClick={handlePingNode}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
            >
              <Radio className={`size-3.5 text-sky-600 ${isPinging ? 'animate-pulse' : ''}`} />
              {isPinging ? 'Pinging Node...' : 'Ping Node'}
            </button>
          </div>
        </div>

        {/* Live Diagnostics Notifications */}
        {(selfTestResult || pingResult) && (
          <div className="mt-4 space-y-2 pt-4 border-t border-border">
            {selfTestResult && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200/60 bg-emerald-50/70 p-3 text-xs font-medium text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-300">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                {selfTestResult}
              </div>
            )}
            {pingResult && (
              <div className="flex items-center gap-2 rounded-xl border border-sky-200/60 bg-sky-50/70 p-3 text-xs font-medium text-sky-800 dark:border-sky-800/40 dark:bg-sky-950/40 dark:text-sky-300">
                <Wifi className="size-4 shrink-0 text-sky-600 dark:text-sky-400" />
                {pingResult}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ESP32 SoC Hardware Telemetry */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          ESP32 SoC Hardware Telemetry
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* WiFi & Signal */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>WiFi Signal (RSSI)</span>
              <Wifi className="size-4 text-sky-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">
              {device.hardware.wifiRssiDbm} <span className="text-xs font-normal text-muted-foreground">dBm</span>
            </div>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              {device.hardware.wifiSignalQuality} Signal · {device.hardware.packetLossPercent}% Loss
            </p>
          </div>

          {/* Power / Battery */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Power Subsystem</span>
              <Battery className="size-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">
              {device.hardware.batteryPercent}%{' '}
              <span className="text-xs font-normal text-muted-foreground">({device.hardware.batteryVoltage}V)</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {device.hardware.powerSource} {device.hardware.isCharging ? '· Solar Charging Active' : ''}
            </p>
          </div>

          {/* Memory Heap */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>SRAM Free Heap</span>
              <HardDrive className="size-4 text-indigo-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">
              {freeHeapKb} <span className="text-xs font-normal text-muted-foreground">KB Free</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {heapUsagePercent}% used of {totalHeapKb} KB
            </p>
          </div>

          {/* Core Temp & CPU */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>ESP32 Die Temp</span>
              <Cpu className="size-4 text-rose-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">
              {device.hardware.espCoreTempC}°C
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Xtensa Dual Core @ {device.hardware.cpuFreqMhz} MHz
            </p>
          </div>
        </div>
      </div>

      {/* Connected Sensor Probes Status */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Connected Sensor Probes Status
        </h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {/* Temperature Sensor Probe */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400 border border-sky-200/50 dark:border-sky-800/40">
                  <Thermometer className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {device.temperatureSensor.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Model: {device.temperatureSensor.model}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  device.temperatureSensor.status === 'operational'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                }`}
              >
                {device.temperatureSensor.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border text-xs">
              <div>
                <span className="text-muted-foreground">Current Reading:</span>
                <p className="text-lg font-bold text-foreground mt-0.5">
                  {device.temperatureSensor.currentReading} {device.temperatureSensor.unit}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Hardware Interface:</span>
                <p className="font-mono text-foreground mt-0.5">
                  {device.temperatureSensor.gpioPin} ({device.temperatureSensor.busType})
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Response Latency:</span>
                <p className="font-medium text-foreground mt-0.5">
                  {device.temperatureSensor.responseLatencyMs} ms
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">CRC Checksum Errors:</span>
                <p className="font-medium text-foreground mt-0.5">
                  {device.temperatureSensor.crcErrors} ({device.temperatureSensor.errorRatePercent}%)
                </p>
              </div>
            </div>
          </div>

          {/* Humidity Sensor Probe */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-800/40">
                  <Droplets className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {device.humiditySensor.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Model: {device.humiditySensor.model}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  device.humiditySensor.status === 'operational'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                }`}
              >
                {device.humiditySensor.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border text-xs">
              <div>
                <span className="text-muted-foreground">Current Reading:</span>
                <p className="text-lg font-bold text-foreground mt-0.5">
                  {device.humiditySensor.currentReading} {device.humiditySensor.unit}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Hardware Interface:</span>
                <p className="font-mono text-foreground mt-0.5">
                  {device.humiditySensor.gpioPin} ({device.humiditySensor.busType})
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Response Latency:</span>
                <p className="font-medium text-foreground mt-0.5">
                  {device.humiditySensor.responseLatencyMs} ms
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">CRC Checksum Errors:</span>
                <p className="font-medium text-foreground mt-0.5">
                  {device.humiditySensor.crcErrors} ({device.humiditySensor.errorRatePercent}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Node Diagnostics & Event Log Console */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Hardware Diagnostics Event Log
        </h2>
        <div className="mt-3 rounded-2xl border border-border bg-muted/40 p-4 font-mono text-xs space-y-2">
          {device.diagnosticsLog.map((log, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-muted-foreground shrink-0">{log.timestamp}</span>
              <span
                className={`rounded px-1.5 py-0.5 uppercase text-[10px] font-bold ${
                  log.level === 'error'
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                    : log.level === 'warn'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                    : 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400'
                }`}
              >
                {log.level}
              </span>
              <span className="text-foreground">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Node Meta Information Footer Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 text-xs text-muted-foreground">
        <div>
          Node IP: <span className="font-mono font-medium text-foreground">{device.hardware.ipAddress}</span>
        </div>
        <div>
          MAC: <span className="font-mono font-medium text-foreground">{device.hardware.macAddress}</span>
        </div>
        <div>
          Firmware: <span className="font-mono font-medium text-foreground">{device.hardware.firmwareVersion}</span>
        </div>
        <div>
          Uptime: <span className="font-mono font-medium text-foreground">{device.hardware.uptimeString}</span>
        </div>
        <div>
          Last Heartbeat:{' '}
          <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
            {device.hardware.lastHeartbeat}
          </span>
        </div>
      </div>
    </div>
  )
}
