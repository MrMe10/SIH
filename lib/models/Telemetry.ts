import mongoose from 'mongoose';

const TelemetrySchema = new mongoose.Schema({
  module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  timestamp: { type: Date, default: Date.now },
  metrics: {
    temp: { type: Number, required: true },
    humidity: { type: Number, required: true },
    co2: { type: Number, required: true }
  }
});

export default mongoose.models.Telemetry || mongoose.model('Telemetry', TelemetrySchema);
