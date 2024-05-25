import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Score from './Score'
import MatchCard from './MatchCard'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, Button, Divider } from '@mui/material'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowDownward } from '@mui/icons-material'
import { GetAssignMatch } from './Apis'

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "-25px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "-25px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};
const CustomPrevArrowAccordion = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "-15px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const CustomNextArrowAccordion = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "-15px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const dummyMatches = [
  {
    matchDate: '2024-05-24T12:30:00Z',
    athleteRedImg: 'red-athlete1.jpg',
    athleteBlueImg: 'blue-athlete1.jpg',
    athleteRedName: 'John Doe',
    athleteBlueName: 'Jane Smith',
  },
  {
    matchDate: '2024-05-24T14:00:00Z',
    athleteRedImg: 'red-athlete2.jpg',
    athleteBlueImg: 'blue-athlete2.jpg',
    athleteRedName: 'Alice Johnson',
    athleteBlueName: 'Bob Brown',
  },
  {
    matchDate: '2024-05-24T15:30:00Z',
    athleteRedImg: 'red-athlete3.jpg',
    athleteBlueImg: 'blue-athlete3.jpg',
    athleteRedName: 'Chris Evans',
    athleteBlueName: 'ScarLett JohnSon',
  },
  {
    matchDate: '2024-05-24T17:00:00Z',
    athleteRedImg: 'red-athlete4.jpg',
    athleteBlueImg: 'blue-athlete4.jpg',
    athleteRedName: 'Bruce Wayne',
    athleteBlueName: 'Clark Kent',
  },
  {
    matchDate: '2024-05-24T18:30:00Z',
    athleteRedImg: 'red-athlete5.jpg',
    athleteBlueImg: 'blue-athlete5.jpg',
    athleteRedName: 'Diana Prince',
    athleteBlueName: 'Barry Allen',
  },
  {
    matchDate: '2024-05-24T20:00:00Z',
    athleteRedImg: 'red-athlete6.jpg',
    athleteBlueImg: 'blue-athlete6.jpg',
    athleteRedName: 'Peter Parker',
    athleteBlueName: 'Tony Stark',
  },
  {
    matchDate: '2024-05-24T21:30:00Z',
    athleteRedImg: 'red-athlete7.jpg',
    athleteBlueImg: 'blue-athlete7.jpg',
    athleteRedName: 'Natasha RomanOff',
    athleteBlueName: 'Steve Rogers',
  },
  {
    matchDate: '2024-05-24T23:00:00Z',
    athleteRedImg: 'red-athlete8.jpg',
    athleteBlueImg: 'blue-athlete8.jpg',
    athleteRedName: 'Bruce Banner',
    athleteBlueName: 'Stephen Strange',
  },
  {
    matchDate: '2024-05-25T00:30:00Z',
    athleteRedImg: 'red-athlete9.jpg',
    athleteBlueImg: 'blue-athlete9.jpg',
    athleteRedName: 'Wanda maxiMff',
    athleteBlueName: 'Vision',
  },
  {
    matchDate: '2024-05-25T02:00:00Z',
    athleteRedImg: 'red-athlete10.jpg',
    athleteBlueImg: 'blue-athlete10.jpg',
    athleteRedName: 'Sam Wilson',
    athleteBlueName: 'Bucky Barnes',
  },
];

const RDashboard = () => {
  const id = localStorage.getItem("ID")

  const getSliderSettings = (matchesLength) => ({
    dots: false,
    infinite: matchesLength > 1,
    speed: 500,
    slidesToShow: matchesLength < 4 ? matchesLength : 4,
    slidesToScroll: 1,
    initialSlide: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: matchesLength < 2 ? matchesLength : 2,
          slidesToScroll: 1,
          infinite: matchesLength > 1,
          dots: true,
          initialSlide: 1,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: matchesLength < 2 ? matchesLength : 2,
          slidesToScroll: 1,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
        },
      },
    ],
  });

  const settingsAccordion = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrowAccordion />,
    nextArrow: <CustomNextArrowAccordion />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          prevArrow: <CustomPrevArrowAccordion />,
          nextArrow: <CustomNextArrowAccordion />,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          prevArrow: <CustomPrevArrowAccordion />,
          nextArrow: <CustomNextArrowAccordion />,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
        },
      },
    ],
  };

  const [todayMatch, setTodayMatch] = useState([])
  const TodaysMatches = async () => {
    try {
      const data = await GetAssignMatch();
      setTodayMatch(data)
      console.log("Fetched data:", data);
    } catch (error) {
      console.log("Something went wrong", error);
    }

  };

  useEffect(() => {
    TodaysMatches()
  }, [])


  return (
    <Box>
      <Box sx={{ display: "block", boxShadow: 3, marginBottom: 3 }}>
        <Header />
        {/* <hr style={{ color: "grey" }} /> */}
        {/* <Divider sx={{ color: "grey" }} /> */}
      </Box>
      <Box sx={{ display: "block", padding: "0% 0% 0% 2% " }}>
        <Grid container spacing={1} >
          <Grid item xs={12} md={9} sx={{ pr: "2%" }} >
            <Box sx={{ mb: 4, mt: 1 }}>
              <Accordion sx={{ backgroundColor: "#060c1f", color: "grey" }} elevation={4}>
                <AccordionSummary
                  expandIcon={<ArrowDownward sx={{ color: "whitesmoke" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography variant="h5" sx={{ color: "whitesmoke" }}>Assign Match</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 4, mt: 1 }}>
                    <Slider {...settingsAccordion}>
                      {dummyMatches.map((match, index) => (
                        <MatchCard
                          key={index}
                          matchDate={match.matchDate}
                          athleteRedImg={match.athleteRedImg}
                          athleteBlueImg={match.athleteBlueImg}
                          athleteRedName={match.athleteRedName}
                          athleteBlueName={match.athleteBlueName}
                        />
                      ))}
                    </Slider>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box sx={{ mb: 4, mt: 1 }}>
              <Typography variant="h5" sx={{ color: "whitesmoke", mb: 1 }}>Today's Matches</Typography>
              <Slider {...getSliderSettings(todayMatch.length)}>
                {todayMatch?.map((data) => (
                  <MatchCard matchDate={data.matchDate} athleteRedName={data.athleteRed} athleteBlueName={data.athleteBlue} athleteRedImg={data.athleteRedImg} athleteBlueImg={data.athleteBlueImg} />
                ))
                }
              </Slider>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Score />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "block", mt: "1%" }}>
        <hr style={{ color: "grey" }} />
        <Footer />
      </Box>
    </Box>
  )
}

export default RDashboard