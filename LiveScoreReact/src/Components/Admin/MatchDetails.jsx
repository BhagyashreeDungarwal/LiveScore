import React from 'react'
import ProtectedRoute from '../../ProtectedRoute'

const MatchDetails = () => {
  return (
    <div>
      Match details
    </div>
  )
}

export default ProtectedRoute(MatchDetails,'admin')
