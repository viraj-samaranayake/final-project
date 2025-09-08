const Course = require('../models/Course');
const { cloudinary } = require('../config/cloudinary');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Rating = require('../models/Rating');
const streamifier = require('streamifier');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const { v4: uuidv4 } = require('uuid');
const ClassSession = require('../models/ClassSession');



exports.getTutorSubjects = async (req, res) => {
  try {
    const tutor = await User.findById(req.user._id);

    if (!tutor || tutor.role !== 'tutor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (!tutor.verified || tutor.verificationStatus !== 'approved') {
      return res.status(403).json({ message: 'Tutor not verified' });
    }

    if (!tutor.subjects || tutor.subjects.length === 0) {
      return res.status(404).json({ message: 'No subjects found for tutor' });
    }

    res.json(tutor.subjects);
  } catch (err) {
    console.error('getTutorSubjects error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.uploadCourse = async (req, res) => {
  try {
    const { title, description, price, subjects } = req.body;

    if (!title || !subjects) {
      return res.status(400).json({ message: 'Title and subjects are required' });
    }

    const parsedSubjects = typeof subjects === 'string' ? JSON.parse(subjects) : subjects;

    const courseData = {
      tutor: req.user._id,
      title,
      description,
      price,
      subjects: parsedSubjects,
    };

    // Upload thumbnail
    if (req.files['thumbnailImage']) {
      const thumb = req.files['thumbnailImage'][0];
      const uploadRes = await cloudinary.uploader.upload_stream(
        { folder: 'course-thumbnails' },
        (error, result) => {
          if (error) throw error;
          courseData.thumbnailImage = result.secure_url;
        }
      );
      streamifier.createReadStream(thumb.buffer).pipe(uploadRes);
    }

    // Upload study documents
    if (req.files['studyDocs']) {
      const docs = req.files['studyDocs'];
      courseData.studyDocs = [];

      for (const file of docs) {
        const upload = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'course-docs',
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          require('streamifier').createReadStream(file.buffer).pipe(stream);
        });

        courseData.studyDocs.push(upload);
      }
    }

    const course = await Course.create(courseData);
    res.status(201).json({ message: 'Course uploaded successfully', course });
  } catch (error) {
    console.error('Upload Course Error:', error);
    res.status(500).json({ message: 'Failed to upload course', error: error.message });
  }
};



exports.getTutorCourses = async (req, res) => {
  try {
    const tutorId = req.user._id;
    const courses = await Course.find({ tutor: tutorId }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error('getTutorCourses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// get course by Id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course || course.tutor.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Course not found or access denied' });
    }
    res.json(course);
  } catch (err) {
    console.error('getCourseById error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// update-course-------------------
exports.updateCourse = async (req, res) => {
  try {
    const { title, description } = req.body || {};

    const course = await Course.findById(req.params.id);
    if (!course || course.tutor.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Course not found or access denied' });
    }

    if (title) course.title = title;
    if (description) course.description = description;

    //Update thumbnail if present
    if (req.files?.thumbnailImage?.[0]) {
      const result = await cloudinary.uploader.upload(req.files.thumbnailImage[0].path, {
        folder: 'courses/thumbnails',
      });
      course.thumbnailImage = result.secure_url;
    }

    // Replace studyDocs if present
    if (req.files?.studyDocs) {
      const docs = [];
      for (let file of req.files.studyDocs) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'courses/study-docs',
          resource_type: 'auto',
        });
        docs.push(result.secure_url);
      }
      course.studyDocs = docs;
    }

    await course.save();
    res.json({ message: 'Course updated successfully', course });
  } catch (err) {
    console.error('updateCourse error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Returns total earnings per course for logged-in tutor
exports.getTutorEarnings = async (req, res) => {
  const tutorId = req.user._id;

  // Fetch courses by this tutor
  const courses = await Course.find({ tutor: tutorId }).select('_id title price');

  // Aggregate enrollments to count how many per course
  const enrollCounts = await Enrollment.aggregate([
    { $match: { course: { $in: courses.map(c => c._id) } } },
    { $group: { _id: '$course', count: { $sum: 1 } } },
  ]);

  const countMap = {};
  enrollCounts.forEach(ec => {
    countMap[ec._id.toString()] = ec.count;
  });

  // Combine into response
  const earnings = courses.map(c => {
    const count = countMap[c._id.toString()] || 0;
    const total = count * c.price;
    return { courseId: c._id, title: c.title, totalEarning: total };
  });

  res.json(earnings);
};



// Get engaged students count and avg rating per course
exports.getEngagedStudentsData = async (req, res) => {
  const tutorId = req.user._id;

  const courses = await Course.find({ tutor: tutorId }).select('_id title');

  const courseIds = courses.map(c => c._id);

  // Count enrollments per course
  const enrollAgg = await Enrollment.aggregate([
    { $match: { course: { $in: courseIds } } },
    { $group: { _id: '$course', count: { $sum: 1 } } },
  ]);

  // Average ratings per course
  const ratingAgg = await Rating.aggregate([
    { $match: { course: { $in: courseIds } } },
    { $group: { _id: '$course', avgStars: { $avg: '$stars' } } },
  ]);

  const enrollMap = {};
  enrollAgg.forEach(e => enrollMap[e._id.toString()] = e.count);

  const ratingMap = {};
  ratingAgg.forEach(r => ratingMap[r._id.toString()] = r.avgStars);

  const data = courses.map(c => ({
    courseId: c._id,
    title: c.title,
    engagedCount: enrollMap[c._id.toString()] || 0,
    avgRating: ratingMap[c._id.toString()] || 0,
  }));

  res.json(data);
};


// PUT /api/tutor/edit-profile
exports.editTutorProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.role !== 'tutor') {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    const { phone, languages, currentPassword, newPassword } = req.body;

    if (phone) user.phone = phone;

    if (languages) {
      user.languages = Array.isArray(languages)
        ? languages
        : languages.split(',').map(l => l.trim());
    }

    if (req.file?.path) {
      user.profileImage = req.file.path;
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        phone: user.phone,
        languages: user.languages,
        profileImage: user.profileImage,
      }
    });
  } catch (err) {
    console.error('Edit tutor profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};




 //---===---------------------===========-------------=======--------

exports.scheduleClass = async (req, res) => {
  const { title, course, scheduledAt, price } = req.body;
  const roomId = uuidv4();

  const session = await ClassSession.create({
    tutor: req.user._id,
    title,
    course: course || undefined,
    price: course ? undefined : price,
    scheduledAt,
    roomId,
  });

  // If session is linked to a course, notify all enrolled students
  if (course) {
    const enrollments = await Enrollment.find({ course });
    const studentEmails = await User.find(
      { _id: { $in: enrollments.map(e => e.student) } },
      'email'
    );

    const emailPromises = studentEmails.map(student =>
      sendEmail(
        student.email,
        'New Class Scheduled',
        `A new class "${title}" has been scheduled for your course. Join at: ${process.env.FRONTEND_URL}/student/class-room/${session._id}`
      )
    );

    await Promise.all(emailPromises);
  }

  res.json(session);
};



exports.getTutorClasses = async (req, res) => {
  const classes = await ClassSession.find({ tutor: req.user._id });
  res.json(classes);
};

exports.getSession = async (req, res) => {
  const session = await ClassSession.findById(req.params.id);
  if (!session) return res.status(404).json({ message: 'Not found' });

  if (req.user.role === 'student') {
    if (session.course) {
      const enrolled = await Enrollment.findOne({ student: req.user._id, course: session.course });
      if (!enrolled) return res.status(403).json({ message: 'Not enrolled in the related course' });
    } else {
      const purchased = await ClassPurchase.findOne({ student: req.user._id, classSession: session._id });
      if (!purchased) return res.status(403).json({ message: 'Class not purchased' });
    }
  }

  res.json({ roomId: session.roomId, title: session.title, scheduledAt: session.scheduledAt });
};