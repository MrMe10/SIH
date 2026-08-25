import { MetricsGrid } from './metrics-grid'
import { SensorActivityChart } from './sensor-activity-chart'
import { RecentDevices } from './recent-devices'
import { ProjectLocations } from './project-locations'

interface OverviewTabProps {
  onViewAllDevices?: () => void
}

export function OverviewTab({ onViewAllDevices }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* KPI Metrics */}
      <MetricsGrid />

      {/* Charts & Recent devices */}
      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <SensorActivityChart />
        <RecentDevices onViewAll={onViewAllDevices} />
      </div>

      {/* Locations */}
      <ProjectLocations />
    </div>
  )
}

export default OverviewTab
