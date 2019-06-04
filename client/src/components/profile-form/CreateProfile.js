import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import twitterLogo from '../../images/twitter.svg';
import facebookLogo from '../../images/facebook.svg';
import youtubeLogo from '../../images/youtube.svg';
import linkedinLogo from '../../images/linkedin.svg';
import instagramLogo from '../../images/instagram.svg';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    github: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const classes = useStyles();

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    github,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Container
      justify='center'
      direction='column'
      align='center'
      className={classes.paper}>
      <Typography variant='h3'>Create Your Profile</Typography>
      <Typography variant='body1'>Please Introduce Yourself</Typography>

      <form className='form' onSubmit={e => onSubmit(e)}>
        <FormControl className={classes.formControl} fullWidth>
          <FormHelperText>* = required field</FormHelperText>
          <Select
            value={status}
            onChange={e => onChange(e)}
            input={<Input name='age' id='age-label-placeholder' />}
            displayEmpty
            name='status'
            className={classes.selectEmpty}>
            <MenuItem value='0'>
              <em>Select</em>
            </MenuItem>
            <MenuItem value='Developer'>Developer</MenuItem>
            <MenuItem value='Junior Developer'>Junior Developer</MenuItem>
            <MenuItem value='Senior Developer'>Senior Developer</MenuItem>
            <MenuItem value='Manager'>Manager</MenuItem>
            <MenuItem value='Student or Learning'>Student or Learning</MenuItem>
            <MenuItem value='Instructor'>Instructor or Teacher</MenuItem>
            <MenuItem value='Intern'>Intern</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant='outlined'
          placeholder='Company'
          fullWidth
          name='company'
          value={company}
          onChange={e => onChange(e)}
          margin='normal'
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          placeholder='Website'
          name='website'
          value={website}
          onChange={e => onChange(e)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          placeholder='Location'
          name='location'
          value={location}
          onChange={e => onChange(e)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          placeholder='* Skills'
          name='skills'
          value={skills}
          onChange={e => onChange(e)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          placeholder='Github Username'
          name='github'
          value={github}
          onChange={e => onChange(e)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          rowsMax='5'
          label='Anything to Mention'
          name='bio'
          fullWidth
          value={bio}
          onChange={e => onChange(e)}
        />

        <Grid className='my-2'>
          <Button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            color='primary'>
            Add Social Network Links
          </Button>
          <span>(Optional)</span>
        </Grid>

        {displaySocialInputs && (
          <Container direction='column' justify='center' alignItems='center'>
            <Grid item>
              <Avatar src={twitterLogo} alt='twitterLogo' />
              <TextField
                variant='outlined'
                label='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item>
              <Avatar src={facebookLogo} alt='facebookLogo' />
              <TextField
                variant='outlined'
                label='facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item>
              <Avatar src={youtubeLogo} alt='youtubeLogo' />
              <TextField
                variant='outlined'
                label='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item>
              <Avatar src={linkedinLogo} alt='linkedinLogo' />
              <TextField
                variant='outlined'
                label='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item>
              <Avatar src={instagramLogo} alt='instagramLogo' />
              <TextField
                variant='outlined'
                label='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </Grid>
          </Container>
        )}
        <Button type='submit' color='primary' variant='outlined'>
          Submit
        </Button>
      </form>
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    width: '75%'
  }
}));

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
