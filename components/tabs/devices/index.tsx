'use client'

import { useState, useMemo } from 'react'
import { Search, ShieldAlert } from 'lucide-react'
import esp32DevicesData from './esp32-devices.json'
import { ESP32Device } from './types'
import { DeviceHealthSummary } from './device-health-summary'
import { DeviceCard } from './device-card'
import { DeviceDiagnosticModal } from './device-diagnostic-modal'

export function DevicesTab() {
  const [devices] = useState<ESP32Device[]>(esp32DevicesData as ESP32Device[])
  const [searchQuery, setSearchQuery] = useState('')
  const [healthFilter, setHealthFilter] = useState<'all' | 'healthy' | 'warning'>('all')
  const [selectedDevice, setSelectedDevice] = useState<ESP32Device | null>(null)

  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesSearch =
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.temperatureSensor.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.humiditySensor.model.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesHealth =
        healthFilter === 'all' ? true : device.status === healthFilter

      return matchesSearch && matchesHealth
    })
  }, [devices, searchQuery, healthFilter])

  return (
    <div className="space-y-6">
      {/* Fleet & Device Health Summary Strip */}
      <DeviceHealthSummary devices={devices} />

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search ESP32 nodes, sensors (SHT31, DS18B20), IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-sky-500 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* Health Status Filters */}
        <div className="flex items-center gap-2">
          {[
            { label: `All Nodes (${devices.length})`, value: 'all' },
            {
              label: `Healthy (${devices.filter((d) => d.status === 'healthy').length})`,
              value: 'healthy',
            },
            {
              label: `Warnings (${devices.filter((d) => d.status === 'warning').length})`,
              value: 'warning',
            },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setHealthFilter(tab.value as typeof healthFilter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                healthFilter === tab.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ESP32 Device Nodes List */}
      {filteredDevices.length > 0 ? (
        <div className="flex flex-col gap-3.5">
          {filteredDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onInspect={(dev) => setSelectedDevice(dev)}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-8 text-center">
          <ShieldAlert className="size-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium text-foreground">No ESP32 nodes found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try adjusting your search criteria or health filter.
          </p>
        </div>
      )}

      {/* Deep Diagnostics Modal */}
      {selectedDevice && (
        <DeviceDiagnosticModal
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
        />
      )}
    </div>
  )
}

export default DevicesTab
