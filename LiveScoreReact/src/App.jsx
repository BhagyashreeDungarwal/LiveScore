import './App.css'
import {  RouterProvider,  createBrowserRouter } from 'react-router-dom'
import Login from './Components/Login'
import { ToastContainer } from "react-toastify";
import SAdminDashboard from './Components/SuperAdmin/SAdminDashboard';
import AdminDashboard from './Components/Admin/AdminDashboard';
import { Dashboard, Person2 } from '@mui/icons-material';
import Header from './Components/Common/Header';
import Rdashboard from './Components/Referee/Rdashboard';
import CDashboard from './Components/Coordinator/CDashboard';
import Athelete from './Components/Coordinator/Athelete';


function App() {

  const sidebar = {
    sadmin: {
      icon: [
        Dashboard
      ],
      sidebarRoute: [
        "sadmindashboard"
      ],
      name: [
        "Super Admin Dashboard"
      ]
    },
    admin: {
      icon: [
        Dashboard
      ],
      sidebarRoute: [
        "admindashboard"
      ], name: [
        "Admin Dashboard"
      ]
    },
    coordinator: {
      icon: [
        Dashboard,
        Person2
      ],
      sidebarRoute: [
        "cdashboard",
        "athelete"
      ],
      name: [
        "Coordinator Dashboard",
        "Athelete"
      ]
    },
    referee: {
      icon: [
        Dashboard
      ],
      sidebarRoute: [
        "rdashboard"
      ],
      name: [
        "Referee Dashboard"
      ]
    }
  }

  const { admin, coordinator, referee, sadmin } = sidebar

  const router = createBrowserRouter([
    {
      path: "/sadmin",
      element: (<Header  link="sadmin" icons={sadmin.icon} sidebarRoute={sadmin.sidebarRoute} name={sadmin.name} />
      ),
      children:[
        {
          index:true,
          element:<SAdminDashboard />,
        },
        {
          path:"sdashboard",
          element:<SAdminDashboard />
        }
      ]
    },
    {
      path:"/admin",
      element: (
        <Header link="admin"  icons={admin.icon} sidebarRoute={admin.sidebarRoute} name={admin.name} />
      ),
      children:[
        {
          index:true,
          element:<AdminDashboard />,
        },
        {
          path:"adashboard",
          element:<AdminDashboard />
        }
      ]
    },
    {
      path:"/referee",
      element:(<Header  link="referee" icons={referee.icon} sidebarRoute={referee.sidebarRoute}  name={referee.name} />),
      children:[
        {
          index:true,
          element:<Rdashboard />,
        },
        {
          path:"rdashboard",
          element:<Rdashboard />
        }
      ]
    },
    {
      path:"/coordinator",
      element:(
        <Header  link="coordinator" icons={coordinator.icon} sidebarRoute={coordinator.sidebarRoute} name={coordinator.name} />
      ),
      children:[
        {
          index:true,
          element:<CDashboard />,
        },
        {
          path:"cdashboard",
          element:<CDashboard />
        },{
          path:"athelete",
          element:<Athelete/>
        }
      ]
    },
    {
      path:"/",
      element:(<Login/>)
    }
  ])

  return (
    <>
      {/* <Routes> */}
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path='/sadmindashboard' element={} /> */}
        {/* <Route path='/adashboard' element={<AdminDashboard />} /> */}
      {/* </Routes> */}

<RouterProvider router={router} />


      {/* for react tostify */}
      <ToastContainer
        position="top-right"
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
    </>
  )
}

export default App
