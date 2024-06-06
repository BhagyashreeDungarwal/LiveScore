import { Box, Typography, Grid, Card, CardContent, CardMedia, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Chip, Fab, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { GetMatchById } from '../Apis/Coordinator';
import vs from '../Images/vs.png'
import { ArrowBack, Groups3, LocationCity, SportsGymnasticsRounded } from '@mui/icons-material';

const ViewPage = () => {

  const { mid } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);
  const img_url = "http://localhost:5032/images/";

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const data = await GetMatchById(mid);
        setMatchDetails(data);
      } catch (error) {
        console.error('Error fetching match details:', error);
      }
    };
    fetchMatchDetails();
  }, [mid]);

  if (!matchDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <IconButton color='default'  onClick={"fbdsjf"}>
        <ArrowBack/> Match Details
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xl={6}>
            <Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch', padding: 2 }}>
              <Grid container spacing={2} justifyContent="space-evenly" alignItems="stretch">
                <Grid item xl={5}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <CardMedia
                      component="img"
                      image={matchDetails.athleteRedImg ? `${img_url}${matchDetails.athleteRedImg}` : "https://via.placeholder.com/150"}
                      alt={matchDetails.athleteRed}
                      sx={{ height: 250, width: 230, objectFit: 'cover' }}
                    />
                    <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                      <Typography variant="h6" component="div">
                        <Chip label={matchDetails.athleteRed} icon={<SportsGymnasticsRounded  />} sx={{fontSize:"1.25rem"}} color="error" variant="outlined" />
                        
                      </Typography>
                      <Typography variant='h6' component="div" sx={{display:"flex", justifyContent:'center', alignItems:"center"}} color="red">
                      <LocationCity/> {matchDetails.redState}
                      </Typography>
                      <Typography variant='h6' component="div" sx={{display:"flex", justifyContent:'center', alignItems:"center"}} color="red">
                        <Groups3 /> {matchDetails.coachRed}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              <Grid item xl={2} sx={{ display:'flex' , alignItems: 'center'}}>
                  <img src={vs} alt="v/s" style={{width:"5vw", height:"8vh"}} />
              </Grid>
                <Grid item xl={5}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  }}>
                    <CardMedia
                      component="img"
                      image={matchDetails.athleteBlueImg ? `${img_url}${matchDetails.athleteBlueImg}` : "https://via.placeholder.com/150"}
                      alt={matchDetails.athleteBlue}
                      sx={{ height: 250, width: 230, objectFit: 'cover' }}
                    />
                    <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                      <Typography variant="h6" component="div">
                        <Chip label={matchDetails.athleteBlue} icon={<SportsGymnasticsRounded  />} sx={{fontSize:"1.25rem"}} color="primary" variant="outlined" />
                        
                      </Typography>
                      <Typography variant='h6' component="div" sx={{display:"flex", justifyContent:'center', alignItems:"center"}} color="darkblue">
                      <LocationCity/> {matchDetails.bluestate}
                      </Typography>
                      <Typography variant='h6' component="div" sx={{display:"flex", justifyContent:'center', alignItems:"center"}} color="darkblue">
                        <Groups3 /> {matchDetails.coachBlue}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Card>
        </Grid>
            <Grid item xl={6} xs={12} sm={8} md={5}>
                      <TableContainer component={Paper} elevation={3}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>Tournament</TableCell>
                              <TableCell>{matchDetails.tournamentId}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Category</TableCell>
                              <TableCell>{matchDetails.categoryId}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Match Type</TableCell>
                              <TableCell>{matchDetails.matchType}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Match Date</TableCell>
                              <TableCell>{new Date(matchDetails.matchDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Coordinators</TableCell>
                              <TableCell>{matchDetails.matchCoordinator}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Referee 1</TableCell>
                              <TableCell>{matchDetails.referee1}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Referee 2</TableCell>
                              <TableCell>{matchDetails.referee2}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Referee 3</TableCell>
                              <TableCell>{matchDetails.referee3}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                </Grid>
      </Grid>
    </Box>
  );
};

export default ViewPage;
