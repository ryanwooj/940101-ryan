import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import ModalComp from './ModalComp';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

const Dashboard = props => {
  const {
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading }
  } = props;

  const classes = useStyles();

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      {profile === null ? (
        <ModalComp />
      ) : (
        <Container maxWidth='md'>
          <Grid
            container
            direction='column'
            className={classes.root}
            spacing={2}>
            <Grid item xs={12}>
              <Grid container direction='row' justify='flex-start'>
                <Grid item>
                  <Avatar
                    src={user && user.avatar}
                    alt='So random'
                    className={classes.avatar}
                  />
                </Grid>
                <Grid item className={classes.textField}>
                  <Grid container direction='column'>
                    <Grid item>
                      <Typography variant='h4' className={classes.lowercase}>
                        {user && user.name.split(' ').join('')}
                      </Typography>
                      <br />
                      <DashboardActions />
                    </Grid>
                    <Grid container justify='flex-end'>
                      <Button
                        variant='contained'
                        className={classes.eduExpButton}
                        color='primary'
                        component={Link}
                        to={`/dashboard/experience/${user._id}`}>
                        Experience
                      </Button>
                      <Button
                        variant='contained'
                        className={classes.eduExpButton}
                        color='primary'
                        component={Link}
                        to={`/dashboard/education/${user._id}`}>
                        Education
                      </Button>
                    </Grid>
                    <Grid item>
                      <Typography variant='h6'>
                        {user.email.split('@')[0]}
                      </Typography>
                      <Typography variant='body1'>
                        {profile && profile.location}
                      </Typography>
                      <Typography variant='body1'>
                        {profile.education.length > 0 &&
                          profile.education[0].school}
                      </Typography>
                      <br />
                      <Typography variant='body1'>
                        {profile && profile.bio}
                      </Typography>
                    </Grid>
                    <br />
                    <Grid item>
                      <div className='my-2'>
                        <Button
                          variant='contained'
                          color='secondary'
                          onClick={() => deleteAccount()}>
                          <Icon>delete</Icon> Delete Account
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </Container>
      )}
    </>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  },
  avatar: {
    marginLeft: 50,
    marginTop: 50,
    width: 160,
    height: 160
  },
  textField: {
    marginLeft: 50,
    marginTop: 50
  },
  lowercase: {
    textTransform: 'lowercase'
  },
  eduExpButton: {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5)
  },
  modalpaper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none'
  }
}));

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
