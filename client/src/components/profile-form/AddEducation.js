import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;
  const classes = useStyles();
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Container justify='center' direction='column' align='center'>
      <Paper className={classes.paper}>
        <Typography variant='h3'>Add An Education</Typography>
        <Typography>Add any Education you have in the past</Typography>

        <form
          onSubmit={e => {
            e.preventDefault();
            addEducation(formData, history);
          }}>
          <Typography variant='body2'>* = required field</Typography>
          <TextField
            margin='normal'
            variant='outlined'
            placeholder=' * School'
            name='school'
            value={school}
            onChange={e => onChange(e)}
            fullWidth
          />
          <TextField
            margin='normal'
            variant='outlined'
            placeholder=' * Degree'
            name='degree'
            value={degree}
            onChange={e => onChange(e)}
            fullWidth
          />
          <TextField
            margin='normal'
            variant='outlined'
            placeholder='Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={e => onChange(e)}
            fullWidth
          />
          <Grid container justify='space-evenly'>
            <Grid item>
              <TextField
                type='date'
                label='From'
                name='from'
                margin='normal'
                value={from}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={e => onChange(e)}
              />
              <Grid container justify='flex-start' className={classes.getTopMa}>
                <Checkbox
                  checked={current}
                  name='current'
                  value={current}
                  onChange={e => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                  }}
                />
                <Typography style={{ marginTop: '.5em' }}>Current</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                type='date'
                label='To'
                name='to'
                value={to}
                margin='normal'
                InputLabelProps={{
                  shrink: true
                }}
                onChange={e => onChange(e)}
                disabled={toDateDisabled ? true : false}
              />
            </Grid>
          </Grid>
          <TextField
            margin='normal'
            name='description'
            value={description}
            placeholder='Description'
            fullWidth
            onChange={e => onChange(e)}
          />
          <Button
            margin='normal'
            to='/dashboard'
            component={Link}
            variant='outlined'
            color='primary'>
            Go Back
          </Button>{' '}
          <Button
            margin='normal'
            type='submit'
            variant='outlined'
            color='primary'>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(4)
  },
  gridmargin: {
    topMargin: theme.spacing(3)
  }
}));

AddEducation.propTypes = {
  AddEducation: PropTypes.func
};

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
