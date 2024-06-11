import { Box, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { GetMatchById, GetTotalScore } from '../Apis/Coordinator';
import { useFormik } from 'formik';
import { endMatch } from '../Validation/Coordinator';
import { Close, SportsGymnasticsRounded, SportsMartialArtsRounded } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const EndRoundModel = ({ mid, rounds, redScore, blueScore, athleteBlue, athleteRed, athleteBlueId, athleteRedId }) => {
    const theme = useTheme()
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState(null)

    const initial = {
        RedTotalScore: redScore,
        BlueTotalScore: blueScore,
        RoundWinner: ""
    }

    useEffect(() => {
        const getTotalScore = async () => {
            const data = await GetTotalScore();
            data && setScore(data)
            console.log(score)
        }

        getTotalScore()
    }, [])


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initial,
        validationSchema: endMatch,
        onSubmit: (values) => {
            console.log(values)
        }

    })

    const handleClickOpen = () => {
        // console.log("open")
        setOpen(true);
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
                                    id="RedTotalScore"
                                    name="RedTotalScore"
                                    label="Red Total Score"
                                    value={values.RedTotalScore}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >
                                                <SportsGymnasticsRounded color="error" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {errors.RedTotalScore && touched.RedTotalScore ? (<Typography variant="subtitle1" color="error">{errors.RedTotalScore}</Typography>) : null}
                            </Grid>
                            <Grid item xl={6} md={6} sm={6} xs={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    id="BlueTotalScore"
                                    name="BlueTotalScore"
                                    label="Red Total Score"
                                    value={values.BlueTotalScore}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }} >
                                                <SportsMartialArtsRounded color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {errors.BlueTotalScore && touched.BlueTotalScore ? (<Typography variant="subtitle1" color="error">{errors.BlueTotalScore}</Typography>) : null}
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
                        </Grid>
                    </form>
                </DialogContent>
            </BootstrapDialog>
        </Box>
    )
}

export default EndRoundModel