import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import styles from "./App.css";

import BookingBar from "../BookingBar/BookingBar.jsx";
import Calendar from "../Calendar/Calendar.jsx";

class App extends Component {
  render() {
    return (
      // Wrapper for entire app
      <div className={styles.app}>
        <BookingBar />
      </div>
    );
  }
}

export default App;