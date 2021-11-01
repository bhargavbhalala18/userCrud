import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Button, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
  },
  paper: {
    border: '1px',
    borderRadius: '10px',
    backgroundColor: 'teal',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    width: 500,
    height: '70%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
    marginTop: '200px'
  },
}));

function About() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.modal}>
        <Paper component={Box} className={classes.paper}>
          <Typography variant='h5'><b>This is User CRUD App</b><br /></Typography>
          <Typography variant='h6'><b>Use to create:</b><br />
            1.Use redux and react-redux<br />
            2.Use Json server for Api<br />
            3.Use Axios for fetch api data<br />
            4.Use redux saga to perform CRUD operation<br />
            <b>To run this web apllication:</b><br />
            1.First Run Json server using "npm run server" for Api<br />
            2.Run the Project using "npm start"<br />
          </Typography>
        </Paper>
      </div>
    </>
  )
}

export default About
