import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import { blue } from '@material-ui/core/colors';
import { loadUsersStart, createUsersStart } from '../../Action/action';

toast.configure();

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: blue[100],
    border: '1px',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    width: 500,
    height: '70%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
  },
  closeButtton: {
    position: 'relative',
    left: '40%',
    bottom: '1%'
  },
  button: {
    width: "200px",
  }
}));

export default function Adduser() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const history = useHistory();
  const dispatch = useDispatch()

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => history.push('/'), 500);
  };

  const object = {
    name: '',
    email: '',
    address: ''
  }

  // state for changing input
  const [user, setUser] = useState(object);

  // Input change event
  const inputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // Destructuring user
  const { name, email, address } = user;

  const { users } = useSelector(state => state.data);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (users.map(u => u.email === email).includes(true)) {
      toast.error('Email id is already exist', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
    }
    else {
      if (name && email && address) {
        dispatch(createUsersStart(user));
        toast.success('User Add Successfully', { position: toast.POSITION.BOTTOM_LEFT, autoClose: 2000 })
        setOpen(false);
        setTimeout(() => history.push('/'), 200);
      } else {
        toast.error('please Enter Required Fields', { position: toast.POSITION.TOP_CENTER, autoClose: false })
      }
    }
  }

  return (
    <>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} >
          <form className={classes.paper} onSubmit={handleSubmit}>
            <Button variant='text' className={classes.closeButtton} onClick={(e) => handleClose(e)} >
              <span style={{ fontSize: '30px' }}>&times;</span>
            </Button>
            <Typography variant="h4" className='text-center mx-auto my-4'>Add User Details</Typography>
            <TextField
              label="Name"
              id="margin-normal"
              name="name"
              defaultValue={name}
              className={classes.textField}
              helperText="Enter your full name"
              onChange={inputChange}
              color='secondary'
              fullWidth
            />
            <TextField
              label="Email"
              id="margin-normal"
              name="email"
              defaultValue={email}
              className={classes.textField}
              helperText="e.g. name@gmail.com"
              onChange={inputChange}
              fullWidth
            />
            <TextField
              label="address"
              id="margin-normal"
              name="address"
              defaultValue={address}
              className={classes.textField}
              helperText="Emter your country name"
              onChange={inputChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Add User
            </Button>
          </form>
        </Fade>
      </Modal>
    </>
  );
}