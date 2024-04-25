

const Card = () => {
  return (  
     <div className="container">
      <section className="mx-auto col-sm-3" >
        <div className="card  m-0 p-3" style={{ borderColor:"#141c33",borderRadius:"7px",color:"white",backgroundColor:"#141c33"}} >
          {/* <div className="card-body" style={{color:"white",backgroundColor:"#141c33" }}> */}
            <div className="d-flex justify-content-between mb-2">
              <h5 className="card-title font-weight-bold">LiveScore</h5>
            <h5 className="card-text">Mon, 12:30 PM</h5>
            </div>
           
            <div className="d-flex justify-content-between m-1">
              {/* <span className='mt-2' >Blue</span> */}
              <img src="https://media.istockphoto.com/id/1454026690/photo/portrait-of-female-volleyball-player-holding-a-volleyball-ball-at-sports-court.jpg?s=2048x2048&w=is&k=20&c=TrbS88KkqWUjGFdHpyhgHh1e6h0gIoZlJozquRlQgCU=" style={{height:"8vh",clipPath: "circle()", margin:3}} alt="Live" />
               
               {/* <img src={fight} alt="live" /> */}
              <h3 style={{margin:"7px"}}>V/S</h3>

              <img src="https://media.istockphoto.com/id/1454026690/photo/portrait-of-female-volleyball-player-holding-a-volleyball-ball-at-sports-court.jpg?s=2048x2048&w=is&k=20&c=TrbS88KkqWUjGFdHpyhgHh1e6h0gIoZlJozquRlQgCU=" style={{height:"8vh",clipPath: "circle()", margin:3}} alt="Live" />
              {/* <span className='mt-2'>Red</span> */}
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span >Bhagyashree</span>
            <span >Bhagyashree</span>
            </div>
            {/* <hr /> */}
            <ul className="list-unstyled d-flex justify-content-between font-small">
              <li>8AM</li>
              <li>11AM</li>
              <li>2PM</li>
              <li>5PM</li>
              <li >8PM</li>
            </ul>
         </div>
        {/* </div> */}
      </section>
    </div>    
    );
}

export default Card