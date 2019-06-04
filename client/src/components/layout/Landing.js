import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import compu from '../../images/computerBG.jpg';
import ryanWoo from '../../images/ryanWoo.jpg';

const Landing = ({ isAuthenticated }) => {
  const classes = useStyles();

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container fixed maxWidth='lg'>
      <Grid className={classes.paper}>
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={compu} title='Woo' />
          <CardHeader
            avatar={
              <Avatar src={ryanWoo} alt='Avatar' className={classes.avatarrr} />
            }
            action={<IconButton />}
            title='RYAN WOO'
            subheader='Full Stack Developer'
          />

          <CardContent align='center'>
            <Typography variant='h5'>Sign in for Access</Typography>
          </CardContent>
          <Grid container justify='flex-end' className={classes.grid2}>
            <Button to='/register' component={Link} color='primary'>
              <Icon>how_to_reg</Icon>{' '}
              <Typography variant='body2' className={classes.moveRight}>
                Register
              </Typography>
            </Button>
            <Button to='/login' component={Link} color='primary'>
              <Icon>vpn_key</Icon>{' '}
              <Typography variant='body2' className={classes.moveRight}>
                Sign in
              </Typography>
            </Button>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles(theme =>
  createStyles({
    '@global': {
      body: {
        backgorundColor: theme.palette.common.white
      }
    },
    card: {
      minWidth: 360,
      maxWidth: 900,
      width: 500
    },
    media: {
      height: 250
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1)
    },
    avatarrr: {
      margin: 10,
      width: 90,
      height: 90
    },
    moveRight: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(3)
    },
    grid2: {
      margin: theme.spacing(2)
    }
  })
);

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
