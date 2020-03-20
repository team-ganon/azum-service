import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import App from "./App.jsx";
import BookingBar from "../BookingBar/BookingBar.jsx";

describe("App", () => {
  test("renders properly", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("contains booking bar", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(BookingBar)).toHaveLength(1);
  });
});