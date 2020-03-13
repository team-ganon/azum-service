const testFunction = require("./function.js");

test("function adds exclamation marks", () => {
  expect(testFunction("Hello")).toBe("Hello!!!");
});