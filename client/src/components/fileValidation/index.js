// File upload component

// Preact
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

// Material-UI
import TextField from '@material-ui/core/TextField';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import IconButton from '@material-ui/core/IconButton';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';

// Custom styles
import useStyles from './style';

// Initial state
const initState = {
  focus: false,
  text: ''
};

const FileValidation = () => {
  const classes = useStyles();
  const [state, setState] = useState(initState);

  const setText = value => {
    setState(state => ({ ...state, text: value }));
  };

  const togleFocus = value => {
    setState(state => ({ ...state, focus: value }));
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Chose file"
        value={state.text}
        className={classes.textField}
        onFocus={() => togleFocus(true)}
        onBlur={() => togleFocus(false)}
        onChange={e => setText(e.target.value)}
        InputLabelProps={{ shrink: state.text || state.focus }}
      />

      <input
        color="primary"
        accept=".csv"
        type="file"
        onChange={e => setText(e.target.files[0].name)}
        id="upload-button"
        style={{ display: 'none' }}
      />

      <label htmlFor="upload-button">
        <IconButton
          size="large"
          color="primary"
          component="span"
          aria-label="upload csv file"
        >
          <FolderOpenIcon fontSize="large" />
        </IconButton>
      </label>

      <IconButton
        size="large"
        color="primary"
        component="span"
        aria-label="upload csv file"
      >
        <PublishOutlinedIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default FileValidation;
