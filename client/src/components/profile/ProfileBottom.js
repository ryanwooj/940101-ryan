import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const ProfileBottom = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container direction='column'>
        <Grid item>
          {bio && (
            <>
              <Typography variant='h5'>
                {name.trim().split(' ')[0]}'s Saying:
              </Typography>
              <Typography variant='body1'>{bio}</Typography>
            </>
          )}
        </Grid>
        <Grid item>
          <Divider className={classes.spaceBTW} />
          <Typography variant='h5'>Skill Sets</Typography>
          <Grid container>
            {skills.map((skill, index) => (
              <Grid item xs={3} key={index}>
                <Icon>check</Icon>
                {skill}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    minHeight: 210
  },
  spaceBTW: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

ProfileBottom.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileBottom;
