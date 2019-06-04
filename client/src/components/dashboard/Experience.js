import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    padding: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));

const Experience = ({
  match,
  profile: { profile, loading },
  getCurrentProfile,
  deleteExperience
}) => {
  const classes = useStyles();

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading ? (
    <Spinner />
  ) : (
    <Grid container justify='center'>
      <Paper className={classes.root}>
        <Typography variant='h4'>Experience Credentials</Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell className='hide-sm'>Title</TableCell>
              <TableCell className='hide-sm'>Years</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {profile.experience.map(exp => (
              <TableRow key={exp._id}>
                <TableCell>{exp.company}</TableCell>
                <TableCell className='hide-sm'>{exp.title}</TableCell>
                <TableCell>
                  <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                  {exp.to === null ? (
                    ' Now '
                  ) : (
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteExperience(exp._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { deleteExperience, getCurrentProfile }
)(Experience);
