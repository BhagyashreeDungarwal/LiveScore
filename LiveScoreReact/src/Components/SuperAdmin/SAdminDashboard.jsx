
import React from 'react'
import ProtectedRoute from '../../ProtectedRoute'
import {Typography} from '@mui/material'

const SAdminDashboard = () => {
  return (
    <div>
      <Typography variant="h1" color="initial">Super Admin Dashboard</Typography>
    </div>
  )
}


export default ProtectedRoute(SAdminDashboard,'superadmin')
