const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  classSession: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassSession' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  status: {
    type: String,
    enum: ['booked', 'completed', 'cancelled'],
    default: 'booked',
  },
  price: Number,
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Booking', BookingSchema);
