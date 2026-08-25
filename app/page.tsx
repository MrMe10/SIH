'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { OverviewTab } from '@/components/tabs/overview'
import { DevicesTab } from '@/components/tabs/devices'
import { ActivityTab } from '@/components/tabs/activity'
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
