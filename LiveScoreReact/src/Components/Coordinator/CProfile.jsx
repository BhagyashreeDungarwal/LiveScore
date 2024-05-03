import React, { useEffect } from 'react'
import HeaderFormat from '../Common/HeaderFormat'
import { Box, Button, FormControlLabel, FormLabel, Grid, InputAdornment, Paper, Radio, RadioGroup, TextField, Typography, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Avatar } from '@mui/material'
import { AccessibilityNewRounded, AddLocationAltRounded, AddPhotoAlternateRounded, AlternateEmailRounded, DateRangeRounded, LocationCityRounded, PermContactCalendarRounded, Person2Rounded } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { acrupdate } from '../Validation/Coordinator'
import { toast } from 'react-toastify'
import { CoordinatorProfileApi, CoordinatorUpdateProfileApi } from '../../Redux/Action/CoordinatorAction'
import dayjs from 'dayjs'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CProfile = () => {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { data, error, cprofiledata } = useSelector((state) => state.coordinator);
  const disptach = useDispatch()
  const cid = localStorage.getItem("ID")
  const initial = {
    name: "",
    contact: "",
    dateOfBirth: "",
    gender: "",
    state: "",
    city: "",
  }

  useEffect(() => {
    disptach(CoordinatorProfileApi(cid))
  }, [cid, disptach]);


  useEffect(() => {
    if (data) {
      toast.success(data.msg);
      disptach(CoordinatorProfileApi(cid))
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.msg);
    }
  }, [error]);


  useEffect(() => {
    if (cprofiledata) {
      setValues(cprofiledata);
    }
  }, [cprofiledata]);




  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: initial,
    validationSchema: acrupdate,
    onSubmit: async (values) => {
      console.log(values)
<<<<<<< HEAD
       await disptach(CoordinatorUpdateProfileApi(cid,values))
      if (data) {
        toast.success(data.msg)
=======
      await disptach(CoordinatorUpdateProfileApi(cid, values))

      if (data) {
        toast.success(data.msg)
        disptach(CoordinatorProfileApi(cid))
>>>>>>> 66ed4aed8883c29b1a59a326c4e974ea27ecfcab
        // navigate("/")
      }

      if (error) {
        toast.error(error.msg)
      }
    }
  })
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
        <HeaderFormat title="Profile" />
      </Box>
      <Grid container spacing={2} sx={{ mt: "1%" }}  >

        <Grid item xl={4} md={4} sm={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  >
          <Paper sx={{
            padding: 4,

          }}
            elevation={2} >
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                display: 'block',
                marginTop: 'auto',
                marginBottom: 'auto',
                maxHeight: { xs: 150, md: 167, lg: 250, sm: 500 },
                maxWidth: { xs: 150, md: 100, lg: 230, sm: 480 },
                borderRadius: 50,
              }}
              alt="The house from the offer."
              src={cprofiledata ? cprofiledata.imageURL : ""}
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleClickOpen}
              color="primary"
              sx={{ mt: "4%" }}
              fullWidth >
              Update Image
            </Button>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>Update Profile Picture</DialogTitle>
              <DialogContent>
                <form action="">
                  <Avatar src={image} className={style.Avatar} />
                  <TextField

                    sx={{ margin: "2rem 0 ", }}
                    id="name"
                    onChange={handleImage}
                    InputProps={{ startAdornment: (<InputAdornment position="start">   </InputAdornment>) }}
                    type="file"

                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: "4%" }}
                    fullWidth 
                    startIcon={<AddPhotoAlternateRounded/>}>
                    Update Image
                  </Button>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>
        <Grid item xl={8} md={8} sm={12} xs={12} >
          <Paper sx={{
            padding: 3,
          }}
            elevation={1}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xl={12} sm={12} xs={12} lg={12} >
                  <TextField
                    label="Name"
                    size='small'
                    name='name'
                    type='text'
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color="secondary"
                    // sx={{ marginBottom: "15px" }}
                    variant='standard'
                    InputLabelProps={{ shrink: true }}
                    placeholder='Enter Name'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >

                          <Person2Rounded />
                        </InputAdornment>
                      ),
                    }}

                  />
                  {errors.name && touched.name ? (<Typography variant="subtitle1" color="error">{errors.name}</Typography>) : null}
                </Grid>
                <Grid item xl={6} sm={12} xs={12} lg={6} >
                  <TextField
                    label="Contact"
                    variant="standard"
                    fullWidth
                    color='secondary'
                    type='number'
                    size='small'
                    name='contact'
                    value={values.contact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                    placeholder='Enter Contact'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >

                          <PermContactCalendarRounded />
                        </InputAdornment>
                      ),
                    }}

                  />
                  {errors.contact && touched.contact ? (<Typography variant="subtitle1" color="error">{errors.contact}</Typography>) : null}
                </Grid>
                <Grid item xl={6} sm={12} xs={12} lg={6} >
                  <TextField
                    label="Date fo birth"
                    variant="standard"
                    fullWidth
                    name='dateOfBirth'
                    color='secondary'
                    type='date'
                    size='small'
                    value={dayjs(values.dateOfBirth).format('YYYY-MM-DD')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                    placeholder='Enter Date of Birth'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >
                          <DateRangeRounded />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.dateOfBirth && touched.dateOfBirth ? (<Typography variant="subtitle1" color="error">{errors.dateOfBirth}</Typography>) : null}
                </Grid>
                <Grid item xl={12} sm={12} xs={12} lg={12} >
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"

                    id="gender"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}


                  >
                    <FormControlLabel value="Male" control={<Radio size='small' />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio size='small' />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio size='small' />} label="Other" />
                  </RadioGroup>
                  {errors.gender && touched.gender ? (<Typography variant="subtitle1" color="error">{errors.gender}</Typography>) : null}
                </Grid>
                <Grid item xl={6} sm={12} xs={12} lg={12} >
                  <TextField
                    label="state"
                    variant="standard"
                    fullWidth
                    color='secondary'
                    size='small'
                    name='state'
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                    placeholder='Enter State'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >

                          <AddLocationAltRounded />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.state && touched.state ? (<Typography variant="subtitle1" color="error">{errors.state}</Typography>) : null}
                </Grid>
                <Grid item xl={6} sm={12} xs={12} lg={12} >
                  <TextField
                    label="city"
                    name='city'
                    variant="standard"
                    fullWidth
                    color='secondary'
                    size='small'
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                    placeholder='Enter City'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >
                          <LocationCityRounded />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.city && touched.city ? (<Typography variant="subtitle1" color="error">{errors.city}</Typography>) : null}
                </Grid>
                <Grid item xl={12} sm={12} xs={12} lg={12} >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box >
  )
}

export default CProfile