import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  destinationName: { type: String, required: true },
  packageTitle: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availableDates: { type: [String], required: true },
  maxTravelers: { type: Number, required: true },
});

const Package = mongoose.model('Package', packageSchema);

export default Package;
