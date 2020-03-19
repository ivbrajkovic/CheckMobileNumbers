// Fetch validation service

/**
 * Validate phone number on service API
 * @param {*} url Validation service URL
 * @param {*} number Number to check
 */
const fetchData = async (url, number) => {
  // Return if invalid arguments
  if (!url || !number) return;

  try {
    const res = await fetch(url + number);

    // Check if JSON is returned
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.log('TCL: fetchData -> res', res);
      throw new TypeError("Oops, we haven't got JSON!");
    }

    const data = await res.json();
    return [null, data];
  } catch (error) {
    console.log('TCL: fetchData -> error', error);
    return [error, null];
  }
};

export default fetchData;
