import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';
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
    overflowX: 'auto',
    padding: theme.spacing(3),
    width: '100%'
  }
}));

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
  match
}) => {
  const classes = useStyles();

  return (
    <Grid container justify='center'>
      <Paper className={classes.root}>
        <Typography variant='h4'>Experience Credentials</Typography>
        <Table className='table'>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell className='hide-sm'>Title</TableCell>
              <TableCell className='hide-sm'>Years</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{company}</TableCell>
              <TableCell className='hide-sm'>{title}</TableCell>
              <TableCell>
                <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
                {to === null ? (
                  ' Now '
                ) : (
                  <Moment format='YYYY/MM/DD'>{to}</Moment>
                )}
              </TableCell>
              <TableCell>
                <Button onClick={() => deleteExperience(match.params._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
