import mongoose from 'mongoose';

const InstallationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  overall_status: { type: String, enum: ['SAFE', 'WARNING', 'CRITICAL'], default: 'SAFE' }
}, { timestamps: true });

export default mongoose.models.Installation || mongoose.model('Installation', InstallationSchema);
