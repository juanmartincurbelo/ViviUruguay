const multer = require('multer');
const path = require('path');
const fs = require('fs');

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const eventData = JSON.parse(req.body.jsonData);
    const eventPath = path.join(__dirname, '../../..', 'uploads', eventData.name);
    if (!fs.existsSync(eventPath)) {
      fs.mkdirSync(eventPath);
    };
    cb(null, eventPath);
  },
  filename: function (req, file, cb) {
    const err = new Error();
    const eventData = JSON.parse(req.body.jsonData);
    const directory = path.join(__dirname, '../../..', 'uploads', eventData.name);
    try {
      const originalname = file.originalname;
      const archiveFile = path.join(path.join(__dirname, '../../..', 'uploads'), eventData.name, originalname);
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

const imageLimits = {
  fileSize: 5 * 1024 * 1024,
  files: 3
};

const fileFilterForImages = function (req, file, cb) {
  if (file.fieldname == 'previewImage' || file.fieldname == 'mainImage') {
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

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: fileFilterForImages,
  limits: imageLimits
});

module.exports = imageUpload;
