import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
  installation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Installation', required: true },
  node_type: { type: String, required: true }, // e.g., 'PARENT', 'NODE_1', 'NODE_2', ...
  crop_type: { type: String, required: true },
  current_metrics: {
    temp: { type: Number, required: true },
    humidity: { type: Number, required: true },
    co2: { type: Number, required: true }
  },
  status: { type: String, enum: ['SAFE', 'CRITICAL'], default: 'SAFE' }
}, { timestamps: true });

export default mongoose.models.Module || mongoose.model('Module', ModuleSchema);
