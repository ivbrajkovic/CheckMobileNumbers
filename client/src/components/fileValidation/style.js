// Number custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    // marginBottom: theme.spacing(1),
    // [theme.breakpoints.up('sm')]: {
    //   marginBottom: theme.spacing(2)
    // },
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
    // maxWidth: 360
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  divider: {
    height: 28,
    margin: 4
  }
}));
