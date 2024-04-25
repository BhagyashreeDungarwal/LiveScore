import { Dashboard } from "@mui/icons-material"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HeaderNew from "./Components/HeaderNew"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import { ToastContainer } from "react-toastify"
import RDashboard from './Components/RDashboard'

function App() {

  const sidebar = {
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

   const { referee } = sidebar

   const router = createBrowserRouter([
{
  path:"/dashboard",
  element:(<RDashboard/>),
    children:[
      {
          index:true,
          element:<RDashboard />,
        },
    ]
},
{
  path:"/",
  element:(<Login/>)
}
    ])

  return (
    <> 
    {/* <HeaderNew/>  */}
   <RouterProvider router={router} />
    {/* <Profile /> */}

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
