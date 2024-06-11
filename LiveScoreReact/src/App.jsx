import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Components/Login'
import { ToastContainer } from "react-toastify";
import SAdminDashboard from './Components/SuperAdmin/SAdminDashboard';
import AdminDashboard from './Components/Admin/AdminDashboard';
import { Category, Dashboard, Handshake, MilitaryTech, Person2, Person2Rounded, Sports, SportsMartialArts, Verified } from '@mui/icons-material';
import Header from './Components/Common/Header';
import CDashboard from './Components/Coordinator/CDashboard';
import RegisterCoordinator from './Components/Coordinator/RegisterCoordinator';
import Referee from './Components/Coordinator/Referee';
import VerifyCoordinator from './Components/Admin/VerifyCoordinator';
import RefereeList from './Components/Admin/RefereeList';
import ManageTournament from './Components/Admin/ManageTournament';
import CategoryManage from './Components/Admin/CategoryManage';
import MatchDetails from './Components/Admin/MatchDetails';
import Match from './Components/Coordinator/Match';
import Coach from './Components/Coordinator/Coach';
import CProfile from './Components/Coordinator/CProfile';
import EditAthelete from './Components/Coordinator/EditAthelete';
import EditAtheleteProfile from './Components/Coordinator/EditAtheleteProfile';
import EditCoach from './Components/Coordinator/EditCoach';
import EditCategory from './Components/Admin/EditCategory';
import EditCoachPic from './Components/Coordinator/EditCoachPic';
import Athlete from './Components/Coordinator/Athlete';
import EditTournament from './Components/Admin/EditTournament';
import AssignMatch from './Components/Coordinator/AssignMatch';
import Scoring from './Components/Coordinator/Scoring';
import FindEmail from './Components/Common/FindEmail';
import ForgetPassword from './Components/Common/ForgetPassword';
import ViewPage from './Components/Coordinator/ViewPage';
import EditMatch from './Components/Coordinator/EditMatch';
import RoundScore from './Components/Common/RoundScore';
import RoundScores from './Components/Admin/RoundScores';
import GenerateOtp from './Components/Coordinator/GenerateOtp';


function App() {

  const sidebar = {
    sAdmin: {
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
        "mtournament",
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
        "cDashboard",
        "athlete",
        "referee",
        "coach",
        "match",

      ],
      name: [
        "Coordinator Dashboard",
        "Athlete",
        "Referee",
        "Coach",
        "Matches",

      ],
      sideRouterName: [
        "Profile"
      ],
      sideRouteIcon: [
        Person2Rounded
      ],
      sideRouteLink: [
        "cProfile"
      ]
    }
  }

  const { admin, coordinator, sAdmin } = sidebar

  const router = createBrowserRouter([
    {
      path: "/sAdmin",
      element: (<Header link="sAdmin" icons={sAdmin.icon} sidebarRoute={sAdmin.sidebarRoute} name={sAdmin.name} />
      ),
      children: [
        {
          index: true,
          element: <SAdminDashboard />,
        },
        {
          path: "sdashboard",
          element: <SAdminDashboard />
        }
      ]
    },
    {
      path: "/admin",
      element: (
        <Header link="admin" icons={admin.icon} sidebarRoute={admin.sidebarRoute} name={admin.name} />
      ),
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: "adashboard",
          element: <AdminDashboard />
        }, {
          path: "category",
          element: <CategoryManage />
        }, {
          path: "vcoordinator",
          element: <VerifyCoordinator />
        }, {
          path: "refereelist",
          element: <RefereeList />
        }, {
          path: "mtournament",
          element: <ManageTournament />
        }, {
          path: "matchdetails",
          element: <MatchDetails />
        }, {
          path: "editcategory/:id",
          element: <EditCategory />
        }, {
          path: "edittournament/:id",
          element: <EditTournament />
        }, {
          path: "roundscores/:mid/",
          element: (<RoundScores />)
        }

      ]
    },
    {
      path: "/coordinator",
      element: (
        <Header link="coordinator" icons={coordinator.icon} sidebarRoute={coordinator.sidebarRoute} name={coordinator.name} sideRouterName={coordinator.sideRouterName} sideRouteIcon={coordinator.sideRouteIcon} sideRouteLink={coordinator.sideRouteLink} />
      ),
      children: [
        {
          index: true,
          element: <CDashboard />,
        },
        {
          path: "cDashboard",
          element: <CDashboard />
        }, {
          path: "athlete",
          element: <Athlete />
        }, {
          path: "referee",
          element: <Referee />
        }, {
          path: "coach",
          element: <Coach />
        }, {
          path: "match",
          element: <Match />
        }, {
          path: "cProfile",
          element: <CProfile />
        }, {
          path: "editAthlete/:id",
          element: <EditAthelete />
        }, {
          path: "editAthletePic/:id",
          element: <EditAtheleteProfile />
        }, {
          path: "editCoach/:id",
          element: <EditCoach />
        }, {
          path: "editCoachPic/:id",
          element: <EditCoachPic />
        }, {
          path: "assignMatch/:id",
          element: <AssignMatch />
        }, {
          path: "scoring/:matchGroup/:rounds",
          element: <Scoring />
        }, {
          path: "viewpage/:mid",
          element: <ViewPage />
        }, {
          path: "editMatch/:mid",
          element: <EditMatch />
        }, {
          path: "roundscore/:mid/",
          element: (<RoundScore />)
        }, {
          path: "GenerateOtp/:mid/:matchGroup",
          element: (<GenerateOtp />)
        }
      ]
    },
    {
      path: "/",
      element: (<Login />)
    }, {
      path: "cRegister",
      element: (<RegisterCoordinator />)
    }, {
      path: "findEmail",
      element: (<FindEmail />)
    }, {
      path: "forgetPassword/:email",
      element: (<ForgetPassword />)
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
      {/* for react tostify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgdatasBar={true}
        newestOnTop={false}
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
