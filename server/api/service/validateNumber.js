// Validate single number module

const countryCode = '27';
const operatorPrefix = '83';

/**
 * Check if number is a valid sms number
 * valid format is 27 83 XXXXXXX
 *    27 - country code (South Africa)
 *    83 - operater prefix
 *    XXXXXXX - sms number
 *
 * @param {string} number Number to validate
 */
const validateNumber = number => {
  // Regex match object
  let match;

  // Response object
  let obj = {
    number: '',
    success: false,
    corrected: false,
    message: '',
    added: '',
    deleted: ''
  };

  // --------------------- Start if ------------------------
  //
  // Valid format is '27 83 xxxxxxx'
  if (
    (match = number.match(
      String.raw`(?<!\d)${countryCode}${operatorPrefix}\d{7}(?!\d)`
    ))
  ) {
    obj.number = match[0];
    obj.success = true;
    obj.message = 'valid number';

    // Remove everything but the number
    if (match[0] !== match.input) {
      obj.corrected = true;
      // obj.actions = [`deleted ${number.replace(match[0], '')}`];
      obj.deleted = number.replace(match[0], '');
    }
  }
  // -------------------------------------------------------
  //
  // Valid format is '83 xxxxxxx' (missing country code)
  else if (
    (match = number.match(String.raw`(?<!\d)${operatorPrefix}\d{7}(?!\d)`))
  ) {
    // Add country code
    obj.number = `${countryCode}${match[0]}`;
    obj.success = true;
    obj.corrected = true;
    obj.message = 'valid number';
    // obj.actions = [`added country code ${countryCode}`];
    obj.added = `country code ${countryCode}`;

    // Remove everything but the number
    if (match[0] !== match.input)
      // obj.actions.push(`deleted ${number.replace(match[0], '')}`);
      obj.deleted = number.replace(match[0], '');
  }
  // -------------------------------------------------------
  //
  // Valid format is 'xxxxxxx' (missing country code and operator prefix)
  else if ((match = number.match(/(?<!\d)\d{7}(?!\d)/))) {
    // Add country code and operator prefix
    obj.number = `${countryCode}${operatorPrefix}${match[0]}`;
    obj.success = true;
    obj.corrected = true;
    obj.message = 'valid number';
    obj.added = `country code ${countryCode} and operator prefix ${operatorPrefix}`;

    // Remove everything but the number
    if (match[0] !== match.input) obj.deleted = number.replace(match[0], '');
  }
  // -------------------------------------------------------
  //
  // Format not suppordetd
  else {
    obj.message = 'invalid format';
  }
  //
  // ---------------------- End if -------------------------

  return obj;
};

module.exports = validateNumber;
