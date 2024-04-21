import './App.css'
import {  RouterProvider,  createBrowserRouter } from 'react-router-dom'
import Login from './Components/Login'
import { ToastContainer } from "react-toastify";
import SAdminDashboard from './Components/SuperAdmin/SAdminDashboard';
import AdminDashboard from './Components/Admin/AdminDashboard';
import { Category, Dashboard, Handshake, MilitaryTech, Person2, Sports, SportsMartialArts, Verified } from '@mui/icons-material';
import Header from './Components/Common/Header';
// import Rdashboard from './Components/Referee/Rdashboard';
import CDashboard from './Components/Coordinator/CDashboard';
import Athelete from './Components/Coordinator/Athelete';
import RegisterCoordinator from './Components/Coordinator/RegisterCoordinator';
import Referee from './Components/Coordinator/Referee';
import VerifyCoordinator from './Components/Admin/VerifyCoordinator';
import RefereeList from './Components/Admin/RefereeList';
import ManageTournament from './Components/Admin/ManageTournament';
import CategoryManage from './Components/Admin/CategoryManage';
import MatchDetails from './Components/Admin/MatchDetails';
import Match from './Components/Coordinator/Match';
import Coach from './Components/Coordinator/Coach';


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
        Dashboard,
        Category,
        Verified,
        Sports,
        MilitaryTech,
        Handshake,
      ],
      sidebarRoute: [
        "adashboard",
        "category",
        "vcoordinator",
        "refereelist",
        "mtounament",
        "matchdetails"
      ], name: [
        "Admin Dashboard",
        "Category",
        "Verify Coordinator",
        "Referee List",
        "Manage Tounament",
        "Match Details"
      ]
    },
    coordinator: {
      icon: [
        Dashboard,
        Person2,
        Sports,
        SportsMartialArts,
        Handshake,
       
      ],
      sidebarRoute: [
        "cdashboard",
        "athelete",
        "referee",
        "coach",
        "match",
        
      ],
      name: [
        "Coordinator Dashboard",
        "Athelete",
        "Referee",
        "Coach",
        "Matches",
        
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

  const { admin, coordinator, sadmin } = sidebar

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
        },{
          path:"category",
          element:<CategoryManage/>
        },{
          path:"vcoordinator",
          element:<VerifyCoordinator/>
        },{
          path:"refereelist",
          element:<RefereeList/>
        },{
          path:"mtounament",
          element:<ManageTournament/>
        },{
          path:"matchdetails",
          element:<MatchDetails/>
        }

      ]
    },
    // {
    //   path:"/referee",
    //   element:(<Header  link="referee" icons={referee.icon} sidebarRoute={referee.sidebarRoute}  name={referee.name} />),
    //   children:[
    //     {
    //       index:true,
    //       element:<Rdashboard />,
    //     },
    //     {
    //       path:"rdashboard",
    //       element:<Rdashboard />
    //     }
    //   ]
    // },
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
        },{
          path:"referee",
          element:<Referee/>
        },{
          path:"match",
          element:<Match/>
        },{
          path:"coach",
          element:<Coach/>
        }
      ]
    },
    {
      path:"/",
      element:(<Login/>)
    },{
      path:"cregister",
      element:(<RegisterCoordinator/>)
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
