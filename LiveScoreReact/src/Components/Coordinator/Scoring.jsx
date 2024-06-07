import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Paper, Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Tooltip } from '@mui/material';
import { PauseCircleFilledRounded, PlayCircleFilledRounded } from '@mui/icons-material';

const Scoring = () => {
    const [connection, setConnection] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const { matchGroup } = useParams();
    const cid = localStorage.getItem("ID");
    const [penalityRed, setPenalityRed] = useState(0)
    const [penalityBlue, setPenalityBlue] = useState(0)
    const [scoreRed, setScoreRed] = useState(0)
    const [scoreBlue, setScoreBlue] = useState(0)


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

        connect.on('StartCountdown', (duration) => {
            console.log('StartCountdown received', duration);
            setIsRunning(true);
            setTimeLeft(duration);
        });

        connect.on('StopCountdown', () => {
            console.log('StopCountdown received');
            setIsRunning(false);
        });

        connect.on('TimerUpdate', (timeLeft) => {
            console.log('TimerUpdate received', timeLeft);
            setTimeLeft(timeLeft);
        });

        connect.on('TimerEnded', () => {
            console.log('TimerEnded received');
            setIsRunning(false);
            setTimeLeft(0);
        });

        connect.on('PauseCountdown', () => {
            console.log('PauseCountdown received');
            setIsRunning(false);
        });

        connect.on('ResumeCountdown', () => {
            console.log('ResumeCountdown received');
            setIsRunning(true);
        });

        setConnection(connect);

        return () => {
            if (connection) {
                connection.invoke('LeaveGroup', matchGroup.toString())
                    .then(() => connection.stop())
                    .catch(err => console.error('Failed to leave group or stop connection: ', err));
            }
        };
    }, [matchGroup]);

    const handleStart = () => {
        if (connection) {
            axios.post(`http://localhost:5032/api/Scores/start/${parseInt(matchGroup)}/${cid}/${120}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .catch(err => console.error('StartCountdown request failed: ', err));
        }
    };

    const handleStop = () => {
        if (connection) {
            axios.post(`http://localhost:5032/api/Scores/stop/${parseInt(matchGroup)}/${cid}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .catch(err => console.error('StopCountdown request failed: ', err));
        }
    };

    const handlePause = () => {
        if (connection) {
            axios.post(`http://localhost:5032/api/Scores/pause/${parseInt(matchGroup)}/${cid}`, {}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .catch(err => console.error('PauseCountdown request failed: ', err));
        }
    };

    const handleResume = () => {
        if (connection) {
            axios.post(`http://localhost:5032/api/Scores/resume/${parseInt(matchGroup)}/${cid}`, {}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .catch(err => console.error('ResumeCountdown request failed: ', err));
        }
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
            <Grid container spacing={2} justifyContent="center">
                <Grid item sm={12} xl={4} md={4} lg={4} xs={12}>
                    <Paper elevation={4} sx={{ margin: '0.5%', height: "100%" }}>
                        <Typography variant="h2" color="initial" sx={{ textAlign: "center", paddingTop: "5%" }}>{timeLeft} s</Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', margin: "1% 1% 1% -2%" }}>
                            <Tooltip title="Start">
                                <IconButton variant='contained' color='success' onClick={handleStart} disabled={isRunning}  ><PlayCircleFilledRounded sx={{ height: "8vh", width: "8vw" }} /></IconButton>
                            </Tooltip>
                            <Tooltip title="Pause">
                                <IconButton variant='contained' color='error' onClick={handlePause} disabled={!isRunning}><PauseCircleFilledRounded sx={{ height: "8vh", width: "8vw" }} /></IconButton>
                            </Tooltip>
                            <Tooltip title="Resume">
                                <IconButton variant='contained' color='warning' onClick={handleResume} disabled={isRunning || timeLeft === 0}><PlayCircleFilledRounded sx={{ height: "8vh", width: "8vw" }} /></IconButton>
                            </Tooltip>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item sm={12} xl={8} md={8} lg={8} xs={12}>
                    <Paper elevation={4} sx={{ margin: '0.5%', padding: "2%", height: "100%" }}>
                        <TableContainer sx={{ width: "100%", padding: "1% 1% 0% 0%" }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>Referees</TableCell>
                                        <TableCell align="center">Red Score</TableCell>
                                        <TableCell align="center">Blue Score</TableCell>
                                        <TableCell align="center">Red Penalty</TableCell>
                                        <TableCell align="center">Blue Penalty</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='center'>referee1</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center'>referee1</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center'>referee1</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: "bold" }}>0</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid item sm={4} xl={4} md={4} lg={4} sx={4}>
                    <Box fullWidth >
                        <Typography variant="h1" style={{ color: "#e53935", textAlign: "center", fontSize: "15vh" }}>{scoreRed}</Typography>
                    </Box>
                </Grid>
                <Grid item sm={4} xl={4} md={4} lg={4} sx={4}></Grid>
                <Grid item sm={4} xl={4} md={4} lg={4} sx={4}>
                    <Typography variant="h1" sx={{ color: "#1e88e5", textAlign: "center", fontSize: "15vh" }}>{scoreBlue}</Typography>

                </Grid>
                <Grid item xs={4} md={4} lg={4} sm={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} lg={6} sm={6}>
                            <Button variant="contained" sx={{ backgroundColor: "#e53935", height: "16vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#e53935" } }} onClick={() => handleRedScore(2)} fullWidth>
                                +2
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} sm={6}>
                            <Button variant="contained" sx={{ backgroundColor: "#e53935", height: "16vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#e53935" } }} onClick={() => handleRedScore(1)} fullWidth>
                                +1
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} sm={6}>
                            <Button variant="contained" sx={{ backgroundColor: "#e53935", height: "16vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#e53935" } }} onClick={() => handleRedScore(3)} fullWidth>
                                +3
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} sm={6}>
                            <Button variant="contained" sx={{ backgroundColor: "#e53935", height: "16vh", borderRadius: "30px", fontSize: "5vh", fontWeight: "bold", '&:hover': { backgroundColor: "#e53935" } }} onClick={handleRedPenality} disabled={penalityRed === 5} fullWidth>
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
                                                width: 35,
                                                height: 35,
                                                borderRadius: '50%',
                                                backgroundColor: index < penalityRed ? '#e53935' : 'grey',
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
                                                width: 35,
                                                height: 35,
                                                borderRadius: '50%',
                                                backgroundColor: index < penalityBlue ? '#1e88e5' : 'grey',
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
                            <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "16vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={() => handleBlueScore(1)} fullWidth>
                                +1
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} sm={6}>
                            <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "16vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={() => handleBlueScore(2)} fullWidth>
                                +2
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} sm={6}>
                            <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "16vh", borderRadius: "30px", fontSize: "5vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={handleBluePenality} disabled={penalityBlue === 5} fullWidth>
                                penality
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} sm={6}>
                            <Button variant="contained" sx={{ backgroundColor: "#1e88e5", height: "16vh", borderRadius: "30px", fontSize: "10vh", fontWeight: "bold", '&:hover': { backgroundColor: "#1e88e5" } }} onClick={() => handleBlueScore(3)} fullWidth>
                                +3
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );

}

export default Scoring;
