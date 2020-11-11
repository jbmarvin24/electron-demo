import React, { useEffect, useState } from 'react';
import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import UserForm from './userForm';
//export interface UsersProps {}

export interface User {
  id: number;
  username: string;
  birthdate: string;
  age: number;
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
    '&:disabled': {
      backgroundColor: theme.palette.error.light,
    },
  },
}));

const Global: any = global;

// async function getUsers(): Promise<User[]> {
//   return await Global.ipcRenderer.invoke("getUsers");
// }

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // getUsers().then((users) => {
    //   setUsers(users);
    // });
  }, []);

  const handleClose = () => {
    setOpen(false);
    //console.log(open);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleOpen.bind(this)}>
        Create
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Birthdate</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row" align="right">
                  {user.id}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{new Date(user.birthdate).toLocaleDateString()}</TableCell>
                <TableCell align="right">{user.age}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" style={{ marginRight: 5 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="inherit" className={classes.deleteButton}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Users;
