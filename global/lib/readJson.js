// Global utility functions

const fs = require('fs');

/**
 * Parse JSON to object without cache
 *
 * @param {*} path Path to JSON file
 * @param {*} cb Callback with error and parsed JSON file
 */
const readJson = path => {
  try {
    // const json = fs.readFileSync(require.resolve(path));
    const json = fs.readFileSync(path);
    return JSON.parse(json);
  } catch (error) {
    console.log('TCL: readJson -> error', error);
    return {};
  }
};

/**
 * Async parse JSON to object without cache
 *
 * @param {*} path Path to JSON file
 * @param {*} cb Callback with error and parsed JSON file
 */
const readJsonaAsync = (path, cb) => {
  fs.readFile(require.resolve(path), (err, data) => {
    if (err) cb(err);
    else cb(null, JSON.parse(data));
  });
};

module.exports = { readJson, readJsonaAsync };
