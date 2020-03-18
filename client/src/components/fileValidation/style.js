// Number custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    display: 'flex'
  },
  textField: {
    flexGrow: 1,
    maxWidth: 360
  }
}));
