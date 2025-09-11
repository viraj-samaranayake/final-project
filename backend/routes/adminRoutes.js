const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getPendingTutors,
  reviewTutor,
  getAllCounts,
  getAllCourses,
  getAllStudents,
  getAllTutors,
} = require('../controllers/adminController');
const reportController = require('../controllers/reportController');

router.use(protect);

// Only admin
router.use((req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: 'Forbidden' });
  next();
});

router.get('/pending-tutors', getPendingTutors);
router.post('/review/:tutorId', reviewTutor);
router.get('/counts', getAllCounts);
router.get('/courses', getAllCourses);
router.get('/tutors', getAllTutors);
router.get('/students', getAllStudents);

// Monthly Revenue Report
router.get('/reports/monthly-revenue', reportController.getMonthlyRevenue);
router.get('/reports/monthly-revenue/download', reportController.downloadMonthlyRevenueCSV);


module.exports = router;
