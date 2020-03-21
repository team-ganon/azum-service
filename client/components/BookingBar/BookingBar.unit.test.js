import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";


import BookingBar from "./BookingBar.jsx";

describe("Booking Bar", () => {
  test("renders properly", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BookingBar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});