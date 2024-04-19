import { Close, DateRangeRounded, LocationOn, Person2Rounded, Timer } from '@mui/icons-material';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography, styled, useTheme } from '@mui/material';
import React from 'react'
import { toast } from 'react-toastify';
import { tournament } from '../Validation/Admin';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { TounamentPostApi } from '../../Redux/Action/AdminAction';

const categoryoption = [
    { value: 'Senior', label: 'Senior' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Sub-Junior', label: 'Sub-Junior' },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const AddTournament = () => {

     const [open, setOpen] = React.useState(false);
   const theme = useTheme()
    const {data,error} = useSelector((state => state.admin))
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const initial ={
      name:"",
      location:"",
      date:"",
      category:"",
    }

 const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initial,
        validationSchema: tournament,

        onSubmit: async (values) => {
            console.log(values);
            try {
                const formdata = new FormData()
                formdata.append('TournamentName', values.name)
                formdata.append('Location', values.time)
                formdata.append('TournamentDate', values.time)
                formdata.append('Category', values.time)
                

                await dispatch(TounamentPostApi(formdata))
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


  return (
   <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Tournament
                </Button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Add Tournament
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
                        <Close />
                    </IconButton>
                    <DialogContent dividers>
                        
                          <form onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xl={12} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Tournament Name"
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
                                        id="location"
                                        name="location"
                                        label="Location"
                                        value={values.location}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >

                                                <LocationOn />
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                                    {errors.location && touched.location ? (<Typography variant="subtitle1" color="error">{errors.location}</Typography>) : null}
                                </Grid>         
                                 <Grid item xl={12} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="date"
                                        name="date"
                                        label="Tournament Date"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={values.date}
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
                                    {errors.date && touched.date ? (<Typography variant="subtitle1" color="error">{errors.date}</Typography>) : null}
                                </Grid>
                                <Grid item xl={12} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        select
                                        id="category"
                                        name="category"
                                        label="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                         {categoryoption.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                        
                                    </TextField>
                                    {errors.category && touched.category ? (<Typography variant="subtitle1" color="error">{errors.category}</Typography>) : null}
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

export default AddTournament
