// Number custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    '& .MuiFormHelperText-root': {
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
  divider: {
    height: 28,
    margin: 4
  }
}));
