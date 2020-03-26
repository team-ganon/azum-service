import React, { Component } from "react";
import axios from "axios";
import styles from "./BookingBar.css";

import Calendar from "../Calendar/Calendar.jsx";
import GuestBar from "../GuestBar/GuestBar.jsx";

class BookingBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daySelected: null,
      showGuestBar: false,
      showCalendar: false,
      clickedDate: null,
      numAdults: 1,
      numChildren: 0,
      numInfants: 0,
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

    this.handleCalendarPopup = this.handleCalendarPopup.bind(this);
    this.handleGuestBarPopup = this.handleGuestBarPopup.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onPlusClick = this.onPlusClick.bind(this);
    this.onMinusClick = this.onMinusClick.bind(this);
    this.updateGuestText = this.updateGuestText.bind(this);
  }

  handleCalendarPopup(e) {
    let id = e.target.id;
    if (this.state.clickedDate === id) {
      id = null;
      this.setState((prevState, props) => ({
        showCalendar: !prevState.showCalendar,
        clickedDate: id
      }));
    } else if (this.state.clickedDate !== null) {
      this.setState((prevState, props) => ({
        showCalendar: prevState.showCalendar,
        clickedDate: id
      }));
    } else {
      this.setState((prevState, props) => ({
        showCalendar: !prevState.showCalendar,
        clickedDate: id
      }));
    }
  }

  handleGuestBarPopup() {
    console.log('handling');
    this.setState((prevState, props) => ({
      showGuestBar: !prevState.showGuestBar
    }));
  }

  handleClick(e) {
    const id = e.target.id;
    this.setState({
      daySelected: id
    });
  }

  onPlusClick(e) {
    let target;
    if(e.target.parentNode.classList.contains("numAdults")) {
      target = "numAdults";
    } else if (e.target.parentNode.classList.contains("numChildren")) {
      target = "numChildren"
    } else {
      target = "numInfants"
    }

    if(target === "numInfants") {
      if (this.state.numInfants < 5) {
        this.setState((prevState, props) => ({
          [target]: prevState[target] + 1
        }));
      }
    } else {
      if(this.state.numAdults + this.state.numChildren < this.state.max_guests) {
        this.setState((prevState, props) => ({
          [target]: prevState[target] + 1
        }));
      }
    }
  }

  onMinusClick(e) {
    let target;
    if(e.target.parentNode.classList.contains("numAdults")) {
      target = "numAdults";
    } else if (e.target.parentNode.classList.contains("numChildren")) {
      target = "numChildren"
    } else {
      target = "numInfants"
    }

    if(this.state[target] > 0) {
      if(target === "numAdults") {
        if (this.state.numAdults > 1) {
          this.setState((prevState, props) => ({
            [target]: prevState[target] - 1
          }));
        }
      } else {
        this.setState((prevState, props) => ({
          [target]: prevState[target] - 1
        }));
      }
    }
  }
  updateGuestText() {
    const { numAdults, numChildren, numInfants } = this.state;
    const numGuests = numAdults + numChildren;
    let ret = "";

    if (numGuests === 1) {
      ret += "1 guest";
    } else {
      ret += `${numGuests} guests`;
    }

    if (numInfants === 1) {
      ret += ", 1 infant";
    } else if (numInfants > 1) {
      ret += `, ${numInfants} infants`;
    }

    return ret;
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
    const { numAdults, numChildren, numInfants, daySelected, showCalendar, showGuestBar, clickedDate, price, max_guest, reviews, fees, availability } = this.state;

    const calendarPopupStyle = showCalendar ? { visibility: "visible" } : { visibility: "hidden" };
    const guestBarPopupStyle = showGuestBar ? { visibility: "visible" } : { visibility: "hidden" };

    let highlightStartDateStyle = "";
    let highlightEndDateStyle = "";
    if (clickedDate === "startDate") {
      highlightStartDateStyle = styles.highlightDate;
    } else if (clickedDate === "endDate") {
      highlightEndDateStyle = styles.highlightDate;
    }

    return (
      <div>
        <div className={styles.wrapper}>
          <h1 className={styles.price}>${price} <span className={styles.perNight}>per night</span></h1>
          <p className={styles.reviews}>
            <img src="./img/star.svg" alt="star" className={styles.star}></img>
            <span className={styles.avgStars}><b> {reviews.avgStars} </b></span>
            <span className={styles.numReviews}>({reviews.numReviews} reviews)</span>
          </p>
          <div className={styles.barWrapper}>
            <h3 className={styles.barTitle}>Dates</h3>
            <div className={styles.bar}>
              <div className={styles.startDate}>
                <div className={`${styles.startDateText} ${highlightStartDateStyle}`} onClick={this.handleCalendarPopup} id="startDate">03/20/2020</div>
              </div>
              <img className={styles.arrow} src="./img/arrow.svg" alt="arrow"></img>
              <div className={styles.endDate}>
                <div className={`${styles.endDateText} ${highlightEndDateStyle}`} onClick={this.handleCalendarPopup} id="endDate">03/27/2020</div>
              </div>
              <div className={styles.calendarPopup} style={calendarPopupStyle}>
                <Calendar className={styles.calendar} availability={availability} handleClick={this.handleClick}/>
              </div>
            </div>
          </div>
          <div className={styles.barWrapper}>
            <h3 className={styles.barTitle}>Guests</h3>
            <div className={styles.bar}>
              <div className={styles.guestBarTextContainer} onClick={this.handleGuestBarPopup}>
                <span className={styles.guestText}>{this.updateGuestText()}</span>
              </div>
              <div className={styles.guestBarPopup} style={guestBarPopupStyle}>
                <GuestBar numAdults={numAdults} numChildren={numChildren} numInfants={numInfants} onPlusClick={this.onPlusClick} onMinusClick={this.onMinusClick} />
              </div>
            </div>
          </div>
          <div className={styles.priceCalc}>
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
      </div>
    );
  }
}

export default BookingBar;