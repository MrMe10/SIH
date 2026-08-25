'use client'

import {
  Activity,
  CircleHelp,
  Cpu,
  LayoutDashboard,
  Radio,
  Settings,
} from 'lucide-react'
import { navigationTabs } from '@/lib/mock-data'
import { TabType } from '@/types/iot'

interface SidebarProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const getTabIcon = (tab: TabType) => {
    switch (tab) {
      case 'Overview':
        return LayoutDashboard
      case 'Devices':
        return Cpu
      case 'Activity':
        return Activity
      default:
        return LayoutDashboard
    }
  }

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card px-4 py-5 lg:flex">
      <div className="flex items-center gap-2 px-2 text-lg font-semibold tracking-tight">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Radio className="size-4" />
        </span>
        <span>
          Orbit<span className="text-muted-foreground font-normal">IoT</span>
        </span>
      </div>

      <div className="mt-8 flex flex-1 flex-col gap-1">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>
        {navigationTabs.map((tab) => {
          const Icon = getTabIcon(tab as TabType)
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabType)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="size-4" />
              {tab}
            </button>
          )
        })}

        <p className="mt-8 px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Manage
        </p>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Settings className="size-4" />
          Settings
        </button>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <CircleHelp className="size-4" />
          Help center
        </button>
      </div>

      <div className="rounded-xl border border-border bg-muted/50 p-3.5">
        <div className="flex items-center gap-2 text-xs font-medium text-foreground">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          All systems operational
        </div>
        <p className="mt-1 pl-4 text-[11px] text-muted-foreground">
          Last checked just now
        </p>
      </div>
    </aside>
  )
}
