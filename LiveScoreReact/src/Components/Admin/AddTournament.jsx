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
    const { categorydata, data, error } = useSelector((state => state.admin))
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
        Location: "",
        TournamentDate: "",
        CategoryId: "",
    }

    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initial,
        validationSchema: tournament,

        onSubmit: async (values ,{ resetForm, setSubmitting }) => {
            // console.log(values);
            try {

                await dispatch(TounamentPostApi(values))
                setSubmitting(false)
                resetForm({ values: "" });
                dispatch(getTounamentApi())
                //  if (data) {
                //     console.log("added")
                //      toast.success(data.msg)
                //  }
                //  if (error) {
                //      toast.error(error.msg)
                //  }
                // console.log(values)
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
                                <Grid item xl={12} md={6} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="location"
                                        name="Location"
                                        label="Location"
                                        value={values.Location}
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
                                <Grid item xl={12} md={6} sm={12}>
                                    <FormControl variant='filled' fullWidth>
                                        <InputLabel color='secondary'>Category</InputLabel>
                                        <Select
                                            color='secondary'
                                            id='CategoryId'
                                            label="CategoryId"
                                            name='CategoryId'
                                            value={values.CategoryId}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            {categorydata?.map((data) => (
                                                <MenuItem key={data.id} value={data.id}>{data.categoryName}</MenuItem>
                                            ))
                                            }

                                        </Select>
                                    </FormControl>

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
