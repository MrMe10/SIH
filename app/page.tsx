'use client'

import { useState } from 'react'
import {
  Activity,
  Bell,
  ChevronDown,
  CircleHelp,
  Cpu,
  Gauge,
  LayoutDashboard,
  MapPin,
  MoreHorizontal,
  Radio,
  Settings,
  Thermometer,
  Wifi,
  Zap,
} from 'lucide-react'

const tabs = ['Overview', 'Devices', 'Activity']

const devices = [
  { name: 'Temperature sensor', id: 'TH-2048', value: '23.4°', status: 'Online', icon: Thermometer, color: 'text-sky-600', bg: 'bg-sky-50' },
  { name: 'Air quality monitor', id: 'AQ-1032', value: 'Good', status: 'Online', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Power relay', id: 'PR-0891', value: 'On', status: 'Online', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
]

function Sidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card px-4 py-5 lg:flex">
      <div className="flex items-center gap-2 px-2 text-lg font-semibold tracking-tight">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Radio className="size-4" /></span>
        Orbit<span className="text-muted-foreground">IoT</span>
      </div>
      <div className="mt-10 flex flex-1 flex-col gap-1">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Workspace</p>
        {tabs.map((tab, index) => {
          const Icon = index === 0 ? LayoutDashboard : index === 1 ? Cpu : Activity
          return <button key={tab} onClick={() => setActiveTab(tab)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}><Icon className="size-4" />{tab}</button>
        })}
        <p className="mt-8 px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Manage</p>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"><Settings className="size-4" />Settings</button>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"><CircleHelp className="size-4" />Help center</button>
      </div>
      <div className="rounded-xl border border-border bg-muted/50 p-3"><div className="flex items-center gap-2 text-xs font-medium"><span className="size-2 rounded-full bg-emerald-500" />All systems operational</div><p className="mt-1 pl-4 text-[11px] text-muted-foreground">Last checked just now</p></div>
    </aside>
  )
}

function Overview() {
  return <>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[['Active devices', '24', '+3 this month', Cpu, 'text-sky-600'], ['Online now', '21', '87.5% of devices', Wifi, 'text-emerald-600'], ['Events today', '1,284', '+12.4% from yesterday', Bell, 'text-violet-600'], ['Avg. temperature', '22.8°', 'Within target range', Gauge, 'text-amber-600']].map(([label, value, detail, Icon, color]) => <div key={label as string} className="rounded-xl border border-border bg-card p-5"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{label as string}</span><Icon className={`size-4 ${color as string}`} /></div><div className="mt-3 text-2xl font-semibold tracking-tight">{value as string}</div><p className="mt-1 text-xs text-muted-foreground">{detail as string}</p></div>)}
    </div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
      <section className="rounded-xl border border-border bg-card p-5"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Sensor activity</h2><p className="mt-1 text-sm text-muted-foreground">Events across your project</p></div><button className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground">Last 24 hours <ChevronDown className="size-3" /></button></div><div className="mt-8 h-48"><div className="flex h-full items-end gap-2 sm:gap-3">{[35,48,42,66,54,72,61,80,58,76,68,91,74,84,62,70,88,64,76,94,81,72,86,78].map((height, i) => <div key={i} className="group flex h-full flex-1 items-end"><div style={{ height: `${height}%` }} className="w-full rounded-t-sm bg-sky-100 transition-colors group-hover:bg-sky-400" /></div>)}</div><div className="mt-3 flex justify-between text-[11px] text-muted-foreground"><span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>Now</span></div></div></section>
      <section className="rounded-xl border border-border bg-card p-5"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Recent devices</h2><p className="mt-1 text-sm text-muted-foreground">Latest device readings</p></div><button className="text-xs font-medium text-sky-700 hover:underline">View all</button></div><div className="mt-5 divide-y divide-border">{devices.map(({ name, id, value, status, icon: Icon, color, bg }) => <div key={id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"><div className={`flex size-9 items-center justify-center rounded-lg ${bg}`}><Icon className={`size-4 ${color}`} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{name}</p><p className="text-xs text-muted-foreground">{id}</p></div><div className="text-right"><p className="text-sm font-medium">{value}</p><p className="flex items-center justify-end gap-1 text-[11px] text-emerald-600"><span className="size-1.5 rounded-full bg-emerald-500" />{status}</p></div></div>)}</div></section>
    </div>
    <section className="mt-6 rounded-xl border border-border bg-card p-5"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Project locations</h2><p className="mt-1 text-sm text-muted-foreground">Devices grouped by location</p></div><button className="rounded-md border border-border p-1.5 text-muted-foreground"><MoreHorizontal className="size-4" /></button></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="flex items-center gap-3 rounded-lg bg-muted/60 p-3"><MapPin className="size-4 text-sky-600" /><div><p className="text-sm font-medium">Main office</p><p className="text-xs text-muted-foreground">12 devices · Online</p></div></div><div className="flex items-center gap-3 rounded-lg bg-muted/60 p-3"><MapPin className="size-4 text-sky-600" /><div><p className="text-sm font-medium">Warehouse</p><p className="text-xs text-muted-foreground">8 devices · Online</p></div></div><div className="flex items-center gap-3 rounded-lg bg-muted/60 p-3"><MapPin className="size-4 text-sky-600" /><div><p className="text-sm font-medium">Greenhouse</p><p className="text-xs text-muted-foreground">4 devices · 1 offline</p></div></div></div></section>
  </>
}

function Placeholder({ tab }: { tab: string }) { return <div className="flex min-h-[500px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card text-center"><div className="flex size-12 items-center justify-center rounded-xl bg-muted"><Cpu className="size-5 text-muted-foreground" /></div><h2 className="mt-4 text-lg font-semibold">{tab}</h2><p className="mt-1 max-w-sm text-sm text-muted-foreground">This view is ready for your {tab.toLowerCase()} data and controls.</p></div> }

export default function Page() {
  const [activeTab, setActiveTab] = useState('Overview')
  return <main className="flex min-h-screen bg-background"><Sidebar activeTab={activeTab} setActiveTab={setActiveTab} /><div className="min-w-0 flex-1"><header className="flex h-16 items-center justify-between border-b border-border bg-card px-5 sm:px-8"><div className="flex items-center gap-2 lg:hidden"><span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Radio className="size-4" /></span><span className="font-semibold">OrbitIoT</span></div><div className="hidden text-sm text-muted-foreground lg:block">Projects / <span className="text-foreground">Northstar</span></div><div className="flex items-center gap-4"><button className="relative text-muted-foreground hover:text-foreground" aria-label="Notifications"><Bell className="size-4" /><span className="absolute -right-1 -top-1 size-1.5 rounded-full bg-sky-500" /></button><div className="flex items-center gap-2 border-l border-border pl-4"><div className="flex size-8 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">JD</div><span className="hidden text-sm font-medium sm:block">Jordan Davis</span><ChevronDown className="size-3 text-muted-foreground" /></div></div></header><div className="mx-auto max-w-7xl p-5 sm:p-8"><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-sky-700">Monday, August 25, 2026</p><h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Good morning, Jordan</h1><p className="mt-2 text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your devices.</p></div><button className="flex w-fit items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-sm"><span className="text-lg leading-none">+</span> Add device</button></div><div className="mb-6 flex gap-1 border-b border-border" role="tablist">{tabs.map(tab => <button key={tab} role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={`border-b-2 px-3 pb-3 text-sm font-medium transition-colors ${activeTab === tab ? 'border-sky-600 text-sky-700' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>{tab}</button>)}</div>{activeTab === 'Overview' ? <Overview /> : <Placeholder tab={activeTab} />}</div></div></main>
}
