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
  const [inspectDeviceId, setInspectDeviceId] = useState<string | null>(null)
  const [inspectParentModuleId, setInspectParentModuleId] = useState<string | null>(null)

  const handleTabChange = (tab: TabType) => {
    console.log('Changing page to:', tab)
    setActiveTab(tab)
  }

  const handleInspectParentModule = (moduleId: string) => {
    console.log('Inspecting parent module in Devices tab:', moduleId)
    setInspectParentModuleId(moduleId)
    setInspectDeviceId(null)
    setActiveTab('Devices')
  }

  const handleInspectDevice = (deviceId: string, parentModuleId?: string) => {
    console.log('Inspecting device in Devices tab:', deviceId, 'Parent module:', parentModuleId)
    if (parentModuleId) {
      setInspectParentModuleId(parentModuleId)
    }
    setInspectDeviceId(deviceId)
    setActiveTab('Devices')
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
              onInspectDevice={handleInspectDevice}
              onInspectParentModule={handleInspectParentModule}
            />
          )}

          {activeTab === 'Devices' && (
            <DevicesTab
              initialParentModuleId={inspectParentModuleId}
              initialDeviceId={inspectDeviceId}
              onClearInitialNavigation={() => {
                setInspectDeviceId(null)
                setInspectParentModuleId(null)
              }}
            />
          )}

          {activeTab === 'Activity' && (
            <ActivityTab />
          )}

        </div>
      </div>
    </main>
  )
}