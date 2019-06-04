import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));
  const classes = useStyles();

  const [values, setValues] = useState({
    keyword: 'Search'
  });

  const handleChange = keyword => e => {
    setValues({ ...values, [keyword]: e.target.value });
  };

  const authLinks = (
    <Grid item>
      <Grid container justify='flex-end'>
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
    </Grid>
  );

  const guestLinks = (
    <Grid item>
      <Grid container justify='flex-end' alignContent='space-between'>
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
    </Grid>
  );
  return (
    <div className={classes.root}>
      <AppBar position='sticky' color='primary' elevation={1}>
        <Toolbar>
          <Grid container alignItems='flex-start'>
            <Grid item xs>
              <Button to='/' component={AdapterLink}>
                <Icon className={classes.icon}>fingerprint</Icon>
                <Typography className={classes.name}> _RWoo</Typography>
              </Button>
            </Grid>
            <Hidden xsDown>
              <Grid item>
                <Grid container alignContent='center'>
                  <TextField
                    id='standard-name'
                    label='Search'
                    variant='filled'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon>search</Icon>
                        </InputAdornment>
                      )
                    }}
                    fullWidth
                    value={values.name}
                    className={classes.textField}
                    onChange={handleChange('keyword')}
                    margin='normal'
                  />
                </Grid>
              </Grid>
            </Hidden>
            {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    icon: {
      fontSize: '2rem',
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
    textField: {
      marginLeft: theme.spacing(1),
      width: 200,
      backgroundColor: '#FFFCFB'
    },
    name: {
      fontSize: '2rem',
      color: 'white',
      fontFamily: 'Reenie Beanie',
      fontWeight: 500
    }
  })
);

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
