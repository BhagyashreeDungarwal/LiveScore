import { Box, Grid, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'


const Scoring = () => {

  const [penalityRed, setPenalityRed] = useState(0)
  const [penalityBlue, setPenalityBLue] = useState(0)
  const [scoreRed, setScoreRed] = useState(0)
  const [scoreBlue, setScoreBlue] = useState(0)
  const [time, setTime] = useState(120); // 2 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);


  const handleStart = () => {
    if (!isRunning && time > 0) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(120);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleRedScore = (increment) => {
    setScoreRed((prevValue) => prevValue + increment);
  };
  const handleBlueScore = (increment) => {
    setScoreBlue((prevValue) => prevValue + increment);
  };

  const handleRedPenality = () => {
    if (penalityRed < 5) {
      setPenalityRed(prev => {
        const newCount = prev + 1;
        handleBlueScore(1)
        if (newCount === 5) {
          alert('Athlete Red Disqualified!');
        }
        return newCount;
      });
    }
  };

  const handleBluePenality = () => {
    if (penalityBlue < 5) {
      setPenalityBLue(prev => {
        const newCount = prev + 1;
        handleRedScore(1)
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
              <Button variant="contained" size='large' onClick={handleStart} sx={{borderRadius:"20px",backgroundColor:"#5c6bc0", margin:'1%','&:hover': { backgroundColor: "#3949ab" }}} fullWidth>
                Start
              </Button>
            </Grid>
            <Grid item xs={4} md={4} lg={4} sm={4}>
              <Button variant="contained" size='large' onClick={handleReset}  sx={{borderRadius:"20px",backgroundColor:"#5c6bc0", margin:'1%'}} fullWidth>
                Reset
              </Button>
            </Grid>
            <Grid item xs={4} md={4} lg={4} sm={4}>
              <Button variant="contained" size='large' onClick={handleStop}  sx={{borderRadius:"20px",backgroundColor:"#5c6bc0", margin:'1%'}} fullWidth>
                Stop
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12} sm={12}>
          <Grid container spacing={2}>
            <Grid item xs={4} md={4} lg={4} sm={4}>
              <Box fullWidth >
                <Typography variant="h1" style={{ color: "#e53935", textAlign: "center", fontSize: "25vh" }}>{scoreRed}</Typography>
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
                  {formatTime(time)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} md={4} lg={4} sm={4}>
              <Typography variant="h1" sx={{ color: "#1e88e5", textAlign: "center", fontSize: "25vh" }}>{scoreBlue}</Typography>
            </Grid>
          </Grid>
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
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, margin: "0% 0% 0% 12%" }}>
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
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, margin: "0% 0% 0% 12%" }}>
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
              <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "20vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={() => handleBlueScore(1)} fullWidth>
                +1
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "20vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={() => handleBlueScore(2)} fullWidth>
                +2
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "20vh", borderRadius: "30px", fontSize: "5vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={handleBluePenality} disabled={penalityBlue === 5} fullWidth>
                penality
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "20vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={() => handleBlueScore(3)} fullWidth>
                +3
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Scoring