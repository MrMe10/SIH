import React, { useState } from 'react';
import { Room, getOverallStatus } from './types';
import {
  Cpu,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Thermometer,
  Droplets,
  X,
  PackageCheck,
  PackageX,
  Activity,
} from 'lucide-react';

function calculateSackRisk(room: Room) {
  const status = getOverallStatus(room);
  if (status === 'alert') {
    return {
      good: Math.floor(room.sacks * 0.3),
      atRisk: Math.floor(room.sacks * 0.4),
      critical: Math.ceil(room.sacks * 0.3),
    };
  }
  if (status === 'warning') {
    return {
      good: Math.floor(room.sacks * 0.6),
      atRisk: Math.ceil(room.sacks * 0.4),
      critical: 0,
    };
  }
  return {
    good: room.sacks,
    atRisk: 0,
    critical: 0,
  };
}

interface SimulationGridProps {
  rooms: Room[];
  selectedRoomId: string;
  onSelectRoom: (id: string) => void;
}

interface SackDetailModal {
  room: Room;
  quadrant: 'Top-Left' | 'Top-Right' | 'Bottom-Left' | 'Bottom-Right';
  sackCount: number;
}

export const SimulationGrid: React.FC<SimulationGridProps> = ({
  rooms,
  selectedRoomId,
  onSelectRoom,
}) => {
  const [activeSackModal, setActiveSackModal] = useState<SackDetailModal | null>(null);

  const handleSackClick = (
    e: React.MouseEvent,
    room: Room,
    quadrant: 'Top-Left' | 'Top-Right' | 'Bottom-Left' | 'Bottom-Right',
    count: number
  ) => {
    e.stopPropagation();
    setActiveSackModal({ room, quadrant, sackCount: count });
  };

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6 shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Crop Storage Warehouse Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any compartment for full telemetry, or click individual corner sacks to inspect specific batch health.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
            {rooms.length} Storage Bays Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rooms.map((room) => {
            const status = getOverallStatus(room);
            const isSelected = room.id === selectedRoomId;

            let theme = {
              border: 'border-slate-800 hover:border-emerald-500/80',
              bg: 'bg-slate-950/80',
              glow: 'hover:shadow-emerald-500/10',
              statusText: 'text-emerald-400',
              statusBg: 'bg-emerald-500/10 border-emerald-500/30',
              icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
              label: 'NORMAL',
            };

            if (status === 'warning') {
              theme = {
                border: 'border-amber-500/50 hover:border-amber-400',
                bg: 'bg-amber-950/20',
                glow: 'hover:shadow-amber-500/20',
                statusText: 'text-amber-400',
                statusBg: 'bg-amber-500/10 border-amber-500/30',
                icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
                label: 'WARNING',
              };
            } else if (status === 'alert') {
              theme = {
                border: 'border-rose-500/60 hover:border-rose-400',
                bg: 'bg-rose-950/30',
                glow: 'hover:shadow-rose-500/30',
                statusText: 'text-rose-400',
                statusBg: 'bg-rose-500/20 border-rose-500/40',
                icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
                label: 'ALERT',
              };
            }

            const quadrantCount = Math.ceil(room.sacks / 4);

            return (
              <div
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className={`group relative text-left h-52 p-4 rounded-xl border transition-all duration-300 overflow-hidden shadow-lg cursor-pointer ${
                  theme.bg
                } ${theme.border} ${theme.glow} ${
                  isSelected ? 'ring-2 ring-emerald-400 border-transparent shadow-emerald-500/20' : ''
                }`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

                <button
                  type="button"
                  onClick={(e) => handleSackClick(e, room, 'Top-Left', quadrantCount)}
                  className="absolute top-2 left-2 z-30 flex items-center gap-1 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/60 px-2 py-1 rounded-lg transition-all transform hover:scale-105 shadow-md"
                  title="Inspect Top-Left Batch"
                >
                  <span className="text-xs">🌾</span>
                  <span className="text-[10px] font-mono font-bold text-slate-300">
                    {quadrantCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSackClick(e, room, 'Top-Right', quadrantCount)}
                  className="absolute top-2 right-2 z-30 flex items-center gap-1 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/60 px-2 py-1 rounded-lg transition-all transform hover:scale-105 shadow-md"
                  title="Inspect Top-Right Batch"
                >
                  <span className="text-xs">🌾</span>
                  <span className="text-[10px] font-mono font-bold text-slate-300">
                    {quadrantCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSackClick(e, room, 'Bottom-Left', quadrantCount)}
                  className="absolute bottom-2 left-2 z-30 flex items-center gap-1 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/60 px-2 py-1 rounded-lg transition-all transform hover:scale-105 shadow-md"
                  title="Inspect Bottom-Left Batch"
                >
                  <span className="text-xs">🌾</span>
                  <span className="text-[10px] font-mono font-bold text-slate-300">
                    {quadrantCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSackClick(e, room, 'Bottom-Right', quadrantCount)}
                  className="absolute bottom-2 right-2 z-30 flex items-center gap-1 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/60 px-2 py-1 rounded-lg transition-all transform hover:scale-105 shadow-md"
                  title="Inspect Bottom-Right Batch"
                >
                  <span className="text-xs">🌾</span>
                  <span className="text-[10px] font-mono font-bold text-slate-300">
                    {quadrantCount}
                  </span>
                </button>

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <div className="text-[11px] font-mono tracking-widest text-slate-400 font-bold mb-0.5">
                    {room.id}
                  </div>

                  <h4 className="font-extrabold text-white text-lg tracking-wide uppercase drop-shadow">
                    {room.crop}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium mb-2">
                    Total Storage: <span className="text-slate-200 font-bold">{room.sacks} Sacks</span>
                  </p>

                  <div className="bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-inner">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-slate-200 font-semibold">
                      {room.parentSensor}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-3 mt-2.5 text-xs font-mono">
                    <span className="flex items-center gap-1 text-rose-400 font-semibold bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-900/50">
                      <Thermometer className="w-3 h-3" /> {room.temperature}°C
                    </span>
                    <span className="flex items-center gap-1 text-sky-400 font-semibold bg-sky-950/40 px-1.5 py-0.5 rounded border border-sky-900/50">
                      <Droplets className="w-3 h-3" /> {room.humidity}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeSackModal && (
        <SackInspectionModal
          data={activeSackModal}
          onClose={() => setActiveSackModal(null)}
        />
      )}
    </>
  );
};

// Simplified Sub-component
function SackInspectionModal({
  data,
  onClose,
}: {
  data: SackDetailModal;
  onClose: () => void;
}) {
  const { room, quadrant, sackCount } = data;
  const status = getOverallStatus(room);
  const sackRisk = calculateSackRisk(room);

  let healthLabel = 'Good Condition';
  let statusBadgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
  let fungalRisk = 'Low (< 5%)';

  if (status === 'warning') {
    healthLabel = 'Moisture Warning';
    statusBadgeClass = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    fungalRisk = 'Moderate (25%-35%)';
  } else if (status === 'alert') {
    healthLabel = 'High Spoilage Risk';
    statusBadgeClass = 'bg-rose-500/20 text-rose-400 border-rose-500/40';
    fungalRisk = 'Critical (> 65%)';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 shadow-2xl relative">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌾</span>
              <h3 className="text-base font-bold text-white">
                Sack Batch ({quadrant})
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Bay: <span className="text-slate-200 font-semibold">{room.name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-sky-400" />
            <div>
              <p className="text-[10px] text-slate-400">Condition</p>
              <p className="text-xs font-bold text-slate-100">{healthLabel}</p>
            </div>
          </div>
          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-lg border uppercase ${statusBadgeClass}`}>
            {status}
          </span>
        </div>

        {/* Essential Info: Sacks & Fungal Risk */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-center">
            <span className="text-[10px] text-slate-400 block">Inspected Sacks</span>
            <p className="text-base font-bold text-slate-100 font-mono mt-0.5">{sackCount} Sacks</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-center">
            <span className="text-[10px] text-slate-400 block">Fungal / Mold Risk</span>
            <p className={`text-base font-bold font-mono mt-0.5 ${status === 'alert' ? 'text-rose-400' : status === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {fungalRisk}
            </p>
          </div>
        </div>

        {/* Spoilage Breakdown */}
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
          <p className="text-[10px] font-bold text-slate-400 mb-2.5 uppercase tracking-wider text-center">
            Bay-Wide Breakdown ({room.crop})
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-lg">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
              <span className="text-emerald-400 font-bold block">{sackRisk.good}</span>
              <span className="text-[10px] text-slate-400">Good</span>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
              <span className="text-amber-400 font-bold block">{sackRisk.atRisk}</span>
              <span className="text-[10px] text-slate-400">At Risk</span>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/30 p-2 rounded-lg">
              <PackageX className="w-3.5 h-3.5 text-rose-400 mx-auto mb-1" />
              <span className="text-rose-400 font-bold block">{sackRisk.critical}</span>
              <span className="text-[10px] text-slate-400">Critical</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}