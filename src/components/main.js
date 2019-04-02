import React, { Component } from 'react';
import Maps from './maps';
import Address from './Address';
import Luggage from './luggage';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import classes from './marker.css';

class Main extends Component {

  render() {
    console.log(<Maps />);
    return (
      <div>
      <h1 style={{display: 'flex', justifyContent: 'center'}}>LugStor</h1>
      <div style={style.landingPage}>
        <Address />
      </div>
      <div style={style.landingPage}>
        {this.props.names ?
          <div style={style.landingTitle}>
            <h2>Pickup</h2>
              <img className="markera" />
              <br></br>
              <p>{this.props.names}</p>
            </div> : null }
        {((this.props.line_coords.length === 2)) ? <div style={style.landingPageMap}>
          <Maps />
        </div> : null}
        {this.props.donames ?
          <div style={style.landingTitle}>
            <h2>Dropoff</h2>
              <img className="marker2a" />
              <br></br>
              <p>{this.props.donames}</p>
              <Link to="/Luggage"><h1>Next Step</h1></Link>
            </div> : null }
      </div>
      </div>
    );
  }
}

const style = {
  landingPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  },
  landingPageMap: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    justifyContent: 'center',
    width: '50vw',
    padding: '5px'
  },
  landingTitle: {
    margin: 'auto',
    maxWidth: '50vw',
  }
}
const mapStateToProps = state => ({
  names: state.cdsName.names.names,
  donames: state.cdsName.donames.donames,
  line_coords: state.coords.line_coords
})

export default connect(mapStateToProps)(Main);
