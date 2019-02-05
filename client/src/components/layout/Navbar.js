import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className='right item'>
      <li>
        <Link to='/profiles'>
          <i className='fas fa-users fa-lg'> </i>{' '}
          <span className='hide-sm'>People</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='fas fa-folder fa-lg'> </i>{' '}
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user-alt fa-lg' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'> </i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='right item'>
      <li>
        <Link to='/profiles'>
          <i className='fas fa-users fa-lg'> </i>{' '}
          <span className='hide-sm'>People</span>
        </Link>
      </li>
      <li>
        <Link to='/register'>
          <i className='fas fa-user-plus fa-lg'> </i>{' '}
          <span className='hide-sm'>Register</span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='fas fa-unlock-alt fa-lg'> </i>{' '}
          <span className='hide-sm'>Login</span>
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='ui menu'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code fa-lg' /> RWoo
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

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
