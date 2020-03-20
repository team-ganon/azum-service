import React, { Component } from "react";
import axios from "axios";
import styles from "./BookingBar.css";

import Calendar from "../Calendar/Calendar.jsx";

class BookingBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: null,
      max_guests: null,
      reviews: {
        numReviews: null,
        avgStars: null
      },
      fees: {
        cleaning_fee: null,
        service_fee: null,
        occupancy_fee: null
      },
      availability: []
    };
  }

  componentDidMount() {
    const queryString = window.location.pathname.slice(1);
    axios.get(`/api/rentals${window.location.pathname}`)
      .then(res => {
        // console.log(res);
        const data = res.data;
        this.setState({
          price: data.price,
          max_guests: data.max_guests,
          reviews: {
            numReviews: data.reviews.numReviews,
            avgStars: data.reviews.avgStars
          },
          fees: {
            cleaning_fee: data.fees.cleaning_fee,
            service_fee: data.fees.service_fee,
            occupancy_fee: data.fees.occupancy_fee
          },
          availability: data.availability
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { price, max_guest, reviews, fees, availability } = this.state;
    return (
      <div>
        <div className={styles.wrapper}>
          <h1>${price} per night</h1>
          <p><b>{reviews.avgStars}</b> ({reviews.numReviews} reviews)</p>
          <h3>Dates</h3>
          <h3>Guests</h3>
          <div className={styles["price-calc"]}>
            <p className={styles.title}>${price} x 7 nights</p>
            <p className={styles.description}>$1000</p>
            <p className={styles.title}>Cleaning fee</p>
            <p className={styles.description}>${fees.cleaning_fee}</p>
            <p className={styles.title}>Service fee</p>
            <p className={styles.description}>${fees.service_fee}</p>
            <p className={styles.title}>Occupancy taxes and fees</p>
            <p className={styles.description}>${fees.occupancy_fee}</p>
            <p className={`${styles.title} ${styles.total}`}>Total</p>
            <p className={`${styles.description} ${styles.total}`}>${1000 + fees.cleaning_fee + fees.service_fee + fees.occupancy_fee}</p>
          </div>
        </div>
        <Calendar availability={availability}/>
      </div>
    );
  }
}

export default BookingBar;