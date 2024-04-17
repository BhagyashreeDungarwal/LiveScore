import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { TextField,  Button, Grid, Typography, RadioGroup, FormControlLabel, Radio, FormLabel, CircularProgress, InputAdornment,useTheme, Input } from '@mui/material';
import { useState } from 'react';
import { acr } from '../Validation/Coordinator';
import { AccessibilityNewRounded, AddLocationAltRounded, AlternateEmailRounded, DateRangeRounded, LocationCityRounded, PatternRounded, PermContactCalendarRounded, Person2Rounded, Visibility, VisibilityOff } from '@mui/icons-material';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const AddReferee = () => {
 
    const [file, setFile] = useState();
    const theme = useTheme()
    const [type, setType] = useState("password")
    const [visible, setVisible] = useState(false)
    const icon = (visible ? <Visibility color='secondary' /> : <VisibilityOff color='secondary' />)
    const showClick = () => {
        if (visible === false) {
            setVisible(true)
            setType("text")
        }
        else {
            setVisible(false)
            setType("password")
        }
    }


    const handleFile = (e) => {
        const file = e.target.files[0]

        setFile(file)
        console.log("file 1", file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
    }

    const initial = {
        name: "",
        email: "",
        password: "",
        contact: "",
        age: "",
        dateOfBirth: "",
        image: null,
        gender: "",
        state: "",
        city: "",
    }

    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initial,
        validationSchema: acr,

        onSubmit: async (values) => {
            try {
                const formdata = new FormData()
                formdata.append('data', values)
                formdata.append('file', file)
                console.log(values)
                console.log(formdata);
            } catch (error) {
                <CircularProgress />
            }
        },

    })

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log("open")
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Referee
                </Button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Add Referee
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
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
                            <Grid item xl={6} sm={12} xs={12} lg={6}  >
                                <TextField
                                    label="Email"
                                    size='small'
                                    variant="standard"
                                    fullWidth
                                    name='email'
                                    color='secondary'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ shrink: true }}
                                    placeholder='Enter Email'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >
                                                <AlternateEmailRounded />
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                                {errors.email && touched.email ? (<Typography variant="subtitle1" color="error">{errors.email}</Typography>) : null}
                            </Grid>
                            <Grid item xl={6} sm={12} xs={12} lg={6} >
                                <TextField
                                    label="Password"
                                    size='small'
                                    name='password'
                                    type={type}
                                    variant="standard"
                                    fullWidth
                                    color='secondary'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ shrink: true }}
                                    placeholder='Enter Password'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >

                                                <PatternRounded />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (<InputAdornment position="end"> <IconButton onClick={showClick}>
                                            {icon}
                                        </IconButton> </InputAdornment>)
                                    }}

                                />
                                {errors.password && touched.password ? (<Typography variant="subtitle1" color="error">{errors.password}</Typography>) : null}
                            </Grid>
                            <Grid item xl={12} sm={12} xs={12} lg={12} >
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
                            <Grid item xl={6} sm={12} xs={12} lg={12} >
                                <TextField
                                    label="Age"
                                    variant="standard"
                                    fullWidth
                                    color='secondary'
                                    type='number'
                                    name='age'
                                    size='small'
                                    value={values.age}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ shrink: true }}
                                    placeholder='Enter Age'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >

                                                <AccessibilityNewRounded />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {errors.age && touched.age ? (<Typography variant="subtitle1" color="error">{errors.age}</Typography>) : null}
                            </Grid>
                            <Grid item xl={6} sm={12} xs={12} lg={12} >
                                <TextField
                                    label="Date fo birth"
                                    variant="standard"
                                    fullWidth
                                    name='dateOfBirth'
                                    color='secondary'
                                    type='date'
                                    size='small'
                                    value={values.dateOfBirth}
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
                                <FormLabel component="legend">Upload Image</FormLabel>
                                <Input
                                    id="image-upload"
                                    label="Image"
                                    variant="standard"
                                    name='image'
                                    size='small'
                                    fullWidth
                                    color='secondary'
                                    type='file'
                                    inputProps={{ accept: 'image/*' }}
                                    // style={{ display: 'none' }} 
                                    //sx={{ marginBottom: "15px" }}
                                    // value={values.image}
                                    onBlur={handleBlur}
                                    onChange={handleFile}
                                />
                                {/* <label htmlFor="image-upload">
                                    <Button variant="contained" component="span">
                                        <AddPhotoAlternateRounded /> Upload Image
                                    </Button>
                                </label> */}
                                {errors.image && touched.image ? (<Typography variant="subtitle1" color="error">{errors.image}</Typography>) : null}
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
                                    defaultValue="male"

                                >
                                    <FormControlLabel value="male" control={<Radio size='small' />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio size='small' />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio size='small' />} label="Other" />
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
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </DialogContent>

                </BootstrapDialog>
            </React.Fragment>
        </div>
    )

}

export default AddReferee
