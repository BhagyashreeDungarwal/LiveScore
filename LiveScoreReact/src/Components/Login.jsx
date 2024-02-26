import { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const Login = () => {

  // getting state from  reducer
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state) => state.login);

  // making intial state 
  const initialValues = {
    email: '',
    password: '',
    // remember: false
  };

  // setting role and message

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      toast.success(data.msg)
      localStorage.setItem('token', data.token);

      // making logic for naviate acconding to role 
      if (data.role === 1) {
        localStorage.setItem('role', "superadmin");
        navigate("/sadmindashboard")
        console.log(localStorage.getItem('role'))
        console.log(localStorage.getItem('token'))
      } else if (data.role === 2) {
        // console.log("admin")
        localStorage.setItem('role', "admin");
        navigate("/adashboard")
        console.log(localStorage.getItem("role"))
      }
    }

    if (error) {
      // console.log(error.msg)
      toast.error(error.msg)
      console.log(loading)
    }
  }, [data, error])


  // using formik for validation and submitting
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues, // Fix typo here
    validationSchema: login,
    onSubmit: (values, { resetForm, setSubmitting }) => {

      dispatch(loginApi(values))
      setSubmitting(false)
      resetForm({ values: "" });
    },
  });


  // making password show and hide button 
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
