const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  enrolledAt: { type: Date, default: Date.now },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
