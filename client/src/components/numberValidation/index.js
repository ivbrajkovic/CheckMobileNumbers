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
import CheckIcon from '@material-ui/icons/Check';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';

// Custom styles
import useStyles from './style';

// Validate number
import fetchData from './fetchData';

// API url
// const url = 'http://127.0.0.1:5000/api/validate/';
const url = '/api/validate/';

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

  const setStateFetchData = async () => {
    const [error, data] = await fetchData(url, state.number);
    if (error)
      setState({
        show: true,
        number: state.number,
        message: error.message
      });
    else
      setState({
        show: true,
        ...data,
        number: data.success ? data.number : state.number
      });
  };

  /**
   * Validate number on click
   */
  const clickHandler = () => setStateFetchData();

  /**
   * Validate number on key enter
   */
  const keyPresHandler = e => {
    if (e.key === 'Enter') setStateFetchData();
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

        {state.show &&
          ((state.success && <CheckIcon className={classes.okIcon} />) || (
              <ErrorTwoToneIcon className={classes.errorIcon} />
            ) ||
            null)}

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
