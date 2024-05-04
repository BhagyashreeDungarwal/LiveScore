import { Close, DateRangeRounded, LocationOn, Person2Rounded, Timer } from '@mui/icons-material';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { tournament } from '../Validation/Admin';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { TounamentPostApi, getCategoryApi, getTounamentApi } from '../../Redux/Action/AdminAction';
import ProtectedRoute from '../../ProtectedRoute';



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
    const theme = useTheme()
    const dispatch = useDispatch()
    const handleClickOpen = async () => {
        setOpen(true);

        console.log(open)
    };
    const handleClose = () => {
        setOpen(false);
    };

    const initial = {
        TournamentName: "",
        Venue: "",
        TournamentDate: "",
    }

    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initial,
        validationSchema: tournament,

        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                await dispatch(TounamentPostApi(values))
                setSubmitting(false)
                resetForm({ values: "" });
                dispatch(getTounamentApi())
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
                    > <Close />
                    </IconButton>
                    <DialogContent dividers>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xl={12} md={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        variant='standard'
                                        id="name"
                                        name="TournamentName"
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
                                <Grid item xl={12} md={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        variant='standard'
                                        id="Venue"
                                        name="Venue"
                                        label="Venue"
                                        value={values.Venue}
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
                                    {errors.Venue && touched.Venue ? (<Typography variant="subtitle1" color="error">{errors.Venue}</Typography>) : null}
                                </Grid>
                                <Grid item xl={12} md={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        variant='standard'
                                        id="date"
                                        name="TournamentDate"
                                        label="Tournament Date"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={values.TournamentDate}
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
                                <Grid item xl={12} md={12} sm={12}>
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
