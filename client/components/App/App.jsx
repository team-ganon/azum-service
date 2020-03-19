import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import BookingBar from "../Booking/Bar/Bar.jsx";

class App extends Component {
  render() {
    return (
        <div className="app">
          <p>hello</p>
          <BookingBar />
        </div>
    );
  }
}

export default App;