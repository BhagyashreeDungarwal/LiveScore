import { Close, DateRangeRounded, LocationOn, Person2Rounded, Timer } from '@mui/icons-material';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { tournament } from '../Validation/Admin';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { TounamentPostApi } from '../../Redux/Action/AdminAction';
import ProtectedRoute from '../../ProtectedRoute';

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

    const [open, setOpen] = useState(false);
    const [option, setOptionn] = useState([])

    
    const theme = useTheme()
    const { data, error } = useSelector((state => state.admin))
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const initial = {
        TournamentName: "",
        Location: "",
        TournamentDate: "",
        CategoryId: "",
    }

    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initial,
        validationSchema: tournament,

        onSubmit: async (values) => {
            console.log(values);
            try {

                await dispatch(TounamentPostApi(values))
                if (data) {
                    toast.success(data.msg)
                }
                if (error) {
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
                                        value={values.TournamentName}
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
                                    {errors.TournamentName && touched.TournamentName ? (<Typography variant="subtitle1" color="error">{errors.TournamentName}</Typography>) : null}
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
                                    {errors.Location && touched.Location ? (<Typography variant="subtitle1" color="error">{errors.Location}</Typography>) : null}
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
                                    {errors.TournamentDate && touched.TournamentDate ? (<Typography variant="subtitle1" color="error">{errors.TournamentDate}</Typography>) : null}
                                </Grid>
                                <Grid item xl={12} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        select
                                        id="category"
                                        name="category"
                                        label="category"
                                        value={values.CategoryId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {categoryoption.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}

                                    </TextField>
                                    {errors.CategoryId && touched.CategoryId ? (<Typography variant="subtitle1" color="error">{errors.CategoryId}</Typography>) : null}
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

export default ProtectedRoute(AddTournament, 'admin')
