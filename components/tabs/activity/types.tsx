export type StatusType = 'normal' | 'warning' | 'alert';

export interface SensorHistory {
  time: string;
  temperature: number;
  humidity: number;
  gas: number;
}

export interface Room {
  id: string;
  name: string;
  crop: string;
  sacks: number;
  temperature: number;
  humidity: number;
  gas: number;
  parentSensor: string;
  history: SensorHistory[];
}

export const THRESHOLDS = {
  temp: { warning: 30, alert: 35 },
  humidity: { warning: 70, alert: 80 },
  gas: { warning: 40, alert: 70 },
};

export function getParamStatus(value: number, warningThresh: number, alertThresh: number): StatusType {
  if (value >= alertThresh) return 'alert';
  if (value >= warningThresh) return 'warning';
  return 'normal';
}

export function getOverallStatus(room: Room): StatusType {
  const tStat = getParamStatus(room.temperature, THRESHOLDS.temp.warning, THRESHOLDS.temp.alert);
  const hStat = getParamStatus(room.humidity, THRESHOLDS.humidity.warning, THRESHOLDS.humidity.alert);
  const gStat = getParamStatus(room.gas, THRESHOLDS.gas.warning, THRESHOLDS.gas.alert);

  if (tStat === 'alert' || hStat === 'alert' || gStat === 'alert') return 'alert';
  if (tStat === 'warning' || hStat === 'warning' || gStat === 'warning') return 'warning';
  return 'normal';
}