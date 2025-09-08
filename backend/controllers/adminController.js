const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// List pending tutors
exports.getPendingTutors = asyncHandler(async (req, res) => {
  const tutors = await User.find({
    role: 'tutor',
    verificationStatus: 'pending',
  }).select('-password');
  res.json(tutors);
});

// Approve or reject tutor
exports.reviewTutor = asyncHandler(async (req, res) => {
  const { tutorId } = req.params;
  const { action } = req.body; // 'approve' or 'reject'

  const tutor = await User.findById(tutorId);
  if (!tutor || tutor.role !== 'tutor')
    return res.status(404).json({ message: 'Not found' });

  tutor.verificationStatus = action === 'approve' ? 'approved' : 'rejected';
  if (action === 'approve') tutor.verified = true;
  await tutor.save();

  // Send notification email
  const subject =
    action === 'approve' ? 'Verification Approved' : 'Verification Rejected';
  const text =
    action === 'approve'
      ? 'Your tutor profile has been approved. You can now access the full dashboard.'
      : 'Your tutor profile verification was rejected. Please resubmit with corrections.';
  await sendEmail(tutor.email, subject, text);

  res.json({ message: `Tutor ${action}d.` });
});
