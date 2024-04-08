import React from 'react'
import HeaderFormat from '../Common/HeaderFormat'
import Modal from '../Common/Modal'
import {Box} from '@mui/material'

const Rdashboard = () => {
  return (
    <div>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,width:"100%",  }}>
      <HeaderFormat title="Admin DashBoard" />
      <Modal />
    </Box>
  </div>
  )
}

export default Rdashboard
