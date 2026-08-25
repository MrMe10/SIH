'use client'

import { Bell, ChevronDown, Radio } from 'lucide-react'

interface HeaderProps {
  onAddDeviceClick?: () => void
}

export function Header({ onAddDeviceClick }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-5 sm:px-8">
      {/* Mobile Brand */}
      <div className="flex items-center gap-2 lg:hidden">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Radio className="size-4" />
        </span>
        <span className="font-semibold">OrbitIoT</span>
      </div>

      {/* Breadcrumb (Desktop) */}
      <div className="hidden text-sm text-muted-foreground lg:block">
        Projects / <span className="font-medium text-foreground">Northstar Facility</span>
      </div>

      {/* Action icons & User profile */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-sky-500 ring-2 ring-card" />
        </button>

        <div className="flex items-center gap-2.5 border-l border-border pl-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-700 text-xs dark:bg-sky-950 dark:text-sky-300">
            JD
          </div>
          <span className="hidden text-sm font-medium sm:block">Jordan Davis</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  )
}
