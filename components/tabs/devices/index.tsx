'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, ShieldAlert } from 'lucide-react'
import esp32DevicesData from './esp32-devices.json'
import { ESP32Device } from './types'
import { PARENT_MODULES } from './parent-modules'
import { DeviceHealthSummary } from './device-health-summary'
import { DeviceTable } from './device-table'
import { DeviceDetailView } from './device-detail-view'
import { ParentModuleModal } from './parent-module-modal'

export interface DevicesTabProps {
  initialParentModuleId?: string | null
  initialDeviceId?: string | null
  onClearInitialNavigation?: () => void
}

export function DevicesTab({
  initialParentModuleId,
  initialDeviceId,
  onClearInitialNavigation,
}: DevicesTabProps = {}) {
  const [devices] = useState<ESP32Device[]>(esp32DevicesData as ESP32Device[])
  const [searchQuery, setSearchQuery] = useState('')
  const [healthFilter, setHealthFilter] = useState<'all' | 'healthy' | 'warning'>('all')
  const [selectedDevice, setSelectedDevice] = useState<ESP32Device | null>(null)

  // Parent Module Selection
  const [selectedParentModuleId, setSelectedParentModuleId] = useState<string>(
    initialParentModuleId || PARENT_MODULES[0]?.id || 'DHR-GW-01'
  )
  const [isParentModalOpen, setIsParentModalOpen] = useState(false)

  // Handle external navigation to a specific parent module or device
  useEffect(() => {
    if (initialParentModuleId) {
      setSelectedParentModuleId(initialParentModuleId)
      setSelectedDevice(null)
      setSearchQuery('')
      setHealthFilter('all')
    }

    if (initialDeviceId) {
      const norm = initialDeviceId.trim().toLowerCase()
      let target = devices.find((d) => d.id.toLowerCase() === norm)

      if (!target) {
        // Map DR-001 -> ESP32-NODE-01
        const match = initialDeviceId.match(/dr-0*(\d+)/i)
        if (match) {
          const num = parseInt(match[1], 10)
          const padded = String(num).padStart(2, '0')
          target = devices.find(
            (d) =>
              d.id.toLowerCase().includes(`node-${padded}`) ||
              d.id.toLowerCase().includes(`node-${num}`)
          )
        }
      }

      if (!target) {
        target = devices.find(
          (d) =>
            d.location.toLowerCase().includes(norm) ||
            d.name.toLowerCase().includes(norm)
        )
      }

      if (target) {
        const parentMod = PARENT_MODULES.find(
          (m) => m.nodeIds.includes(target.id) || m.id === target.parentModule
        )
        if (parentMod) {
          setSelectedParentModuleId(parentMod.id)
        }
        setSearchQuery('')
        setHealthFilter('all')
        setSelectedDevice(target)
      }
    }

    if (initialParentModuleId || initialDeviceId) {
      onClearInitialNavigation?.()
    }
  }, [initialParentModuleId, initialDeviceId, devices, onClearInitialNavigation])

  const activeParentModule = useMemo(() => {
    return PARENT_MODULES.find((m) => m.id === selectedParentModuleId) || PARENT_MODULES[0]
  }, [selectedParentModuleId])

  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      // Filter by selected parent module
      const isAttached =
        activeParentModule.nodeIds.includes(device.id) ||
        device.parentModule === selectedParentModuleId
      if (!isAttached) return false

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
  }, [devices, searchQuery, healthFilter, selectedParentModuleId, activeParentModule])

  return (
    <div className="space-y-6">
      {selectedDevice ? (
        <DeviceDetailView
          device={selectedDevice}
          onBack={() => setSelectedDevice(null)}
        />
      ) : (
        <>
          {/* Fleet & Device Health Summary Strip with Clickable Parent Module Box */}
          <DeviceHealthSummary
            devices={filteredDevices}
            parentModuleName={activeParentModule.name}
            parentModuleId={activeParentModule.id}
            onSelectParentModule={() => setIsParentModalOpen(true)}
          />

          {/* Filter, Search, and View Controls */}
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

            <div className="flex flex-wrap items-center gap-2">
              {/* Health Status Filters */}
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card/60 p-1">
                {[
                  { label: `All (${filteredDevices.length})`, value: 'all' },
                  {
                    label: `Healthy (${filteredDevices.filter((d) => d.status === 'healthy').length})`,
                    value: 'healthy',
                  },
                  {
                    label: `Warnings (${filteredDevices.filter((d) => d.status === 'warning').length})`,
                    value: 'warning',
                  },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setHealthFilter(tab.value as typeof healthFilter)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      healthFilter === tab.value
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ESP32 Device Nodes Content (Table Format) */}
          {filteredDevices.length > 0 ? (
            <DeviceTable
              devices={filteredDevices}
              onInspect={(dev) => setSelectedDevice(dev)}
            />
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-8 text-center">
              <ShieldAlert className="size-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">No ESP32 nodes found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                No nodes match the selected criteria for {activeParentModule.name}. Try adjusting your search or health filter.
              </p>
            </div>
          )}

          {/* Parent Module Selection Modal */}
          <ParentModuleModal
            isOpen={isParentModalOpen}
            selectedModuleId={selectedParentModuleId}
            onSelect={(id) => setSelectedParentModuleId(id)}
            onClose={() => setIsParentModalOpen(false)}
          />
        </>
      )}
    </div>
  )
}

export default DevicesTab
