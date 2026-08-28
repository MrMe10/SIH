'use client';

import { useState, useEffect } from 'react';
import { useSimulationStore } from '@/store/useSimulationStore';
import { Bug, ThermometerSun, Leaf, CircleDashed } from 'lucide-react';

export default function SimulationPage() {
  const { 
    modules, 
    logs, 
    triggerSpoilage, 
    triggerFungus, 
    setGlobalModifiers, 
    tickSimulation,
    isSimulating
  } = useSimulationStore();

  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, moduleId: string } | null>(null);
  const [hoveredMod, setHoveredMod] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        tickSimulation();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, tickSimulation]);

  const handleSackClick = (e: React.MouseEvent, moduleId: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({ x: rect.right, y: rect.top, moduleId });
  };

  const closeContext = () => setContextMenu(null);

  const getModBg = (status: string) => status === 'SAFE' ? 'bg-green-500/5' : 'bg-red-500/10';
  const getModBorder = (status: string) => status === 'SAFE' ? 'border-green-500/20' : 'border-red-500/40';

  return (
    <div className="flex h-[calc(100vh-56px)] bg-neutral-950 font-sans text-sm" onClick={closeContext}>
      
      {/* Left Pane: Interactive Grid */}
      <div className="w-1/2 p-10 border-r border-white/5 flex items-center justify-center relative bg-[#0a0a0a]">
        <div className="w-full max-w-xl aspect-square bg-neutral-900/40 rounded-3xl p-4 border border-white/5 shadow-2xl relative grid grid-cols-2 grid-rows-2 gap-4">
          
          {Object.values(modules).map((mod) => (
            <div key={mod.id} className={`border rounded-2xl relative transition-colors ${getModBorder(mod.status)} ${getModBg(mod.status)}`}>
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-950 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-neutral-400 z-10 shadow-lg">
                 {mod.node_type === 'PARENT' ? 'P1' : mod.node_type.replace('NODE', 'N')}
               </div>

               {/* Sacks */}
               <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-4">
                 {[1, 2, 3, 4].map(idx => (
                    <div 
                      key={idx}
                      className="flex items-center justify-center rounded-full border border-white/10 bg-black/40 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
                      onClick={(e) => handleSackClick(e, mod.id)}
                      onMouseEnter={() => setHoveredMod(mod.id)}
                      onMouseLeave={() => setHoveredMod(null)}
                    >
                      <CircleDashed className="w-6 h-6 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                    </div>
                 ))}
               </div>

               {/* Hover Tooltip inside module */}
               {hoveredMod === mod.id && !contextMenu && (
                 <div className="absolute top-4 right-4 bg-neutral-950/90 backdrop-blur border border-white/10 p-3 rounded-lg z-20 shadow-xl w-32 animate-in fade-in zoom-in-95 duration-200">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold tracking-wider mb-2">{mod.crop_type}</p>
                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex justify-between text-neutral-300"><span>T:</span><span>{mod.temp.toFixed(1)}°C</span></div>
                      <div className="flex justify-between text-neutral-300"><span>H:</span><span>{mod.humidity.toFixed(1)}%</span></div>
                      <div className="flex justify-between text-neutral-300"><span>G:</span><span>{mod.co2.toFixed(1)}%</span></div>
                    </div>
                 </div>
               )}
            </div>
          ))}

          {/* Context Menu for click */}
          {contextMenu && (
             <div 
               className="fixed bg-neutral-900 border border-white/10 p-1.5 rounded-xl z-50 shadow-2xl w-48 animate-in slide-in-from-left-2 duration-200"
               style={{ top: contextMenu.y - 40, left: contextMenu.x + 16 }}
               onClick={(e) => e.stopPropagation()}
             >
                <div className="text-[10px] text-neutral-500 uppercase font-semibold tracking-wider px-3 py-2 mb-1">Simulate Anomaly</div>
                <button 
                  className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-red-500/10 hover:text-red-400 text-sm text-neutral-300 rounded-lg transition-colors"
                  onClick={() => { triggerSpoilage(contextMenu.moduleId); closeContext(); }}
                >
                  <ThermometerSun className="w-4 h-4" /> Spoilage
                </button>
                <button 
                  className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-green-500/10 hover:text-green-400 text-sm text-neutral-300 rounded-lg transition-colors mt-1"
                  onClick={() => { triggerFungus(contextMenu.moduleId); closeContext(); }}
                >
                  <Bug className="w-4 h-4" /> Fungus Growth
                </button>
             </div>
          )}

        </div>
      </div>

      {/* Right Pane */}
      <div className="w-1/2 flex flex-col p-8 gap-8 bg-neutral-950">
        
        {/* Top Right: Inputs */}
        <div className="border border-white/5 p-6 rounded-2xl bg-white/[0.02] flex-none">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center border border-white/10">
              <Leaf className="w-4 h-4 text-neutral-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Global Modifiers</h3>
              <p className="text-xs text-neutral-500">Adjust baseline room parameters</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Temperature Variance</label>
              </div>
              <input type="range" className="w-full accent-neutral-500" min="-10" max="10" defaultValue="0" 
                onChange={(e) => setGlobalModifiers({ temp: parseInt(e.target.value) })}/>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Humidity Variance</label>
              </div>
              <input type="range" className="w-full accent-neutral-500" min="-20" max="20" defaultValue="0" 
                onChange={(e) => setGlobalModifiers({ humidity: parseInt(e.target.value) })}/>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Gas (CO2) Variance</label>
              </div>
              <input type="range" className="w-full accent-neutral-500" min="-10" max="10" defaultValue="0" 
                onChange={(e) => setGlobalModifiers({ co2: parseInt(e.target.value) })}/>
            </div>
          </div>
        </div>

        {/* Bottom Right: Output Log */}
        <div className="border border-white/10 rounded-2xl bg-[#050505] flex-1 flex flex-col relative overflow-hidden shadow-inner">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-neutral-900/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <span className="ml-2 text-xs font-mono text-neutral-500">simulation_output.log</span>
          </div>
          
          <div className="overflow-y-auto flex-1 p-4 font-mono text-[13px] leading-relaxed">
            {logs.length === 0 ? (
              <p className="text-neutral-600">waiting for simulation events...</p>
            ) : (
              <div className="space-y-1.5">
                {logs.map((log, i) => {
                  const isWarning = log.includes('WARNING');
                  return (
                    <div key={i} className={`animate-in fade-in slide-in-from-bottom-1 ${isWarning ? 'text-red-400 font-semibold bg-red-500/10 px-2 py-0.5 rounded' : 'text-neutral-300'}`}>
                      <span className="text-neutral-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                      {log}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
