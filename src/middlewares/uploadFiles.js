const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const uploads = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileType = ['image/png', 'image/jpg', 'image/jpeg'];
    if (fileType.includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error('Goes wrong on the mimetype'), false);
  },
});

module.exports = uploads;
