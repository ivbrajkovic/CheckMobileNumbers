// Single number validation component

// Preact
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

// Material-UI
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import Divider from '@material-ui/core/Divider';
import SendIcon from '@material-ui/icons/Send';

// Custom styles
import useStyles from './style';

// Get input adornment icon
import getIcon from './getIcon';

// Validate number
import fetchValidation from './fetchValidation';

// Initial state
const initState = {
  show: false,
  number: '',
  success: false,
  corrected: false
};

const NumberValidation = ({ elevation }) => {
  const classes = useStyles();
  const [state, setState] = useState(initState);

  /**
   * Validate number on click
   */
  const clickHandler = () => fetchValidation(state.number, setState);

  /**
   * Validate number on key enter
   */
  const keyPresHandler = e => {
    if (event.key === 'Enter') fetchValidation(state.number, setState);
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
      <Paper elevation={elevation} className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder="Phone number"
          inputProps={{ 'aria-label': 'phone number' }}
          value={state.number}
          onChange={changeHandler}
          onKeyPress={keyPresHandler}
        />

        {state.show && getIcon({ success: state.success, classes })}

        <Divider className={classes.divider} orientation="vertical" />

        <IconButton
          color="primary"
          onClick={clickHandler}
          aria-label="validate number"
        >
          <SendIcon />
        </IconButton>
      </Paper>

      {!state.success && state.message && (
        <FormHelperText filled error className={classes.helper}>
          {state.message}
        </FormHelperText>
      )}
      {state.added && (
        <FormHelperText filled error className={classes.helper}>
          added: {state.added}
        </FormHelperText>
      )}
      {state.deleted && (
        <FormHelperText filled error className={classes.helper}>
          deleted: {state.deleted}
        </FormHelperText>
      )}
    </div>
  );
};

export default NumberValidation;
