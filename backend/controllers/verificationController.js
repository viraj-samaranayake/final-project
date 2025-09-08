const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Submit verification details + files
exports.submitVerification = asyncHandler(async (req, res) => {
  const tutor = req.user;
  if (tutor.role !== 'tutor') return res.status(403).json({ message: 'Forbidden' });

  const {
    nic, phone, dob, gender, country, address,
    highestQualification, university, experienceYears, subjects, languages
  } = req.body;

  if (!nic || !phone || !dob || !gender || !country ||
      !address || !highestQualification || !university ||
      !experienceYears || !subjects || !languages)
    return res.status(400).json({ message: 'All fields except profileImage are required' });

  if (!req.files['qualificationFiles'] || req.files['qualificationFiles'].length < 1)
    return res.status(400).json({ message: 'At least one qualification file required' });

  // Map file paths (Cloudinary gives req.files[].path)
  const profileImage = req.files['profileImage']?.[0]?.path;
  const qualificationFiles = req.files['qualificationFiles'].map(f => f.path);

  Object.assign(tutor, {
    nic, phone, dob, gender, country, address,
    highestQualification, university, experienceYears,
    subjects: JSON.parse(subjects),
    languages: JSON.parse(languages),
    profileImage,
    qualificationFiles,
    verificationStatus: 'pending',
    verificationRequestedAt: new Date(),
  });

  await tutor.save();
  res.json({ message: 'Verification submitted, pending approval.' });
});

// Tutor dashboard info
exports.getTutorDashboard = asyncHandler(async (req, res) => {
  const tutor = req.user;
  if (tutor.role !== 'tutor') return res.status(403).json({ message: 'Forbidden' });

  res.json({
    verificationStatus: tutor.verificationStatus,
    message: tutor.verificationStatus === 'pending' ? 'Awaiting approval' : null,
  });
});
