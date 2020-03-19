// Number validation service

/**
 * Post CVS file to validation service API
 * @param {*} url Validation service URL
 * @param {*} file File to upload
 */
const fetchData = async (url, file) => {
  // Return if invalid arguments
  if (!url || !file) return;

  const fromData = new FormData();
  fromData.append('file', file);

  try {
    const res = await fetch(url, { method: 'POST', body: fromData });

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
