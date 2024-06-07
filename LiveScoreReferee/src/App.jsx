import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import RDashboard from './Components/RDashboard'
import Scoring from "./Components/Scoring"
import Login from "./Components/Login"

function App() {

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: (<RDashboard />),
      children: [
        {
          index: true,
          element: <RDashboard />,
        },
      ]
    },
    {
      path: "/",
      element: (<Login />)
      // element: (<Scoring />)
    },
    {
      path: "/scoring/:matchGroup",
      element: (<Scoring />)
    }
  ])

  return (
    <>
      {/* <Header/>  */}
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
