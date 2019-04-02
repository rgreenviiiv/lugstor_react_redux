import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapboxGl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
import classes from './marker.css';
import { connect } from 'react-redux';

MapboxGl.accessToken = 'pk.eyJ1IjoicmdyZWVuZGV2IiwiYSI6ImNqZjdtMmZseDBlYWk0ZWtmaTJ5ODVybWgifQ.q40TMVwk6Vvzd6rihxranQ';

class Maps extends Component {

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.mappedFinal(this.props.line_coords[0])

  }
  componentWillMount() {
    console.log(this.props);
  }
  mappedFinal = (coords) => {
    console.log(this.props.line_coords);
    let center = coords.join(',')
    let newCenter = center.split(',')
    this.map = new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: this.props.line_coords[0],
      zoom: 9
    })
    this.map.on('load', () => {
    this.map.addLayer({
      "id": "route",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              this.props.line_coords[0],
              this.props.line_coords[1]
            ]
          }
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "steelblue",
        "line-width": 8
      }
    })
    this.popup = new MapboxGl.Popup({ offset: 25 })
      .setText(this.props.p_u_name.names);
    this.popup2 = new MapboxGl.Popup({ offset: 25 })
      .setText(this.props.d_o_name.donames);
    this.el = document.createElement('div');
    this.el.className = 'marker';
    this.el2 = document.createElement('div');
    this.el2.className = 'marker2';
    // this.map.addControl(this.direction)
    new MapboxGl.Marker(this.el)
      .setLngLat(this.props.line_coords[0])
      .setPopup(this.popup) // sets a popup on this Marker
      .addTo(this.map);
    new MapboxGl.Marker(this.el2)
      .setLngLat(this.props.line_coords[1])
      .setPopup(this.popup2)
      .addTo(this.map)
  });
  }
  render() {
    return (
        <div style={{ height: '65vh', width: '100vw'}} ref={x => this.container = x}>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  p_u_coords: state.coords.pick_up_coords,
  p_u_name: state.cdsName.names,
  d_o_coords: state.coords.drop_off_coords,
  d_o_name: state.cdsName.donames,
  line_coords: state.coords.line_coords
})
export default connect(mapStateToProps)(Maps);
