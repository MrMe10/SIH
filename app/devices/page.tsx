'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';

export default function DevicesPage() {
  const [installations, setInstallations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/installations');
        const data = await res.json();
        if (Array.isArray(data)) setInstallations(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-56px)] bg-neutral-950 p-8 overflow-y-auto">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-sm font-medium text-white mb-8 tracking-wide">All Devices ({installations.length})</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {installations.map((inst) => {
            const isSafe = inst.status === 'SAFE';
            
            const cardStyle = isSafe 
              ? 'border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/40' 
              : 'border-red-500/40 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.15)]';

            return (
              <Link href={`/devices/${inst.id}`} key={inst.id}>
                <div 
                  className={`group relative p-5 rounded-xl transition-all cursor-pointer hover:scale-[1.02] border ${cardStyle}`}
                >
                  <h3 className="font-medium text-white mb-1 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-neutral-400" />
                    {inst.name}
                  </h3>
                  <p className="text-[10px] text-neutral-500 mb-4">{inst.nodesCount} active nodes</p>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-black/30 rounded-lg p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                      <p className="text-[10px] text-neutral-500 uppercase font-medium mb-1 tracking-wider">Hum</p>
                      <p className="font-mono text-sm text-neutral-200">{inst.humidity.toFixed(1)}%</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                      <p className="text-[10px] text-neutral-500 uppercase font-medium mb-1 tracking-wider">Temp</p>
                      <p className="font-mono text-sm text-neutral-200">{inst.temp.toFixed(1)}°C</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                      <p className="text-[10px] text-neutral-500 uppercase font-medium mb-1 tracking-wider">CO2</p>
                      <p className="font-mono text-sm text-neutral-200">{inst.co2.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
