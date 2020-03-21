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
    const url = window.location.href;
    const queryString = url.slice(url.indexOf("?"));
    axios.get(`/api/rentals${queryString}`)
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
          <h1 id={styles.price}>${price} <span id={styles["per-night"]}>per night</span></h1>
          <p className={styles.reviews}>
            <img src="./img/star.svg" alt="star" className={styles.star}></img>
            <span id={styles["avg-stars"]}><b> {reviews.avgStars} </b></span>
            <span id={styles["num-reviews"]}>({reviews.numReviews} reviews)</span>
          </p>
          <div className="date">
            <h3>Dates</h3>
            <div id={styles["date-bar"]}>
              <div id={styles["start-date"]}>03/20/2020</div>
              <img className={styles.arrow} src="./img/arrow.svg" alt="arrow"></img>
              <div id={styles["end-date"]}>03/27/2020</div>
            </div>
          </div>
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