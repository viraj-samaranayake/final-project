const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const {
  getTutorCourses,
  getTutorSubjects,
  uploadCourse,
  getCourseById,
  updateCourse,
  getTutorEarnings,
  getEngagedStudentsData,
  editTutorProfile,
  scheduleClass,
  getTutorClasses,
  getSession
} = require('../controllers/tutorController');

const upload = multer({ storage });

//Fetch verified tutor's subjects
router.get('/subjects', protect, getTutorSubjects);

// For course upload: fields for thumbnail + study docs
router.post(
  '/courses',
  protect,
  upload.fields([
    { name: 'thumbnailImage', maxCount: 1 },
    { name: 'studyDocs', maxCount: 10 },
  ]),
  uploadCourse
);

// Endpoint to view tutor's courses
router.get('/my-courses', protect, getTutorCourses);

// Get course for editing
router.get('/courses/:id', protect, getCourseById);

// Update course
router.patch(
  '/courses/:id',
  protect,
  upload.fields([
    { name: 'thumbnailImage', maxCount: 1 },
    { name: 'studyDocs', maxCount: 10 },
  ]),
  updateCourse
);

router.get('/earnings', protect, getTutorEarnings);
router.get('/engaged-students', protect, getEngagedStudentsData);
router.put('/edit-profile', protect, upload.single('profileImage'), editTutorProfile);


router.post('/class', protect, scheduleClass);
router.get('/class', protect, getTutorClasses);
router.get('/class/:id', protect, getSession);


module.exports = router;
