// Show validation adornment on text field

// Preact
import { h, Fragment } from 'preact';

// Material-UI
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';

export default ({ success, classes }) => {
  const icon = (success && <CheckIcon className={classes.okIcon} />) || (
    <ErrorTwoToneIcon className={classes.errorIcon} />
  );
  return <IconButton>{icon}</IconButton>;
};
