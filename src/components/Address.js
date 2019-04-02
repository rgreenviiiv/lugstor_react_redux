import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { dropoffcoords, pickupcoords } from '../actions/execActions';
import { connect } from 'react-redux';

const myRef = React.createRef();
console.log(myRef);
let title;

class Address extends Component {
  state = {
    address: '',
    cdsName: {},
    current: {},
    confirm: false,
    style: true,
    title: 'Pickup Location'
  }

  handleChange = (address) => {
    this.setState({ address })
  }
  selectStyle = () => {
    this.setState({ style: false })
  }
  handleSelect = address => {
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      console.log('Success', latLng)
      console.log(title)
      if (title.textContent === 'Pickup Location'){
       this.props.pickupcoords(address,{
                     ...latLng,
                     latitude: latLng.lat,
                     longitude: latLng.lng
                   });
      } else if (title.textContent === 'Dropoff Location'){
       this.props.dropoffcoords(address, {
                     ...latLng,
                     latitude: latLng.lat,
                     longitude: latLng.lng
                   });
      };
      this.setState({ confirm: true, address: '' })
    })
    .then(error => console.log('Error', error))
  }
  render() {
    console.log(this.state.confirm);
    const addressInput = ({ getInputProps, suggestions, getSuggestionItemProps, loading}) => (
      <div>
      <input
        style={styles.inputBar}
        {...getInputProps({
          placeholder: this.state.confirm ? 'Please enter Dropoff Location ...' : 'Please enter Pickup Location ...',
          className: 'location-search-input',
        })}
      />
        <div className="autocomplete-dropdown-container">
          {loading}
          {suggestions.map(suggestion =>{
            const className = suggestion.active
              ? 'suggestion-item--active'
              : 'suggestion-item';
            const style = suggestion.active
              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
              : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return(
                <div
                {...getSuggestionItemProps(suggestion, {
                  className,
                  style,
                })}
                >
                {suggestion.description.split().map((suggest, idx) => (
                  <li onMouseOver={this.selectStyle} onClick={this.handleSelect} key={idx} style={this.state.style ? styles.suggestions : styles.suggestionsInverse}>{suggest}</li>
                ))}
                </div>
              )
          })}
        </div>
      </div>
    )
    return (
      <div>
      <h2 style={styles.title} ref={x => title = x}>
        {
          this.state.confirm ?
          'Dropoff Location' :
          'Pickup Location'
        }
      </h2>
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
      {addressInput}
      </PlacesAutocomplete>
      </div>
    );
  }
}
const styles = {
  inputBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
    width: '50vw',
    minWidth: '50vw',
    maxWidth: '50vw',
  },
  suggestions: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    posistion: 'absolute',
    margin: '10px',
    minWidth: '50vw',
    maxWidth: '50vw',
    borderWidth: '1px',
    color: 'blue',
    backgroundColor: '#E1C699',
    listStyle: 'none'
  },
  suggestionsInverse: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    posistion: 'absolute',
    margin: '10px',
    minWidth: '50vw',
    maxWidth: '50vw',
    borderWidth: '1px',
    color: '#E1C699',
    backgroundColor: 'blue',
    listStyle: 'none'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  }
}

const mapStateToProps = state => ({
  p_u_coords: state.coords.pick_up_coords,
  d_o_coords: state.coords.drop_off_coords,
  cdsName: state.cdsName.names,
})

export default connect(mapStateToProps, { dropoffcoords, pickupcoords })(Address);
