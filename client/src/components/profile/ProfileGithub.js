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
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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
          <Paper className={classes.paper}>
            {repos === null ? (
              <Spinner />
            ) : (
              repos.map(repo => {
                return (
                  <Grid key={repo.id}>
                    <Grid item xs={12}>
                      <Typography variant='h4'>Github Repos</Typography>
                    </Grid>
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
                    <Grid item xs={12}>
                      <List>
                        <ListItem>Stars: {repo.stargazers_count}</ListItem>

                        <ListItem>Watchers: {repo.watchers_count}</ListItem>
                        <ListItem>Forks: {repo.forks_count}</ListItem>
                      </List>
                    </Grid>
                  </Grid>
                );
              })
            )}
          </Paper>
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
