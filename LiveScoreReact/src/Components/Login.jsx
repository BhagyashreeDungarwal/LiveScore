import { useEffect, useState } from 'react';
// import Lottie from 'react-lottie';
// import animationData from '../lotties/Login.json';
import loginImg from "./Images/login.jpg";
import { useFormik } from "formik";
import {
  Visibility,
  VisibilityOff,
  MailLockRounded,
  VpnKeyRounded, // Fix typo here
} from "@mui/icons-material";
import {
  Grid,
  Typography,
  Link,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Button,
  Paper,
} from '@mui/material';
import { login } from './Validation/Login.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginApi } from '../Redux/Action/loginAction.js';

const Login = () => {

  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.login);

  const initialValues = {
    email: '',
    password: '',
    // remember: false
  };


  useEffect(() => {
    if (data) {
      console.log(data.token)
      console.log(data.role)
    } else {
      console.log(error.msg)
    }
  }, [data, error])


  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    //resetForm, // Add this line
  } = useFormik({
    initialValues: initialValues, // Fix typo here
    validationSchema: login,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      // console.log(values);
      dispatch(loginApi(values))
      setSubmitting(false)
      resetForm({ values: "" }); // Fix typo here
    },
  });

  const [type, setType] = useState("password");
  const [visible, setVisible] = useState(false);
  const icon = visible ? <Visibility sx={{ color: "#212c9f" }} /> : <VisibilityOff sx={{ color: "#212c9f" }} />;
  const showClick = () => {
    if (visible === false) {
      setVisible(true);
      setType("text");
    } else {
      setVisible(false);
      setType("password");
    }
  };

  return (
    <Grid container

      sx={{ minHeight: "100vh", width: "100vw" }}>
      <Grid item xs={false} sm={false} lg={6} sx={{ backgroundImage: `url(${loginImg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
      </Grid>
      <Grid item xs={12} sm={12} lg={6} component={Paper} square  >
        <Box alignItems="center" maxWidth="sm" sx={{ my: 18, mx: 10, p: 5, display: 'flex', flexDirection: 'column' }} >

          <Typography component="h1" sx={{ fontFamily: "unset", color: "#212c9f", textAlign: "center" }} variant="h3">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                color='secondary'
                sx={{ marginBottom: "15px" }}
                size='medium'
                label="Email"
                type='email'
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{ shrink: true }}
                placeholder='Enter Your Email'
                variant='standard'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailLockRounded sx={{ color: "#212c9f" }} />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.email && touched.email ? <Typography variant='caption' color="error">{errors.email}</Typography> : null}
              <TextField
                sx={{ marginBottom: "10px" }}
                fullWidth
                id="password"
                size='medium'
                label="Password"
                type={type}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{ shrink: true }}
                color='secondary'
                placeholder='Enter Your Password'
                variant='standard'
                name='password'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <VpnKeyRounded sx={{ color: "#212c9f" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end"> <IconButton onClick={showClick}>
                      {icon}
                    </IconButton> </InputAdornment>)
                }}
              />
              {errors.password && touched.password ? <Typography variant="caption" color="error">{errors.password}</Typography> : null}

              <Button variant="contained" type='submit' fullWidth sx={{ color: "White", background: "#212c9f" }}>
                Submit
              </Button>
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            </form>
            <Grid container>
              <Grid item xs mt={2}>
                <Link href="#" sx={{ textDecoration: "none" }} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
