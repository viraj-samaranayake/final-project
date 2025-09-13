const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
  submitVerification,
  getTutorDashboard,
} = require('../controllers/verificationController');

router.use(protect);

const storage = multer.memoryStorage();
//const upload = multer({ storage });


router.post(
  '/submit',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'qualificationFiles', maxCount: 5 },
  ]),
  submitVerification
);
router.get('/status', getTutorDashboard);

module.exports = router;
