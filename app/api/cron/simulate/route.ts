import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Installation from '@/lib/models/Installation';
import Module from '@/lib/models/Module';
import Telemetry from '@/lib/models/Telemetry';

// This endpoint can be hit by a cron job or client-side polling to simulate time passing
export async function POST() {
  try {
    await dbConnect();
    
    const modules = await Module.find({});
    
    for (const mod of modules) {
      // Simulate natural fluctuation (random walk)
      let newTemp = mod.current_metrics.temp + (Math.random() * 0.8 - 0.4);
      let newHum = mod.current_metrics.humidity + (Math.random() * 2.0 - 1.0);
      let newCo2 = mod.current_metrics.co2 + (Math.random() * 1.0 - 0.5);

      // Keep within bounds roughly
      newTemp = Math.max(10, Math.min(50, newTemp));
      newHum = Math.max(0, Math.min(100, newHum));
      newCo2 = Math.max(0, Math.min(100, newCo2));

      // Check thresholds
      const isCritical = newTemp > 30 || newHum > 60 || newCo2 > 20;
      const newStatus = isCritical ? 'CRITICAL' : 'SAFE';
      const justBecameCritical = isCritical && mod.status !== 'CRITICAL';

      // Update Module (so the live UI updates every 5s)
      mod.current_metrics = { temp: newTemp, humidity: newHum, co2: newCo2 };
      mod.status = newStatus;
      await mod.save();

      // IMPORTANT: To prevent MongoDB from getting flooded with millions of records overnight 
      // from the 5s polling, we only log to the historical Telemetry collection ~2% of the time 
      // or if the status just became CRITICAL.
      if (Math.random() < 0.02 || justBecameCritical) {
        await Telemetry.create({
          module_id: mod._id,
          metrics: { temp: newTemp, humidity: newHum, co2: newCo2 }
        });
      }
    }

    // Update Installation overall status based on its modules
    const installations = await Installation.find({});
    for (const inst of installations) {
      const instModules = await Module.find({ installation_id: inst._id });
      const hasCritical = instModules.some(m => m.status === 'CRITICAL');
      
      if (hasCritical && inst.overall_status !== 'CRITICAL') {
        inst.overall_status = 'CRITICAL';
        await inst.save();
      } else if (!hasCritical && inst.overall_status !== 'SAFE') {
        inst.overall_status = 'SAFE';
        await inst.save();
      }
    }

    return NextResponse.json({ message: 'Simulation tick completed successfully.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
