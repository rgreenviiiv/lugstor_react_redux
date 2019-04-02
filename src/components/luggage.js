import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { photoTaker } from '../actions/execActions';

class Luggage extends Component {
  state = {
    luggage_pieces: '',
    total_luggage: [],
    deleted: true,
    show: false
  }
  setRef = webcam => {
    this.webcam = webcam
  }
  capture = () => {
    const imgSrc = this.webcam.getScreenshot()
    this.setState({ show: true })
    this.props.photoTaker(imgSrc)
    this.setState({ total_luggage: this.props.photos })
    console.log(this.props.photos, this.props.photos.length);
  }
  deletePhoto = idx => {
    let photos = this.props.photos;
    photos.splice(idx, 1);
    this.setState({ total_luggage: photos })
    console.log(photos, this.state.total_luggage);
    return photos;
  }
  render() {
    const { luggage_pieces, total_luggage, deleted, show } = this.state;
    let luggageArray = [...total_luggage];
    luggageArray.push(luggage_pieces);
    let lugged = total_luggage.map((pieces,idx) => {
      return(
          <li key={idx} style={style.subPhoto}>
            {this.props.photos.length < 1 ? null :
              <img
              alt={pieces ? "luggagepieces" : null}
              height={pieces ? "200px" : null}
              width={pieces ? "250px" : null}
              onClick={() => this.deletePhoto(idx)}
              src={pieces} />
            }
              {deleted && pieces ? <p style={{ color: "red" }}>click photo to delete</p> : null}
          </li>
        )
    })
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    };
    return (
      <div>
      <div style={style.webcam}>
      <Webcam
        audio={false}
        height={300}
        width={400}
        ref={this.setRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    {total_luggage.length >= 2 ? <button style={style.button}><Link to="Checkout">Next Step</Link></button> : null }
      </div>
      <div style={style.webcam}>
      {total_luggage.length > 6 ?
        <button style={style.button} disable>Take picture of Luggage</button> :
        <button style={style.button} onClick={this.capture}>Take picture of Luggage</button> }
      </div>
      <div style={style.photo}>
        {show ? lugged : null}
      </div>

      </div>
    );
  }
}
const style = {
  webcam: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2b2723"
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyleType: "none",
    padding: "5px",
    margin: "10px"
  },
  subPhoto: {
    margin: "5px"
  }
}

Luggage.propTypes = {
  photoTaker: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  photos: state.photos.photos
})
export default connect(mapStateToProps, { photoTaker })(Luggage);
