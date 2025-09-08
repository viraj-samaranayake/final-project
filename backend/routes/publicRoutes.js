const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const ClassSession = require('../models/ClassSession');

// GET all courses (public)
router.get('/courses', async (req, res) => {
  const courses = await Course.find({}); // maybe filter published only
  res.json(courses);
});

// GET all upcoming classes (public)
router.get('/classes', async (req, res) => {
  const classes = await ClassSession.find({ scheduledAt: { $gte: new Date() } }).populate('course tutor', 'title name');
  res.json(classes);
});

module.exports = router;
