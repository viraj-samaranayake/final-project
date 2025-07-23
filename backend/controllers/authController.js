const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Register student/tutor
exports.register = async (req, res) => {
  const { name, email, password, role, subjects, pricing, schedule } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({
    name,
    email,
    password,
    role,
    subjects,
    pricing,
    schedule,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    role: user.role,
    token: generateToken(user),
  });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      token: generateToken(user),
    });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Admin Dashboard
exports.adminDashboard = async (req, res) => {
  const studentCount = await User.countDocuments({ role: 'student' });
  const tutorCount = await User.countDocuments({ role: 'tutor' });
  res.json({ studentCount, tutorCount });
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = crypto.randomBytes(20).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;
  await user.save();

  const resetUrl = `http://localhost:3000/reset-password/${token}`;
  await sendEmail(user.email, 'Password Reset', `Click here to reset: ${resetUrl}`);

  res.json({ message: 'Reset email sent' });
};


// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
};

