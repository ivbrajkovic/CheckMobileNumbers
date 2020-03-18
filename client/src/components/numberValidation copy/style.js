// Number custom style

import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

export default makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    display: 'flex'
  },
  textField: {
    flexGrow: 1,
    maxWidth: 360
  },
  okIcon: {
    margin: theme.spacing(5, 1),
    color: green['A400']
  },
  errorIcon: {
    margin: theme.spacing(5, 1),
    color: red['400']
  }
}));
