import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='is-preload'>
      <div id='wrapper'>
        <section id='main'>
          <div>
            <span className='avatar'>
              <img src='../../images/avatar.jpg' alt='' />
            </span>
            <h1>Ryan Woo</h1>
            <p>Full Stack Developer</p>
            <p>Log in to get Access!</p>
          </div>

          <div>
            <ul className='icons'>
              <li>
                <Link to='/register' className='fas fa-user-plus'>
                  Register
                </Link>
              </li>
              <li>
                <Link to='/login' className='fas fa-unlock-alt'>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </section>
        <footer id='footer'>
          <ul className='copyright'>
            <li>&copy; Ryan Woo</li>
            <li>
              Design: <>Ryan Woo</>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
