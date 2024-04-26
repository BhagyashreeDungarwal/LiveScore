import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const Score = () => {
  return (
    <Card style={{padding:4, borderColor:"#141c33",borderRadius:"7px",color:"white",backgroundColor:"#141c33"  }}>

      <Card.Body >
        <Card.Title>Match</Card.Title>
        <Card.Text className="d-flex justify-content-between mb-2">
              <span >Player1</span>
            <span >Player2</span>
        </Card.Text>
        <Card.Text className="d-flex justify-content-between mb-2">
              <img src="https://media.istockphoto.com/id/1454026690/photo/portrait-of-female-volleyball-player-holding-a-volleyball-ball-at-sports-court.jpg?s=2048x2048&w=is&k=20&c=TrbS88KkqWUjGFdHpyhgHh1e6h0gIoZlJozquRlQgCU=" style={{height:"8vh",clipPath: "circle()", margin:3}} alt="Live" />
              <h3 style={{margin:"7px"}}>V/S</h3>
              <img src="https://media.istockphoto.com/id/1454026690/photo/portrait-of-female-volleyball-player-holding-a-volleyball-ball-at-sports-court.jpg?s=2048x2048&w=is&k=20&c=TrbS88KkqWUjGFdHpyhgHh1e6h0gIoZlJozquRlQgCU=" style={{height:"8vh",clipPath: "circle()", margin:3}} alt="Live" />  
        </Card.Text>
      </Card.Body>
      <Card.Title>Player 1</Card.Title>
      <ListGroup className="list-group-flush" >
        <ListGroup.Item className="d-flex justify-content-between mb-2" style={{ color:"white",backgroundColor:"#141c33"}}>Rounds 
        <span>Score</span>
        <span>Penalty</span>
        <span>Final</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between mb-2" style={{ color:"white",backgroundColor:"#141c33"}}>R1
        <span>10</span>
        <span>2</span>
        <span>Win</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between mb-2" style={{ color:"white",backgroundColor:"#141c33"}}>R2
        <span>10</span>
        <span>2</span>
        <span>Lose</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between mb-2" style={{ color:"white",backgroundColor:"#141c33"}}>R3
        <span>--</span>
        <span>--</span>
        <span>--</span>
        </ListGroup.Item>
        
      </ListGroup>
      <Card.Title>Player 2</Card.Title>
      <ListGroup className="list-group-flush" >
        <ListGroup.Item className="d-flex justify-content-between mb-2" style={{ color:"white",backgroundColor:"#141c33"}}>Rounds 
        <span>Score</span>
        <span>Penalty</span>
        <span>Final</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between mb-2" style={{ color:"white",backgroundColor:"#141c33"}}>R1
        <span>10</span>
        <span>2</span>
        <span>Lose</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between mb-2" style={{ color:"white",backgroundColor:"#141c33"}}>R2
        <span>10</span>
        <span>2</span>
        <span>Win</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between mb-2" style={{ color:"white",backgroundColor:"#141c33"}}>R3
        <span>--</span>
        <span>--</span>
        <span>--</span>
        </ListGroup.Item>
        
      </ListGroup>
      
    </Card>
  )
}

export default Score