import ProtectedRoute from '../../ProtectedRoute'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearMessage } from "../../Redux/CoordinatorRedux";
import {  Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetTodayMatch } from "../Apis/Common";
import MatchCard from '../Common/MatchCard';


const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "-25px", color: "black", zIndex: 1 }}
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

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [todayMatch, setTodayMatch] = useState([]);
  // const [assignMatch, setAssignMatch] = useState([]);
  const aid = localStorage.getItem("ID");

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const todayMatchData = await GetTodayMatch();
        // console.log("Fetched today matches:", todayMatchData);
        setTodayMatch(Array.isArray(todayMatchData) ? todayMatchData : []);
      } catch (error) {
        console.error("Something went wrong", error);
        setTodayMatch([]);
      }
    };

    fetchMatches();
  }, [aid]);

  const getSliderSettings = (matchesLength) => ({
    dots: true,
    infinite: matchesLength > 1,
    speed: 500,
    slidesToShow: matchesLength < 4 ? matchesLength : 4,
    slidesToScroll: 3,
    initialSlide: 1,
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

  return (
    <div>
      <Box sx={{ mb: 4, mt: 1 }}>
        <Typography variant="h5" sx={{ color: "Black", mb: 1 }}>Today&apos;s Matches</Typography>
        <Slider {...getSliderSettings(todayMatch.length)}>
          {todayMatch.map((data) => (
            <MatchCard
              key={data.mid}
              matchDate={data.matchDate}
              athleteRedName={data.athleteRed}
              athleteBlueName={data.athleteBlue}
              athleteRedImg={data.athleteRedImg}
              athleteBlueImg={data.athleteBlueImg}
            />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default ProtectedRoute(AdminDashboard, 'admin')
