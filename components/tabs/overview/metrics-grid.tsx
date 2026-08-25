import { overviewMetrics } from '@/lib/mock-data'

export function MetricsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {overviewMetrics.map(({ label, value, detail, icon: Icon, color, bg }) => (
        <div
          key={label}
          className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-border/80 hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <div className={`flex size-8 items-center justify-center rounded-lg ${bg || 'bg-muted'}`}>
              <Icon className={`size-4 ${color}`} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
        </div>
      ))}
    </div>
  )
}
