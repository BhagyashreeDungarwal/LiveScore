import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Score from './Score'
import MatchCard from './MatchCard'
import { Col, Row } from 'react-bootstrap'


const RDashboard = () => {
  return (
    <>
    <Header />
     <div>
      <div style={{float:"left",display: 'flex', overflowX: 'auto'}}>     
         <MatchCard />     
            
        </div>
   
<div style={{float:"right", zIndex:"1"}}>
    <Score />
</div>
     </div>
  
    <Footer />
    </>
  )
}

export default RDashboard