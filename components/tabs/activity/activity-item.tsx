import { Thermometer, Droplets, AlertTriangle, CheckCircle } from 'lucide-react'
import { ActivityEvent } from '@/types/iot'

interface ActivityItemProps {
  event: ActivityEvent
}

export function ActivityItem({ event }: ActivityItemProps) {
  const isTemperature = event.sensorType === 'temperature'

  const isNormal = event.type === 'success'

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">

      {/* Sensor Icon */}
      <div
        className={`flex size-10 items-center justify-center rounded-lg ${
          isTemperature
            ? 'bg-orange-50 text-orange-600'
            : 'bg-blue-50 text-blue-600'
        }`}
      >
        {isTemperature ? (
          <Thermometer className="size-5" />
        ) : (
          <Droplets className="size-5" />
        )}
      </div>

      {/* Information */}
      <div className="flex-1">

        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground">
            {event.title}
          </h4>

          <span className="text-xs text-muted-foreground">
            {event.timestamp}
          </span>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Sensor: {event.deviceId}
        </p>

        <p className="mt-1 text-sm font-medium">
          {event.value}
        </p>

      </div>

      {/* Status */}
      <div>
        {isNormal ? (
          <CheckCircle className="size-5 text-emerald-600" />
        ) : (
          <AlertTriangle className="size-5 text-amber-600" />
        )}
      </div>

    </div>
  )
}