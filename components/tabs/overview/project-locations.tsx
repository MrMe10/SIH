import { MapPin, MoreHorizontal } from 'lucide-react'
import { projectLocations } from '@/lib/mock-data'

export function ProjectLocations() {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground">Project locations</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Devices grouped by deployment area
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
          aria-label="Location options"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {projectLocations.map((loc) => {
          const isDegraded = loc.status === 'degraded'
          return (
            <div
              key={loc.id}
              className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/40 p-3.5 transition-colors hover:bg-muted/70"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-950/60">
                <MapPin className="size-4.5 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{loc.name}</p>
                <p className="text-xs text-muted-foreground">
                  {loc.deviceCount} devices ·{' '}
                  <span className={isDegraded ? 'text-amber-600 dark:text-amber-400' : ''}>
                    {isDegraded ? `${loc.deviceCount - loc.onlineCount} offline` : 'All Online'}
                  </span>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
