// App component

import { h, render, Fragment } from 'preact';

// Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

// Components
import Topbar from '../topbar';

// Styles
import useStyles from './style';

// Components
import NumberValidation from '../../components/numberValidation';
import FileValidation from '../../components/fileValidation';

const App = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Topbar />
      <Container maxWidth="md" component="main" className={classes.root}>
        <Paper elevation={12} className={classes.paper}>
          <NumberValidation />
          <FileValidation />
        </Paper>
      </Container>
    </>
  );
};

export default App;
