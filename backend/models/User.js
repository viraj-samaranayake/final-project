const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'tutor', 'admin'], required: true },

    profileImage: { type: String },


    pricing: String, // Tutor only
    schedule: String, // Tutor only
    languages: [String], // Tutor only

    // Tutor verification & profile
    nic: String,
    phone: String,
    gender: String, //n
    dob: { type: Date }, //n
    country: String,
    address: String,

    university: String,
    highestQualification: String,
    subjects: [String], // Tutor only
    experienceYears: Number,
    city: String, // NEW: Tutor's city
    qualificationFiles: [{ type: String }], // NEW: Store file paths (images, pdf, docs)

    verificationRequestedAt: Date,
    verified: { type: Boolean, default: false },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'none'],
      default: 'none',
    },

    profileCompleted: { type: Boolean, default: false },

    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

// Hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
