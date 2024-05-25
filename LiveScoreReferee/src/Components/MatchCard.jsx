import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

const img_url = "http://localhost:5032/images/";

const MatchCard = ({ matchDate, athleteRedImg, athleteBlueImg, athleteRedName, athleteBlueName }) => {
  const formattedDate = dayjs(matchDate).format(' MMM D, YYYY');
  return (
    <Card sx={{ maxWidth: 300, maxHeight: 170, borderRadius: "7px", mx: 1, color: "#F5F5DC", backgroundColor: "#141c33" }}>
      <CardContent sx={{ alignItems: "center" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="div" color="#F5F5DC">
            LiveScore
          </Typography>
          <Typography variant="body2" component="div" color="#F5F5DC">
            {formattedDate}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <CardMedia
            component="img"
            image={`${img_url}${athleteRedImg}`}
            alt="Live"
            sx={{ height: '8vh', clipPath: 'circle()' }}
          />
          <Typography variant="h4" component="div" color="#F5F5DC">
            V/S
          </Typography>
          <CardMedia
            component="img"
            image={`${img_url}${athleteBlueImg}`}
            alt="Live"
            sx={{ height: '8vh', clipPath: 'circle()' }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2} mt={1}>
          <Typography variant="body2" color="#F5F5DC">
            {athleteRedName}
          </Typography>
          <Typography variant="body2" color="#F5F5DC">
            {athleteBlueName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MatchCard;
