import { Box, Grid, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { GetMatchByMatchGroup } from './Apis';
import axios from 'axios';


const img_url = "http://localhost:5032/images/";

const Scoring = () => {
  const [penalityRed, setPenalityRed] = useState(0);
  const [penalityBlue, setPenalityBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const [scoreBlue, setScoreBlue] = useState(0);
  const [connection, setConnection] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const { matchGroup } = useParams();
  const rid = localStorage.getItem("ID");
  const [matchData, setMatchData] = useState(null);

  const [values, setValues] = useState({
    RedPoints: 0,
    BluePoints: 0,
    RedPenalty: 0,
    BluePenalty: 0,
  })


  useEffect(() => {
    console.log(values);
    axios.post(`http://localhost:5032/api/RefereeScore/CreateRefScore/${rid}/${matchGroup}`, values, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => console.error('Sending score is failed : ', err));

  }, [values, axios]);

  useEffect(() => {
    const fetchMatchData = async () => {
      const { data } = await GetMatchByMatchGroup(matchGroup);
      setMatchData(data);
      console.log(matchData)
    };
    fetchMatchData();

  }, [matchGroup]);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl('http://localhost:5032/scoreHub')
      .configureLogging(LogLevel.Information)
      .build();

    connect.start()
      .then(() => {
        console.log('Connected to SignalR');
        return connect.invoke('JoinGroup', matchGroup.toString());
      })
      .then(() => {
        console.log(`Joined Matchgroup ${matchGroup}`);
      })
      .catch(err => console.error('JoinGroup invocation failed: ', err));

    connect.on('TimerUpdate', (timeLeft) => {
      setTimeLeft(timeLeft);
    });

    connect.on('TimerEnded', () => {
      setTimeLeft(0);
    });
    setConnection(connect);

    return () => {
      if (connection) {
        connection.invoke('LeaveGroup', matchGroup.toString())
          .then(() => connection.stop())
          .catch(err => console.error('LeaveGroup invocation failed: ', err));
      }
    };
  }, [matchGroup]);

  const handleRedScore = (increment) => {
    setScoreRed((prevValue) => prevValue + increment);
    setValues({ RedPoints: increment, BluePoints: 0, RedPenalty: 0, BluePenalty: 0 });
  };

  const handleBlueScore = (increment) => {
    setScoreBlue((prevValue) => prevValue + increment);
    setValues({ BluePoints: increment, RedPoints: 0, BluePenalty: 0, RedPenalty: 0 });
  };

  const handleRedPenality = () => {
    if (penalityRed < 5) {
      setPenalityRed(prev => {
        const newCount = prev + 1;
        setValues({ RedPenalty: 1, BluePoints: 0, RedPoints: 0, BluePenalty: 0 });
        if (newCount === 5) {
          alert('Athlete Red Disqualified!');
        }
        return newCount;
      });
    }
  };

  const handleBluePenality = () => {
    if (penalityBlue < 5) {
      setPenalityBlue(prev => {
        const newCount = prev + 1;
        setValues({ BluePenalty: 1, RedPenalty: 0, BluePoints: 0, RedPoints: 0 })
        if (newCount === 5) {
          alert('Athlete Blue Disqualified!');
        }
        return newCount;
      });
    }
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ padding: "2%", color: "white" }}>
        <Grid item xs={12} md={12} lg={12} sm={12}>
          <Grid container spacing={2}>
            <Grid item xs={4} md={4} lg={4} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }} fullWidth >

                <img src={matchData ? `${img_url}${matchData.athleteRedImg}` : "https://via.placeholder.com/150"} style={{ height: "15vh", width: "7vw", borderRadius: "10px" }} />
                <Typography variant="h1" style={{ color: "#e53935", fontSize: "20vh" }}>{scoreRed}</Typography>
              </Box>

            </Grid>
            <Grid item xs={4} md={4} lg={4} sm={4}>
              <Box sx={{
                backgroundColor: "#141c33",
                height: "100%", // Changed to 100vh to fill the viewport height
                borderRadius: "10%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Typography variant="h1" sx={{ color: "#bdbdbd", textAlign: 'center', fontSize: "20vh" }}>
                  {timeLeft}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} md={4} lg={4} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }} fullWidth >

                <Typography variant="h1" sx={{ color: "#1e88e5", textAlign: "center", fontSize: "20vh" }}>{scoreBlue}</Typography>
                <img src={matchData ? `${img_url}${matchData.athleteBlueImg}` : "https://via.placeholder.com/150"} style={{ height: "15vh", width: "7vw", borderRadius: "10px" }} />
              </Box>

            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} md={4} lg={4} sm={4}>
          <Typography variant="h4" style={{ color: "#e53935", fontSize: "5vh", textAlign: "center" }}>{matchData ? matchData.athleteRed : ""}</Typography>
        </Grid>
        <Grid item xs={4} md={4} lg={4} sm={4}>
        </Grid>
        <Grid item xs={4} md={4} lg={4} sm={4}>
          <Typography variant="h4" style={{ color: "#1e88e5", fontSize: "5vh", textAlign: "center" }}>{matchData ? matchData.athleteBlue : ""}</Typography>
        </Grid>
        <Grid item xs={4} md={4} lg={4} sm={4}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Button variant="contained" sx={{ backgroundColor: "#e53935", height: "20vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#e53935" } }} onClick={() => handleRedScore(2)} fullWidth>
                +2
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Button variant="contained" sx={{ backgroundColor: "#e53935", height: "20vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#e53935" } }} onClick={() => handleRedScore(1)} fullWidth>
                +1
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Button variant="contained" sx={{ backgroundColor: "#e53935", height: "20vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#e53935" } }} onClick={() => handleRedScore(3)} fullWidth>
                +3
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Button variant="contained" sx={{ backgroundColor: "#e53935", height: "20vh", borderRadius: "30px", fontSize: "5vh", fontWeight: "bold", '&:hover': { backgroundColor: "#e53935" } }} onClick={handleRedPenality} disabled={penalityRed === 5} fullWidth>
                penality
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} md={4} lg={4} sm={4}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2 }}>
                  {[...Array(5)].map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        backgroundColor: index < penalityRed ? '#e53935' : '#141c33',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2 }}>
                  {[...Array(5)].map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        backgroundColor: index < penalityBlue ? '#1e88e5' : '#141c33',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} md={4} lg={4} sm={4}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "20vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={() => handleBlueScore(2)} fullWidth>
                +2
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "20vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={() => handleBlueScore(1)} fullWidth>
                +1
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "20vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={() => handleBlueScore(3)} fullWidth>
                +3
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "20vh", borderRadius: "30px", fontSize: "5vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={handleBluePenality} disabled={penalityBlue === 5} fullWidth>
                penality
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Scoring;
