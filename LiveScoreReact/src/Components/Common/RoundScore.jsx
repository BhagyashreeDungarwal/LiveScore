import {  Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, styled } from '@mui/material';
import React, { useMemo } from 'react'
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NoData from "./../Images/NoData.jpg"
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { GetScoresandRounds } from '../Apis/Common';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearMessage } from '../../Redux/CoordinatorRedux';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Change density' } }}
      />
      <Box sx={{ flexGrow: 1 }} />
    </GridToolbarContainer>
  );
}

function CustomNoRowsOverlay() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    }}>
      <img
        style={{ flexShrink: 0, marginTop: "15%" }}
        src={NoData}
        alt="No Rows"
        width="240"
        height="240"

      />
      <Box sx={{ mt: 0 }}>No Match Added</Box>
    </div>
  );
}

const RoundScore = () => {

  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true)
  const [match, setMatch] = useState()
  const { mid } = useParams()
    const dispatch = useDispatch()
  const { data, error } = useSelector(state => state.coordinator)

    const getScoresandRounds = async () => {
    setLoading(true)
    try {
      const { data } = await GetScoresandRounds(mid)
      data && setMatch(data)
    }
    catch (e) {
      console.log("Something Went Wrong.", e);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getScoresandRounds()
    if (data) {
      toast.success(data.msg)
      dispatch((clearMessage()))
    }
    if (error) {
      toast.error(error.msg)
      dispatch((clearMessage()))
    }
  }, [data, error])

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  
  const handleClose = () => {
        navigate("/coordinator/match")
    };

     const columns = useMemo(() => [
    
    { field: "matchGroup", headerName: "RoundWinner", width: 30, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "matchGroup", headerName: "MatchId", width: 30, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "nextMatchId", headerName: "AthleteRed", width: 60, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "flag", headerName: "AthleteBlue", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "athleteRed", headerName: "RedPoints", width: 110, headerClassName: "header", headerAlign: "center", align: "center", },
    { field: "athleteBlue", headerName: "BluePoints", width: 110, headerClassName: "header", headerAlign: "center", align: "center", },
    { field: "tournament", headerName: "RedPanelty", width: 145, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "matchType", headerName: "BluePenalty", width: 130, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "matchDate", headerName: "ScoreTime", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "category", headerName: "RedTotalScore", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "category", headerName: "BlueTotalScore", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    

  ], [])
  return (
     <div>
            <React.Fragment>
                
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Rounds
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
                        <div>
                          <Accordion
                            expanded={expanded}
                            onChange={handleExpansion}
                            slots={{ transition: 'Fade' }}
                            slotProps={{ transition: { timeout: 400 } }}
                            sx={{
                              '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                              '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography>Round</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {
                                loading ? <CircularProgress /> :
                                  <Stack style={{
                                    marginTop: "1%",
                                    display: "grid",
                                    height: "78vh",
                                  }}>
                                    {match && match.length > 0 ? (
                                      <DataGrid
                                        rows={match}
                                        columns={columns}
                                        getRowId={(row) => row.sid}
                                        rowHeight={54}
                                        rowSelection="true"
                                        rowSpacingType='margin'
                                        slots={{ toolbar: CustomToolbar }}
                                        scrollbarSize={1}
                                        columnHeaderHeight={37}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                      />) : (
                                      <DataGrid
                                        autoHeight
                                        rows={[]}
                                        columns={columns}
                                        getRowId={(row) => row.id}
                                        rowHeight={42}
                                        rowSelection="true"
                                        rowSpacingType='margin'
                                        slots={{ toolbar: CustomToolbar, noRowsOverlay: CustomNoRowsOverlay }}
                                        scrollbarSize={1}
                                        columnHeaderHeight={37}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        />
                                      )
                                      }
                                    </Stack>
                                }
                            </AccordionDetails>
                          </Accordion>
                          
                        </div>
                    </DialogContent>
                    
                </BootstrapDialog>
            </React.Fragment>
        </div>
  )
}

export default RoundScore