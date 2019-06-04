import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  const classes = useStyles();
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}>
        <Grid container direction='column' alignItems='flex-start'>
          <TextField
            label='Leave Comment'
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
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: '80%'
  }
}));

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
