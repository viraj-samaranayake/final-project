const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  price: Number,
  subjects: [String],

  thumbnailImage: { type: String }, // Cloudinary URL
  studyDocs: [{ type: String }], // Array of Cloudinary URLs

  ratings: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', CourseSchema);
