// Number controller module

const debug = require('debug')('server:api:numberController');
const upload = require('../lib/uploadFile');
const validateNumber = require('../service/validateNumber');
const validateFile = require('../service/validateFile');

// Check single number
const checkNumber = (req, res, next) => {
  // Validate number
  const obj = validateNumber(req.params.number);
  debug(obj);

  // Send response
  res.status(200).json(obj);
};

// Check CSV file
const checkFile = (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      debug(err);
      res.status(500).json(obj);
    }

    // Validate numbers in CSV file
    validateFile(req.file.filename);

    // Sen response
    status200(res, req.file);
  });
};

module.exports = {
  checkNumber,
  checkFile
};
