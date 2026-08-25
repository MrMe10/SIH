'use client'

import { MetricsGrid } from './metrics-grid'
import { ProjectLocations } from './project-locations'
import { RecentDevices } from './recent-devices'
import { SensorActivityChart } from './sensor-activity-chart'
import { SensorAlerts } from './sensor-alerts'
import { SensorHealth } from './sensor-health'

interface OverviewTabProps {
  onViewAllDevices?: () => void
}

export function OverviewTab({
  onViewAllDevices,
}: OverviewTabProps) {
  return (
    <div className="space-y-6">

      {/* Heading */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Overview
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Current readings from the connected sensors.
        </p>
      </div>

      {/* Main numbers */}
      <MetricsGrid />

      {/* Alerts + Sensor status */}
      <div className="grid gap-6 xl:grid-cols-2">
        <SensorAlerts />
        <SensorHealth />
      </div>

      {/* Chart + Recent readings */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <SensorActivityChart />
        <RecentDevices />
      </div>

      {/* Locations */}
      <ProjectLocations />

    </div>
  )
}

export default OverviewTab