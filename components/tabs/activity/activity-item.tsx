import { AlertCircle, AlertTriangle, CheckCircle2, Info, MapPin } from 'lucide-react'
import { ActivityEvent } from '@/types/iot'

interface ActivityItemProps {
  event: ActivityEvent
}

export function ActivityItem({ event }: ActivityItemProps) {
  const getBadgeIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
      case 'warning':
        return <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
      case 'alert':
        return <AlertCircle className="size-4 text-rose-600 dark:text-rose-400" />
      case 'info':
      default:
        return <Info className="size-4 text-sky-600 dark:text-sky-400" />
    }
  }

  const getBadgeBg = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/50 dark:border-emerald-800/40'
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-950/40 border-amber-200/50 dark:border-amber-800/40'
      case 'alert':
        return 'bg-rose-50 dark:bg-rose-950/40 border-rose-200/50 dark:border-rose-800/40'
      case 'info':
      default:
        return 'bg-sky-50 dark:bg-sky-950/40 border-sky-200/50 dark:border-sky-800/40'
    }
  }

  return (
    <div className="flex gap-4">
      {/* Icon node */}
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-lg border ${getBadgeBg(
          event.type
        )}`}
      >
        {getBadgeIcon(event.type)}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6 border-b border-border last:border-b-0 last:pb-0">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="text-sm font-semibold text-foreground">{event.title}</h4>
          <span className="text-xs text-muted-foreground">{event.timestamp}</span>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>

        {(event.deviceId || event.location) && (
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
            {event.deviceId && (
              <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                {event.deviceId}
              </span>
            )}
            {event.location && (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <MapPin className="size-3" />
                {event.location}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
