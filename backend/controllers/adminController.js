const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const ClassSession = require('../models/ClassSession');
const Course = require('../models/Course');
const Commission = require('../models/Commission');

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

// =============
exports.getAllCounts = asyncHandler(async (req, res) => {
  const tutorCount = await User.countDocuments({ role: 'tutor' });
  const pendingTutorCount = await User.countDocuments({
    role: 'tutor',
    verificationStatus: 'pending',
  });
  const studentCount = await User.countDocuments({ role: 'student' });
  const classCount = await ClassSession.countDocuments();
  const revenueResult = await Commission.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' },
      },
    },
  ]);

  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

  res.json({ tutorCount, studentCount, classCount, pendingTutorCount, totalRevenue });
});



exports.getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().populate('tutor', 'name');

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});


exports.getAllStudents = asyncHandler(async (req, res) => {
  const students = await User.find({ role: 'student' }).select('-password');

  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

exports.getAllTutors = asyncHandler(async (req, res) => {
  const tutors = await User.find({ role: 'tutor' }).select('-password');

  res.status(200).json({
    success: true,
    count: tutors.length,
    data: tutors,
  });
});