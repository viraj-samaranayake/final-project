// const mongoose = require('mongoose');

// const ClassSessionSchema = new mongoose.Schema({
//   tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
//   title: String,
//   description: String,
//   startAt: Date,
//   durationMinutes: Number,
//   isLive: { type: Boolean, default: true },
//   recordingUrl: String,
//   price: Number,
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('ClassSession', ClassSessionSchema);



// models/ClassSession.js
const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  tutor: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  title: String,
  course: { type: mongoose.Types.ObjectId, ref: 'Course' }, // optional
  price: Number,
  scheduledAt: Date,
  roomId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ClassSession', ClassSchema);
