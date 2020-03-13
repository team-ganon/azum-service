import React, { Component } from "react";
import axios from "axios";
import "./Bar.css";

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
    axios.get(`/api/rentals${window.location.pathname}`)
      .then(res => {
        console.log(res);
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
            service_fee: data.fees.service,
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
        <h1>${price} per night</h1>
        <p><b>{reviews.avgStars}</b> ({reviews.numReviews} reviews)</p>
        <h3>Dates</h3>
        <h3>Guests</h3>
        <div className="price-calc">
          <p className="title">${price} x 7 nights</p>
          <p className="title">Cleaning fee</p>
          <p className="title">Service fee</p>
          <p className="title">Occupancy taxes and fees</p>
          <p className="title">Total</p>
        </div>
      </div>
    );
  }
}

export default BookingBar;