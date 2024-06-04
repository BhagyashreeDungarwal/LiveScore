import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Scoring = () => {
    const [connection, setConnection] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const { matchGroup } = useParams();
    const cid = localStorage.getItem("ID")
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

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }
    }, [isRunning, timeLeft]);

    const handleStart = () => {
        if (connection) {
            console.log(parseInt(matchGroup))
            axios.post(`http://localhost:5032/api/Timer/start/${parseInt(matchGroup)}/${cid}/${120}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .catch(err => console.error('StartCountdown request failed: ', err));
        }
    };

    const handleStop = () => {
        if (connection) {
            axios.post(`http://localhost:5032/api/Timer/stop/${parseInt(matchGroup)}/${cid}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .catch(err => console.error('StopCountdown request failed: ', err));
        }
    };

    const handleResume = () => {
        if (connection) {
            axios.post(`http://localhost:5032/api/Timer/resume/${parseInt(matchGroup)}/${cid}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .catch(err => console.error('ResumeCountdown request failed: ', err));
        }
    };

    return (
        <div>
            <h1>Countdown Timer: {timeLeft}s</h1>
            <button onClick={handleStart} disabled={isRunning}>Start</button>
            <button onClick={handleStop} disabled={!isRunning}>Stop</button>
            <button onClick={handleResume} disabled={isRunning || timeLeft === 0}>Continue</button>
        </div>
    );
}

export default Scoring;
