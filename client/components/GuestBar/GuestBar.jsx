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
          <div className={styles.btn} id="numAdults">
            <span className={styles.minus} onClick={onMinusClick}>-</span>
            <span className={styles.num}>{numAdults}</span>
            <span className={styles.plus} onClick={onPlusClick}>+</span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>Children</div>
          <div className={styles.btn} id="numChildren">
            <span className={styles.minus} onClick={onMinusClick}>-</span>
            <span className={styles.num}>{numChildren}</span>
            <span className={styles.plus} onClick={onPlusClick}>+</span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>Infants</div>
          <div className={styles.btn} id="numInfants">
            <span className={styles.minus} onClick={onMinusClick}>-</span>
            <span className={styles.num}>{numInfants}</span>
            <span className={styles.plus} onClick={onPlusClick}>+</span>
          </div>
        </div>
      </div>
    );
  }
}

export default GuestBar;
