import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation, getCurrentProfile } from '../../actions/profile';
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

const Education = ({
  match,
  profile: { profile, loading },
  getCurrentProfile,
  deleteEducation,
  education
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
        <Typography variant='h4'>Education Credentials</Typography>
        <Table className='table'>
          <TableHead>
            <TableRow>
              <TableCell>School</TableCell>
              <TableCell className='hide-sm'>Degree</TableCell>
              <TableCell className='hide-sm'>Years</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {profile.education.map(edu => (
              <TableRow key={edu._id}>
                <TableCell>{edu.school}</TableCell>
                <TableCell className='hide-sm'>{edu.degree}</TableCell>
                <TableCell>
                  <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                  {edu.to === null ? (
                    ' Now '
                  ) : (
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteEducation(edu._id)}>
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

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { deleteEducation, getCurrentProfile }
)(Education);
