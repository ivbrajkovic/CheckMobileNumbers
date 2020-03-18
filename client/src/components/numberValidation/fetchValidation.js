// Fetch validation service

// API url
const url = 'http://127.0.0.1:5000/api/number/';

/**
 * Validate phone number on service API
 *
 * @param {*} number Number to check
 * @param {*} setState Fn to set component state
 */
export default async (number, setState) => {
  // Return if no number provided
  if (!number) return;

  try {
    // Fetch validation API
    const res = await fetch(url + number);

    // Check if JSON is returned
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }

    // Get response
    const data = await res.json();

    // Format component state
    const state = {};
    state.code = data.success ? 1 : 2;
    state.number = data.success ? data.sms_phone_validated : number;
    state.message = data.success
      ? data.corrected
        ? data.actions.join(' and ')
        : ''
      : data.message;

    // Set new state
    setState(state);
  } catch (error) {
    console.log('TCL: error', error);
  }
};
