// Table

import { h } from 'preact';

// Material-UI
import Table from '@material-ui/core/table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Custom styles
import useStyles from './style';

const NumberTable = ({ elevation, data }) => {
  const classes = useStyles();

  // const CustomPaper = ({ children }) => (
  //   <Paper elevation={elevation}>{children}</Paper>
  // );

  return (
    <Paper elevation={elevation} className={classes.root}>
      {/* <TableContainer component={CustomPaper} className={classes.container}> */}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>sms_phone</TableCell>
              <TableCell>number</TableCell>
              <TableCell>success</TableCell>
              <TableCell>corrected</TableCell>
              <TableCell>message</TableCell>
              <TableCell>added</TableCell>
              <TableCell>deleted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow hover key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.sms_phone}</TableCell>
                <TableCell>{row.number || 'none'}</TableCell>
                <TableCell>{(row.success && 'true') || 'false'}</TableCell>
                <TableCell>{(row.corrected && 'true') || 'false'}</TableCell>
                <TableCell>{row.message || 'none'}</TableCell>
                <TableCell>{row.added || 'none'}</TableCell>
                <TableCell>{row.deleted || 'none'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default NumberTable;
