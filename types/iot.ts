import { LucideIcon } from 'lucide-react'

export type TabType = 'Overview' | 'Devices' | 'Activity'

export interface Device {
  id: string
  name: string
  location: string
  value: string
  unit?: string
  status: 'Online' | 'Offline' | 'Warning'
  type: 'temperature' | 'air_quality' | 'power' | 'humidity' | 'pressure' | 'camera'
  battery?: string
  lastUpdated: string
  icon?: LucideIcon
  color?: string
  bg?: string
}

export interface MetricCard {
  label: string
  value: string
  detail: string
  changeType?: 'positive' | 'neutral' | 'negative'
  icon: LucideIcon
  color: string
  bg?: string
}

export interface ActivityEvent {
  id: string
  title: string
  timestamp: string
  type: 'success' | 'warning' | 'alert'
  deviceId: string
  sensorType: 'temperature' | 'humidity'
  value: string
}

export interface ProjectLocation {
  id: string
  name: string
  deviceCount: number
  onlineCount: number
  status: 'operational' | 'degraded' | 'offline'
}
