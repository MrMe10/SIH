'use client'

import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

interface Sensor {
  id: string
  location: string
  latitude: number
  longitude: number
  temperature: number
  humidity: number
  status: 'Normal' | 'Warning' | 'Alert'
  lastUpdated: string
}

const sensors: Sensor[] = [
  {
    id: 'TH-001',
    location: 'Karnataka',
    latitude: 15.3173,
    longitude: 75.7139,
    temperature: 27.4,
    humidity: 56,
    status: 'Normal',
    lastUpdated: '2 min ago',
  },

  {
    id: 'TH-002',
    location: 'Maharashtra',
    latitude: 19.7515,
    longitude: 75.7139,
    temperature: 29.8,
    humidity: 64,
    status: 'Warning',
    lastUpdated: '4 min ago',
  },

  {
    id: 'TH-003',
    location: 'Andhra Pradesh',
    latitude: 15.9129,
    longitude: 79.7400,
    temperature: 32.1,
    humidity: 73,
    status: 'Alert',
    lastUpdated: '1 min ago',
  },

  {
    id: 'TH-004',
    location: 'Tamil Nadu',
    latitude: 11.1271,
    longitude: 78.6569,
    temperature: 26.9,
    humidity: 54,
    status: 'Normal',
    lastUpdated: '5 min ago',
  },

  {
    id: 'TH-005',
    location: 'Telangana',
    latitude: 18.1124,
    longitude: 79.0193,
    temperature: 28.6,
    humidity: 61,
    status: 'Normal',
    lastUpdated: '3 min ago',
  },
]

function getStatusColor(status: Sensor['status']) {
  switch (status) {
    case 'Normal':
      return '#10b981'

    case 'Warning':
      return '#f59e0b'

    case 'Alert':
      return '#ef4444'

    default:
      return '#64748b'
  }
}

export function DeviceMap() {
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null)

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">

      {/* Map Header */}
      <div className="border-b border-border px-5 py-4">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Sensor Locations
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Temperature and humidity sensors across deployed locations.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">

            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-emerald-500" />
              Normal
            </div>

            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-amber-500" />
              Warning
            </div>

            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-rose-500" />
              Alert
            </div>

          </div>

        </div>
      </div>

      {/* Map */}
      <div className="h-[420px] w-full">

        <MapContainer
          center={[15.5, 78.5]}
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {sensors.map((sensor) => {
            const color = getStatusColor(sensor.status)

            return (
              <CircleMarker
                key={sensor.id}
                center={[
                  sensor.latitude,
                  sensor.longitude,
                ]}
                radius={10}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.8,
                  weight: 3,
                }}
                eventHandlers={{
                  click: () => {
                    setSelectedSensor(sensor.id)
                  },
                }}
              >

                <Popup>

                  <div className="min-w-[200px]">

                    <h4 className="text-base font-semibold">
                      {sensor.id}
                    </h4>

                    <p className="mb-3 text-xs text-gray-500">
                      {sensor.location}
                    </p>

                    <div className="space-y-2 text-sm">

                      <div className="flex justify-between">
                        <span>Temperature</span>

                        <strong>
                          {sensor.temperature}°C
                        </strong>
                      </div>

                      <div className="flex justify-between">
                        <span>Humidity</span>

                        <strong>
                          {sensor.humidity}%
                        </strong>
                      </div>

                      <div className="flex justify-between">
                        <span>Status</span>

                        <strong style={{ color }}>
                          {sensor.status}
                        </strong>
                      </div>

                      <div className="flex justify-between">
                        <span>Updated</span>

                        <span>
                          {sensor.lastUpdated}
                        </span>
                      </div>

                    </div>

                  </div>

                </Popup>

              </CircleMarker>
            )
          })}

        </MapContainer>

      </div>

      {/* Selected Sensor */}
      {selectedSensor && (
        <div className="border-t border-border px-5 py-3 text-sm text-muted-foreground">

          Selected sensor:

          <span className="ml-1 font-medium text-foreground">
            {selectedSensor}
          </span>

        </div>
      )}

    </div>
  )
}

export default DeviceMap