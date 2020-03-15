// Validate single number module

const sortDesc = require('../../../utility').sortDesc;

const countryCode = '27';

// const regex = /((?<!\d)\d{11})(?!\d)|((?<!\d)\d{10})(?!\d)|((?<!\d)\d{9})(?!\d)/gm;
// const regex = /((?<!\d)\d{11})(?!\d)|((?<!\d)\d{9})(?!\d)/gm;
const regex = /(?<!\d)\d+(?!\d)/gm;

/**
 *
 * @param {string} number Number to validate
 */
const validateNumber = number => {
  let m;
  const arr = [];

  // Return object
  const obj = {
    sms_phone: number,
    sms_phone_validated: 'none',
    success: false,
    corrected: false,
    message: 'invalid format',
    actions: ['none']
  };

  // Find metches
  while ((m = regex.exec(number)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    arr.push(m[0]);
  }

  // console.log('TCL: arr', arr);
  // Sort arry by elements lenght
  arr.sort(sortDesc);
  // console.log('TCL: arr', arr);

  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];

    // Check element of array
    switch (el.length) {
      case 11:
        obj.sms_phone_validated = el;

        // Is only valid if start with country code
        if (el.startsWith(countryCode)) {
          obj.success = true;
          obj.message = 'valid number';

          // Remove everything but the number
          if (number !== obj.sms_phone_validated) {
            obj.corrected = true;
            obj.actions = [
              `deleted ${number.replace(obj.sms_phone_validated, '')}`
            ];
          }
        } else obj.message += ', must start with country code';
        break;

      case 9:
        // Is only valid if NOT start with country code
        // if (!el.startsWith(countryCode)) {
        // add country code
        obj.sms_phone_validated = `${countryCode}${el}`;
        obj.success = true;
        obj.corrected = true;
        obj.message = 'valid number';
        obj.actions = [`added country code ${countryCode}`];

        // Remove everything but the number
        if (number !== el)
          obj.actions.push(`deleted ${number.replace(el, '')}`);
        // }
        break;
    }
  }

  return obj;
};

module.exports = validateNumber;
