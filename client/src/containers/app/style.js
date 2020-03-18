// App custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3)
    }
  },
  paper: {
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3)
    }
  }
}));
