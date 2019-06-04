import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
const DashboardActions = () => {
  return (
    <Box>
      <Grid container alignContent='space-between'>
        <Button
          variant='outlined'
          size='medium'
          color='primary'
          to='/edit-profile'
          component={Link}>
          Edit Profile
        </Button>
        <Button
          variant='outlined'
          size='medium'
          color='secondary'
          to='/add-experience'
          component={Link}>
          Add Experience
        </Button>
        <Button
          variant='outlined'
          size='medium'
          color='inherit'
          to='/add-education'
          component={Link}>
          Add Education
        </Button>
      </Grid>
    </Box>
  );
};

export default DashboardActions;
