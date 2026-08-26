import React from 'react';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

interface SimulationControlsProps {
  temperature: number;
  humidity: number;
  gas: number;
  isSimulating: boolean;
  onTemperatureChange: (val: number) => void;
  onHumidityChange: (val: number) => void;
  onGasChange: (val: number) => void;
  onToggleSimulation: () => void;
  onReset: () => void;
  onApplyScenario: (scenario: 'normal' | 'high_temp' | 'high_humidity' | 'critical') => void;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  temperature,
  humidity,
  gas,
  isSimulating,
  onTemperatureChange,
  onHumidityChange,
  onGasChange,
  onToggleSimulation,
  onReset,
  onApplyScenario,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Simulation Controls
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSimulation}
              className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isSimulating
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isSimulating ? 'Pause Auto' : 'Start Auto'}
            </button>
            <button
              onClick={onReset}
              className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Temperature</span>
              <span className="font-mono font-bold text-rose-400">{temperature}°C</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={temperature}
              onChange={(e) => onTemperatureChange(Number(e.target.value))}
              className="w-full accent-rose-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>10°C</span>
              <span>30°C (Warn)</span>
              <span>35°C (Alert)</span>
              <span>50°C</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Humidity</span>
              <span className="font-mono font-bold text-sky-400">{humidity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={humidity}
              onChange={(e) => onHumidityChange(Number(e.target.value))}
              className="w-full accent-sky-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>20%</span>
              <span>70% (Warn)</span>
              <span>80% (Alert)</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Gas Level</span>
              <span className="font-mono font-bold text-amber-400">{gas} PPM</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={gas}
              onChange={(e) => onGasChange(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>0</span>
              <span>40 (Warn)</span>
              <span>70 (Alert)</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Scenarios */}
      <div className="mt-5 pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-400 mb-2 flex items-center gap-1 font-semibold">
          <Zap className="w-3.5 h-3.5 text-amber-400" /> Fast Preset Scenarios
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onApplyScenario('normal')}
            className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-left transition-colors"
          >
            🟢 Normal Storage
          </button>
          <button
            onClick={() => onApplyScenario('high_temp')}
            className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-left transition-colors"
          >
            🔥 High Temp
          </button>
          <button
            onClick={() => onApplyScenario('high_humidity')}
            className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-left transition-colors"
          >
            💧 High Moisture
          </button>
          <button
            onClick={() => onApplyScenario('critical')}
            className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-left transition-colors"
          >
            🚨 Critical All
          </button>
        </div>
      </div>
    </div>
  );
};