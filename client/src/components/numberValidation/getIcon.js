// Show validation adornment on text field

// Preact
import { h, Fragment } from 'preact';

// Material-UI
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';

export default ({ valid, classes }) => {
  let icon;
  switch (valid) {
    case 0:
      return null;

    case 1:
      icon = <CheckIcon className={classes.okIcon} />;
      break;

    case 2:
      icon = <ErrorTwoToneIcon className={classes.errorIcon} />;
      break;
  }
  return <IconButton>{icon}</IconButton>;
};
