import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
//Need connect b/c i'll have Delete on comment

const CommentItem = ({
  postId,
  auth,
  deleteComment,
  comment: { _id, text, name, avatar, user, date }
}) => {
  const classes = useStyles();
  return (
    <Grid container direction='row' alignItems='flex-start'>
      <Grid item xs={3}>
        <Grid
          container
          direction='column'
          align='center'
          className={classes.avatarCont}>
          <Link to={`/profile/${user}`}>
            <Avatar className={classes.avatar} src={avatar} alt='user Avatar' />
          </Link>{' '}
          <Button to={`/profile/${user}`} component={Link} color='primary'>
            {name}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Grid container direction='row'>
          <Grid item className={classes.userTextField} xs={7}>
            <Typography variant='body1'>{text}</Typography>
            <Typography variant='body2'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </Typography>
          </Grid>
          <Grid item className={classes.userTextField} xs={2}>
            {!auth.loading && user === auth.user._id && (
              <Button
                onClick={e => deleteComment(postId, _id)}
                style={{ marginLeft: '5px' }}
                type='button'
                variant='contained'
                color='secondary'>
                <Icon>delete_forever</Icon>
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  userTextField: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(6)
  },
  avatarCont: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  controlCont: {
    marginTop: theme.spacing(2)
  }
}));

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
