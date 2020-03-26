import React, { Component } from "react";
import styles from "./GuestBar.css";

class GuestBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { numAdults, numChildren, numInfants, onMinusClick, onPlusClick } = this.props;

    return (
      <div className={styles.bar}>
        <div className={styles.row}>
          <div className={styles.title}>Adults</div>
          <div className={`${styles.btn} numAdults`}>
            <span className={`${styles.minus} numAdults`} onClick={onMinusClick}>
              <img className={styles.minusSign} src="./img/minus.svg" alt="minus sign"></img>
            </span>
            <span className={styles.num}>{numAdults}</span>
            <span className={`${styles.plus} numAdults`} onClick={onPlusClick}>
              <img className={styles.plusSign} src="./img/plus.svg" alt="plus sign"></img>
            </span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>Children</div>
          <div className={`${styles.btn} numChildren`}>
            <span className={`${styles.minus} numChildren`} onClick={onMinusClick}>
              <img className={styles.minusSign} src="./img/minus.svg" alt="minus sign"></img>
            </span>
            <span className={styles.num}>{numChildren}</span>
            <span className={`${styles.plus} numChildren`} onClick={onPlusClick}>
              <img className={styles.plusSign} src="./img/plus.svg" alt="plus sign"></img>
            </span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>Infants</div>
          <div className={`${styles.btn} numInfants`}>
            <span className={`${styles.minus} numInfants`} onClick={onMinusClick}>
              <img className={styles.minusSign} src="./img/minus.svg" alt="minus sign"></img>
            </span>
            <span className={styles.num}>{numInfants}</span>
            <span className={`${styles.plus} numInfants`} onClick={onPlusClick}>
              <img className={styles.plusSign} src="./img/plus.svg" alt="plus sign"></img>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default GuestBar;
