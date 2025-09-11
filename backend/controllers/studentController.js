const User = require('../models/User');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs'); 
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Enrollment = require('../models/Enrollment');
const Earning = require('../models/Earning');
const Commission = require('../models/Commission');
const sendEmail = require('../utils/sendEmail');
const Rating = require('../models/Rating');
const ClassSession = require('../models/ClassSession');



exports.getStudentProfile = async (req, res) => {
  const student = await User.findById(req.user._id).select('name phone address profileImage profileCompleted');
  res.json(student);
};


exports.submitStudentProfile = async (req, res) => {
  const { phone, gender, country, address, dob } = req.body;

  if (!phone || !gender || !country || !address || !dob) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const student = await User.findById(req.user._id);

  student.phone = phone;
  student.gender = gender;
  student.country = country;
  student.address = address;
  student.dob = dob;
  student.profileCompleted = true;

  if (req.file && req.file.path) {
    student.profileImage = req.file.path;
  }

  await student.save();
  res.json({ message: 'Profile completed', student });
};


exports.listCourses = async (req, res) => {
  const courses = await Course.find().populate('tutor', 'name');
  res.json(courses);
};


exports.getCourse = async (req, res) => {
  const course = await Course.findById(req.params.id).populate('tutor', 'name');
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};


// edit - profile-----
exports.editStudentProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, phone, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Handle name/phone update
    user.name = name || user.name;
    user.phone = phone || user.phone;

    // Handle profile image
    if (req.file && req.file.path) {
      user.profileImage = req.file.path;
    }

    // Password update logic
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        phone: user.phone,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error('Edit profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Step 1: Initiate Payment record
exports.createPayment = async (req, res) => {
  const student = req.user._id;
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const tutor = course.tutor;
  const amount = course.price;
  const tutorShare = amount * 0.85;
  const systemShare = amount * 0.15;

  const payment = await Payment.create({
    student,
    course: course._id,
    tutor,
    amount,
    tutorShare,
    systemShare,
  });

  res.json({ paymentId: payment._id, amount });
};



// Step 2: Handle PayHere callback / confirmation
exports.completePayment = async (req, res) => {
  const { paymentId, payHereReference } = req.body;

  const payment = await Payment.findById(paymentId);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });

  payment.paymentStatus = 'success';
  payment.payHereReference = payHereReference;
  payment.paidAt = new Date();
  await payment.save();

  // Post-payment actions
  const enrollment = await Enrollment.create({
    student: payment.student,
    course: payment.course,
    payment: payment._id,
  });

  await Earning.create({
    tutor: payment.tutor,
    amount: payment.tutorShare,
    course: payment.course,
    student: payment.student,
    payment: payment._id,
    description: `Earning for course ${payment.course}`,
  });

  await Commission.create({
    amount: payment.systemShare,
    course: payment.course,
    tutor: payment.tutor,
    payment: payment._id,
  });

  // send email to student
  await sendEmail(req.user.email, 'Course Enrollment Successful', `
    You are now enrolled in the course. Thank you!
  `);

  res.json({ message: 'Payment successful and enrollment confirmed' });
};



// Purchased Courses List
exports.getPurchasedCourses = async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user._id })
    .populate({ path: 'course', populate: { path: 'tutor', select: 'name' } });
  res.json(enrollments);
};

// Download Study Docs
exports.getCourseDocs = async (req, res) => {
  const enrollment = await Enrollment.findOne({ student: req.user._id, course: req.params.id })
    .populate('course');
  if (!enrollment) return res.status(403).json({ message: 'Access denied' });
  res.json({ studyDocs: enrollment.course.studyDocs });
};

// Submit Rating
exports.submitRating = async (req, res) => {
  const { stars, comment } = req.body;
  const courseId = req.params.id;
  const existing = await Rating.findOne({ student: req.user._id, course: courseId });
  if (existing) return res.status(400).json({ message: 'Already rated' });

  await Rating.create({
    course: courseId,
    student: req.user._id,
    stars,
    comment,
  });
  res.json({ message: 'Rating submitted' });
};



// Fetch course list with avg ratings
exports.listCoursesWithAvg = async (req, res) => {
  const courses = await Course.find().populate('tutor', 'name');

  const courseIds = courses.map(c => c._id);
  const agg = await Rating.aggregate([
    { $match: { course: { $in: courseIds } } },
    { $group: { _id: '$course', avgStars: { $avg: '$stars' } } },
  ]);

  const avgMap = {};
  agg.forEach(a => { avgMap[a._id.toString()] = a.avgStars; });

  const data = courses.map(c => ({
    ...c.toObject(),
    avgRating: avgMap[c._id.toString()] || 0,
  }));

  res.json(data);
};

// Get newly scheduled class Sessions
exports.getStudentClasses = async (req, res) => {
  // Find courses student is enrolled in
  const enrollments = await Enrollment.find({ student: req.user._id }).select('course');
  const courseIds = enrollments.map(e => e.course);

  // Fetch upcoming sessions linked to those courses
  const sessions = await ClassSession.find({
    course: { $in: courseIds },
    scheduledAt: { $gte: new Date() }
  }).sort('scheduledAt');

  res.json(sessions);
};