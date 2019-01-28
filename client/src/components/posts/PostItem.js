import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { getPosts } from '../../actions/post';

const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  getPosts,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showAction
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showAction && (
          <>
            <button
              onClick={e => addLike(_id)}
              type='button'
              className='btn btn-light'>
              <i className='fas fa-thumbs-up' />
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              onClick={e => removeLike(_id)}
              type='button'
              className='btn btn-light'>
              <i className='fas fa-thumbs-down' />
            </button>
            <Link to={`/post/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={e => deletePost(_id)}
                type='button'
                className='btn btn-danger'>
                <i className='fas fa-times' />
              </button>
            )}{' '}
          </>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showAction: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.post
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, getPosts, deletePost }
)(PostItem);