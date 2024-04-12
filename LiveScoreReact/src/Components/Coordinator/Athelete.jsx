import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { TextField, MenuItem, Button , Grid, Input} from '@mui/material';
import { object, string, number, date } from 'yup';

const validationSchema = object({
  name: string().required('Name is required'),
  email: string().email('Invalid email address').required('Email is required'),
  gender: string().required('Gender is required'),
  height: number().required('Height is required'),
  weight: number().required('Weight is required'),
  state: string().required('State is required'),
  city: string().required('City is required'),
  dateOfBirth: date().required('Date of Birth is required'),
  image: string().required('Image is required'),
  coordinator: string().required('Co-ordinater is required'),
  coach: string().required('Coach is required'),
  contact: string().required('Contact is required'),
});
const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];
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

const Athelete = () => {

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          gender: '',
          height: '',
          weight: '',
          state: '',
          city: '',
          contact: '',
          dateOfBirth: null,
          image: null,
          coordinator:null,
          coach:null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          console.log(values);
          // You can perform any action with the form values here, like submitting to a server
        },
      });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleImageChange = (event) => {
        formik.setFieldValue('image', event.currentTarget.files[0]);
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
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={1}>
                        
                        <Grid item xl={12} md={6} sm={12}>
                        
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        </Grid>
                        
                        <Grid item xl={12} md={6} sm={12}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        </Grid>
                        <Grid  item xl={12} md={6} sm={12}>
                        
                        <Input
                            fullWidth
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            error={formik.touched.image && Boolean(formik.errors.image)}
                            helperText={formik.touched.image && formik.errors.image}
                        />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12}>
                                
                        <TextField
                            fullWidth
                            select
                            id="gender"
                            name="gender"
                            label="Gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                            helperText={formik.touched.gender && formik.errors.gender}
                            >
                            {genderOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                        <Grid item xl={6} md={6} sm={12}>
                                    
                        <TextField
                        fullWidth
                            id="contact"
                            name="contact"
                            label="Contact"
                            type="number"
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            error={formik.touched.contact && Boolean(formik.errors.contact)}
                            helperText={formik.touched.contact && formik.errors.contact}
                            
                        />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12}>
                                    
                        <TextField
                        fullWidth
                            id="height"
                            name="height"
                            label="Height (cm)"
                            type="number"
                            value={formik.values.height}
                            onChange={formik.handleChange}
                            error={formik.touched.height && Boolean(formik.errors.height)}
                            helperText={formik.touched.height && formik.errors.height}
                            
                        />
                        </Grid>
                        
                        <Grid item xl={6} md={6} sm={12}>
                                        
                        <TextField
                            fullWidth
                            id="weight"
                            name="weight"
                            label="Weight (kg)"
                            type="number"
                            value={formik.values.weight}
                            onChange={formik.handleChange}
                            error={formik.touched.weight && Boolean(formik.errors.weight)}
                            helperText={formik.touched.weight && formik.errors.weight}
                        />
                       
                        </Grid> 
                        <Grid item xl={6} md={6} sm={12}>
                        <TextField
                            fullWidth
                            id="state"
                            name="state"
                            label="State"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12}>

                        <TextField
                            fullWidth
                            id="city"
                            name="city"
                            label="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>
                    <Grid item xl={12} md={6} sm={12}>

                        <TextField
                            fullWidth
                            id="dateOfBirth"
                            name="dateOfBirth"
                            label="Date of Birth"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.dateOfBirth}
                            onChange={formik.handleChange}
                            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                        />
                    </Grid>
                    <Grid item xl={6} md={6} sm={12}>
                   
                        <TextField
                            fullWidth
                            select
                            id="coordinator"
                            name="coordinator"
                            label="Coordinator"
                            value={formik.values.coordinator}
                            onChange={formik.handleChange}
                            error={formik.touched.coordinator && Boolean(formik.errors.coordinator)}
                            helperText={formik.touched.coordinator && formik.errors.coordinator}
                        >
                            {coordinatorOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                        <Grid item xl={6} md={6} sm={12}>
                        <TextField
                            fullWidth
                            select
                            id="coach"
                            name="coach"
                            label="Coach"
                            value={formik.values.coach}
                            onChange={formik.handleChange}
                            error={formik.touched.coach && Boolean(formik.errors.coach)}
                            helperText={formik.touched.coach && formik.errors.coach}
                        >
                            {coachOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                    <Grid item xl={12} md={6} sm={12}>

                        <Button fullWidth type="submit" variant="contained" color="primary"sx={ {mt : 1}}>
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

export default Athelete
