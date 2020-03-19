// Number custom style

import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

export default makeStyles(theme => ({
  root: {
    // maxWidth: 360,
    // marginBottom: theme.spacing(1),
    // [theme.breakpoints.up('sm')]: {
    //   marginBottom: theme.spacing(2)
    // }
    '& .MuiFormHelperText-root:first-of-type': {
      marginTop: theme.spacing(1)
    }
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
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
  },
  helper: {
    padding: '0px 12px'
  }
}));
