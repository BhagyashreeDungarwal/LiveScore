import React from 'react'
import { Typography } from '@mui/material'
import ProtectedRoute from '../../ProtectedRoute'

const AdminDashboard = () => {
  return (
    <div>
      <Typography variant="h1" color="initial">Admin DashBoard</Typography>
    </div>
  )
}

export default ProtectedRoute(AdminDashboard, 'admin')
