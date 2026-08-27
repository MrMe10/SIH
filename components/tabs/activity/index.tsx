import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_ROOMS } from './mock-data';
import { Room, getOverallStatus } from './types';
import { SimulationGrid } from './simulation-grid';
import { RoomDetails } from './room-details';
import { SimulationControls } from './simulation-controls';
import dynamic from 'next/dynamic';
import { ActivityChart } from './activity-chart';

const DeviceMap = dynamic(() => import('./device-map'), { ssr: false });

export default function ActivityTab() {
  const [activeView, setActiveView] = useState<'simulation' | 'deviceMap'>('simulation');
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('R-03');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const selectedRoom = useMemo(() => {
    return rooms.find((r) => r.id === selectedRoomId) || rooms[0];
  }, [rooms, selectedRoomId]);

  const summary = useMemo(() => {
    let normal = 0, warning = 0, alert = 0;
    rooms.forEach((room) => {
      const status = getOverallStatus(room);
      if (status === 'normal') normal++;
      else if (status === 'warning') warning++;
      else if (status === 'alert') alert++;
    });
    return { total: rooms.length, normal, warning, alert };
  }, [rooms]);

  const updateSelectedRoomParam = (key: 'temperature' | 'humidity' | 'gas', value: number) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id !== selectedRoomId) return room;
        const updatedRoom = { ...room, [key]: value };
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newHistoryItem = { time: timeStr, temperature: updatedRoom.temperature, humidity: updatedRoom.humidity, gas: updatedRoom.gas };
        return { ...updatedRoom, history: [...updatedRoom.history.slice(-9), newHistoryItem] };
      })
    );
  };

  return (
    <div className="p-6 bg-slate-950 text-slate-100 min-h-screen">
      {/* Navigation Toggle between Simulation & Legacy Device Map */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white">DHRISHTI Activity Module</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time micro-climate simulation & node monitoring</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveView('simulation')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeView === 'simulation' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-400'
            }`}
          >
            Simulation Module
          </button>
          <button
            onClick={() => setActiveView('deviceMap')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeView === 'deviceMap' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-400'
            }`}
          >
            Device Map View
          </button>
        </div>
      </div>

      {activeView === 'deviceMap' ? (
        <DeviceMap />
      ) : (
        <>
          {/* Warehouse Metrics Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <p className="text-xs text-slate-400">Total Rooms</p>
              <p className="text-2xl font-bold text-white">{summary.total}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <p className="text-xs text-emerald-400">Normal</p>
              <p className="text-2xl font-bold text-emerald-400">{summary.normal}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <p className="text-xs text-amber-400">Warning</p>
              <p className="text-2xl font-bold text-amber-400">{summary.warning}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <p className="text-xs text-rose-400">Alert</p>
              <p className="text-2xl font-bold text-rose-400">{summary.alert}</p>
            </div>
          </div>

          <SimulationGrid rooms={rooms} selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <RoomDetails room={selectedRoom} />
            <SimulationControls
              temperature={selectedRoom.temperature}
              humidity={selectedRoom.humidity}
              gas={selectedRoom.gas}
              isSimulating={isSimulating}
              onTemperatureChange={(val) => updateSelectedRoomParam('temperature', val)}
              onHumidityChange={(val) => updateSelectedRoomParam('humidity', val)}
              onGasChange={(val) => updateSelectedRoomParam('gas', val)}
              onToggleSimulation={() => setIsSimulating(!isSimulating)}
              onReset={() => setRooms(INITIAL_ROOMS)}
              onApplyScenario={() => {}}
            />
          </div>

          {/* <SimulationAlert room={selectedRoom} />
          <ActivityChart data={selectedRoom.history} roomName={selectedRoom.name} /> */}
        </>
      )}
    </div>
  );
}