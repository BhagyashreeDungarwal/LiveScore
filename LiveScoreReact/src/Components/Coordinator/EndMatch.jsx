import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { GetMatchById } from '../Apis/Coordinator';
import { useFormik } from 'formik';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const EndMatch = () => {
    const theme = useTheme()
    const { matchGroup, mid } = useParams()

    const handleClose = () => {
        console.log("close")
    }

    const getMatchById = async () => {
        const { data } = await GetMatchById(mid)
        console.log(data)
        data && setValues(data)
    }

    useEffect(() => {
        getMatchById()
    }, [])

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik({})





    return (
        <Box>
            <BootstrapDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    End Round
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
                </DialogContent>
            </BootstrapDialog>
        </Box>
    )
}

export default EndMatch