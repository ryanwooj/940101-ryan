import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const classes = useStyles();

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('PASSWORD DO NOT MATCH', 'danger');
    } else {
      register({ name, email, password });

      // ACCESS TESTING WITH BACKEND
      //   const newUser = {
      //     name,
      //     email,
      //     password
      //   };
      //   try {
      //     const config = {
      //       headers: {
      //         'Content-Type': 'application/json'
      //       }
      //     };
      //     const body = JSON.stringify(newUser);

      //     const res = await axios.post('/api/users', body, config);
      //     console.log(res.data);
      //   } catch (err) {
      //     console.log(err.response.data);
      //   }
    }
  };

  //Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container component='main' maxWidth='md'>
      <Paper className={classes.paper}>
        <Typography variant='h1'>Sign Up</Typography>
        <Icon>user</Icon>
        <Typography variant='body1'>Create your Account</Typography>
        <form
          className='form'
          action='create-profile.html'
          onSubmit={e => onSubmit(e)}>
          <TextField
            type='text'
            varian='outlined'
            margin='normal'
            name='name'
            value={name}
            label='Name'
            autoComplete='name'
            autoFocus
            fullWidth
            required
            onChange={e => onChange(e)}
          />
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
          />
          <Typography variant='body2' align='center'>
            Your Email is a Username
          </Typography>
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
          <TextField
            variant='outlined'
            margin='normal'
            minLength='6'
            name='password2'
            label='Confirm Password'
            type='password'
            value={password2}
            onChange={e => onChange(e)}
            autoComplete='current-password'
            fullWidth
            required
          />
          <Button
            variant='contained'
            type='submit'
            className={classes.submit}
            color='primary'
            fullWidth>
            {' '}
            Register
          </Button>
        </form>
        <Grid item>
          <Link component={RouterLink} to='/register' variant='body2'>
            {"Don't have an Account? Sign Up"}
          </Link>
        </Grid>
      </Paper>
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgorundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
