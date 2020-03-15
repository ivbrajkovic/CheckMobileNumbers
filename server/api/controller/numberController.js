// Number controller module

const debug = require('debug')('server:api:numberController');
const upload = require('../lib/uploadFile');
const validateNumber = require('../service/validateNumber');
const validateFile = require('../service/validateFile');

// Format response
const status200 = require('../lib/response').status200;
const status500 = require('../lib/response').status500;

// Check single number
const checkNumber = (req, res, next) => {
  // Validate number
  const obj = validateNumber(req.params.number);
  debug(obj);

  // Send response
  status200(res, obj);
};

// Check CSV file
const checkFile = (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      debug(err);
      return status500(res, err.message);
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
