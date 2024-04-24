import { Dashboard } from "@mui/icons-material"
import { createBrowserRouter } from "react-router-dom"
import HeaderNew from "./Components/HeaderNew"
import Login from "./Components/Login"
import Profile from "./Components/Profile"

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

  // const { referee } = sidebar

  //  const router = createBrowserRouter([

  //  ])

  return (
    <> 
    {/* <HeaderNew/>  */}
    {/* <Login /> */}
    <Profile />
    </>
  )
}

export default App
