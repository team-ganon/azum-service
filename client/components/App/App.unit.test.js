import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";

// import Adapter from 'enzyme-adapter-react-16';
// configure({adapter: new Adapter()});

describe("App", () => {
  test("renders properly", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has proper title", () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find("p").text();
    expect(text).toEqual("hello");
  });
});

describe("Addition", () => {
  test("1 + 1 equals 2", () => {
    expect(1 + 1).toBe(2);
  });
});