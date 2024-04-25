
import './Css/Login.css'
import { useFormik } from 'formik';
import { login } from './Validation/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { loginApi } from '../Redux/Action/loginAction';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const dispatch = useDispatch()
  const { data, error } = useSelector((state) => state.login);
const navigate = useNavigate()
// useEffect(() => {
  
// }, [data,error])


  const initial = {
    email:"",
    password:""
  }

  const { values , errors,touched, handleBlur,handleChange,handleSubmit} = useFormik({
    initialValues:initial,
    validationSchema:login,

    onSubmit: async (values) => {
      // console.log(values)
      // const formdata = new FormData();
      // formdata("Email",values.email)
      // formdata("passwordword",values);
      await dispatch(loginApi(values))
      console.log(values)
      if (data) {
    toast.success(data.msg)
    navigate("/dashboard")
  }
  if (error) {
    toast.error(error.msg)
    
  }
    }
    
  })

  return (
    <div className="background">
      <div className="shape"></div>
      
      <form method="post"  onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label htmlFor="username">Email</label>
        <input
          type="email"
          name='email'
          placeholder="Email or Phone"
          id="username"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
  {errors.email && touched.email ? (<span style={{color:"red"}}>{errors.email}</span>) : null}
                            
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          name='password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
  {errors.password && touched.password ? (<span style={{color:"red"}}>{errors.password}</span>) : null}
                            
        <button type="submit">Log In</button>
      
          <div className="go" style={{marginTop:"14px"}}>
            <i className="" ></i> Forget Password
          </div>
          {/* <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div> */}
 
      </form>
      <div className="shape"></div>
    </div>
  );
}

export default Login
