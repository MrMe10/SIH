import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
  installation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Installation', required: true },
  node_type: { type: String, enum: ['PARENT', 'NODE1', 'NODE2', 'NODE3'], required: true },
  crop_type: { type: String, required: true },
  current_metrics: {
    temp: { type: Number, required: true },
    humidity: { type: Number, required: true },
    co2: { type: Number, required: true }
  },
  status: { type: String, enum: ['SAFE', 'CRITICAL'], default: 'SAFE' }
}, { timestamps: true });

export default mongoose.models.Module || mongoose.model('Module', ModuleSchema);
