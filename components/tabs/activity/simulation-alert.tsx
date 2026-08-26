// import React from 'react';
// import { Room, getOverallStatus, THRESHOLDS } from './types';
// import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

// interface SimulationAlertProps {
//   room: Room;
// }

// export const SimulationAlert: React.FC<SimulationAlertProps> = ({ room }) => {
//   const status = getOverallStatus(room);

//   const issues: string[] = [];
//   if (room.temperature >= THRESHOLDS.temp.alert) {
//     issues.push(`Critical Temperature (${room.temperature}°C >= ${THRESHOLDS.temp.alert}°C)`);
//   } else if (room.temperature >= THRESHOLDS.temp.warning) {
//     issues.push(`Elevated Temperature (${room.temperature}°C >= ${THRESHOLDS.temp.warning}°C)`);
//   }

//   if (room.humidity >= THRESHOLDS.humidity.alert) {
//     issues.push(`Critical Moisture Level (${room.humidity}% >= ${THRESHOLDS.humidity.alert}%)`);
//   } else if (room.humidity >= THRESHOLDS.humidity.warning) {
//     issues.push(`Elevated Moisture Level (${room.humidity}% >= ${THRESHOLDS.humidity.warning}%)`);
//   }

//   if (room.gas >= THRESHOLDS.gas.alert) {
//     issues.push(`High Spoiled Air Gas Concentration (${room.gas} PPM >= ${THRESHOLDS.gas.alert} PPM)`);
//   } else if (room.gas >= THRESHOLDS.gas.warning) {
//     issues.push(`Moderate Air Quality Deterioration (${room.gas} PPM >= ${THRESHOLDS.gas.warning} PPM)`);
//   }

//   if (status === 'normal') {
//     return (
//       <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3 mt-6">
//         <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
//         <div>
//           <h4 className="text-sm font-bold text-emerald-300">Storage Environment Nominal</h4>
//           <p className="text-xs text-emerald-400/80 mt-1">
//             All micro-climate readings for {room.name} ({room.crop}) remain within safe, non-perishable thresholds.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (status === 'warning') {
//     return (
//       <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3 mt-6">
//         <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
//         <div>
//           <h4 className="text-sm font-bold text-amber-300">Environmental Warning Triggered</h4>
//           <ul className="text-xs text-amber-400/90 mt-1 list-disc list-inside space-y-0.5">
//             {issues.map((issue, idx) => (
//               <li key={idx}>{issue}</li>
//             ))}
//           </ul>
//           <p className="text-[11px] text-amber-500 mt-2">
//             Recommended Action: Inspect ventilation and check sensor DR-003 node readings.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 flex items-start gap-3 mt-6 animate-pulse">
//       <ShieldAlert className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
//       <div>
//         <h4 className="text-sm font-bold text-rose-300">CRITICAL ENVIRONMENTAL ALERT</h4>
//         <ul className="text-xs text-rose-300/90 mt-1 list-disc list-inside space-y-0.5">
//           {issues.map((issue, idx) => (
//             <li key={idx}>{issue}</li>
//           ))}
//         </ul>
//         <p className="text-[11px] text-rose-400 mt-2 font-medium">
//           Immediate Action Required: Activate emergency crop cooling fans and inspect room for fungal/spoilage risks.
//         </p>
//       </div>
//     </div>
//   );
// };