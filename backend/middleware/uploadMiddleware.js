const multer = require('multer');
const { storage } = require('../config/cloudinary');

//const upload = multer({ storage });
const upload = multer({ storage: multer.memoryStorage() });


module.exports = upload;
