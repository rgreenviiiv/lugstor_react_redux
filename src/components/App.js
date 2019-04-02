import React, { Component } from 'react';
import Maps from './maps';
import Address from './Address';
import Luggage from './luggage';
import Checkout from './checkout';
import Main from './main';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/" exact component={Main} />
            <Route path="/Luggage" component={Luggage} />
            <Route path="/Checkout" component={Checkout} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect()(App);
