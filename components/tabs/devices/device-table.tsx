'use client'

import {
  Activity,
  Battery,
  BatteryCharging,
  Cpu,
  Droplets,
  HardDrive,
  MapPin,
  Thermometer,
  Wifi,
} from 'lucide-react'
import { ESP32Device } from './types'
import { PARENT_MODULES } from './parent-modules'

interface DeviceTableProps {
  devices: ESP32Device[]
  onInspect: (device: ESP32Device) => void
}

export function DeviceTable({ devices, onInspect }: DeviceTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="px-4 py-3.5">
                Node / Device
              </th>
              <th scope="col" className="px-4 py-3.5">
                Status & Health
              </th>
              <th scope="col" className="px-4 py-3.5">
                Temp Sensor
              </th>
              <th scope="col" className="px-4 py-3.5">
                Humidity Sensor
              </th>
              <th scope="col" className="px-4 py-3.5">
                Radio & Power
              </th>
              <th scope="col" className="px-4 py-3.5">
                Network & System
              </th>
              <th scope="col" className="px-4 py-3.5 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground">
            {devices.map((device) => {
              const isHealthy = device.status === 'healthy'
              const isWarning = device.status === 'warning'
              const freeHeapKb = Math.round(device.hardware.freeHeapBytes / 1024)
              const tempProbe = device.temperatureSensor
              const humProbe = device.humiditySensor

              const isTempOperational = tempProbe.status === 'operational'
              const isHumOperational = humProbe.status === 'operational'

              const parentMod = PARENT_MODULES.find(
                (m) => m.nodeIds.includes(device.id) || m.id === device.parentModule
              )
              const parentModId = parentMod?.id || device.parentModule || 'DHR-GW-01'

              return (
                <tr
                  key={device.id}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  {/* 1. Device Info */}
                  <td className="px-4 py-3.5 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 border border-sky-500/20 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/40">
                        <Cpu className="size-4.5" />
                      </div>
                      <div className="min-w-0 max-w-[200px] sm:max-w-[240px]">
                        <div className="font-semibold text-foreground text-sm truncate leading-snug">
                          {device.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate mt-0.5">
                          <span className="font-mono text-[11px] font-medium text-foreground/80">
                            {device.id}
                          </span>
                          <span>·</span>
                          <span className="truncate flex items-center gap-1">
                            <MapPin className="size-3 text-muted-foreground/70 shrink-0" />
                            {device.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. Health & Status */}
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <div className="flex flex-col items-start gap-1">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
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
                        {isHealthy ? 'Healthy' : isWarning ? 'Warning' : 'Critical'}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-medium pl-1">
                        Score: <span className="font-mono font-semibold text-foreground">{device.overallHealthScore}%</span>
                      </span>
                    </div>
                  </td>

                  {/* 3. Temperature Probe */}
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400">
                        <Thermometer className="size-3.5" />
                      </div>
                      <div>
                        <div className="font-bold font-mono text-sm tracking-tight text-foreground">
                          {tempProbe.currentReading}{' '}
                          <span className="text-xs font-normal text-muted-foreground">
                            {tempProbe.unit}
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <span className="truncate max-w-[100px]">{tempProbe.model.split(' ')[0]}</span>
                          <span
                            className={`size-1.5 rounded-full ${
                              isTempOperational ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            title={`Status: ${tempProbe.status}`}
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 4. Humidity Probe */}
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400">
                        <Droplets className="size-3.5" />
                      </div>
                      <div>
                        <div className="font-bold font-mono text-sm tracking-tight text-foreground">
                          {humProbe.currentReading}{' '}
                          <span className="text-xs font-normal text-muted-foreground">
                            {humProbe.unit}
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <span className="truncate max-w-[100px]">{humProbe.model.split(' ')[0]}</span>
                          <span
                            className={`size-1.5 rounded-full ${
                              isHumOperational ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            title={`Status: ${humProbe.status}`}
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 5. Radio & Power */}
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <div className="flex flex-col gap-1 text-xs">
                      {/* RSSI */}
                      <div className="flex items-center gap-1.5">
                        <Wifi className="size-3 text-sky-500 shrink-0" />
                        <span
                          className={`font-mono font-semibold ${
                            device.hardware.wifiRssiDbm > -70
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : device.hardware.wifiRssiDbm > -85
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {device.hardware.wifiRssiDbm} dBm
                        </span>
                      </div>

                      {/* Battery / Voltage */}
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        {device.hardware.isCharging ? (
                          <BatteryCharging className="size-3 text-emerald-500 shrink-0" />
                        ) : (
                          <Battery className="size-3 text-amber-500 shrink-0" />
                        )}
                        <span className="font-mono text-[11px] text-foreground font-medium">
                          {device.hardware.batteryPercent}% ({device.hardware.batteryVoltage}V)
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* 6. Network & System */}
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <div className="flex flex-col gap-0.5 text-xs">
                      <div className="font-mono text-foreground font-medium flex items-center gap-1.5">
                        <span>{device.hardware.ipAddress}</span>
                        <span
                          className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground font-sans border border-border/50"
                          title={`Attached to: ${parentMod?.name || parentModId}`}
                        >
                          {parentModId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span>Heap: <span className="font-mono text-foreground/80">{freeHeapKb}KB</span></span>
                        <span>·</span>
                        <span className="truncate max-w-[90px]">{device.hardware.uptimeString}</span>
                      </div>
                    </div>
                  </td>

                  {/* 7. Actions */}
                  <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onInspect(device)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-muted hover:text-primary hover:border-sky-500/30 shadow-2xs cursor-pointer"
                    >
                      <Activity className="size-3.5 text-sky-500" />
                      <span>Diagnostics</span>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
