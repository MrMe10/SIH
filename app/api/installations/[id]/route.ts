import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Installation from '@/lib/models/Installation';
import Module from '@/lib/models/Module';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    await dbConnect();
    const installation = await Installation.findById(id).lean();
    if (!installation) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const modules = await Module.find({ installation_id: id }).lean();
    
    // Format modules to match frontend store structure
    const formattedModules = modules.map((m: any) => ({
      id: m._id.toString(),
      name: m.node_type === 'PARENT' ? 'Parent Module' : `Node Module ${m.node_type.replace('NODE_', '')}`,
      node_type: m.node_type,
      crop_type: m.crop_type,
      temp: m.current_metrics.temp,
      humidity: m.current_metrics.humidity,
      co2: m.current_metrics.co2,
      status: m.status
    }));

    return NextResponse.json({
      installation: {
        id: installation._id.toString(),
        name: installation.name,
        status: installation.overall_status,
      },
      modules: formattedModules
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
