import  { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/Login.json';
import  { useFormik} from "formik"
import { Visibility,VisibilityOff ,MailLockRounded, VpnKeyOffRounded } from "@mui/icons-material";
import { Grid, Typography ,Link,TextField,Box ,IconButton,InputAdornment, Button} from '@mui/material'
import { login } from './Validation/Login.js';

const Login = () => {
    const defaultOptions =  {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

      const intitialValue ={
        email:'',
        password:'',
        // remember:false
      }

      const {values,errors,touched,handleBlur,handleChange,handleSubmit,
      } = useFormik({
        intitialValues:intitialValue,validationSchema:login,onSubmit:async (values,{resetForm})=>{
          console.log(values);
          resetForm({values:""})
        }
      })

      const [type, setType] = useState("password")
  const [visible, setVisible] = useState(false)
  const icon = (visible ? <Visibility sx={{ color:"#212c9f" }} /> : <VisibilityOff sx={{ color:"#212c9f" }} />)
  const showClick = () => {
    if (visible === false) {
      setVisible(true)
      setType("text")
    }
    else {
      setVisible(false)
      setType("password")
    }
  }
   
    return (
      // <div>

     <Grid container sx={{height:"100vh",width:"100vw"}}>
      <Grid item xs={false} sm={false} lg={8} >
 
      <Lottie options={defaultOptions}
        height={460}
        width={500}
      />
    
    </Grid>
      <Grid item xs={12} sm={12} lg={4} height={{xs:200,sm:250,lg:400}}>
         <Typography component="h1" variant="h4">
              Sign in
            </Typography>
            <Box  sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              color='secondary'
              sx={{ marginBottom: "15px", }}
              size='small'
              label="Email"
              type='email'
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ shrink: true, }}
              placeholder='Enter Your Email'
              variant='standard'
              InputProps={{
                startAdornment:(
                  <InputAdornment position="start">
                    <MailLockRounded sx={{ color:"#212c9f" }}/>
                  </InputAdornment>
                  ),
              }}
            />
            {errors.email&&touched.email? <Typography variant='caption' color="error">{errors.email}</Typography>:null }
             <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="password"
              size='small'
              label="Password"
              type={type}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ shrink: true, }}
              color='secondary'
              placeholder='Enter Your Password'
              variant='standard'
              name='password'
              InputProps={{
                
                startAdornment:(
                  <InputAdornment position="start" >
                    <VpnKeyOffRounded sx={{ color:"#212c9f" }}/>
                  </InputAdornment>
                  ),
                
                endAdornment: (<InputAdornment position="end"> <IconButton onClick={showClick}>
                  {icon }
                </IconButton> </InputAdornment>)
              }}
            />
            {errors.password&&touched.password? <Typography variant="caption" color="error">{errors.password}</Typography>:null}

            <Button variant="contained" type='submit' fullWidth sx={{ color:"White" ,background:"#212c9f" }}>
              Submit
            </Button>
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
            
            </form>
              <Grid container>
                <Grid item xs>
                  <Link href="#" sx={{textDecoration:"none"}} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
      </Grid>  
    </Grid>
    // </div>

  )
}

export default Login
