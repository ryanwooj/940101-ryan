import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const classes = useStyles();
  return (
    <form
      className={classes.form}
      onSubmit={e => {
        e.preventDefault();
        addPost({ text });
        setText('');
      }}>
      <Grid container direction='column' alignItems='flex-start'>
        <TextField
          label='Write Post'
          multiline
          name='text'
          rows='5'
          value={text}
          margin='normal'
          variant='outlined'
          onChange={e => setText(e.target.value)}
          fullWidth
          required
        />
        <Grid container justify='flex-end'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='btn btn-dark my-1'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  }
}));
PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
