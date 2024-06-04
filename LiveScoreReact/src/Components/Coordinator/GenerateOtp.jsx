import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { OtpGenerateApi, StoreOtpApi } from '../Apis/Coordinator';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RoundValidate } from '../Validation/Coordinator';
import { RoundPostApi, clearMessage } from '../../Redux/CoordinatorRedux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

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
        color: 'white',
        borderRadius: '4px',
        fontSize: '25px',
      }}
    >
      {digit}
    </Box>
  );
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({mid,matchGroup}) {
   const { data, error } = useSelector(state => state.coordinator)
  const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

   useEffect(() => {
        if (data && data.msg) {
            toast.success(data.msg)
            dispatch(clearMessage())
            navigate(`/coordinator/scoring/${matchGroup}`)
        }
        if (error) {
            toast.error(error.msg)
            dispatch(clearMessage())
        }
    }, [data, error, navigate, dispatch])
   const initial = {
       rounds:""
    }

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initial,
        validationSchema: RoundValidate,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
              // console.log(mid)
                dispatch(RoundPostApi({values, mid}))
                setSubmitting(false)
                resetForm({ values: "" });
               
            } catch (error) {
                <CircularProgress />
            }
        },
    })
 
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Next</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <form onSubmit={handleSubmit}>
        <Box sx={{ ...style}}>
          <Typography variant="h5" color="initial">Select Round</Typography>
          <FormControl sx={{mt:"5"}} fullWidth>
          <InputLabel id="demo-simple-select-label">Select Rounds</InputLabel>
          <Select
            id="rounds"
            name="rounds"
            label="Round"
            color="secondary"
            variant="filled"
            value={values.rounds}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
        {errors.rounds && touched.rounds ? (<Typography variant="subtitle1" color="error">{errors.rounds}</Typography>) : null}        
        <Box sx={{marginTop:"3%", display:"flex", justifyContent:'end', alignContent:"center"}}>
          <Button type='submit'>Start Round</Button>
        </Box>
        </Box>
        </form>
      </Modal>
    </React.Fragment>
  );
}


// GenerateOtp Component
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const GenerateOtp = ({ matchGroup ,mid}) => {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState('');

  const handleClickOpen = async () => {
    try {
      const response = await OtpGenerateApi({ matchGroup});
      setOtp(response.accessKey);  // Assuming the response contains the OTP in a field named 'otp'
      console.log(otp)
      setOpen(true);
      await StoreOtpApi({ otp: response.otp }); // Store the OTP
    } catch (error) {
      console.error("Error generating OTP:", error);
    }
  };


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        aria-label=""
        variant="contained"
        color="success"
        size="small"
        onClick={handleClickOpen}
      >
        OTP
        {/* OTP <Pin style={{ fontSize: 40 }} /> */}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, fontSize: '19px' }} id="customized-dialog-title">
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
            {otp?.split('').map((digit, index) => (
              <OtpBlock key={index} digit={digit} />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleNext}>
            Next
          </Button> */}
          
      <ChildModal matchGroup={matchGroup} mid={mid} />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default GenerateOtp;
