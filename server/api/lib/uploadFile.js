// File upload module

const multer = require('multer');

// Valide file formats
const validFiles = /.csv|.txt$/;

const storage = multer.diskStorage({
  // destination: function(req, file, cb) {
  //   cb(null, 'upload');
  // },
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (validFiles.test(file.originalname)) cb(null, true);
  else cb(new Error("I don't have a clue!"));
};

module.exports = multer({ storage: storage, fileFilter }).single('file');
