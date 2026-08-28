import { create } from 'zustand';

export type NodeStatus = 'SAFE' | 'CRITICAL';
export type NodeType = 'PARENT' | 'NODE1' | 'NODE2' | 'NODE3';

export interface ModuleState {
  id: string;
  name: string;
  node_type: NodeType;
  crop_type: string;
  temp: number;
  humidity: number;
  co2: number;
  status: NodeStatus;
}

export interface SimulationState {
  // Modules keyed by ID
  modules: Record<string, ModuleState>;
  logs: string[];
  isSimulating: boolean;
  simulationTarget: {
    moduleId: string | null;
    type: 'SPOILAGE' | 'FUNGUS' | null;
  };
  globalModifiers: {
    temp: number;
    humidity: number;
    co2: number;
  };

  // Actions
  initializeModules: (modules: ModuleState[]) => void;
  triggerSpoilage: (moduleId: string) => void;
  triggerFungus: (moduleId: string) => void;
  setGlobalModifiers: (modifiers: { temp?: number; humidity?: number; co2?: number }) => void;
  addLog: (message: string) => void;
  tickSimulation: () => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  modules: {
    'm-parent': { id: 'm-parent', name: 'Parent Module', node_type: 'PARENT', crop_type: 'Onion', temp: 24, humidity: 10, co2: 5, status: 'SAFE' },
    'm-node1': { id: 'm-node1', name: 'Node Module 1', node_type: 'NODE1', crop_type: 'Tomato', temp: 24, humidity: 10, co2: 5, status: 'SAFE' },
    'm-node2': { id: 'm-node2', name: 'Node Module 2', node_type: 'NODE2', crop_type: 'Potato', temp: 24, humidity: 10, co2: 5, status: 'SAFE' },
    'm-node3': { id: 'm-node3', name: 'Node Module 3', node_type: 'NODE3', crop_type: 'Wheat', temp: 24, humidity: 10, co2: 5, status: 'SAFE' },
  },
  logs: [],
  isSimulating: false,
  simulationTarget: { moduleId: null, type: null },
  globalModifiers: { temp: 0, humidity: 0, co2: 0 },

  initializeModules: (modulesList) => {
    const modulesMap: Record<string, ModuleState> = {};
    modulesList.forEach(m => modulesMap[m.id] = m);
    set({ modules: modulesMap });
  },

  triggerSpoilage: (moduleId) => {
    const state = get();
    const mod = state.modules[moduleId];
    if (mod) {
      set({ 
        simulationTarget: { moduleId, type: 'SPOILAGE' },
        logs: [...state.logs, `> Spoilage simulation started for ${mod.name}. Temp & Gas will increase.`],
        isSimulating: true
      });
    }
  },

  triggerFungus: (moduleId) => {
    const state = get();
    const mod = state.modules[moduleId];
    if (mod) {
      set({ 
        simulationTarget: { moduleId, type: 'FUNGUS' },
        logs: [...state.logs, `> Fungus growth simulation started for ${mod.name}. Humidity will increase rapidly.`],
        isSimulating: true
      });
    }
  },

  setGlobalModifiers: (mods) => {
    set((state) => ({
      globalModifiers: { ...state.globalModifiers, ...mods }
    }));
  },

  addLog: (msg) => set((state) => ({ logs: [...state.logs, msg] })),

  tickSimulation: () => {
    set((state) => {
      const newModules = { ...state.modules };
      let newLogs = [...state.logs];

      // Process targeted simulation
      if (state.isSimulating && state.simulationTarget.moduleId && state.simulationTarget.type) {
        const targetId = state.simulationTarget.moduleId;
        const type = state.simulationTarget.type;
        const mod = { ...newModules[targetId] };

        if (type === 'SPOILAGE') {
          mod.temp += 0.5;
          mod.co2 += 1.2;
        } else if (type === 'FUNGUS') {
          mod.humidity += 1.5;
          mod.temp += 0.2;
        }

        // Check thresholds
        if (mod.status === 'SAFE' && (mod.temp > 30 || mod.humidity > 60 || mod.co2 > 20)) {
          mod.status = 'CRITICAL';
          newLogs.push(`> WARNING: ${mod.name} anomaly arising! Threshold breached.`);
        }

        newModules[targetId] = mod;
      }

      // Apply global modifiers visually or incrementally (for now let's just let the UI reflect base + modifier)
      // Actually, standardizing on just incrementing the base is easier for this demo.
      Object.keys(newModules).forEach(key => {
         const mod = { ...newModules[key] };
         // We can apply global modifier slowly here or just let components read (mod.temp + global.temp)
         // Let's just update the base directly for simplicity if global modifiers are meant to be direct actions.
         if (state.globalModifiers.temp !== 0) {
            // mod.temp += state.globalModifiers.temp;
         }
         newModules[key] = mod;
      });

      return { modules: newModules, logs: newLogs };
    });
  }
}));
