import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useEffect } from 'react';

// OtpBlock Component
const OtpBlock = ({ digit }) => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        width: '40px',
        height: '40px',
        margin: '0 5px',
        textAlign: 'center',
        lineHeight: '40px',
        border: '2px solid green',
        bgcolor: 'green',
        color:'white',
        borderRadius: '4px',
        fontSize: '25px',
      }}
    >
      {digit}
    </Box>
  );
};

// GenerateOtp Component
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const GenerateOtp = () => {

  const [open, setOpen] = useState(false);
  const [setotp, setSetotp] = useState()
  


    
    useEffect(() => {
    
    }, [])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // Sample OTP for demonstration purposes
  const otp = '111111';

  return (
    <div>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Generate OTP
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2,fontSize: '19px', }}  id="customized-dialog-title">
            OTP Generated Successfully!!
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 10,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography component="h5" gutterBottom></Typography>
            <div>
              {otp.split('').map((digit, index) => (
                <OtpBlock key={index} digit={digit} />
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Next
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    </div>
  );
};

export default GenerateOtp;
