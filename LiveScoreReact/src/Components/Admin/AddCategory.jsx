import { Close, Person2Rounded, Timer } from '@mui/icons-material';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, Typography, styled, useTheme } from '@mui/material';
import React from 'react'
import { toast } from 'react-toastify';
import { category } from '../Validation/Admin';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryPostApi, getCategoryApi } from '../../Redux/Action/AdminAction';
import ProtectedRoute from '../../ProtectedRoute';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const AddCategory = () => {

    const [open, setOpen] = React.useState(false);
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
        CategoryName: "",
        CategoryTime: "",
    }

    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initial,
        validationSchema: category,

        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                await dispatch(CategoryPostApi(values))
                setSubmitting(false)
                if (data) {
                    toast.success(data.msg)
                    resetForm({ values: "" });
                    dispatch(getCategoryApi())
                }
                if (error) {
                    toast.error(error.msg)
                }
            } catch (error) {
                <CircularProgress />
            }

        },

    })

    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Category
                </Button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Add Category
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
                                <Grid item xl={12} md={12} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="CategoryName"
                                        label="Category Name"
                                        value={values.CategoryName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        variant='standard'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >
                                                    <Person2Rounded />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {errors.CategoryName && touched.CategoryName ? (<Typography variant="subtitle1" color="error">{errors.CategoryName}</Typography>) : null}
                                </Grid>
                                <Grid item xl={12} md={12} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="time"
                                        name="CategoryTime"
                                        label="Time"
                                        value={values.CategoryTime}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        variant='standard'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >

                                                    <Timer />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {errors.CategoryTime && touched.CategoryTime ? (<Typography variant="subtitle1" color="error">{errors.CategoryTime}</Typography>) : null}
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

export default ProtectedRoute(AddCategory,'admin')
