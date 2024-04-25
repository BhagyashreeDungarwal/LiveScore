
import { HomeRounded } from '@mui/icons-material'
import logo from '../assets/image/Logo.png'

const Index = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" >
  <div className="container-fluid ">
    <img src={logo} alt="Live Score" style={{height:"4vh", marginRight:"5PX"}}/>
    <a className="navbar-brand" href="#">Live Score</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
          <a className="nav-link active bi bi-house-door-fill mr-2" aria-current="page" href="#"> <span>Home</span></a>
        </li> */}
      </ul>
       <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
            className="rounded-circle img-fluid" style={{height:"6vh", margin:"0"}} />
    </div>
  </div>
</nav>
  )
}

export default Index