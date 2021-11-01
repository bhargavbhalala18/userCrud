import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import { green } from '@material-ui/core/colors';
import { loadUsersStart, updateUsersStart } from '../../Action/action';

toast.configure();

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: green[100],
    border: '1px',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    width: 500,
    height: '70%',
    display: "flex",
    marginTop: "20px",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
  },
  editIcon: {
    "&:hover": {
      backgroundColor: 'green'
    },
  },
  closeButtton: {
    position: 'relative',
    left: '40%',
    bottom: '1%',
  },
  button: {
    backgroundColor: 'green',
    width: "200px",
  },
}));

export default function Edituser(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch()

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => history.push('/'), 500);
  };

  const handleOpen = () => {
    setOpen(true);
    if (props.data != null) {
      setUser(props.data)
    }
  };

  // state for changing input
  const [user, setUser] = useState({});

  // Input change event
  const inputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // Destructuring user
  const { name, email, address } = user;

  const { id } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && address) {
      dispatch(updateUsersStart({ id, user }));
      toast.success('User Updated Successfully', { position: toast.POSITION.BOTTOM_LEFT, autoClose: 2000 })
      setOpen(false);
      setTimeout(() => history.push('/'), 500);
    } else {
      toast.error('please Enter Required Fields', { position: toast.POSITION.TOP_CENTER, autoClose: false })
    }
  }

  return (
    <>
      <Button className={classes.editIcon} onClick={handleOpen}><EditRoundedIcon className={classes.editIcon} color='action' /></Button>
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
            <Typography variant="h4" component={Box}>Update User Details</Typography>
            <TextField
              label="Name"
              id="margin-normal"
              name="name"
              defaultValue={name}
              className={classes.textField}
              helperText="Enter your full name"
              onChange={inputChange}
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
              Edit User
            </Button>
          </form>
        </Fade>
      </Modal>
    </>
  );
}