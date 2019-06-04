import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container direction='row' justify='space-evenly'>
        <Grid item>
          <Avatar className={classes.media} src={avatar} alt='' />
        </Grid>
        <Grid item t={3}>
          <Typography variant='h5'>{name}</Typography>
          <Typography className='lead'>
            {status} {company && <span> at {company}</span>}
          </Typography>
          <Typography>{location && <span>{location}</span>}</Typography>
          <Grid container direction='row'>
            <Grid item>
              {website && (
                <Button href={website} color='secondary'>
                  <Icon fontSize='large'>directions</Icon> to Website
                </Button>
              )}
            </Grid>
            <Grid item>
              {social && social.twitter && (
                <Button href={social.twitter}>
                  <Avatar src={require('../../images/twitter.svg')} />
                </Button>
              )}
            </Grid>
            <Grid item>
              {social && social.facebook && (
                <Button href={social.facebook}>
                  <Avatar src={require('../../images/facebook.svg')} />
                </Button>
              )}
            </Grid>
            <Grid item>
              {social && social.linkedin && (
                <Button href={social.linkedin}>
                  <Avatar src={require('../../images/linkedin.svg')} />
                </Button>
              )}
            </Grid>
            <Grid item>
              {social && social.youtube && (
                <Button href={social.youtube}>
                  <Avatar src={require('../../images/youtube.svg')} />
                </Button>
              )}
            </Grid>
            <Grid item>
              {social && social.instagram && (
                <Button href={social.instagram}>
                  <Avatar src={require('../../images/instagram.svg')} />
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
const useStyles = makeStyles(theme => ({
  media: {
    margin: 10,
    width: 100,
    height: 100
  },
  paper: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    minHeight: 210
  }
}));

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
