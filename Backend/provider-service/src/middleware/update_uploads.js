const multer = require('multer');
const path = require('path');
const fs = require('fs');

const filesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const eventName = req.query.eventName;
    const eventPath = path.join(__dirname, '../../..', 'Frontend', 'public', 'eventImages', eventName);
    if (!fs.existsSync(eventPath)) {
      fs.mkdirSync(eventPath, { recursive: true });
    }
    cb(null, eventPath);
  },
  filename: function (req, file, cb) {
    const err = new Error();
    const eventName = req.query.eventName;
    try {
      const originalname = file.originalname;
      const archiveFile = path.join(path.join(__dirname, '../../..', 'Frontend', 'public', 'eventImages'), eventName, originalname);
      if (fs.existsSync(archiveFile)) {
        const error = new Error('File name already exists. Please change the file name.');
        error.statusCode = 400;
        err.message = error.message;
        throw error;
      } else {
        cb(null, originalname);
      }
    } catch (error) {
      cb(error, false);
    }
  }
});

const filesLimits = {
  fileSize: 5 * 1024 * 1024,
  files: 3
};

const fileFilterForUpdate = function (req, file, cb) {
  if (file.fieldname == 'previewImage' || file.fieldname == 'image1' || file.fieldname == 'image2' || file.fieldname == 'image3') {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('The file format is not supported.'), false);
    }
  }
  else {
    cb(new Error('The file format is not supported.'), false);
  }
};

const filesUpdate = multer({
  storage: filesStorage,
  fileFilter: fileFilterForUpdate,
  limits: filesLimits
});

module.exports = filesUpdate;
