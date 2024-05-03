
import {  Card } from 'react-bootstrap';

const MatchCard = () => {
  return (  
    <div>
          <Card className=" m-2 p-3 " style={{ borderColor:"#141c33",borderRadius:"7px",color:"white",backgroundColor:"#141c33"}}>
            <Card.Body>
               <div className="d-flex justify-content-between mb-2">
              <Card.Title className="font-weight-bold">LiveScore</Card.Title>
              <Card.Text>Mon, 12:30 PM</Card.Text>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <img src="https://media.istockphoto.com/id/1454026690/photo/portrait-of-female-volleyball-player-holding-a-volleyball-ball-at-sports-court.jpg?s=2048x2048&w=is&k=20&c=TrbS88KkqWUjGFdHpyhgHh1e6h0gIoZlJozquRlQgCU=" style={{height:"8vh",clipPath: "circle()", margin:3}} alt="Live" />
                <h3 style={{margin:"7px"}}>V/S</h3>
                <img src="https://media.istockphoto.com/id/1454026690/photo/portrait-of-female-volleyball-player-holding-a-volleyball-ball-at-sports-court.jpg?s=2048x2048&w=is&k=20&c=TrbS88KkqWUjGFdHpyhgHh1e6h0gIoZlJozquRlQgCU=" style={{height:"8vh",clipPath: "circle()", margin:3}} alt="Live" />
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Bhagyashree</span>
                <span>Bhagyashree</span>
              </div>
            </Card.Body>
          </Card>                
    </div>
    );
}

export default MatchCard