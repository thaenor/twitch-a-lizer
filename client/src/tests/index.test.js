import React from "react";
import { shallow } from "enzyme";
import App from "../features/SearchMode";
import "./setupTests";

it("renders without crashing", () => {
  shallow(<App />);
});
