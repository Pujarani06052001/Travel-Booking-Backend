import express from 'express';
import Booking from '../models/booking.js';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  const { customerName, contactInfo, selectedPackage, bookingStatus, numberOfTravelers } = req.body;

  try {
    const newBooking = new Booking({
      customerName,
      contactInfo,
      selectedPackage,
      bookingStatus,
      numberOfTravelers,  // Add number of travelers field
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('selectedPackage');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

export default router;
