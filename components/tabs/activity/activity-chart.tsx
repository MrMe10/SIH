import React from 'react';
import { SensorHistory } from './types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

interface ActivityChartProps {
  data: SensorHistory[];
  roomName: string;
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ data, roomName }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          {roomName} — Real-time Parameter Progression
        </h3>
        <span className="text-xs text-slate-500">Live Simulation History</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.5rem',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line
              type="monotone"
              dataKey="temperature"
              name="Temp (°C)"
              stroke="#f43f5e"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              name="Humidity (%)"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="gas"
              name="Gas (PPM)"
              stroke="#fbbf24"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};