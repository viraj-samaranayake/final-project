const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  submitStudentProfile,
  getStudentProfile,
  listCourses,
  editStudentProfile,
  getCourse,
  createPayment,
  completePayment,
  getPurchasedCourses,
  getCourseDocs,
  submitRating,
  listCoursesWithAvg,
  getStudentClasses
} = require('../controllers/studentController');

const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router.get('/profile', protect, getStudentProfile);
router.post(
  '/profile',
  protect,
  upload.single('profileImage'),
  submitStudentProfile
);
router.get('/courses', protect, listCourses);

router.get('/courses/:id', protect, getCourse);

router.put('/edit-profile', protect, upload.single('profileImage'), editStudentProfile);

router.post('/courses/:id/payment', protect, createPayment);
router.post('/courses/complete-payment', protect, completePayment);

router.get('/purchased-courses', protect, getPurchasedCourses);
router.get('/purchased-courses/:id/docs', protect, getCourseDocs);
router.post('/purchased-courses/:id/rate', protect, submitRating);

router.get('/courses-with-avg', protect, listCoursesWithAvg);
router.get('/my-classes', protect, getStudentClasses);


module.exports = router;
