// App component

import { h, render, Fragment } from 'preact';
import { useState } from 'preact/hooks';

// Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Components
import Topbar from '../topbar';

// Styles
import useStyles from './style';

// Components
import NumberValidation from '../../components/numberValidation';
import FileValidation from '../../components/fileValidation';
import NumberTable from '../../components/table';

const elevation = 4;
const App = () => {
  const classes = useStyles();
  const [data, setData] = useState();

  const setDataTable = data => setData(data);

  return (
    <>
      <CssBaseline />
      <Topbar />
      <Container maxWidth="md" component="main" className={classes.root}>
        {/* <Paper className={classes.paper}> */}
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={8} md={6}>
              <NumberValidation elevation={elevation} />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={8} md={6}>
              <FileValidation
                elevation={elevation}
                setDataTable={setDataTable}
              />
            </Grid>
          </Grid>
          {data && (
            <Grid item xs={12}>
              <NumberTable elevation={elevation} data={data} />
            </Grid>
          )}
        </Grid>
        {/* </Paper> */}
      </Container>
    </>
  );
};

export default App;
