import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import GenerateOtp from './GenerateOtp';

const img_url = "http://localhost:5032/images/";

const MatchAssign = ({ matchDate, athleteRedImg, athleteBlueImg, athleteRedName, athleteBlueName, matchGroup,mid }) => {
  const formattedDate = dayjs(matchDate).format('MMM D, YYYY');
  return (
    <Card sx={{ maxWidth: 300, maxHeight: 200, borderRadius: "7px", mx: 1, color: "black", backgroundColor: "#eceff1" }}>
      <CardContent sx={{ alignItems: "center" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="div" color="black">
            LiveScore
          </Typography>
          <Typography variant="body2" component="div" color="black">
            {formattedDate}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <CardMedia
              component="img"
              image={`${img_url}${athleteRedImg}`}
              alt="Athlete Red"
              sx={{ height: '9vh', width: '9vh', clipPath: 'circle()', mb: 1 }}
            />
            <Typography variant="body2" color="black">
              {athleteRedName}
            </Typography>
          </Box>
          <Typography variant="h4" component="div" color="black">
            V/S
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CardMedia
              component="img"
              image={`${img_url}${athleteBlueImg}`}
              alt="Athlete Blue"
              sx={{ height: '9vh', width: '9vh', clipPath: 'circle()', mb: 1 }}
            />
            <Typography variant="body2" color="black">
              {athleteBlueName}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-around" alignItems="center" mb={1}>
          <Button variant="contained" size="small">
            View
          </Button>
          <Box>
            <GenerateOtp matchGroup={matchGroup} mid={mid} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchAssign;
