// Validate single number module

const countryCode = '27';
const operatorPrefix = '83';

// const regex = /((?<!\d)\d{11})(?!\d)|((?<!\d)\d{10})(?!\d)|((?<!\d)\d{9})(?!\d)/gm;
// const regex = /((?<!\d)\d{11})(?!\d)|((?<!\d)\d{9})(?!\d)/gm;
// const regex = /(?<!\d)\d+(?!\d)/gm;
// const regex = new RegExp('(?<!d)d+(?!d)', 'g');

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

  // Return object
  const obj = {
    sms_phone: number,
    sms_phone_validated: 'none',
    success: false,
    corrected: false,
    message: 'invalid format',
    actions: ['none']
  };

  // ---------------------------- Start if ----------------------------------
  //
  // Valid format is '27 83 xxxxxxx'
  if (
    (match = number.match(
      String.raw`(?<!\d)${countryCode}${operatorPrefix}\d{7}(?!\d)`
    ))
  ) {
    console.log(1);

    obj.sms_phone_validated = match[0];
    obj.success = true;
    obj.message = 'valid number';

    // Remove everything but the number
    if (match[0] !== match.input) {
      obj.corrected = true;
      obj.actions = [`deleted ${number.replace(match[0], '')}`];
    }
  }
  // ------------------------------------------------------------------------
  //
  // Valid format is '83 xxxxxxx' (missing country code)
  else if (
    (match = number.match(String.raw`(?<!\d)${operatorPrefix}\d{7}(?!\d)`))
  ) {
    console.log(2);

    // Add country code
    obj.sms_phone_validated = `${countryCode}${match[0]}`;
    obj.success = true;
    obj.corrected = true;
    obj.message = 'valid number';
    obj.actions = [`added country code ${countryCode}`];

    // Remove everything but the number
    if (match[0] !== match.input)
      obj.actions.push(`deleted ${number.replace(match[0], '')}`);
  }
  // ------------------------------------------------------------------------
  //
  // Valid format is 'xxxxxxx' (missing country code and operator prefix)
  else if ((match = number.match(/(?<!\d)\d{7}(?!\d)/))) {
    console.log(3);
    console.log('TCL: number', number);
    console.log('TCL: match', match);

    // Add country code and operator prefix
    obj.sms_phone_validated = `${countryCode}${operatorPrefix}${match[0]}`;
    obj.success = true;
    obj.corrected = true;
    obj.message = 'valid number';
    obj.actions = [
      `added country code ${countryCode}`,
      `added operator prefix ${operatorPrefix}`
    ];

    // Remove everything but the number
    if (match[0] !== match.input)
      obj.actions.push(`deleted ${number.replace(match[0], '')}`);
  }
  //
  // ----------------------------- End if -----------------------------------

  return obj;
};

module.exports = validateNumber;
