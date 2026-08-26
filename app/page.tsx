'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
// import { OverviewTab } from '@/components/tabs/overview'
import OverviewTab from "@/components/tabs/overview";
import { DevicesTab } from "@/components/tabs/devices";
import ActivityTab from "@/components/tabs/activity";
import { TabType } from '@/types/iot'

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>('Overview')

  const handleTabChange = (tab: TabType) => {
    console.log('Changing page to:', tab)
    setActiveTab(tab)
  }

  return (
    <main className="flex min-h-screen bg-background">

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      {/* Main area */}
      <div className="min-w-0 flex-1 flex flex-col">

        <Header />

        <div className="mx-auto w-full max-w-7xl p-5 sm:p-8 flex-1">

          {activeTab === 'Overview' && (
            <OverviewTab
              onViewAllDevices={() => handleTabChange('Devices')}
            />
          )}

          {activeTab === 'Devices' && (
            <DevicesTab />
          )}

          {activeTab === 'Activity' && (
            <ActivityTab />
          )}

        </div>
      </div>
    </main>
  )
}