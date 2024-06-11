import { Box, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { GetTotalScore, ScoreTransfer } from '../Apis/Coordinator';
import { useFormik } from 'formik';
import { endMatch } from '../Validation/Coordinator';
import { Close, SportsGymnasticsRounded, SportsMartialArtsRounded } from '@mui/icons-material';
import { clearMessage, updateRound } from '../../Redux/CoordinatorRedux';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const EndRoundModel = ({ mid, rounds,matchGroup, athleteBlue, athleteRed, athleteBlueId, athleteRedId }) => {
    const theme = useTheme()
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const { data, error } = useSelector(state => state.coordinator)

    const initial = {
        redTotalScore: "",
        blueTotalScore: "",
        RoundWinner: 0
    }
    const navigate = useNavigate()
    useEffect(() => {
        if (data && data.msg  ) {
            toast.success(data.msg)
            dispatch((clearMessage()))
            if (data.roundRes === 1 || data.roundRes === 2) {
                navigate(`/coordinator/GenerateOtp/${mid}/${matchGroup}`)
            }
        }
        if (error) {
            toast.error(error.msg)
            dispatch((clearMessage()))
        }
    }, [data, error,navigate,dispatch])


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
        initialValues: initial,
        validationSchema: endMatch,
        onSubmit: async (values) => {
            dispatch(updateRound({ values, mid, rounds }))
            await ScoreTransfer(mid)
        }

    })
    const getTotalScore = async () => {
        const data = await GetTotalScore();
        data && setValues(data)
        console.log(data)
    }


    const handleClickOpen = () => {
        // console.log("open")
        setOpen(true);
        getTotalScore()
    };
    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Box>
            <Button variant="outlined" onClick={handleClickOpen}>
                End Round
            </Button>
            <BootstrapDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add Athlete
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
                        <Grid container spacing={2}>
                            <Grid item xl={6} md={6} sm={6} xs={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    id="redTotalScore"
                                    name="redTotalScore"
                                    label="Red Total Score"
                                    value={values.redTotalScore}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >
                                                <SportsGymnasticsRounded color="error" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {errors.redTotalScore && touched.redTotalScore ? (<Typography variant="subtitle1" color="error">{errors.redTotalScore}</Typography>) : null}
                            </Grid>
                            <Grid item xl={6} md={6} sm={6} xs={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    id="blueTotalScore"
                                    name="blueTotalScore"
                                    label="Red Total Score"
                                    value={values.blueTotalScore}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >
                                                <SportsMartialArtsRounded color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {errors.blueTotalScore && touched.blueTotalScore ? (<Typography variant="subtitle1" color="error">{errors.blueTotalScore}</Typography>) : null}
                            </Grid>
                            <Grid item xl={12} md={12} sm={12} xs={12}>
                                <FormLabel component="legend">Round Winner</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="RoundWinner"
                                    id="RoundWinner"
                                    name="RoundWinner"
                                    size='small'
                                    value={values.RoundWinner}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <FormControlLabel value={athleteRedId} control={<Radio />} label={athleteRed} />
                                    <FormControlLabel value={athleteBlueId} control={<Radio />} label={athleteBlue} />
                                </RadioGroup>
                                {errors.RoundWinner && touched.RoundWinner ? (<Typography variant="subtitle1" color="error">{errors.RoundWinner}</Typography>) : null}
                            </Grid>
                            <Grid item sm={12} xl={8} md={8} lg={8} xs={12}>
                                <Button variant="contained" color="primary" type='submit'>
                                    End Round
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </BootstrapDialog>
        </Box>
    )
}

export default EndRoundModel