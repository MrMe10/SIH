import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Module from '@/lib/models/Module';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { anomaly_type } = body;

    await dbConnect();
    
    const mod = await Module.findById(id);
    if (!mod) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

    mod.anomaly_type = anomaly_type;
    await mod.save();

    return NextResponse.json({ message: `Anomaly ${anomaly_type} triggered on module ${id}` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
