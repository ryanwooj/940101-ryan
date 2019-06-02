import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileBottom from './ProfileBottom';
import { getProfileById } from '../../actions/profile';
import ProfileExperience from './ProfileExperience.js';
import ProfileEducation from './ProfileEducation.js';
import ProfileGithub from './ProfileGithub.js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  const classes = useStyles();
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <div>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Container maxWidth='lg'>
          <Grid container direction='column' justify='center' align='center'>
            <Grid container className={classes.mTop}>
              <Grid item xs={6}>
                <Button
                  to='/profiles'
                  component={Link}
                  variant='outlined'
                  color='primary'
                  m={3}
                  fullWidth>
                  Back to Profiles
                </Button>
              </Grid>
              <Grid item xs={6}>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <Button
                      to='/edit-profile'
                      component={Link}
                      variant='outlined'
                      color='primary'
                      fullWidth>
                      Edit Profile
                    </Button>
                  )}
              </Grid>
            </Grid>
            <Grid container className={classes.mTop} justify='space-evenly'>
              <Grid item xs={12} sm={6}>
                <ProfileTop profile={profile} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ProfileBottom profile={profile} />
              </Grid>
            </Grid>

            <Grid container className={classes.mTop}>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                      match
                    />
                  ))}
                </>
              ) : (
                <Typography variant='h5'>No Experience Credentials</Typography>
              )}
            </Grid>
            <Grid container className={classes.mTop}>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                      match
                    />
                  ))}
                </>
              ) : (
                <Typography variant='h5'>No Education Credentials</Typography>
              )}
            </Grid>
            <Grid container className={classes.mTop}>
              {profile.github ? (
                <Paper className={classes.paper}>
                  <ProfileGithub username={profile.github} />
                </Paper>
              ) : (
                <Typography variant='h5'>No Github Repo</Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  halfWidth: {
    width: 350
  },
  mTop: {
    marginTop: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3)
  }
}));

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
