// import React from 'react'
import { Box } from '@mui/material'
import ProtectedRoute from '../../ProtectedRoute'
import HeaderFormat from '../Common/HeaderFormat'

const AdminDashboard = () => {
  return (
   <Box>
    <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
        <HeaderFormat title="Dashboard" />
      </Box>
   </Box>
  )
}

export default ProtectedRoute(AdminDashboard, 'admin')
