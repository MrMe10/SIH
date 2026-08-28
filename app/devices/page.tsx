'use client';
import Link from 'next/link';
import { Activity } from 'lucide-react';

const mockInstallations = [
  { id: '1', name: 'Drishti Raichur 1', temp: 24, humidity: 10, co2: 5, status: 'SAFE' },
  { id: '2', name: 'Drishti Raichur 2', temp: 24, humidity: 10, co2: 5, status: 'SAFE' },
  { id: '3', name: 'Drishti Raichur 3', temp: 24, humidity: 30, co2: 25, status: 'CRITICAL' },
  { id: '4', name: 'Drishti Raichur 4', temp: 24, humidity: 10, co2: 5, status: 'SAFE' },
  { id: '5', name: 'Drishti Raichur 5', temp: 24, humidity: 20, co2: 15, status: 'SAFE' },
  { id: '6', name: 'Drishti Raichur 6', temp: 24, humidity: 67, co2: 67, status: 'CRITICAL' },
];

export default function DevicesPage() {
  return (
    <div className="h-[calc(100vh-56px)] bg-neutral-950 p-8 overflow-y-auto">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-sm font-medium text-white mb-8 tracking-wide">All Devices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockInstallations.map((inst) => {
            const isSafe = inst.status === 'SAFE';
            return (
              <Link href={`/devices/${inst.id}`} key={inst.id}>
                <div 
                  className="group relative border border-white/5 p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <div className={`absolute top-5 right-5 w-2 h-2 rounded-full ${isSafe ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse'}`} />
                  
                  <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-neutral-400" />
                    {inst.name}
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-black/30 rounded-lg p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                      <p className="text-[10px] text-neutral-500 uppercase font-medium mb-1 tracking-wider">Hum</p>
                      <p className="font-mono text-sm text-neutral-200">{inst.humidity}%</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                      <p className="text-[10px] text-neutral-500 uppercase font-medium mb-1 tracking-wider">Temp</p>
                      <p className="font-mono text-sm text-neutral-200">{inst.temp}°C</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                      <p className="text-[10px] text-neutral-500 uppercase font-medium mb-1 tracking-wider">CO2</p>
                      <p className="font-mono text-sm text-neutral-200">{inst.co2}%</p>
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
