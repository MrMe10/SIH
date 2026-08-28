import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Installation from '@/lib/models/Installation';
import Module from '@/lib/models/Module';
import Telemetry from '@/lib/models/Telemetry';
import { mockInstallations } from '@/lib/data';

export async function GET() {
  try {
    await dbConnect();
    
    // Clear existing data
    await Installation.deleteMany({});
    await Module.deleteMany({});
    await Telemetry.deleteMany({});

    for (const inst of mockInstallations) {
      // Create Installation
      const newInst = await Installation.create({
        name: inst.name,
        location: inst.name.replace('Drishti ', ''),
        coordinates: { lat: inst.lat, lng: inst.lng },
        overall_status: inst.status
      });

      // Determine number of nodes (3 to 6 randomly, or set specifically for demo)
      // Let's make HD Kote have 6 nodes, and others have random 3 to 5
      const numNodes = inst.name.includes('HD Kote') ? 6 : Math.floor(Math.random() * 3) + 3;

      const baseTemp = inst.temp;
      const baseHum = inst.humidity;
      const baseCo2 = inst.co2;

      for (let i = 0; i < numNodes; i++) {
        const isParent = i === 0;
        const nodeType = isParent ? 'PARENT' : `NODE_${i}`;
        
        // Add slight variance to metrics for child nodes
        const temp = baseTemp + (Math.random() * 2 - 1);
        const humidity = baseHum + (Math.random() * 4 - 2);
        const co2 = baseCo2 + (Math.random() * 2 - 1);
        
        // Determine node status
        const isCritical = temp > 30 || humidity > 60 || co2 > 20;

        await Module.create({
          installation_id: newInst._id,
          node_type: nodeType,
          crop_type: ['Tomato', 'Onion', 'Potato', 'Wheat'][Math.floor(Math.random() * 4)],
          current_metrics: { temp, humidity, co2 },
          status: isCritical ? 'CRITICAL' : 'SAFE'
        });
      }
    }

    return NextResponse.json({ message: 'Database seeded successfully with dynamic node counts!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
