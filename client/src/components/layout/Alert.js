import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import green from '@material-ui/core/colors/green';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const Alert = ({ alerts }) => {
  const classes = useStyles();
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => {
      if (alert.alertType === 'success') {
        return (
          <Grid container alignItems='center' justify='center'>
            <SnackbarContent
              key={alert.id}
              className={classes.success}
              autohideduration={4000}
              message={alert.msg}
            />
          </Grid>
        );
      } else if (alert.alertType === 'danger') {
        return (
          <Grid container alignItems='center' justify='center'>
            <SnackbarContent
              key={alert.id}
              className={classes.error}
              autohideduration={4000}
              message={alert.msg}
            />
          </Grid>
        );
      } else {
        return (
          <Grid container alignItems='center' justify='center'>
            <SnackbarContent
              key={alert.id}
              className={classes.error}
              autohideduration={4000}
              message={alert.msg}
            />
          </Grid>
        );
      }
    })
  );
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
    width: '50%',
    justifyContent: 'center'
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    width: '50%',
    justifyContent: 'center'
  }
}));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
