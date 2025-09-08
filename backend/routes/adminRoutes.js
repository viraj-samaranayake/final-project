const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getPendingTutors,
  reviewTutor,
} = require('../controllers/adminController');

router.use(protect);

// Only admin
router.use((req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: 'Forbidden' });
  next();
});

router.get('/pending-tutors', getPendingTutors);
router.post('/review/:tutorId', reviewTutor);

module.exports = router;
