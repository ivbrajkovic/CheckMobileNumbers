// Number custom style

import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

export default makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 360
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  okIcon: {
    // margin: theme.spacing(5, 1),
    color: green['A400']
  },
  errorIcon: {
    // margin: theme.spacing(5, 1),
    color: red['400']
  },
  divider: {
    height: 28,
    margin: 4
  }
}));
