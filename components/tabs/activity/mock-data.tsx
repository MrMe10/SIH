import { Room } from './types';

export const INITIAL_ROOMS: Room[] = [
  { id: 'R-01', name: 'Storage Room 01', crop: 'Rice', sacks: 65, temperature: 26, humidity: 55, gas: 18, parentSensor: 'DR-001', history: [{ time: '10:00', temperature: 26, humidity: 55, gas: 18 }] },
  { id: 'R-02', name: 'Storage Room 02', crop: 'Wheat', sacks: 80, temperature: 28, humidity: 62, gas: 22, parentSensor: 'DR-002', history: [{ time: '10:00', temperature: 28, humidity: 62, gas: 22 }] },
  { id: 'R-03', name: 'Storage Room 03', crop: 'Paddy', sacks: 50, temperature: 34, humidity: 78, gas: 62, parentSensor: 'DR-003', history: [{ time: '10:00', temperature: 34, humidity: 78, gas: 62 }] },
  { id: 'R-04', name: 'Storage Room 04', crop: 'Maize', sacks: 45, temperature: 25, humidity: 50, gas: 12, parentSensor: 'DR-004', history: [{ time: '10:00', temperature: 25, humidity: 50, gas: 12 }] },
  { id: 'R-05', name: 'Storage Room 05', crop: 'Rice', sacks: 70, temperature: 27, humidity: 58, gas: 20, parentSensor: 'DR-005', history: [{ time: '10:00', temperature: 27, humidity: 58, gas: 20 }] },
  { id: 'R-06', name: 'Storage Room 06', crop: 'Wheat', sacks: 60, temperature: 31, humidity: 68, gas: 35, parentSensor: 'DR-006', history: [{ time: '10:00', temperature: 31, humidity: 68, gas: 35 }] },
  { id: 'R-07', name: 'Storage Room 07', crop: 'Paddy', sacks: 90, temperature: 24, humidity: 52, gas: 15, parentSensor: 'DR-007', history: [{ time: '10:00', temperature: 24, humidity: 52, gas: 15 }] },
  { id: 'R-08', name: 'Storage Room 08', crop: 'Maize', sacks: 40, temperature: 29, humidity: 60, gas: 25, parentSensor: 'DR-008', history: [{ time: '10:00', temperature: 29, humidity: 60, gas: 25 }] },
];