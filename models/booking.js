import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  contactInfo: { type: String, required: true },
  selectedPackage: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  numberOfTravelers: { type: Number, required: true },
  bookingStatus: { 
    type: String, 
    required: true, 
    enum: ['Pending', 'Confirmed', 'Cancelled'], 
    default: 'Pending' 
  },
});

export default mongoose.model('Booking', BookingSchema);
