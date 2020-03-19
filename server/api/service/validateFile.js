// Validate CSV file module

const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const validateNumber = require('./validateNumber');

// Response object
const response = [];

/**
 * Transform readed line from CSV file
 * @param {*} row Row readed from csv file
 * @param {fn} cb Callback function
 */
const transform = (row, cb) => {
  setImmediate(() => {
    try {
      const res = validateNumber(row.sms_phone);
      const cbObj = {
        id: row.id,
        sms_phone: row.sms_phone,
        ...res
      };

      // Push to return object
      response.push(cbObj);
      cb(null, cbObj);
    } catch (error) {
      const cbObj = {
        id: row.id,
        sms_phone: row.sms_phone,
        //...res,
        number: 'error',
        message: error.message
      };

      // Push to return object
      response.push(cbObj);
      cb(null, cbObj);
    }
  });
};

/**
 * Raed CVS file, validate sms phone numbers and save result
 * @param {*} file Path to CSV file
 */
const validateFile = (file, res) => {
  // Clear response array
  response.length = 0;

  // Parse filename
  const pf = path.parse(file);
  const newFile = `${pf.name}-validated${pf.ext}`;

  // Upload directory
  const uploadDir = process.env.UPLOAD_DIR;

  // Create sreams
  const rs = fs.createReadStream(`${uploadDir}/${file}`);
  const ws = fs.createWriteStream(`${uploadDir}/${newFile}`);

  rs
    // Parse CSV file
    .pipe(csv.parse({ headers: true }))
    // pipe the parsed input into a csv formatter
    .pipe(csv.format({ headers: true, transform }))
    // On error handler
    .on('error', error => console.error(error))
    // .pipe(process.stdout);
    // .on('data', data => console.log(data))
    .on('end', () => {
      console.log('stream ended');
      // console.log(retObj);
      // Send response
      res.status(200).json(response);
    })
    .pipe(ws);
};

module.exports = validateFile;
