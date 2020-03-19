// File upload component

// Preact
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

// Material-UI
import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';

// Custom styles
import useStyles from './style';

// Fetch data function
import fetchData from './fetchData';

// API url
const url = 'http://127.0.0.1:5000/api/validate/file';

// Initial state
const iniitState = {
  text: '',
  file: '',
  data: null,
  error: 'null'
};

export default ({ elevation, setDataTable }) => {
  const classes = useStyles();
  const [state, setState] = useState(iniitState);

  const fileChangeHandler = e => {
    const text = e.target.files[0].name;
    const file = e.target.files[0];
    setState({ text, file });
  };

  const uploadHandler = async () => {
    const [error, data] = await fetchData(url, state.file);
    if (error) setState(state => ({ ...state, error: error.message }));
    else setDataTable(data);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={elevation} className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder="Chose file"
          inputProps={{ 'aria-label': 'chose file' }}
          value={state.text}
        />

        <input
          id="search-button"
          color="primary"
          accept=".csv"
          type="file"
          onChange={fileChangeHandler}
          style={{ display: 'none' }}
        />
        <label htmlFor="search-button">
          <IconButton
            size="large"
            color="primary"
            component="span"
            aria-label="upload button"
          >
            <SearchIcon />
          </IconButton>
        </label>

        <Divider className={classes.divider} orientation="vertical" />

        <IconButton
          color="primary"
          aria-label="upload file"
          onClick={uploadHandler}
        >
          <SendIcon />
        </IconButton>
      </Paper>

      <FormHelperText filled error className={classes.helper}>
        {state.message}
      </FormHelperText>
    </div>
  );
};
