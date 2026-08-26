import { ParentModule } from './types'

export const PARENT_MODULES: ParentModule[] = [
  {
    id: 'DHR-GW-01',
    name: 'DHRISHTI Master Gateway 01',
    location: 'Mangalore Grain Silo Complex',
    ipAddress: '192.168.1.10',
    protocol: 'ESP-NOW + MQTT Gateway',
    status: 'online',
    nodeIds: ['ESP32-NODE-01', 'ESP32-NODE-04'],
    description: 'Primary high-throughput gateway managing grain silo & drying facility nodes.',
  },
  {
    id: 'DHR-GW-02',
    name: 'DHRISHTI Cold-Chain Hub',
    location: 'Udupi Coastal Cold Vaults',
    ipAddress: '192.168.1.20',
    protocol: 'ESP-NOW + LoRaWAN Mesh',
    status: 'online',
    nodeIds: ['ESP32-NODE-02', 'ESP32-NODE-05'],
    description: 'Sub-zero insulated gateway handling cold vault and seed germination reserve probes.',
  },
  {
    id: 'DHR-GW-03',
    name: 'DHRISHTI Agro-Climate Controller',
    location: 'Bengaluru Precision Bays',
    ipAddress: '192.168.1.30',
    protocol: 'ESP-NOW + Zigbee 3.0',
    status: 'warning',
    nodeIds: ['ESP32-NODE-03', 'ESP32-NODE-06'],
    description: 'Environmental controller managing greenhouse climate and fermentation chambers.',
  },
  {
    id: 'DHR-GW-04',
    name: 'DHRISHTI Heritage Granary Hub',
    location: 'Mysuru Seed Vault & Granary',
    ipAddress: '192.168.1.40',
    protocol: 'Cellular 4G LTE Backup',
    status: 'online',
    nodeIds: [],
    description: 'Standby backup gateway for heritage storage silos and auxiliary probes.',
  },
]
