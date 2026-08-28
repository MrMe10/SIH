'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Activity, MapPin } from "lucide-react";
import Link from 'next/link';

const IndiaMap = dynamic(() => import("@/components/maps/IndiaMap"), { ssr: false });

export default function OverviewPage() {
  const [installations, setInstallations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Trigger a simulation tick to advance the data
        await fetch('/api/cron/simulate', { method: 'POST' });
        
        // Fetch new data
        const res = await fetch('/api/installations');
        const data = await res.json();
        if (Array.isArray(data)) setInstallations(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5s for live updates
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-[calc(100vh-56px)] bg-neutral-950">
      {/* Left Pane: Map */}
      <div className="w-2/3 h-full relative border-r border-white/5">
        <IndiaMap installations={installations} />
      </div>

      {/* Right Pane: Cards List */}
      <div className="w-1/3 h-full bg-neutral-950 p-8 overflow-y-auto">
        <h2 className="text-xs font-semibold text-neutral-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse"></span>
           Live Karnataka Grid
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {installations.map((inst) => {
            const isSafe = inst.status === 'SAFE';
            
            const cardStyle = isSafe 
              ? 'border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/40' 
              : 'border-red-500/40 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.1)]';
              
            return (
              <Link href={`/devices/${inst.id}`} key={inst.id} className="block">
                <div 
                  className={`group relative py-6 px-4 rounded-xl transition-all cursor-pointer h-full flex flex-col justify-between border ${cardStyle}`}
                >
                  <h3 className="font-medium text-white text-xs mb-1 pr-4 truncate group-hover:text-blue-400 transition-colors">
                    {inst.name}
                  </h3>
                  <p className="text-[10px] text-neutral-500 mb-4">{inst.nodesCount} active nodes</p>
                  
                  <div className="flex justify-between items-center bg-black/40 rounded px-2 py-1.5 border border-white/5 text-[10px] group-hover:border-white/10 transition-colors">
                    <span className="text-neutral-500 font-medium">T <span className="text-neutral-300 ml-0.5">{inst.temp.toFixed(0)}°</span></span>
                    <span className="text-neutral-500 font-medium">H <span className="text-neutral-300 ml-0.5">{inst.humidity.toFixed(0)}%</span></span>
                    <span className="text-neutral-500 font-medium">G <span className="text-neutral-300 ml-0.5">{inst.co2.toFixed(0)}%</span></span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-8 text-center text-xs font-medium tracking-wider text-neutral-600 uppercase">
          More states & regions coming soon
        </div>
      </div>
    </div>
  );
}
