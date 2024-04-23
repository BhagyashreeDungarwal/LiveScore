import  { useState } from 'react'
import './Css/Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform any login/authentication logic
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Log In</button>
      
          <div className="go" style={{marginTop:"14px"}}>
            <i className="" ></i> Forget Password
          </div>
          {/* <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div> */}
 
      </form>
    </div>
  );
}

export default Login
