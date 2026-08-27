export type DeviceStatus = 'healthy' | 'warning' | 'critical' | 'offline'
export type SensorStatus = 'operational' | 'degraded' | 'fault' | 'uncalibrated'
export type PowerSource = 'Battery (LiPo)' | 'Solar + Battery' | 'AC Mains'

export interface SensorProbeHealth {
  name: string
  model: string
  type: 'temperature' | 'humidity'
  gpioPin: string
  busType: 'I2C' | 'OneWire' | 'Analog'
  currentReading: string
  unit: string
  status: SensorStatus
  errorRatePercent: number
  lastCalibrationDate: string
  crcErrors: number
  responseLatencyMs: number
  temperatureDrift?: string
}

export interface HardwareHealth {
  wifiRssiDbm: number
  wifiSignalQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  ipAddress: string
  macAddress: string
  batteryPercent: number
  batteryVoltage: number
  powerSource: PowerSource
  isCharging?: boolean
  cpuFreqMhz: number
  espCoreTempC: number
  freeHeapBytes: number
  totalHeapBytes: number
  uptimeString: string
  firmwareVersion: string
  lastHeartbeat: string
  packetLossPercent: number
}

export interface ESP32Device {
  id: string
  name: string
  parentModule?: string
  location: string
  applicationNote: string
  status: DeviceStatus
  overallHealthScore: number // 0-100
  hardware: HardwareHealth
  temperatureSensor: SensorProbeHealth
  humiditySensor: SensorProbeHealth
  diagnosticsLog: {
    timestamp: string
    level: 'info' | 'warn' | 'error'
    message: string
  }[]
  telemetryHistory: {
    time: string
    temp: number
    humidity: number
    rssi: number
    heapKb: number
  }[]
}

export interface ParentModule {
  id: string
  name: string
  location: string
  ipAddress: string
  protocol: string
  status: 'online' | 'warning' | 'offline'
  nodeIds: string[]
  description?: string
  latitude: number
  longitude: number
}
