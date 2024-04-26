
import { Container, Row, Col, Card } from 'react-bootstrap';

const MatchCard = () => {
  return (  
    <Container>
      {/* <Row  xs={1} md={2} className="g-4 row-cols-1" >
        <Col> */}
          <Card className=" m-0 p-3 " style={{width:"18rem", borderColor:"#141c33",borderRadius:"7px",color:"white",backgroundColor:"#141c33"}}>
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
        {/* </Col>
      </Row> */}
    </Container>
    //  <div className="container">
    //   <div className="row row-cols-1 g-4">
    //   <div className="col-sm-3">
    //   <section className="mx-auto " >
    //     <div className="card  m-0 p-3" style={{ borderColor:"#141c33",borderRadius:"7px",color:"white",backgroundColor:"#141c33"}} >
    //         <div className="d-flex justify-content-between mb-2">
    //           <h5 className="card-title font-weight-bold">LiveScore</h5>
    //         <h5 className="card-text">Mon, 12:30 PM</h5>
    //         </div>
           
    //         <div className="d-flex justify-content-between m-1">            
    //           <img src="https://media.istockphoto.com/id/1454026690/photo/portrait-of-female-volleyball-player-holding-a-volleyball-ball-at-sports-court.jpg?s=2048x2048&w=is&k=20&c=TrbS88KkqWUjGFdHpyhgHh1e6h0gIoZlJozquRlQgCU=" style={{height:"8vh",clipPath: "circle()", margin:3}} alt="Live" />
    //           <h3 style={{margin:"7px"}}>V/S</h3>
    //           <img src="https://media.istockphoto.com/id/1454026690/photo/portrait-of-female-volleyball-player-holding-a-volleyball-ball-at-sports-court.jpg?s=2048x2048&w=is&k=20&c=TrbS88KkqWUjGFdHpyhgHh1e6h0gIoZlJozquRlQgCU=" style={{height:"8vh",clipPath: "circle()", margin:3}} alt="Live" />
    //         </div>
    //         <div className="d-flex justify-content-between mb-2">
    //           <span >Bhagyashree</span>
    //         <span >Bhagyashree</span>
    //         </div>
    //         {/* <ul className="list-unstyled d-flex justify-content-between font-small">
    //           <li>8AM</li>
    //           <li>11AM</li>
    //           <li>2PM</li>
    //           <li>5PM</li>
    //           <li >8PM</li>
    //         </ul> */}
    //      </div>
    //   </section>
    //   </div>
     
    //   </div>
    // </div>    
    );
}

export default MatchCard