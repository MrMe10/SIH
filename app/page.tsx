'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { OverviewTab } from '@/components/tabs/overview'
import { DevicesTab } from '@/components/tabs/devices'
import { ActivityTab } from '@/components/tabs/activity'
import { navigationTabs } from '@/lib/mock-data'
import { TabType } from '@/types/iot'

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>('Overview')

  return (
    <main className="flex min-h-screen bg-background">
      {/* Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="min-w-0 flex-1 flex flex-col">
        <Header />

        <div className="mx-auto w-full max-w-7xl p-5 sm:p-8 flex-1">
          {/* Welcome Banner & Action Button */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-sky-700 dark:text-sky-400">
                Monday, August 25, 2026
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Good morning, Jordan
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Here&apos;s what&apos;s happening with your devices and workspace.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('Devices')}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-opacity hover:opacity-90 active:scale-98"
            >
              <Plus className="size-4" />
              Add device
            </button>
          </div>

          {/* Navigation Tab Bar */}
          <div className="mb-6 flex gap-2 border-b border-border" role="tablist">
            {navigationTabs.map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab as TabType)}
                  className={`border-b-2 px-3.5 pb-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-primary text-primary font-semibold'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          {/* Active Tab View */}
          {activeTab === 'Overview' && (
            <OverviewTab onViewAllDevices={() => setActiveTab('Devices')} />
          )}
          {activeTab === 'Devices' && <DevicesTab />}
          {activeTab === 'Activity' && <ActivityTab />}
        </div>
      </div>
    </main>
  )
}
