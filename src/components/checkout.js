import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Maps from './maps';
import Luggage from './luggage';

let exmarks

const Checkout = (props) => (
  console.log(exmarks),
  <div>
    <div style={{textAlign: "center"}}>
      <h1>Whats getting picked up</h1>
      <br />
    <div style={style.photo}>
    {props.photos.map((pieces, idx) => {
      return (
        <li key={idx} style={style.subPhoto}>
          {props.photos.length < 1 ? null :
            <img
              alt={pieces ? "luggagepieces" : null}
              height={pieces ? "50px" : null}
              width={pieces ? "100px" : null}
              src={pieces}
            />
          }
        </li>
      )
    })}
    </div>
  </div>
    <div style={style.maps_locations}>


      <div style={{ color: 'white' }}>
        <h1>Pickup Location</h1>
        <p>{props.pickup}</p>
        <h1>Dropoff Location</h1>
        <p>{props.dropoff}</p>
          <h2>Price: $15</h2>
          <h3>Please pay: ${props.photos.length * 15}</h3>
      </div>
    </div>
    <div style={{margin: "auto", textAlign: "center"}}>
      <Link to="/Luggage"><h1>Previous</h1> </Link>
      <Link to="/"><h1> Back to the Beginning</h1></Link>
    </div>

  </div>
);
const style = {
  webcam: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2b2723"
  },
  maps_locations: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2b2723"
  },
  landingPageMap: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    justifyContent: 'center',
    width: '50vw',
    padding: '5px'
  },
  button: {
    margin: "auto",
    marginBottom: "10px",
    height: "50px",
    borderRadius: "10px",
    width: "50%",
    color: "steelblue",
  },
  photo: {
    alignItems: "left",
    textAlign: "center",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyleType: "none",
    padding: "5px",
    margin: "10px"
  },
  subPhoto: {
    margin: "5px"
  },
  map: {
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 'auto',
    width: "50vw",
    height: "25vh"
  }
}

const mapStateToProps = state => ({
  photos: state.photos.photos,
  coords: state.coords.line_coords,
  pickup: state.cdsName.names.names,
  dropoff: state.cdsName.donames.donames
})

export default connect(mapStateToProps)(Checkout);
