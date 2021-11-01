import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { loadUsersStart, deleteUsersStart } from '../../Action/action'
import EditUser from './EditUser'
import { toast } from 'react-toastify';

const useStyles = makeStyles({
  root: {
    maxWidth: '80vw',
    marginTop: '20px',
    position: 'relative',
    left: '10%',
  },
  container: {
    maxHeight: 440,
    marginTop: '200px',
    borderRadius: '5px'
  },
  tableHead: {
    backgroundColor: 'teal',
    fontWeight: '600'
  },
  tablePagination: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
  },
  deleteIcon: {
    "&:hover": {
      backgroundColor: 'red',
    }
  },
});

const MainTable = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dispatch = useDispatch();

  const { users } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(loadUsersStart())
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    if (window.confirm("are you sure that you wanted to delete that user ?")) {
      dispatch(deleteUsersStart(id));
      toast.success('User deleted Successfully', { autoClose: 2000 })
    }
  }

  return (
    <>

      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">

            <TableHead>
              <TableRow >
                <TableCell className={classes.tableHead}>No. </TableCell>
                <TableCell className={classes.tableHead}>Name</TableCell>
                <TableCell className={classes.tableHead}>Email</TableCell>
                <TableCell className={classes.tableHead}>Address</TableCell>
                <TableCell className={classes.tableHead}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                  <TableRow key={user.id} hover role="checkbox">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>
                      <EditUser userId={user.id} data={user} color='primary' /> &nbsp;&nbsp;
                      <Button className={classes.deleteIcon} onClick={() => handleDelete(user.id)} ><DeleteRoundedIcon /></Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

        </TableContainer>
        <TablePagination
          className={classes.tablePagination}
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

    </>
  );
}

export default MainTable;
