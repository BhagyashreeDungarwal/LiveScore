import { AccessTimeFilledRounded, Category, Close, DateRangeRounded, DonutLargeRounded, EmojiEmotionsRounded, EmojiEventsRounded, ModeStandbyRounded, RestartAltRounded, SportsGymnasticsRounded, SportsMartialArtsRounded, Timer, TimerRounded } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Slide, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MatchValidate } from "../Validation/Coordinator";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { GetAthleteByCatApi } from "../../Redux/Action/CoordinatorAction";

// for Slider
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <DonutLargeRounded />,
    2: <GroupAddIcon />,
    3: <AccessTimeFilledRounded />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Select Data', 'Select Athlete', 'Scheduling'];




const AddMatch = () => {
  const theme = useTheme()
  const { categorydata, tounamentdata, getAthleteByCat } = useSelector((state => state.admin))
  const dispatch = useDispatch()
  // const { active, completed, className } = props;

  //   for dialog box start
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log('last step');
      alert('Form submitted successfully!'); // You can replace this with your form submission logic
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };



  const initial = {
    MatchType: "",
    NumberOfRound: "",
    MatchDate: "",
    Matchtime: "",
    AthleteBlue: "",
    AthleteRed: "",
    CategoryId: "",
    TournamentId: "",
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initial,
    validationSchema: MatchValidate,
    onSubmit: (values) => {
      console.log(values)
      alert('Form submitted successfully!');
      handleClose();
    }
  })

  // for get athlete by category
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setFieldValue("CategoryId", categoryId);  // Update Formik value
    dispatch(GetAthleteByCatApi(categoryId));  // Dispatch action to get athletes
    event.preventDefault();
  };


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Match
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>Add Match</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12} sm={12} xl={12}>
                {activeStep === 0 && (
                  <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12} xl={12}>
                      <FormControl variant='filled' fullWidth>
                        <InputLabel color='secondary'>Tournament</InputLabel>
                        <Select
                          id="TournamentId"
                          name="TournamentId"
                          label="Tournament"
                          fullWidth
                          color="secondary"
                          value={values.TournamentId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          input={<OutlinedInput
                            startAdornment={<InputAdornment position="start">
                              <EmojiEventsRounded />
                            </InputAdornment>}
                          />}
                        >
                          {tounamentdata?.map((data) => (
                            <MenuItem key={data.tId} value={data.tId}>{data.tournamentName}</MenuItem>
                          ))
                          }
                        </Select>
                      </FormControl>
                      {errors.TournamentId && touched.TournamentId ? (<Typography variant="subtitle1" color="error">{errors.TournamentId}</Typography>) : null}
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <FormControl variant='filled' fullWidth>
                        <InputLabel color='secondary'>Category</InputLabel>
                        <Select
                          id="CategoryId"
                          name="CategoryId"
                          label="Category"
                          color="secondary"
                          variant="filled"
                          value={values.CategoryId}
                          onChange={handleCategoryChange}
                          onBlur={handleBlur}
                          input={<OutlinedInput
                            startAdornment={<InputAdornment position="start">
                              <Category />
                            </InputAdornment>}
                          />}
                        >
                          {categorydata?.map((data) => (
                            <MenuItem key={data.id} value={data.id}>{data.categoryName}</MenuItem>
                          ))
                          }
                        </Select>
                      </FormControl>
                      {errors.CategoryId && touched.CategoryId ? (<Typography variant="subtitle1" color="error">{errors.CategoryId}</Typography>) : null}
                    </Grid>
                  </Grid>
                )}
                {activeStep === 1 && (
                  <Grid item xs={12} md={12} lg={12} sm={12} >
                    <Grid container spacing={2}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <FormControl variant='filled' fullWidth>
                          <InputLabel color='secondary'>Athlete Red</InputLabel>
                          <Select
                            id="AthleteRed"
                            name="AthleteRed"
                            label="Athlete Red"
                            fullWidth
                            variant="standard"
                            value={values.AthleteRed}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            input={<OutlinedInput
                              startAdornment={<InputAdornment position="start">
                                <SportsGymnasticsRounded color="error" />
                              </InputAdornment>}
                            />}
                          >
                            {getAthleteByCat?.map((data) => (
                              <MenuItem key={data.id} value={data.id}>{data.athleteName}</MenuItem>
                            ))
                            }
                          </Select>
                        </FormControl>
                        {errors.AthleteRed && touched.AthleteRed ? (<Typography variant="subtitle1" color="error">{errors.AthleteRed}</Typography>) : null}
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <FormControl variant='filled' fullWidth>
                          <InputLabel color='secondary'>Athlete Blue</InputLabel>
                          <Select
                            variant="standard"
                            id="AthleteBlue"
                            name="AthleteBlue"
                            label="Athlete Blue"
                            fullWidth
                            value={values.AthleteBlue}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            input={<OutlinedInput
                              startAdornment={<InputAdornment position="start">
                                <SportsMartialArtsRounded color="primary" />
                              </InputAdornment>}
                            />}
                          >
                             <MenuItem>No Athlete Added</MenuItem>
                            {getAthleteByCat?.map((data) => (
                              <MenuItem key={data.id} value={data.id}>{data.athleteName}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {errors.AthleteBlue && touched.AthleteBlue ? (<Typography variant="subtitle1" color="error">{errors.AthleteBlue}</Typography>) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                {activeStep === 2 && (
                  <Grid item xs={12} md={12} lg={12} sm={12} >
                    <Grid container spacing={2}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                          id="MatchDate"
                          name="MatchDate"
                          label="Match Date"
                          fullWidth
                          type="date"
                          variant="standard"
                          value={values.MatchDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >
                                <DateRangeRounded />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {errors.MatchDate && touched.MatchDate ? (<Typography variant="subtitle1" color="error">{errors.MatchDate}</Typography>) : null}
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                          id="Matchtime"
                          name="Matchtime"
                          label="Match Time"
                          type="time"
                          fullWidth
                          variant="standard"
                          value={values.Matchtime}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >
                                <TimerRounded />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {errors.Matchtime && touched.Matchtime ? (<Typography variant="subtitle1" color="error">{errors.Matchtime}</Typography>) : null}
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                          id="MatchType"
                          name="MatchType"
                          label="Match Type"
                          fullWidth
                          variant="standard"
                          value={values.MatchType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >
                                <ModeStandbyRounded />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {errors.MatchType && touched.MatchType ? (<Typography variant="subtitle1" color="error">{errors.MatchType}</Typography>) : null}
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                          id="NumberOfRound"
                          name="NumberOfRound"
                          label="Number Of Round"
                          type="number"
                          variant="standard"
                          fullWidth
                          value={values.NumberOfRound}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >
                                <RestartAltRounded />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {errors.NumberOfRound && touched.NumberOfRound ? (<Typography variant="subtitle1" color="error">{errors.NumberOfRound}</Typography>) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                )}

              </Grid>
              <Grid item sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleSubmit}>Submit</Button>
                ) : (
                  <Button onClick={handleNext}>Next</Button>
                )}
              </Grid>
            </Grid>
          </form>

        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default AddMatch
