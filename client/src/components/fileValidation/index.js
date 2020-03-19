// File upload component

// Preact
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

// Material-UI
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';

// Custom styles
import useStyles from './style';

const url = 'http://127.0.0.1:5000/api/validate/file';

const iniitState = {
  text: '',
  file: '',
  data: null
};

const uploadFile = (file, setDataTable) => {
  const data = new FormData();
  data.append('file', file);

  fetch(url, {
    method: 'POST',
    body: data
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setDataTable(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const FileValidation = ({ elevation, setDataTable }) => {
  const classes = useStyles();
  const [state, setState] = useState(iniitState);

  // const textChangeHandler = e => {
  //   const text = e.target.value;
  //   setState(text: e.target.value);
  // };

  const fileChangeHandler = e => {
    const text = e.target.files[0].name;
    const file = e.target.files[0];
    setState({ text, file });
  };

  const uploadHandler = () => {
    state.file && uploadFile(state.file, setDataTable);
  };

  return (
    <Paper elevation={elevation} className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Chose file"
        inputProps={{ 'aria-label': 'chose file' }}
        value={state.text}
        // onChange={textChangeHandler}
        // onKeyPress={keyPresHandler}
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
        //onClick={clickHandler}
        aria-label="upload file"
        onClick={uploadHandler}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default FileValidation;
