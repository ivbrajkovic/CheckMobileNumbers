// Single number validation component

// Preact
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

// Material-UI
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

// Custom styles
import useStyles from './style';

// Get input adornment icon
import getAdornment from './getIcon';

// API url
const url = 'http://127.0.0.1:5000/api/number/';

/**
 * Validate phone number on service API
 *
 * @param {*} number Number to check
 * @param {*} setState Fn to set component state
 */
const valudateNumber = async (number, setState) => {
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

/**
 * Status code
 *  0 - do not display
 *  1 - success
 *  2 - failed
 */
const initState = {
  code: 0,
  number: '',
  message: ''
};

const NumberValidation = () => {
  const classes = useStyles();
  const [state, setState] = useState(initState);

  /**
   * Validate number on click
   */
  const clickHandler = () => valudateNumber(state.number, setState);

  /**
   * Validate number on key enter
   */
  const keyPresHandler = e => {
    if (event.key === 'Enter') valudateNumber(state.number, setState);
  };

  /**
   * Clear input on text change
   */
  const changeHandler = e => {
    const number = e.target.value;
    setState({ ...initState, number });
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Phone number"
        className={classes.textField}
        InputProps={{
          'aria-label': 'phone number',
          endAdornment: getAdornment({ valid: state.code, classes })
        }}
        value={state.number}
        onChange={changeHandler}
        onKeyPress={keyPresHandler}
        error={state.code === 2}
        helperText={state.message}
      />

      <IconButton color="primary" onClick={clickHandler}>
        <SearchIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default NumberValidation;
