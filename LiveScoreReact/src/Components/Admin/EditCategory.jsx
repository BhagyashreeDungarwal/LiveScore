import {  Close, Person2Rounded,Timer } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { CategoryPutApi, GetCategoryByIdApi } from '../../Redux/Action/AdminAction';
import { category } from '../Validation/Admin';
import { ClearMessageAdmin } from '../../Redux/Reducer/AdminReducer';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const EditCategory = () => {

    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const { data, error,categoryByIddata} = useSelector((state) => state.admin)

    const initial = {
        categoryName: "",
        categoryTime: "",
    }

    useEffect(() => {
      dispatch(GetCategoryByIdApi(id));
    }, [dispatch,id])
    
    useEffect(() => {
      if(categoryByIddata){
        setValues(categoryByIddata)
      }
    }, [categoryByIddata])
    

    const { values, touched, errors, handleBlur, handleChange, handleSubmit,setValues } = useFormik({
        initialValues: initial,
        validationSchema: category,
         onSubmit: async (values) => {
            console.log(values)
            await dispatch(CategoryPutApi(values, id))
            
            if (data.msg) {
                dispatch(ClearMessageAdmin())
                navigate("/admin/category")
                // toast.success(data.msg)
            }

            if (error) {
                toast.error(error.msg)
                dispatch(ClearMessageAdmin())
            }
        },
    })

    const handleClose = () => {
        navigate("/admin/category")
      };

  return (
    <div>
            <React.Fragment>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open="true"
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Edit Category
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
                                        name="categoryName"
                                        label="category Name"
                                        value={values.categoryName}
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
                                    {errors.categoryName && touched.categoryName ? (<Typography variant="subtitle1" color="error">{errors.categoryName}</Typography>) : null}
                                </Grid>
                                <Grid item xl={12} md={12} sm={12}>

                                    <TextField
                                        fullWidth
                                        id="time"
                                        name="categoryTime"
                                        label="Time"
                                        value={values.categoryTime}
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
                                    {errors.categoryTime && touched.categoryTime ? (<Typography variant="subtitle1" color="error">{errors.categoryTime}</Typography>) : null}
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

export default EditCategory