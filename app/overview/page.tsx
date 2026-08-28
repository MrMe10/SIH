'use client';

import IndiaMap from "@/components/maps/IndiaMap";
import { Activity, MapPin } from "lucide-react";

const mockInstallations = [
  { id: '1', name: 'Drishti Raichur 1', temp: 24, humidity: 10, co2: 5, status: 'SAFE' },
  { id: '2', name: 'Drishti Raichur 2', temp: 24, humidity: 10, co2: 5, status: 'SAFE' },
  { id: '3', name: 'Drishti Raichur 3', temp: 24, humidity: 30, co2: 25, status: 'CRITICAL' },
];

export default function OverviewPage() {
  return (
    <div className="flex h-[calc(100vh-56px)] bg-neutral-950">
      {/* Left Pane: Map */}
      <div className="w-2/3 h-full relative border-r border-white/5">
        <div className="absolute top-6 left-6 z-10 bg-neutral-950/80 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-xl flex items-center gap-3">
           <MapPin className="text-neutral-400 h-4 w-4" />
           <span className="text-sm font-medium text-white tracking-wide">Live Deployments</span>
        </div>
        <IndiaMap installations={mockInstallations} />
      </div>

      {/* Right Pane: Cards List */}
      <div className="w-1/3 h-full bg-neutral-950 p-8 overflow-y-auto">
        <h2 className="text-xs font-semibold text-neutral-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
           Karnataka Region
        </h2>
        
        <div className="flex flex-col gap-4">
          {mockInstallations.map((inst) => {
            const isSafe = inst.status === 'SAFE';
            return (
              <div 
                key={inst.id}
                className="group relative border border-white/5 p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-default"
              >
                {/* Status Dot */}
                <div className={`absolute top-5 right-5 w-2 h-2 rounded-full ${isSafe ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse'}`} />
                
                <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-neutral-400" />
                  {inst.name}
                </h3>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                    <p className="text-[10px] text-neutral-500 uppercase font-medium mb-1 tracking-wider">Hum</p>
                    <p className="font-mono text-sm text-neutral-200">{inst.humidity}%</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                    <p className="text-[10px] text-neutral-500 uppercase font-medium mb-1 tracking-wider">Temp</p>
                    <p className="font-mono text-sm text-neutral-200">{inst.temp}°C</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                    <p className="text-[10px] text-neutral-500 uppercase font-medium mb-1 tracking-wider">CO2</p>
                    <p className="font-mono text-sm text-neutral-200">{inst.co2}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
