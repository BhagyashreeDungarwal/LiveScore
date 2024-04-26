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
      <div style={{float:"left"}}>
      <Row  xs={1} md={2} className="row-cols-3 g-4 "  >
        <Col className="col-sm-3">
         <MatchCard />
         <MatchCard />
         <MatchCard />
         <MatchCard />
         <MatchCard />
         <MatchCard />
         <MatchCard />

      </Col>
      </Row>
        </div>
   
<div style={{float:"right"}}>

    <Score />
</div>
     </div>
  
    <Footer />
    </>
  )
}

export default RDashboard