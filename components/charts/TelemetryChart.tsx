'use client';
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Generate realistic looking wave data based on current metric
const generateMockHistory = (currentVal: number, points = 24) => {
  const data = [];
  let val = currentVal;
  for (let i = points; i >= 0; i--) {
    data.push({
      time: `${i}h ago`,
      value: Number(val.toFixed(1))
    });
    // Reverse walk to generate history
    val = val - (Math.random() * 2 - 1); 
  }
  return data.reverse();
};

export default function TelemetryChart({ 
  currentTemp, 
  currentHum, 
  currentCo2, 
  title 
}: { 
  currentTemp: number, 
  currentHum: number, 
  currentCo2: number,
  title: string
}) {
  
  // Memoize so it doesn't jump wildly every 5 seconds when polling happens
  const data = useMemo(() => {
    const history = [];
    let t = currentTemp;
    let h = currentHum;
    let c = currentCo2;
    
    for (let i = 24; i >= 0; i--) {
      history.push({
        time: i === 0 ? 'Now' : `-${i}h`,
        temp: Number(t.toFixed(1)),
        humidity: Number(h.toFixed(1)),
        co2: Number(c.toFixed(1))
      });
      t = t - (Math.random() * 1.5 - 0.7);
      h = h - (Math.random() * 3 - 1.5);
      c = c - (Math.random() * 1.5 - 0.7);
    }
    return history.reverse();
  }, []); // Empty deps so it generates once per mount

  return (
    <div className="border border-white/5 rounded-xl p-4 bg-neutral-900/30 flex flex-col">
      <h3 className="text-xs font-semibold text-neutral-400 mb-4">{title}</h3>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#ffffff40" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#ffffff40" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={false} name="Temp (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} dot={false} name="Humidity (%)" />
            <Line type="monotone" dataKey="co2" stroke="#22c55e" strokeWidth={2} dot={false} name="CO2 (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
