import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
import Users from '../components/users';
import UserForm from '../components/userForm';

const sample = async () => {
  // const result = await (global as any).ipcRenderer.invoke("some-name", {
  //   name: "batman",
  //   age: 22,
  // });
  const result = await (global as any).ipcRenderer.invoke('getUsers');

  console.log(result);
};

const App = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // sample();
    // console.log(
    //   (global as any).ipcRenderer.sendSync("synchronous-message", "ping")
    // ); // prints "pong"
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // console.log(open);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} component={Paper}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Electron Demo
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Samples
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleOpen.bind(this)}>
            Modal
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              (global as any).ipcRenderer.sendSync('message-box');
            }}
          >
            Message Box
          </Button>
        </Grid>
      </Grid>
      <UserForm handleClose={handleClose} open={open} />
    </React.Fragment>
  );
};

export default App;
