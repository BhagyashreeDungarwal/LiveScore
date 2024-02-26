
import './App.css'
import { BrowserRouter,  Route, Routes} from 'react-router-dom'
import Login from './Components/Login'
import { ToastContainer } from "react-toastify";
import SAdminDashboard from './Components/SuperAdmin/SAdminDashboard';
import AdminDashboard from './Components/Admin/AdminDashboard';

function App() {




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      <Route path='/sadmindashboard' element={<SAdminDashboard/>} />
      <Route path='/adashboard' element={<AdminDashboard/>} />
      </Routes>



      {/* for react tostify */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgdatasBar={true}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  )
}

export default App
