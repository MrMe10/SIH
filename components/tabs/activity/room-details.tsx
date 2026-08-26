import React from 'react';
import { Room, getOverallStatus, getParamStatus, THRESHOLDS } from './types';
import { Thermometer, Droplets, Wind, Cpu, Package } from 'lucide-react';

interface RoomDetailsProps {
  room: Room;
}

export const RoomDetails: React.FC<RoomDetailsProps> = ({ room }) => {
  const overallStatus = getOverallStatus(room);

  const tempStatus = getParamStatus(room.temperature, THRESHOLDS.temp.warning, THRESHOLDS.temp.alert);
  const humStatus = getParamStatus(room.humidity, THRESHOLDS.humidity.warning, THRESHOLDS.humidity.alert);
  const gasStatus = getParamStatus(room.gas, THRESHOLDS.gas.warning, THRESHOLDS.gas.alert);

  const getStatusColor = (status: string) => {
    if (status === 'alert') return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (status === 'warning') return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{room.name}</h3>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-slate-500" /> {room.crop} ({room.sacks} Sacks)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-slate-500" /> Node: {room.parentSensor}
              </span>
            </p>
          </div>
          <span
            className={`text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-md border ${getStatusColor(
              overallStatus
            )}`}
          >
            {overallStatus}
          </span>
        </div>

        <div className="space-y-3 mt-4">
          {/* Temperature */}
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-rose-500/10 text-rose-400">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Temperature</p>
                <p className="text-sm font-semibold text-slate-200">
                  {tempStatus === 'normal' ? 'Optimal' : tempStatus === 'warning' ? 'Elevated' : 'Critical'}
                </p>
              </div>
            </div>
            <span className={`text-lg font-mono font-bold ${getStatusColor(tempStatus).split(' ')[0]}`}>
              {room.temperature}°C
            </span>
          </div>

          {/* Humidity */}
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-sky-500/10 text-sky-400">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Moisture / Humidity</p>
                <p className="text-sm font-semibold text-slate-200">
                  {humStatus === 'normal' ? 'Optimal' : humStatus === 'warning' ? 'High' : 'Critical'}
                </p>
              </div>
            </div>
            <span className={`text-lg font-mono font-bold ${getStatusColor(humStatus).split(' ')[0]}`}>
              {room.humidity}%
            </span>
          </div>

          {/* Gas Level */}
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-amber-500/10 text-amber-400">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Gas Level (PPM)</p>
                <p className="text-sm font-semibold text-slate-200">
                  {gasStatus === 'normal' ? 'Clean Air' : gasStatus === 'warning' ? 'Moderate Gas' : 'High Spoiled Air'}
                </p>
              </div>
            </div>
            <span className={`text-lg font-mono font-bold ${getStatusColor(gasStatus).split(' ')[0]}`}>
              {room.gas}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
        <span>Hardware Mapping: ESP32 Node</span>
        <span className="font-mono text-slate-400">Active</span>
      </div>
    </div>
  );
};