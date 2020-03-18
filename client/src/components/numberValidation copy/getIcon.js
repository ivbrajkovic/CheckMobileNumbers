// Show validation adornment on text field

// Preact
import { h, Fragment } from 'preact';

// Material-UI
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/Check';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';

const getIcon = ({ valid, classes }) => {
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
  return <InputAdornment position="end">{icon}</InputAdornment>;
};

export default getIcon;
