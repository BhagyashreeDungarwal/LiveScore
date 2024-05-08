import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, Slide, TextField, Typography, useTheme } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchvalidate } from "../Validation/Coordinator";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const AddMatch = () => {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false);
  const { coachdata } = useSelector((state => state.coordinator))
  const { categorydata ,tounamentdata } = useSelector((state => state.admin))
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    console.log("open")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initial,
    validationSchema: matchvalidate,
    onSubmit: async (values) => {
      console.log(values)
    }
  })



  return (
    <div>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Match
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Update Coach Picture</DialogTitle>
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
            <form>
              <Grid container spacing={1}>
                <Grid item xl={12} md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="MatchType"
                    name="MatchType"
                    label="Match Type"
                    variant='standard'
                    type="text"
                    value={values.MatchType}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >
                          {/* <Person2Rounded /> */}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* {errors.name && touched.name ? (<Typography variant="subtitle1" color="error">{errors.name}</Typography>) : null} */}
                </Grid>
                <Grid item xl={12} md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="NumberOfRound"
                    name="NumberOfRound"
                    label="Number Of Round"
                    type="number"
                    variant='standard'
                    value={values.NumberOfRound}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >
                          {/* <Person2Rounded /> */}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* {errors.name && touched.name ? (<Typography variant="subtitle1" color="error">{errors.name}</Typography>) : null} */}
                </Grid>
                <Grid item xl={12} md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="MatchDate"
                    name="MatchDate"
                    label="Match Date"
                    type="date"
                    variant='standard'
                    value={values.MatchDate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >
                          {/* <Person2Rounded /> */}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* {errors.name && touched.name ? (<Typography variant="subtitle1" color="error">{errors.name}</Typography>) : null} */}
                </Grid>
                <Grid item xl={12} md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="Matchtime"
                    name="Matchtime"
                    label="Matchtime"
                    variant='standard'
                    type="time"
                    value={values.Matchtime}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: theme.palette.secondary.dark }} >
                          {/* <Person2Rounded /> */}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* {errors.name && touched.name ? (<Typography variant="subtitle1" color="error">{errors.name}</Typography>) : null} */}
                </Grid>
                <Grid item xl={6} md={6} sm={12} xs={12}>
                  <FormControl variant='filled' fullWidth>
                    <InputLabel color='secondary'>Athlete Red</InputLabel>
                    <Select
                      color='secondary'
                      id="categoryId"
                      name="categoryId"
                      label="category"
                      value={values.AthleteRed}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {/* {categorydata?.map((data) => (
                        <MenuItem key={data.id} value={data.id}>{data.categoryName}</MenuItem>
                      ))
                      } */}
                    </Select>
                  </FormControl>
                  {errors.CategoryId && touched.CategoryId ? (<Typography variant="subtitle1" color="error">{errors.CategoryId}</Typography>) : null}
                </Grid>
                <Grid item xl={6} md={6} sm={12} xs={12}>
                  <FormControl variant='filled' fullWidth>
                    <InputLabel color='secondary'>Athlete Blue</InputLabel>
                    <Select
                      color='secondary'
                      id="categoryId"
                      name="categoryId"
                      label="category"
                      value={values.AthleteBlue}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {/* {categorydata?.map((data) => (
                        <MenuItem key={data.id} value={data.id}>{data.categoryName}</MenuItem>
                      ))
                      } */}
                    </Select>
                  </FormControl>
                  {errors.CategoryId && touched.CategoryId ? (<Typography variant="subtitle1" color="error">{errors.CategoryId}</Typography>) : null}
                </Grid>
                <Grid item xl={6} md={6} sm={12} xs={12}>
                  <FormControl variant='filled' fullWidth>
                    <InputLabel color='secondary'>Category</InputLabel>
                    <Select
                      color='secondary'
                      id="categoryId"
                      name="categoryId"
                      label="category"
                      value={values.CategoryId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {categorydata?.map((data) => (
                        <MenuItem key={data.id} value={data.id}>{data.categoryName}</MenuItem>
                      ))
                      }
                    </Select>
                  </FormControl>
                  {errors.CategoryId && touched.CategoryId ? (<Typography variant="subtitle1" color="error">{errors.CategoryId}</Typography>) : null}
                </Grid>
                <Grid item xl={6} md={6} sm={12} xs={12}>
                  <FormControl variant='filled' fullWidth>
                    <InputLabel color='secondary'>Tournament</InputLabel>
                    <Select
                      color='secondary'
                      id="categoryId"
                      name="categoryId"
                      label="category"
                      value={values.TournamentId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {tounamentdata?.map((data) => (
                        <MenuItem key={data.TId} value={data.TId}>{data.tournamentName}</MenuItem>
                      ))
                      }
                    </Select>
                  </FormControl>
                  {errors.CategoryId && touched.CategoryId ? (<Typography variant="subtitle1" color="error">{errors.CategoryId}</Typography>) : null}
                </Grid>
                <Grid item xl={12} md={12} sm={12} xs={12}>
                  <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </div>
  )
}

export default AddMatch
