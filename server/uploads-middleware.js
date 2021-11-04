const path = require('path');
const multer = require('multer');

const imagesDirectory = path.join(__dirname, 'public/images');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, imagesDirectory);
  },
  filename(req, file, callback) {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

const uploadsMiddleware = multer({ storage, limits: { fileSize: 10576 } }).single('image');

module.exports = uploadsMiddleware;
