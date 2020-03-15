// Validate CSV file module

const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const validateNumber = require('./validateNumber');

/**
 * Transform readed line from CSV file
 * @param {*} row Row readed from csv file
 * @param {fn} cb Callback function
 */
const transform = (row, cb) => {
  setImmediate(() => {
    const res = validateNumber(row.sms_phone);
    cb(null, {
      id: row.id,
      sms_phone: row.sms_phone,
      sms_phone_validated: res.sms_phone_validated,
      success: res.success,
      message: res.message,
      action: res.actions.join(' and ')
    });
  });
};

/**
 * Raed CVS file, validate sms phone numbers and save result
 * @param {*} file Path to CSV file
 */
const validateFile = file => {
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
    .pipe(ws);
};

module.exports = validateFile;
