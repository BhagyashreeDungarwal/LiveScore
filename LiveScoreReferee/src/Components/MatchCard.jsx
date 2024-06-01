import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

const img_url = "http://localhost:5032/images/";

const MatchCard = ({ matchDate, athleteRedImg, athleteBlueImg, athleteRedName, athleteBlueName }) => {
  const formattedDate = dayjs(matchDate).format(' MMM D, YYYY');
  return (
    <Card sx={{ maxWidth: 300, maxHeight: 200, borderRadius: "7px", mx: 1, color: "#F5F5DC", backgroundColor: "#141c33" }}>
      <CardContent sx={{ alignItems: "center" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="div" color="white">
            LiveScore
          </Typography>
          <Typography variant="body2" component="div" color="white">
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
            <Typography variant="body2" color="white">
              {athleteRedName}
            </Typography>
          </Box>
          <Typography variant="h4" component="div" color="white">
            V/S
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CardMedia
              component="img"
              image={`${img_url}${athleteBlueImg}`}
              alt="Athlete Blue"
              sx={{ height: '9vh', width: '9vh', clipPath: 'circle()', mb: 1 }}
            />
            <Typography variant="body2" color="white">
              {athleteBlueName}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MatchCard;
