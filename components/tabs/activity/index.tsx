'use client'

import { useState } from 'react'
import { Activity, Filter } from 'lucide-react'
import { activityLogs } from '@/lib/mock-data'
import { ActivityItem } from './activity-item'

export function ActivityTab() {
  const [filterType, setFilterType] = useState<string>('all')

  const filteredLogs = activityLogs.filter((log) => {
    if (filterType === 'all') return true
    if (filterType === 'alerts') return log.type === 'alert' || log.type === 'warning'
    if (filterType === 'updates') return log.type === 'info'
    return true
  })

  return (
    <div className="space-y-6">
      {/* Activity Header & Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Audit & Activity Log</h2>
          <p className="text-xs text-muted-foreground">
            Real-time event logs, alert triggers, and telemetry reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[
            { label: 'All events', value: 'all' },
            { label: 'Alerts & Warnings', value: 'alerts' },
            { label: 'System updates', value: 'updates' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilterType(item.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filterType === item.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="space-y-6">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((event) => <ActivityItem key={event.id} event={event} />)
          ) : (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No events found for this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ActivityTab
