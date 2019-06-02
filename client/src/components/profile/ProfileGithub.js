import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  const classes = useStyles();
  return (
    <>
      {repos.length > 0 ? (
        <Grid
          container
          direction='row'
          justify='space-evenly'
          alignItems='flex-start'>
          <Grid item xs={12}>
            <Typography variant='h4'>Github Repos</Typography>
          </Grid>
          {repos === null ? (
            <Spinner />
          ) : (
            repos.map(repo => {
              return (
                <Grid key={repo.id} item xs={12} sm={6} md={4}>
                  <Grid>
                    <Typography variant='h4' color='primary'>
                      <Button href={repo.html_url} color='primary'>
                        {repo.name}
                      </Button>
                    </Typography>
                    {repo.language && (
                      <Typography> Language: {repo.language} </Typography>
                    )}
                    <Button
                      href={repo.html_url}
                      color='secondary'
                      className={classes.noCaps}>
                      https://www.github.com/{repo.full_name}
                    </Button>
                    {repo.created_at && (
                      <Typography>
                        Created at{' '}
                        <Moment format='MM/DD/YYYY'>{repo.created_at}</Moment>{' '}
                      </Typography>
                    )}
                  </Grid>
                  <Grid container direction='row' justify='space-evenly'>
                    <Grid item>
                      <Icon className={classes.starIcon}>star</Icon>
                      <Typography> Stars: {repo.stargazers_count}</Typography>
                    </Grid>
                    <Grid item>
                      <Icon className={classes.eyeIcon}>remove_red_eye</Icon>
                      <Typography>Watchers: {repo.watchers_count}</Typography>
                    </Grid>
                    <Grid item>
                      <Icon className={classes.setIcon}>
                        settings_input_component
                      </Icon>
                      <Typography>Forks: {repo.forks_count}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          )}
        </Grid>
      ) : (
        <Typography variant='h5'>Empty Repository</Typography>
      )}
    </>
  );
};

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  },
  noCaps: {
    textTransform: 'lowercase'
  },
  starIcon: {
    color: '#ffea00'
  },
  eyeIcon: {
    color: '#673ab7'
  },
  setIcon: {
    color: 'black'
  }
}));

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(
  mapStateToProps,
  { getGithubRepos }
)(ProfileGithub);
