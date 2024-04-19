import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { TextField, MenuItem, Button, Grid, Typography, RadioGroup, FormControlLabel, Radio, FormLabel, CircularProgress, InputAdornment } from '@mui/material';
import { AthleteValidate } from '../Validation/Coordinator';
import { AddLocationAltRounded, AlternateEmailRounded, DateRangeRounded, Height, LocationCityRounded, MonitorWeight, PermContactCalendarRounded, Person2Rounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AtheletePostApi } from '../../Redux/Action/CoordinatorAction';

const coordinatorOptions = [
    { value: 'John Doe', label: 'John Doe' },
    { value: 'Jane Smith', label: 'Jane Smith' },
    { value: 'Mike Johnson', label: 'Mike Johnson' },
];

const coachOptions = [
    { value: 'David Brown', label: 'David Brown' },
    { value: 'Emily White', label: 'Emily White' },
    { value: 'Michael Lee', label: 'Michael Lee' },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const AddAthelete = () => {

    const theme = useTheme()
    const {data,error} = useSelector((state => state.coordinator))
    const dispatch = useDispatch()

    const initial = {
        name: "",
        email: "",
        contact: "",
        gender: "",
        coordinator: "",
        coach: "",
        dateOfBirth: "",
        city: "",
        height: "",
        weight: "",
        state: "",
        image: null,
    }
    
React.useEffect(() => {
   if (data) {
      toast.success(data.msg)
      console.log(data.msg)
   }
   if(error){
     toast.error(error.msg)
    console.log(error.msg)
   }
}, [ data, error])


    const { values, touched, errors, handleBlur, handleChange, handleSubmit,setFieldValue } = useFormik({
        initialValues: initial,
        validationSchema: AthleteValidate,

        onSubmit: async (values) => {
            console.log(values);
            try {
                const formdata = new FormData()
                formdata.append('Name', values.name)
                formdata.append('Email', values.email)
                formdata.append('Contact', values.contact)
                formdata.append('Gender', values.gender)
                formdata.append('DateOfBirth', values.dateOfBirth)
                formdata.append('City', values.city)
                formdata.append('State', values.state)
                formdata.append('Coach', values.coach)
                formdata.append('Coordinator', values.coordinator)
                formdata.append('ImageFile', values.image)

                await dispatch(AtheletePostApi(formdata))
                if(data){
                    toast.success(data.msg)
                }
                if(error){
                    toast.error(error.msg)
                }
                console.log(values)
                console.log(formdata);
            } catch (error) {
                <CircularProgress />
            }
        },

    })

    const handleFile = (e) => {
        const file = e.target.files[0]

        setFieldValue('image',file)
        console.log("file 1", file)
        // const reader = new FileReader()
        // reader.readAsDataURL(file)
    }

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
                    Add Athelete
                </Button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Add Athelete
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
                            <Grid container spacing={1}>

                                <Grid item xl={12} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Name"
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >

                                                <Person2Rounded />
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                                    {errors.name && touched.name ? (<Typography variant="subtitle1" color="error">{errors.name}</Typography>) : null}
                                </Grid>

                                <Grid item xl={12} md={6} sm={12}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                                <Grid item xl={6} md={6} sm={12}>
                                    <FormLabel component="legend">Upload Image</FormLabel>
                                    <input
                                    id="image-upload"
                                    label="Image"
                                    name='image'
                                    type="file"
                                    onChange={handleFile}
                                    onBlur={handleBlur}
                                    />
                                    {errors.image && touched.image ? (<Typography variant="subtitle1" color="error">{errors.image}</Typography>) : null}
                                </Grid>
                                <Grid item xl={6} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="contact"
                                        name="contact"
                                        label="Contact"
                                        type="number"
                                        value={values.contact}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >

                                                <PermContactCalendarRounded />
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                                    {errors.contact && touched.contact ? (<Typography variant="subtitle1" color="error">{errors.contact}</Typography>) : null}
                                </Grid>
                                <Grid item xl={12} md={6} sm={12}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="gender"
                                        id="gender"
                                        name="gender"
                                        size='small'
                                        value={values.gender}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                    {errors.gender && touched.gender ? (<Typography variant="subtitle1" color="error">{errors.gender}</Typography>) : null}

                                </Grid>

                                <Grid item xl={6} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="height"
                                        name="height"
                                        label="Height (cm)"
                                        type="number"
                                        value={values.height}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >

                                                <Height />
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                                    {errors.height && touched.height ? (<Typography variant="subtitle1" color="error">{errors.height}</Typography>) : null}
                                </Grid>

                                <Grid item xl={6} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="weight"
                                        name="weight"
                                        label="Weight (kg)"
                                        type="number"
                                        value={values.weight}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >

                                                <MonitorWeight />
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                                    {errors.weight && touched.weight ? (<Typography variant="subtitle1" color="error">{errors.weight}</Typography>) : null}

                                </Grid>
                                <Grid item xl={6} md={6} sm={12}>
                                    <TextField
                                        fullWidth
                                        id="state"
                                        name="state"
                                        label="State"
                                        value={values.state}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >

                                                <AddLocationAltRounded />
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                                    {errors.state && touched.state ? (<Typography variant="subtitle1" color="error">{errors.state}</Typography>) : null}
                                </Grid>
                                <Grid item xl={6} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="city"
                                        name="city"
                                        label="City"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >
                                                <LocationCityRounded />
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                                    {errors.city && touched.city ? (<Typography variant="subtitle1" color="error">{errors.city}</Typography>) : null}
                                </Grid>
                                <Grid item xl={12} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={values.dateOfBirth}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >
                                                <DateRangeRounded />
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                                    {errors.dateOfBirth && touched.dateOfBirth ? (<Typography variant="subtitle1" color="error">{errors.dateOfBirth}</Typography>) : null}
                                </Grid>
                                <Grid item xl={6} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        select
                                        id="coordinator"
                                        name="coordinator"
                                        label="Coordinator"
                                        value={values.coordinator}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {coordinatorOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    {errors.coordinator && touched.coordinator ? (<Typography variant="subtitle1" color="error">{errors.coordinator}</Typography>) : null}
                                </Grid>
                                <Grid item xl={6} md={6} sm={12}>
                                    <TextField
                                        fullWidth
                                        select
                                        id="coach"
                                        name="coach"
                                        label="Coach"
                                        value={values.coach}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {coachOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    {errors.coach && touched.coach ? (<Typography variant="subtitle1" color="error">{errors.coach}</Typography>) : null}
                                </Grid>
                                <Grid item xl={12} md={6} sm={12}>

                                    <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
                                        Submit
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

export default AddAthelete
