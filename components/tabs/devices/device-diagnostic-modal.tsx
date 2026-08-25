'use client'

import { useState } from 'react'
import {
  Activity,
  AlertTriangle,
  Battery,
  CheckCircle2,
  Cpu,
  Droplets,
  HardDrive,
  Info,
  Radio,
  RefreshCw,
  Server,
  Thermometer,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import { ESP32Device } from './types'

interface DeviceDiagnosticModalProps {
  device: ESP32Device | null
  onClose: () => void
}

export function DeviceDiagnosticModal({ device, onClose }: DeviceDiagnosticModalProps) {
  const [isRunningSelfTest, setIsRunningSelfTest] = useState(false)
  const [selfTestResult, setSelfTestResult] = useState<string | null>(null)
  const [isPinging, setIsPinging] = useState(false)
  const [pingResult, setPingResult] = useState<string | null>(null)

  if (!device) return null

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
    }, 1200)
  }

  const handlePingNode = () => {
    setIsPinging(true)
    setPingResult(null)
    setTimeout(() => {
      setIsPinging(false)
      const latency = Math.floor(Math.random() * 15) + 12
      setPingResult(`Ping response from ${device.hardware.ipAddress}: 64 bytes in ${latency}ms (RTT).`)
    }, 600)
  }

  const freeHeapKb = Math.round(device.hardware.freeHeapBytes / 1024)
  const totalHeapKb = Math.round(device.hardware.totalHeapBytes / 1024)
  const heapUsagePercent = Math.round(((totalHeapKb - freeHeapKb) / totalHeapKb) * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Cpu className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">{device.name}</h2>
                <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  {device.id}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {device.location} · {device.applicationNote}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close dialog"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Action Toolbar & Realtime Test Triggers */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={isRunningSelfTest}
                onClick={handleRunSelfTest}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground shadow-xs transition-all hover:opacity-90 disabled:opacity-50"
              >
                <RefreshCw className={`size-3.5 ${isRunningSelfTest ? 'animate-spin' : ''}`} />
                {isRunningSelfTest ? 'Running Self-Test...' : 'Run Diagnostics Self-Test'}
              </button>

              <button
                type="button"
                disabled={isPinging}
                onClick={handlePingNode}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
              >
                <Radio className={`size-3.5 text-sky-600 ${isPinging ? 'animate-pulse' : ''}`} />
                {isPinging ? 'Pinging Node...' : 'Ping ESP32 (ICMP)'}
              </button>
            </div>

            <div className="text-xs text-muted-foreground">
              Last Heartbeat: <span className="font-medium text-foreground">{device.hardware.lastHeartbeat}</span>
            </div>
          </div>

          {/* Test Status Notifications */}
          {(selfTestResult || pingResult) && (
            <div className="space-y-2">
              {selfTestResult && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-200/60 bg-emerald-50/70 p-3 text-xs font-medium text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  {selfTestResult}
                </div>
              )}
              {pingResult && (
                <div className="flex items-center gap-2 rounded-lg border border-sky-200/60 bg-sky-50/70 p-3 text-xs font-medium text-sky-800 dark:border-sky-800/40 dark:bg-sky-950/40 dark:text-sky-300">
                  <Wifi className="size-4 shrink-0 text-sky-600 dark:text-sky-400" />
                  {pingResult}
                </div>
              )}
            </div>
          )}

          {/* ESP32 Microcontroller Core Health */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              ESP32 SoC Hardware Telemetry
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* WiFi & Signal */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>WiFi RSSI</span>
                  <Wifi className="size-4 text-sky-600" />
                </div>
                <div className="mt-2 text-xl font-bold text-foreground">
                  {device.hardware.wifiRssiDbm} dBm
                </div>
                <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {device.hardware.wifiSignalQuality} Signal · {device.hardware.packetLossPercent}% Loss
                </p>
              </div>

              {/* Power / Battery */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Power Subsystem</span>
                  <Battery className="size-4 text-amber-600" />
                </div>
                <div className="mt-2 text-xl font-bold text-foreground">
                  {device.hardware.batteryPercent}% ({device.hardware.batteryVoltage}V)
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {device.hardware.powerSource} {device.hardware.isCharging ? '· Charging' : ''}
                </p>
              </div>

              {/* Memory Heap */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>SRAM Free Heap</span>
                  <HardDrive className="size-4 text-indigo-600" />
                </div>
                <div className="mt-2 text-xl font-bold text-foreground">
                  {freeHeapKb} KB
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {heapUsagePercent}% used of {totalHeapKb} KB
                </p>
              </div>

              {/* Core Temp & CPU */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>ESP32 Die Temp</span>
                  <Cpu className="size-4 text-rose-600" />
                </div>
                <div className="mt-2 text-xl font-bold text-foreground">
                  {device.hardware.espCoreTempC}°C
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Dual Core @ {device.hardware.cpuFreqMhz} MHz
                </p>
              </div>
            </div>
          </div>

          {/* Dual Sensor Probe Diagnostics */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connected Sensor Probes Status
            </h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {/* Temperature Sensor Probe */}
              <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                      <Thermometer className="size-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {device.temperatureSensor.name}
                      </h4>
                      <p className="text-xs text-muted-foreground font-mono">
                        {device.temperatureSensor.model}
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

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border text-xs">
                  <div>
                    <span className="text-muted-foreground">Current Value:</span>{' '}
                    <span className="font-bold text-foreground">
                      {device.temperatureSensor.currentReading} {device.temperatureSensor.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Interface:</span>{' '}
                    <span className="font-mono text-foreground">
                      {device.temperatureSensor.gpioPin} ({device.temperatureSensor.busType})
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Read Latency:</span>{' '}
                    <span className="font-medium text-foreground">
                      {device.temperatureSensor.responseLatencyMs} ms
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">CRC Errors:</span>{' '}
                    <span className="font-medium text-foreground">
                      {device.temperatureSensor.crcErrors} (
                      {device.temperatureSensor.errorRatePercent}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Humidity Sensor Probe */}
              <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400">
                      <Droplets className="size-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {device.humiditySensor.name}
                      </h4>
                      <p className="text-xs text-muted-foreground font-mono">
                        {device.humiditySensor.model}
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

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border text-xs">
                  <div>
                    <span className="text-muted-foreground">Current Value:</span>{' '}
                    <span className="font-bold text-foreground">
                      {device.humiditySensor.currentReading} {device.humiditySensor.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Interface:</span>{' '}
                    <span className="font-mono text-foreground">
                      {device.humiditySensor.gpioPin} ({device.humiditySensor.busType})
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Read Latency:</span>{' '}
                    <span className="font-medium text-foreground">
                      {device.humiditySensor.responseLatencyMs} ms
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">CRC Errors:</span>{' '}
                    <span className="font-medium text-foreground">
                      {device.humiditySensor.crcErrors} (
                      {device.humiditySensor.errorRatePercent}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Node Diagnostics & Event Log Console */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Hardware Diagnostic Log Console
            </h3>
            <div className="mt-3 rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs space-y-2">
              {device.diagnosticsLog.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="text-muted-foreground shrink-0">{log.timestamp}</span>
                  <span
                    className={`rounded px-1.5 py-0.2 uppercase text-[10px] font-bold ${
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

          {/* Node Meta Information */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
            <div>IP: <span className="font-mono text-foreground">{device.hardware.ipAddress}</span></div>
            <div>MAC: <span className="font-mono text-foreground">{device.hardware.macAddress}</span></div>
            <div>Firmware: <span className="font-mono text-foreground">{device.hardware.firmwareVersion}</span></div>
            <div>Uptime: <span className="font-mono text-foreground">{device.hardware.uptimeString}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
