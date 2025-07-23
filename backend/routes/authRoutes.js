const express = require('express');
const router = express.Router();
const {
  register,
  login,
  adminDashboard,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/admin-dashboard', protect, adminDashboard);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
