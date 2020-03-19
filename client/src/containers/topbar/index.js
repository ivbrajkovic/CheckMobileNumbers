// Topbar component

import { h } from 'preact';

// Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Custom styles
import useStyles from './style';

const Topbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          SMS Number Validator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
