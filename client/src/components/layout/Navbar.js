import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemText';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));
  const classes = useStyles();

  const [state, setState] = useState({
    toggle: false
  });

  const toggleDrawer = status => {
    setState({ toggle: status });
  };

  const authLinks = (
    <Grid container direction='row' justify='flex-end'>
      <IconButton to='/profiles' component={AdapterLink}>
        <Icon className={classes.icons}>folder_shared</Icon>
      </IconButton>
      <IconButton to='/posts' component={AdapterLink}>
        <Icon className={classes.icons}>comment</Icon>
      </IconButton>
      <IconButton to='/dashboard' component={AdapterLink}>
        <Icon className={classes.icons}>dashboard</Icon>
      </IconButton>
      <IconButton onClick={logout}>
        <Icon className={classes.icons}>clear</Icon>
      </IconButton>
    </Grid>
  );

  const guestLinks = (
    <Grid container direction='row' justify='flex-end'>
      <IconButton to='/profiles' component={AdapterLink}>
        <Icon className={classes.icons}>folder_shared</Icon>
      </IconButton>
      <IconButton to='/register' component={AdapterLink}>
        <Icon className={classes.icons}>how_to_reg</Icon>
      </IconButton>
      <IconButton to='/login' component={AdapterLink}>
        <Icon className={classes.icons}>vpn_key</Icon>
      </IconButton>
    </Grid>
  );

  const toggleGuest = (
    <div
      className={classes.list}
      role='presentation'
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}>
      <List>
        <ListItem button to='/' component={AdapterLink}>
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>

        <Divider variant='middle' />
        <ListItem button to='/profiles' component={AdapterLink}>
          <ListItemIcon>
            <Icon>folder_shared</Icon>
          </ListItemIcon>
          <ListItemText>All Users</ListItemText>
        </ListItem>

        <Divider variant='middle' />
        <ListItem button to='/register' component={AdapterLink}>
          <ListItemIcon>
            <Icon>how_to_reg</Icon>
          </ListItemIcon>
          <ListItemText>Register</ListItemText>
        </ListItem>

        <Divider variant='middle' />
        <ListItem button to='/login' component={AdapterLink}>
          <ListItemIcon>
            <Icon>vpn_key</Icon>
          </ListItemIcon>
          <ListItemText>Sign in</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const toggleAuth = (
    <div
      className={classes.list}
      role='presentation'
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}>
      <List>
        <ListItem button to='/dashboard' component={AdapterLink}>
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>

        <Divider variant='middle' />
        <ListItem button to='/profiles' component={AdapterLink}>
          <ListItemIcon>
            <Icon>folder_shared</Icon>
          </ListItemIcon>
          <ListItemText>All Users</ListItemText>
        </ListItem>

        <Divider variant='middle' />
        <ListItem button to='/posts' component={AdapterLink}>
          <ListItemIcon>
            <Icon>comment</Icon>
          </ListItemIcon>
          <ListItemText>Posts</ListItemText>
        </ListItem>

        <Divider variant='middle' />
        <ListItem button to='/dashboard' component={AdapterLink}>
          <ListItemIcon>
            <Icon>dashboard</Icon>
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>

        <Divider variant='middle' />
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <Icon>clear</Icon>
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar
      position='sticky'
      color='primary'
      elevation={1}
      className={classes.root}>
      <Toolbar>
        <Drawer open={state.toggle} onClose={() => toggleDrawer(false)}>
          {!loading && <>{isAuthenticated ? toggleAuth : toggleGuest}</>}
        </Drawer>
        <Grid container alignItems='flex-start'>
          <Grid item xs>
            <Button onClick={() => toggleDrawer(true)}>
              <Icon>menu</Icon>
            </Button>
            <Button to='/' component={AdapterLink}>
              <Icon className={classes.icon}>fingerprint</Icon>
              <Typography className={classes.name}> _RWoo</Typography>
            </Button>
          </Grid>
          <Grid item>
            {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  iconpad: {
    padding: 5
  },
  icon: {
    fontSize: '3rem',
    color: 'white'
  },
  icons: {
    fontSize: '2rem'
  },
  links: {
    color: '#232323',
    spaceBetween: '20px'
  },
  textColor: {
    backgroundColor: 'white'
  },
  link: {
    display: 'none'
  },
  name: {
    fontSize: '2rem',
    color: 'white',
    fontFamily: 'Reenie Beanie',
    fontWeight: 500
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
}));

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
