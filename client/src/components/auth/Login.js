import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };

  const classes = materialStyles();

  //Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon>lock_outlined</Icon>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            label='Email Address'
            autoComplete='email'
            autoFocus
            fullWidth
            required
          />
          <TextField
            variant='outlined'
            margin='normal'
            minLength='6'
            name='password'
            label='Password'
            type='password'
            value={password}
            onChange={e => onChange(e)}
            autoComplete='current-password'
            fullWidth
            required
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />

          <Button
            variant='contained'
            type='submit'
            className={classes.submit}
            color='primary'
            fullWidth>
            Sign In
          </Button>
        </form>
        <Grid item>
          <Link component={RouterLink} to='/register' variant='body2'>
            {"Don't have an Account? Sign Up"}
          </Link>
        </Grid>
      </Paper>
      <Box mt={4}>
        <Typography variant='body2' color='textSecondary' align='center'>
          {'Back to'}
          <Link component={RouterLink} to='/' color='inherit'>
            {' '}
            Home
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

const materialStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgorundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
