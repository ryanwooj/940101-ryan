import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';

import { Link } from 'react-router-dom';

const ModalComp = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      aria-labelledby='Profile not found'
      aria-describedby='please create a profile'
      open={open}
      onClose={handleClose}>
      <DialogTitle style={{ cursor: 'move' }}>No Profile Found</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please click the button below to Create a Profile
        </DialogContentText>
      </DialogContent>
      <DialogActions />
      <Button onClick={handleClose}>Cancel</Button>
      <Button
        variant='outlined'
        color='secondary'
        to='/create-profile'
        component={Link}>
        CREATE
      </Button>
    </Dialog>
  );
};

export default ModalComp;
