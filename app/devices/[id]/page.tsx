'use client';
import { useState } from 'react';
import { useSimulationStore } from '@/store/useSimulationStore';
import { Server, Activity, Thermometer, Droplets, Wind } from 'lucide-react';

export default function DeviceDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'devices' | 'graphs' | 'tables'>('devices');
  const modules = useSimulationStore((state) => state.modules);

  const getModBg = (status: string) => status === 'SAFE' ? 'bg-green-500/5' : 'bg-red-500/10';
  const getModBorder = (status: string) => status === 'SAFE' ? 'border-green-500/20' : 'border-red-500/40';
  const getIndicator = (status: string) => status === 'SAFE' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse';

  return (
    <div className="flex h-[calc(100vh-56px)] bg-neutral-950">
      {/* Left Pane: 2x2 Grid */}
      <div className="w-1/2 p-10 border-r border-white/5 flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-full max-w-xl aspect-square bg-neutral-900/40 rounded-3xl p-4 border border-white/5 shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-950 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium text-neutral-400 flex items-center gap-2">
            <Server className="w-3 h-3" />
            Physical Layout
          </div>
          
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
            {Object.values(modules).map((mod) => (
              <div key={mod.id} className={`border rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden ${getModBorder(mod.status)} ${getModBg(mod.status)}`}>
                <div className={`absolute top-0 left-0 w-full h-1 ${mod.status === 'SAFE' ? 'bg-green-500/20' : 'bg-red-500/60'}`} />
                <div className="flex justify-between items-start z-10">
                  <div>
                    <h4 className="font-semibold text-white tracking-wide">{mod.name}</h4>
                    <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">{mod.crop_type}</span>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full ${getIndicator(mod.status)}`} />
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-6 z-10">
                  <div className="bg-black/40 rounded-lg p-2.5 border border-white/5">
                    <div className="flex items-center gap-1.5 mb-1 text-neutral-500">
                      <Thermometer className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-medium tracking-wider">Temp</span>
                    </div>
                    <p className="font-mono text-sm text-neutral-200">{mod.temp.toFixed(1)}°C</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-2.5 border border-white/5">
                    <div className="flex items-center gap-1.5 mb-1 text-neutral-500">
                      <Droplets className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-medium tracking-wider">Hum</span>
                    </div>
                    <p className="font-mono text-sm text-neutral-200">{mod.humidity.toFixed(1)}%</p>
                  </div>
                  <div className="col-span-2 bg-black/40 rounded-lg p-2.5 border border-white/5">
                    <div className="flex items-center gap-1.5 mb-1 text-neutral-500">
                      <Wind className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-medium tracking-wider">CO2</span>
                    </div>
                    <p className="font-mono text-sm text-neutral-200">{mod.co2.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Pane: Tabs */}
      <div className="w-1/2 flex flex-col bg-neutral-950">
        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-wide text-white flex items-center gap-3">
            <Activity className="w-5 h-5 text-neutral-400" />
            DRISHTI RAICHUR {params.id}
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-xs text-neutral-400 font-medium">System Online</span>
          </div>
        </div>

        {/* Tab Triggers */}
        <div className="px-10 py-6">
          <div className="inline-flex bg-neutral-900 border border-white/5 p-1 rounded-xl">
            {(['devices', 'graphs', 'tables'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  activeTab === tab 
                    ? 'bg-neutral-800 text-white shadow-sm border border-white/10' 
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto px-10 pb-10">
          {activeTab === 'devices' && (
             <div className="grid grid-cols-2 gap-4 max-w-lg">
                {Object.values(modules).map((mod) => (
                  <div key={mod.id} className={`border rounded-xl p-4 transition-colors ${mod.status === 'SAFE' ? 'bg-neutral-900/50 border-white/5' : 'bg-red-500/10 border-red-500/30'}`}>
                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                      <span className="font-semibold text-white">{mod.node_type === 'PARENT' ? 'Parent Module' : mod.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${mod.status === 'SAFE' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {mod.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-500">Temperature</span>
                        <span className="font-mono text-sm text-neutral-200">{mod.temp.toFixed(1)}°C</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-500">Humidity</span>
                        <span className="font-mono text-sm text-neutral-200">{mod.humidity.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-500">Gas Level</span>
                        <span className="font-mono text-sm text-neutral-200">{mod.co2.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          )}

          {activeTab === 'graphs' && (
            <div className="text-neutral-400 text-sm">
              <p className="mb-6 font-medium">Telemetry History (24h)</p>
              <div className="grid grid-cols-2 gap-6">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="border border-white/5 rounded-xl p-4 h-48 flex items-center justify-center bg-neutral-900/30">
                       <span className="text-xs font-mono text-neutral-600">Recharts LineChart {i}</span>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'tables' && (
            <div className="border border-white/5 rounded-xl overflow-hidden bg-neutral-900/30">
               <table className="w-full text-left text-sm">
                 <thead className="bg-neutral-900 text-neutral-400 text-xs uppercase tracking-wider">
                   <tr>
                     <th className="px-4 py-3 border-b border-r border-white/5 font-medium">Node</th>
                     <th className="px-4 py-3 border-b border-r border-white/5 font-medium">Metric</th>
                     <th className="px-4 py-3 border-b border-white/5 font-medium">Current</th>
                   </tr>
                 </thead>
                 <tbody className="text-neutral-300">
                   {Object.values(modules).map((mod, idx) => (
                      <tr key={mod.id} className={`border-b border-white/5 last:border-b-0 ${mod.status === 'CRITICAL' ? 'bg-red-500/10' : 'hover:bg-white/[0.02]'}`}>
                        <td className="px-4 py-3 border-r border-white/5 align-top">
                          <div className="font-medium text-white">{mod.node_type === 'PARENT' ? 'P1' : `N${idx}`}</div>
                          <div className="text-[10px] text-neutral-500 uppercase">{mod.crop_type}</div>
                        </td>
                        <td className="px-4 py-3 border-r border-white/5 align-top">
                          <div className="space-y-2 text-xs text-neutral-400">
                            <div>Temperature</div>
                            <div>Humidity</div>
                            <div>Gas (CO2)</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top font-mono text-sm">
                          <div className="space-y-2">
                            <div className={mod.temp > 30 ? 'text-red-400' : 'text-neutral-200'}>{mod.temp.toFixed(1)}°C</div>
                            <div className={mod.humidity > 60 ? 'text-red-400' : 'text-neutral-200'}>{mod.humidity.toFixed(1)}%</div>
                            <div className={mod.co2 > 20 ? 'text-red-400' : 'text-neutral-200'}>{mod.co2.toFixed(1)}%</div>
                          </div>
                        </td>
                      </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
