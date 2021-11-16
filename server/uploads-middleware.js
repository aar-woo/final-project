const path = require('path');
const multer = require('multer');

const mime = require('mime');
const multerS3 = require('multer-s3');
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET,
  acl: 'public-read', // so that users can view the files
  key: (req, file, done) => {
    const fileExtension = path.extname(file.originalname);
    // include the extension in the key (.jpg, .png, .wav, .mp4, etc)
    const key = `${Date.now()}${fileExtension}`;
    done(null, key);
  },
  contentType: (req, file, done) => {
    // tell S3 what Content-Type to use when serving the file
    const contentType = mime.getType(file.originalname);
    done(null, contentType);
  }
});

const uploadsMiddleware = multer({
  storage: storage
}).single('image');

// const imagesDirectory = path.join(__dirname, 'public/images');

// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, imagesDirectory);
//   },
//   filename(req, file, callback) {
//     const fileExtension = path.extname(file.originalname);
//     const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
//     callback(null, name);
//   }
// });

// const uploadsMiddleware = multer({ storage }).single('image');

module.exports = uploadsMiddleware;
