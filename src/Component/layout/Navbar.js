import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'

import PropTypes from 'prop-types';
import { AppBar, Toolbar, Button, Typography, Container, useScrollTrigger, Slide, Box } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  appbar: {
    position: "fixed",
    backgroundColor: theme.palette.secondary.main,
  },
  navLogo: {
    flexGrow: 1,
    letterSpacing: '2px',
    textTransform: 'capitalize',
    fontFamily: 'Vanilla Extract',
    color: theme.palette.secondary.light,
  },
  navLinks: {
    color: grey[900],
    backgroundColor: grey[200],
    padding: '5px 15px',
    fontFamily: 'Vanilla Extract',
    borderRadius: theme.spacing(3),
    marginLeft: theme.spacing(2),
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },

}));

const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Navbar = (props) => {
  const classes = useStyles();
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar className={classes.appbar} position='sticky'>
          <Toolbar component={Container}>
            <Typography variant="h5" className={classes.navLogo}>User-CRUD</Typography>
            <Box className={classes.linksWrapper}>
              <Button className={classes.navLinks} component={NavLink} exact to='/adduser'>Add User</Button>
              <Button className={classes.navLinks} component={NavLink} exact to='/about'>About</Button>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

    </>
  )
}

export default Navbar