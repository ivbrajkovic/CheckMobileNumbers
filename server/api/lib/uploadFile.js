// File upload module

const multer = require('multer');
// const formatDate = require('../../../utility').formatDate;

const validFiles = /.csv|.txt$/;
// Upload file module

const storage = multer.diskStorage({
  // destination: function(req, file, cb) {
  //   cb(null, 'upload');
  // },
  destination: process.env.UPLOAD_DIR,
  filename: function(req, file, cb) {
    // const date = formatDate(new Date());
    // cb(null, date + '-' + file.originalname);
    cb(null, Date.now() + '-' + file.originalname);
  }
});

function fileFilter(req, file, cb) {
  if (validFiles.test(file.originalname)) cb(null, true);
  else cb(new Error("I don't have a clue!"));
}

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single(
  'file'
);
