// import AddAthelete from "./AddAthelete"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearMessage } from "../../Redux/CoordinatorRedux"


  
const CDashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])
  
  return (
    <div>
    
      Coordinator Dashboard 
    
    </div>
  )
}

export default CDashboard
