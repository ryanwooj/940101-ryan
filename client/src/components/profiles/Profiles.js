import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './Profileitem';
import { getProfiles } from '../../actions/profile';
import Dashboard from '../dashboard/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const Profiles = ({
  getProfiles,
  profile: { profiles, loading },
  auth: { user }
}) => {
  const classes = useStyles();
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line
  }, [getProfiles]);
  return (
    <Container maxWidth='md'>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          {user ? <Dashboard /> : <></>}
          <Divider />
          <Grid container justify='flex-start'>
            <Grid item className={classes.doThis}>
              <Typography variant='h4'>All Users</Typography>
            </Grid>
            <Grid item style={{ marginTop: '1.5em', marginLeft: '1em' }}>
              <Typography variant='body1'>
                Browse and See other People
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            justify='space-evenly'
            alignItems='flex-start'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <Typography variant='h2'>No profile on Record</Typography>
            )}
          </Grid>
        </Container>
      )}
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  ltmargin: {
    topMargin: theme.spacing(2)
  },
  doThis: {
    margin: theme.spacing(1)
  }
}));

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
